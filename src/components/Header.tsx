// src/components/Header.tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

export default function Header() {
  useEffect(() => {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.querySelector(".desktop-nav");

    if (!navToggle || !navMenu) return;

    const toggleMenu = (e: Event) => {
      e.stopPropagation();
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", (!isExpanded).toString());
      navMenu.classList.toggle("show");
    };

    const closeMenuOutside = (e: MouseEvent) => {
      if (!navMenu.contains(e.target as Node) && !navToggle.contains(e.target as Node)) {
        navMenu.classList.remove("show");
        navToggle.setAttribute("aria-expanded", "false");
      }
    };

    const closeOnLinkClick = () => {
      navMenu.classList.remove("show");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", toggleMenu);
    document.addEventListener("click", closeMenuOutside);
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", closeOnLinkClick);
    });

    return () => {
      navToggle.removeEventListener("click", toggleMenu);
      document.removeEventListener("click", closeMenuOutside);
      document.querySelectorAll(".nav-link").forEach(link => {
        link.removeEventListener("click", closeOnLinkClick);
      });
    };
  }, []);

  return (
    <header>
      <div className="header-container">
        <div className="header-inner">
          <Link to="/" className="logo-link">
            <img 
              src={logo}
              alt="UpShotX Logo"
              style={{ height: "2.5rem", width: "auto", display: "block" }}
            />
          </Link>
          <button id="nav-toggle" className="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
            &#9776;
          </button>

          <nav className="desktop-nav">
  <a href="https://upshotx.com" className="nav-link">Home</a>
  <a href="https://upshotx.com/services.html" className="nav-link">Services</a>
  <a href="https://upshotx.com/courses/" className="nav-link">Courses</a>
  <a href="https://upshotx.com/ai-tools" className="nav-link active">AI Tools</a>
  <a href="https://upshotx.com/contact.html" className="nav-link">Contact</a>
  <a href="https://upshotx.com/blog.html" className="nav-link">Blog</a>
</nav>
        </div>
      </div>
    </header>
  );
}
