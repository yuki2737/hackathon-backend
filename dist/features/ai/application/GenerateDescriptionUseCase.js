"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateDescriptionUseCase = void 0;
const OpenAIClient_1 = require("../infrastructure/OpenAIClient");
class GenerateDescriptionUseCase {
    constructor() {
        this.openAIClient = new OpenAIClient_1.OpenAIClient();
    }
    async execute(title, prompt) {
        if (!title || title.trim() === "") {
            throw new Error("title is required");
        }
        return await this.openAIClient.generateDescription(title, prompt);
    }
}
exports.GenerateDescriptionUseCase = GenerateDescriptionUseCase;
//# sourceMappingURL=GenerateDescriptionUseCase.js.map