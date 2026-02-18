import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthProvider, User, UserRole } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly bcryptRounds: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.bcryptRounds = Number(this.configService.get<string>('BCRYPT_ROUNDS') || 10);
  }

  async register(email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, this.bcryptRounds);
    const user = await this.usersService.createLocal(email, passwordHash);
    return this.issueTokens(user);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findLocalByEmail(email);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokens(user);
  }

  async validateOAuthLogin(input: {
    provider: Exclude<AuthProvider, 'local'>;
    providerUserId: string;
    email?: string | null;
    displayName?: string | null;
  }) {
    const user = await this.usersService.upsertOAuthUser(input);
    return this.issueTokens(user);
  }

  private issueTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role as UserRole,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        provider: user.provider,
      },
    };
  }
}
