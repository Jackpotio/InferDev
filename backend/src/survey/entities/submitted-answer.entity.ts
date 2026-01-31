
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SurveyResult } from './survey-result.entity';
import { SurveyOption } from './survey-option.entity';

@Entity()
export class SubmittedAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SurveyResult, surveyResult => surveyResult.submittedAnswers)
  surveyResult: SurveyResult;

  @ManyToOne(() => SurveyOption)
  surveyOption: SurveyOption;
}
