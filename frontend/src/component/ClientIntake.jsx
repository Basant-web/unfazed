import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import "../css/clientIntake.css";

function ClientIntake() {

  const [formData, setFormData] = useState({
    dateOfBirth: "",
    gender: "",
    presentingConcern: "",
    history: "",
    consent: false
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  }

  async function handleSubmit(event) {
  event.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/clients/intake",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(formData)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Intake form submitted successfully!");

  } catch (error) {
    console.error("Intake submission error:", error);
    alert("Something went wrong");
  }
}
  return (
    <section className="clientIntakePage">

      <div className="clientIntakeHeader">
        <h1>Client Intake Form</h1>
        <p>
          Please provide some information before your first session.
        </p>
      </div>

      <form className="clientIntakeForm" onSubmit={handleSubmit}>

        <div className="clientIntakeSection">
          <h2>Personal Information</h2>

          <div className="clientIntakeGrid">

            <div className="clientIntakeField">
              <label>Date of Birth</label>

              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div className="clientIntakeField">
              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">
                  Prefer not to say
                </option>
              </select>
            </div>

          </div>
        </div>

        <div className="clientIntakeSection">
          <h2>Presenting Concern</h2>

          <textarea
            name="presentingConcern"
            value={formData.presentingConcern}
            onChange={handleChange}
            placeholder="Tell us what brings you to therapy..."
            rows="5"
          />
        </div>

        <div className="clientIntakeSection">
          <h2>History</h2>

          <textarea
            name="history"
            value={formData.history}
            onChange={handleChange}
            placeholder="Share any relevant personal, medical, or therapy history..."
            rows="6"
          />
        </div>

        <div className="clientIntakeConsent">

          <ShieldCheck />

          <div>
            <h3>Digital Consent</h3>

            <label>
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
              />

              I consent to providing this information to my therapist.
            </label>
          </div>

        </div>

        <button
          type="submit"
          className="clientIntakeSubmit"
          disabled={!formData.consent}
        >
          Submit Intake Form
        </button>

      </form>

    </section>
  );
}

export default ClientIntake;