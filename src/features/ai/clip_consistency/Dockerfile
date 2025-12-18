FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app
WORKDIR /app

RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY src/features/ai/clip_consistency/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Cloud Run が渡す PORT をそのまま使う
CMD ["sh", "-c", "uvicorn src.features.ai.clip_consistency.main:app --host 0.0.0.0 --port ${PORT:-8080}"]