import axios from "axios";

import ApiResponse from "../utils/ApiResponse.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import logger from "../config/logger.js";
import graph from "../graph/graph.js";

export const agent = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  const { conversationId } = req.params;

  if (prompt & conversationId) {
    logger.error("Prompt and conversation are missing");
    return next(new AppError(500, "Failed to save message"));
  }
  const newMessage = await axios.post(
    `${process.env.CHAT_SERVICE}/${conversationId}/message`,
    {
      role: "user",
      content: prompt,
    },
  );
  logger.info(
    `Message saved successfully for Conversation ID: ${conversationId}, Message ID: ${newMessage._id}`,
  );

  const result = await graph.invoke({
    prompt,
    conversationId,
  });

  const response = result.aiResponse;

  return res
    .status(200)
    .json(new ApiResponse(201, "Message saved successfully", response));
});
