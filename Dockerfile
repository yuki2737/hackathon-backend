FROM python:3.11-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

# Cloud Run が環境変数 PORT=8080 を注入する
ENV PORT=8080

# main.py の uvicorn 起動時に PORT を使う
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT}"]