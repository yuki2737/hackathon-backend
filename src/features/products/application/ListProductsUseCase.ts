import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";

export class ListProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}
