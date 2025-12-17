# src/features/ai/image_text_consistency/diff_checker.py

KEYWORDS = {
    "使用感": ["使用感", "中古", "使用"],
    "傷": ["傷", "キズ", "スレ"],
    "汚れ": ["汚れ", "シミ"],
    "付属品": ["付属", "箱", "説明書"],
}


def detect_description_gap(image_results, description: str):
    gaps = []

    for r in image_results:
        text = r["text"]

        for key, words in KEYWORDS.items():
            if key in text:
                if not any(word in description for word in words):
                    gaps.append({
                        "issue": key,
                        "message": f"画像では「{key}」が確認されましたが、説明文では触れられていません"
                    })

    return gaps