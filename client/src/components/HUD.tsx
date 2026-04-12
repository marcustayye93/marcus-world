/*
 * HUD — Heads-Up Display bar at the top
 * Design: RPG-style status bar with zone progress, navigation buttons
 * Buttons are large, vibrant, and impossible to miss — golden RPG menu items
 * Title: "The Journey of Marcus"
 */

import { motion } from "framer-motion";
import { User, MessageSquare, Lightbulb, Map, FileText, Mail, Volume2, VolumeX } from "lucide-react";

interface HUDProps {
  discoveredZones: Set<string>;
  totalZones: number;
  easterEggs: number;
  onAboutClick: () => void;
  onTestimonialsClick: () => void;
  onHintClick: () => void;
  onSnapshotClick?: () => void;
  onConnectClick?: () => void;
  musicMuted?: boolean;
  onToggleMusic?: () => void;
}

export default function HUD({
  discoveredZones,
  totalZones,
  easterEggs,
  onAboutClick,
  onTestimonialsClick,
  onHintClick,
  onSnapshotClick,
  onConnectClick,
  musicMuted,
  onToggleMusic,
}: HUDProps) {
  const progress = discoveredZones.size;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-40"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Main HUD bar */}
      <div
        className="h-[44px] sm:h-[48px] flex items-center justify-between px-3 sm:px-5"
        style={{
          background: "linear-gradient(180deg, rgba(6,78,59,0.95) 0%, rgba(4,60,45,0.97) 100%)",
          borderBottom: "2px solid #022c22",
          boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
        }}
      >
        {/* Left: Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.span
            className="text-lg sm:text-xl"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🌍
          </motion.span>
          <div className="hidden sm:block">
            <h1 className="pixel-text text-emerald-200 text-[7px] sm:text-[8px] leading-none">
              THE JOURNEY OF MARCUS
            </h1>
            <p className="text-emerald-300/50 text-[10px] mt-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Click buildings to explore
            </p>
          </div>
        </div>

        {/* Center: Progress */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Map size={13} className="text-emerald-300/70" />
          <span className="pixel-text text-[6px] sm:text-[7px] text-emerald-200/80">
            {progress}/{totalZones}
          </span>
          <div className="w-16 sm:w-24 h-2 bg-black/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #FCD34D, #F59E0B)" }}
              initial={{ width: 0 }}
              animate={{ width: `${(progress / totalZones) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {easterEggs > 0 && (
            <motion.span
              className="pixel-text text-[7px] text-yellow-300"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              ⭐×{easterEggs}
            </motion.span>
          )}
        </div>

        {/* Right: Music toggle only */}
        <div className="flex items-center gap-1.5">
          <HUDButton icon={<Lightbulb size={13} />} label="HINT" onClick={onHintClick} className="hidden sm:flex" variant="small" />
          {onToggleMusic && (
            <HUDButton
              icon={musicMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              label={musicMuted ? "UNMUTE" : "MUTE"}
              onClick={onToggleMusic}
              variant="small"
            />
          )}
        </div>
      </div>

      {/* Navigation buttons bar — prominent, separate row */}
      <div
        className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2"
        style={{
          background: "linear-gradient(180deg, rgba(4,60,45,0.97) 0%, rgba(2,44,34,0.95) 100%)",
          borderBottom: "3px solid #022c22",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        {onSnapshotClick && (
          <NavButton icon={<FileText size={15} />} label="RESUME" onClick={onSnapshotClick} color="#3B82F6" />
        )}
        <NavButton icon={<User size={15} />} label="ABOUT" onClick={onAboutClick} color="#10B981" />
        <NavButton icon={<MessageSquare size={15} />} label="TESTIMONIALS" onClick={onTestimonialsClick} color="#F59E0B" />
        {onConnectClick && (
          <NavButton icon={<Mail size={15} />} label="CONNECT" onClick={onConnectClick} color="#EC4899" />
        )}
      </div>
    </motion.div>
  );
}

/* Small utility buttons (mute, hint) — subtle */
function HUDButton({
  icon,
  label,
  onClick,
  className = "",
  variant = "small",
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  variant?: "small";
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        color: "#A7F3D0",
      }}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span className="pixel-text text-[5px] sm:text-[6px] hidden sm:inline">{label}</span>
    </motion.button>
  );
}

/* Prominent navigation buttons — large, colorful, impossible to miss */
function NavButton({
  icon,
  label,
  onClick,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all"
      style={{
        background: `linear-gradient(135deg, ${color}30, ${color}15)`,
        border: `2px solid ${color}70`,
        color: "#FDE68A",
        boxShadow: `0 0 12px ${color}20, inset 0 1px 0 rgba(255,255,255,0.1)`,
        textShadow: "0 1px 3px rgba(0,0,0,0.5)",
      }}
      whileHover={{
        scale: 1.06,
        boxShadow: `0 0 20px ${color}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <span style={{ color }}>{icon}</span>
      <span className="pixel-text text-[6px] sm:text-[8px] tracking-wider">{label}</span>
    </motion.button>
  );
}
