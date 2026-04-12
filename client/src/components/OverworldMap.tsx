/*
 * OverworldMap — Interactive pixel art map with WASD character movement
 * Design: Top-down RPG overworld. Character walks around and enters zones by colliding with buildings.
 * The Meta Emerald City is the grand centerpiece.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSET_URLS, ZONE_HITBOXES, ZONE_LABEL_POSITIONS, type Zone } from "@/lib/gameData";

interface OverworldMapProps {
  zones: Zone[];
  discoveredZones: Set<string>;
  onZoneClick: (zone: Zone) => void;
}

const CHAR_SIZE = 32; // px
const MOVE_SPEED = 0.6; // % per frame
const FRAME_MS = 16;

// Character sprite directions
type Direction = "down" | "up" | "left" | "right";

export default function OverworldMap({ zones, discoveredZones, onZoneClick }: OverworldMapProps) {
  // Character position as percentage of map
  const [charPos, setCharPos] = useState({ x: 35, y: 82 });
  const [direction, setDirection] = useState<Direction>("up");
  const [isMoving, setIsMoving] = useState(false);
  const [nearZone, setNearZone] = useState<Zone | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const keysRef = useRef<Set<string>>(new Set());
  const animFrameRef = useRef<number>(0);
  const mapRef = useRef<HTMLDivElement>(null);

  // Track which keys are held
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
        e.preventDefault();
        keysRef.current.add(key);
      }
      // Enter key to enter a zone
      if ((e.key === "Enter" || e.key === " ") && nearZone) {
        e.preventDefault();
        onZoneClick(nearZone);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [nearZone, onZoneClick]);

  // Check if position is inside a zone hitbox (with proximity margin)
  const checkZoneProximity = useCallback((x: number, y: number): Zone | null => {
    const margin = 3; // proximity margin in %
    for (const zone of zones) {
      const hb = ZONE_HITBOXES[zone.id];
      if (!hb) continue;
      if (
        x >= hb.x1 - margin && x <= hb.x2 + margin &&
        y >= hb.y1 - margin && y <= hb.y2 + margin
      ) {
        return zone;
      }
    }
    return null;
  }, [zones]);

  // Check if position is inside a building (solid collision)
  const isInsideBuilding = useCallback((x: number, y: number): boolean => {
    for (const zone of zones) {
      const hb = ZONE_HITBOXES[zone.id];
      if (!hb) continue;
      // Shrink hitbox slightly for collision (don't block at edges)
      const shrink = 1;
      if (
        x >= hb.x1 + shrink && x <= hb.x2 - shrink &&
        y >= hb.y1 + shrink && y <= hb.y2 - shrink
      ) {
        return true;
      }
    }
    return false;
  }, [zones]);

  // Game loop
  useEffect(() => {
    const loop = () => {
      const keys = keysRef.current;
      let dx = 0;
      let dy = 0;

      if (keys.has("w") || keys.has("arrowup")) { dy = -MOVE_SPEED; }
      if (keys.has("s") || keys.has("arrowdown")) { dy = MOVE_SPEED; }
      if (keys.has("a") || keys.has("arrowleft")) { dx = -MOVE_SPEED; }
      if (keys.has("d") || keys.has("arrowright")) { dx = MOVE_SPEED; }

      // Diagonal normalization
      if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
      }

      const moving = dx !== 0 || dy !== 0;
      setIsMoving(moving);

      if (moving) {
        // Set direction
        if (Math.abs(dy) >= Math.abs(dx)) {
          setDirection(dy < 0 ? "up" : "down");
        } else {
          setDirection(dx < 0 ? "left" : "right");
        }

        setCharPos((prev) => {
          let newX = Math.max(3, Math.min(97, prev.x + dx));
          let newY = Math.max(3, Math.min(97, prev.y + dy));

          // Collision: if new position is inside a building, don't move into it
          // But allow sliding along edges
          if (isInsideBuilding(newX, newY)) {
            // Try just horizontal
            if (!isInsideBuilding(prev.x + dx, prev.y)) {
              newX = prev.x + dx;
              newY = prev.y;
            }
            // Try just vertical
            else if (!isInsideBuilding(prev.x, prev.y + dy)) {
              newX = prev.x;
              newY = prev.y + dy;
            }
            // Fully blocked
            else {
              newX = prev.x;
              newY = prev.y;
            }
          }

          return { x: newX, y: newY };
        });
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isInsideBuilding]);

  // Check zone proximity whenever character moves
  useEffect(() => {
    const zone = checkZoneProximity(charPos.x, charPos.y);
    setNearZone(zone);
    setShowPrompt(!!zone);
  }, [charPos, checkZoneProximity]);

  // Direction-based character emoji/sprite
  const getCharSprite = () => {
    const sprites: Record<Direction, string> = {
      down: "🧑",
      up: "🧑",
      left: "🧑",
      right: "🧑",
    };
    return sprites[direction];
  };

  return (
    <div
      ref={mapRef}
      className="relative w-full select-none"
      style={{ height: "calc(100vh - 60px)", marginTop: "60px" }}
      tabIndex={0}
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

      {/* Zone label overlays — subtle labels on the map */}
      {zones.map((zone) => {
        const labelPos = ZONE_LABEL_POSITIONS[zone.id];
        if (!labelPos) return null;
        const isDiscovered = discoveredZones.has(zone.id);
        const isNear = nearZone?.id === zone.id;

        return (
          <motion.button
            key={zone.id}
            className="absolute z-10"
            style={{
              left: `${labelPos.x}%`,
              top: `${labelPos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => onZoneClick(zone)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow when near */}
            {isNear && (
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${zone.color}60 0%, transparent 70%)`,
                  width: "80px",
                  height: "80px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}

            <div
              className="px-2.5 py-1.5 rounded-lg text-center transition-all duration-300"
              style={{
                background: isNear ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
                border: `2px solid ${isNear ? zone.color : "rgba(0,0,0,0.15)"}`,
                boxShadow: isNear
                  ? `0 0 16px ${zone.color}40, 0 2px 8px rgba(0,0,0,0.15)`
                  : "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <span className="text-sm mr-1">{zone.icon}</span>
              <span
                className="pixel-text text-[5px] sm:text-[6px]"
                style={{ color: isNear ? zone.color : "#555" }}
              >
                {zone.name}
              </span>
              {isDiscovered && (
                <span className="ml-1 text-emerald-500 text-[8px]">✓</span>
              )}
            </div>
          </motion.button>
        );
      })}

      {/* Character sprite */}
      <motion.div
        className="absolute z-20 pointer-events-none"
        style={{
          left: `${charPos.x}%`,
          top: `${charPos.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={isMoving ? { y: [0, -3, 0] } : {}}
        transition={isMoving ? { duration: 0.25, repeat: Infinity } : {}}
      >
        {/* Shadow */}
        <div
          className="absolute rounded-full"
          style={{
            width: "24px",
            height: "8px",
            background: "rgba(0,0,0,0.2)",
            bottom: "-4px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        {/* Character */}
        <div
          className="relative text-2xl sm:text-3xl"
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
          }}
        >
          {getCharSprite()}
        </div>
        {/* Direction indicator arrow */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 text-[10px] text-white/80 pointer-events-none"
          style={{
            top: direction === "up" ? "-14px" : undefined,
            bottom: direction === "down" ? "-14px" : undefined,
          }}
          animate={{ opacity: isMoving ? [0.5, 1, 0.5] : 0 }}
          transition={{ duration: 0.4, repeat: Infinity }}
        >
          {direction === "up" && "▲"}
          {direction === "down" && "▼"}
        </motion.div>
      </motion.div>

      {/* Zone entry prompt */}
      <AnimatePresence>
        {showPrompt && nearZone && (
          <motion.div
            className="fixed bottom-24 sm:bottom-8 left-1/2 z-30"
            style={{ transform: "translateX(-50%)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <motion.div
              className="px-5 py-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.96)",
                border: `3px solid ${nearZone.color}`,
                boxShadow: `0 0 20px ${nearZone.color}30, 4px 4px 0 rgba(0,0,0,0.15)`,
              }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{nearZone.icon}</span>
                <div>
                  <p className="pixel-text text-[7px] sm:text-[8px]" style={{ color: nearZone.color }}>
                    {nearZone.name}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {nearZone.tagline}
                  </p>
                </div>
                <motion.button
                  className="ml-2 px-3 py-1.5 rounded-lg pixel-text text-[6px] text-white"
                  style={{ background: nearZone.color }}
                  onClick={() => onZoneClick(nearZone)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ENTER
                </motion.button>
              </div>
              <p className="pixel-text text-[5px] text-gray-400 text-center mt-1.5">
                PRESS ENTER OR CLICK TO EXPLORE
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom instruction bar */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showPrompt ? 0 : 1, y: showPrompt ? 20 : 0 }}
        transition={{ delay: showPrompt ? 0 : 1.5 }}
      >
        <div
          className="px-5 py-2.5 rounded-xl hidden sm:flex items-center gap-4"
          style={{
            background: "rgba(255,255,255,0.92)",
            border: "3px solid #333",
            boxShadow: "3px 3px 0 rgba(0,0,0,0.15)",
          }}
        >
          {/* WASD keys visual */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
              <span className="pixel-text text-[5px] text-gray-600">W</span>
            </div>
            <div className="flex gap-0.5">
              <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                <span className="pixel-text text-[5px] text-gray-600">A</span>
              </div>
              <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                <span className="pixel-text text-[5px] text-gray-600">S</span>
              </div>
              <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                <span className="pixel-text text-[5px] text-gray-600">D</span>
              </div>
            </div>
          </div>
          <p className="pixel-text text-[6px] text-gray-600">
            WALK TO BUILDINGS &bull; ENTER TO EXPLORE
          </p>
        </div>
      </motion.div>

      {/* Mobile touch controls */}
      <div className="sm:hidden fixed bottom-20 left-4 z-30">
        <div className="flex flex-col items-center gap-1">
          <MobileDPadButton dir="up" keysRef={keysRef} />
          <div className="flex gap-1">
            <MobileDPadButton dir="left" keysRef={keysRef} />
            <MobileDPadButton dir="down" keysRef={keysRef} />
            <MobileDPadButton dir="right" keysRef={keysRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile D-pad button
function MobileDPadButton({
  dir,
  keysRef,
}: {
  dir: "up" | "down" | "left" | "right";
  keysRef: React.MutableRefObject<Set<string>>;
}) {
  const keyMap: Record<string, string> = {
    up: "arrowup",
    down: "arrowdown",
    left: "arrowleft",
    right: "arrowright",
  };
  const arrows: Record<string, string> = {
    up: "▲",
    down: "▼",
    left: "◀",
    right: "▶",
  };

  const handleStart = () => keysRef.current.add(keyMap[dir]);
  const handleEnd = () => keysRef.current.delete(keyMap[dir]);

  return (
    <button
      className="w-12 h-12 rounded-xl bg-white/80 border-2 border-gray-300 flex items-center justify-center
                 active:bg-gray-200 active:border-gray-400 shadow-md"
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <span className="text-gray-600 text-sm">{arrows[dir]}</span>
    </button>
  );
}
