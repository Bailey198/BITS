import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FilterCommentDto } from './dto/filter-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';


@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Comment) private commentRepository: Repository<Comment>
     ){}
    async create(userId: number, createCommentDto:CreateCommentDto):Promise<Comment>{
        const user = await this.userRepository.findOneBy({id: userId});
        const userName = user.firstName + " " + user.lastName;

        try{
            const res = await this.commentRepository.save({...createCommentDto, 
                userName: userName, userId: user.id})

            return await this.commentRepository.findOneBy({id: res.id});
        }catch (error) {
            throw new HttpException(`Can not create comment`, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(query:FilterCommentDto):Promise<any>{
        const items_per_page = Number(query.itemsPerPage) || 10;
        const page = Number(query.page) || 1;

        const skip = (page - 1) * items_per_page;
        const [res,total] = await this.commentRepository.findAndCount({
            order: {created_at:'DESC'},
            take: items_per_page,
            skip:skip,
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

    async delete(id: number): Promise<DeleteResult> {
        return await this.commentRepository.delete(id);
    }

    async update(id:number, updateCommentDto:UpdateCommentDto):Promise<UpdateResult>{
        return await this.commentRepository.update(id, updateCommentDto);
    }
}
