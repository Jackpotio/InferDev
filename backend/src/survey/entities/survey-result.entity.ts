
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { SubmittedAnswer } from './submitted-answer.entity';

@Entity()
export class SurveyResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topJob: string;

  @Column()
  topSubfield: string;

  @Column('jsonb')
  scores: Record<string, number>;

  @Column('jsonb')
  subfieldScores: Record<string, number>;

  @OneToMany(() => SubmittedAnswer, submittedAnswer => submittedAnswer.surveyResult, { cascade: true })
  submittedAnswers: SubmittedAnswer[];

  @CreateDateColumn()
  createdAt: Date;
}
