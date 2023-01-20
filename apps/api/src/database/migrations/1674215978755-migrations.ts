import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1674215978755 implements MigrationInterface {
    name = 'migrations1674215978755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "json_package_entity" DROP COLUMN "versions"`);
        await queryRunner.query(`ALTER TABLE "json_package_entity" ADD "versions" json NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "json_package_entity" DROP COLUMN "versions"`);
        await queryRunner.query(`ALTER TABLE "json_package_entity" ADD "versions" text array NOT NULL DEFAULT '{}'`);
    }

}
