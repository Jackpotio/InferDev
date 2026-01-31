import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정을 더 명시적으로 변경하여 모든 요청을 허용
  app.enableCors({
    origin: true, // 모든 출처 허용
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // 인증 정보(쿠키 등) 허용
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 없는 필드 제거
      forbidNonWhitelisted: true, // DTO에 없는 필드 들어오면 에러
      transform: true, // payLoad -> DTO calss로 변환
    }),
  );

  // 서버 포트를 8080으로 변경하고 모든 인터페이스에서 수신
  await app.listen(8080, '0.0.0.0');
}
bootstrap();
