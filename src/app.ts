import express from "express";
import cors from "cors";
import AuthRoutes from "./features/auth/presentation/AuthRoutes";
import ProductRoutes from "./features/products/presentation/ProductRoutes";
import OrderRoutes from "./features/orders/presentation/OrderRoutes";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Preflight (OPTIONS) 許可
app.use(cors());

app.use(express.json());

app.use("/auth", AuthRoutes);
app.use("/products", ProductRoutes);
app.use("/orders", OrderRoutes);

export default app;
