import ApiResponse from "../utils/ApiResponse.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const agent = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
});
