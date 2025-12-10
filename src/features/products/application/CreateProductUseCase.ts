import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";
import { Prisma } from "@prisma/client"; // ← Statusはimportしない

export interface CreateProductDTO {
  userId: number;
  category: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  status?: string; // PrismaのEnumにマッピングする前段階
}

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(data: CreateProductDTO): Promise<Product> {
    const product = new Product(
      0,
      data.userId,
      data.category,
      data.title,
      data.description,
      data.price,
      data.imageUrl,
      data.status ?? "selling", // ← Prisma enumに対応する文字列
      new Date(),
      new Date()
    );

    return await this.productRepository.create(product);
  }
}
