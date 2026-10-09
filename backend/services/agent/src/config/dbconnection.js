import mongoose from "mongoose";
import logger from "./logger.js";

const connectDB = async () => {
  const uri = String(process.env.MONGO_URI);
  if (!uri) {
    logger.error("MONGO_URI is not defined in the environment variables");
    throw new Error("MONGO_URI is not defined in the environment variables");
  }
  try {
    const connect = await mongoose.connect(uri, {
      dbName: "IntelliChatAI",
    });
    logger.info(
      `MongoDB connected: ${connect.connection.host}, ${connect.connection.readyState}`,
    );
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
