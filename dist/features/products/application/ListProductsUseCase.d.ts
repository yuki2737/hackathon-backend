import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";
export declare class ListProductsUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(): Promise<Product[]>;
}
//# sourceMappingURL=ListProductsUseCase.d.ts.map