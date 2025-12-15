// ===============================
// server.ts
// ===============================

// ローカル実行時のみ .env を読み込む
// Cloud Run では環境変数は GCP 側で注入されるため不要
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config();
}

import app from "./app";

// Cloud Run は PORT=8080 を要求する
const port = Number(process.env.PORT) || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
