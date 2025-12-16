export class Thread {
  meta: any;
  constructor(
    public readonly id: number,
    public readonly productId: number,
    public readonly buyerId: number,
    public readonly sellerId: number,
    public readonly type: "inquiry" | "order",
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly lastMessage: string | null,
    public readonly product: {
      title: string | null;
      imageUrl: string | null;
      sellerFirebaseUid: string | null;
    } | null = null
  ) {}
}
