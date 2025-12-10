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
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
// Preflight (OPTIONS) 許可
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", AuthRoutes_1.default);
app.use("/products", ProductRoutes_1.default);
app.use("/orders", OrderRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map