import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import logger from "./config/logger.js";
import connectDB from "./config/dbconnection.js";

const app = express();

const PORT = process.env.PORT || 8002;

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

// Import routes
import chatRoutes from "./routes/chat.route.js";

// Use routes
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  connectDB();
  logger.info(`Chat service is running on port ${PORT}`);
});
