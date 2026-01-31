
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { Job } from './entities/job.entity';
import { JobDetail } from './entities/job-detail.entity';
import { SurveyQuestion } from './entities/survey-question.entity';
import { SurveyOption } from './entities/survey-option.entity';
import { SurveyResult } from './entities/survey-result.entity';
import { SubmittedAnswer } from './entities/submitted-answer.entity';
import { SurveyRepository } from './survey.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Job, JobDetail, SurveyQuestion, SurveyOption, SurveyResult, SubmittedAnswer])],
  controllers: [SurveyController],
  providers: [SurveyService, SurveyRepository],
})
export class SurveyModule {}
