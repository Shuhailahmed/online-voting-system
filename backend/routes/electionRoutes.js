import express from "express";
import {
  createElection,
  updateElection,
  deleteElection,
  getAllElections,
  getElectionById,
  getActiveElections,
  getUpcomingElections,
  getCompletedElections,
} from "../controllers/electionController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// public / user routes
router.get("/", getAllElections);
router.get("/active", getActiveElections);
router.get("/upcoming", getUpcomingElections);
router.get("/completed", getCompletedElections);
router.get("/:id", getElectionById);

// admin routes
router.post("/", protect, adminOnly, createElection);
router.put("/:id", protect, adminOnly, updateElection);
router.delete("/:id", protect, adminOnly, deleteElection);

export default router;
