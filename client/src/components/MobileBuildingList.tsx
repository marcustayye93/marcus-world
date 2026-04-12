/*
 * MobileBuildingList — Visible scrollable building strip for mobile users
 * Design: RPG-style horizontal card strip that sits below the map on small screens
 * Always visible (no hamburger menu needed), making buildings easy to tap
 */

import { motion } from "framer-motion";
import type { Zone } from "@/lib/gameData";

interface MobileBuildingListProps {
  zones: Zone[];
  discoveredZones: Set<string>;
  onZoneClick: (zone: Zone) => void;
}

export default function MobileBuildingList({ zones, discoveredZones, onZoneClick }: MobileBuildingListProps) {
  return (
    <div
      className="w-full px-3 py-3"
      style={{
        background: "linear-gradient(180deg, #1a2e1a 0%, #0f1f0f 100%)",
        borderTop: "3px solid #2E7D32",
      }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="pixel-text text-[7px] text-emerald-400/80 tracking-widest">
          TAP TO EXPLORE
        </span>
        <span className="pixel-text text-[6px] text-emerald-600/60">
          {discoveredZones.size}/{zones.length} DISCOVERED
        </span>
      </div>

      {/* Scrollable building cards */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {zones.map((zone, i) => {
          const isDiscovered = discoveredZones.has(zone.id);

          return (
            <motion.button
              key={zone.id}
              className="flex-shrink-0 relative rounded-lg overflow-hidden text-left"
              style={{
                width: "130px",
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
              transition={{ delay: i * 0.05 }}
            >
              {/* Card content */}
              <div className="p-2.5">
                {/* Icon + discovered badge */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">{zone.icon}</span>
                  {isDiscovered && (
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center"
                      style={{
                        background: zone.color,
                        boxShadow: `0 0 6px ${zone.color}50`,
                      }}
                    >
                      <span className="text-white text-[8px] font-bold">✓</span>
                    </div>
                  )}
                </div>

                {/* Zone name */}
                <p
                  className="pixel-text text-[7px] tracking-wide leading-tight mb-0.5"
                  style={{ color: isDiscovered ? zone.color : "rgba(255,255,255,0.7)" }}
                >
                  {zone.name}
                </p>

                {/* Tagline */}
                <p
                  className="text-[9px] leading-tight text-white/40 line-clamp-2"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {zone.tagline}
                </p>
              </div>

              {/* Bottom color accent bar */}
              <div
                className="h-0.5 w-full"
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
    </div>
  );
}
