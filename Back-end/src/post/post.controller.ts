import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { AuthGuard } from 'src/auth/auth.guard';
import { extname } from 'path';
import { PostService } from './post.service';
import { FilterPostDto } from './dto/filter-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
    constructor(private postService:PostService){}

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileInterceptor('thumbnail', {
        storage:storageConfig('post'),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg', '.jpeg', '.png']
            if(!allowedExtArr.includes(ext.toLowerCase())){
                req.fileValidationError = `Wrong file type. ${allowedExtArr.toString()}`
                cb(null, false);
            }else{
                const fileSize = parseInt(req.headers['content-length']);
                if(fileSize > 1024*1024*5){
                    req.fileValidationError = `File size too large`;
                    cb(null,false);
                }else{
                    cb(null, true);
                }
            }
        }
    }))
    create(@Req() req: any, @Body() createPostDto:CreatePostDto, @UploadedFile() file:Express.Multer.File){
        console.log(req['user_data']);
        console.log(createPostDto);
        console.log(file)
        if(req.fileValidationError){
            throw new BadRequestException(req.fileValidationError);
        }
        if(!file){
            throw new BadRequestException('File is required');
        }

        return this.postService.create(req['user_data'].id, {...createPostDto, thumbnail: file.destination+'/'+file.filename});
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Query() query:FilterPostDto):Promise<any>{
        return this.postService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findDetail(@Param('id') id:string):Promise<PostEntity>{
        return this.postService.findDetail(Number(id));
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    @UseInterceptors(FileInterceptor('thumbnail', {
        storage:storageConfig('post'),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg', '.jpeg', '.png']
            if(!allowedExtArr.includes(ext.toLowerCase())){
                req.fileValidationError = `Wrong file type. ${allowedExtArr.toString()}`
                cb(null, false);
            }else{
                const fileSize = parseInt(req.headers['content-length']);
                if(fileSize > 1024*1024*5){
                    req.fileValidationError = `File size too large`;
                    cb(null,false);
                }else{
                    cb(null, true);
                }
            }
        }
    }))
    updatePost(@Param('id') id:string, @Req() req:any, @Body() updatePostDto:UpdatePostDto, @UploadedFile() file:Express.Multer.File){
        if(req.fileValidationError){
            throw new BadRequestException(req.fileValidationError);
        }

        if (file) {
            updatePostDto.thumbnail = file.destination + '/' + file.filename;
        }

        return this.postService.updatePost(Number(id), updatePostDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deletePost(@Param('id') id:string){
        return this.postService.deletePost(Number(id));
    }
}
