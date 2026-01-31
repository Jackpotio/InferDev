import { Repository } from 'typeorm';
import { SurveyResult } from './entities/survey-result.entity';
import { SubmittedAnswer } from './entities/submitted-answer.entity';
import { SubmitSurveyDto } from './dto/submit-survey.dto';
import { SurveyQuestion } from './entities/survey-question.entity';
import { SurveyOption } from './entities/survey-option.entity';
import { Job } from './entities/job.entity';
import { JobDetail } from './entities/job-detail.entity';
export declare class SurveyRepository {
    private readonly surveyResultRepository;
    private readonly submittedAnswerRepository;
    private readonly surveyQuestionRepository;
    private readonly surveyOptionRepository;
    private readonly jobRepository;
    private readonly jobDetailRepository;
    constructor(surveyResultRepository: Repository<SurveyResult>, submittedAnswerRepository: Repository<SubmittedAnswer>, surveyQuestionRepository: Repository<SurveyQuestion>, surveyOptionRepository: Repository<SurveyOption>, jobRepository: Repository<Job>, jobDetailRepository: Repository<JobDetail>);
    submitSurvey(submitSurveyDto: SubmitSurveyDto): Promise<SurveyResult>;
    findAllJobs(): Promise<Job[]>;
    findAllJobDetails(): Promise<JobDetail[]>;
    findAllSurveyQuestions(): Promise<SurveyQuestion[]>;
}
