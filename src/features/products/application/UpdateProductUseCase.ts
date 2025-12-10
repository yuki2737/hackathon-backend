import { IProductRepository } from "../domain/IProductRepository";
import { UpdateProductDTO } from "./UpdateProductDTO";

export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(data: UpdateProductDTO) {
    const updatedProduct = await this.productRepository.update(data);
    return updatedProduct;
  }
}
