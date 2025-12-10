"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductsUseCase = void 0;
class ListProductsUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute() {
        return await this.productRepository.findAll();
    }
}
exports.ListProductsUseCase = ListProductsUseCase;
//# sourceMappingURL=ListProductsUseCase.js.map