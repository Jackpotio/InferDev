import { SurveyOption } from './survey-option.entity';
export declare class SurveyQuestion {
    id: number;
    question: string;
    condition: any;
    options: SurveyOption[];
}
