import { GoogleGenAI, Type } from "@google/genai";
import { Sentiment, SocialPost } from "../types";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in environment variables.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export const aiService = {
  async analyzeSentiment(text: string): Promise<{ sentiment: Sentiment; confidence: number; reason: string }> {
    const ai = getAI();
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the sentiment of the following social media post. 
      Return only a JSON object with:
      - sentiment: "positive", "negative", or "neutral"
      - confidence: a number between 0 and 1
      - reason: a brief explanation
      
      Post: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING, enum: ["positive", "negative", "neutral"] },
            confidence: { type: Type.NUMBER },
            reason: { type: Type.STRING }
          },
          required: ["sentiment", "confidence", "reason"]
        }
      }
    });

    try {
      return JSON.parse(response.text || "{}");
    } catch (e) {
      console.error("Failed to parse sentiment analysis result", e);
      return { sentiment: "neutral", confidence: 0.5, reason: "Error in processing" };
    }
  },

  async generateMockPosts(keyword: string, count: number = 5): Promise<SocialPost[]> {
    const ai = getAI();
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate ${count} realistic social media posts (X/Twitter style) about "${keyword}". 
      Include a mix of positive, negative, and neutral sentiments.
      Return a JSON array of objects with:
      - id: unique string
      - platform: "twitter" or "youtube"
      - author: a creative handle
      - content: the post text
      - timestamp: ISO date string
      - sentiment: the correct classification
      - confidence: a mock confidence score`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              platform: { type: Type.STRING },
              author: { type: Type.STRING },
              content: { type: Type.STRING },
              timestamp: { type: Type.STRING },
              sentiment: { type: Type.STRING, enum: ["positive", "negative", "neutral"] },
              confidence: { type: Type.NUMBER }
            },
            required: ["id", "platform", "author", "content", "sentiment", "confidence"]
          }
        }
      }
    });

    try {
      return JSON.parse(response.text || "[]");
    } catch (e) {
      console.error("Failed to parse generated mock posts", e);
      return [];
    }
  }
};
