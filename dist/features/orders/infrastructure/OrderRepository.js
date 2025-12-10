"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const client_1 = require("@prisma/client");
const Order_1 = require("../domain/Order");
const prisma = new client_1.PrismaClient();
class OrderRepository {
    async createOrder(productId, buyerId) {
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
        return new Order_1.Order(order.id, order.productId, order.buyerId, order.purchasedAt);
    }
    async findAll() {
        const orders = await prisma.order.findMany({
            orderBy: { purchasedAt: "desc" },
            include: {
                product: true,
                buyer: true,
            },
        });
        return orders.map((order) => new Order_1.Order(order.id, order.productId, order.buyerId, order.purchasedAt));
    }
}
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=OrderRepository.js.map