"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // AuthorizationヘッダーにBearer tokenがあるか確認
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // req.user として使えるように追加
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map