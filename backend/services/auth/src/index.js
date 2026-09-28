import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import logger from "./config/logger.js";
import connectDB from "./config/dbconnection.js";

const app = express();
const PORT = Number(process.env.PORT) || 8001;

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

// Routes
import userAuth from "./routes/auth.route.js";

app.use("/", userAuth);

app.listen(PORT, () => {
  connectDB();
  logger.info(`Gateway Server is running on port ${PORT}`);
});
