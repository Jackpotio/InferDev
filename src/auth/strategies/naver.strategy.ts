import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';

type NaverProfile = {
  id: string;
  displayName?: string;
  emails?: Array<{ value?: string }>;
  _json?: { email?: string; name?: string; nickname?: string };
};

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>('NAVER_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('NAVER_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('NAVER_CALLBACK_URL'),
      state: true,
    });
  }

  validate(_accessToken: string, _refreshToken: string, profile: NaverProfile) {
    return {
      provider: 'naver' as const,
      providerUserId: profile.id,
      email: profile.emails?.[0]?.value ?? profile._json?.email ?? null,
      displayName: profile.displayName ?? profile._json?.name ?? profile._json?.nickname ?? null,
    };
  }
}
