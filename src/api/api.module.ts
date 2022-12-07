import { Module } from '@nestjs/common';
import { RegisterModule } from './auth/register/register.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, RegisterModule],
})
export class ApiModule {}
