"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const OrderRepository_1 = require("../infrastructure/OrderRepository");
const CreateOrderUseCase_1 = require("../application/CreateOrderUseCase");
const ListOrdersUseCase_1 = require("../application/ListOrdersUseCase");
class OrderController {
    async create(req, res) {
        try {
            const { productId, buyerId } = req.body;
            const useCase = new CreateOrderUseCase_1.CreateOrderUseCase(new OrderRepository_1.OrderRepository());
            const order = await useCase.execute(productId, buyerId);
            return res.status(201).json({ message: "Order created", order });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async list(req, res) {
        try {
            const useCase = new ListOrdersUseCase_1.ListOrdersUseCase(new OrderRepository_1.OrderRepository());
            const orders = await useCase.execute();
            return res.json({ message: "Orders fetched", orders });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=OrderController.js.map