import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Like, Repository, UpdateResult } from 'typeorm';
import { FilterProductDto } from './dto/filter-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product)private productRepository:Repository<Product>){}

    async findAll(query:FilterProductDto):Promise<any> {
        const itemsPerPage = Number(query.itemsPerPage) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1)*itemsPerPage;
        const keyword = query.search || '';
        const [res, total] = await this.productRepository.findAndCount({
            where:[
                {title:Like('%' + keyword + '%')},
            ],
            order: {created_at: "DESC"},
            take: itemsPerPage,
            skip: skip,
            select:['id', 'title', 'description', 'price', 'banner_img' , 'sale_numbers', 'active_players' , 'created_at', 'updated_at']
        })
        const lastPage = Math.ceil(total/itemsPerPage)
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        return {
            data:res,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        }

    }

    async findOne(id: number):Promise<Product>{
        return await this.productRepository.findOneBy({id});
    }

    async create(createProductDto: CreateProductDto):Promise<Product>{
        return await this.productRepository.save({...createProductDto});
    }

    async update(id:number, updateProductDto:UpdateProductDto):Promise<UpdateResult>{
        return await this.productRepository.update(id, updateProductDto);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.productRepository.delete(id);
    }

    async multipleDelete(ids: string[]): Promise<DeleteResult> {
        return await this.productRepository.delete({ id: In(ids) })
    }

    async updateBannerImg(id:number, banner_img:string):Promise<UpdateResult> {
        return await this.productRepository.update(id, { banner_img });
    }
}
