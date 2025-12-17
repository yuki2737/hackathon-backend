# src/features/ai/image_text_consistency/schema.py

from typing import List, TypedDict


class ImageFinding(TypedDict):
    text: str
    score: float


class GapFinding(TypedDict):
    issue: str
    message: str


class AnalysisResult(TypedDict):
    image_findings: List[ImageFinding]
    description_gaps: List[GapFinding]