import { OpenAIClient } from "../infrastructure/OpenAIClient";

export class GenerateDescriptionUseCase {
  private openAIClient: OpenAIClient;

  constructor() {
    this.openAIClient = new OpenAIClient();
  }

  async execute(title: string, prompt?: string): Promise<string> {
    if (!title || title.trim() === "") {
      throw new Error("title is required");
    }

    return await this.openAIClient.generateDescription(title, prompt);
  }
}
