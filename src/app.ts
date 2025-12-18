import express from "express";
import cors from "cors";
import AuthRoutes from "./features/auth/presentation/AuthRoutes";
import ProductRoutes from "./features/products/presentation/ProductRoutes";
import OrderRoutes from "./features/orders/presentation/OrderRoutes";
import AiRoutes from "./features/description-suggestions/presentation/AiRoutes";
import ImageRoutes from "./features/images/presentation/ImageRoutes";
import threadRoutes from "./features/threads/presentation/ThreadRoutes";
import listingEvaluationRoutes from "./features/listingEvaluation/presentation/ListingEvaluationRoutes";
import { purchaseDecisionSupportRouter } from "./features/purchase-decision-support/presentation/PurchaseDecisionSupportRouter";
import { dmQuestionSuggestionRouter } from "./features/dm-question-suggestions/presentation/DmQuestionSuggestionRouter";
import { dmAnswerSuggestionRouter } from "./features/dm-answer-suggestions/presentation/DmAnswerSuggestionRouter";

import imageTextConsistencyRouter from "./features/ai/imageTextConsistency/imageTextConsistency.router";

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      /**
       * Cloud Run / curl / server-to-server / preflight では
       * origin が undefined になるため常に許可する
       */
      if (!origin) {
        return callback(null, true);
      }

      /**
       * 明示的に許可した origin のみチェック
       * ※ 現状は「拒否しない」設計（将来 tighten 可能）
       */
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // 現段階では CORS で弾かず通す（フロント増加に耐える）
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// preflight を必ず通す（Cloud Run + ブラウザ安定化）
app.options("*", cors());

// JSON body をパース
app.use(express.json());

// リクエストログ（本番では最小限）
app.use((req, _res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[REQUEST] ${req.method} ${req.path}`);
  }
  next();
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/auth", AuthRoutes);
app.use("/products", ProductRoutes);
app.use("/orders", OrderRoutes);
app.use("/ai", AiRoutes);
app.use("/images", ImageRoutes);
app.use("/threads", threadRoutes);
app.use(listingEvaluationRoutes);
app.use(purchaseDecisionSupportRouter());
app.use(dmQuestionSuggestionRouter());
app.use(dmAnswerSuggestionRouter());
app.use(imageTextConsistencyRouter);
export default app;
