import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register( {defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService,TypeOrmModule],
})
export class UsersModule {}
