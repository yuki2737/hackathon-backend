# src/features/ai/image_text_consistency/clip_model.py

import torch
import clip
from PIL import Image

device = "cuda" if torch.cuda.is_available() else "cpu"

model, preprocess = clip.load("ViT-B/32", device=device)
model.eval()


def encode_image(image: Image.Image) -> torch.Tensor:
    image_input = preprocess(image).unsqueeze(0).to(device)
    with torch.no_grad():
        features = model.encode_image(image_input)
    return features


def encode_text(texts: list[str]) -> torch.Tensor:
    tokens = clip.tokenize(texts).to(device)
    with torch.no_grad():
        features = model.encode_text(tokens)
    return features