import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const groqLlm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
  // other params...
});

const geminiLlm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  tmperature: 0,
  maxRetries: 2,
  // other params...
});

export const getModel = async (agent) => {
  switch (agent) {
    case "chat":
      return groqLlm;
    case "search":
      return groqLlm;

    case "coding":
      return geminiLlm;

    default:
      return groqLlm;
  }
};
