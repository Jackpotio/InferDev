
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SurveyOption } from './survey-option.entity';

@Entity()
export class SurveyQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column('jsonb', { nullable: true })
  condition: any;

  @OneToMany(() => SurveyOption, option => option.question, {
    cascade: true,
  })
  options: SurveyOption[];
}
