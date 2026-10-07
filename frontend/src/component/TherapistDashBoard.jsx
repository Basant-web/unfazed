import {
  Users,
  CalendarDays,
  FileText,
  IndianRupee,
  Clock,
  ArrowRight
} from "lucide-react";

import { useState } from "react";
import ClientDetail from "./ClientDetail";

import DashboardSidebar from "./DashboardSidebar";
import CalendarSchedule from "./CalendarSchedule";
import Clients from "./Clients";

import "../css/therapistDashboard.css";
import TherapistPayments from "./TherapistPayments";


function TherapistDashboard({
  profile,
  onLogout
}) {

  // ==========================================
  // ACTIVE DASHBOARD PAGE
  // ==========================================

  const [activePage, setActivePage] =
    useState("Overview");

    const [selectedClient, setSelectedClient] = useState(null);

  // ==========================================
  // OVERVIEW
  // ==========================================

  function renderOverview() {

    return (

      <>

        {/* =================================
            HEADER
        ================================= */}

        <div className="dashboardHeader">

          <div>

            <p className="dashboardGreeting">
              Good morning
            </p>

            <h1>
              Welcome back,{" "}
              {profile?.name || "Therapist"}
            </h1>

            <p className="dashboardSubtitle">
              Here's what's happening with your practice today.
            </p>

          </div>


          <div className="dashboardDate">

            <CalendarDays />

            <span>
              Today
            </span>

          </div>

        </div>


        {/* =================================
            SUMMARY CARDS
        ================================= */}

        <section className="summaryGrid">


          {/* CLIENTS */}

          <div className="summaryCard">

            <div className="summaryCardTop">

              <div className="summaryIcon">

                <Users />

              </div>

              <span className="summaryChange">
                +2
              </span>

            </div>

            <p>
              Total Clients
            </p>

            <h2>
              18
            </h2>

          </div>


          {/* SESSIONS */}

          <div className="summaryCard">

            <div className="summaryCardTop">

              <div className="summaryIcon">

                <CalendarDays />

              </div>

              <span className="summaryChange">
                Today
              </span>

            </div>

            <p>
              Today's Sessions
            </p>

            <h2>
              3
            </h2>

          </div>


          {/* NOTES */}

          <div className="summaryCard">

            <div className="summaryCardTop">

              <div className="summaryIcon">

                <FileText />

              </div>

              <span className="summaryWarning">
                Action needed
              </span>

            </div>

            <p>
              Pending Notes
            </p>

            <h2>
              4
            </h2>

          </div>


          {/* REVENUE */}

          <div className="summaryCard">

            <div className="summaryCardTop">

              <div className="summaryIcon">

                <IndianRupee />

              </div>

              <span className="summaryChange">
                +12%
              </span>

            </div>

            <p>
              Monthly Revenue
            </p>

            <h2>
              ₹48,500
            </h2>

          </div>


        </section>


        {/* =================================
            LOWER SECTION
        ================================= */}

        <section className="dashboardLower">


          {/* UPCOMING SESSIONS */}

          <div className="dashboardPanel">

            <div className="panelHeader">

              <div>

                <h2>
                  Upcoming Sessions
                </h2>

                <p>
                  Your schedule for today
                </p>

              </div>


              <button
                onClick={() =>
                  setActivePage(
                    "Calendar / Schedule"
                  )
                }
              >

                View Calendar

                <ArrowRight />

              </button>

            </div>


            {/* SESSION 1 */}

            <div className="sessionItem">

              <div className="sessionTime">

                <Clock />

                <span>
                  10:00 AM
                </span>

              </div>


              <div className="sessionInfo">

                <h3>
                  Alex Rivera
                </h3>

                <p>
                  Individual Therapy
                </p>

              </div>


              <span className="sessionStatus">
                Upcoming
              </span>

            </div>


            {/* SESSION 2 */}

            <div className="sessionItem">

              <div className="sessionTime">

                <Clock />

                <span>
                  12:30 PM
                </span>

              </div>


              <div className="sessionInfo">

                <h3>
                  Elena Rostova
                </h3>

                <p>
                  CBT Session
                </p>

              </div>


              <span className="sessionStatus">
                Upcoming
              </span>

            </div>


            {/* SESSION 3 */}

            <div className="sessionItem">

              <div className="sessionTime">

                <Clock />

                <span>
                  04:00 PM
                </span>

              </div>


              <div className="sessionInfo">

                <h3>
                  Michael Chen
                </h3>

                <p>
                  Follow-up Session
                </p>

              </div>


              <span className="sessionStatus">
                Upcoming
              </span>

            </div>


          </div>


          {/* RECENT ACTIVITY */}

          <div className="dashboardPanel">

            <div className="panelHeader">

              <div>

                <h2>
                  Recent Activity
                </h2>

                <p>
                  Latest updates
                </p>

              </div>

            </div>


            <div className="activityItem">

              <div className="activityDot"></div>

              <div>

                <h3>
                  New client registered
                </h3>

                <p>
                  Alex Rivera joined your practice
                </p>

                <span>
                  20 minutes ago
                </span>

              </div>

            </div>


            <div className="activityItem">

              <div className="activityDot"></div>

              <div>

                <h3>
                  Session completed
                </h3>

                <p>
                  Elena's therapy session completed
                </p>

                <span>
                  2 hours ago
                </span>

              </div>

            </div>


            <div className="activityItem">

              <div className="activityDot"></div>

              <div>

                <h3>
                  Payment received
                </h3>

                <p>
                  ₹2,500 payment received
                </p>

                <span>
                  Yesterday
                </span>

              </div>

            </div>


          </div>


        </section>

      </>

    );

  }

  //===========================================
  //profile
  //===========================================
  function renderPage() {
  if (activePage === "Calendar / Schedule") {
    return <CalendarSchedule />;
  }

  if (activePage === "Clients") {
    return (
      <Clients
        onClientSelect={(client) => {
          setSelectedClient(client);
          setActivePage("Client Detail");
        }}
      />
    );
  }

  if (activePage === "Client Detail") {
    return (
      <ClientDetail
        client={selectedClient}
        onBack={() => setActivePage("Clients")}
      />
    );
  }

  if (activePage === "Payments & Billing") {
    return <TherapistPayments />;
  }

  if (activePage === "Payments & Billing") {
  return <TherapistPayments />;
}

  return renderOverview();
}

  // ==========================================
  // PAGE RENDERING
  // ==========================================



  // ==========================================
  // DASHBOARD
  // ==========================================

  return (

    <div className="therapistDashboard">


      {/* =====================================
          SIDEBAR
      ===================================== */}

      <DashboardSidebar

        profile={profile}

        onLogout={onLogout}

        activePage={activePage}

        onPageChange={setActivePage}

      />


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="dashboardContent">

        {renderPage()}

      </main>


    </div>

  );

}


export default TherapistDashboard;