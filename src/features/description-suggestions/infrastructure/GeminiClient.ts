import { VertexAI } from "@google-cloud/vertexai";

export class OpenAIClient {
  private model;

  constructor() {
    const project = process.env.GCP_PROJECT_ID;
    const location = process.env.GCP_LOCATION || "us-central1";

    if (!project) {
      throw new Error("GCP_PROJECT_ID is not set");
    }

    const vertexAI = new VertexAI({
      project,
      location,
    });

    this.model = vertexAI.getGenerativeModel({
      model: "gemini-2.5-pro",
    });
  }

  async generateDescription(title: string, prompt?: string): Promise<string> {
    const systemPrompt = `
あなたはフリマアプリ向けの商品説明文を作成するアシスタントです。
初心者の出品者が書いたような、シンプルで安心感のある文章を作成してください。

以下の条件を必ず守ってください。

・過度に魅力を煽らない
・丁寧だが堅すぎない、自然な日本語にする
・フリマアプリでよく見かける実用的な文体にする
・文章量は多すぎず、読みやすさを最優先する

【表現ルール】
・記号「#」「*」「-」「_」は使用しない
・Markdown形式は禁止
・箇条書きは禁止
・太字や装飾表現は禁止
・普通の文章のみで構成する

【構成ルール】
以下の流れを必ず守ってください。

1. 最初に「ご覧いただきありがとうございます。」から始める
2. 商品名を簡潔に伝える
3. 商品の状態を正直かつ簡単に説明する
4. サイズやカラーについて触れる
5. 発送について簡単に説明する
6. 最後に丁寧な締めの一文を書く

あくまで「無難で安心できる説明文」を目指してください。`;

    const userPrompt = `商品名: ${title}\n要望: ${prompt || "特になし"}`;

    const response = await this.model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt + "\n\n" + userPrompt }],
        },
      ],
    });

    const text =
      response.response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    const sanitized = text.replace(/[#*_]/g, "").replace(/\n{3,}/g, "\n\n");

    return sanitized;
  }
}
