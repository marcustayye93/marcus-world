/*
 * CompletionBanner — Celebration when all zones are discovered
 * Design: RPG quest completion screen with confetti particle burst
 * Upgraded: Added 40 confetti particles that burst outward, plus a completion fanfare sound
 */

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface CompletionBannerProps {
  onDismiss: () => void;
}

// Generate confetti particles with random properties
function useConfetti(count: number) {
  return useMemo(() => {
    const colors = ["#F59E0B", "#EF4444", "#3B82F6", "#10B981", "#8B5CF6", "#EC4899", "#FCD34D", "#14B8A6"];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      x: (Math.random() - 0.5) * 600,
      y: -(Math.random() * 400 + 100),
      rotation: Math.random() * 720 - 360,
      delay: Math.random() * 0.3,
      duration: 1.5 + Math.random() * 1.5,
      size: 4 + Math.random() * 6,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    }));
  }, [count]);
}

export default function CompletionBanner({ onDismiss }: CompletionBannerProps) {
  const confetti = useConfetti(50);

  // Play completion fanfare
  useEffect(() => {
    try {
      const ctx = new AudioContext();
      // Epic 6-note fanfare: C5 → E5 → G5 → C6 → E6 → G6
      const notes = [523, 659, 784, 1047, 1319, 1568];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.35);
      });
    } catch {
      // Audio not available
    }
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onDismiss} />

      {/* Confetti burst */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              width: c.size,
              height: c.shape === "rect" ? c.size * 0.4 : c.size,
              borderRadius: c.shape === "circle" ? "50%" : "1px",
              background: c.color,
            }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{
              x: c.x,
              y: c.y,
              opacity: [1, 1, 0],
              rotate: c.rotation,
              scale: [1, 1, 0.5],
            }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative text-center z-10 max-w-md"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
      >
        {/* Floating celebration emojis */}
        {["🎉", "⭐", "🏆", "✨", "🎊", "💫"].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl pointer-events-none"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${-20 + (i % 2 === 0 ? 0 : -15)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 20, -20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            {emoji}
          </motion.div>
        ))}

        <div
          className="px-8 py-8 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #faf6ee, #fff8e1)",
            border: "4px solid #F59E0B",
            boxShadow: "0 0 0 2px #faf6ee, 0 0 0 6px #F59E0B, 0 0 40px rgba(245,158,11,0.3), 6px 6px 0 rgba(0,0,0,0.2)",
          }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🏆
          </motion.div>

          <h2 className="pixel-text text-amber-700 text-sm sm:text-base mb-3">
            QUEST COMPLETE!
          </h2>

          <p
            className="text-[#4a4540] text-sm sm:text-base leading-relaxed mb-4"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            You've explored every zone in The Journey of Marcus! You now know about his career at Meta, his DFS journey, his musical talents, his coffee obsession, his farming adventures, and his academic path.
          </p>

          <p
            className="text-[#8B7355] text-xs italic mb-6"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Want to connect? Check out the Connect section to reach Marcus directly!
          </p>

          <motion.button
            onClick={onDismiss}
            className="pixel-text text-[9px] sm:text-[10px] px-6 py-3 rounded-xl text-white
                       bg-gradient-to-b from-amber-500 to-amber-700 border-b-3 border-amber-900
                       hover:from-amber-400 hover:to-amber-600 transition-all shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AWESOME!
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
