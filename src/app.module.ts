import { Module } from '@nestjs/common';

import { OrderModule } from './order/order.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    OrderModule,
  ],
})
export class AppModule {}
