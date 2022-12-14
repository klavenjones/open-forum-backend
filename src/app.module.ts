import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helpers/env.helper';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './typeorm/typeorm.module';
import { LoginModule } from './api/auth/login/login.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [ConfigModule.forRoot({ envFilePath, isGlobal: true }), DatabaseModule, ApiModule, LoginModule],
})
export class AppModule {}
