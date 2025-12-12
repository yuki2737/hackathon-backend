import { IOrderRepository } from "../domain/IOrderRepository";
import { UserRepository } from "../../auth/infrastructure/UserRepository";

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(productId: number, buyerUid: string) {
    const user = await this.userRepository.findByUid(buyerUid);
    if (!user) throw new Error("User not found");
    return await this.orderRepository.createOrder(productId, user.id);
  }
}
