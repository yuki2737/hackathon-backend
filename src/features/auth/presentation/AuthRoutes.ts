import { Router } from "express";
import { AuthController } from "./AuthController";

const router = Router();
const authController = new AuthController();

// POST /auth/register
router.post("/register", authController.register.bind(authController));

// GET /auth/user?uid=xxxx
router.get("/user", authController.getUser.bind(authController));

// 動作確認 GET /auth/test
router.get("/test", (req, res) => {
  res.json({ message: "auth route working!" });
});

export default router;
