import express from "express";
import cors from "cors";
import AuthRoutes from "./features/auth/presentation/AuthRoutes";
import ProductRoutes from "./features/products/presentation/ProductRoutes";
import OrderRoutes from "./features/orders/presentation/OrderRoutes";

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      // preflight / curl / server-to-server は必ず許可
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // ❌ false ではなく、明示的にエラーを返さない（preflight 500 防止）
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// preflight を必ず通す
app.options("*", cors());

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/auth", AuthRoutes);
app.use("/products", ProductRoutes);
app.use("/orders", OrderRoutes);

export default app;
