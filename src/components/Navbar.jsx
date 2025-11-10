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
    <nav
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "95%",
        zIndex: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 2rem",
        height: "60px",
        backgroundColor: "transparent",
      }}
    >
      {/* ✨ Elegant Portfolio Text (same font as your latest navbar) */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 className="portfolio-text">Portfolio</h2>
      </div>

      {/* 🔹 Links + Dropdown */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <div style={{ display: "flex", gap: "2rem" }}>
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
        <div style={{ position: "relative" }}>
          <button className="animated-button" onClick={toggleDropdown}>
            <span className="dot">•</span>
            <span className="dot">•</span>
          </button>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                right: 0,
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                padding: "0.5rem 0",
                zIndex: 10,
              }}
            >
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
