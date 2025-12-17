# main.py
from fastapi import FastAPI
from src.features.ai.image_text_consistency.api import router

app = FastAPI()
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)