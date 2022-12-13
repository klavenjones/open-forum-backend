import { Module } from '@nestjs/common';
import { RegisterModule } from './auth/register/register.module';
import { UserModule } from './user/user.module';
import { LoginModule } from './auth/login/login.module';

@Module({
  imports: [UserModule, RegisterModule, LoginModule],
})
export class ApiModule {}
