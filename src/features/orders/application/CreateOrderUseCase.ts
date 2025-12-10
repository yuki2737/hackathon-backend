import { IOrderRepository } from "../domain/IOrderRepository";

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(productId: number, buyerId: number) {
    return await this.orderRepository.createOrder(productId, buyerId);
  }
}
