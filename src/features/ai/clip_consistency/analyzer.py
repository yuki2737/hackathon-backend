# src/features/ai/clip_consistency/analyzer.py

import torch
from PIL import Image
from typing import List, Tuple

from src.features.ai.clip_consistency.clip_model import encode_image, encode_text
from src.features.ai.clip_consistency.prompts import IMAGE_CHECK_TEXTS
from src.features.ai.clip_consistency.schema import ImageFinding


def _normalize(x: torch.Tensor, eps: float = 1e-8) -> torch.Tensor:
    """
    L2 正規化（ゼロ割防止のため eps を加える）
    """
    return x / (x.norm(dim=-1, keepdim=True) + eps)


def analyze_image(image: Image.Image) -> List[ImageFinding]:
    """
    20個の定義済みテキスト（IMAGE_CHECK_TEXTS）と画像の CLIP 類似度を返す
    """
    image_feat = encode_image(image)
    text_feat = encode_text(IMAGE_CHECK_TEXTS)

    image_feat = _normalize(image_feat)
    text_feat = _normalize(text_feat)

    similarities = (image_feat @ text_feat.T).squeeze(0)

    results: List[ImageFinding] = []
    for text, score in zip(IMAGE_CHECK_TEXTS, similarities.tolist()):
        results.append(
            {
                "text": text,
                "score": round(float(score), 3),
            }
        )

    return results


def analyze_image_and_description(
    image: Image.Image,
    description: str,
) -> dict:
    """
    - image_findings: 20CLIP（画像 × 定義済みテキスト）
    - global_text_score: 画像 × 説明文 の CLIP 類似度（単一スカラー）
    """
    # 20CLIP
    image_findings = analyze_image(image)

    # global consistency
    image_feat = encode_image(image)
    text_feat = encode_text([description])

    image_feat = _normalize(image_feat)
    text_feat = _normalize(text_feat)

    global_score = float((image_feat @ text_feat.T).item())

    return {
        "image_findings": image_findings,
        "text_similarity": round(global_score, 3),
    }