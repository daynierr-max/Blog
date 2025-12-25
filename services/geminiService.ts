
import { GoogleGenAI, Type } from "@google/genai";
import { ReflectionResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAIReflection = async (concept: string): Promise<ReflectionResponse | null> => {
  try {
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
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `An elegant, minimalist, and philosophical artistic representation of: "${prompt}". 
                   Cinematic lighting, high aesthetic, soft neutral colors, 
                   fine textures of stone, paper, or celestial dust. 
                   Avoid text, realistic faces, or cluttered compositions. 
                   Focus on light and shadow. 16:9 aspect ratio.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
