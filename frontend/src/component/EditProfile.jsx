import { useState } from "react";
import "../css/editprofile.css";

function EditProfile({ profile, onUpdated }) {

  const [name, setName] = useState(profile?.name || "");
  const [bio, setBio] = useState(profile?.bio || "");

  const [specializations, setSpecializations] = useState(
    profile?.specializations?.join(", ") || ""
  );

  const [languages, setLanguages] = useState(
    profile?.languages?.join(", ") || ""
  );

  const [message, setMessage] = useState("");


  async function handleSubmit(event) {

    event.preventDefault();

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        "http://localhost:5000/profile",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },

          body: JSON.stringify({

            name: name,

            bio: bio,

            specializations:
              specializations
                .split(",")
                .map(item => item.trim())
                .filter(item => item !== ""),

            languages:
              languages
                .split(",")
                .map(item => item.trim())
                .filter(item => item !== "")

          })
        }
      );


      const data = await response.json();


      if (response.ok) {

        setMessage(
          "Profile updated successfully!"
        );

        if (onUpdated) {
          onUpdated(data.therapist);
        }

      } else {

        setMessage(
          data.message || "Profile update failed"
        );

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Unable to connect to server"
      );

    }
  }


  return (

    <section className="editProfile">

      <div className="editProfileContainer">

        <div className="editProfileHeader">

          <h2>Edit Profile</h2>

          <p>
            Update your professional information
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          {/* NAME */}

          <div className="editInputGroup">

            <label>
              Full Name
            </label>

            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />

          </div>


          {/* BIO */}

          <div className="editInputGroup">

            <label>
              Professional Bio
            </label>

            <textarea
              value={bio}
              placeholder="Tell clients about yourself..."
              onChange={(event) =>
                setBio(event.target.value)
              }
              rows="5"
            />

          </div>


          {/* SPECIALIZATIONS */}

          <div className="editInputGroup">

            <label>
              Specializations
            </label>

            <input
              type="text"
              value={specializations}
              placeholder="CBT, Anxiety, Depression"
              onChange={(event) =>
                setSpecializations(event.target.value)
              }
            />

            <small>
              Separate multiple specializations with commas.
            </small>

          </div>


          {/* LANGUAGES */}

          <div className="editInputGroup">

            <label>
              Languages
            </label>

            <input
              type="text"
              value={languages}
              placeholder="English, Hindi, Gujarati"
              onChange={(event) =>
                setLanguages(event.target.value)
              }
            />

            <small>
              Separate multiple languages with commas.
            </small>

          </div>


          {/* BUTTON */}

          <button
            type="submit"
            className="saveProfileButton"
          >
            Save Changes
          </button>

        </form>


        {message && (

          <p className="editProfileMessage">
            {message}
          </p>

        )}

      </div>

    </section>

  );
}

export default EditProfile;