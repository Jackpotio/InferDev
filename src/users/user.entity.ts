import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type UserRole = 'user' | 'admin';
export type AuthProvider = 'local' | 'google' | 'naver';
export type UserPlan = 'free' | 'premium';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', nullable: true })
  email: string | null;

  @Column({ name: 'password_hash', nullable: true })
  passwordHash: string | null;

  @Column({ name: 'provider', type: 'varchar', default: 'local' })
  provider: AuthProvider;

  @Column({ name: 'provider_user_id', nullable: true })
  providerUserId: string | null;

  @Column({ name: 'display_name', nullable: true })
  displayName: string | null;

  @Column({ name: 'notify_result_saved', type: 'boolean', default: true })
  notifyResultSaved: boolean;

  @Column({ name: 'notify_premium', type: 'boolean', default: false })
  notifyPremium: boolean;

  @Column({ name: 'plan', type: 'varchar', default: 'free' })
  plan: UserPlan;

  @Column({ name: 'role', type: 'varchar', default: 'user' })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
