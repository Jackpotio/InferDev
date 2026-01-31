
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyModule } from './survey/survey.module';
import { Job } from './survey/entities/job.entity';
import { JobDetail } from './survey/entities/job-detail.entity';
import { SurveyQuestion } from './survey/entities/survey-question.entity';
import { SurveyOption } from './survey/entities/survey-option.entity';
import { SurveyResult } from './survey/entities/survey-result.entity';
import { SubmittedAnswer } from './survey/entities/submitted-answer.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
        entities: [Job, JobDetail, SurveyQuestion, SurveyOption, SurveyResult, SubmittedAnswer],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    SurveyModule,
  ],
})
export class AppModule {}
