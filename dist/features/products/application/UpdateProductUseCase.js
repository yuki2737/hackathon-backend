"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductUseCase = void 0;
class UpdateProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(data) {
        const updatedProduct = await this.productRepository.update(data);
        return updatedProduct;
    }
}
exports.UpdateProductUseCase = UpdateProductUseCase;
//# sourceMappingURL=UpdateProductUseCase.js.map