import { Request, Response } from "express";
import { DmQuestionSuggestionService } from "../application/DmQuestionSuggestionService";

export class DmQuestionSuggestionController {
  constructor(private readonly service: DmQuestionSuggestionService) {}

  async generate(req: Request, res: Response) {
    try {
      const { title, category, price, description, riskPoints } = req.body;

      const result = await this.service.execute({
        title,
        category,
        price: Number(price),
        description,
        riskPoints,
      });

      return res.json({
        success: true,
        questions: result.questionSuggestions,
      });
    } catch (e: any) {
      console.error(e);
      return res.status(500).json({
        success: false,
        error: e?.message || "question generation failed",
      });
    }
  }
}
