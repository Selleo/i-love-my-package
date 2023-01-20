import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserPackageRelation1674208135175 implements MigrationInterface {
    name = 'addUserPackageRelation1674208135175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "json_package_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "version" character varying NOT NULL, CONSTRAINT "PK_9ded08e89824f31bfa196060497" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "json_package_entity"`);
    }

}
