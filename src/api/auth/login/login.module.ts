import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [LoginController],
  providers: [LoginService, LocalStrategy, UserService],
})
export class LoginModule {}
