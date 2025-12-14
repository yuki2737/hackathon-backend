"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductsUseCase = void 0;
class ListProductsUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    /**
     * 商品一覧取得
     * - uid が指定された場合は、そのユーザーが出品した商品のみ取得
     * - 指定がない場合は全商品を取得
     */
    async execute(keyword, uid) {
        return await this.productRepository.findAll(keyword, uid);
    }
}
exports.ListProductsUseCase = ListProductsUseCase;
//# sourceMappingURL=ListProductsUseCase.js.map