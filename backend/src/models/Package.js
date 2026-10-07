const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    totalSessions: {
      type: Number,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    perSessionRate: {
      type: Number,
      required: true
    },

    validityDays: {
      type: Number,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", packageSchema);