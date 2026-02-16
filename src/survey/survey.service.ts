
import { Injectable } from '@nestjs/common';
import { SurveyRepository } from './survey.repository';
import { SubmitSurveyDto } from './dto/submit-survey.dto';
import { Job } from './entities/job.entity';
import { JobDetail } from './entities/job-detail.entity';
import { CareerTrack } from './entities/career-track.entity';
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

  async getCareerTracks(): Promise<CareerTrack[]> {
    return this.surveyRepository.findAllCareerTracks();
  }

  async getSurveyQuestions(stage = 1, track?: string): Promise<SurveyQuestion[]> {
    return this.surveyRepository.findAllSurveyQuestions(stage, track);
  }

  async recommendation(submitSurveyDto: SubmitSurveyDto): Promise<any> {
    return this.surveyRepository.submitSurvey(submitSurveyDto);
  }

  async recommendationStage1(submitSurveyDto: SubmitSurveyDto): Promise<any> {
    return this.surveyRepository.submitStage1(submitSurveyDto);
  }

  async recommendationFinal(submitSurveyDto: SubmitSurveyDto): Promise<any> {
    return this.surveyRepository.submitFinal(submitSurveyDto);
  }
}
