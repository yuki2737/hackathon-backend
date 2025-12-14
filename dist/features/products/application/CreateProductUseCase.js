"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductUseCase = void 0;
const Product_1 = require("../domain/Product");
class CreateProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(data) {
        // uid から userId を取得
        const user = await this.productRepository.findUserByUid(data.uid);
        if (!user) {
            throw new Error("User not found");
        }
        const product = new Product_1.Product(0, user.id, // uid → userId に変換
        data.category, data.title, data.description, data.price, data.imageUrl, data.status ?? "selling", new Date(), new Date());
        return await this.productRepository.create(product);
    }
}
exports.CreateProductUseCase = CreateProductUseCase;
//# sourceMappingURL=CreateProductUseCase.js.map