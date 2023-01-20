import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserRatingRelation1674216568645 implements MigrationInterface {
    name = 'addUserRatingRelation1674216568645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rating" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "reactions" json, "user_id" integer, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating_json_package_json_package_entity" ("rating_id" integer NOT NULL, "json_package_entity_id" integer NOT NULL, CONSTRAINT "PK_ecbe74818a093424e240269525c" PRIMARY KEY ("rating_id", "json_package_entity_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ebf3cb14ea8bffa692959eff7d" ON "rating_json_package_json_package_entity" ("rating_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_8e0a6958728abb00ea7bd28600" ON "rating_json_package_json_package_entity" ("json_package_entity_id") `);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_17618c8d69b7e2e287bf9f8fbb3" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating_json_package_json_package_entity" ADD CONSTRAINT "FK_ebf3cb14ea8bffa692959eff7de" FOREIGN KEY ("rating_id") REFERENCES "rating"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rating_json_package_json_package_entity" ADD CONSTRAINT "FK_8e0a6958728abb00ea7bd28600f" FOREIGN KEY ("json_package_entity_id") REFERENCES "json_package_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating_json_package_json_package_entity" DROP CONSTRAINT "FK_8e0a6958728abb00ea7bd28600f"`);
        await queryRunner.query(`ALTER TABLE "rating_json_package_json_package_entity" DROP CONSTRAINT "FK_ebf3cb14ea8bffa692959eff7de"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_17618c8d69b7e2e287bf9f8fbb3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e0a6958728abb00ea7bd28600"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ebf3cb14ea8bffa692959eff7d"`);
        await queryRunner.query(`DROP TABLE "rating_json_package_json_package_entity"`);
        await queryRunner.query(`DROP TABLE "rating"`);
    }

}
