declare class Answer {
    questionId: number;
    optionId: number;
}
export declare class SubmitSurveyDto {
    answers: Answer[];
    major: string;
    itMajorDetail?: string;
    codingExp: string;
    codingLevel?: string;
}
export {};
