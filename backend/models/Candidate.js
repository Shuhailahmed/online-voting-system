import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    election: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
      required: true,
    },
    name: { type: String, required: true },
    party: { type: String, required: true },
    partyLogo: String, 
    photo: String, 
    manifesto: String,
  },
  { timestamps: true }
);

export default mongoose.model("Candidate", candidateSchema);
