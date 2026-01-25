import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
  @IsNumber()
  questionId: number;

  @IsNumber()
  optionIndex: number;
}

export class SubmitSurveyDto {
  @IsString()
  @IsNotEmpty()
  major: 'it' | 'non-it';
  itMajorDetail?: string;

  @IsString()
  @IsNotEmpty()
  codingExp: 'yes' | 'no';
  codingLevel?: string;

  @ValidateNested()
  @Type(() => AnswerDto)
  answer: AnswerDto[];
/*key: 테마명 value: 점수*/
  @IsObject()
  scores: Record<string, number>;
}
