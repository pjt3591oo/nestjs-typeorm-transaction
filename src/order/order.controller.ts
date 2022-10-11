import { Controller, Get } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) {}

  @Get()
  createOrder() {
    return this.orderService.createOrder();
  }

  @Get('transaction/query-runner')
  queryRunnerCreateOrder() {
    return this.orderService.queryRunnerCreateOrder();
  }

  @Get('transaction/with-repository')
  withRepositoryTransaction() {
    return this.orderService.withRepositoryTransaction();
  }
}