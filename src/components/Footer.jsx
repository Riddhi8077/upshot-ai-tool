import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // adjust path if different
import logo from "../assets/logo.png"

import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      style={{
        backgroundColor: "black",
        padding: "4rem 1rem",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "1280px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          textAlign: "left",
        }}
      >
        <div>
          <img 
        src={logo}
        alt="UpShotX Logo"
        style={{ height: "2rem", width: "auto", display: "block" }}
      />
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
            }}
          >
            Your growth partner in the AI era. <br />
            7th floor, Platina Heights, C-24, Phase 2 Sector 62, Noida, India, Uttar Pradesh
          </p>
        </div>

        <div>
          <h3 style={{ color: "white", fontWeight: 600, marginBottom: "1rem" }}>
            Company
          </h3>
          <a href="https://upshotx.com/services" className="nav-link footer-link">Services</a>
          <a href="https://upshotx.com/courses" className="nav-link footer-link">Courses</a>
          <a href="https://upshotx.com" className="nav-link footer-link">Home</a>
        </div>

        <div>
          <h3 style={{ color: "white", fontWeight: 600, marginBottom: "1rem" }}>
            Connect
          </h3>
          <a
            href="https://www.linkedin.com/company/upshotxagency"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link footer-link"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/upshot.x/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link footer-link"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=734376406428512"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link footer-link"
          >
            Facebook
          </a>
        </div>

        <div>
          <h3 style={{ color: "white", fontWeight: 600, marginBottom: "1rem" }}>
            Contact Us
          </h3>
          <a href="mailto:Contact@upshotx.in" className="nav-link footer-link">Contact@upshotx.in</a>
          <a href="tel:+918383061511" className="nav-link footer-link">+91 8383061511</a>
          <a href="/contact.html" className="nav-link footer-link">Schedule a Call</a>
        </div>
      </div>

         <div 
        style={{
          textAlign: "center",
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border-color)",
        }}
      >
        <HiddenAdmin />
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
          onClick={(e) => {
            if (e.shiftKey) navigate("/admin");
          }}
        >
          © 2025 <strong>UpShotX</strong>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
    

export default Footer;

function HiddenAdmin() {
  const [show, setShow] = useState(false);

  // make globally accessible for shift-click
  window.revealAdmin = () => setShow(true);

  return (
    <>
      {show && (
        <Link to="/admin">
          <Button variant="outline" className="glow-border" style={{ marginBottom: "1rem" }}>
            Admin Panel
          </Button>
        </Link>
      )}
    </>
  );
}
