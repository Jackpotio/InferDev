
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { SurveyRepository } from './survey.repository';
import { SurveyResult } from './entities/survey-result.entity';
import { SubmittedAnswer } from './entities/submitted-answer.entity';
import { SurveyQuestion } from './entities/survey-question.entity';
import { SurveyOption } from './entities/survey-option.entity';
import { Job } from './entities/job.entity';
import { JobDetail } from './entities/job-detail.entity';
import { CareerTrack } from './entities/career-track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SurveyResult,
      SubmittedAnswer,
      SurveyQuestion,
      SurveyOption,
      Job,
      JobDetail,
      CareerTrack,
    ]),
  ],
  controllers: [SurveyController],
  providers: [SurveyService, SurveyRepository],
})
export class SurveyModule {}
