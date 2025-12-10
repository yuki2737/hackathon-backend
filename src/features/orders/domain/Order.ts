export class Order {
  constructor(
    public readonly id: number,
    public readonly productId: number,
    public readonly buyerId: number,
    public readonly purchasedAt: Date
  ) {}
}
