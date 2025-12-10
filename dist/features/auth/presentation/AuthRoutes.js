"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("./AuthController");
const router = (0, express_1.Router)();
const authController = new AuthController_1.AuthController();
// POST /auth/register
router.post("/register", authController.register.bind(authController));
// 動作確認 GET /auth/test
router.get("/test", (req, res) => {
    res.json({ message: "auth route working!" });
});
exports.default = router;
//# sourceMappingURL=AuthRoutes.js.map