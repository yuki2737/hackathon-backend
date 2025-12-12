// src/features/products/domain/IProductRepository.ts
import { Product } from "./Product";

export interface IProductRepository {
  findAll(keyword?: string, uid?: string): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  create(product: Product): Promise<Product>; // ← 追加
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
  findUserByUid(uid: string): Promise<any>;
}
