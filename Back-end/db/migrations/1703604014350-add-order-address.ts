import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderAddress1703604014350 implements MigrationInterface {
    name = 'AddOrderAddress1703604014350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`address\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`address\``);
    }

}
