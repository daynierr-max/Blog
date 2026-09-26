import { type Env, generateContent, isShortText, json, readJson } from "../../server/gemini";

// POST /api/image  { prompt }  →  { image: data URL | null }
export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  const body = await readJson(request);
  const prompt = body?.prompt;
  if (!isShortText(prompt, 300)) return json({ error: "Prompt no válido" }, 400);

  try {
    const response = await generateContent(env, "gemini-2.5-flash-image", {
      contents: [{
        parts: [{
          text: `An abstract, elegant, minimalist fine art photography representation of: "${prompt}".
                   Cinematic lighting, high aesthetic, muted colors, soft textures.
                   Avoid literal objects or text. Focus on light and mood.`,
        }],
      }],
      generationConfig: { imageConfig: { aspectRatio: "16:9" } },
    });
    const parts = response?.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p: any) => p.inlineData);
    return json({ image: imagePart ? `data:image/png;base64,${imagePart.inlineData.data}` : null });
  } catch (error) {
    console.error("image:", error);
    return json({ error: "Servicio no disponible" }, 502);
  }
}
