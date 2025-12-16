import {
  DmAnswerSuggestionInput,
  DmAnswerSuggestionResult,
} from "./DmAnswerSuggestionResult";

export interface IDmAnswerSuggestionService {
  generate(input: DmAnswerSuggestionInput): Promise<DmAnswerSuggestionResult>;
}
