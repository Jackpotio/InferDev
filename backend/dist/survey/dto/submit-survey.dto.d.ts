declare class AnswerDto {
    questionId: number;
    optionId: number;
}
export declare class SubmitSurveyDto {
    userId: number;
    answers: AnswerDto[];
}
export {};
