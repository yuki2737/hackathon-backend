"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const GenerateDescriptionUseCase_1 = require("../application/GenerateDescriptionUseCase");
class AiController {
    async generateDescription(req, res) {
        try {
            const { title, prompt } = req.body;
            // 入力バリデーション
            if (!title || typeof title !== "string") {
                return res.status(400).json({
                    error: "title is required and must be a string",
                });
            }
            if (!prompt || typeof prompt !== "string") {
                return res.status(400).json({
                    error: "prompt is required and must be a string",
                });
            }
            const useCase = new GenerateDescriptionUseCase_1.GenerateDescriptionUseCase();
            const description = await useCase.execute(title, prompt);
            return res.status(200).json({
                description,
            });
        }
        catch (error) {
            console.error("AI generateDescription error:", error);
            return res.status(500).json({
                error: error?.message || "Internal Server Error",
            });
        }
    }
}
exports.AiController = AiController;
//# sourceMappingURL=AiController.js.map