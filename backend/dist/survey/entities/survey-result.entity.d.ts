import { SubmittedAnswer } from './submitted-answer.entity';
export declare class SurveyResult {
    id: number;
    topJob: string;
    topSubfield: string;
    scores: Record<string, number>;
    subfieldScores: Record<string, number>;
    submittedAnswers: SubmittedAnswer[];
    createdAt: Date;
}
