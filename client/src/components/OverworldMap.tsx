/*
 * OverworldMap — Interactive pixel art map with clickable building zones
 * Design: Top-down RPG overworld. Click on buildings to explore zones.
 * The Meta Emerald City is the grand centerpiece.
 * No character movement — pure click-to-explore.
 * v3 map has baked-in labels for: META HQ, DFS GROUP, MUSIC HALL, UNIVERSITY, COFFEE SHOP, BARN
 * 
 * MOBILE: Map is wider than viewport, users can swipe/drag horizontally to pan.
 * Starts centered on Meta HQ, with a subtle hint arrow animation.
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ASSET_URLS, type Zone } from "@/lib/gameData";
import AmbientAnimations from "@/components/AmbientAnimations";

interface OverworldMapProps {
  zones: Zone[];
  discoveredZones: Set<string>;
  onZoneClick: (zone: Zone) => void;
  onSnapshotClick?: () => void;
}

// Clickable hotspot areas over each building (percentage of map)
const BUILDING_HOTSPOTS: Record<string, {
  x: number; y: number; w: number; h: number;
}> = {
  meta:       { x: 35, y: 5,  w: 25, h: 52 },
  dfs:        { x: 8,  y: 12, w: 18, h: 32 },
  music:      { x: 57, y: 22, w: 20, h: 32 },
  university: { x: 12, y: 50, w: 22, h: 30 },
  farm:       { x: 40, y: 65, w: 22, h: 22 },
  coffee:     { x: 68, y: 52, w: 22, h: 26 },
};

// Year-only subtitles positioned cleanly below each baked-in label
const YEAR_LABELS: Array<{
  year: string;
  x: number;
  y: number;
  isCareer?: boolean;
}> = [
  { year: "2024–PRESENT", x: 47.5, y: 49, isCareer: true },
  { year: "2019–2024",    x: 17,   y: 50, isCareer: true },
  { year: "2006–PRESENT", x: 67,   y: 59 },
  { year: "2015–2019",    x: 22,   y: 84, isCareer: true },
  { year: "2019",         x: 50,   y: 87 },
  { year: "2016–2018",    x: 78,   y: 81 },
];

function WoodenPlaqueLabel({ text }: { text: string }) {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #D4C4A0 0%, #C8B88A 50%, #BCA87A 100%)",
        border: "3px solid #3D2B1A",
        outline: "1px solid #8B7355",
        outlineOffset: "-5px",
        boxShadow: "2px 3px 0px rgba(0,0,0,0.5), inset 0 1px 0px rgba(255,255,255,0.3), inset 0 -1px 0px rgba(0,0,0,0.15)",
        padding: "3px 10px 2px 10px",
        lineHeight: 1,
        imageRendering: "pixelated" as any,
      }}
    >
      <span
        className="pixel-text"
        style={{
          color: "#2A1A0A",
          fontSize: "clamp(6px, 0.9vw, 12px)",
          letterSpacing: "2px",
          textShadow: "none",
          display: "block",
          textAlign: "center",
        }}
      >
        {text}
      </span>
    </div>
  );
}

export default function OverworldMap({ zones, discoveredZones, onZoneClick, onSnapshotClick }: OverworldMapProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Touch panning state
  const x = useMotionValue(0);
  const touchStartX = useRef(0);
  const touchStartMotionX = useRef(0);
  const isDragging = useRef(false);
  const dragDistance = useRef(0);

  // Mobile: map is 260vw wide so ALL buildings are fully visible when swiping
  // DFS Group & University on the far left, Coffee Shop on the far right
  const MAP_WIDTH_VW = 260;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Center the map on Meta HQ initially (Meta is at ~47.5% of map width)
  useEffect(() => {
    if (isMobile) {
      const viewportWidth = window.innerWidth;
      const mapWidth = (MAP_WIDTH_VW / 100) * viewportWidth;
      const metaCenterX = 0.475 * mapWidth;
      const initialX = -(metaCenterX - viewportWidth / 2);
      const maxDrag = -(mapWidth - viewportWidth);
      const clampedX = Math.max(maxDrag, Math.min(0, initialX));
      x.set(clampedX);
    }
  }, [isMobile, x]);

  // Hide swipe hint after first interaction
  const hideHint = useCallback(() => {
    if (showSwipeHint) setShowSwipeHint(false);
  }, [showSwipeHint]);

  const getClampedX = useCallback((rawX: number) => {
    if (!isMobile) return 0;
    const viewportWidth = window.innerWidth;
    const mapWidth = (MAP_WIDTH_VW / 100) * viewportWidth;
    const maxDrag = -(mapWidth - viewportWidth);
    return Math.max(maxDrag, Math.min(0, rawX));
  }, [isMobile]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartMotionX.current = x.get();
    isDragging.current = false;
    dragDistance.current = 0;
  }, [x]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const deltaX = e.touches[0].clientX - touchStartX.current;
    dragDistance.current = Math.abs(deltaX);
    if (dragDistance.current > 5) {
      isDragging.current = true;
      hideHint();
    }
    const newX = touchStartMotionX.current + deltaX;
    x.set(getClampedX(newX));
  }, [x, getClampedX, hideHint]);

  const handleTouchEnd = useCallback(() => {
    // Snap with momentum
    const currentX = x.get();
    const clampedX = getClampedX(currentX);
    if (currentX !== clampedX) {
      animate(x, clampedX, { type: "spring", stiffness: 300, damping: 30 });
    }
    // Reset drag state after a short delay to prevent click-through
    setTimeout(() => {
      isDragging.current = false;
    }, 50);
  }, [x, getClampedX]);

  const handleZoneClick = useCallback((zone: Zone) => {
    // On mobile, don't trigger click if user was dragging/swiping
    if (isMobile && dragDistance.current > 10) return;
    onZoneClick(zone);
  }, [isMobile, onZoneClick]);

  // Desktop: normal layout. Mobile: wider pannable map.
  const mapStyle = isMobile
    ? { width: `${MAP_WIDTH_VW}vw`, height: "100%" }
    : { width: "100%", height: "100%" };

  return (
    <div
      className="relative w-full select-none overflow-hidden"
      style={{ height: "calc(100vh - 85px)", marginTop: "85px" }}
      ref={containerRef}
    >
      {/* Pannable map container */}
      <motion.div
        className="relative h-full"
        style={isMobile ? { x, ...mapStyle } : mapStyle}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
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

        {/* Ambient animations — clouds, birds, smoke, sparkles */}
        <AmbientAnimations />

        {/* Year subtitles below each building's baked-in label */}
        {YEAR_LABELS.map((label, i) => (
          <div
            key={`year-${i}`}
            className="absolute z-[15] pointer-events-none"
            style={{
              left: `${label.x}%`,
              top: `${label.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              style={{
                background: label.isCareer
                  ? "linear-gradient(180deg, rgba(139, 105, 20, 0.9) 0%, rgba(100, 75, 10, 0.95) 100%)"
                  : "rgba(42, 26, 10, 0.75)",
                borderRadius: label.isCareer ? "3px" : "2px",
                padding: label.isCareer ? "2px 8px" : "1px 6px",
                boxShadow: label.isCareer
                  ? "1px 2px 0px rgba(0,0,0,0.4), inset 0 1px 0px rgba(255,215,0,0.3)"
                  : "1px 1px 0px rgba(0,0,0,0.3)",
                border: label.isCareer ? "1px solid rgba(255, 215, 0, 0.4)" : "none",
              }}
            >
              <span
                className="pixel-text"
                style={{
                  color: label.isCareer ? "#FFD700" : "#D4C4A0",
                  fontSize: isMobile ? "clamp(5px, 1.2vw, 10px)" : "clamp(5px, 0.65vw, 8px)",
                  letterSpacing: "1.5px",
                  textAlign: "center",
                  display: "block",
                }}
              >
                {label.year}
              </span>
            </div>
          </div>
        ))}

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
              onClick={() => handleZoneClick(zone)}
              onMouseEnter={() => setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover glow effect */}
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

              {/* Floating tooltip on hover (desktop only) */}
              {!isMobile && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                  style={isMeta ? { top: "calc(100% + 8px)" } : { bottom: "calc(100% + 8px)" }}
                  initial={{ opacity: 0, y: isMeta ? -8 : 8 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : (isMeta ? -8 : 8) }}
                  transition={{ duration: 0.2 }}
                >
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
                    <span className="pixel-text text-[7px] sm:text-[8px] text-white">
                      {zone.name}
                    </span>
                    <p
                      className="text-[10px] text-white/60 mt-0.5"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      {zone.tagline}
                    </p>
                  </div>
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
              )}

              {/* Pulsing indicator for undiscovered zones */}
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
            style={{ left: "1%", top: "1%", width: isMobile ? "8%" : "5.5%", height: "10%" }}
            onClick={onSnapshotClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            title="Marcus at a Glance"
          >
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
                  One-sheet résumé snapshot
                </p>
              </div>
            </motion.div>
          </motion.button>
        )}
      </motion.div>

      {/* Mobile swipe hint — shows on first load, fades after interaction */}
      {isMobile && showSwipeHint && (
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div
            className="px-4 py-2.5 rounded-full flex items-center gap-2"
            style={{
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <motion.span
              animate={{ x: [-8, 8, -8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-lg"
            >
              👆
            </motion.span>
            <span className="pixel-text text-[7px] text-white/90">
              SWIPE TO EXPLORE MAP
            </span>
          </div>
        </motion.div>
      )}

      {/* Desktop instruction hint at bottom */}
      {!isMobile && (
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
            <span className="pixel-text text-[6px] sm:text-[7px] text-white/80">
              CLICK ON BUILDINGS TO EXPLORE
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
