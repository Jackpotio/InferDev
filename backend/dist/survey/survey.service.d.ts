import { SurveyRepository } from './survey.repository';
import { SubmitSurveyDto } from './dto/submit-survey.dto';
import { Job } from './entities/job.entity';
import { JobDetail } from './entities/job-detail.entity';
import { SurveyQuestion } from './entities/survey-question.entity';
export declare class SurveyService {
    private readonly surveyRepository;
    constructor(surveyRepository: SurveyRepository);
    getJobs(): Promise<Job[]>;
    getJobDetails(): Promise<JobDetail[]>;
    getSurveyQuestions(): Promise<SurveyQuestion[]>;
    recommendation(submitSurveyDto: SubmitSurveyDto): string;
}
