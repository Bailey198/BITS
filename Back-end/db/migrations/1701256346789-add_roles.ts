import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoles1701256346789 implements MigrationInterface {
    name = 'AddRoles1701256346789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` varchar(255) NOT NULL DEFAULT 'User'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    }

}
