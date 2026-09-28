import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/AppError.js";
import logger from "../config/logger.js";

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = asyncHandler(async (req, res, next) => {
  const userId = req.headers["x-user-id"];
  console.log("User ID from headers:", userId);

  if (!userId) {
    logger.error("User ID is required in headers");
    return next(new ApiError(400, "User ID is required in headers"));
  }

  const conversation = await Conversation.create({ userId: userId });
  if (!conversation) {
    logger.error("Failed to create conversation");
    return next(new ApiError(500, "Failed to create conversation"));
  }

  logger.info(
    `Conversation created successfully for User ID: ${userId}, Conversation ID: ${conversation._id}`,
  );

  return res
    .status(201)
    .json(
      new ApiResponse(201, "Conversation created successfully", conversation),
    );
});

export const getConversations = asyncHandler(async (req, res, next) => {
  const userId = req.headers["x-user-id"];
  if (!userId) {
    logger.error("User ID is required in headers");
    return next(new ApiError(400, "User ID is required in headers"));
  }

  const conversations = await Conversation.find({ userId: userId }).sort({
    updateAt: -1,
  });

  if (!conversations) {
    logger.error(`No conversations found for User ID: ${userId}`);
    return next(new ApiError(404, "No conversations found"));
  }
  logger.info(
    `Fetched ${conversations.length} conversations for User ID: ${userId}`,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Conversations fetched successfully", conversations),
    );
});

export const updateConversation = asyncHandler(async (req, res, next) => {
  const { conversationId } = req.params;
  const { title } = req.body;

  const updatedConversation = await Conversation.findByIdAndUpdate(
    conversationId,
    { title },
    { new: true },
  );

  if (!updatedConversation) {
    logger.error(`Failed to update conversation with ID: ${conversationId}`);
    return next(new ApiError(500, "Failed to update conversation"));
  }

  logger.info(
    `Conversation updated successfully for Conversation ID: ${conversationId}`,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Conversation updated successfully",
        updatedConversation,
      ),
    );
});

export const saveMessage = asyncHandler(async (req, res, next) => {
  const { conversationId } = req.params;
  const { role, content } = req.body;

  const newMessage = await Message.create({
    conversationId,
    role,
    content,
  });

  if (!newMessage) {
    logger.error("Failed to save message");
    return next(new ApiError(500, "Failed to save message"));
  }

  logger.info(
    `Message saved successfully for Conversation ID: ${conversationId}, Message ID: ${newMessage._id}`,
  );

  return res
    .status(201)
    .json(new ApiResponse(201, "Message saved successfully", newMessage));
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const { conversationId } = req.params;

  const messages = await Conversation.find({ conversationId })
    .sort({
      createdAt: -1,
    })
    .populate("messages");
  if (!messages) {
    logger.error(`No messages found for Conversation ID: ${conversationId}`);
    return next(new ApiError(404, "No messages found"));
  }

  logger.info(
    `Fetched ${messages.length} messages for Conversation ID: ${conversationId}`,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Messages fetched successfully", messages));
});
