
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Job } from './job.entity';

@Entity()
export class JobDetail {
  @PrimaryColumn()
  job_id: string;

  @Column()
  title: string;

  @Column()
  img: string;

  @Column('jsonb')
  subfields: string[];

  @Column('jsonb')
  similarJobs: string[];

  @OneToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job: Job;
}
