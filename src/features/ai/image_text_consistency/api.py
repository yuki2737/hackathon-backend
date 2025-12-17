# src/features/ai/image_text_consistency/api.py

from fastapi import APIRouter, UploadFile, Form
from PIL import Image
from io import BytesIO

from .analyzer import analyze_image
from .diff_checker import detect_description_gap

router = APIRouter()


@router.post("/ai/image-text-check")
async def image_text_check(
    image: UploadFile,
    description: str = Form("")
):
    image_bytes = await image.read()
    pil_image = Image.open(BytesIO(image_bytes)).convert("RGB")

    image_results = analyze_image(pil_image)
    gaps = detect_description_gap(image_results, description)

    return {
        "image_findings": image_results,
        "description_gaps": gaps
    }