"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(id, productId, buyerId, purchasedAt, product) {
        this.id = id;
        this.productId = productId;
        this.buyerId = buyerId;
        this.purchasedAt = purchasedAt;
        this.product = product;
    }
}
exports.Order = Order;
//# sourceMappingURL=Order.js.map