import express from "express";

const router = express.Router();

import {
  createConversation,
  getConversations,
  updateConversation,
  saveMessage,
  getMessages,
} from "../controllers/chat.controller.js";

router.route("/create-conversation").get(createConversation);
router.route("/").get(getConversations);
router.route("/:conversationId").patch(updateConversation);
router.route("/:conversationId/message").post(saveMessage);
router.route("/:conversationId/messages").get(getMessages);

export default router;
