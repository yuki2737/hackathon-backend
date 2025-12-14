import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";
export declare class ListProductsUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    /**
     * 商品一覧取得
     * - uid が指定された場合は、そのユーザーが出品した商品のみ取得
     * - 指定がない場合は全商品を取得
     */
    execute(keyword?: string, uid?: string): Promise<Product[]>;
}
//# sourceMappingURL=ListProductsUseCase.d.ts.map