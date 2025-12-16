import { QuestionSuggestionInput } from "./QuestionSuggestionInput";
import { QuestionSuggestionResult } from "./QuestionSuggestionResult";

export interface IQuestionSuggestionService {
  generate(input: QuestionSuggestionInput): Promise<QuestionSuggestionResult>;
}
