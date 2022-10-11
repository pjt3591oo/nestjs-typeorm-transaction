import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User } from 'src/entity/user.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: User,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ['DATABASE_SOURCE'], // imports로 가온 DatabaseModule의 exports된 provider를 useFactory에 인자로 전달한다.
    },
  ],
})
export class UserModule {}
