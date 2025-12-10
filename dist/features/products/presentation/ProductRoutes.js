"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("./ProductController");
const router = (0, express_1.Router)();
const controller = new ProductController_1.ProductController();
router.get("/", controller.list.bind(controller)); // 商品一覧
router.get("/:id", controller.detail.bind(controller)); // 商品詳細
// ↓ 商品登録（ログイン必須にしたいのでauthMiddlewareを追加）
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", (req, res) => controller.delete(req, res));
exports.default = router;
//# sourceMappingURL=ProductRoutes.js.map