import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock
} from "lucide-react";

import { useEffect, useState } from "react";

import "../css/calendarSchedule.css";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const formatDate = (date) => {
  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
};

const getMonthDates = (year, month) => {
  const firstDay = new Date(year, month, 1);

  const lastDay = new Date(
    year,
    month + 1,
    0
  );

  const dates = [];

  // Day of week for first day
  // Monday = 0 ... Sunday = 6
  const firstDayIndex =
    firstDay.getDay() === 0
      ? 6
      : firstDay.getDay() - 1;

  // Previous month's dates
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const date = new Date(
      year,
      month,
      -i
    );

    dates.push({
      date: formatDate(date),
      day: date.getDate(),
      currentMonth: false
    });
  }

  // Current month's dates
  for (
    let day = 1;
    day <= lastDay.getDate();
    day++
  ) {
    const date = new Date(
      year,
      month,
      day
    );

    dates.push({
      date: formatDate(date),
      day: date.getDate(),
      currentMonth: true
    });
  }

  // Next month's dates
  let nextDay = 1;

  while (dates.length % 7 !== 0) {
    const date = new Date(
      year,
      month + 1,
      nextDay
    );

    dates.push({
      date: formatDate(date),
      day: date.getDate(),
      currentMonth: false
    });

    nextDay++;
  }

  return dates;
};

function CalendarSchedule() {
  const [schedule, setSchedule] = useState({
    monday: { enabled: false, startTime: "09:00", endTime: "17:00" },
    tuesday: { enabled: false, startTime: "09:00", endTime: "17:00" },
    wednesday: { enabled: false, startTime: "09:00", endTime: "17:00" },
    thursday: { enabled: false, startTime: "09:00", endTime: "17:00" },
    friday: { enabled: false, startTime: "09:00", endTime: "17:00" },
    saturday: { enabled: false, startTime: "09:00", endTime: "17:00" },
    sunday: { enabled: false, startTime: "09:00", endTime: "17:00" },
  });

  const [sessionDuration, setSessionDuration] = useState(60);
  const [bufferTime, setBufferTime] = useState(0);
  const [selectedDate, setSelectedDate] = useState("2026-09-04");
const [availableSlots, setAvailableSlots] = useState([]);
const [calendarYear, setCalendarYear] = useState(2026);
const [calendarMonth, setCalendarMonth] = useState(8);

  const [oneTimeOverrides, setOneTimeOverrides] = useState([]);
  const [overrideDate, setOverrideDate] = useState("");
  const [overrideAvailable, setOverrideAvailable] = useState(true);
  const [overrideStartTime, setOverrideStartTime] = useState("09:00");
  const [overrideEndTime, setOverrideEndTime] = useState("17:00");
  const calendarDates = getMonthDates(
  calendarYear,
  calendarMonth
);

  const [blockedSlots, setBlockedSlots] = useState([]);
const [blockedDate, setBlockedDate] = useState("");
const [blockedStartTime, setBlockedStartTime] = useState("09:00");
const [blockedEndTime, setBlockedEndTime] = useState("17:00");
const [blockedReason, setBlockedReason] = useState("");

  const sessions = [
    {
      time: "10:00 AM",
      client: "Alex Rivera",
      type: "Individual Therapy",
      status: "Confirmed"
    },
    {
      time: "12:30 PM",
      client: "Elena Rostova",
      type: "CBT Session",
      status: "Confirmed"
    },
    {
      time: "04:00 PM",
      client: "Michael Chen",
      type: "Follow-up Session",
      status: "Pending"
    }
  ];
  

  // ==========================================
  // SAVE AVAILABILITY
  // ==========================================

  const saveAvailability = async () => {
    const weeklySchedule = days
      .filter((day) => schedule[day].enabled)
      .map((day) => ({
        day: day,
        startTime: schedule[day].startTime,
        endTime: schedule[day].endTime
      }));

    const availabilityData = {
      weeklySchedule,
      oneTimeOverrides,
      blockedSlots,
      sessionDuration,
      bufferTime,
      timezone: "Asia/Kolkata"
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/availability",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },

          body: JSON.stringify(availabilityData)
        }
      );

      const data = await response.json();

      console.log("Backend response:", data);

      if (response.ok) {
        alert("Availability saved successfully");
      } else {
        alert(data.message || "Failed to save availability");
      }

    } catch (error) {
      console.error("Save availability error:", error);
      alert("Server error");
    }
  };

  // ==========================================
  // ADD ONE-TIME OVERRIDE
  // ==========================================

  const addOverride = () => {
    if (!overrideDate) {
      alert("Please select a date");
      return;
    }

    const newOverride = {
      date: overrideDate,
      isAvailable: overrideAvailable,
      startTime: overrideAvailable ? overrideStartTime : "",
      endTime: overrideAvailable ? overrideEndTime : ""
    };

    setOneTimeOverrides([
      ...oneTimeOverrides,
      newOverride
    ]);

    // Clear date after adding
    setOverrideDate("");
  };

  const addBlockedSlot = () => {
  if (!blockedDate) {
    alert("Please select a date");
    return;
  }

  if (blockedStartTime >= blockedEndTime) {
    alert("End time must be after start time");
    return;
  }

  const alreadyExists = blockedSlots.some(
  (slot) =>
    slot.date === blockedDate &&
    slot.startTime === blockedStartTime &&
    slot.endTime === blockedEndTime
);

if (alreadyExists) {
  alert("This blocked slot already exists");
  return;
}

  const newBlockedSlot = {
    date: blockedDate,
    startTime: blockedStartTime,
    endTime: blockedEndTime,
    reason: blockedReason
  };

  setBlockedSlots([
    ...blockedSlots,
    newBlockedSlot
  ]);

  setBlockedDate("");
  setBlockedReason("");
};

