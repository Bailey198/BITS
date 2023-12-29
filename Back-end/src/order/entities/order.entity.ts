import { Category } from "src/category/entities/category.entity";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address:string;

    @Column({type:'int', default:1})
    orderTotal:number;
    
    @Column({type:'int', default:1})
    status:number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    @ManyToOne(() => User, (user) => user.orders)
    user:User;
}