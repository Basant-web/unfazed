const express = require("express");
const Availability = require("../models/Availability");
const auth = require("../middleware/auth");
const Session = require("../models/Session");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {

    const {
  weeklySchedule,
  oneTimeOverrides,
  blockedSlots,
  sessionDuration,
  bufferTime,
  timezone
} = req.body;

    const availability = await Availability.findOneAndUpdate(
      { therapist: req.userId },

      {
  weeklySchedule,
  oneTimeOverrides,
  blockedSlots,
  sessionDuration,
  bufferTime,
  timezone
},

      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.status(200).json({
      message: "Availability saved successfully",
      availability
    });

  } catch (error) {

    console.log("Availability error:", error);

    res.status(500).json({
      message: "Failed to save availability",
      error: error.message
    });

  }
});

router.get("/", auth, async (req, res) => {
  try {

    const availability = await Availability.findOne({
      therapist: req.userId
    });

    if (!availability) {
      return res.status(404).json({
        message: "Availability not found"
      });
    }

    res.status(200).json({
      availability
    });

  } catch (error) {

    console.log("Get availability error:", error);

    res.status(500).json({
      message: "Failed to get availability",
      error: error.message
    });

  }
});

router.get("/slots", auth, async (req, res) => {
  try {
    const availability = await Availability.findOne({
      therapist: req.userId
    });

    if (!availability) {
      return res.status(404).json({
        message: "Availability not found"
      });
    }

    // Get date from URL
    // Example: /slots?date=2026-09-04
    const selectedDate = req.query.date;

    if (!selectedDate) {
      return res.status(400).json({
        message: "Date is required"
      });
    }

    const {
      weeklySchedule,
      sessionDuration,
      bufferTime,
      oneTimeOverrides,
      blockedSlots
    } = availability;

    // Create date
    const date = new Date(`${selectedDate}T00:00:00`);

    // Get day name
    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];

    const day = dayNames[date.getDay()];

    // Check one-time override
    const override = oneTimeOverrides?.find(
      (item) => item.date === selectedDate
    );

    let startTime;
    let endTime;

    // If override exists
    if (override) {

      // Date is unavailable
      if (!override.isAvailable) {
        return res.json({
          date: selectedDate,
          slots: []
        });
      }

      startTime = override.startTime;
      endTime = override.endTime;

    } else {

      // Use normal weekly schedule
      const weekly = weeklySchedule.find(
        (item) => item.day === day
      );

      if (!weekly) {
        return res.json({
          date: selectedDate,
          slots: []
        });
      }

      startTime = weekly.startTime;
      endTime = weekly.endTime;
    }

    const slots = [];

    let currentTime = startTime;

    while (currentTime < endTime) {

      const [hours, minutes] = currentTime
        .split(":")
        .map(Number);

      const start = new Date(date);

      start.setHours(
        hours,
        minutes,
        0,
        0
      );

      const sessionEnd = new Date(
        start.getTime() +
        sessionDuration * 60 * 1000
      );

      const endHours = String(
        sessionEnd.getHours()
      ).padStart(2, "0");

      const endMinutes = String(
        sessionEnd.getMinutes()
      ).padStart(2, "0");

      const slotEndTime =
        `${endHours}:${endMinutes}`;

      // Don't create slot beyond working hours
      if (slotEndTime > endTime) {
        break;
      }

      // Check blocked slot
      const isBlocked = blockedSlots?.some(
        (blocked) => {

          if (blocked.date !== selectedDate) {
            return false;
          }

          return (
            currentTime < blocked.endTime &&
            slotEndTime > blocked.startTime
          );
        }
      );

      // Add only if not blocked
      if (!isBlocked) {
        slots.push({
          startTime: currentTime,
          endTime: slotEndTime
        });
      }

      // Move to next slot
      const nextTime = new Date(
        sessionEnd.getTime() +
        bufferTime * 60 * 1000
      );

      const nextHours = String(
        nextTime.getHours()
      ).padStart(2, "0");

      const nextMinutes = String(
        nextTime.getMinutes()
      ).padStart(2, "0");

      currentTime =
        `${nextHours}:${nextMinutes}`;
    }

    res.json({
      date: selectedDate,
      slots
    });

  } catch (error) {

    console.log(
      "Slot generation error:",
      error
    );

    res.status(500).json({
      message: "Failed to generate slots",
      error: error.message
    });
  }
});

