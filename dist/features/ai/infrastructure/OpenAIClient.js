"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIClient = void 0;
const openai_1 = __importDefault(require("openai"));
class OpenAIClient {
    constructor() {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not set");
        }
        this.client = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async generateDescription(title, prompt) {
        const systemPrompt = "あなたはフリマアプリの商品説明文を作るプロのコピーライターです。丁寧で分かりやすく、購入者が安心できる文章を作ってください。";
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
exports.OpenAIClient = OpenAIClient;
//# sourceMappingURL=OpenAIClient.js.map