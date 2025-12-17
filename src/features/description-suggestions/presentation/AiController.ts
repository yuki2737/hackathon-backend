import { Request, Response } from "express";
import { GenerateDescriptionUseCase } from "../application/GenerateDescriptionUseCase";

export class AiController {
  async generateDescription(req: Request, res: Response): Promise<Response> {
    console.log("[AI] generateDescription called");
    console.log("[AI] body:", req.body);

    try {
      const { title, prompt } = req.body ?? {};

      // 入力バリデーション
      if (!title || typeof title !== "string") {
        console.warn("[AI] invalid title:", title);
        return res.status(400).json({
          error: "title is required and must be a string",
        });
      }

      if (!prompt || typeof prompt !== "string") {
        console.warn("[AI] invalid prompt:", prompt);
        return res.status(400).json({
          error: "prompt is required and must be a string",
        });
      }

      const useCase = new GenerateDescriptionUseCase();
      const description = await useCase.execute(title, prompt);

      console.log("[AI] generated description length:", description.length);

      return res.status(200).json({
        description,
      });
    } catch (error: any) {
      console.error("[AI] generateDescription error:", error);

      return res.status(500).json({
        error: error?.message || "Internal Server Error",
      });
    }
  }
}
