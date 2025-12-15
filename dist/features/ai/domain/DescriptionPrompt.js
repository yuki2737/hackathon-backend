"use strict";
/**
 * DescriptionPrompt
 * AI に渡す「説明文生成用プロンプト」を表現するドメインオブジェクト
 *
 * 責務:
 * - 商品説明文生成に必要な入力を構造化する
 * - プロンプトのデフォルト値や整形ルールをここに閉じ込める
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescriptionPrompt = void 0;
class DescriptionPrompt {
    constructor(title, hint) {
        if (!title || title.trim() === "") {
            throw new Error("title is required for description generation");
        }
        this.title = title;
        this.hint = hint;
    }
    /**
     * OpenAI に渡すユーザープロンプト文字列を生成
     */
    toPromptText() {
        return `
商品名: ${this.title}
要望: ${this.hint ||
            "フリマアプリ向けに、丁寧で分かりやすい説明文を作成してください"}
`;
    }
}
exports.DescriptionPrompt = DescriptionPrompt;
//# sourceMappingURL=DescriptionPrompt.js.map