import { SurveyQuestion } from './survey-question.entity';
export declare class SurveyOption {
    id: number;
    text: string;
    score: Record<string, number>;
    subfieldScores: Record<string, number>;
    question: SurveyQuestion;
}
