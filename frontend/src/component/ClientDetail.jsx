import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  CreditCard,
  FileText,
  ShieldCheck,
  Clock
} from "lucide-react";
import { useEffect, useState } from "react";

import "../css/clientDetail.css";

function ClientDetail({ client, onBack }) {

  const [clientData, setClientData] = useState(client);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadClient = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/clients/${client._id}`,
          {
            headers: {
              Authorization: token
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          return;
        }

        setClientData(data);

      } catch (error) {
        console.error("Client detail error:", error);
      }
    };

    if (client?._id) {
      loadClient();
    }
  }, [client]);

  useEffect(() => {
  const loadSessions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/clients/${client._id}/sessions`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setSessions(data);

    } catch (error) {
      console.error("Session history error:", error);
    }
  };

  if (client?._id) {
    loadSessions();
  }
}, [client]);

{sessions.length === 0 ? (
  <div className="clientDetailEmpty">
    No sessions yet.
  </div>
) : (
  sessions.map((session) => (
    <div className="clientDetailSession" key={session._id}>

      <div className="clientDetailSessionIcon">
        <CalendarDays />
      </div>

      <div className="clientDetailSessionInfo">
        <strong>{session.type}</strong>

        <span>
          {new Date(session.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })}
          {" · "}
          {session.startTime} - {session.endTime}
        </span>
      </div>

      <span
        className={
          session.status === "completed"
            ? "clientDetailSessionCompleted"
            : "clientDetailSessionStatus"
        }
      >
        {session.status}
      </span>

    </div>
  ))
)}

  const payments = [  
    {
      date: "02 Sep 2026",
      amount: "₹1,500",
      method: "UPI",
      status: "Paid"
    },
    {
      date: "26 Aug 2026",
      amount: "₹1,500",
      method: "UPI",
      status: "Paid"
    }
  ];

  return (
    <section className="clientDetailPage">

      {/* Header */}
      <div className="clientDetailHeader">

        <button
          className="clientDetailBackButton"
          onClick={onBack}
        >
          <ArrowLeft size={17} />
          Back to Clients
        </button>

        <div className="clientDetailTitle">
          <div className="clientDetailAvatar">
            {clientData.name
              .split(" ")
              .map(word => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div>
            <h1>{clientData.name}</h1>
            <p>Client profile and session information</p>
          </div>
        </div>

        <span
           className={
    clientData.status === "active"
      ? "clientDetailStatusActive"
      : "clientDetailStatusInactive"
  }
        >
          {clientData.status}
        </span>

      </div>

      <div className="clientDetailLayout">

        {/* Left Column */}
        <div className="clientDetailLeft">

          {/* Personal Information */}
          <div className="clientDetailCard">

            <div className="clientDetailCardHeader">
              <div>
                <h2>Personal Information</h2>
                <p>Basic information about this client.</p>
              </div>

              <UserRound size={20} />
            </div>

            <div className="clientDetailInfoList">

              <div>
                <Mail size={17} />
                <div>
                  <span>Email</span>
                  <strong>{clientData.email}</strong>
                </div>
              </div>

              <div>
                <Phone size={17} />
                <div>
                  <span>Phone</span>
                  <strong>{clientData.phone}</strong>
                </div>
              </div>

              <div>
                <CalendarDays size={17} />
                <div>
                  <span>Member since</span>
                  <strong>{new Date(clientData.createdAt).toLocaleDateString()}</strong>
                </div>
              </div>

            </div>

          </div>

          {/* Intake & Consent */}
          <div className="clientDetailCard">

            <div className="clientDetailCardHeader">
              <div>
                <h2>Intake & Consent</h2>
                <p>Client intake and consent information.</p>
              </div>

              <ShieldCheck size={20} />
            </div>

            <div className="clientDetailConsent">

              <div>
                <ShieldCheck size={18} />
                <div>
                  <strong>Digital Consent</strong>
                  <span>Consent provided on{" "}
{clientData.consent?.givenAt
  ? new Date(clientData.consent.givenAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  : "Not provided"}</span>
                </div>
              </div>

              <span className="consentStatus">
                {clientData.consent?.given ? "Completed" : "Pending"}
              </span>

            </div>

            <div className="clientDetailIntake">

              <div>
                <span>Presenting Concern</span>
                <p>
                  {clientData.intake?.presentingConcern || "Not provided"}
                </p>
              </div>

              <div>
                <span>Previous History</span>
                <p>
                  {clientData.intake?.history || "Not provided"}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Right Column */}
        <div className="clientDetailRight">

          {/* Session History */}
          <div className="clientDetailCard">

            <div className="clientDetailCardHeader">
              <div>
                <h2>Session History</h2>
                <p>Previous and completed sessions.</p>
              </div>

              <Clock size={20} />
            </div>

            <div className="clientSessionList">

              {sessions.map((session, index) => (
                <div
                  className="clientSessionItem"
                  key={index}
                >

                  <div className="clientSessionIcon">
                    <CalendarDays size={17} />
                  </div>

                  <div className="clientSessionInfo">
                    <strong>{session.type}</strong>

                    <span>
                      {session.date} · {session.time}
                    </span>
                  </div>

                  <span className="sessionCompleted">
                    {session.status}
                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* Payment History */}
          <div className="clientDetailCard">

            <div className="clientDetailCardHeader">
              <div>
                <h2>Payment History</h2>
                <p>Payments made by this client.</p>
              </div>

              <CreditCard size={20} />
            </div>

            <div className="clientPaymentList">

              {payments.map((payment, index) => (
                <div
                  className="clientPaymentItem"
                  key={index}
                >

                  <div className="clientPaymentInfo">
                    <strong>{payment.amount}</strong>

                    <span>
                      {payment.date} · {payment.method}
                    </span>
                  </div>

                  <span className="paymentPaid">
                    {payment.status}
                  </span>

                </div>
              ))}

            </div>

          </div>


          {/* Notes */}
          <div className="clientDetailCard">

            <div className="clientDetailCardHeader">
              <div>
                <h2>Notes</h2>
                <p>Private notes about this client.</p>
              </div>

              <FileText size={20} />
            </div>

            <textarea
              className="clientNotesInput"
              placeholder="Add notes about this client..."
              defaultValue="Client is responding well to the current sessions."
            />

            <button className="saveClientNotesButton">
              Save Notes
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ClientDetail;