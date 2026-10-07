import {
  ArrowRight,
  Star
} from "lucide-react";

import "../css/therapist.css";

function Therapists() {

  const therapists = [
    {
      initials: "SJ",
      name: "Dr. Sarah Jenkins",
      role: "Clinical Psychologist (PsyD)",
      description:
        "Specializes in CBT, panic disorder management, and emotional regulation tracks.",
      rating: "4.9",
      reviews: "84",
      price: "$120/hr",
      color: "teal"
    },

    {
      initials: "MC",
      name: "Dr. Marcus Chen",
      role: "Clinical Counselor (LMFT)",
      description:
        "Focuses on major depression recovery, interpersonal dynamics, and burnout.",
      rating: "4.8",
      reviews: "62",
      price: "$110/hr",
      color: "blue"
    },

    {
      initials: "AP",
      name: "Dr. Amara Patel",
      role: "Trauma Specialist (LCSW)",
      description:
        "Expert in EMDR, somatic processing, and trauma-informed psychotherapy.",
      rating: "5.0",
      reviews: "95",
      price: "$130/hr",
      color: "green"
    },

    {
      initials: "DV",
      name: "Dr. David Vance",
      role: "Mindfulness Practitioner (PhD)",
      description:
        "Integrates Acceptance & Commitment Therapy (ACT) with daily nervous system care.",
      rating: "4.9",
      reviews: "48",
      price: "$115/hr",
      color: "orange"
    }
  ];


  return (

    <section className="therapistSection">

      {/* HEADER */}

      <div className="therapistHeader">

        <div>

          <p className="therapistLabel">
            ACCREDITED NETWORK
          </p>

          <h2>
            Meet Our Featured Licensed Clinicians
          </h2>

          <p className="therapistSubtitle">
            Every therapist on MindBridge is board-certified,
            background-checked, and vetted.
          </p>

        </div>


        <button className="directoryButton">

          View Full Clinician Directory

          <ArrowRight size={17} />

        </button>

      </div>


      {/* CARDS */}

      <div className="therapistGrid">

        {therapists.map((therapist, index) => (

          <div
            className={`therapistCard ${
              index === 1 ? "featured" : ""
            }`}
            key={therapist.name}
          >

            {/* TOP */}

            <div className="cardTop">

              <div
                className={`therapistAvatar ${therapist.color}`}
              >
                {therapist.initials}
              </div>


              <div className="rating">

                <Star
                  size={16}
                  fill="currentColor"
                />

                <span>
                  {therapist.rating}
                </span>

                <span>
                  ({therapist.reviews})
                </span>

              </div>

            </div>


            {/* INFORMATION */}

            <div className="therapistInfo">

              <h3>
                {therapist.name}
              </h3>

              <p
                className={`therapistRole ${therapist.color}`}
              >
                {therapist.role}
              </p>

              <p className="therapistDescription">
                {therapist.description}
              </p>

            </div>


            {/* BOTTOM */}

            <div className="cardBottom">

              <strong>
                {therapist.price}
              </strong>

              <button
                className={`bookButton ${therapist.color}`}
              >
                Book Session
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>

  );
}

export default Therapists;