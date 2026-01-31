
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SurveyQuestion } from './survey-question.entity';

@Entity()
export class SurveyOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column('jsonb')
  score: Record<string, number>;

  @Column('jsonb')
  subfieldScores: Record<string, number>;

  @ManyToOne(() => SurveyQuestion, question => question.options)
  question: SurveyQuestion;
}
