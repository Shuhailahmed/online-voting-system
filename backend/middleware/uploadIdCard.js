import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadPath = path.join("uploads", "idcards");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const safeName = Date.now() + "-" + file.fieldname + ext;
    cb(null, safeName);
  },
});

const fileFilter = (req, file, cb) => {
  if (/image\/(jpeg|jpg|png)/.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG/PNG images are allowed for ID card."));
  }
};

const uploadIdCard = multer({ storage, fileFilter });

export default uploadIdCard;
