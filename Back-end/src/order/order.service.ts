import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrderDto } from './dto/filter-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Order) private orderRepository: Repository<Order>
     ){}

     async create(userId: number, createOrderDto: CreateOrderDto):Promise<Order>{
        const user = await this.userRepository.findOneBy({id: userId});

        try{
            const res = await this.orderRepository.save({
                ...createOrderDto, user
            })

            return await this.orderRepository.findOneBy({id: res.id});
        }catch (error) {
            throw new HttpException(`Can not create order`, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(query:FilterOrderDto):Promise<any>{
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const search = query.search || "";

        const skip = (page - 1) * items_per_page;
        const [res,total] = await this.orderRepository.findAndCount({
            where: [
                {
                    address: Like('%'+ search +'%'),
                }
            ],
            order: {created_at:'DESC'},
            take: items_per_page,
            skip:skip,
            relations:{
                user:true,
            },
            select:{
                user:{
                    id:true,
                    firstName:true,
                    lastName:true,
                    email:true,
                    avatar:true
                }
            }
        })

        const lastPage = Math.ceil(total/items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page -1;

        return {
            data:res,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        }
    }

}
