import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck
} from "lucide-react";

import "../css/footer.css";

function Footer() {

  return (
    <footer className="footer">

      <div className="footerContainer">

        {/* ================= BRAND ================= */}

        <div className="footerBrand">

          <h2 className="footerLogo">
            Mind<span>Bridge</span>
          </h2>

          <p className="footerDescription">
            A modern care platform connecting clinicians
            and clients through secure, thoughtful technology.
          </p>

          <div className="hipaaBadge">
            <ShieldCheck size={18} />
            <span>HIPAA-Ready Platform</span>
          </div>

        </div>


        {/* ================= PLATFORM ================= */}

        <div className="footerColumn">

          <h3>Platform</h3>

          <a href="#features">Features</a>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#therapists">Therapists</a>
          <a href="#reviews">Reviews</a>

        </div>


        {/* ================= CLINICIANS ================= */}

        <div className="footerColumn">

          <h3>For Clinicians</h3>

          <a href="#register">Get Started</a>
          <a href="#pricing">Plans & Pricing</a>
          <a href="#therapists">Clinician Directory</a>
          <a href="#resources">Resources</a>
          <a href="#support">Support</a>

        </div>


        {/* ================= COMPANY ================= */}

        <div className="footerColumn">

          <h3>Company</h3>

          <a href="#about">About MindBridge</a>
          <a href="#contact">Contact Us</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#security">Security</a>

        </div>


        {/* ================= CONTACT ================= */}

        <div className="footerColumn contactColumn">

          <h3>Contact</h3>

          <div className="contactItem">

            <Mail size={17} />

            <span>
              hello@mindbridge.com
            </span>

          </div>

          <div className="contactItem">

            <Phone size={17} />

            <span>
              +1 (800) 555-0198
            </span>

          </div>

          <div className="contactItem">

            <MapPin size={17} />

            <span>
              San Francisco, CA
            </span>

          </div>

        </div>

      </div>


      {/* ================= BOTTOM ================= */}

      <div className="footerBottom">

        <p>
          © 2026 MindBridge. All rights reserved.
        </p>

        <p>
          Built for better care.
        </p>

      </div>

    </footer>
  );
}

export default Footer;