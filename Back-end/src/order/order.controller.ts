import { Body, Get, Controller, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrderDto } from './dto/filter-order.dto';

@Controller('orders')
export class OrderController {
    constructor(private orderService:OrderService){}

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    create(@Req() req: any, @Body() createOrderDto:CreateOrderDto){
       
        return this.orderService.create(req['user_data'].id, {...createOrderDto});
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Query() query:FilterOrderDto):Promise<any>{
        return this.orderService.findAll(query);
    }
}
