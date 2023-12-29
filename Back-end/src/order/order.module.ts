import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    TypeOrmModule.forFeature([Order, User]),
    ConfigModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
