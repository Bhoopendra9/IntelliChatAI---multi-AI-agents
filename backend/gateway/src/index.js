import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";

import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import proxy from "express-http-proxy";
import logger from "./config/logger.js";
import authUserMiddleware from "./middlewares/auth.middleware.js";
import proxyWithHeaders from "./utils/proxyWithHeaders.js";

const app = express();
const PORT = Number(process.env.PORT) || 8000;

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: String(process.env.CLIENT_URL),
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-version"],
    credentials: true,
    preflightContinue: false,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(authUserMiddleware);

// Morgan stream → Winston
const morganStream = {
  write: (message) => {
    logger.info(message.trim());
  },
};
// HTTP request logging
app.use(morgan("combined", { stream: morganStream }));

// service proxy
// app.get("/api/v1/health", (req, res) => {
//   console.log("auth ojbect", req.user);
// });
app.use(
  "/api/v1/auth",
  proxy(String(process.env.AUTH_SERVICE_URL), {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => ({
      ...proxyReqOpts,
      headers: {
        ...proxyReqOpts.headers,
        cookie: srcReq.headers.cookie || "",
      },
    }),
  }),
);
app.use(
  "/api/v1/chat",
  authUserMiddleware,
  proxyWithHeaders(process.env.CHAT_SERVICE_URL),
);

app.use(
  "/api/v1/agents",
  authUserMiddleware,
  proxyWithHeaders(process.env.AGENTS_SERVICE_URL),
);

// ...existing code...

app.listen(PORT, () => {
  logger.info(`Gateway Server is running on port ${PORT}`);
});
