
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Job } from './job.entity';

@Entity('job_detail')
export class JobDetail {
  @PrimaryColumn()
  jobId: string;

  @OneToOne(() => Job, job => job.detail, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @Column()
  title: string;

  @Column()
  img: string;

  @Column('simple-array')
  subfields: string[];

  @Column('simple-array')
  strengths: string[];

  @Column('simple-array')
  similarJobs: string[];
}
