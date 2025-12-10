import { IOrderRepository } from "../domain/IOrderRepository";
import { Order } from "../domain/Order";
export declare class OrderRepository implements IOrderRepository {
    createOrder(productId: number, buyerId: number): Promise<Order>;
    findAll(): Promise<Order[]>;
}
//# sourceMappingURL=OrderRepository.d.ts.map