import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";
import { Prisma } from "@prisma/client"; // ← Statusはimportしない

export interface CreateProductDTO {
  uid: string;
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
    // uid から userId を取得
    const user = await this.productRepository.findUserByUid(data.uid);
    if (!user) {
      throw new Error("User not found");
    }

    const product = new Product(
      0,
      user.id, // uid → userId に変換
      data.category,
      data.title,
      data.description,
      data.price,
      data.imageUrl,
      data.status ?? "selling",
      new Date(),
      new Date()
    );

    return await this.productRepository.create(product);
  }
}
