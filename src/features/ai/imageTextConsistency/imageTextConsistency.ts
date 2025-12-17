import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";

const router = express.Router();

router.post("/image-text-check", async (req, res) => {
  try {
    const pythonRes = await fetch("http://localhost:8000/ai/image-text-check", {
      method: "POST",
      body: req,
    });

    const text = await pythonRes.text();

    res.status(pythonRes.status).send(text);
  } catch (e) {
    console.error("AI proxy error:", e);
    res.status(500).json({ error: "AI proxy failed" });
  }
});

export default router;
