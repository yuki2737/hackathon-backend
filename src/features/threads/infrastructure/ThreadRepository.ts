import { PrismaClient } from "@prisma/client";
import { IThreadRepository } from "../domain/IThreadRepository";
import { Thread } from "../domain/Thread";

const prisma = new PrismaClient();

export class ThreadRepository implements IThreadRepository {
  async create(params: {
    productId: number;
    buyerId: number;
    sellerId: number;
    type: "inquiry" | "order";
  }): Promise<Thread> {
    // ① 既存スレッドを検索
    const existing = await prisma.thread.findFirst({
      where: {
        productId: params.productId,
        buyerId: params.buyerId,
        type: params.type,
      },
    });

    // ② 存在すればそれを返す
    if (existing) {
      return new Thread(
        existing.id,
        existing.productId,
        existing.buyerId,
        existing.sellerId,
        existing.type,
        existing.createdAt,
        existing.updatedAt,
        null
      );
    }

    // ③ なければ新規作成
    const t = await prisma.thread.create({
      data: {
        productId: params.productId,
        buyerId: params.buyerId,
        sellerId: params.sellerId,
        type: params.type,
      },
    });

    return new Thread(
      t.id,
      t.productId,
      t.buyerId,
      t.sellerId,
      t.type,
      t.createdAt,
      t.updatedAt,
      null
    );
  }

  async findByUserId(userId: number): Promise<Thread[]> {
    const threads = await prisma.thread.findMany({
      where: {
        OR: [{ buyerId: userId }, { sellerId: userId }],
      },
      include: {
        product: true,
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return threads.map(
      (t) =>
        new Thread(
          t.id,
          t.productId,
          t.buyerId,
          t.sellerId,
          t.type as "inquiry" | "order",
          t.createdAt,
          t.updatedAt,
          t.messages?.[0]?.content ?? null
        )
    );
  }

  async findById(id: number): Promise<Thread | null> {
    const t = await prisma.thread.findUnique({
      where: { id },
      include: {
        product: true,
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });
    if (!t) return null;

    return new Thread(
      t.id,
      t.productId,
      t.buyerId,
      t.sellerId,
      t.type,
      t.createdAt,
      t.updatedAt,
      t.messages?.[0]?.content ?? null
    );
  }
}
