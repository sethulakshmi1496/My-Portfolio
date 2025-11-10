// src/components/About.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const boxRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading + text animation
      gsap.fromTo(
        [headingRef.current, textRef.current],
        { y: 300, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Box animation
      gsap.fromTo(
        boxRef.current,
        { y: 200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 0.9,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Overlay animation
      gsap.fromTo(
        overlayRef.current,
        { y: "100%" },
        {
          y: "-100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 👇 Scroll to Projects section smoothly when clicking the box
  const handleNavigateToProjects = () => {
    const projectSection = document.querySelector("#projects");
    if (projectSection) {
      projectSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="about-section" ref={sectionRef} id="about">
      {/* transition overlay */}
      <div className="about-overlay" ref={overlayRef}></div>

      <h2 className="about-heading" ref={headingRef}>
        About Me
      </h2>

      <p className="about-text" ref={textRef}>
        As a proficient <strong>Python Full Stack Developer</strong>, my passion is
        crafting elegant and efficient solutions. I’m an expert in the Python ecosystem,
        specifically <strong>Django backend development</strong>, which I seamlessly
        integrate with modern frontend frameworks like <strong>React.js</strong>.
      </p>

      {/* clickable box */}
      <div
        className="about-box"
        ref={boxRef}
        onClick={handleNavigateToProjects}
        style={{ cursor: "pointer" }}
      >
        <h3>I do Web Development.</h3>
      </div>
    </section>
  );
}
