
import { ReflectionResponse } from "../types";

// Las llamadas a Gemini se hacen en el servidor (functions/api/*):
// la clave de API nunca llega al navegador.
const postJson = async (url: string, body: unknown) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${url} respondió ${res.status}`);
  return res.json();
};

export const generateAIReflection = async (concept: string): Promise<ReflectionResponse | null> => {
  try {
    return (await postJson("/api/reflection", { concept })) as ReflectionResponse | null;
  } catch (error) {
    console.error("Error generating reflection:", error);
    return null;
  }
};

export const generateInspirationalImage = async (prompt: string): Promise<string | null> => {
  try {
    const { image } = await postJson("/api/image", { prompt });
    return image ?? null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
