
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobDetail } from './entities/job-detail.entity';
import { SurveyOption } from './entities/survey-option.entity';
import { SurveyQuestion } from './entities/survey-question.entity';
import { SurveyResult } from './entities/survey-result.entity';

@Injectable()
export class SurveyRepository {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobDetail)
    private readonly jobDetailRepository: Repository<JobDetail>,
    @InjectRepository(SurveyOption)
    private readonly surveyOptionRepository: Repository<SurveyOption>,
    @InjectRepository(SurveyQuestion)
    private readonly surveyQuestionRepository: Repository<SurveyQuestion>,
    @InjectRepository(SurveyResult)
    private readonly surveyResultRepository: Repository<SurveyResult>,
  ) {}

  // 기본 데이터 조회
  async findAllJobs(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  async findJobById(id: string): Promise<Job> {
    return this.jobRepository.findOne({ where: { id } });
  }

  async findAllJobDetails(): Promise<JobDetail[]> {
    return this.jobDetailRepository.find();
  }

  async findAllSurveyQuestions(): Promise<SurveyQuestion[]> {
    return this.surveyQuestionRepository.find({ relations: ['options'] });
  }

  // 답변 관련 조회
  async findOptionsByIds(ids: number[]): Promise<SurveyOption[]> {
    return this.surveyOptionRepository.find({ where: { id: In(ids) } });
  }

  // 결과 저장
  async saveSurveyResult(result: SurveyResult): Promise<SurveyResult> {
    return this.surveyResultRepository.save(result);
  }
}
