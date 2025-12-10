import { Product } from "./Product";
export interface IProductRepository {
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product | null>;
    create(product: Product): Promise<Product>;
    update(data: {
        id: number;
        title?: string;
        description?: string;
        price?: number;
        imageUrl?: string;
        status?: string;
        category?: string;
    }): Promise<Product>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=IProductRepository.d.ts.map