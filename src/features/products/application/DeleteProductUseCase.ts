import { IProductRepository } from "../domain/IProductRepository";

export class DeleteProductUseCase {
  constructor(private readonly repository: IProductRepository) {}

  async execute(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
