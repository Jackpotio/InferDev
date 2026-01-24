import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ScoreDto {
  @IsNumber()
  frontend: number;
  @IsNumber()
  backend: number;
  @IsNumber()
  ai: number;
}

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

  @ValidateNested()
  @Type(() => ScoreDto)
  scores: ScoreDto;
}
