import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { Course } from 'src/courses/course.entity';
import { S3UploadsService } from 'src/common/upload-file';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserRepository, Course]),
  ],
  controllers: [UsersController],
  providers: [UsersService, S3UploadsService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
