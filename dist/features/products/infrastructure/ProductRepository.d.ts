import { User } from "@prisma/client";
import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";
export declare class ProductRepository implements IProductRepository {
    findAll(keyword?: string, uid?: string): Promise<Product[]>;
    findById(id: number): Promise<Product | null>;
    findUserByUid(uid: string): Promise<User | null>;
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
//# sourceMappingURL=ProductRepository.d.ts.map