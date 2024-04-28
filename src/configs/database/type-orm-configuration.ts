import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresqlConfigurationModule } from './config.module';
import { PostgresqlConfigService } from './config.service';

export class TypeOrmConfiguration {
  static get config(): TypeOrmModuleAsyncOptions {
    return {
      imports: [PostgresqlConfigurationModule],
      useFactory: (configService: PostgresqlConfigService) => ({
        type: 'postgres',
        host: configService.host,
        port: configService.port,
        username: configService.user,
        password: configService.password,
        database: configService.database,
        synchronize: true,
        entities: [`${process.cwd()}/**/*.entity{.js, .ts}`],
      }),
      inject: [PostgresqlConfigService],
    };
  }
}
