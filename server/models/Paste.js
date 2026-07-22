const mongoose = require("mongoose");

const pasteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      default: "text",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Paste", pasteSchema);