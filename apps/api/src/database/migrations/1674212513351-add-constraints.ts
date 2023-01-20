import { MigrationInterface, QueryRunner } from "typeorm";

export class addConstraints1674212513351 implements MigrationInterface {
    name = 'addConstraints1674212513351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_json_packages_json_package_entity" ("user_id" integer NOT NULL, "json_package_entity_id" integer NOT NULL, CONSTRAINT "PK_cca69b9aa6ffb4ba06767d6858b" PRIMARY KEY ("user_id", "json_package_entity_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a2ce7cbbc2138e3478d8a59fcb" ON "user_json_packages_json_package_entity" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_242793ad0fdbffa46d0843025d" ON "user_json_packages_json_package_entity" ("json_package_entity_id") `);
        await queryRunner.query(`ALTER TABLE "user_json_packages_json_package_entity" ADD CONSTRAINT "FK_a2ce7cbbc2138e3478d8a59fcb1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_json_packages_json_package_entity" ADD CONSTRAINT "FK_242793ad0fdbffa46d0843025dd" FOREIGN KEY ("json_package_entity_id") REFERENCES "json_package_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_json_packages_json_package_entity" DROP CONSTRAINT "FK_242793ad0fdbffa46d0843025dd"`);
        await queryRunner.query(`ALTER TABLE "user_json_packages_json_package_entity" DROP CONSTRAINT "FK_a2ce7cbbc2138e3478d8a59fcb1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_242793ad0fdbffa46d0843025d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a2ce7cbbc2138e3478d8a59fcb"`);
        await queryRunner.query(`DROP TABLE "user_json_packages_json_package_entity"`);
    }

}
