from src.features.ai.clip_consistency.schema import GapFinding


def compute_global_consistency(
    image_score: float,
    text_similarity: float,
) -> GapFinding:
    """
    Compute a single global consistency score between image CLIP score
    and text-image similarity score.

    image_score: average (or representative) CLIP score from image-only prompts
    text_similarity: cosine similarity between image and description text
    """

    gap_score = image_score - text_similarity

    return {
        "similarity": float(text_similarity),
        "image_score": float(image_score),
        "gap_score": float(gap_score),
    }