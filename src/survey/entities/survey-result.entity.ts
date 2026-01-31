
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { SubmittedAnswer } from './submitted-answer.entity';

@Entity()
export class SurveyResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column()
  totalScore: number;

  @Column()
  resultSummary: string;

  @CreateDateColumn()
  submittedAt: Date;

  @OneToMany(() => SubmittedAnswer, submittedAnswer => submittedAnswer.surveyResult, { cascade: true })
  submittedAnswers: SubmittedAnswer[];
}
