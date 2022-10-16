import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const databaseProviders = [
  {
    provide: 'DATABASE_SOURCE',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const dataSource = new DataSource({
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
      });

      return dataSource.initialize();
    },
  },
];