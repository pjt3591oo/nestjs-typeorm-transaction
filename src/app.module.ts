import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OrderModule } from './order/order.module';

import { validate } from './config/env.validation';
import configuration from './config/configuration';

@Module({
  imports: [
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validate,
    }),
  ],
})
export class AppModule {}
