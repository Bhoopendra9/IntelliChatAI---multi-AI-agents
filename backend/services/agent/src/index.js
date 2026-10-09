import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";

import logger from "./config/logger.js";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 8003;
console.log("Port number", process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Morgan stream → Winston
const morganStream = {
  write: (message) => {
    logger.info(message.trim());
  },
};
// HTTP request logging
app.use(morgan("combined", { stream: morganStream }));

//router importing
import agentRouter from "./router/agent.route.js";

app.use("/", agentRouter);

app.listen(PORT, () => {
  logger.info(`Agents service is running on port ${PORT}`);
});
