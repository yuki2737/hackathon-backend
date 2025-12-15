import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ThreadRepository } from "../infrastructure/ThreadRepository";
import { CreateThreadUseCase } from "../application/CreateThreadUseCase";
import { GetThreadsUseCase } from "../application/GetThreadsUseCase";
import { GetThreadDetailUseCase } from "../application/GetThreadDetailUseCase";

const prisma = new PrismaClient();
const threadRepo = new ThreadRepository();

export class ThreadController {
  async create(req: Request, res: Response) {
    try {
      const { productId, buyerUid, sellerUid, type } = req.body;

      if (!productId || !buyerUid || !sellerUid) {
        return res
          .status(400)
          .json({ error: "productId, buyerUid, sellerUid are required" });
      }

      // uid(string) -> user.id(number)
      const buyer = await prisma.user.findUnique({ where: { uid: buyerUid } });
      const seller = await prisma.user.findUnique({
        where: { uid: sellerUid },
      });

      if (!buyer || !seller) {
        return res.status(400).json({ error: "buyer or seller not found" });
      }

      const useCase = new CreateThreadUseCase(threadRepo);
      const thread = await useCase.execute({
        productId: Number(productId),
        buyerId: buyer.id,
        sellerId: seller.id,
        type: type ?? "inquiry",
      });

      res.json({ thread });
    } catch (e: any) {
      console.error(e);
      res.status(400).json({ error: e.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const uid = req.query.uid as string;

      if (!uid) {
        return res.status(400).json({ error: "uid is required" });
      }

      // uid(string) -> user.id(number)
      const user = await prisma.user.findUnique({ where: { uid } });
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }

      const useCase = new GetThreadsUseCase(threadRepo);
      const threads = await useCase.execute(user.id);

      res.json({ threads });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  }

  async detail(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "invalid thread id" });
    }

    const useCase = new GetThreadDetailUseCase(threadRepo);
    const thread = await useCase.execute(id);

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    const product = await prisma.product.findUnique({
      where: { id: thread.productId },
    });

    res.json({ thread: { ...thread, product } });
  }
}
