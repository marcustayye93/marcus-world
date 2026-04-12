/*
 * OverworldMap — Interactive pixel art map with clickable building zones
 * Design: Top-down RPG overworld. Click on buildings to explore zones.
 * The Meta Emerald City is the grand centerpiece.
 * No character movement — pure click-to-explore.
 * The map image has baked-in brown wooden sign labels, so we use
 * invisible hotspots with hover glow effects instead of overlay labels.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ASSET_URLS, type Zone } from "@/lib/gameData";

interface OverworldMapProps {
  zones: Zone[];
  discoveredZones: Set<string>;
  onZoneClick: (zone: Zone) => void;
  onSnapshotClick?: () => void;
}

// Clickable hotspot areas over each building (percentage of map)
// These match the actual building positions in the overworld-v2 image
const BUILDING_HOTSPOTS: Record<string, {
  x: number; y: number; w: number; h: number;
}> = {
  meta:       { x: 35, y: 5,  w: 25, h: 52 },   // Emerald City — center, massive
  dfs:        { x: 8,  y: 12, w: 18, h: 32 },   // Tech Co. — upper left
  music:      { x: 57, y: 22, w: 20, h: 32 },   // Music Hall — right of center
  university: { x: 12, y: 50, w: 22, h: 30 },   // University — lower left
  farm:       { x: 40, y: 60, w: 22, h: 25 },   // Barn — lower center
  coffee:     { x: 70, y: 50, w: 18, h: 24 },   // Coffee Shop — lower right
};

// Special zones that aren't regular Zone objects (handled separately)
const SPECIAL_HOTSPOTS: Record<string, {
  x: number; y: number; w: number; h: number;
  label: string; color: string;
}> = {
  // The compass/scroll icon in the top-left corner of the map image
  snapshot: { x: 0, y: 0, w: 7, h: 12, label: "📋", color: "#8B6914" },
};

export default function OverworldMap({ zones, discoveredZones, onZoneClick, onSnapshotClick }: OverworldMapProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    <div
      className="relative w-full select-none"
      style={{ height: "calc(100vh - 60px)", marginTop: "60px" }}
    >
      {/* Map background */}
      <div
        className="absolute inset-0 pixel-render"
        style={{
          backgroundImage: `url(${ASSET_URLS.overworld})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Permanent META HQ label — matching the baked-in wooden sign style */}
      <div
        className="absolute z-[5] pointer-events-none flex justify-center"
        style={{ left: "35%", top: "55%", width: "25%" }}
      >
        <div
          className="px-3 py-0.5 sm:px-5 sm:py-1"
          style={{
            background: "#C4A67D",
            border: "3px solid #8B7355",
            borderTop: "2px solid #D4BC9A",
            borderLeft: "2px solid #D4BC9A",
            borderRight: "3px solid #7A6548",
            borderBottom: "3px solid #7A6548",
            borderRadius: "0px",
            imageRendering: "pixelated" as any,
            boxShadow: "1px 2px 0px rgba(0,0,0,0.25)",
          }}
        >
          <span
            className="pixel-text text-[8px] sm:text-[10px] md:text-[12px]"
            style={{
              color: "#2D1F0E",
              letterSpacing: "3px",
              textShadow: "0.5px 0.5px 0px rgba(210,190,160,0.4)",
            }}
          >
            META HQ
          </span>
        </div>
      </div>

      {/* Clickable building hotspots */}
      {zones.map((zone) => {
        const hotspot = BUILDING_HOTSPOTS[zone.id];
        if (!hotspot) return null;
        const isDiscovered = discoveredZones.has(zone.id);
        const isHovered = hoveredZone === zone.id;
        const isMeta = zone.id === "meta";

        return (
          <motion.button
            key={zone.id}
            className="absolute z-10 rounded-lg cursor-pointer"
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              width: `${hotspot.w}%`,
              height: `${hotspot.h}%`,
            }}
            onClick={() => onZoneClick(zone)}
            onMouseEnter={() => setHoveredZone(zone.id)}
            onMouseLeave={() => setHoveredZone(null)}
            whileTap={{ scale: 0.98 }}
          >
            {/* Hover glow effect — subtle radial glow around the building */}
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${zone.color}35 0%, ${zone.color}15 40%, transparent 70%)`,
                border: `2px solid ${zone.color}50`,
                boxShadow: `0 0 20px ${zone.color}30, inset 0 0 20px ${zone.color}15`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* Discovered checkmark badge */}
            {isDiscovered && (
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center z-20"
                style={{
                  background: zone.color,
                  border: "2px solid white",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <span className="text-white text-xs font-bold">✓</span>
              </motion.div>
            )}

            {/* Floating tooltip on hover — positioned BELOW for Meta (since it's at the top), ABOVE for others */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
              style={isMeta ? { top: "calc(100% + 8px)" } : { bottom: "calc(100% + 8px)" }}
              initial={{ opacity: 0, y: isMeta ? -8 : 8 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : (isMeta ? -8 : 8) }}
              transition={{ duration: 0.2 }}
            >
              {/* Arrow on top for Meta tooltip */}
              {isMeta && (
                <div
                  className="w-0 h-0 mx-auto mb-0"
                  style={{
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderBottom: "6px solid rgba(0,0,0,0.85)",
                  }}
                />
              )}
              <div
                className="px-3 py-2 rounded-lg whitespace-nowrap text-center"
                style={{
                  background: "rgba(0,0,0,0.85)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <span className="text-sm mr-1.5">{zone.icon}</span>
                <span
                  className="pixel-text text-[7px] sm:text-[8px] text-white"
                >
                  {zone.name}
                </span>
                <p
                  className="text-[10px] text-white/60 mt-0.5"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {zone.tagline}
                </p>
              </div>
              {/* Arrow on bottom for non-Meta tooltips */}
              {!isMeta && (
                <div
                  className="w-0 h-0 mx-auto"
                  style={{
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "6px solid rgba(0,0,0,0.85)",
                  }}
                />
              )}
            </motion.div>

            {/* Pulsing "click me" indicator for undiscovered zones */}
            {!isDiscovered && !isHovered && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0.2, 0.6],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${zone.color}50 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            )}
          </motion.button>
        );
      })}

      {/* Résumé Snapshot button — floating scroll/parchment style */}
      {onSnapshotClick && (
        <motion.button
          className="absolute z-20 cursor-pointer group"
          style={{ left: "1%", top: "1%", width: "5.5%", height: "10%" }}
          onClick={onSnapshotClick}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          title="Marcus at a Glance"
        >
          {/* Hover tooltip */}
          <motion.div
            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-30 pointer-events-none whitespace-nowrap"
            initial={{ opacity: 0, x: -8 }}
            whileHover={{ opacity: 1, x: 0 }}
          >
            <div
              className="px-3 py-2 rounded-lg"
              style={{
                background: "rgba(0,0,0,0.85)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <span className="pixel-text text-[7px] sm:text-[8px] text-white">
                MARCUS AT A GLANCE
              </span>
              <p
                className="text-[10px] text-white/60 mt-0.5"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                One-sheet r\u00e9sum\u00e9 snapshot
              </p>
            </div>
          </motion.div>
        </motion.button>
      )}

      {/* Instruction hint at bottom */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div
          className="px-4 py-2 rounded-full"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
          }}
        >
          <span
            className="pixel-text text-[6px] sm:text-[7px] text-white/80"
          >
            CLICK ON BUILDINGS TO EXPLORE
          </span>
        </div>
      </motion.div>
    </div>
  );
}
