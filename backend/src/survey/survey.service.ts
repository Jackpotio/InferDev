
import { Injectable } from '@nestjs/common';
import { SurveyRepository } from './survey.repository';
import { SubmitSurveyDto } from './dto/submit-survey.dto';
import { Job } from './entities/job.entity';
import { JobDetail } from './entities/job-detail.entity';
import { SurveyQuestion } from './entities/survey-question.entity';

@Injectable()
export class SurveyService {
  constructor(private readonly surveyRepository: SurveyRepository) {}

  async getJobs(): Promise<Job[]> {
    return this.surveyRepository.findAllJobs();
  }

  async getJobDetails(): Promise<JobDetail[]> {
    return this.surveyRepository.findAllJobDetails();
  }

  async getSurveyQuestions(): Promise<SurveyQuestion[]> {
    return this.surveyRepository.findAllSurveyQuestions();
  }

  recommendation(submitSurveyDto: SubmitSurveyDto) {
    // TODO: Implement recommendation logic
    console.log(submitSurveyDto);
    return 'This is a mock recommendation.';
  }
}
