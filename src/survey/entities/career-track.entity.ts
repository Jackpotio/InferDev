
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Job } from './job.entity';

@Entity('career_track')
export class CareerTrack {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Job, (job) => job.track)
  jobs: Job[];
}
