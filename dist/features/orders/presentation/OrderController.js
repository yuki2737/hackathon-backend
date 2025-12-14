"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const OrderRepository_1 = require("../infrastructure/OrderRepository");
const CreateOrderUseCase_1 = require("../application/CreateOrderUseCase");
const ListOrdersUseCase_1 = require("../application/ListOrdersUseCase");
const UserRepository_1 = require("../../auth/infrastructure/UserRepository");
class OrderController {
    async create(req, res) {
        try {
            const { productId, buyerUid } = req.body;
            if (!productId || !buyerUid) {
                return res
                    .status(400)
                    .json({ error: "productId and buyerUid are required" });
            }
            const useCase = new CreateOrderUseCase_1.CreateOrderUseCase(new OrderRepository_1.OrderRepository(), new UserRepository_1.UserRepository());
            const order = await useCase.execute(Number(productId), buyerUid);
            return res.status(201).json({ message: "Order created", order });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async list(req, res) {
        try {
            const uid = typeof req.query.uid === "string" ? req.query.uid : undefined;
            const useCase = new ListOrdersUseCase_1.ListOrdersUseCase(new OrderRepository_1.OrderRepository(), new UserRepository_1.UserRepository());
            const orders = await useCase.execute(uid);
            return res.json({ message: "Orders fetched", orders });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=OrderController.js.map