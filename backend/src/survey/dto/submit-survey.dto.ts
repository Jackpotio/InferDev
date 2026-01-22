export interface SubmitSurveyDto {
  major: string;
  codingExp: string;
  //scores는 추후 추가 예정.
  scores: {
    frontend: number;
    backend: number;
    ai: number;
  };
}
