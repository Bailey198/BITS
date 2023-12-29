import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLongTextForDescription1703836445571 implements MigrationInterface {
    name = 'AddLongTextForDescription1703836445571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`description\` longtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
