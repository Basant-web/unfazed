const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true,
    },

    weeklySchedule: [
      {
        day: {
          type: String,
          enum: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ],
          required: true,
        },

        startTime: {
          type: String,
          required: true,
        },

        endTime: {
          type: String,
          required: true,
        },
      },
    ],

    oneTimeOverrides: [
  {
    date: {
      type: String,
      required: true
    },

    isAvailable: {
      type: Boolean,
      default: true
    },

    startTime: {
      type: String
    },

    endTime: {
      type: String
    }
  }
],

blockedSlots: [
  {
    date: {
      type: String,
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
    reason: {
      type: String,
      default: ""
    }
  }
],

    sessionDuration: {
      type: Number,
      enum: [30, 45, 60, 90],
      default: 60,
    },

    bufferTime: {
      type: Number,
      default: 0,
    },

    timezone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Availability", availabilitySchema);