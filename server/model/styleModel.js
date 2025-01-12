import mongoose from "mongoose";

const styleModel = new mongoose.Schema(
  {
    styleName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    styleDescription: {
      type: String,
      required: true,
    },
    styleImage: {
      type: String,
      required: true,
    },
    styleAuthor:{
      type: String,
      required: true
    },
    styleContent: [
      {
        styleContentTitle: {
          type: String,
          required: true,
        },
        styleContentDetails: {
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