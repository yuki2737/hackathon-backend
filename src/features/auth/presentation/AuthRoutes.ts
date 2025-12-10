import { Router } from "express";
import { AuthController } from "./AuthController";

const router = Router();
const authController = new AuthController();

// POST /auth/register
router.post("/register", authController.register.bind(authController));

// 動作確認 GET /auth/test
router.get("/test", (req, res) => {
  res.json({ message: "auth route working!" });
});

export default router;
