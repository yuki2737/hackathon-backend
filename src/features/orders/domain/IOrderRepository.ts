import { Order } from "./Order";

export interface IOrderRepository {
  createOrder(productId: number, buyerId: number): Promise<Order>;
}
