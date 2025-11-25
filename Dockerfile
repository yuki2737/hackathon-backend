FROM python:3.11-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

# Cloud Run が渡す PORT を使わせる
ENV PORT=8080

# Cloud Run は EXPOSE は無視するが、書くなら合わせる
EXPOSE 8080

# Cloud Run の PORT 環境変数を使って起動
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]