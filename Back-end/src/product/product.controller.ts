import { BadRequestException, Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { FilterProductDto } from './dto/filter-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';

@Controller('products')
export class ProductController {
    constructor(private productService:ProductService){} 

    @Get()
    findAll(@Query() query: FilterProductDto):Promise<Product[]> {
        console.log(query)
        return this.productService.findAll(query);
    }

    @Get(':id')
    fineOne(@Param('id') id:string): Promise<Product>{
        return this.productService.findOne(Number(id));
    }

    @Post()
    @Roles(['Admin'])
    @UseInterceptors(FileInterceptor('banner_img', {
        storage:storageConfig('banner_img'),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg', '.jpeg', '.png']
            if(!allowedExtArr.includes(ext.toLowerCase())){
                req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
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
    create(@Body() createProductDto: CreateProductDto, @Req() req: any, @UploadedFile() file: Express.Multer.File): Promise<Product>{
        console.log('user data', req.user_data)
        console.log(file);

        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new BadRequestException('File is required')
        }
        
        return this.productService.create({...createProductDto, banner_img: file.fieldname+'/'+file.filename});
    }

    @Put(':id')
    @Roles(['Admin'])
    @UseInterceptors(FileInterceptor('banner_img', {
        storage:storageConfig('banner_img'),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg', '.jpeg', '.png']
            if(!allowedExtArr.includes(ext.toLowerCase())){
                req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
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
    update(@Param('id') id:string, @Body() updateProductDto: UpdateProductDto,  @Req() req: any, @UploadedFile() file: Express.Multer.File){
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (file) {
            updateProductDto.banner_img = file.fieldname + '/' + file.filename;
        }
        return this.productService.update(Number(id), updateProductDto);
    }

    @Delete('multiple')
    @Roles(['Admin'])
    multipleDelete(@Query('ids', new ParseArrayPipe({ items: String, separator: ',' })) ids: string[]) {
        console.log("delete multi=> ", ids)
        return this.productService.multipleDelete(ids)
    }

    @Delete(':id')
    @Roles(['Admin'])
    delete(@Param('id') id: string) {
        return this.productService.delete(Number(id));
    }

    @Post('upload-img/:id')
    @Roles(['Admin'])
    @UseInterceptors(FileInterceptor('banner_img', {
        storage:storageConfig('banner_img'),
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
    uploadImg(@Param('id') id:string, @Req() req:any, @UploadedFile() file:Express.Multer.File) {
        console.log('upload Banner Img')      
        console.log(file)
        if(req.fileValidationError){
            throw new BadRequestException(req.fileValidationError);
        }
        if(!file){
            throw new BadRequestException('File is required');
        }
        
        return this.productService.updateBannerImg(Number(id), file.fieldname + '/' + file.filename);
    }
}
