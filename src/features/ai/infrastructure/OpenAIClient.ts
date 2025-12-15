import OpenAI from "openai";

export class OpenAIClient {
  private client: OpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateDescription(title: string, prompt?: string): Promise<string> {
    const systemPrompt =
      "あなたはフリマアプリの商品説明文を作るプロのコピーライターです。丁寧で分かりやすく、購入者が安心できる文章を作ってください。";

    const userPrompt = `商品名: ${title}\n要望: ${prompt || "特になし"}`;

    const response = await this.client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    return response.output_text ?? "";
  }
}
