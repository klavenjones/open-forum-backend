import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './typeorm/typeorm.module';
import { LoginModule } from './api/auth/login/login.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ApiModule, LoginModule],
})
export class AppModule {}
