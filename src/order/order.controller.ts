import { Controller, Get } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) {}

  // 각각의 repository에서 save호출
  @Get()
  createOrder() {
    return this.orderService.createOrder();
  }

  @Get('transaction/query-runner')
  queryRunnerCreateOrder() {
    return this.orderService.queryRunnerCreateOrder();
  }

  // dataSource.transaction의 withRepository(extend Repository) 이용
  @Get('transaction/with-extend')
  withRepositoryTransactionExtend() {
    return this.orderService.withRepositoryTransactionExtend();
  }

  // dataSource.transaction의 withRepository(Custom Repository) 이용
  @Get('transaction/with-repository')
  withRepositoryTransactionRepository() {
    return this.orderService.withRepositoryTransactionRepository();
  }

  // await dataSource.transaction의 withRepository(Custom Repository) 이용
  // 정상적으로 처리되지 않음
  @Get('transaction/with-repository/promise')
  withRepositoryTransactionPromise() {
    return this.orderService.withRepositoryTransactionPromise();
  }
}