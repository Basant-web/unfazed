const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    startTime: {
      type: String,
      required: true
    },

    endTime: {
      type: String,
      required: true
    },

    duration: {
      type: Number,
      default: 50
    },

    type: {
      type: String,
      default: "Therapy Session"
    },

    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled"
    },

    notes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;