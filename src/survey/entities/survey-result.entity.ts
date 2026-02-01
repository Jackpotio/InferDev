
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToOne } from 'typeorm';
import { SubmittedAnswer } from './submitted-answer.entity';
import { Job } from './job.entity';

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

  @ManyToOne(() => Job, {
    nullable: true,
    eager: true, // Always load the recommendedJob relation
  })
  recommendedJob: Job;
}
