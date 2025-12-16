import { IDmAnswerSuggestionService } from "../domain/IDmAnswerSuggestionService";
import {
  DmAnswerSuggestionInput,
  DmAnswerSuggestionResult,
} from "../domain/DmAnswerSuggestionResult";

export class DmAnswerSuggestionService {
  constructor(private readonly aiService: IDmAnswerSuggestionService) {}

  async execute(
    input: DmAnswerSuggestionInput
  ): Promise<DmAnswerSuggestionResult> {
    return this.aiService.generate(input);
  }
}
