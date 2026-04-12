/*
 * HUD — Heads-Up Display bar at the top
 * Design: RPG-style status bar with zone progress, navigation buttons
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
      className="fixed top-0 left-0 right-0 z-40 h-[56px] sm:h-[60px]"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
    >
      <div
        className="h-full flex items-center justify-between px-3 sm:px-5"
        style={{
          background: "linear-gradient(180deg, rgba(6,78,59,0.95) 0%, rgba(4,60,45,0.97) 100%)",
          borderBottom: "3px solid #022c22",
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

        {/* Right: Nav buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {onSnapshotClick && (
            <HUDButton icon={<FileText size={13} />} label="RESUME" onClick={onSnapshotClick} />
          )}
          <HUDButton icon={<User size={13} />} label="ABOUT" onClick={onAboutClick} />
          <HUDButton icon={<MessageSquare size={13} />} label="TESTIMONIALS" onClick={onTestimonialsClick} />
          {onConnectClick && (
            <HUDButton icon={<Mail size={13} />} label="CONNECT" onClick={onConnectClick} />
          )}
          <HUDButton icon={<Lightbulb size={13} />} label="HINT" onClick={onHintClick} className="hidden sm:flex" />
          {onToggleMusic && (
            <HUDButton
              icon={musicMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              label={musicMuted ? "UNMUTE" : "MUTE"}
              onClick={onToggleMusic}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function HUDButton({
  icon,
  label,
  onClick,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg
                 transition-all ${className}`}
      style={{
        background: "rgba(250, 204, 21, 0.25)",
        border: "1.5px solid rgba(250, 204, 21, 0.5)",
        color: "#FDE68A",
        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
      }}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(250, 204, 21, 0.4)" }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span className="pixel-text text-[5px] sm:text-[6px] hidden sm:inline">{label}</span>
    </motion.button>
  );
}
