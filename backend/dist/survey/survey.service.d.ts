import { SurveyRepository } from './survey.repository';
import { SurveyQuestion } from './entities/survey-question.entity';
import { SubmitSurveyDto } from './dto/submit-survey.dto';
export declare class SurveyService {
    private readonly surveyRepository;
    constructor(surveyRepository: SurveyRepository);
    getJobs(): Promise<Record<string, string>>;
    getJobDetails(): Promise<Record<string, any>>;
    getSurveyQuestions(): Promise<SurveyQuestion[]>;
    recommendation(submitSurveyDto: SubmitSurveyDto): Promise<any>;
}
