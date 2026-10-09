import { getModel } from "../models/llm.models.js";

export const router = async (state) => {
  const llm = await getModel("router"); // Get the appropriate LLM based on the agent type
  const prompt = ` you are an agent router. Based on the user's input, you need to determine which agent should handle the request. 
        Available agents: 
            -chat, 
            -coding,
            -vision, 
            -pdf, 
            -ppt, 
            -search

        Rules:
        1. chat: For general conversation, questions, and discussions.
        2. coding: For programming-related queries, code generation, and debugging.
        3. vision: For image generation, image analysis, and computer vision tasks.
        4. pdf: For PDF-related tasks, such as reading, summarizing, or extracting information from PDFs. and generating PDFs from text.
        5. ppt: For PowerPoint-related tasks, such as creating slides or analyzing presentations.
        6. search: For web search and information retrieval tasks. 
        
        Based on the user's input, determine the most appropriate agent to handle the request.
        return only the agent name as a single word, without any additional text or explanation.
        chat, coding, vision, pdf, ppt, search

        user Queury
        ${state.prompt}
        
    `;

  const response = await llm.invoke(prompt);
  console.log("Router response:", response);

  return {
    ...state,
    agent: response.content.trim().toLowerCase(), // Update the state with the selected agent
  };
};
