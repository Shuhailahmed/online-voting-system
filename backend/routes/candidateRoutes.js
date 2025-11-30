import express from "express";
import multer from "multer";
import {
  addCandidate,
  getCandidatesByElection,
  deleteCandidate,
} from "../controllers/candidateController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/election/:electionId", getCandidatesByElection);

router.post(
  "/:electionId",
  protect,
  adminOnly,
  upload.fields([
    { name: "partyLogo", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  addCandidate
);

router.delete("/:id", protect, adminOnly, deleteCandidate);

export default router;
