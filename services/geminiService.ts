import { GoogleGenAI } from "@google/genai";
import { Language } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in environment variables");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const getDailyInsight = async (day: number, language: Language): Promise<string> => {
  try {
    const ai = getClient();
    
    let promptLang = "";
    switch(language) {
        case Language.RU: promptLang = "Russian"; break;
        case Language.AZ: promptLang = "Azerbaijani"; break;
        case Language.HE: promptLang = "Hebrew"; break;
        default: promptLang = "English";
    }

    const prompt = `
      You are a wise and kind Rabbi.
      Provide a very short, inspiring, one-sentence spiritual thought or historical fact specifically for Day ${day} of Hanukkah.
      The response MUST be in ${promptLang}.
      Do not include "Here is a thought" or quotes. Just the text.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Happy Hanukkah!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "";
  }
};