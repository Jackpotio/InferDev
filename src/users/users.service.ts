import { ConflictException, Injectable } from '@nestjs/common';
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
}