router.get("/slots/:therapistId", async (req, res) => {
  try {
    const availability = await Availability.findOne({
      therapist: req.params.therapistId
    });

    if (!availability) {
      return res.status(404).json({
        message: "Availability not found"
      });
    }

    const selectedDate = req.query.date;

    if (!selectedDate) {
      return res.status(400).json({
        message: "Date is required"
      });
    }

    const {
      weeklySchedule,
      sessionDuration,
      bufferTime,
      oneTimeOverrides,
      blockedSlots
    } = availability;

    const date = new Date(`${selectedDate}T00:00:00`);

    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];

    const day = dayNames[date.getDay()];

    const override = oneTimeOverrides?.find(
      (item) => item.date === selectedDate
    );

    let startTime;
    let endTime;

    if (override) {

      if (!override.isAvailable) {
        return res.json({
          date: selectedDate,
          slots: []
        });
      }

      startTime = override.startTime;
      endTime = override.endTime;

    } else {

      const weekly = weeklySchedule.find(
        (item) => item.day === day
      );

      if (!weekly) {
        return res.json({
          date: selectedDate,
          slots: []
        });
      }

      startTime = weekly.startTime;
      endTime = weekly.endTime;
    }

    const slots = [];
    let currentTime = startTime;

    while (currentTime < endTime) {

      const [hours, minutes] = currentTime
        .split(":")
        .map(Number);

      const start = new Date(date);

      start.setHours(hours, minutes, 0, 0);

      const sessionEnd = new Date(
        start.getTime() +
        sessionDuration * 60 * 1000
      );

      const endHours = String(
        sessionEnd.getHours()
      ).padStart(2, "0");

      const endMinutes = String(
        sessionEnd.getMinutes()
      ).padStart(2, "0");

      const slotEndTime =
        `${endHours}:${endMinutes}`;

      if (slotEndTime > endTime) {
        break;
      }

      const isBlocked = blockedSlots?.some(
        (blocked) => {

          if (blocked.date !== selectedDate) {
            return false;
          }

          return (
            currentTime < blocked.endTime &&
            slotEndTime > blocked.startTime
          );
        }
      );

      if (!isBlocked) {
        slots.push({
          startTime: currentTime,
          endTime: slotEndTime
        });
      }

      const nextTime = new Date(
        sessionEnd.getTime() +
        bufferTime * 60 * 1000
      );

      const nextHours = String(
        nextTime.getHours()
      ).padStart(2, "0");

      const nextMinutes = String(
        nextTime.getMinutes()
      ).padStart(2, "0");

      currentTime =
        `${nextHours}:${nextMinutes}`;
    }

    

    // Get booked sessions for this therapist on this date
const bookedSessions = await Session.find({
  therapist: req.params.therapistId,
  date: {
    $gte: new Date(`${selectedDate}T00:00:00`),
    $lt: new Date(`${selectedDate}T23:59:59.999`)
  },
  status: { $ne: "cancelled" }
});

// Remove already booked slots
const availableSlots = slots.filter((slot) => {

  const isBooked = bookedSessions.some((session) => {

    return (
      slot.startTime === session.startTime
    );

  });

  return !isBooked;
});

res.json({
  date: selectedDate,
  slots: availableSlots
});

  } catch (error) {

    console.log(
      "Client slot generation error:",
      error
    );

    res.status(500).json({
      message: "Failed to generate slots",
      error: error.message
    });
  }
});

router.post("/book", async (req, res) => {
  try {
    const {
      therapistId,
      clientId,
      date,
      startTime,
      endTime
    } = req.body;

    if (!therapistId || !clientId || !date || !startTime || !endTime) {
      return res.status(400).json({
        message: "All booking details are required"
      });
    }

    // Check whether this slot is already booked
    const existingSession = await Session.findOne({
      therapistId,
      date,
      startTime
    });

    if (existingSession) {
      return res.status(409).json({
        message: "This slot is already booked"
      });
    }

    const session = await Session.create({
      therapistId,
      clientId,
      date,
      startTime,
      endTime
    });

    res.status(201).json({
      message: "Session booked successfully",
      session
    });

  } catch (error) {
    console.log("Booking error:", error);

    res.status(500).json({
      message: "Failed to book session",
      error: error.message
    });
  }
});

module.exports = router;