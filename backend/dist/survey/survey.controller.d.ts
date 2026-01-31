import { SurveyService } from './survey.service';
import { SubmitSurveyDto } from './dto/submit-survey.dto';
export declare class SurveyController {
    private readonly surveyService;
    constructor(surveyService: SurveyService);
    getJobs(): Promise<import("./entities/job.entity").Job[]>;
    getJobDetails(): Promise<import("./entities/job-detail.entity").JobDetail[]>;
    getSurveyQuestions(): Promise<import("./entities/survey-question.entity").SurveyQuestion[]>;
    recommendation(submitSurveyDto: SubmitSurveyDto): string;
}
