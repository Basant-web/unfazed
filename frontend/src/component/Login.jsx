import { useState } from "react";

import "../css/Login.css";


function Login({ onLoginSuccess }) {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");


  // ==============================
  // LOGIN
  // ==============================

  async function handleLogin(event) {

    event.preventDefault();

    try {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            email: email,

            password: password,

          }),

        }
      );


      const data = await response.json();


      // ==========================
      // LOGIN FAILED
      // ==========================

      if (!response.ok) {

        setMessage(
          data.message || "Login failed"
        );

        return;

      }


      // ==========================
      // SAVE LOGIN DATA
      // ==========================

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "role",
        data.role
      );


      setMessage(
        "Login successful!"
      );


      // ==========================
      // SEND ROLE TO APP
      // ==========================

      if (onLoginSuccess) {

        onLoginSuccess(
          data.role
        );

      }


    } catch (error) {

      console.log(error);

      setMessage(
        "Something went wrong"
      );

    }

  }


  return (

    <section className="loginSection">

      <div className="loginContainer">


        {/* HEADER */}

        <div className="loginHeader">

          <h1>
            Welcome back
          </h1>

          <p>
            Sign in to continue to MindBridge.
          </p>

        </div>


        {/* FORM */}

        <form onSubmit={handleLogin}>


          {/* EMAIL */}

          <div className="inputGroup">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"

              value={email}

              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }

              required
            />

          </div>


          {/* PASSWORD */}

          <div className="inputGroup">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"

              value={password}

              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }

              required
            />

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="loginButton"
          >
            Login
          </button>


        </form>


        {/* MESSAGE */}

        {message && (

          <p className="loginMessage">
            {message}
          </p>

        )}


        {/* REGISTER TEXT */}

        <p className="registerText">

          Don't have an account?

          <span>
            {" "}Register
          </span>

        </p>


      </div>

    </section>

  );

}


export default Login;