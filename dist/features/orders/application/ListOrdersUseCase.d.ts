import { OrderRepository } from "../infrastructure/OrderRepository";
export declare class ListOrdersUseCase {
    private readonly orderRepository;
    constructor(orderRepository: OrderRepository);
    execute(): Promise<import("../domain/Order").Order[]>;
}
//# sourceMappingURL=ListOrdersUseCase.d.ts.map