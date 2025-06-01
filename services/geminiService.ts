
import { GoogleGenAI, GenerateContentResponse, Chat, Part, GenerateContentParameters, GenerateContentResult } from "@google/genai";
import { ContentIdea, ChatMessage, UserType, GroundingMetadata } from '../types';
import { GEMINI_MODEL_TEXT, GarlandStoreAddress, StorePhoneNumber } from '../constants';

let ai: GoogleGenAI | null = null;
let isApiKeyMissingNotified = false;

const getAIClient = (): GoogleGenAI | null => {
  if (ai) return ai;
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "YOUR_API_KEY_HERE" || apiKey.length < 10) {
    if (!isApiKeyMissingNotified) {
      console.error("Gemini API Key is missing or invalid. AI features will be disabled. Set process.env.API_KEY.");
      isApiKeyMissingNotified = true;
    }
    return null;
  }
  ai = new GoogleGenAI({ apiKey });
  isApiKeyMissingNotified = false; // Reset if key becomes available
  return ai;
};


export const generateContentIdeas = async (topic: string): Promise<ContentIdea[]> => {
  const client = getAIClient();
  if (!client) throw new Error("API Key not configured for Gemini.");

  const prompt = `Generate 3 distinct content ideas for a marketing campaign about "${topic}" for urazpro. For each idea, provide a catchy title, a brief synopsis (2-3 sentences), and 3-5 key talking points. Ensure the ideas are creative and engaging for home improvement products. Format the output as a JSON array of objects, where each object has "title", "synopsis", and "talkingPoints" (array of strings) keys. Example: [{"title": "Idea 1 Title", "synopsis": "...", "talkingPoints": ["Point 1", "Point 2"]}]`;

  try {
    const response: GenerateContentResponse = await client.models.generateContent({
        model: GEMINI_MODEL_TEXT,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            temperature: 0.7,
        }
    });
    
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr) as ContentIdea[];
    return parsedData;

  } catch (error) {
    console.error("Error generating content ideas:", error);
    throw new Error("Failed to generate content ideas from AI.");
  }
};

let chatInstance: Chat | null = null;

const getChatSystemInstruction = (userType: UserType): string => {
 return `You are urazproBot, a friendly and helpful AI assistant for urazpro, a premier provider of home improvement products like roofing, cabinetry, and flooring. Your primary goal is to assist users and encourage them to visit our Garland, TX store or contact us.
Our store is located at: ${GarlandStoreAddress}. Our phone number is: ${StorePhoneNumber}.

Current user type: ${userType}.

If the user is B2C (retail customer): Be warm and inspiring. Help them find products, offer project ideas, check general stock availability, and highlight current promotions. Always suggest a visit to our Garland showroom to see products in person or call us.
If the user is B2B (contractor/professional): Be efficient and professional. Provide product specifications, information on bulk pricing, assist with Request for Quote (RFQ) processes, and technical details. Offer to connect them with a sales representative for large orders. Mention that detailed stock and project-specific pricing often require direct contact.

Always maintain a positive and helpful tone. Do not make up information you don't have. If asked about specific stock for Garland, say you can check general availability but for precise numbers, visiting or calling the store is best.
Use Google Search grounding if the query is about recent events, news, or specific up-to-date information.
If you use Google Search, list the source URLs.
`;
};


export const startChat = (userType: UserType): Chat | null => {
  const client = getAIClient();
  if (!client) return null;

  chatInstance = client.chats.create({
    model: GEMINI_MODEL_TEXT,
    config: {
      systemInstruction: getChatSystemInstruction(userType),
      tools: [{googleSearch: {}}], // Enable Google Search grounding
      temperature: 0.5,
    }
  });
  return chatInstance;
};

export const resetChatOnUserTypeChange = (userType: UserType): Chat | null => {
    // This function is called when userType changes to ensure the chat has the correct system instructions.
    return startChat(userType);
}

export const sendMessageToChatStream = async (
  message: string, 
  currentUserType: UserType
): Promise<AsyncIterable<GenerateContentResponse>> => {
  if (!chatInstance) {
    chatInstance = startChat(currentUserType);
    if(!chatInstance) throw new Error("Failed to initialize chat: API Key likely missing.");
  }
  
  // Check if system instruction needs update due to user type change
  // This is a simplified check. A more robust solution might compare current chat's system instruction.
  // For now, we re-create chat if it's not aligned.
  // However, the prompt for this project says "ai.chats.create", then "chat.sendMessage".
  // It does not show updating system instruction on an existing chat.
  // So we rely on the UI to call resetChatOnUserTypeChange or startChat when UserType changes.

  try {
    const result: AsyncIterable<GenerateContentResponse> = await chatInstance.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Error sending message to chat stream:", error);
    throw new Error("Failed to send message to AI chat.");
  }
};

export const isApiKeyConfigured = (): boolean => {
  const client = getAIClient();
  return client !== null;
};