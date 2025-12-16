import { QuestionSuggestionInput } from "../../domain/QuestionSuggestionInput";

export class DmQuestionSuggestionPrompt {
  static build(input: QuestionSuggestionInput): string {
    const riskText =
      input.riskPoints && input.riskPoints.length > 0
        ? input.riskPoints.map((r) => `- ${r}`).join("\n")
        : "特になし";

    return `
あなたはフリマアプリのDM画面で、
購入者が「購入前に確認しておくと安心できる質問」を考えるAIです。

目的：
・購入者が後悔しない判断をできるようにする
・出品者が答えやすい、丁寧な質問を提示する

重要なルール：
・質問は必ず【3つ】生成する
・出品者を責める表現は禁止
・不安を煽らない
・断定的な言い方は禁止
・そのままDMで送れる自然な日本語にする
・改善指示や評価はしない

【商品名】
${input.title}

【カテゴリ】
${input.category ?? "未指定"}

【価格】
${input.price}円

【説明文】
${input.description}

【確認ポイント・リスク】
${riskText}

出力は必ずJSON形式で、以下の形のみで返してください。

{
  "questionSuggestions": [
    "質問1",
    "質問2",
    "質問3"
  ]
}
`.trim();
  }
}
