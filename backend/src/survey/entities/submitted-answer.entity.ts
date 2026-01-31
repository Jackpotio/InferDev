
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SurveyResult } from './survey-result.entity';
import { SurveyOption } from './survey-option.entity';
import { SurveyQuestion } from './survey-question.entity';

@Entity()
export class SubmittedAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SurveyResult, surveyResult => surveyResult.submittedAnswers)
  surveyResult: SurveyResult;

  @ManyToOne(() => SurveyQuestion)
  surveyQuestion: SurveyQuestion;

  @ManyToOne(() => SurveyOption)
  surveyOption: SurveyOption;
}
