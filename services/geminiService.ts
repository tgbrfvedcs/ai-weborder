import { GoogleGenAI, Type } from "@google/genai";
import { FoodItem } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a mock service.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getMenuRecommendations = async (
  userQuery: string,
  menu: FoodItem[]
): Promise<{ recommendedIds: number[], aiMessage: string }> => {
  // Mock response for environments without an API key
  if (!process.env.API_KEY) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockIds = [1, 3, 5];
      const randomIds = menu.map(item => item.id).sort(() => 0.5 - Math.random()).slice(0, 3);
      return {
          recommendedIds: randomIds,
          aiMessage: "Since I'm in demo mode, here are a few random, tasty suggestions for you to check out!"
      };
  }

  const menuForPrompt = menu.map(({ id, name, description, category, price }) => 
    ({ id, name, description, category, price })
  );

  const prompt = `You are a friendly and helpful restaurant menu assistant for "Vị Noodles & Matcha Latte". Your goal is to help users find something they'll love from our menu.
  
  Here is the full menu in JSON format:
  ${JSON.stringify(menuForPrompt, null, 2)}

  A customer has the following request: "${userQuery}"

  Analyze their request and recommend up to 3 items from the menu that best match their preferences. 
  In addition to the IDs, provide a short, friendly, one-sentence message explaining your choices. For example: "Based on your love for matcha, I think you'll really enjoy these!" or "If you're looking for a hearty noodle dish, these are great options!".
  
  Return your answer ONLY in the specified JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommended_ids: {
              type: Type.ARRAY,
              description: "An array of numeric IDs for the recommended food items.",
              items: {
                type: Type.INTEGER,
              },
            },
            message: {
                type: Type.STRING,
                description: "A short, friendly message for the user explaining the recommendations."
            }
          },
        },
      },
    });

    const responseText = response.text.trim();
    const parsedJson = JSON.parse(responseText);
    
    return {
        recommendedIds: parsedJson.recommended_ids || [],
        aiMessage: parsedJson.message || "Here are some suggestions you might like!"
    };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
        recommendedIds: [],
        aiMessage: "I'm having a little trouble thinking right now. Please try again in a moment."
    };
  }
};