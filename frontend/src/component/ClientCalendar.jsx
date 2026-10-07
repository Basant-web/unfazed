import { useEffect, useState } from "react";
import "../css/clientCalendar.css";

function ClientCalendar({ therapistId }) {

  const [selectedDate, setSelectedDate] = useState("2026-09-04");
  const [availableSlots, setAvailableSlots] = useState([]);

  const loadSlots = async (date) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/availability/slots/${therapistId}?date=${date}`
      );

      const data = await response.json();

      console.log("Therapist slots:", data);

      setAvailableSlots(data.slots || []);

    } catch (error) {
      console.error("Load slots error:", error);
    }
  };

  const bookSlot = async (slot) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again.");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/sessions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },

        body: JSON.stringify({
          therapistId: therapistId,
          date: selectedDate,
          startTime: slot.startTime,
          endTime: slot.endTime,
          duration: 60,
          type: "Therapy Session"
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Booking failed");
      return;
    }

    alert("Session booked successfully!");

    loadSlots(selectedDate);

  } catch (error) {
    console.error("Booking error:", error);
    alert("Server error. Please try again.");
  }
};

  // Convert therapist time to client local time
  const convertToLocalTime = (date, time) => {
    const [hours, minutes] = time.split(":").map(Number);

    // Therapist timezone: India
    const therapistDate = new Date(
      `${date}T${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:00+05:30`
    );

    return therapistDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (therapistId) {
      loadSlots(selectedDate);
    }
  }, [selectedDate, therapistId]);

  return (
  <div className="clientCalendar">

    <h2 className="bookingTitle">
      Book a Session
    </h2>

    <div className="dateSection">
      <p className="dateLabel">
        Select a date
      </p>

      <input
        className="dateInput"
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
    </div>

    <h3 className="slotsTitle">
      Available Slots
    </h3>

    {availableSlots.length === 0 ? (
      <p className="noSlots">
        No available slots
      </p>
    ) : (
      <div className="slotsContainer">
        {availableSlots.map((slot, index) => (
          <button
            className="clientSlotButton"
            key={index}
            onClick={() => bookSlot(slot)}
          >
            {convertToLocalTime(selectedDate, slot.startTime)}
            {" - "}
            {convertToLocalTime(selectedDate, slot.endTime)}
          </button>
        ))}
      </div>
    )}

  </div>
);
}

export default ClientCalendar;