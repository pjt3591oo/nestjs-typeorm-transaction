import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { databaseProviders } from './database.providers';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          host: configService.get('database.host'),
          username: configService.get('database.user'),
          port: configService.get('database.port'),
          type: 'mysql',
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          entities: [
            join(__dirname, '/../**/*.entity{.ts,.js}'),
          ],
          synchronize: configService.get('database.synchronize'),
          logging: configService.get('database.logging'),
        };
      },
    }),
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule { }