import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobDetail } from './entities/job-detail.entity';
import { SurveyOption } from './entities/survey-option.entity';
import { SurveyQuestion } from './entities/survey-question.entity';
import { SurveyResult } from './entities/survey-result.entity';
export declare class SurveyRepository {
    private readonly jobRepository;
    private readonly jobDetailRepository;
    private readonly surveyOptionRepository;
    private readonly surveyQuestionRepository;
    private readonly surveyResultRepository;
    constructor(jobRepository: Repository<Job>, jobDetailRepository: Repository<JobDetail>, surveyOptionRepository: Repository<SurveyOption>, surveyQuestionRepository: Repository<SurveyQuestion>, surveyResultRepository: Repository<SurveyResult>);
    findAllJobs(): Promise<Job[]>;
    findJobById(id: string): Promise<Job>;
    findAllJobDetails(): Promise<JobDetail[]>;
    findAllSurveyQuestions(): Promise<SurveyQuestion[]>;
    findOptionsByIds(ids: number[]): Promise<SurveyOption[]>;
    saveSurveyResult(result: SurveyResult): Promise<SurveyResult>;
}
