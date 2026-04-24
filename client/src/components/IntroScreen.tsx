/*
 * IntroScreen — The "Press Start" landing screen
 * Design: Pixel art title card with animated elements, Ghibli warmth
 * Title: "The Journey of Marcus" with pixel art portrait
 * Layout: Compact vertical layout that fits all content on any viewport
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ASSET_URLS } from "@/lib/gameData";

interface IntroScreenProps {
  onStart: () => void;
  onSkipToResume?: () => void;
  onImmersionSelect?: (mode: "full" | "quick" | "resume") => void;
}

export default function IntroScreen({ onStart, onSkipToResume, onImmersionSelect }: IntroScreenProps) {
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

      {/* Main content — compact layout */}
      <motion.div
        className="relative z-[5] text-center px-6 max-w-xl"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Portrait + Title row */}
        <div className="flex flex-col items-center gap-3">
          {/* Marcus pixel art portrait in RPG frame */}
          <motion.div
            className="flex justify-center mb-1"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          >
            <div className="relative">
              {/* Outer glow */}
              <div
                className="absolute -inset-4 rounded-full opacity-60 blur-xl"
                style={{ background: "radial-gradient(circle, #10B981 0%, #D4A853 40%, transparent 70%)" }}
              />
              {/* RPG-style portrait frame */}
              <div
                className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden"
                style={{
                  border: "3px solid var(--color-rpg-amber)",
                  boxShadow:
                    "0 0 0 2px #1a2e1a, 0 0 0 5px var(--color-rpg-border), 0 0 20px rgba(212,168,83,0.4), inset 0 0 10px rgba(0,0,0,0.3)",
                }}
              >
                <motion.img
                  src={ASSET_URLS.marcusPortrait}
                  alt="Marcus — pixel art portrait"
                  className="w-full h-full object-cover"
                  style={{ imageRendering: "auto" }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              {/* Small sparkle on the frame */}
              <motion.div
                className="absolute -top-0.5 -right-0.5 text-xs"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                ✨
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div>
            <p
              className="pixel-text text-emerald-300/80 text-[7px] sm:text-[8px] tracking-widest mb-0.5"
              style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}
            >
              WELCOME TO
            </p>
            <h1
              className="pixel-text text-white text-sm sm:text-base md:text-lg mb-0"
              style={{
                textShadow: "2px 2px 0 #065F46, 4px 4px 0 rgba(0,0,0,0.3)",
                letterSpacing: "2px",
              }}
            >
              THE JOURNEY OF
            </h1>
            <h1
              className="pixel-text text-emerald-300 text-lg sm:text-xl md:text-2xl"
              style={{
                textShadow: "2px 2px 0 #065F46, 4px 4px 0 rgba(0,0,0,0.3)",
                letterSpacing: "3px",
              }}
            >
              MARCUS
            </h1>
          </motion.div>
        </div>

        {/* Personality tags */}
        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-3 my-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {["Radiant", "Relentless", "Curious"].map((word, i) => (
            <motion.span
              key={word}
              className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold"
              style={{
                fontFamily: "'Nunito', sans-serif",
                background: ["rgba(250,204,21,0.3)", "rgba(239,68,68,0.3)", "rgba(96,165,250,0.3)"][i],
                color: ["#FDE047", "#FCA5A5", "#93C5FD"][i],
                border: `1px solid ${["rgba(250,204,21,0.4)", "rgba(239,68,68,0.4)", "rgba(96,165,250,0.4)"][i]}`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Description — short version */}
        <motion.p
          className="text-white/60 text-[10px] sm:text-[11px] leading-snug mb-3 max-w-sm mx-auto"
          style={{ fontFamily: "'Nunito', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          An interactive adventure through the world of Marcus — account manager at Meta, musician, coffee lover, farmer, and lifelong explorer.
        </motion.p>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showPrompt ? 1 : 0, y: showPrompt ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={onStart}
            className="pixel-text text-white text-[9px] sm:text-[10px] tracking-wider px-8 py-2.5 rounded-xl
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

          <p className="text-white/30 text-[9px] mt-1.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
            or press ENTER / SPACE
          </p>

          {/* Immersion mode selector */}
          {onImmersionSelect && (
            <motion.div
              className="mt-4 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <p
                className="text-white/30 text-[9px] mb-1"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Or choose your path:
              </p>
              <div className="flex gap-2 sm:gap-3">
                {[
                  { mode: "full" as const, label: "Full Adventure", icon: "⚔️", desc: "Explore everything" },
                  { mode: "quick" as const, label: "Quick Tour", icon: "⚡", desc: "Highlights only" },
                  { mode: "resume" as const, label: "Just the Résumé", icon: "📄", desc: "Skip to resume" },
                ].map((option, i) => (
                  <motion.button
                    key={option.mode}
                    onClick={() => onImmersionSelect(option.mode)}
                    className="group flex flex-col items-center px-3 py-2 rounded-lg border border-white/10 hover:border-emerald-500/40 bg-white/5 hover:bg-emerald-900/20 transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 + i * 0.1 }}
                  >
                    <span className="text-lg mb-0.5">{option.icon}</span>
                    <span
                      className="pixel-text text-[6px] sm:text-[7px] text-white/70 group-hover:text-emerald-300 transition-colors"
                    >
                      {option.label}
                    </span>
                    <span
                      className="text-[8px] text-white/30 group-hover:text-white/50 mt-0.5 transition-colors"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      {option.desc}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Bottom credits */}
      <motion.div
        className="absolute bottom-3 sm:bottom-5 text-center z-10"
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
