import logo from "../img/weblogo.png";

import "../css/header.css";


function Header({ onRegister, onLogin }) {

  return (

    <section className="header">


      {/* LOGO */}

      <div className="Logo">

        <img
          className="logoImg"
          src={logo}
          alt="MindBridge Logo"
        />

      </div>


      {/* NAVIGATION */}

      <div className="nav">

        <a
          href="#"
          className="navLink"
        >
          Home
        </a>

        <a
          href="#features"
          className="navLink"
        >
          Features
        </a>

        <a
          href="#services"
          className="navLink"
        >
          Services
        </a>

        <a
          href="#packages"
          className="navLink"
        >
          Packages
        </a>

        <a
          href="#reviews"
          className="navLink"
        >
          Reviews
        </a>

        <a
          href="#therapists"
          className="navLink"
        >
          Therapists
        </a>


        {/* REGISTER */}

        <button
          className="btnRegister"
          onClick={onRegister}
        >
          Register
        </button>


        {/* LOGIN */}

        <button
          className="btnLogin"
          onClick={onLogin}
        >
          Login
        </button>

      </div>

    </section>

  );

}


export default Header;