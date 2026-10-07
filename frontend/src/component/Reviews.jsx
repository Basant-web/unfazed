import { Star } from "lucide-react";
import "../css/reviews.css";

function Reviews() {

  const reviews = [
    {
      initials: "SJ",
      name: "Dr. Sarah Jenkins, PsyD",
      role: "Licensed Clinical Psychologist",
      color: "dark",

      review:
        "MindBridge cut down my Friday charting time from 3 hours to under 30 minutes. My patients actually complete their CBT thought records because the client portal feels calm and intuitive, not clinical and cold."
    },

    {
      initials: "AR",
      name: "Alex Rivera",
      role: "Active Patient (GAD-7 Track)",
      color: "light",

      review:
        "Having my session notes, package balance, and breathing exercises in one portal makes my therapy journey feel grounded. Downloading superbills for my insurance takes literally one click."
    },

    {
      initials: "ER",
      name: "Elena Rostova, LMFT",
      role: "Clinical Director, Bay Therapy Group",
      color: "purple",

      review:
        "As a clinic director managing 8 therapists, MindBridge unified our billing audits and allowed supervisor co-signing in a clean, modern interface. It replaced three separate legacy softwares."
    }
  ];


  return (
    <section className="reviewsSection">

      {/* HEADER */}

      <div className="reviewsHeader">

        <p className="reviewsLabel">
          VERIFIED USER FEEDBACK
        </p>

        <h2>
          Trusted by Clinicians & Loved by Clients
        </h2>

        <p className="reviewsSubtitle">
          Real stories from clinicians scaling their practices
          and patients feeling supported.
        </p>

      </div>


      {/* REVIEWS */}

      <div className="reviewsGrid">

        {reviews.map((review) => (

          <div
            className="reviewCard"
            key={review.name}
          >

            {/* STARS */}

            <div className="reviewStars">

              {[1, 2, 3, 4, 5].map((star) => (

                <Star
                  key={star}
                  size={18}
                  fill="currentColor"
                  strokeWidth={0}
                />

              ))}

            </div>


            {/* REVIEW */}

            <p className="reviewText">
              "{review.review}"
            </p>


            {/* USER */}

            <div className="reviewUser">

              <div
                className={`reviewAvatar ${review.color}`}
              >
                {review.initials}
              </div>

              <div>

                <h3>
                  {review.name}
                </h3>

                <p>
                  {review.role}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Reviews;