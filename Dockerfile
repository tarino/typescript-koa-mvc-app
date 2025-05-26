# ベースイメージとしてNode.jsの軽量版を使用
FROM node:20-alpine

# 作業ディレクトリを/appに設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install
RUN apk add --no-cache git

# アプリケーションのコードをコピー
COPY . .

# 3000番ポートを公開
EXPOSE 3000

# アプリケーションを起動
CMD [ "node", "index.js" ]
