import express from "express";
import authUserMiddleware from "../middlewares/auth.middleware.js";

import {
  login,
  logout,
  getCurrentUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/current-user").get(authUserMiddleware, getCurrentUser);

export default router;
