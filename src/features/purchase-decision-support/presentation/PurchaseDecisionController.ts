import { Request, Response } from "express";
import { PurchaseDecisionService } from "../application/PurchaseDecisionService";

export class PurchaseDecisionController {
  constructor(private readonly service: PurchaseDecisionService) {}

  // POST /ai/purchase-decision-support
  async evaluate(req: Request, res: Response) {
    try {
      const {
        title = "",
        category = "",
        price,
        description = "",
      } = req.body || {};

      if (!title || !category || price === undefined) {
        return res.status(400).json({
          success: false,
          error: "title, category, and price are required",
        });
      }

      const result = await this.service.execute({
        title: String(title),
        category: String(category),
        price: Number(price),
        description: String(description),
      });

      return res.json({
        success: true,
        decision: result,
      });
    } catch (e: any) {
      console.error("[PurchaseDecisionController]", e);
      return res.status(500).json({
        success: false,
        error: e?.message || "purchase decision failed",
      });
    }
  }
}
