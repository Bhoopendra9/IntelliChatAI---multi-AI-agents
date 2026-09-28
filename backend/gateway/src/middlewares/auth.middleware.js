import redisClient from "../../../shared/redis/redis.js";

const authUserMiddleware = async (req, res, next) => {
  try {
    //TODO: add logging for authUserMiddleware and api responses
    const sessionId = req.cookies?.sessionId;
    if (!sessionId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No sessionId cookie found" });
    }
  
    const session = await redisClient.get(`sessionId-${sessionId}`);
    if (!session) {
      return res.status(401).json({ message: "Unauthorized: Invalid session" });
    }

    req.user = JSON.parse(session);
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authUserMiddleware;
