export class SubmitSurveyDto {
  major: 'it' | 'non-it';
  itMajorDetail?: string;

  codingExp: 'yes' | 'no';
  codingLevel?: string;

  answer: {
    questionId: number;
    optionIndex: number;
  }[];
}
