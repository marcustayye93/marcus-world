/*
 * CompletionBanner — Celebration when all zones are discovered
 * Design: RPG quest completion screen with confetti-like effects
 */

import { motion } from "framer-motion";

interface CompletionBannerProps {
  onDismiss: () => void;
}

export default function CompletionBanner({ onDismiss }: CompletionBannerProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onDismiss} />

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
            className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            You've explored every zone in The Journey of Marcus! You now know about his career at Meta, his DFS journey, his musical talents, his coffee obsession, his farming adventures, and his academic path.
          </p>

          <p
            className="text-gray-500 text-xs italic mb-6"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Want to connect? Check out the About section for contact info!
          </p>

          <motion.button
            onClick={onDismiss}
            className="pixel-text text-[9px] sm:text-[10px] px-6 py-3 rounded-xl text-white
                       bg-gradient-to-b from-amber-500 to-amber-700 border-b-3 border-amber-900
                       hover:from-amber-400 hover:to-amber-600 transition-all shadow-lg"
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
