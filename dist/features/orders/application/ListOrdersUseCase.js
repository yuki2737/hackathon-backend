"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrdersUseCase = void 0;
class ListOrdersUseCase {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute() {
        return this.orderRepository.findAll();
    }
}
exports.ListOrdersUseCase = ListOrdersUseCase;
//# sourceMappingURL=ListOrdersUseCase.js.map