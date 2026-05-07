/*
 * MobileBuildingList — Primary mobile navigation surface
 * Design: RPG-style vertical card grid that sits below the map on small screens
 * Enhanced: larger touch targets, clearer hierarchy, integrated action shortcuts
 */

import { motion } from "framer-motion";
import { FileText, User, MessageSquare, Mail } from "lucide-react";
import type { Zone } from "@/lib/gameData";

interface MobileBuildingListProps {
  zones: Zone[];
  discoveredZones: Set<string>;
  onZoneClick: (zone: Zone) => void;
  onSnapshotClick?: () => void;
  onAboutClick?: () => void;
  onTestimonialsClick?: () => void;
  onConnectClick?: () => void;
}

export default function MobileBuildingList({
  zones,
  discoveredZones,
  onZoneClick,
  onSnapshotClick,
  onAboutClick,
  onTestimonialsClick,
  onConnectClick,
}: MobileBuildingListProps) {
  return (
    <div
      className="w-full px-3 py-4"
      style={{
        background: "linear-gradient(180deg, #1a2e1a 0%, #0f1f0f 100%)",
        borderTop: "3px solid #2E7D32",
      }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="pixel-text text-[8px] text-emerald-400/90 tracking-widest">
          EXPLORE ZONES
        </span>
        <span className="pixel-text text-[7px] text-emerald-600/60">
          {discoveredZones.size}/{zones.length} DISCOVERED
        </span>
      </div>

      {/* Zone cards — 2-column grid for better touch targets */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {zones.map((zone, i) => {
          const isDiscovered = discoveredZones.has(zone.id);

          return (
            <motion.button
              key={zone.id}
              className="relative rounded-xl overflow-hidden text-left"
              style={{
                background: isDiscovered
                  ? "linear-gradient(135deg, rgba(46, 125, 50, 0.3), rgba(27, 94, 32, 0.4))"
                  : "linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.8))",
                border: isDiscovered
                  ? `2px solid ${zone.color}60`
                  : "2px solid rgba(255,255,255,0.08)",
                boxShadow: isDiscovered
                  ? `0 0 12px ${zone.color}20`
                  : "0 2px 8px rgba(0,0,0,0.3)",
              }}
              onClick={() => onZoneClick(zone)}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <div className="p-3">
                {/* Icon + discovered badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{zone.icon}</span>
                  {isDiscovered && (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        background: zone.color,
                        boxShadow: `0 0 6px ${zone.color}50`,
                      }}
                    >
                      <span className="text-white text-[9px] font-bold">✓</span>
                    </div>
                  )}
                </div>

                {/* Zone name */}
                <p
                  className="pixel-text text-[8px] tracking-wide leading-tight mb-1"
                  style={{ color: isDiscovered ? zone.color : "rgba(255,255,255,0.8)" }}
                >
                  {zone.name}
                </p>

                {/* Tagline */}
                <p
                  className="text-[10px] leading-snug text-white/40 line-clamp-2"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {zone.tagline}
                </p>
              </div>

              {/* Bottom color accent bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: isDiscovered
                    ? `linear-gradient(90deg, ${zone.color}, transparent)`
                    : "rgba(255,255,255,0.05)",
                }}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Quick action buttons — secondary navigation */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { icon: <FileText size={14} />, label: "Resume", onClick: onSnapshotClick, color: "#3B82F6" },
          { icon: <User size={14} />, label: "About", onClick: onAboutClick, color: "#10B981" },
          { icon: <MessageSquare size={14} />, label: "Reviews", onClick: onTestimonialsClick, color: "#F59E0B" },
          { icon: <Mail size={14} />, label: "Connect", onClick: onConnectClick, color: "#EC4899" },
        ].map((action, i) => (
          <motion.button
            key={action.label}
            className="flex flex-col items-center gap-1 py-2.5 rounded-lg"
            style={{
              background: `${action.color}15`,
              border: `1.5px solid ${action.color}40`,
            }}
            onClick={action.onClick}
            whileTap={{ scale: 0.92 }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
          >
            <span style={{ color: action.color }}>{action.icon}</span>
            <span
              className="pixel-text text-[6px] tracking-wide"
              style={{ color: action.color }}
            >
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* LinkedIn CTA for mobile */}
      <motion.a
        href="https://www.linkedin.com/in/mtye/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 py-2.5 rounded-xl w-full"
        style={{
          background: "linear-gradient(135deg, #0077B5 0%, #005885 100%)",
          border: "1.5px solid rgba(255,255,255,0.2)",
          boxShadow: "0 2px 8px rgba(0,119,181,0.3)",
        }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <span className="pixel-text text-[8px] text-white tracking-wide">
          CONNECT ON LINKEDIN
        </span>
      </motion.a>
    </div>
  );
}
