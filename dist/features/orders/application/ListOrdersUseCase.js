"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrdersUseCase = void 0;
class ListOrdersUseCase {
    constructor(orderRepository, userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }
    async execute(uid) {
        if (!uid)
            return this.orderRepository.findAll();
        const user = await this.userRepository.findByUid(uid);
        if (!user)
            return [];
        return this.orderRepository.findAll(user.id);
    }
}
exports.ListOrdersUseCase = ListOrdersUseCase;
//# sourceMappingURL=ListOrdersUseCase.js.map