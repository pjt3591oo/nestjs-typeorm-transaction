import { Module } from "@nestjs/common";

import { RepositoryModule } from "src/database/repository/repository.module";

import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { PostRepository } from "./repository/post.repository";
import { UserRepository } from "./repository/user.repository";

@Module({
  imports : [
    RepositoryModule.forCustomRepository([UserRepository, PostRepository])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}