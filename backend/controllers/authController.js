import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import path from "path";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ---------------------- REGISTER (VOTER WITH ENROLLMENT ID + FACULTY + ID CARD) ----------------------
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, enrollmentId, password, faculty } = req.body;

    const file = req.file;

    if (!name || !email || !password || !enrollmentId || !faculty) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!file) {
      return res
        .status(400)
        .json({ message: "ID card image is required for registration" });
    }

    const idCardPath = path
      .join("uploads", "idcards", path.basename(file.path))
      .replace(/\\/g, "/");

    // ---- Uniqueness checks ----

    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const existsEnrollment = await User.findOne({ enrollmentId });
    if (existsEnrollment) {
      return res
        .status(400)
        .json({ message: "This Enrollment ID is already registered" });
    }

    const existsCard = await User.findOne({ idCardPath });
    if (existsCard) {
      return res
        .status(400)
        .json({ message: "This ID card has already been used" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const isAdminEmail =
      process.env.ADMIN_EMAIL && email === process.env.ADMIN_EMAIL;

    const user = await User.create({
      name,
      email,
      enrollmentId,
      faculty,
      idCardPath,
      password: hashed,
      role: isAdminEmail ? "admin" : "voter",
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        enrollmentId: user.enrollmentId,
        faculty: user.faculty,
        idCardPath: user.idCardPath,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ---------------------- NORMAL LOGIN (VOTER / ADMIN) ----------------------
export const loginUser = async (req, res, next) => {
  try {
    const { email, password, asAdmin } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (asAdmin && user.role !== "admin") {
      return res.status(403).json({ message: "Not an admin account" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        enrollmentId: user.enrollmentId,
        faculty: user.faculty,
        idCardPath: user.idCardPath,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ---------------------- ADMIN LOGIN (ENV-BASED, NO REAL ID CARD) ----------------------
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check .env credentials
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // if admin already exists, just use it
    let user = await User.findOne({ email });

    // first time: create admin account
    if (!user) {
      const hashed = await bcrypt.hash(password, 10);

      user = await User.create({
        name: "System Admin",
        email,
        enrollmentId: "ADMIN-SYSTEM",
        faculty: "ADMIN",
        // 👇 IMPORTANT: give some non-empty idCardPath so schema validation passes
        idCardPath: "ADMIN-ID-CARD",
        password: hashed,
        role: "admin",
      });
    }

    const token = generateToken(user._id, user.role);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        enrollmentId: user.enrollmentId,
        faculty: user.faculty,
        idCardPath: user.idCardPath,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ---------------------- GET CURRENT USER ----------------------
export const getMe = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};
