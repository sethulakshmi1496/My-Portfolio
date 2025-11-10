// src/components/Header.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidEther from "./LiquidEther";
import Navbar from "./Navbar.jsx";
import sethuImage from "/src/assets/sethu.png";

gsap.registerPlugin(ScrollTrigger);

export default function Header({
  onSkillsClick,
  onProjectsClick,
  onContactClick,
  onAboutClick,
  onQualificationClick,
}) {
  const headerRef = useRef(null);
  const topLeftTextRef = useRef(null);
  const bottomRightTextRef = useRef(null);

  useEffect(() => {
    const headerEl = headerRef.current;
    const sethuEl = topLeftTextRef.current;
    const lakshmiEl = bottomRightTextRef.current;

    if (!headerEl || !sethuEl || !lakshmiEl) return;

    gsap.set([sethuEl, lakshmiEl], { zIndex: 5, opacity: 0.9, scale: 1.0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headerEl,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(sethuEl, { x: "-100%", opacity: 0, scale: 0.9, duration: 1 }, 0)
      .to(lakshmiEl, { x: "100%", opacity: 0, scale: 0.9, duration: 1 }, 0);

    return () => tl.kill();
  }, []);

  const fadedBlack = "#1a1a1a";
  const nameFont = "Great Vibes, cursive";
  const greetingTextFont = "Inter, sans-serif";

  const hugeTitleStyle = {
    fontSize: "7.5rem",
    fontWeight: 400,
    lineHeight: 1.05,
    color: fadedBlack,
    fontFamily: nameFont,
    margin: 0,
  };

  const greetingStyle = {
    fontSize: "2rem",
    fontWeight: 500,
    letterSpacing: "4px",
    color: fadedBlack,
    opacity: 0.95,
    fontFamily: greetingTextFont,
    margin: 0,
    marginBottom: "0.5rem",
  };

  return (
    <div
      ref={headerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* ✅ Navbar */}
      <Navbar
        onSkillsClick={onSkillsClick}
        onProjectsClick={onProjectsClick}
        onContactClick={onContactClick}
        onAboutClick={onAboutClick}
        onQualificationClick={onQualificationClick}
      />

      {/* Background Image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <img
          src={sethuImage}
          alt="Sethulakshmi K.S"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            filter: "brightness(0.9)",
          }}
        />
      </div>

      {/* 💧 Liquid Ether Effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          height: "100%",
          width: "100%",
        }}
      >
        <LiquidEther
          colors={["#e5e5f2", "#ffffff", "#cfd8dc"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.7}
          autoIntensity={2.4}
          takeoverDuration={0.1}
          autoResumeDelay={500}
          autoRampDuration={0.5}
        />
      </div>

      {/* ✨ Text Layer */}
      <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
        <div
          ref={topLeftTextRef}
          style={{ position: "absolute", top: "18%", left: "10%" }}
        >
          <p style={greetingStyle}>Hi I Am,</p>
          <h1 style={hugeTitleStyle}>Sethu</h1>
        </div>

        <div
          ref={bottomRightTextRef}
          style={{
            position: "absolute",
            bottom: "30%",
            right: "8%",
            paddingLeft: "40px", // ✅ Added: shift text slightly left
          }}
        >
          <h1
            style={{
              ...hugeTitleStyle,
              fontSize: "6.5rem",
            }}
          >
            Lakshmi
          </h1>
        </div>
      </div>
    </div>
  );
}
