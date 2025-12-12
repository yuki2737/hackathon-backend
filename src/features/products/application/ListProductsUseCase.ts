import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";

export class ListProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  /**
   * 商品一覧取得
   * - uid が指定された場合は、そのユーザーが出品した商品のみ取得
   * - 指定がない場合は全商品を取得
   */
  async execute(keyword?: string, uid?: string): Promise<Product[]> {
    return await this.productRepository.findAll(keyword, uid);
  }
}
