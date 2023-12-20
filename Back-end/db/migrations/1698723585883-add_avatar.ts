import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatar1698723585883 implements MigrationInterface {
    name = 'AddAvatar1698723585883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatar\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatar\``);
    }

}