const loadSlots = async (date) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/availability/slots?date=${date}`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    const data = await response.json();

    console.log("Generated slots:", data);

    setAvailableSlots(data.slots || []);

  } catch (error) {
    console.error("Load slots error:", error);
  }
};

  // ==========================================
  // LOAD AVAILABILITY
  // ==========================================

  useEffect(() => {
    const loadAvailability = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/availability",
          {
            headers: {
              "Authorization": token
            }
          }
        );

        if (response.status === 404) {
          console.log("No availability saved yet");
          return;
        }

        const data = await response.json();

        const savedAvailability = data.availability;

        // Load weekly schedule
        savedAvailability.weeklySchedule.forEach((item) => {
          setSchedule((previousSchedule) => ({
            ...previousSchedule,

            [item.day]: {
              enabled: true,
              startTime: item.startTime,
              endTime: item.endTime
            }
          }));
        });

        // Load session settings
        setSessionDuration(savedAvailability.sessionDuration);
        setBufferTime(savedAvailability.bufferTime);

        // Load one-time overrides
        setOneTimeOverrides(
          savedAvailability.oneTimeOverrides || []
        );
        setBlockedSlots(savedAvailability.blockedSlots || []);

      } catch (error) {
        console.error("Load availability error:", error);
      }
    };

    loadAvailability();
  }, []);

  const previousMonth = () => {
  if (calendarMonth === 0) {
    setCalendarMonth(11);
    setCalendarYear(calendarYear - 1);
  } else {
    setCalendarMonth(calendarMonth - 1);
  }
};

const nextMonth = () => {
  if (calendarMonth === 11) {
    setCalendarMonth(0);
    setCalendarYear(calendarYear + 1);
  } else {
    setCalendarMonth(calendarMonth + 1);
  }
};

  return (
    <section className="calendarSchedule">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="calendarHeader">

        <div>

          <p className="dashboardGreeting">
            Schedule
          </p>

          <h1>
            Calendar
          </h1>

          <p className="calendarSubtitle">
            Manage your upcoming therapy sessions.
          </p>

        </div>

        <button className="addSessionButton">

          <Plus />

          New Session

        </button>

      </div>


      {/* ==========================================
          CALENDAR
      ========================================== */}

      <div className="calendarPanel">

        <div className="calendarPanelHeader">

          <button className="calendarArrow" onClick={previousMonth}>
            <ChevronLeft />
          </button>

          <div className="calendarMonth">

            <CalendarDays />

            
              <h2>
  {new Date(
    calendarYear,
    calendarMonth
  ).toLocaleString("en-US", {
    month: "long",
    year: "numeric"
  })}
</h2>
            

          </div>

          <button className="calendarArrow" onClick={nextMonth}>
            <ChevronRight />
          </button>

        </div>


        {/* DAYS */}

        <div className="calendarDays">

          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>

        </div>


        {/* DATE ROW */}

 <div className="calendarDates">

  {calendarDates.map((item) => (
    <button
      key={item.date}
      className={
        selectedDate === item.date
          ? "selectedDate"
          : ""
      }
      onClick={() => {
        setSelectedDate(item.date);
        loadSlots(item.date);
      }}
    >
      {item.day}
    </button>
  ))}

</div>

        <div className="availableSlots">
  <h3>Available Slots</h3>

  {availableSlots.length === 0 ? (
    <p>No available slots</p>
  ) : (
    availableSlots.map((slot, index) => (
      <button key={index}>
        {slot.startTime} - {slot.endTime}
      </button>
    ))
  )}
</div>

            
      </div>
      


      {/* ==========================================
          WEEKLY AVAILABILITY
      ========================================== */}

      <div className="availabilityPanel">

        <div className="availabilityHeader">

          <div>

            <h2>
              Weekly Availability
            </h2>

            <p>
              Set when clients can book your sessions.
            </p>

          </div>

        </div>


        {/* DAYS */}

        {days.map((day) => (

          <div
            className="availabilityRow"
            key={day}
          >

            <label>

              <input
                type="checkbox"

                checked={schedule[day].enabled}

                onChange={(e) =>
                  setSchedule({
                    ...schedule,

                    [day]: {
                      ...schedule[day],
                      enabled: e.target.checked
                    }
                  })
                }
              />

              {day.charAt(0).toUpperCase() + day.slice(1)}

            </label>


            {/* START TIME */}

            <input
              type="time"

              value={schedule[day].startTime}

              disabled={!schedule[day].enabled}

              onChange={(e) =>
                setSchedule({
                  ...schedule,

                  [day]: {
                    ...schedule[day],
                    startTime: e.target.value
                  }
                })
              }
            />


            <span>
              to
            </span>


            {/* END TIME */}

            <input
              type="time"

              value={schedule[day].endTime}

              disabled={!schedule[day].enabled}

              onChange={(e) =>
                setSchedule({
                  ...schedule,

                  [day]: {
                    ...schedule[day],
                    endTime: e.target.value
                  }
                })
              }
            />

          </div>

        ))}


        {/* ==========================================
            SESSION SETTINGS
        ========================================== */}

        <div className="availabilitySettings">

          <label>

            Session Duration

            <select
              value={sessionDuration}

              onChange={(e) =>
                setSessionDuration(Number(e.target.value))
              }
            >

              <option value={30}>
                30 minutes
              </option>

              <option value={45}>
                45 minutes
              </option>

              <option value={60}>
                60 minutes
              </option>

              <option value={90}>
                90 minutes
              </option>

            </select>

          </label>


          <label>

            Buffer Time

            <select
              value={bufferTime}

              onChange={(e) =>
                setBufferTime(Number(e.target.value))
              }
            >

              <option value={0}>
                No buffer
              </option>

              <option value={5}>
                5 minutes
              </option>

              <option value={10}>
                10 minutes
              </option>

              <option value={15}>
                15 minutes
              </option>

            </select>

          </label>

        </div>


        {/* ==========================================
            ONE-TIME OVERRIDE
        ========================================== */}

        <div className="oneTimeOverride">

          <h3>
            One-Time Override
          </h3>


          <div className="overrideForm">

            {/* DATE */}

            <label>

              Date

              <input
                type="date"

                value={overrideDate}

                onChange={(e) =>
                  setOverrideDate(e.target.value)
                }
              />

            </label>


            {/* AVAILABLE */}

            <label>

              <input
                type="checkbox"

                checked={overrideAvailable}

                onChange={(e) =>
                  setOverrideAvailable(e.target.checked)
                }
              />

              Available

            </label>


            {/* START / END TIME */}

            {overrideAvailable && (
              <>

                <label>

                  Start Time

                  <input
                    type="time"

                    value={overrideStartTime}

                    onChange={(e) =>
                      setOverrideStartTime(e.target.value)
                    }
                  />

                </label>


                <label>

                  End Time

                  <input
                    type="time"

                    value={overrideEndTime}

                    onChange={(e) =>
                      setOverrideEndTime(e.target.value)
                    }
                  />

                </label>

              </>
            )}


            {/* ADD BUTTON */}

            <button
              type="button"
              onClick={addOverride}
            >
              Add Override
            </button>

          </div>


          {/* ==========================================
              ADDED OVERRIDES
          ========================================== */}

          {oneTimeOverrides.length > 0 && (

            <div className="overrideList">

              <h4>
                Added Overrides
              </h4>


              {oneTimeOverrides.map((override, index) => (

                <div
                  className="overrideItem"
                  key={index}
                >

                  <strong>
                    {override.date}
                  </strong>


                  {override.isAvailable ? (

                    <span>
                      Available: {override.startTime} - {override.endTime}
                    </span>

                  ) : (

                    <span>
                      Unavailable
                    </span>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>

        {/* ==========================================
            BLOCKED SKOTS
        ========================================== */}

        <div className="blockedSlotsSection">
  <h3>Blocked Slots</h3>

  <div>
    <label>Date</label>
    <input
      type="date"
      value={blockedDate}
      onChange={(e) => setBlockedDate(e.target.value)}
    />
  </div>

  <div>
    <label>Start Time</label>
    <input
      type="time"
      value={blockedStartTime}
      onChange={(e) => setBlockedStartTime(e.target.value)}
    />
  </div>

  <div>
    <label>End Time</label>
    <input
      type="time"
      value={blockedEndTime}
      onChange={(e) => setBlockedEndTime(e.target.value)}
    />
  </div>

  <div>
    <label>Reason</label>
    <input
      type="text"
      placeholder="Personal appointment"
      value={blockedReason}
      onChange={(e) => setBlockedReason(e.target.value)}
    />
  </div>

  <button type="button" onClick={addBlockedSlot}>
    Add Blocked Slot
  </button>

 {blockedSlots.map((slot, index) => (
  <div key={index}>
    <span>
      {slot.date} — {slot.startTime} to {slot.endTime}
    </span>

    {slot.reason && (
      <span> — {slot.reason}</span>
    )}

    <button
      type="button"
      onClick={() => {
        setBlockedSlots(
          blockedSlots.filter((_, i) => i !== index)
        );
      }}
    >
      Remove
    </button>
  </div>
))}
</div>

        {/* ==========================================
            SAVE BUTTON
        ========================================== */}

        <button
          className="saveAvailabilityButton"
          onClick={saveAvailability}
        >
          Save Availability
        </button>

      </div>


      {/* ==========================================
          TODAY'S SESSIONS
      ========================================== */}

      <div className="sessionsPanel">

        <div className="sessionsPanelHeader">

          <div>

            <h2>
              Today's Sessions
            </h2>

            <p>
              3 sessions scheduled for today
            </p>

          </div>

        </div>


        {sessions.map((session, index) => (

          <div
            className="calendarSession"
            key={index}
          >

            <div className="calendarSessionTime">

              <Clock />

              <strong>
                {session.time}
              </strong>

            </div>


            <div className="calendarSessionInfo">

              <h3>
                {session.client}
              </h3>

              <p>
                {session.type}
              </p>

            </div>


            <span
              className={
                session.status === "Pending"
                  ? "sessionPending"
                  : "sessionConfirmed"
              }
            >
              {session.status}
            </span>

          </div>

        ))}

      </div>

    </section>
  );
}

export default CalendarSchedule;