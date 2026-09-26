import { type Env, generateContent, isShortText, json, readJson, textOf } from "../../server/gemini";

// POST /api/reflection  { concept }  →  { philosophical, poetic, historical }
export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  const body = await readJson(request);
  const concept = body?.concept;
  if (!isShortText(concept, 200)) return json({ error: "Concepto no válido" }, 400);

  try {
    const response = await generateContent(env, "gemini-3-flash-preview", {
      contents: [{
        parts: [{
          text: `Proporciona una reflexión profunda sobre el concepto: "${concept}". La respuesta debe estar en español y seguir un tono elegante, literario y melancólico pero esperanzador.`,
        }],
      }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            philosophical: { type: "STRING", description: "Una perspectiva filosófica sobre el concepto." },
            poetic: { type: "STRING", description: "Un breve poema o prosa poética sobre el concepto." },
            historical: { type: "STRING", description: "Un dato histórico o cita relacionada que aporte profundidad." },
          },
          required: ["philosophical", "poetic", "historical"],
        },
      },
    });
    const text = textOf(response);
    return json(text ? JSON.parse(text) : null);
  } catch (error) {
    console.error("reflection:", error);
    return json({ error: "Servicio no disponible" }, 502);
  }
}
