import { BadRequestException, Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, Req, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { Roles } from 'src/auth/decorator/roles.decorator';
@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @UseGuards(AuthGuard)
    //@SetMetadata('roles', ['Admin'])
    @Roles(['Admin'])
    @Get()
    findAll(@Query() query: FilterUserDto):Promise<User[]> {
        console.log(query)
        return this.userService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Get('current-user')
    findCurrentUser(@Param('id') id:string, @Req() req:any): Promise<User>{
        console.log(req['user_data'])
        return this.userService.findCurrent(req['user_data'].email);
    }

    @Roles(['Admin'])
    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id:string, @Req() req:any): Promise<User>{
        console.log(req['user_data'])
        return this.userService.findOne(Number(id));
    }

    

    @Post()
    @Roles(['Admin'])
    create(@Body() createUserDto: CreateUserDto): Promise<User>{
        return this.userService.create(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Roles(['Admin'])
    @Put(':id')
    update(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto){
        return this.userService.update(Number(id), updateUserDto);
    }

    @Delete('multiple')
    @Roles(['Admin'])
    multipleDelete(@Query('ids', new ParseArrayPipe({ items: String, separator: ',' })) ids: string[]) {
        console.log("delete multi=> ", ids)
        return this.userService.multipleDelete(ids);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(Number(id));
    }
    
    @Post('upload-avatar')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('avatar', {
        storage:storageConfig('avatar'),
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
    uploadAvatar(@Req() req:any, @UploadedFile() file:Express.Multer.File) {
        console.log('upload avatar')
        console.log('user data', req['user_data'])
        console.log(file)
        if(req.fileValidationError){
            throw new BadRequestException(req.fileValidationError);
        }
        if(!file){
            throw new BadRequestException('File is required');
        }
        
        return this.userService.updateAvatar(req['user_data'].id, file.fieldname + '/' + file.filename);
    }
}
