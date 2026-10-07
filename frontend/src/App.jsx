import { useEffect, useState } from "react";

import Header from "./component/header";
import HeroSection from "./component/herosection";
import Feature from "./component/feature";
import Services from "./component/services";
import Register from "./component/Register";
import Login from "./component/Login";
import Therapists from "./component/Therapist";
import Pricing from "./component/Pricing";
import Reviews from "./component/Reviews";
import Footer from "./component/Footer";
import TherapistDashboard from "./component/TherapistDashBoard";
import ClientDashboard from "./component/ClientDashboard";
import ClientCalendar from "./component/ClientCalendar";

import "./index.css";


function App() {

  const [profile, setProfile] =
    useState(null);

  const [showEditProfile, setShowEditProfile] =
    useState(false);

  const [showRegister, setShowRegister] =
    useState(false);

  const [showLogin, setShowLogin] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [dashboard, setDashboard] = useState(null);


  // ======================================
  // GET PROFILE
  // ======================================

  async function getProfile() {

    const token =
      localStorage.getItem("token");


    if (!token) {
      return;
    }


    try {

      const response =
        await fetch(
          "http://localhost:5000/profile",
          {
            method: "GET",

            headers: {
              Authorization: token
            }

          }
        );


      const data =
        await response.json();


      if (response.ok) {

        setProfile(data);

      } else {

        setMessage(
          data.message ||
          "Could not load profile"
        );

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Unable to connect to server"
      );

    }

  }


  // ======================================
  // CHECK LOGIN WHEN APP LOADS
  // ======================================

  useEffect(() => {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role) {

    setDashboard(role);

    getProfile();

  }

}, []);


  // ======================================
  // LOGIN SUCCESS
  // ======================================

  function handleLoginSuccess(role) {

  setShowLogin(false);

  setDashboard(role);

  getProfile();

}


  // ======================================
  // LOGOUT
  // ======================================

  function handleLogout() {

  localStorage.removeItem("token");
  localStorage.removeItem("role");

  setProfile(null);
  setDashboard(null);

}


  return (

    

    <div className="App">

      


      {/* HEADER */}

      {!dashboard && (

        <Header
          onRegister={() =>
            setShowRegister(true)
          }

          onLogin={() =>
            setShowLogin(true)
          }

        />

      )}


      <main className="main">


        {/* =================================
            PUBLIC WEBSITE
        ================================= */}

        {!dashboard && (

          <>

            <HeroSection />

            <Feature />

            <Services />

            <Therapists />

            <Pricing />

            <Reviews />

            <Footer />

          </>

        )}


        {/* =================================
            THERAPIST DASHBOARD
        ================================= */}

        {dashboard === "therapist" && (

  <TherapistDashboard
    profile={profile}
    onLogout={handleLogout}
  />

)}

{dashboard === "client" && (

  <ClientDashboard
    profile={profile}
    onLogout={handleLogout}
  />

)}


      </main>


      {/* =================================
          REGISTER POPUP
      ================================= */}

      {showRegister && (

        <div className="registerOverlay">

          <div className="registerModal">


            <button
              className="closeRegister"

              onClick={() =>
                setShowRegister(false)
              }

            >
              ×
            </button>


            <Register />
            
          </div>

        </div>

      )}


      {/* =================================
          LOGIN POPUP
      ================================= */}

      {showLogin && (

        <div className="registerOverlay">

          <div className="registerModal">


            <button
              className="closeRegister"

              onClick={() =>
                setShowLogin(false)
              }

            >
              ×
            </button>


            <Login
              onLoginSuccess={(role) => {
    setShowLogin(false);
    setDashboard(role);
  }}
            />


          </div>

        </div>

      )}


    </div>

  );

}


export default App;

/*import ClientCalendar from "./component/ClientCalendar";

function App() {
  return (
    <ClientCalendar
      therapistId="6a970393a5f2c5a470d3d4e8"
    />
  );
}

export default App;*/