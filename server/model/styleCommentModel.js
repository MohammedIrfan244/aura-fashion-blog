import mongoose from "mongoose";

const styleCommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    style: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Style",
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const StyleComment = mongoose.model("StyleComment", styleCommentSchema);

export default StyleComment;
