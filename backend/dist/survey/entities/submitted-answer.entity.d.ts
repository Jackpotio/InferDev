import { SurveyResult } from './survey-result.entity';
import { SurveyOption } from './survey-option.entity';
import { SurveyQuestion } from './survey-question.entity';
export declare class SubmittedAnswer {
    id: number;
    surveyResult: SurveyResult;
    surveyQuestion: SurveyQuestion;
    surveyOption: SurveyOption;
}
