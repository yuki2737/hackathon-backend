# src/features/ai/image_text_consistency/analyzer.py

import torch
from .clip_model import encode_image, encode_text
from .prompts import IMAGE_CHECK_TEXTS

DEFAULT_THRESHOLD = 0.3

def analyze_image(image):
    image_feat = encode_image(image)
    text_feats = encode_text(IMAGE_CHECK_TEXTS)

    image_feat = image_feat / image_feat.norm(dim=-1, keepdim=True)
    text_feats = text_feats / text_feats.norm(dim=-1, keepdim=True)

    similarities = (image_feat @ text_feats.T).squeeze(0)

    results = []
    for text, score in zip(IMAGE_CHECK_TEXTS, similarities.tolist()):
        results.append({
            "text": text,
            "score": round(float(score), 3)
        })

    return results