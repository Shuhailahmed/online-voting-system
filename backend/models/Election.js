import mongoose from "mongoose";

const electionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["draft", "active", "completed", "upcoming"],
      default: "draft",
    },
    startAt: Date,
    endAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Election", electionSchema);
