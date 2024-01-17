import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    TypeOrmModule.forFeature([Comment, User]),
    ConfigModule
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}