
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyModule } from './survey/survey.module';
import { Job } from './survey/entities/job.entity';
import { JobDetail } from './survey/entities/job-detail.entity';
import { SurveyQuestion } from './survey/entities/survey-question.entity';
import { SurveyOption } from './survey/entities/survey-option.entity';
import { SurveyResult } from './survey/entities/survey-result.entity';
import { SubmittedAnswer } from './survey/entities/submitted-answer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cq922j56l47c73e185c0-a.singapore-postgres.render.com',
      port: 5432,
      username: 'test_user',
      password: 'zLpL9yXo4wUnSAn4x4yZ0wY5fNBrxJj7',
      database: 'test_db_axze',
      entities: [Job, JobDetail, SurveyQuestion, SurveyOption, SurveyResult, SubmittedAnswer],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    SurveyModule,
  ],
})
export class AppModule {}
