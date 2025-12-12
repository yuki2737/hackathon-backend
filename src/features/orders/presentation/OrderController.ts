import { Request, Response } from "express";
import { OrderRepository } from "../infrastructure/OrderRepository";
import { CreateOrderUseCase } from "../application/CreateOrderUseCase";
import { ListOrdersUseCase } from "../application/ListOrdersUseCase";
import { UserRepository } from "../../auth/infrastructure/UserRepository";

export class OrderController {
  async create(req: Request, res: Response) {
    try {
      const { productId, buyerUid } = req.body;

      if (!productId || !buyerUid) {
        return res
          .status(400)
          .json({ error: "productId and buyerUid are required" });
      }

      const useCase = new CreateOrderUseCase(
        new OrderRepository(),
        new UserRepository()
      );

      const order = await useCase.execute(Number(productId), buyerUid);

      return res.status(201).json({ message: "Order created", order });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const uid = typeof req.query.uid === "string" ? req.query.uid : undefined;

      const useCase = new ListOrdersUseCase(
        new OrderRepository(),
        new UserRepository()
      );

      const orders = await useCase.execute(uid);

      return res.json({ message: "Orders fetched", orders });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
