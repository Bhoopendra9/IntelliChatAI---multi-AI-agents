import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import logger from "../config/logger.js";
import AppError from "../utils/AppError.js";
import User from "../models/user.model.js";
import crypto from "crypto";

import { getAuth } from "firebase-admin/auth";
import app from "../config/firebase.js";
import redisClient from "../../../../shared/redis/redis.js";

export const login = asyncHandler(async (req, res) => {
  logger.info("Login request received");
  const { token } = req.body;

  if (!token) {
    logger.error("No token provided in the request body");
    throw new AppError(400, "No token provided");
  }
  //Decode the Firebase ID token to get the user's UID and other information
  const decodedToken = await getAuth(app).verifyIdToken(token);
  console.log(decodedToken);

  // Check if the user exists in your database
  let user = await User.findOne({ firebaseId: decodedToken.uid });
  if (!user) {
    logger.error("User not found in the database");
    user = await User.create({
      firebaseId: decodedToken.uid,
      name: decodedToken.name,
      email: decodedToken.email,
      avatar: decodedToken.picture,
    });
    logger.info("New user created in the database");
  }

  console.log("User found or created:", user);

  const sessionId = crypto.randomUUID();

  //set session id in redis
  await redisClient.set(
    `sessionId-${sessionId}`,
    JSON.stringify({
      userId: user._id,
      name: user.name,
      email: user.email,
    }),
    "EX",
    60 * 60 * 24 * 7,
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
  };

  return res
    .status(200)
    .cookie("sessionId", sessionId, options)
    .json(ApiResponse.success(200, "Login successfully", user));
});

export const logout = asyncHandler(async (req, res) => {
  const sessionId = req.cookies?.sessionId;
  if (!sessionId) {
    logger.error("No sessionId cookie found");
    throw new AppError(400, "No sessionId cookie found");
  }
  await redisClient.del(`sessionId-${sessionId}`);
  return res
    .clearCookie("sessionId")
    .status(200)
    .json(ApiResponse.success(200, "Logout successful"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    logger.error("No user found in the request");
    throw new AppError(404, "No user found");
  }
  return res
    .status(200)
    .json(ApiResponse.success(200, "User fetched successfully", user));
});
