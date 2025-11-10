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

  // refs for smooth scrolling
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
          <Header
            onSkillsClick={() => scrollToSection(skillsRef)}
            onProjectsClick={() => scrollToSection(projectsRef)}
            onContactClick={() => scrollToSection(contactRef)}
            onAboutClick={() => scrollToSection(aboutRef)}
            onQualificationClick={() => scrollToSection(qualificationRef)}
          />

          {/* Sections with scroll margin */}
          <section ref={aboutRef} style={{ scrollMarginTop: "70px" }}>
            <About />
          </section>

          <section ref={skillsRef} style={{ scrollMarginTop: "70px" }}>
            <Skills />
          </section>

          <section ref={qualificationRef} style={{ scrollMarginTop: "70px" }}>
            <Qualification />
          </section>

          <section ref={projectsRef} style={{ scrollMarginTop: "70px" }}>
            <Projects />
          </section>

          <section ref={contactRef} style={{ scrollMarginTop: "70px" }}>
            <Contact />
          </section>
        </>
      )}
    </>
  );
}
