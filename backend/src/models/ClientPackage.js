const mongoose = require("mongoose");

const clientPackageSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true
    },

    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true
    },

    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true
    },

    totalSessions: {
      type: Number,
      required: true
    },

    remainingSessions: {
      type: Number,
      required: true
    },

    purchasedAt: {
      type: Date,
      default: Date.now
    },

    expiresAt: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["active", "expired", "completed"],
      default: "active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ClientPackage",
  clientPackageSchema
);