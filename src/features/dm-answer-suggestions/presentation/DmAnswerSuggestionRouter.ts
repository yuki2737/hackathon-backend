import { Router } from "express";
import { OpenAiDmAnswerSuggestionService } from "../infrastructure/OpenAiDmAnswerSuggestionService";
import { DmAnswerSuggestionService } from "../application/DmAnswerSuggestionService";
import { DmAnswerSuggestionController } from "./DmAnswerSuggestionController";

export const dmAnswerSuggestionRouter = () => {
  const router = Router();

  const aiService = new OpenAiDmAnswerSuggestionService(
    process.env.OPENAI_API_KEY || ""
  );
  const service = new DmAnswerSuggestionService(aiService);
  const controller = new DmAnswerSuggestionController(service);

  router.post(
    "/ai/dm-answer-suggestions",
    controller.generate.bind(controller)
  );

  return router;
};
