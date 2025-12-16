import { Request, Response } from "express";
import { DmAnswerSuggestionService } from "../application/DmAnswerSuggestionService";

export class DmAnswerSuggestionController {
  constructor(private readonly service: DmAnswerSuggestionService) {}

  async generate(req: Request, res: Response) {
    try {
      const { title, category, price, description, question } = req.body;

      const result = await this.service.execute({
        title,
        category,
        price: Number(price),
        description,
        question,
      });

      return res.json({
        success: true,
        answers: result.answerSuggestions,
      });
    } catch (e: any) {
      console.error(e);
      return res.status(500).json({
        success: false,
        error: e?.message || "answer suggestion failed",
      });
    }
  }
}
