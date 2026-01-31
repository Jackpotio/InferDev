import { SubmittedAnswer } from './submitted-answer.entity';
export declare class SurveyResult {
    id: number;
    userId: number;
    totalScore: number;
    resultSummary: string;
    submittedAt: Date;
    submittedAnswers: SubmittedAnswer[];
}
