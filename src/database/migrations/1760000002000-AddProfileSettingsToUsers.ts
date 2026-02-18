import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfileSettingsToUsers1760000002000 implements MigrationInterface {
  name = 'AddProfileSettingsToUsers1760000002000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "notify_result_saved" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "notify_premium" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "plan" character varying NOT NULL DEFAULT 'free'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "plan"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "notify_premium"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "notify_result_saved"`);
  }
}
