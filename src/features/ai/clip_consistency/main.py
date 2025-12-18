from fastapi import FastAPI
from src.features.ai.clip_consistency.api import router

app = FastAPI(title="Image Text Consistency (CLIP)")
app.include_router(router)

# Cloud Run uses the container CMD to start uvicorn.
# Do NOT call uvicorn.run() here.