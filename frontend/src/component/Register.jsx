import { useState } from "react";
import "../css/Register.css";

function Register() {
  const [role, setRole] = useState("client");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  async function handleRegister(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await response.text();

      setMessage(data);
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
    }
  }

  return (
    <section className="registerSection">
      <div className="registerContainer">

        <div className="registerHeader">
          <h1>Create your account</h1>
          <p>
            Join MindBridge and take the next step toward better care.
          </p>
        </div>

        <form onSubmit={handleRegister}>

          {/* ACCOUNT TYPE */}

          <div className="roleGroup">
            <label className="roleLabel">
              I am registering as
            </label>

            <div className="roleOptions">

              <button
                type="button"
                className={role === "client" ? "role active" : "role"}
                onClick={() => setRole("client")}
              >
                <strong>Client</strong>
                <span>Looking for support</span>
              </button>

              <button
                type="button"
                className={role === "therapist" ? "role active" : "role"}
                onClick={() => setRole("therapist")}
              >
                <strong>Therapist</strong>
                <span>Providing professional care</span>
              </button>

            </div>
          </div>

          {/* NAME */}

          <div className="inputGroup">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          {/* EMAIL */}

          <div className="inputGroup">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}

          <div className="inputGroup">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="createAccountButton"
          >
            Create Account
          </button>

        </form>

        {message && (
          <p className="registerMessage">
            {message}
          </p>
        )}

        <p className="loginText">
          Already have an account? <span>Login</span>
        </p>

      </div>
    </section>
  );
}

export default Register;