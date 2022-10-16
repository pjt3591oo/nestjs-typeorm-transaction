import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { OrderModule } from './order/order.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';


import { validate } from './config/env.validation';
import configuration from './config/configuration';

@Module({
  imports: [
    UserModule,
    PostModule,
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
