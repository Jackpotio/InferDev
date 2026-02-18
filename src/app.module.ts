
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyModule } from './survey/survey.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: false,
        // 데이터베이스 스키마를 강제로 재생성하기 위해 dropSchema 옵션 다시 추가
        dropSchema: false,
        logging: configService.get<string>('NODE_ENV') === 'development',
        ssl: { rejectUnauthorized: false },
      }),
    }),
    SurveyModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
