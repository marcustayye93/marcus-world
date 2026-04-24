/*
 * PixelLoadingScreen — Themed loading animation while assets preload
 * Design: Dark background with animated pixel progress bar and rotating tips
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_TIPS = [
  "Tip: Click on buildings to explore each chapter of Marcus's journey!",
  "Tip: Use the quest checklist to track your exploration progress.",
  "Tip: Press the keyboard arrows to navigate between buildings.",
  "Tip: Try the Konami code for a secret Easter egg!",
  "Tip: Click RESUME to see a traditional résumé snapshot.",
  "Tip: Marcus speaks English, Chinese/Mandarin, and basic Cantonese.",
];

interface PixelLoadingScreenProps {
  onLoaded: () => void;
  assetsToLoad: string[];
}

export default function PixelLoadingScreen({ onLoaded, assetsToLoad }: PixelLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // Rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Preload assets
  useEffect(() => {
    if (assetsToLoad.length === 0) {
      setProgress(100);
      return;
    }

    let loaded = 0;
    const total = assetsToLoad.length;

    const loadAsset = (url: string) => {
      return new Promise<void>((resolve) => {
        // For audio files
        if (url.endsWith(".mp3") || url.endsWith(".ogg") || url.endsWith(".wav")) {
          const audio = new Audio();
          audio.oncanplaythrough = () => { loaded++; setProgress(Math.round((loaded / total) * 100)); resolve(); };
          audio.onerror = () => { loaded++; setProgress(Math.round((loaded / total) * 100)); resolve(); };
          audio.src = url;
        } else {
          // For images
          const img = new Image();
          img.onload = () => { loaded++; setProgress(Math.round((loaded / total) * 100)); resolve(); };
          img.onerror = () => { loaded++; setProgress(Math.round((loaded / total) * 100)); resolve(); };
          img.src = url;
        }
      });
    };

    Promise.all(assetsToLoad.map(loadAsset)).then(() => {
      // Small delay for the bar to reach 100% visually
      setTimeout(() => setFadeOut(true), 400);
    });
  }, [assetsToLoad]);

  // When fade out completes, call onLoaded
  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(onLoaded, 600);
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onLoaded]);

  return (
    <AnimatePresence>
      {!fadeOut ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a1a0a]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Pixel art loading icon — animated sword/shield */}
          <motion.div
            className="mb-8"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-5xl sm:text-6xl" style={{ imageRendering: "pixelated" }}>
              🗺️
            </div>
          </motion.div>

          {/* Title */}
          <motion.p
            className="pixel-text text-emerald-300/80 text-[8px] sm:text-[9px] tracking-widest mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            LOADING WORLD...
          </motion.p>

          {/* Progress bar container */}
          <div className="w-64 sm:w-80 relative">
            {/* Outer frame — RPG style */}
            <div
              className="w-full h-6 rounded-sm relative overflow-hidden"
              style={{
                border: "2px solid #D4A853",
                background: "#1a2e1a",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5), 0 0 8px rgba(212,168,83,0.2)",
              }}
            >
              {/* Fill bar */}
              <motion.div
                className="h-full rounded-sm"
                style={{
                  background: "linear-gradient(180deg, #34D399 0%, #10B981 40%, #059669 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 0 10px rgba(16,185,129,0.4)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />

              {/* Scanline effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                }}
              />
            </div>

            {/* Percentage */}
            <p
              className="pixel-text text-[7px] text-white/60 text-center mt-2"
            >
              {progress}%
            </p>
          </div>

          {/* Rotating tips */}
          <motion.div
            className="mt-8 max-w-sm text-center px-6"
            key={tipIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <p
              className="text-white/40 text-[10px] sm:text-[11px] leading-relaxed"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {LOADING_TIPS[tipIndex]}
            </p>
          </motion.div>

          {/* Bottom decorative dots */}
          <div className="absolute bottom-8 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-emerald-500/40"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
