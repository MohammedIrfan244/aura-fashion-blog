import mongoose from "mongoose";

const boutiqueReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    boutique: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Boutique",
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BoutiqueReview = mongoose.model("BoutiqueReview", boutiqueReviewSchema);

export default BoutiqueReview;
