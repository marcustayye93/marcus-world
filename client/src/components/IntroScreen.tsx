/*
 * IntroScreen — The "Press Start" landing screen
 * Design: Pixel art title card with animated elements, Ghibli warmth
 * Title: "The Journey of Marcus"
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ASSET_URLS } from "@/lib/gameData";

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onStart();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onStart]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background - overworld map as teaser */}
      <div
        className="absolute inset-0 pixel-render"
        style={{
          backgroundImage: `url(${ASSET_URLS.overworld})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-black/90" />

      {/* Animated stars / particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none z-[2]"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          <span className="text-lg sm:text-xl">
            {["✨", "⭐", "🌟", "💫", "🌿", "🎵", "☕"][i % 7]}
          </span>
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-[5] text-center px-6 max-w-lg"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Globe icon */}
        <motion.div
          className="mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-6xl sm:text-7xl md:text-8xl drop-shadow-2xl">🌍</span>
        </motion.div>

        {/* Title */}
        <motion.div className="mb-2">
          <p
            className="pixel-text text-emerald-300/80 text-[8px] sm:text-[9px] tracking-widest mb-2"
            style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}
          >
            WELCOME TO
          </p>
          <h1
            className="pixel-text text-white text-lg sm:text-xl md:text-2xl mb-1"
            style={{
              textShadow: "3px 3px 0 #065F46, 6px 6px 0 rgba(0,0,0,0.3)",
              letterSpacing: "2px",
            }}
          >
            THE JOURNEY OF
          </h1>
          <h1
            className="pixel-text text-emerald-300 text-2xl sm:text-3xl md:text-4xl"
            style={{
              textShadow: "3px 3px 0 #065F46, 6px 6px 0 rgba(0,0,0,0.3)",
              letterSpacing: "3px",
            }}
          >
            MARCUS
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-3 mb-3 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {["Cheerful", "Passionate", "Curious"].map((word, i) => (
            <motion.span
              key={word}
              className="px-3 py-1 rounded-full text-xs sm:text-sm font-bold"
              style={{
                fontFamily: "'Nunito', sans-serif",
                background: ["rgba(96,165,250,0.3)", "rgba(74,222,128,0.3)", "rgba(250,204,21,0.3)"][i],
                color: ["#93C5FD", "#86EFAC", "#FDE047"][i],
                border: `1px solid ${["rgba(96,165,250,0.4)", "rgba(74,222,128,0.4)", "rgba(250,204,21,0.4)"][i]}`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-white/70 text-xs sm:text-sm leading-relaxed mb-8"
          style={{ fontFamily: "'Nunito', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          An interactive adventure through the world of Marcus — account manager at Meta, musician, coffee lover, farmer, and lifelong explorer. Click on buildings and discover each chapter.
        </motion.p>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showPrompt ? 1 : 0, y: showPrompt ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={onStart}
            className="pixel-text text-white text-[10px] sm:text-xs tracking-wider px-10 py-4 rounded-xl
                       bg-gradient-to-b from-emerald-500 to-emerald-700 border-b-4 border-emerald-900
                       hover:from-emerald-400 hover:to-emerald-600 active:border-b-0 active:mt-1
                       transition-all shadow-xl shadow-emerald-900/40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ▶ PRESS START
            </motion.span>
          </motion.button>

          <p className="text-white/40 text-[10px] mt-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
            or press ENTER / SPACE
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom credits */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p className="pixel-text text-white/30 text-[6px] sm:text-[7px]">
          &copy; 2026 MARCUS TAY YONG ERN &bull; BUILT WITH LOVE
        </p>
      </motion.div>
    </motion.div>
  );
}
