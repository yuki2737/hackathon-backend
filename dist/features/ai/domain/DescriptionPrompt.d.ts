/**
 * DescriptionPrompt
 * AI に渡す「説明文生成用プロンプト」を表現するドメインオブジェクト
 *
 * 責務:
 * - 商品説明文生成に必要な入力を構造化する
 * - プロンプトのデフォルト値や整形ルールをここに閉じ込める
 */
export declare class DescriptionPrompt {
    readonly title: string;
    readonly hint?: string;
    constructor(title: string, hint?: string);
    /**
     * OpenAI に渡すユーザープロンプト文字列を生成
     */
    toPromptText(): string;
}
//# sourceMappingURL=DescriptionPrompt.d.ts.map