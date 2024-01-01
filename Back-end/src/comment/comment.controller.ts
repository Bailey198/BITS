import { Body, Get, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe, Query, Delete, Param, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FilterCommentDto } from './dto/filter-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentController {
    constructor(private commentService:CommentService){}

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    create(@Req() req: any, @Body() createCommentDto:CreateCommentDto){
        console.log(req['user_data']);
        
        return this.commentService.create(req['user_data'].id, createCommentDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Query() query:FilterCommentDto):Promise<any>{
        return this.commentService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.commentService.delete(Number(id));
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    update(@Param('id') id:string, @Body() updateCommentDto: UpdateCommentDto){
        return this.commentService.update(Number(id), updateCommentDto);
    }
}
