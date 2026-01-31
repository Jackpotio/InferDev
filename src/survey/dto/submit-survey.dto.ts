
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

class AnswerDto {
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @IsNumber()
  @IsNotEmpty()
  optionId: number;
}

export class SubmitSurveyDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @IsNotEmpty()
  answers: AnswerDto[];
}
