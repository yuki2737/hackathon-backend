import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";
export declare class GetProductDetailUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(id: number): Promise<Product | null>;
}
//# sourceMappingURL=GetProductDetailUseCase.d.ts.map