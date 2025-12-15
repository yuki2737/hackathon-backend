import { IThreadRepository } from "../domain/IThreadRepository";

export class CreateThreadUseCase {
  constructor(private threadRepo: IThreadRepository) {}

  async execute(params: {
    productId: number;
    buyerId: number;
    sellerId: number;
    type: "inquiry" | "order";
  }) {
    return this.threadRepo.create({
      productId: params.productId,
      buyerId: params.buyerId,
      sellerId: params.sellerId,
      type: params.type,
    });
  }
}
