import React, { useEffect, useRef } from "react";
import "./Projects.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "../assets/img_1.png";
import img2 from "../assets/img_2.png";
import ecommerce from "../assets/ecommerce.png";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  // 🎨 Only three projects as per your update
  const projects = [
    { src: img1, title: "Hospital Management" },
    { src: img2, title: "Fashion Store" },
    { src: ecommerce, title: "E-Commerce" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const title = titleRef.current;

    if (!section || cards.length === 0 || !title) return;

    // 🖋️ Apple Chancery animation for “My Crafts”
    gsap.set(title, {
      opacity: 0,
      y: -100,
      scale: 0.8,
      letterSpacing: "0.6em",
      filter: "blur(10px)",
    });

    gsap.to(title, {
      opacity: 1,
      y: 0,
      scale: 1,
      letterSpacing: "0.1em",
      filter: "blur(0px)",
      duration: 2.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 100%", // starts when entering section
        toggleActions: "play none none reverse",
      },
    });

    // 🎬 S-curve animation for cards
    gsap.set(cards, {
      position: "absolute",
      left: "50%",
      top: "55%",
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 0.9,
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      zIndex: (i) => 10 - i,
    });

    const sPath = (t) => {
      const x = 350 * Math.sin(Math.PI * 2 * t);
      const y = gsap.utils.interpolate(300, -300, t);
      const z = 250 * Math.cos(Math.PI * 2 * t);
      return { x, y, z };
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 95%",
        end: "bottom top",
        scrub: 2,
      },
    });

    const delayGap = 1.4;
    cards.forEach((card, i) => {
      const data = { t: 0 };
      tl.to(
        data,
        {
          t: 1,
          duration: 6.5,
          ease: "power2.inOut",
          onUpdate: () => {
            const { x, y, z } = sPath(data.t);
            const scale = 1 + z / 1000;
            const opacity = data.t > 0.1 && data.t < 0.9 ? 1 : 0;
            gsap.set(card, {
              transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
              opacity,
            });
          },
        },
        i * delayGap
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    // ✅ Added id="projects" for linking
    <section className="projects-section" ref={sectionRef} id="projects">
      <div className="projects-header">
        <h2 className="projects-heading" ref={titleRef}>
          My Crafts
        </h2>
      </div>

      <div className="projects-stage">
        {projects.map((p, i) => (
          <div
            className="project-card"
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
          >
            {/* 🏷️ Added title label at top */}
            <div className="project-label">{p.title}</div>

            <img src={p.src} alt={p.title} className="project-img" />
            <div className="project-info">
              <h3>{p.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
