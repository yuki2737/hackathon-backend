"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductRepository_1 = require("../infrastructure/ProductRepository");
const ListProductsUseCase_1 = require("../application/ListProductsUseCase");
const GetProductDetailUseCase_1 = require("../application/GetProductDetailUseCase");
const CreateProductUseCase_1 = require("../application/CreateProductUseCase");
class ProductController {
    async list(req, res) {
        try {
            const useCase = new ListProductsUseCase_1.ListProductsUseCase(new ProductRepository_1.ProductRepository());
            const products = await useCase.execute();
            return res.json({ message: "Products fetched successfully", products });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async detail(req, res) {
        try {
            const useCase = new GetProductDetailUseCase_1.GetProductDetailUseCase(new ProductRepository_1.ProductRepository());
            const product = await useCase.execute(Number(req.params.id));
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.json({
                message: "Product detail fetched successfully",
                product,
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async create(req, res) {
        try {
            const { userId, category, title, description, price, imageUrl, status } = req.body;
            const useCase = new CreateProductUseCase_1.CreateProductUseCase(new ProductRepository_1.ProductRepository());
            const product = await useCase.execute({
                userId,
                category,
                title,
                description,
                price,
                imageUrl,
                status: status, // ← Prisma Enum へ変換
            });
            return res
                .status(201)
                .json({ message: "Product created successfully", product });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const { category, title, description, price, imageUrl, status } = req.body;
            const repository = new ProductRepository_1.ProductRepository();
            const product = await repository.update({
                id,
                category,
                title,
                description,
                price,
                imageUrl,
                status,
            });
            return res.json({
                message: "Product updated successfully",
                product,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            const repository = new ProductRepository_1.ProductRepository();
            await repository.delete(id);
            return res.json({ message: "Product deleted successfully" });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map