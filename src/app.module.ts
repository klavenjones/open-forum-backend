import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvPath } from './common/helpers/env.helper';
import { TypeOrmConfigService } from './typeorm/typeorm.service';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './typeorm/typeorm.module';


const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [ConfigModule.forRoot({ envFilePath, isGlobal: true }), DatabaseModule, ApiModule],
})
export class AppModule {}
