import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PostgresqlConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [ConfigService, PostgresqlConfigService],
  exports: [ConfigService, PostgresqlConfigService],
})
export class PostgresqlConfigurationModule {}
