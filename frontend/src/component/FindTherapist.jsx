import { useEffect, useState } from "react";
import {
  Search,
  Star,
  Languages,
  UserRound
} from "lucide-react";

import "../css/findTherapist.css";
import ClientCalendar from "./ClientCalendar";

function FindTherapist() {

  const [therapists, setTherapists] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    fetchTherapists();
  }, []);

  async function fetchTherapists() {
    try {
      const response = await fetch(
        "http://localhost:5000/therapists"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to get therapists"
        );
      }

      setTherapists(data);

    } catch (error) {
      console.error("Therapist fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredTherapists = therapists.filter((therapist) => {

    const searchText = search.toLowerCase();

    const matchesSearch =
      therapist.name
        ?.toLowerCase()
        .includes(searchText) ||
      therapist.specializations?.some((item) =>
        item.toLowerCase().includes(searchText)
      );

    const matchesSpecialization =
      !specialization ||
      therapist.specializations?.includes(
        specialization
      );

    const matchesLanguage =
      !language ||
      therapist.languages?.includes(language);

    return (
      matchesSearch &&
      matchesSpecialization &&
      matchesLanguage
    );
  });

  async function assignTherapist(therapistId) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    const response = await fetch(
      `http://localhost:5000/clients/assign-therapist/${therapistId}`,
      {
        method: "PUT",
        headers: {
          Authorization: token
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to assign therapist");
      return;
    }

    alert("Therapist assigned successfully!");

  } catch (error) {
    console.error("Assign therapist error:", error);
    alert("Server error. Please try again.");
  }
}

  return (
    <section className="findTherapist">

      {/* HEADER */}
      <div className="findTherapistHeader">
        <div>
          <h1>Find a Therapist</h1>

          <p>
            Find the right therapist for your needs and preferences.
          </p>
        </div>
      </div>


      {/* SEARCH AREA */}
      <div className="therapistSearchBox">

        <div className="therapistSearchInput">

          <Search size={19} />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by name or specialization..."
          />

        </div>


        <select
          className="therapistFilter"
          value={specialization}
          onChange={(event) =>
            setSpecialization(event.target.value)
          }
        >

          <option value="">
            All Specializations
          </option>

          <option value="Clinical Psychologist">
            Clinical Psychologist
          </option>

          <option value="Counselling Psychologist">
            Counselling Psychologist
          </option>

          <option value="Psychiatrist">
            Psychiatrist
          </option>

        </select>


        <select
          className="therapistFilter"
          value={language}
          onChange={(event) =>
            setLanguage(event.target.value)
          }
        >

          <option value="">
            All Languages
          </option>

          <option value="English">
            English
          </option>

          <option value="Hindi">
            Hindi
          </option>

          <option value="Gujarati">
            Gujarati
          </option>

        </select>


        <button
          className="searchTherapistButton"
          onClick={fetchTherapists}
        >
          Search
        </button>

      </div>


      {/* RESULTS HEADER */}
      <div className="therapistResultsHeader">

        <div>

          <h2>Therapists</h2>

          <p>
            {filteredTherapists.length} therapists found
          </p>

        </div>


        <select className="sortTherapists">

          <option>
            Recommended
          </option>

          <option>
            Highest Rated
          </option>

          <option>
            Most Experienced
          </option>

        </select>

      </div>


      {/* LOADING */}
      {loading && (
        <p>Loading therapists...</p>
      )}


      {/* THERAPIST CARDS */}
      {!loading && (
        <div className="therapistGrid">

          {filteredTherapists.map((therapist) => (

            <div
              className="findTherapistCard"
              key={therapist._id}
            >

              {/* TOP */}
              <div className="therapistCardTop">

                <div className="therapistAvatar">
                  <UserRound size={30} />
                </div>


                <div className="therapistBasicInfo">

                  <h3>
                    {therapist.name}
                  </h3>


                  <p>
                    {therapist.specializations?.length
                      ? therapist.specializations.join(", ")
                      : "Therapist"}
                  </p>


                  <div className="therapistRating">

                    <Star size={14} />

                    <strong>
                      New
                    </strong>

                  </div>

                </div>

              </div>


              {/* DETAILS */}
              <div className="therapistCardDetails">

                <div>
                  <Languages size={16} />

                  <span>
                    {therapist.languages?.length
                      ? therapist.languages.join(", ")
                      : "Languages not specified"}
                  </span>

                </div>

              </div>


              {/* BIO */}
              {therapist.bio && (
                <div className="therapistAvailability">

                  <span>
                    {therapist.bio}
                  </span>

                </div>
              )}


              {/* ACTIONS */}
              <div className="therapistCardActions">

                <button
                  className="viewTherapistButton"
                >
                  View Profile
                </button>


                <button
  className="bookTherapistButton"
  onClick={async () => {
    await assignTherapist(therapist._id);
    setSelectedTherapist(therapist._id);
    setShowBooking(true);
  }}
>
  Book Session
</button>

              </div>

            </div>

          ))}

        </div>
      )}

            {/* BOOKING CALENDAR */}
      {showBooking && selectedTherapist && (
  <div className="bookingOverlay">
    <div className="bookingModal">

      <button
        className="closeBooking"
        onClick={() => setShowBooking(false)}
      >
        ×
      </button>

      <ClientCalendar
        therapistId={selectedTherapist}
      />

    </div>
  </div>
)}

      {/* NO RESULTS */}
      {!loading &&
        filteredTherapists.length === 0 && (
          <p>
            No therapists found.
          </p>
        )}

    </section>
  );
}

export default FindTherapist;