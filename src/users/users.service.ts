import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthProvider, User, UserGender } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findLocalByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email, provider: 'local' } });
  }

  async createLocal(email: string, passwordHash: string): Promise<User> {
    const exists = await this.findLocalByEmail(email);
    if (exists) {
      throw new ConflictException('Email already exists');
    }

    const user = this.usersRepository.create({
      email,
      passwordHash,
      provider: 'local',
      providerUserId: null,
      displayName: null,
      role: 'user',
    });

    return this.usersRepository.save(user);
  }

  findByProvider(provider: AuthProvider, providerUserId: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { provider, providerUserId } });
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  private formatProviderLabel(provider: AuthProvider): string {
    if (provider === 'google') return 'Google';
    if (provider === 'naver') return 'Naver';
    return '일반 이메일';
  }

  private formatProfileResponse(user: User) {
    return {
      displayName: user.displayName ?? '',
      gender: user.gender ?? '',
      notifyResultSaved: user.notifyResultSaved,
      notifyPremium: user.notifyPremium,
      plan: user.plan,
      account: {
        email: user.email ?? '',
        provider: user.provider,
        providerLabel: this.formatProviderLabel(user.provider),
        joinedAt: user.createdAt,
      },
    };
  }

  private isMissingGenderColumnError(error: unknown): boolean {
    const text = String((error as { message?: string })?.message || '');
    return text.includes('gender') && text.includes('does not exist');
  }

  private mapRawUserRow(row: Record<string, unknown>): User {
    return {
      id: Number(row.id),
      email: (row.email as string | null) ?? null,
      passwordHash: (row.password_hash as string | null) ?? null,
      provider: ((row.provider as AuthProvider) ?? 'local') as AuthProvider,
      providerUserId: (row.provider_user_id as string | null) ?? null,
      displayName: (row.display_name as string | null) ?? null,
      gender: null,
      notifyResultSaved: Boolean(row.notify_result_saved),
      notifyPremium: Boolean(row.notify_premium),
      plan: ((row.plan as 'free' | 'premium') ?? 'free') as 'free' | 'premium',
      role: ((row.role as 'user' | 'admin') ?? 'user') as 'user' | 'admin',
      createdAt: new Date(row.created_at as string),
      updatedAt: new Date(row.updated_at as string),
    };
  }

  async findByIdSafe(id: number): Promise<User | null> {
    try {
      return await this.findById(id);
    } catch (error) {
      if (!this.isMissingGenderColumnError(error)) {
        throw error;
      }
      const rows = await this.usersRepository.query(
        `
          SELECT
            id, email, password_hash, provider, provider_user_id, display_name,
            notify_result_saved, notify_premium, plan, role, created_at, updated_at
          FROM users
          WHERE id = $1
          LIMIT 1
        `,
        [id],
      );
      if (!rows?.length) return null;
      return this.mapRawUserRow(rows[0] as Record<string, unknown>);
    }
  }

  async upsertOAuthUser(input: {
    provider: Exclude<AuthProvider, 'local'>;
    providerUserId: string;
    email?: string | null;
    displayName?: string | null;
  }): Promise<User> {
    const existing = await this.findByProvider(input.provider, input.providerUserId);
    if (existing) {
      existing.email = input.email ?? existing.email;
      existing.displayName = input.displayName ?? existing.displayName;
      return this.usersRepository.save(existing);
    }

    const user = this.usersRepository.create({
      email: input.email ?? null,
      passwordHash: null,
      provider: input.provider,
      providerUserId: input.providerUserId,
      displayName: input.displayName ?? null,
      role: 'user',
    });

    return this.usersRepository.save(user);
  }

  async getProfileSettings(userId: number) {
    const user = await this.findByIdSafe(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.formatProfileResponse(user);
  }

  async updateProfileSettings(
    userId: number,
    input: {
      displayName?: string;
      gender?: UserGender | '';
      notifyResultSaved?: boolean;
      notifyPremium?: boolean;
      plan?: 'free' | 'premium';
    },
  ) {
    let user = await this.findByIdSafe(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (input.displayName !== undefined) {
      user.displayName = input.displayName.trim() || null;
    }
    if (input.gender !== undefined) {
      user.gender = input.gender || null;
    }
    if (input.notifyResultSaved !== undefined) {
      user.notifyResultSaved = input.notifyResultSaved;
    }
    if (input.notifyPremium !== undefined) {
      user.notifyPremium = input.notifyPremium;
    }
    if (input.plan !== undefined) {
      user.plan = input.plan;
    }

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (!this.isMissingGenderColumnError(error)) {
        throw error;
      }
      const updates: string[] = [];
      const values: unknown[] = [];
      let index = 1;

      if (input.displayName !== undefined) {
        updates.push(`display_name = $${index++}`);
        values.push(input.displayName.trim() || null);
      }
      if (input.notifyResultSaved !== undefined) {
        updates.push(`notify_result_saved = $${index++}`);
        values.push(input.notifyResultSaved);
      }
      if (input.notifyPremium !== undefined) {
        updates.push(`notify_premium = $${index++}`);
        values.push(input.notifyPremium);
      }
      if (input.plan !== undefined) {
        updates.push(`plan = $${index++}`);
        values.push(input.plan);
      }
      if (updates.length > 0) {
        updates.push(`updated_at = now()`);
        values.push(userId);
        await this.usersRepository.query(
          `UPDATE users SET ${updates.join(', ')} WHERE id = $${index}`,
          values,
        );
      }
    }

    const updated = await this.findByIdSafe(userId);
    if (!updated) {
      throw new NotFoundException('User not found');
    }
    return this.formatProfileResponse(updated);
  }
}
