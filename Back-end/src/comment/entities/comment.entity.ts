import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body:string;

    @Column()
    userName:string;

    @Column()
    userId: number;

    @Column({type:'int', default: null})
    parentId: number;

    @Column({type:'int', default: null})
    productId: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}