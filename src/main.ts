
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  const frontendUrl = configService.get<string>('FRONTEND_URL') || '';
  const frontendUrls = (configService.get<string>('FRONTEND_URLS') || '')
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
  const allowedOrigins = new Set<string>([
    frontendUrl,
    ...frontendUrls,
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://inferdev.kr',
    'https://www.inferdev.kr',
  ]);
  const cloudWorkstationsOriginPattern =
    /^https:\/\/\d+-firebase-inferdev-.*\.cloudworkstations\.dev$/;
  const inferdevOriginPattern = /^https:\/\/([a-z0-9-]+\.)?inferdev\.kr$/i;

  // 1. CORS 활성화: 특정 출처에서의 요청을 허용합니다.
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (
        allowedOrigins.has(origin) ||
        cloudWorkstationsOriginPattern.test(origin) ||
        inferdevOriginPattern.test(origin)
      ) {
        callback(null, true);
        return;
      }
      callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    credentials: true,
  });

  // OAuth state 검증은 세션 저장소를 필요로 합니다.
  app.getHttpAdapter().getInstance().set('trust proxy', 1);
  app.use(
    session({
      secret: configService.getOrThrow<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 10 * 60 * 1000,
      },
    }),
  );

  // 2. API 전역 접두사 설정: 모든 API 경로 앞에 /api가 붙습니다.
  app.setGlobalPrefix('api');

  // 3. 유효성 검사 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 4. 서버 리스닝 포트를 3000으로 명시합니다.
  await app.listen(3000);
}
bootstrap();
