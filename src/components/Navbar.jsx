// src/components/Navbar.jsx
import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar({
  onSkillsClick,
  onProjectsClick,
  onContactClick,
  onAboutClick,
  onQualificationClick,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <nav className="main-navbar">
      {/* ✨ Left side - Portfolio Text */}
      <div className="navbar-left">
        <h2 className="portfolio-text">Portfolio</h2>
      </div>

      {/* 🔹 Right side - Links and Dropdown */}
      <div className="navbar-right">
        <div className="nav-links">
          <button onClick={onSkillsClick} className="nav-link">
            Skills
          </button>
          <button onClick={onProjectsClick} className="nav-link">
            Projects
          </button>
          <button onClick={onContactClick} className="nav-link">
            Contact
          </button>
        </div>

        {/* Dots Dropdown */}
        <div className="dropdown-container">
          <button className="animated-button" onClick={toggleDropdown}>
            <span className="dot">•</span>
            <span className="dot">•</span>
          </button>

          {showDropdown && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => {
                  onAboutClick();
                  setShowDropdown(false);
                }}
              >
                About
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  onQualificationClick();
                  setShowDropdown(false);
                }}
              >
                Qualification
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
