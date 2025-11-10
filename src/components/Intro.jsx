import { motion } from "framer-motion";
import { Laptop } from "lucide-react";
import { useEffect } from "react";

export default function Intro({ onEnter }) {
  // Load Marker Felt–like font
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Patrick+Hand:wght@400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <motion.section
      animate={{
        backgroundColor: ["#0a0a0a", "#1a1a1a", "#0f0f0f"],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      }}
      className="min-h-screen flex flex-col items-center justify-center text-center transition-colors duration-1000"
      style={{
        fontFamily: "'Patrick Hand', 'Marker Felt', cursive",
        color: "#d9d9d9",
      }}
    >
      {/* 💻 Animated Laptop Icon */}
      <motion.div
        className="mb-14"
        animate={{ y: [0, -20, 0], rotate: [0, 6, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Laptop size={140} strokeWidth={1.5} className="text-[#d9d9d9]" />
      </motion.div>

      {/* 📝 Text */}
      <div className="max-w-3xl px-6">
        <h1
          className="text-6xl font-bold mb-10"
          style={{ color: "#f5f5f5", letterSpacing: "1px" }}
        >
          Bringing ideas to life
          <br />
          through clean, creative code.
        </h1>
      </div>

      {/* 🔘 Stylish Enter Button */}
      <motion.button
        onClick={onEnter}
        whileHover={{
          scale: 1.2,
          boxShadow: "0 0 55px rgba(168, 85, 247, 0.9)", // purple glow
        }}
        whileTap={{ scale: 0.95 }}
        className="relative px-16 py-6 rounded-full font-semibold text-3xl overflow-hidden shadow-lg"
        style={{
          color: "#f5f5f5",
          background: "linear-gradient(90deg, #a855f7, #ec4899, #a855f7)", // 💜 violet–magenta
          backgroundSize: "300% 300%",
          animation: "gradientShift 5s ease infinite",
          border: "none",
        }}
      >
        {/* Button Text */}
        <span className="relative z-10">Step Inside ↘</span>

        {/* ✨ Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent"
          animate={{ x: ["-150%", "150%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 🌈 Subtle glow around button */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/40 via-pink-400/40 to-fuchsia-400/40 blur-lg opacity-80" />
      </motion.button>

      {/* 🌟 Gradient animation keyframes */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.section>
  );
}
