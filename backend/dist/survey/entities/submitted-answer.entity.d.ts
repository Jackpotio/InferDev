import { SurveyResult } from './survey-result.entity';
import { SurveyOption } from './survey-option.entity';
export declare class SubmittedAnswer {
    id: number;
    surveyResult: SurveyResult;
    surveyOption: SurveyOption;
}
