import mongoose from "mongoose";

const provinceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    enrolled: {
      type: Number,
      required: true,
    },
    voter: {
      type: Number,
      required: false,
      default: 0,
    },
    null_bulletin: {
      type: Number,
      required: false,
      default: 0,
    },
    candidates: [
      {
        candidate: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Candidate",
        },
        voices: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

provinceSchema.methods.getTauxParticipation = function () {
  const tauxDeParticipation = (
    ((this.voter - this.null_bulletin) / this.enrolled) *
    100
  ).toFixed(2);

  return tauxDeParticipation;
};

const Province = mongoose.model("Province", provinceSchema);

export default Province;
