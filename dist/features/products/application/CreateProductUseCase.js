"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductUseCase = void 0;
const Product_1 = require("../domain/Product");
class CreateProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(data) {
        const product = new Product_1.Product(0, data.userId, data.category, data.title, data.description, data.price, data.imageUrl, data.status ?? "selling", // ← Prisma enumに対応する文字列
        new Date(), new Date());
        return await this.productRepository.create(product);
    }
}
exports.CreateProductUseCase = CreateProductUseCase;
//# sourceMappingURL=CreateProductUseCase.js.map