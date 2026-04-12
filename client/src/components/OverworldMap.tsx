/*
 * OverworldMap — The main interactive pixel art map
 * Design: Top-down RPG overworld with clickable zone buildings
 * Zone icons overlay on top of the actual buildings in the pixel art map
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ASSET_URLS, type Zone } from "@/lib/gameData";

interface OverworldMapProps {
  zones: Zone[];
  discoveredZones: Set<string>;
  onZoneClick: (zone: Zone) => void;
}

// Zone positions aligned to buildings in the overworld map image
const ZONE_POSITIONS: Record<string, { x: number; y: number }> = {
  meta: { x: 16, y: 30 },
  dfs: { x: 40, y: 22 },
  music: { x: 63, y: 35 },
  coffee: { x: 78, y: 62 },
  farm: { x: 50, y: 78 },
  university: { x: 24, y: 65 },
};

export default function OverworldMap({ zones, discoveredZones, onZoneClick }: OverworldMapProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    <div className="relative w-full" style={{ height: "calc(100vh - 60px)", marginTop: "60px" }}>
      {/* Map background */}
      <div
        className="absolute inset-0 pixel-render"
        style={{
          backgroundImage: `url(${ASSET_URLS.overworld})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Zone hotspots */}
      {zones.map((zone, idx) => {
        const pos = ZONE_POSITIONS[zone.id];
        if (!pos) return null;
        const isDiscovered = discoveredZones.has(zone.id);
        const isHovered = hoveredZone === zone.id;

        return (
          <motion.button
            key={zone.id}
            className="absolute z-10 group"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => onZoneClick(zone)}
            onMouseEnter={() => setHoveredZone(zone.id)}
            onMouseLeave={() => setHoveredZone(null)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + idx * 0.1, type: "spring", stiffness: 200 }}
          >
            {/* Pulsing glow ring */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${zone.color}50 0%, transparent 70%)`,
                width: "100px",
                height: "100px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: isHovered ? [1, 1.4, 1] : [1, 1.15, 1],
                opacity: isHovered ? [0.5, 0.8, 0.5] : [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Icon bubble */}
            <motion.div
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl"
              style={{
                background: isDiscovered
                  ? `linear-gradient(135deg, ${zone.color}30, ${zone.color}50)`
                  : "rgba(255,255,255,0.9)",
                border: `3px solid ${zone.color}`,
                boxShadow: isHovered
                  ? `0 0 24px ${zone.color}50, 0 6px 24px rgba(0,0,0,0.25)`
                  : `0 4px 12px rgba(0,0,0,0.2)`,
                transition: "box-shadow 0.3s ease",
              }}
              animate={isHovered ? { y: [0, -5, 0] } : { y: 0 }}
              transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
            >
              {zone.icon}
              {isDiscovered && (
                <motion.div
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <span className="text-white text-[9px] font-bold">✓</span>
                </motion.div>
              )}
            </motion.div>

            {/* Zone name label below icon */}
            <div className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap mt-1.5 top-full">
              <motion.div
                className="px-2.5 py-1 rounded-md text-center"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  border: `2px solid ${zone.color}`,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                }}
                animate={{ opacity: isHovered ? 1 : 0.75 }}
              >
                <span
                  className="pixel-text text-[6px] sm:text-[7px] block leading-none"
                  style={{ color: zone.color }}
                >
                  {zone.name}
                </span>
              </motion.div>
            </div>

            {/* Hover tooltip with tagline */}
            {isHovered && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className="px-4 py-2.5 rounded-xl max-w-[220px] text-center"
                  style={{
                    background: "rgba(255,255,255,0.96)",
                    border: "3px solid #333",
                    boxShadow: "3px 3px 0 rgba(0,0,0,0.2)",
                  }}
                >
                  <p
                    className="text-[11px] font-bold text-gray-700 leading-snug mb-1"
                    style={{ fontFamily: "'Nunito', sans-serif", whiteSpace: "normal" }}
                  >
                    {zone.tagline}
                  </p>
                  <p className="pixel-text text-[5px] text-gray-400">
                    CLICK TO EXPLORE
                  </p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[7px] border-l-transparent border-r-transparent border-t-white" />
              </motion.div>
            )}
          </motion.button>
        );
      })}

      {/* Floating decorative elements */}
      {[
        { emoji: "🦋", x: 8, y: 15, dur: 4 },
        { emoji: "🍃", x: 88, y: 25, dur: 5 },
        { emoji: "🌸", x: 35, y: 50, dur: 6 },
        { emoji: "✨", x: 55, y: 15, dur: 3.5 },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none opacity-50"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
          animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: item.dur, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-lg">{item.emoji}</span>
        </motion.div>
      ))}

      {/* Bottom instruction bar */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div
          className="px-5 py-2.5 rounded-xl hidden sm:block"
          style={{
            background: "rgba(255,255,255,0.92)",
            border: "3px solid #333",
            boxShadow: "3px 3px 0 rgba(0,0,0,0.15)",
          }}
        >
          <p className="pixel-text text-[7px] text-center text-gray-600">
            CLICK A ZONE TO EXPLORE &bull; ESC TO CLOSE &bull; TRY THE KONAMI CODE ↑↑↓↓←→←→BA
          </p>
        </div>
      </motion.div>
    </div>
  );
}
