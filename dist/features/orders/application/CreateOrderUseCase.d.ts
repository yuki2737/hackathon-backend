import { IOrderRepository } from "../domain/IOrderRepository";
export declare class CreateOrderUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(productId: number, buyerId: number): Promise<import("../domain/Order").Order>;
}
//# sourceMappingURL=CreateOrderUseCase.d.ts.map