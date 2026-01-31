
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Job {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
