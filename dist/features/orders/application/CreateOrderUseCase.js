"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderUseCase = void 0;
class CreateOrderUseCase {
    constructor(orderRepository, userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }
    async execute(productId, buyerUid) {
        const user = await this.userRepository.findByUid(buyerUid);
        if (!user)
            throw new Error("User not found");
        return await this.orderRepository.createOrder(productId, user.id);
    }
}
exports.CreateOrderUseCase = CreateOrderUseCase;
//# sourceMappingURL=CreateOrderUseCase.js.map