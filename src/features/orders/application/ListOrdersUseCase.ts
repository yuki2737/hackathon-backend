// src/features/orders/application/ListOrdersUseCase.ts
import { OrderRepository } from "../infrastructure/OrderRepository";

export class ListOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute() {
    return this.orderRepository.findAll();
  }
}
