import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { FilterProductDto } from './dto/filter-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';

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
    create(@Body() createProductDto: CreateProductDto): Promise<Product>{
        return this.productService.create(createProductDto);
    }

    @Put(':id')
    @Roles(['Admin'])
    update(@Param('id') id:string, @Body() updateProductDto: UpdateProductDto){
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
}
