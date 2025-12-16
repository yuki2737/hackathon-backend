/**
 * 出品時の説明文チェック用プロンプト
 * 目的: 出品者が無自覚にトラブルを起こす可能性を事前に気づかせる
 * 注意: 改善案・書き直しはしない / 注意喚起と判断材料の提示のみ / JSONのみ
 */

export class ListingEvaluationPrompt {
  readonly title: string;
  readonly category: string;
  readonly price: number;
  readonly description: string;

  constructor(params: {
    title: string;
    category?: string;
    price: number;
    description: string;
  }) {
    const { title, category, price, description } = params;

    if (!title || title.trim() === "") throw new Error("title is required");
    if (!description || description.trim() === "")
      throw new Error("description is required");
    if (typeof price !== "number" || Number.isNaN(price) || price < 0)
      throw new Error("price must be a non-negative number");

    this.title = title.trim();
    this.category = (category ?? "未指定").trim();
    this.price = price;
    this.description = description.trim();
  }

  toPromptText(): string {
    return `
あなたはフリマアプリの出品内容をチェックするAIです。
目的は、出品者が無自覚にトラブルを起こす可能性を事前に気づかせることです。

完璧な出品を作ることは目的ではありません。
改善案や書き直しは行わず、
「注意喚起」と「判断材料の提示」に徹してください。

出力は必ずJSON形式で行ってください。

以下はフリマアプリの商品出品情報です。

【商品名】
${this.title}

【カテゴリ】
${this.category}

【価格】
${this.price}円

【説明文】
${this.description}

この出品内容について、
購入者とのトラブルにつながる可能性がある点を分析してください。
判断に迷う場合や、致命的でない軽微な不足・曖昧さのみの場合は、
過度にリスクを高く評価せず、"low" または "medium" に留めてください。

出力JSONの形式:
{
  "missingInfo": [
    "使用回数が記載されていない",
    "傷や汚れの有無が不明"
  ],
  "ambiguousExpressions": [
    "ほぼ新品",
    "問題なく使えます"
  ],
  "riskLevel": "medium"
}

ルール:
- riskLevel は "low" | "medium" | "high"
- 明確なトラブル要因が複数ある場合のみ "high" を付与してください
- 問題がなければ配列は空でもOK
- 余計な文章は書かず、必ずJSONのみ返す
`.trim();
  }
}
