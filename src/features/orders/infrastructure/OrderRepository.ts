import { PrismaClient } from "@prisma/client";
import { IOrderRepository } from "../domain/IOrderRepository";
import { Order } from "../domain/Order";

const prisma = new PrismaClient();

export class OrderRepository implements IOrderRepository {
  async createOrder(productId: number, buyerId: number): Promise<Order> {
    // 商品状態チェック
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.status === "sold_out") {
      throw new Error("This product is already sold out");
    }

    // 注文作成
    const order = await prisma.order.create({
      data: {
        productId,
        buyerId,
      },
    });

    // Product status を sold_out に更新
    await prisma.product.update({
      where: { id: productId },
      data: { status: "sold_out" },
    });

    return new Order(
      order.id,
      order.productId,
      order.buyerId,
      order.purchasedAt
    );
  }

  async findAll(): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      orderBy: { purchasedAt: "desc" },
      include: {
        product: true,
        buyer: true,
      },
    });

    return orders.map(
      (order) =>
        new Order(order.id, order.productId, order.buyerId, order.purchasedAt)
    );
  }
}
