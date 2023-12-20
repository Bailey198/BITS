import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductTable1702460524979 implements MigrationInterface {
    name = 'AddProductTable1702460524979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL DEFAULT '10', \`banner_img\` varchar(255) NULL, \`sale_numbers\` int NOT NULL DEFAULT '500', \`active_players\` int NOT NULL DEFAULT '100', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
