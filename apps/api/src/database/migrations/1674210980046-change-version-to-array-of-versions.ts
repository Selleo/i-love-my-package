import { MigrationInterface, QueryRunner } from "typeorm";

export class changeVersionToArrayOfVersions1674210980046 implements MigrationInterface {
    name = 'changeVersionToArrayOfVersions1674210980046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "json_package_entity" RENAME COLUMN "version" TO "versions"`);
        await queryRunner.query(`ALTER TABLE "json_package_entity" DROP COLUMN "versions"`);
        await queryRunner.query(`ALTER TABLE "json_package_entity" ADD "versions" text array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "json_package_entity" DROP COLUMN "versions"`);
        await queryRunner.query(`ALTER TABLE "json_package_entity" ADD "versions" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "json_package_entity" RENAME COLUMN "versions" TO "version"`);
    }

}
