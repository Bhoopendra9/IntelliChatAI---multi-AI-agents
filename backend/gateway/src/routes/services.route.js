import proxy from "express-http-proxy";
import express from "express";

const router = express.Router();

// service proxy
router.use("/auth", proxy(process.env.AUTH_SEVICE_URL));

export default router;
