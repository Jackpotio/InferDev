
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SurveyQuestion } from './survey-question.entity';

@Entity()
export class SurveyOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  // 이 선택지의 전체 영향도 (선택지 가중치)
  @Column({ type: 'int' })
  score: number;

  // 직군별 세부 점수 (핵심)
  @Column({ type: 'jsonb' })
  subfieldScores: Record<string, number>;

  @ManyToOne(() => SurveyQuestion, question => question.options)
  question: SurveyQuestion;
}
