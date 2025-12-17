# src/features/ai/image_text_consistency/clip_model.py

import clip
import torch
from PIL import Image

device = "cuda" if torch.cuda.is_available() else "cpu"

model, preprocess = clip.load("ViT-B/32", device=device)


def encode_image(image: Image.Image):
    image_tensor = preprocess(image).unsqueeze(0).to(device)
    with torch.no_grad():
        return model.encode_image(image_tensor)


def encode_text(texts: list[str]):
    text_tokens = clip.tokenize(texts).to(device)
    with torch.no_grad():
        return model.encode_text(text_tokens)