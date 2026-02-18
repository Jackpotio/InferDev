import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.email, registerDto.password);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    return;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(
    @Req() req: {
      user: {
        provider: 'google';
        providerUserId: string;
        email?: string | null;
        displayName?: string | null;
      };
    },
    @Res() res: Response,
  ) {
    const { accessToken } = await this.authService.validateOAuthLogin(req.user);
    return res.redirect(this.buildFrontendOAuthRedirectUrl(accessToken));
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(
    @Req()
    req: {
      user: {
        userId: number;
        email: string | null;
        role: string;
        provider?: 'local' | 'google' | 'naver';
        joinedAt?: string | null;
      };
    },
  ) {
    let dbUser = null;
    try {
      dbUser = await this.usersService.findById(req.user.userId);
    } catch {
      return req.user;
    }

    if (!dbUser) {
      return req.user;
    }

    return {
      ...req.user,
      email: dbUser.email,
      provider: dbUser.provider,
      joinedAt: dbUser.createdAt ? dbUser.createdAt.toISOString() : null,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: { user: { userId: number } }) {
    return this.usersService.getProfileSettings(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  updateProfile(
    @Req() req: { user: { userId: number } },
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfileSettings(req.user.userId, updateProfileDto);
  }

  private buildFrontendOAuthRedirectUrl(accessToken: string): string {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
    const normalized = frontendUrl.endsWith('/') ? frontendUrl.slice(0, -1) : frontendUrl;
    return `${normalized}/oauth/callback#token=${encodeURIComponent(accessToken)}`;
  }
}
