import { IProductRepository } from "../domain/IProductRepository";
import { UpdateProductDTO } from "./UpdateProductDTO";
export declare class UpdateProductUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(data: UpdateProductDTO): Promise<import("../domain/Product").Product>;
}
//# sourceMappingURL=UpdateProductUseCase.d.ts.map