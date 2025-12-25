
import { GoogleGenAI, Type } from "@google/genai";
import { ReflectionResponse } from "../types";

export const generateAIReflection = async (concept: string): Promise<ReflectionResponse | null> => {
  try {
    // Instanciación dinámica para asegurar el acceso a la API_KEY en tiempo de ejecución
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Proporciona una reflexión profunda sobre el concepto: "${concept}". La respuesta debe estar en español y seguir un tono elegante, literario y melancólico pero esperanzador.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            philosophical: {
              type: Type.STRING,
              description: "Una perspectiva filosófica sobre el concepto.",
            },
            poetic: {
              type: Type.STRING,
              description: "Un breve poema o prosa poética sobre el concepto.",
            },
            historical: {
              type: Type.STRING,
              description: "Un dato histórico o cita relacionada que aporte profundidad.",
            }
          },
          required: ["philosophical", "poetic", "historical"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text.trim()) as ReflectionResponse;
    }
    return null;
  } catch (error) {
    console.error("Error generating reflection:", error);
    return null;
  }
};

export const generateInspirationalImage = async (prompt: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `An abstract, elegant, minimalist fine art photography representation of: "${prompt}". 
                   Cinematic lighting, high aesthetic, muted colors, soft textures. 
                   Avoid literal objects or text. Focus on light and mood.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
