import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";

export class GetProductDetailUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: number): Promise<Product | null> {
    const product = await this.productRepository.findById(id);
    return product;
  }
}
