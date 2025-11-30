import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    enrollmentId: { type: String, required: true, unique: true }, // one student once
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["voter", "admin"],
      default: "voter",
    },
    idCardPath: {
      type: String,
      required: true,
      unique: true, 
    },
    faculty: {
      type: String,
      default: "Not provided",
    },   
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
