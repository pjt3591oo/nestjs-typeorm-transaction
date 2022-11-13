import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";

import { RepositoryModule } from "src/database/repository/repository.module";

import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { PostRepository } from "./repository/post.repository";
import { UserRepository } from "./repository/user.repository";

@Module({
  imports : [
    DatabaseModule,
    RepositoryModule.forCustomRepository([UserRepository, PostRepository])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}