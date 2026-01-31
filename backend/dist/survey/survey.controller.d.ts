import { SurveyService } from './survey.service';
import { SubmitSurveyDto } from './dto/submit-survey.dto';
export declare class SurveyController {
    private readonly surveyService;
    constructor(surveyService: SurveyService);
    getJobs(): Promise<Record<string, string>>;
    getJobDetails(): Promise<Record<string, any>>;
    getSurveyQuestions(): Promise<import("./entities/survey-question.entity").SurveyQuestion[]>;
    recommendation(submitSurveyDto: SubmitSurveyDto): Promise<any>;
}
