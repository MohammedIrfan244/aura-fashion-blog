import mongoose from "mongoose";

const styleModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: [
      {
        contentTitle: {
          type: String,
          required: true,
        },
        contentDetails: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Style = mongoose.model("Style", styleModel);

export default Style;
