import mongoose from "mongoose";

const scorechema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    province: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
      required: true,
    },

    voices: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
scorechema.index({ candidate: 1, province: 1 }, { unique: true });

const Score = mongoose.model("Score", scorechema);

export default Score;
