import { OrderRepository } from "../infrastructure/OrderRepository";
import { UserRepository } from "../../auth/infrastructure/UserRepository";

export class ListOrdersUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(uid?: string) {
    if (!uid) return this.orderRepository.findAll();

    const user = await this.userRepository.findByUid(uid);
    if (!user) return [];

    return this.orderRepository.findAll(user.id);
  }
}
