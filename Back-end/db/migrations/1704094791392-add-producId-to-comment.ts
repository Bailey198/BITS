import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProducIdToComment1704094791392 implements MigrationInterface {
    name = 'AddProducIdToComment1704094791392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`productId\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`productId\``);
    }

}
