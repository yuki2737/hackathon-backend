import { Request, Response } from "express";
import { OrderRepository } from "../infrastructure/OrderRepository";
import { CreateOrderUseCase } from "../application/CreateOrderUseCase";
import { ListOrdersUseCase } from "../application/ListOrdersUseCase";

export class OrderController {
  async create(req: Request, res: Response) {
    try {
      const { productId, buyerId } = req.body;
      const useCase = new CreateOrderUseCase(new OrderRepository());
      const order = await useCase.execute(productId, buyerId);

      return res.status(201).json({ message: "Order created", order });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const useCase = new ListOrdersUseCase(new OrderRepository());
      const orders = await useCase.execute();

      return res.json({ message: "Orders fetched", orders });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
