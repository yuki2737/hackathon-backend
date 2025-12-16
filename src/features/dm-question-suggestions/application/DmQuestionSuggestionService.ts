import { IQuestionSuggestionService } from "../domain/IQuestionSuggestionService";
import { QuestionSuggestionInput } from "../domain/QuestionSuggestionInput";
import { QuestionSuggestionResult } from "../domain/QuestionSuggestionResult";

export class DmQuestionSuggestionService {
  constructor(private readonly aiService: IQuestionSuggestionService) {}

  async execute(
    input: QuestionSuggestionInput
  ): Promise<QuestionSuggestionResult> {
    const result = await this.aiService.generate(input);

    return {
      questionSuggestions: result.questionSuggestions.slice(0, 3),
    };
  }
}
