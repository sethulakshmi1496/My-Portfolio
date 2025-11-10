import React, { useEffect, useRef } from "react";
import "./Qualification.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Qualification() {
  const threeRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let renderer, scene, camera, controls;

    async function loadScripts() {
      const loadScript = (src) =>
        new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = src;
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });

      await loadScript("https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/three@0.121.1/examples/js/loaders/GLTFLoader.js");
      await loadScript("https://cdn.jsdelivr.net/npm/three@0.121.1/examples/js/controls/OrbitControls.js");

      initScene();
    }

    function initScene() {
      const container = threeRef.current;
      if (!container || !window.THREE) return;

      const THREE = window.THREE;
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setClearColor(0xe5e5f2, 1);
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.innerHTML = "";
      container.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 3.3);

      const ambient = new THREE.AmbientLight(0xffffff, 1.5);
      const dir = new THREE.DirectionalLight(0xffffff, 2.2);
      dir.position.set(2, 4, 3);
      scene.add(ambient, dir);

      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2.5;

      const loader = new THREE.GLTFLoader();
      loader.load(
        "/models/qualification.glb",
        (gltf) => {
          const model = gltf.scene;
          scene.add(model);
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center);
          model.scale.set(1.4, 1.4, 1.4);
        },
        undefined,
        (err) => console.error("❌ Model Load Error", err)
      );

      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener("resize", () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
      });
    }

    loadScripts();

    // ✨ Trigger text animation when 98% of Skills section is scrolled
    const title = titleRef.current;
    const letters = title.textContent.split("");
    title.innerHTML = letters.map((l) => `<span class="letter">${l}</span>`).join("");
    const letterSpans = title.querySelectorAll(".letter");

    gsap.set(letterSpans, { opacity: 0, y: 40, scale: 0.8 });

    ScrollTrigger.create({
      trigger: ".skills-section", // 👈 watches Skills section
      start: "bottom 98%",        // 👈 triggers at 98% scroll of Skills page
      once: true,
      onEnter: () => {
        gsap.to(letterSpans, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.25,
          onComplete: () => startCardsAnimation(),
        });
      },
    });

    // 🎬 Sequential Card Animation
    function startCardsAnimation() {
      const cards = cardsRef.current;
      gsap.set(cards, { z: -1000, opacity: 0, scale: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".qualification-section",
          start: "top top",
          end: "bottom bottom",
          scrub: 9,
        },
      });

      const directions = [-350, 350, 0];
      const zEnd = 1600;
      let delay = 0;

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            x: directions[i],
            z: 250,
            opacity: 1,
            scale: 1.05,
            duration: 8,
            ease: "power2.out",
          },
          delay
        ).to(
          card,
          {
            x: directions[i] * 3,
            z: zEnd,
            opacity: 0,
            scale: 1.3,
            duration: 8,
            ease: "power3.inOut",
          },
          delay + 5
        );

        delay += 6.5;
      });
    }

    return () => {
      if (renderer) renderer.dispose();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const qualifications = [
    {
      title: "Bachelor of Computer Applications (BCA)",
      subtitle: "Mahatma Gandhi University, Kerala, India — 2019",
      description: [
        "Completed with focus on software development and programming fundamentals.",
        "Relevant Courses: Data Structures, DBMS, Software Engineering, Web Programming.",
      ],
    },
    {
      title: "Python Django Full Stack Developer Intern",
      subtitle: "Luminar Technolab, Kochi — 8 Months (2025)",
      description: [
        "Developed and maintained web applications using Django.",
        "Assisted in database design and API integration.",
        "Collaborated with senior developers to debug and optimize code.",
      ],
    },
    {
      title: "Intern",
      subtitle: "SYSDEVCODE Technologies — Currently Working",
      description: [
        "Working as a software development intern, building real-world applications and gaining hands-on experience in full stack development.",
      ],
    },
  ];

  return (
    <section className="qualification-section">
      <div className="three-background" ref={threeRef}></div>

      {/* ✨ Animated Text Heading */}
      <h2 className="qualification-heading" ref={titleRef}>
        Qualifications
      </h2>

      {/* 📜 Cards */}
      <div className="depth-container">
        {qualifications.map((q, i) => (
          <div
            key={i}
            className="depth-card"
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <h3 className="glow-text">{q.title}</h3>
            <h4 className="glow-sub">{q.subtitle}</h4>
            {q.description.map((line, idx) => (
              <p key={idx} className="glow-desc">{line}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
