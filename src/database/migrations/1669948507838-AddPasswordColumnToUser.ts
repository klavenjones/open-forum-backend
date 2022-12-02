import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordColumnToUser1669948507838 implements MigrationInterface {
    name = 'AddPasswordColumnToUser1669948507838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(60) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
