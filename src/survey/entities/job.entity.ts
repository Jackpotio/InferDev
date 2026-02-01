
import { Entity, PrimaryColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { CareerTrack } from './career-track.entity';
import { JobDetail } from './job-detail.entity';

@Entity('Job')
export class Job {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => CareerTrack, (track) => track.jobs)
  track: CareerTrack;

  @Column()
  trackId: string;

  @OneToOne(() => JobDetail, (jobDetail) => jobDetail.job)
  detail: JobDetail;
}
