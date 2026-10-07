import {
  CalendarDays,
  Clock,
  Video,
  UserRound,
  MoreVertical,
  Plus
} from "lucide-react";

import "../css/clientSessions.css";

function ClientSessions() {
  const upcomingSessions = [
    {
      date: "Sep 4",
      time: "10:00 AM",
      duration: "50 minutes",
      type: "Individual Therapy",
      therapist: "Dr. Sarah Sharma",
      specialization: "Clinical Psychologist",
      mode: "Video Session"
    },
    {
      date: "Sep 8",
      time: "4:00 PM",
      duration: "50 minutes",
      type: "Individual Therapy",
      therapist: "Dr. Sarah Sharma",
      specialization: "Clinical Psychologist",
      mode: "Video Session"
    },
    {
      date: "Sep 12",
      time: "11:30 AM",
      duration: "50 minutes",
      type: "Follow-up Session",
      therapist: "Dr. Sarah Sharma",
      specialization: "Clinical Psychologist",
      mode: "Video Session"
    }
  ];

  const pastSessions = [
    {
      date: "Aug 28",
      time: "10:00 AM",
      type: "Individual Therapy",
      therapist: "Dr. Sarah Sharma"
    },
    {
      date: "Aug 21",
      time: "10:00 AM",
      type: "Individual Therapy",
      therapist: "Dr. Sarah Sharma"
    },
    {
      date: "Aug 14",
      time: "11:00 AM",
      type: "Follow-up Session",
      therapist: "Dr. Sarah Sharma"
    }
  ];

  return (
    <section className="clientSessions">

      {/* Header */}
      <div className="clientSessionsHeader">
        <div>
          <h1>My Sessions</h1>
          <p>Manage your upcoming and past therapy sessions.</p>
        </div>

        <button className="bookSessionButton">
          <Plus size={18} />
          Book a Session
        </button>
      </div>


      {/* Stats */}
      <div className="sessionStats">

        <div className="sessionStatCard">
          <div className="sessionStatIcon">
            <CalendarDays size={20} />
          </div>

          <div>
            <span>Upcoming</span>
            <strong>3</strong>
          </div>
        </div>


        <div className="sessionStatCard">
          <div className="sessionStatIcon">
            <Clock size={20} />
          </div>

          <div>
            <span>Completed</span>
            <strong>12</strong>
          </div>
        </div>


        <div className="sessionStatCard">
          <div className="sessionStatIcon">
            <Video size={20} />
          </div>

          <div>
            <span>Therapy Hours</span>
            <strong>10.5h</strong>
          </div>
        </div>

      </div>


      {/* Upcoming Sessions */}
      <div className="sessionsSection">

        <div className="sessionsSectionHeader">
          <div>
            <h2>Upcoming Sessions</h2>
            <p>Your scheduled therapy appointments</p>
          </div>
        </div>


        <div className="upcomingSessionsList">

          {upcomingSessions.map((session, index) => (

            <div className="sessionCard" key={index}>

              {/* Date */}
              <div className="sessionDate">
                <strong>{session.date.split(" ")[1]}</strong>
                <span>{session.date.split(" ")[0]}</span>
              </div>


              {/* Information */}
              <div className="sessionMainInfo">

                <div className="sessionTitleRow">
                  <h3>{session.type}</h3>

                  <span className="sessionUpcomingBadge">
                    Upcoming
                  </span>
                </div>


                <div className="sessionTherapist">
                  <UserRound size={17} />

                  <span>{session.therapist}</span>

                  <small>
                    {session.specialization}
                  </small>
                </div>


                <div className="sessionDetails">

                  <span>
                    <Clock size={16} />
                    {session.time}
                  </span>

                  <span>
                    <Clock size={16} />
                    {session.duration}
                  </span>

                  <span>
                    <Video size={16} />
                    {session.mode}
                  </span>

                </div>

              </div>


              {/* Actions */}
              <div className="sessionActions">

                <button className="joinSessionButton">
                  <Video size={17} />
                  Join Session
                </button>

                <button className="sessionMoreButton">
                  <MoreVertical size={19} />
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* Past Sessions */}
      <div className="sessionsSection pastSessionsSection">

        <div className="sessionsSectionHeader">

          <div>
            <h2>Past Sessions</h2>
            <p>Your completed therapy sessions</p>
          </div>

          <button className="viewAllButton">
            View All
          </button>

        </div>


        <div className="pastSessionsTable">

          <div className="pastTableHeader">
            <span>Date</span>
            <span>Session</span>
            <span>Therapist</span>
            <span>Status</span>
            <span></span>
          </div>


          {pastSessions.map((session, index) => (

            <div className="pastTableRow" key={index}>

              <div>
                <strong>{session.date}</strong>
                <small>{session.time}</small>
              </div>

              <span>{session.type}</span>

              <div className="pastTherapist">
                <UserRound size={16} />
                {session.therapist}
              </div>

              <span className="completedBadge">
                Completed
              </span>

              <button className="sessionMoreButton">
                <MoreVertical size={18} />
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ClientSessions;