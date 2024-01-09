import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string;

    @Column({type: 'longtext'})
    description:string;

    @Column()
    category:string;

    @Column()
    video:string;

    @Column({type:'int', default:10})
    price:number;

    @Column({nullable: true, default: null})
    banner_img: string;

    @Column({type:'int', default:500})
    sale_numbers:number;

    @Column({type:'int', default:100})
    active_players:number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
}