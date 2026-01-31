
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CORS 활성화: 모든 출처에서의 요청을 허용합니다.
  app.enableCors({
    origin: true,
    credentials: true,
  });

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
