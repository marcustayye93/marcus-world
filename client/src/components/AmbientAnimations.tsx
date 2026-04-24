/*
 * AmbientAnimations — Lightweight CSS animations overlaid on the overworld map
 * Design: Drifting clouds, crossing birds, Coffee Shop smoke, Meta HQ shimmer
 * All positioned absolutely within the map container using percentage coordinates.
 * Uses pure CSS keyframes for performance — no heavy libraries.
 */

import { motion } from "framer-motion";

export default function AmbientAnimations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      {/* Drifting clouds — 3 at different speeds and heights */}
      <Cloud delay={0} top="3%" duration={45} size="lg" opacity={0.35} />
      <Cloud delay={15} top="8%" duration={55} size="md" opacity={0.25} />
      <Cloud delay={30} top="1%" duration={65} size="sm" opacity={0.2} />

      {/* Crossing birds — small V-shapes that fly across periodically */}
      <Bird delay={5} top="12%" duration={12} />
      <Bird delay={18} top="6%" duration={10} />
      <Bird delay={32} top="15%" duration={14} />

      {/* Coffee Shop chimney smoke */}
      <SmokeParticle x="80%" y="48%" delay={0} />
      <SmokeParticle x="81%" y="47%" delay={1.5} />
      <SmokeParticle x="79.5%" y="49%" delay={3} />

      {/* Meta HQ crystal shimmer — subtle sparkle on the emerald tower */}
      <Sparkle x="46%" y="15%" delay={0} />
      <Sparkle x="48%" y="20%" delay={2} />
      <Sparkle x="44%" y="25%" delay={4} />
      <Sparkle x="50%" y="12%" delay={1} />

      {/* Farm area — floating leaves */}
      <Leaf x="45%" y="70%" delay={0} />
      <Leaf x="52%" y="75%" delay={3} />

      {/* Music Hall — floating notes */}
      <FloatingNote x="65%" y="30%" delay={0} note="♪" />
      <FloatingNote x="68%" y="28%" delay={2} note="♫" />
      <FloatingNote x="63%" y="32%" delay={4} note="♬" />
    </div>
  );
}

/* ── Cloud ── */
function Cloud({ delay, top, duration, size, opacity }: {
  delay: number; top: string; duration: number; size: "sm" | "md" | "lg"; opacity: number;
}) {
  const w = size === "lg" ? "12%" : size === "md" ? "8%" : "5%";
  const h = size === "lg" ? "4%" : size === "md" ? "3%" : "2%";

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        top,
        width: w,
        height: h,
        background: `radial-gradient(ellipse at center, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,${opacity * 0.3}) 60%, transparent 100%)`,
        filter: "blur(2px)",
      }}
      initial={{ left: "-15%" }}
      animate={{ left: "115%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

/* ── Bird ── */
function Bird({ delay, top, duration }: { delay: number; top: string; duration: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ top, fontSize: "clamp(6px, 0.8vw, 12px)" }}
      initial={{ left: "-5%", opacity: 0 }}
      animate={{
        left: "110%",
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <motion.span
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        className="block"
        style={{ color: "#2A1A0A", opacity: 0.4 }}
      >
        ∧
      </motion.span>
    </motion.div>
  );
}

/* ── Smoke particle ── */
function SmokeParticle({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        left: x,
        top: y,
        background: "radial-gradient(circle, rgba(200,200,200,0.4) 0%, transparent 70%)",
      }}
      animate={{
        y: [0, -25, -50],
        x: [0, 5, -3],
        opacity: [0, 0.5, 0],
        scale: [0.5, 1.2, 1.8],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

/* ── Sparkle ── */
function Sparkle({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        top: y,
        fontSize: "clamp(4px, 0.5vw, 8px)",
        color: "#4ADE80",
        textShadow: "0 0 4px rgba(74,222,128,0.6)",
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      ✦
    </motion.div>
  );
}

/* ── Leaf ── */
function Leaf({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        top: y,
        fontSize: "clamp(5px, 0.6vw, 9px)",
        color: "#4a7c3f",
        opacity: 0.5,
      }}
      animate={{
        y: [0, -15, -5, -20],
        x: [0, 8, -5, 12],
        rotate: [0, 45, -30, 90],
        opacity: [0, 0.5, 0.4, 0],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      🍃
    </motion.div>
  );
}

/* ── Floating music note ── */
function FloatingNote({ x, y, delay, note }: { x: string; y: string; delay: number; note: string }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        top: y,
        fontSize: "clamp(6px, 0.7vw, 10px)",
        color: "#8B6914",
        opacity: 0.5,
      }}
      animate={{
        y: [0, -20, -40],
        x: [0, 5, -3],
        opacity: [0, 0.6, 0],
        rotate: [0, 15, -10],
      }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      {note}
    </motion.div>
  );
}
