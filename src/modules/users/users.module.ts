import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AccountModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule { }
