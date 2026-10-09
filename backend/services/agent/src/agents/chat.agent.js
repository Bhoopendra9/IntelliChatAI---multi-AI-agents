import { getModel } from "../models/llm.models.js";

export const chatAgent = async (state) => {
  const llm = await getModel("chat");

  const systemPrompt = `You are a helpful assistant. Answer the following question`;

  const response = await llm.invoke([
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "human",
      content: state.prompt,
    },
  ]);

  return {
    ...state,
    aiResponse: response.content,
  };
};
