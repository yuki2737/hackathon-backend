import { IOrderRepository } from "../domain/IOrderRepository";
import { UserRepository } from "../../auth/infrastructure/UserRepository";
export declare class CreateOrderUseCase {
    private readonly orderRepository;
    private readonly userRepository;
    constructor(orderRepository: IOrderRepository, userRepository: UserRepository);
    execute(productId: number, buyerUid: string): Promise<import("../domain/Order").Order>;
}
//# sourceMappingURL=CreateOrderUseCase.d.ts.map