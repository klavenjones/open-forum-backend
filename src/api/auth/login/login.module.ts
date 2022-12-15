import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '10h',
      },
    }),
    PassportModule,
  ],
  controllers: [LoginController],
  providers: [LoginService, LocalStrategy, UserService, JwtStrategy],
  exports: [LoginService],
})
export class LoginModule {}
