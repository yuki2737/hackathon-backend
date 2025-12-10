"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const client_1 = require("@prisma/client");
const Product_1 = require("../domain/Product");
const prisma = new client_1.PrismaClient();
class ProductRepository {
    async findAll(keyword, userId) {
        const products = await prisma.product.findMany({
            where: {
                AND: [
                    keyword
                        ? {
                            OR: [
                                { title: { contains: keyword, mode: "insensitive" } },
                                {
                                    description: {
                                        contains: keyword,
                                        mode: "insensitive",
                                    },
                                },
                            ],
                        }
                        : {},
                    userId ? { userId: Number(userId) } : {},
                ],
            },
            orderBy: { createdAt: "desc" },
        });
        return products.map((p) => new Product_1.Product(p.id, p.userId, p.category, p.title, p.description, p.price, p.imageUrl, p.status, p.createdAt, p.updatedAt));
    }
    async findById(id) {
        const p = await prisma.product.findUnique({ where: { id } });
        if (!p)
            return null;
        return new Product_1.Product(p.id, p.userId, p.category, p.title, p.description, p.price, p.imageUrl, p.status, p.createdAt, p.updatedAt);
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