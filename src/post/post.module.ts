import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { PostController } from './post.controller';
import { PostService } from './post.service';

import { Post } from 'src/entity/post.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: Post,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
      inject: ['DATABASE_SOURCE'], // imports로 가온 DatabaseModule의 exports된 provider를 useFactory에 인자로 전달한다.
    },
  ],
})
export class PostModule {}
