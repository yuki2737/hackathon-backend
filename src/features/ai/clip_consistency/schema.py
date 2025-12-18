from typing import List, TypedDict


class ImageFinding(TypedDict):
    text: str
    score: float


class GapFinding(TypedDict):
    similarity: float


class AnalysisResult(TypedDict):
    image_findings: List[ImageFinding]
    description_gap: GapFinding