import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/voters", protect, async (req, res) => {
  try {
    const voters = await User.countDocuments({ role: "voter" });
    res.json({ count: voters });
  } catch (err) {
    res.status(500).json({ message: "Failed to load voters" });
  }
});

export default router;
