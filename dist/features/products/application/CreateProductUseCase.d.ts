import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";
export interface CreateProductDTO {
    uid: string;
    category: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    status?: string;
}
export declare class CreateProductUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(data: CreateProductDTO): Promise<Product>;
}
//# sourceMappingURL=CreateProductUseCase.d.ts.map