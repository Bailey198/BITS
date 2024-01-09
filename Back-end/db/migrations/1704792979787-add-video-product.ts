import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVideoProduct1704792979787 implements MigrationInterface {
    name = 'AddVideoProduct1704792979787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`video\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`video\``);
    }

}
