import { Router } from "express";
import { ProductController } from "./ProductController";
import { authMiddleware } from "../../../core/middleware/authMiddleware"; // ログイン必須にする場合

const router = Router();
const controller = new ProductController();

router.get("/", controller.list.bind(controller)); // 商品一覧
router.get("/:id", controller.detail.bind(controller)); // 商品詳細

// ↓ 商品登録（ログイン必須にしたいのでauthMiddlewareを追加）
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;
