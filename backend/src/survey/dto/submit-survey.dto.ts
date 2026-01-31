
import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Answer {
  @IsNumber()
  questionId: number;

  @IsNumber()
  optionId: number;
}

export class SubmitSurveyDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Answer)
  answers: Answer[];

  @IsString()
  @IsIn(['it', 'non-it'])
  major: string;

  @IsString()
  @IsOptional()
  itMajorDetail?: string;

  @IsString()
  @IsIn(['yes', 'no'])
  codingExp: string;

  @IsString()
  @IsOptional()
  codingLevel?: string;
}
