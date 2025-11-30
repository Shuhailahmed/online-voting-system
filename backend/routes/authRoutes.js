import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  adminLogin,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadIdCard } from "../config/upload.js";

const router = express.Router();

router.post("/register", uploadIdCard.single("idCard"), registerUser);

router.post("/login", loginUser);
router.post("/admin-login", adminLogin);
router.get("/me", protect, getMe);

export default router;
