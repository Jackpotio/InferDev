import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthProvider, User } from './user.entity';

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
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.formatProfileResponse(user);
  }

  async updateProfileSettings(
    userId: number,
    input: {
      displayName?: string;
      notifyResultSaved?: boolean;
      notifyPremium?: boolean;
      plan?: 'free' | 'premium';
    },
  ) {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (input.displayName !== undefined) {
      user.displayName = input.displayName.trim() || null;
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

    await this.usersRepository.save(user);
    const updated = await this.findById(userId);
    if (!updated) {
      throw new NotFoundException('User not found');
    }
    return this.formatProfileResponse(updated);
  }
}
