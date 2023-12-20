import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValueRefreshToken1698330770532 implements MigrationInterface {
    name = 'SetDefaultValueRefreshToken1698330770532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NOT NULL`);
    }

}
