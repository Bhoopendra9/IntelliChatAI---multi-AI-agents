import express from "express";

const router = express.Router();

import { agent } from "../controllers/agent.controller.js";

router.route("/chat").post(agent);

export default router;
