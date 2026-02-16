
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @IsArray()
  stage1Answers?: AnswerDto[];

  @IsOptional()
  @IsArray()
  stage2Answers?: AnswerDto[];

  @IsOptional()
  @IsString()
  major?: string;

  @IsOptional()
  @IsString()
  itMajorDetail?: string;

  @IsOptional()
  @IsString()
  codingExp?: string;

  @IsOptional()
  @IsString()
  codingLevel?: string;

  @IsOptional()
  @IsString()
  track?: string;

  @IsOptional()
  @IsNumber()
  stage?: number;
}
