// src/components/Skills.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import BIRDS from "vanta/dist/vanta.birds.min.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Skills.css";

import HtmlIcon from "../assets/html.png";
import CssIcon from "../assets/csss.png";
import JsIcon from "../assets/js.png";
import ReactIcon from "../assets/react.png";
import PythonIcon from "../assets/python.png";
import DjangoIcon from "../assets/django.png";
import MysqlIcon from "../assets/mysql.png";
import SqliteIcon from "../assets/sqlite.png";
import GitIcon from "../assets/git.png";
import GithubIcon from "../assets/github.png";
import RestApiIcon from "../assets/restapi.png";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  const isMobile = window.innerWidth < 768;

  const skillsData = [
    { name: "Python", src: PythonIcon },
    { name: "Django", src: DjangoIcon },
    { name: "REST API", src: RestApiIcon },
    { name: "React", src: ReactIcon },
    { name: "GitHub", src: GithubIcon },
    { name: "Git", src: GitIcon },
    { name: "HTML", src: HtmlIcon },
    { name: "CSS", src: CssIcon },
    { name: "SQLite", src: SqliteIcon },
    { name: "MySQL", src: MysqlIcon },
    { name: "JavaScript", src: JsIcon },
  ];

  // 🐦 Vanta Birds Background
  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = BIRDS({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        backgroundColor: 0xe5e5f2,
        color1: 0xed5050,
        birdSize: isMobile ? 0.6 : 0.8,
        wingSpan: 12,
        quantity: isMobile ? 3 : 6,
        speedLimit: 5,
      });
    }
    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
      vantaEffect.current = null;
    };
  }, [isMobile]);

  // 🌪️ Card Circle Animation
  useEffect(() => {
    const cards = cardsRef.current;
    const total = cards.length;
    const radius = isMobile ? 150 : 300;

    gsap.set(cards, {
      position: "absolute",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 0.5,
      rotationY: -120,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 90%",
        end: "center+=300 center",
        scrub: 8,
      },
    });

    cards.forEach((card, i) => {
      const angle = (i / total) * Math.PI * 2;
      tl.to(
        card,
        {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          rotationY: 0,
          opacity: 1,
          scale: 1,
          duration: 3.5,
          ease: "power2.inOut",
        },
        0
      );
    });

    return () => tl.scrollTrigger?.kill();
  }, [isMobile]);

  // ✨ Text Entrance + Floating Animation
  useEffect(() => {
    const lines = titleRef.current.querySelectorAll(".skills-line");

    gsap.set(lines, { y: 80, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 85%",
      },
    });

    tl.to(lines, {
      y: 0,
      opacity: 1,
      duration: 1.4,
      stagger: 0.25,
      ease: "power3.out",
    });

    gsap.to(titleRef.current, {
      y: "+=15",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section className="skills-section">
      <div className="vanta-background" ref={vantaRef}></div>

      <div className="skills-overlay">
        <div className="skills-grid">
          {/* Centered Title */}
          <div className="skills-title" ref={titleRef}>
            <span className="skills-line top-line">My</span>
            <span className="skills-line bottom-line">Skills</span>
          </div>

          {/* Skill Cards */}
          {skillsData.map((skill, i) => (
            <div
              className="skill-wrapper"
              key={skill.name}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <img src={skill.src} alt={skill.name} className="skill-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
