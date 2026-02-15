
import { Entity, PrimaryColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { CareerTrack } from './career-track.entity';
import { JobDetail } from './job-detail.entity';

@Entity('job')
export class Job {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => CareerTrack, (track) => track.jobs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trackId' })
  track: CareerTrack;

  @OneToOne(() => JobDetail, (jobDetail) => jobDetail.job)
  detail: JobDetail;
}
