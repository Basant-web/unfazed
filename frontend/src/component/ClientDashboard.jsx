import {
  CalendarDays,
  Clock,
  Video,
  ArrowRight,
  MessageCircle,
  UserRound,
  FileText
} from "lucide-react";

import { useState } from "react";
import ClientSessions from "./ClientSessions";

import ClientDashboardSidebar from "./ClientDashboardSidebar";
import FindTherapist from "./FindTherapist";

import ClientMessages from "./ClientMessages";
import ClientPayments from "./ClientPayments";
import ClientPackages from "./ClientPackages";
import ClientNotifications from "./ClientNotifications";
import ClientProfile from "./ClientProfile";
import ClientIntake from "./ClientIntake";


import "../css/clientDashboard.css";


function ClientDashboard({
  profile,
  onLogout
}) {

  const [activePage, setActivePage] =
    useState("Overview");


  // =================================
  // OVERVIEW
  // =================================

  function renderOverview() {

    return (

      <section className="clientDashboardOverview">


        {/* =================================
            HEADER
        ================================= */}

        <div className="clientDashboardHeader">

          <div>

            <p className="clientDashboardGreeting">
              Good morning
            </p>

            <h1>
              Welcome back, {profile?.name || "there"} 👋
            </h1>

            <p className="clientDashboardSubtitle">
              Here's what's happening with your therapy journey.
            </p>

          </div>


          <div className="clientDashboardDate">

            <CalendarDays size={18} />

            <span>
              September 2, 2026
            </span>

          </div>

        </div>


        {/* =================================
            NEXT SESSION
        ================================= */}

        <div className="nextSessionCard">


          <div className="nextSessionInfo">

            <span className="nextSessionLabel">
              NEXT SESSION
            </span>

            <h2>
              Therapy Session
            </h2>

            <div className="nextSessionTherapist">

              <div className="therapistSmallAvatar">
                DS
              </div>

              <div>

                <strong>
                  Dr. Sarah Sharma
                </strong>

                <span>
                  Clinical Psychologist
                </span>

              </div>

            </div>

          </div>


          <div className="nextSessionTime">

            <div className="sessionDate">

              <CalendarDays size={17} />

              <span>
                Today, Sep 2
              </span>

            </div>


            <div className="sessionTime">

              <Clock size={17} />

              <strong>
                10:00 AM
              </strong>

            </div>


            <span className="sessionDuration">
              50 minutes
            </span>

          </div>


          <button className="joinSessionButton">

            <Video size={18} />

            Join Session

          </button>

        </div>


        {/* =================================
            SUMMARY CARDS
        ================================= */}

        <div className="clientOverviewStats">


          <div className="clientOverviewCard">

            <div className="clientOverviewCardIcon">
              <CalendarDays size={21} />
            </div>

            <div>

              <span>
                Upcoming Sessions
              </span>

              <strong>
                3
              </strong>

            </div>

          </div>


          <div className="clientOverviewCard">

            <div className="clientOverviewCardIcon">
              <FileText size={21} />
            </div>

            <div>

              <span>
                Completed Sessions
              </span>

              <strong>
                12
              </strong>

            </div>

          </div>


          <div className="clientOverviewCard">

            <div className="clientOverviewCardIcon">
              <Clock size={21} />
            </div>

            <div>

              <span>
                Therapy Hours
              </span>

              <strong>
                10.5h
              </strong>

            </div>

          </div>


          <div className="clientOverviewCard">

            <div className="clientOverviewCardIcon">
              <MessageCircle size={21} />
            </div>

            <div>

              <span>
                Unread Messages
              </span>

              <strong>
                2
              </strong>

            </div>

          </div>


        </div>


        {/* =================================
            LOWER SECTION
        ================================= */}

        <div className="clientDashboardLower">


          {/* =================================
              UPCOMING SESSIONS
          ================================= */}

          <div className="clientDashboardPanel">

            <div className="clientPanelHeader">

              <div>

                <h2>
                  Upcoming Sessions
                </h2>

                <p>
                  Your scheduled therapy sessions
                </p>

              </div>


              <button
                onClick={() =>
                  setActivePage("My Sessions")
                }
              >

                View All

                <ArrowRight size={16} />

              </button>

            </div>


            <div className="upcomingClientSessions">


              <div className="clientSessionItem">

                <div className="clientSessionDate">

                  <strong>
                    04
                  </strong>

                  <span>
                    SEP
                  </span>

                </div>


                <div className="clientSessionDetails">

                  <strong>
                    Individual Therapy
                  </strong>

                  <span>
                    Dr. Sarah Sharma
                  </span>

                </div>


                <div className="clientSessionTime">

                  <Clock size={15} />

                  10:00 AM

                </div>

              </div>


              <div className="clientSessionItem">

                <div className="clientSessionDate">

                  <strong>
                    08
                  </strong>

                  <span>
                    SEP
                  </span>

                </div>


                <div className="clientSessionDetails">

                  <strong>
                    Individual Therapy
                  </strong>

                  <span>
                    Dr. Sarah Sharma
                  </span>

                </div>


                <div className="clientSessionTime">

                  <Clock size={15} />

                  04:00 PM

                </div>

              </div>


              <div className="clientSessionItem">

                <div className="clientSessionDate">

                  <strong>
                    12
                  </strong>

                  <span>
                    SEP
                  </span>

                </div>


                <div className="clientSessionDetails">

                  <strong>
                    Follow-up Session
                  </strong>

                  <span>
                    Dr. Sarah Sharma
                  </span>

                </div>


                <div className="clientSessionTime">

                  <Clock size={15} />

                  11:30 AM

                </div>

              </div>


            </div>

          </div>


          {/* =================================
              THERAPIST
          ================================= */}

          <div className="clientDashboardPanel therapistDashboardCard">

            <div className="clientPanelHeader">

              <div>

                <h2>
                  My Therapist
                </h2>

                <p>
                  Your current therapist
                </p>

              </div>

            </div>


            <div className="myTherapist">

  <div className="myTherapistAvatar">
    {profile?.therapist?.name
      ? profile.therapist.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "NT"}
  </div>

  <div className="myTherapistInfo">

    <h3>
      {profile?.therapist?.name || "No therapist assigned"}
    </h3>

    <span>
      {profile?.therapist?.specializations?.length
        ? profile.therapist.specializations.join(", ")
        : "Specialization not specified"}
    </span>

    {profile?.therapist?.languages?.length > 0 && (
      <span>
        Languages: {profile.therapist.languages.join(", ")}
      </span>
    )}

  </div>

</div>


            <div className="therapistActions">

              <button >

                <MessageCircle size={17} />

                Message

              </button>


              <button onClick={() => setActivePage("Find Therapist")}>

                <UserRound size={17} />

                View Profile

              </button>

            </div>

          </div>


        </div>


        {/* =================================
            QUICK ACTIONS
        ================================= */}

        <div className="clientQuickActions">

          <button
            onClick={() =>
              setActivePage("Find Therapist")
            }
          >

            <UserRound />

            Find a Therapist

          </button>


          <button
            onClick={() =>
              setActivePage("My Sessions")
            }
          >

            <CalendarDays />

            Book a Session

          </button>


          <button
            onClick={() =>
              setActivePage("Messages")
            }
          >

            <MessageCircle />

            Message Therapist

          </button>

        </div>


      </section>

    );

  }


  // =================================
  // PAGE RENDER
  // =================================

  function renderPage() {

  if (activePage === "Overview") {
    return renderOverview();
  }

  if (activePage === "My Sessions") {
    return <ClientSessions />;
  }

  if (activePage === "Find Therapist") {
    return <FindTherapist />;
  }

  if (activePage === "Messages") {
  return <ClientMessages />;
}

    if (activePage === "Payments") {
  return <ClientPayments />;
}

if (activePage === "My Packages") {
  return <ClientPackages />;
}

if (activePage === "Intake Form") {
  return <ClientIntake />;
}

if (activePage === "Payments") {
  return <ClientPayments />;
}

if (activePage === "Notifications") {
  return <ClientNotifications />;
}

if (activePage === "Profile / Settings") {
  return <ClientProfile profile={profile} />;
}

  return (
    <div>
      <h1>{activePage}</h1>
      <p>This section will be built next.</p>
    </div>
  );
}


  return (

    <div className="clientDashboard">


      <ClientDashboardSidebar
        profile={profile}
        onLogout={onLogout}
        activePage={activePage}
        onPageChange={setActivePage}
      />


      <main className="clientDashboardContent">

        {renderPage()}

      </main>


    </div>

  );

}


export default ClientDashboard;