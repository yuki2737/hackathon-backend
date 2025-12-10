"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderUseCase = void 0;
class CreateOrderUseCase {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(productId, buyerId) {
        return await this.orderRepository.createOrder(productId, buyerId);
    }
}
exports.CreateOrderUseCase = CreateOrderUseCase;
//# sourceMappingURL=CreateOrderUseCase.js.map