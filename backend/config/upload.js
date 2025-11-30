import multer from "multer";
import path from "path";
import fs from "fs";

const IDCARD_DIR = path.join(process.cwd(), "uploads", "idcards");

if (!fs.existsSync(IDCARD_DIR)) {
  fs.mkdirSync(IDCARD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IDCARD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, base + ext);
  },
});

export const uploadIdCard = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed for ID card"));
    }
    cb(null, true);
  },
});
