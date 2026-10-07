import { useEffect, useState } from "react";
import "../css/publicProfile.css";

function PublicProfile() {

  const [therapist, setTherapist] = useState(null);
  const [message, setMessage] = useState("");

  const slug = window.location.pathname.substring(1);

  useEffect(() => {

    if (!slug) return;

    async function getProfile() {

      try {

        const response = await fetch(
          `http://localhost:5000/${slug}`
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage("Therapist not found");
          return;
        }

        setTherapist(data);

      } catch (error) {

        console.log(error);
        setMessage("Error loading profile");

      }

    }

    getProfile();

  }, [slug]);


  if (message) {
    return <h2>{message}</h2>;
  }


  if (!therapist) {
    return <p>Loading...</p>;
  }


  return (

    <div className="publicProfile">

      {/* HERO */}

      <section className="profileHero">

        <p>MindBridge Therapist</p>

        <h1>
          {therapist.name}
        </h1>

        <p>
          Professional mental health support
        </p>

      </section>


      {/* ABOUT */}

      <section className="profileAbout">

        <h2>About</h2>

        <p>
          {therapist.bio || "No bio available."}
        </p>

      </section>


      {/* SPECIALIZATIONS */}

      <section className="profileSpecializations">

        <h2>Specializations</h2>

        {therapist.specializations &&
        therapist.specializations.length > 0 ? (

          <div className="specializationList">

            {therapist.specializations.map(
              (item, index) => (

                <div
                  className="specializationCard"
                  key={index}
                >
                  {item}
                </div>

              )
            )}

          </div>

        ) : (

          <p>
            No specializations added yet.
          </p>

        )}

      </section>


      {/* SERVICES */}

      <section className="profileServices">

        <h2>Services</h2>

        <div className="serviceCards">

          <div className="serviceCard">
            <h3>Individual Therapy</h3>
            <p>
              Personalized one-to-one therapeutic support.
            </p>
          </div>

          <div className="serviceCard">
            <h3>Online Consultation</h3>
            <p>
              Convenient sessions from wherever you are.
            </p>
          </div>

          <div className="serviceCard">
            <h3>Mental Wellness Support</h3>
            <p>
              Support focused on emotional wellbeing and growth.
            </p>
          </div>

        </div>

      </section>

    </div>

  );
}

export default PublicProfile;