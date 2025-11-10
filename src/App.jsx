// src/App.jsx
import React, { useState, useRef } from "react";
import Intro from "./components/Intro.jsx";
import Header from "./components/Header.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Qualification from "./components/Qualification.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  const [entered, setEntered] = useState(false);

  // refs for scrolling to sections
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const qualificationRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {!entered ? (
        <Intro onEnter={() => setEntered(true)} />
      ) : (
        <>
          {/* Header (Navbar inside Header) */}
          <Header
            onSkillsClick={() => scrollToSection(skillsRef)}
            onProjectsClick={() => scrollToSection(projectsRef)}
            onContactClick={() => scrollToSection(contactRef)}
            onAboutClick={() => scrollToSection(aboutRef)}
            onQualificationClick={() => scrollToSection(qualificationRef)}
          />

          {/* Sections */}
          <section ref={aboutRef}>
            <About />
          </section>

          <section ref={skillsRef}>
            <Skills />
          </section>

          <section ref={qualificationRef}>
            <Qualification />
          </section>

          <section ref={projectsRef}>
            <Projects />
          </section>

          <section ref={contactRef}>
            <Contact />
          </section>
        </>
      )}
    </>
  );
}
