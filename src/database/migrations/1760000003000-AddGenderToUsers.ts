import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGenderToUsers1760000003000 implements MigrationInterface {
  name = 'AddGenderToUsers1760000003000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "gender" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "gender"`);
  }
}
