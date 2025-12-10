"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductDetailUseCase = void 0;
class GetProductDetailUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(id) {
        const product = await this.productRepository.findById(id);
        return product;
    }
}
exports.GetProductDetailUseCase = GetProductDetailUseCase;
//# sourceMappingURL=GetProductDetailUseCase.js.map