"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AuthRoutes_1 = __importDefault(require("./features/auth/presentation/AuthRoutes"));
const ProductRoutes_1 = __importDefault(require("./features/products/presentation/ProductRoutes"));
const OrderRoutes_1 = __importDefault(require("./features/orders/presentation/OrderRoutes"));
const app = (0, express_1.default)();
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
    : [];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // preflight / curl / server-to-server は必ず許可
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        // ❌ false ではなく、明示的にエラーを返さない（preflight 500 防止）
        return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// preflight を必ず通す
app.options("*", (0, cors_1.default)());
app.use(express_1.default.json());
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
app.use("/auth", AuthRoutes_1.default);
app.use("/products", ProductRoutes_1.default);
app.use("/orders", OrderRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map