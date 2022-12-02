import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/api/user/user.entity';
import { UserModule } from 'src/api/user/user.module';
import { UserService } from 'src/api/user/user.service';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RegisterController],
  providers: [RegisterService, UserService],
})
export class RegisterModule {}
