import { Thread } from "./Thread";

export interface IThreadRepository {
  create(params: {
    productId: number;
    buyerId: number;
    sellerId: number;
    type: "inquiry" | "order";
  }): Promise<Thread>;

  findByUserId(userId: number): Promise<Thread[]>;

  findById(threadId: number): Promise<Thread | null>;
}
