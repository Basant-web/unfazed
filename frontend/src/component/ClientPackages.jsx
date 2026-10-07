import {
  Package,
  CheckCircle,
  Clock,
  CalendarDays,
  Video,
  ArrowRight,
  Star
} from "lucide-react";

import { useEffect, useState } from "react";

import "../css/clientPackages.css";

function ClientPackages() {
  const [packages, setPackages] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function getPackages() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/client-packages",
        {
          headers: {
            Authorization: token
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPackages(data);
      } else {
        console.log(data.message);
      }

    } catch (error) {
      console.log("Get client packages error:", error);
    } finally {
      setLoading(false);
    }
  }

  getPackages();
}, []);

  return (
    <section className="clientPackagesSection">

      {/* Header */}
      <div className="clientPackagesHeader">
        <div>
          <p className="clientPackagesEyebrow">YOUR PLANS</p>
          <h1>My Packages</h1>
          <p>
            Manage your therapy packages and track your remaining sessions.
          </p>
        </div>

        <button className="clientPackagesBrowseButton">
          <Package size={18} />
          Browse Packages
        </button>
      </div>

      {/* Summary */}
      <div className="clientPackagesStats">

        <div className="clientPackageStatCard">
          <div className="clientPackageStatIcon">
            <Package size={21} />
          </div>

          <div>
            <span>Active Packages</span>
            <strong>2</strong>
          </div>
        </div>

        <div className="clientPackageStatCard">
          <div className="clientPackageStatIcon">
            <CalendarDays size={21} />
          </div>

          <div>
            <span>Sessions Remaining</span>
            <strong>4</strong>
          </div>
        </div>

        <div className="clientPackageStatCard">
          <div className="clientPackageStatIcon">
            <CheckCircle size={21} />
          </div>

          <div>
            <span>Sessions Completed</span>
            <strong>8</strong>
          </div>
        </div>

        <div className="clientPackageStatCard">
          <div className="clientPackageStatIcon">
            <Star size={21} />
          </div>

          <div>
            <span>Total Packages</span>
            <strong>3</strong>
          </div>
        </div>

      </div>

      {/* Package List */}
      <div className="clientPackagesContent">

        <div className="clientPackagesListHeader">
          <div>
            <h2>Your Packages</h2>
            <p>View your current and previous therapy packages.</p>
          </div>
        </div>

        <div className="clientPackagesGrid">

          {packages.map((pkg) => {
            const remaining = pkg.remainingSessions;

const used =
  pkg.totalSessions - pkg.remainingSessions;

const progress =
  (used / pkg.totalSessions) * 100;

            const completed = pkg.status === "Completed";

            return (
              <div
                className={`clientPackageCard ${
                  completed ? "clientPackageCompleted" : ""
                }`}
                key={pkg.id}
              >

                {/* Card Top */}
                <div className="clientPackageCardTop">

                  <div className="clientPackageIcon">
                    <Package size={23} />
                  </div>

                  <span
                    className={`clientPackageStatus ${
                      completed
                        ? "clientPackageStatusCompleted"
                        : "clientPackageStatusActive"
                    }`}
                  >
                    {completed ? (
                      <>
                        <CheckCircle size={14} />
                        Completed
                      </>
                    ) : (
                      <>
                        <CheckCircle size={14} />
                        Active
                      </>
                    )}
                  </span>

                </div>

                {/* Package Info */}
                <div className="clientPackageInfo">
                  <h3>{pkg.name}</h3>

                  <p className="clientPackageTherapist">
                    <Video size={15} />
                    {pkg.therapist}
                  </p>

                  <p className="clientPackageDescription">
                    {pkg.description}
                  </p>
                </div>

                {/* Session Progress */}
                <div className="clientPackageProgress">

                  <div className="clientPackageProgressHeader">
                    <span>Sessions</span>

                    <strong>
  {used}/{pkg.totalSessions}
</strong>
                  </div>

                  <div className="clientPackageProgressBar">
                    <div
                      className="clientPackageProgressFill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <div className="clientPackageProgressBottom">
                    <span>
                      {remaining > 0
                        ? `${remaining} sessions remaining`
                        : "All sessions used"}
                    </span>
                  </div>

                </div>

                {/* Details */}
                <div className="clientPackageDetails">

                  <div>
                    <Clock size={16} />
                    <span>
                      Expires {pkg.expiry}
                    </span>
                  </div>

                  <strong>{pkg.price}</strong>

                </div>

                {/* Action */}
                {!completed ? (
                  <button className="clientPackageAction">
                    Book Session
                    <ArrowRight size={17} />
                  </button>
                ) : (
                  <button className="clientPackageAction clientPackageViewButton">
                    View Details
                    <ArrowRight size={17} />
                  </button>
                )}

              </div>
            );
          })}

        </div>

      </div>

      {/* Bottom Banner */}
      <div className="clientPackageBanner">

        <div className="clientPackageBannerIcon">
          <Package size={24} />
        </div>

        <div>
          <h3>Looking for a new package?</h3>
          <p>
            Choose a package that fits your therapy goals and schedule.
          </p>
        </div>

        <button>
          Explore Packages
          <ArrowRight size={17} />
        </button>

      </div>

    </section>
  );
}

export default ClientPackages;