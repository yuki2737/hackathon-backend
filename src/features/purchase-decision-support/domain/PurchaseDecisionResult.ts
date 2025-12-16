export interface PurchaseDecisionResult {
  /** 商品としてポジティブに判断できる要素 */
  goodPoints: string[];

  /** 購入判断のために確認するとよい観点 */
  decisionPoints: string[];

  /** 解釈が分かれそうな表現（やわらかく） */
  ambiguousPoints: string[];
}

export interface PurchaseDecisionInput {
  title: string;
  category: string;
  price: number;
  description: string;
}
