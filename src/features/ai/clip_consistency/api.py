from fastapi import APIRouter, UploadFile, File, Form
from PIL import Image
from io import BytesIO

from src.features.ai.clip_consistency.analyzer import analyze_image_and_description

router = APIRouter()

@router.post("/ai/image-text-consistency")
async def analyze(
    image: UploadFile = File(...),
    description: str = Form(...),
):
    image_bytes = await image.read()
    image_pil = Image.open(BytesIO(image_bytes)).convert("RGB")

    result = analyze_image_and_description(
        image=image_pil,
        description=description,
    )

    return result