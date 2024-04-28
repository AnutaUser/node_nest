import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './configuration';
import { PostgresqlConfigService } from './config.service';

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
