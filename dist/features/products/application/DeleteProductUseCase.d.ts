import { IProductRepository } from "../domain/IProductRepository";
export declare class DeleteProductUseCase {
    private readonly repository;
    constructor(repository: IProductRepository);
    execute(id: number): Promise<void>;
}
//# sourceMappingURL=DeleteProductUseCase.d.ts.map