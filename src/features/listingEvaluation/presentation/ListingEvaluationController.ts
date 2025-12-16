import { Request, Response } from "express";
import { EvaluateListingUseCase } from "../application/EvaluateListingUseCase";

export class ListingEvaluationController {
  constructor(private readonly useCase: EvaluateListingUseCase) {}

  async evaluate(req: Request, res: Response) {
    try {
      const { title, category, price, description } = req.body ?? {};

      const result = await this.useCase.execute({
        title,
        category,
        price: typeof price === "string" ? Number(price) : price,
        description,
      });

      return res.json({ success: true, evaluation: result });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: (e as Error).message,
      });
    }
  }
}
