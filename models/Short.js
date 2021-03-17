const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Short = new Schema(
  {
    nanoid: {
      type: String,
      required: true,
    },
    ogUrl: {
      type: String,
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("shortened", Short);
