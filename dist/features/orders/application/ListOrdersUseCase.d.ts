import { OrderRepository } from "../infrastructure/OrderRepository";
import { UserRepository } from "../../auth/infrastructure/UserRepository";
export declare class ListOrdersUseCase {
    private readonly orderRepository;
    private readonly userRepository;
    constructor(orderRepository: OrderRepository, userRepository: UserRepository);
    execute(uid?: string): Promise<import("../domain/Order").Order[]>;
}
//# sourceMappingURL=ListOrdersUseCase.d.ts.map