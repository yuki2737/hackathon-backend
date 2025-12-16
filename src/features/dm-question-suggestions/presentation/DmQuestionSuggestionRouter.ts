import { Router } from "express";
import { OpenAiQuestionSuggestionService } from "../infrastructure/OpenAiQuestionSuggestionService";
import { DmQuestionSuggestionService } from "../application/DmQuestionSuggestionService";
import { DmQuestionSuggestionController } from "./DmQuestionSuggestionController";

export const dmQuestionSuggestionRouter = () => {
  const router = Router();

  const aiService = new OpenAiQuestionSuggestionService(
    process.env.OPENAI_API_KEY || ""
  );
  const service = new DmQuestionSuggestionService(aiService);
  const controller = new DmQuestionSuggestionController(service);

  router.post(
    "/ai/dm-question-suggestions",
    controller.generate.bind(controller)
  );

  return router;
};
