import OpenAI from "openai";

export class OpenAIListingEvaluationClient {
  private readonly client: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set");
    }
    this.client = new OpenAI({ apiKey });
  }

  async evaluate(prompt: string): Promise<string> {
    const res = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "Return ONLY valid JSON. Do not include markdown fences. Do not include extra text.",
        },
        { role: "user", content: prompt },
      ],
    });

    return res.choices[0]?.message?.content ?? "";
  }
}
