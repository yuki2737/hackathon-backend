"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const client_1 = require("@prisma/client");
const Product_1 = require("../domain/Product");
const prisma = new client_1.PrismaClient();
class ProductRepository {
    async findAll(keyword, uid) {
        const where = {};
        // キーワード検索（独立）
        if (keyword) {
            where.OR = [
                { title: { contains: keyword } },
                { description: { contains: keyword } },
            ];
        }
        // 出品一覧（キーワードが無い時だけ uid で絞り込み）
        if (!keyword && uid) {
            where.user = { uid };
        }
        const products = await prisma.product.findMany({
            where,
            include: { user: true },
            orderBy: { createdAt: "desc" },
        });
        return products.map((p) => new Product_1.Product(p.id, p.userId, p.category, p.title, p.description, p.price, p.imageUrl, p.status, p.createdAt, p.updatedAt));
    }
    async findById(id) {
        const p = await prisma.product.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!p)
            return null;
        return new Product_1.Product(p.id, p.userId, p.category, p.title, p.description, p.price, p.imageUrl, p.status, p.createdAt, p.updatedAt);
    }
    async findUserByUid(uid) {
        return await prisma.user.findUnique({
            where: { uid },
        });
    }
    async create(product) {
        const created = await prisma.product.create({
            data: {
                userId: product.userId,
                category: product.category,
                title: product.title,
                description: product.description,
                price: product.price,
                imageUrl: product.imageUrl,
                status: product.status,
            },
        });
        return new Product_1.Product(created.id, created.userId, created.category, created.title, created.description, created.price, created.imageUrl, created.status, created.createdAt, created.updatedAt);
    }
    async update(data) {
        const updated = await prisma.product.update({
            where: { id: data.id },
            data: {
                title: data.title,
                description: data.description,
                price: data.price,
                imageUrl: data.imageUrl,
                status: data.status,
                category: data.category,
            },
        });
        return new Product_1.Product(updated.id, updated.userId, updated.category, updated.title, updated.description, updated.price, updated.imageUrl, updated.status, updated.createdAt, updated.updatedAt);
    }
    async delete(id) {
        await prisma.product.delete({
            where: { id },
        });
    }
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=ProductRepository.js.map