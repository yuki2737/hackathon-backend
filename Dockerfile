FROM node:18-slim

WORKDIR /app

# Prisma が必要とする OpenSSL をインストール
RUN apt-get update -y && apt-get install -y openssl

# 依存関係（lock file 前提）
COPY package*.json ./
RUN npm ci

# ソースコードをコピー
COPY . .

# Prisma Client を Linux 用に生成
RUN npx prisma generate

# TypeScript をビルド（dist/ を生成）
RUN npm run build

# Cloud Run が自動で注入する PORT を利用
ENV PORT=8080
EXPOSE 8080

# dist/server.js を直接起動
CMD ["node", "dist/server.js"]