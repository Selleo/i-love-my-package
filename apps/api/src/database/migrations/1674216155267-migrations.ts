import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1674216155267 implements MigrationInterface {
    name = 'migrations1674216155267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "json_package_entity" DROP COLUMN "versions"`);
        await queryRunner.query(`ALTER TABLE "json_package_entity" ADD "versions" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "json_package_entity" DROP COLUMN "versions"`);
        await queryRunner.query(`ALTER TABLE "json_package_entity" ADD "versions" json NOT NULL DEFAULT '{}'`);
    }

}
