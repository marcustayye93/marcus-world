/*
 * MapNPCs — Pixel art NPC characters scattered around the overworld map
 * Design: Small animated pixel characters near buildings who show speech bubbles
 * with short testimonial snippets when clicked. Adds life to the map.
 * Positioned using percentage coordinates to match the map layout.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playClick } from "@/lib/sfx";

interface NPC {
  id: string;
  emoji: string;
  name: string;
  snippet: string;
  x: number; // percentage
  y: number; // percentage
  idleAnimation: "bounce" | "sway" | "nod";
}

const NPCS: NPC[] = [
  {
    id: "robert",
    emoji: "👔",
    name: "Robert C.",
    snippet: "\"A truly rare talent — smart, driven, and naturally curious!\"",
    x: 25,
    y: 38,
    idleAnimation: "sway",
  },
  {
    id: "meenal",
    emoji: "👩‍💼",
    name: "Meenal K.",
    snippet: "\"Marcus can do anything he puts his mind to.\"",
    x: 62,
    y: 48,
    idleAnimation: "bounce",
  },
  {
    id: "monique",
    emoji: "👩‍🔬",
    name: "Monique C.",
    snippet: "\"Quick to spot opportunities and come up with creative ideas!\"",
    x: 35,
    y: 78,
    idleAnimation: "nod",
  },
  {
    id: "irsyad",
    emoji: "👨‍💻",
    name: "Irsyad R.",
    snippet: "\"You could not ask for a harder worker than Marcus.\"",
    x: 82,
    y: 38,
    idleAnimation: "sway",
  },
];

const IDLE_VARIANTS = {
  bounce: {
    y: [0, -4, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
  },
  sway: {
    x: [-2, 2, -2],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
  },
  nod: {
    rotate: [-3, 3, -3],
    transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" as const },
  },
};

export default function MapNPCs() {
  const [activeNPC, setActiveNPC] = useState<string | null>(null);

  const handleNPCClick = (npcId: string) => {
    playClick();
    setActiveNPC(activeNPC === npcId ? null : npcId);
  };

  return (
    <div className="absolute inset-0 z-[12] pointer-events-none">
      {NPCS.map((npc) => {
        const isActive = activeNPC === npc.id;

        return (
          <div
            key={npc.id}
            className="absolute pointer-events-auto"
            style={{
              left: `${npc.x}%`,
              top: `${npc.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* NPC character */}
            <motion.button
              className="relative cursor-pointer flex flex-col items-center"
              onClick={() => handleNPCClick(npc.id)}
              animate={IDLE_VARIANTS[npc.idleAnimation]}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Pixel shadow */}
              <div
                className="absolute -bottom-1 w-5 h-1.5 rounded-full opacity-30"
                style={{ background: "rgba(0,0,0,0.4)", filter: "blur(1px)" }}
              />

              {/* Character body */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: "clamp(20px, 2.5vw, 32px)",
                  height: "clamp(20px, 2.5vw, 32px)",
                  fontSize: "clamp(12px, 1.5vw, 20px)",
                  background: "linear-gradient(180deg, rgba(250,246,238,0.9), rgba(245,237,216,0.9))",
                  border: "2px solid #3D2B1A",
                  borderRadius: "6px",
                  boxShadow: "1px 2px 0 rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
                  imageRendering: "pixelated" as any,
                }}
              >
                {npc.emoji}
              </div>

              {/* Interaction hint — small exclamation */}
              {!isActive && (
                <motion.div
                  className="absolute -top-2 -right-1"
                  animate={{ y: [0, -3, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <span
                    className="pixel-text block"
                    style={{
                      fontSize: "clamp(5px, 0.5vw, 8px)",
                      color: "#F59E0B",
                      textShadow: "0 0 3px rgba(245,158,11,0.5)",
                    }}
                  >
                    !
                  </span>
                </motion.div>
              )}
            </motion.button>

            {/* Speech bubble */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-auto"
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveNPC(null)}
                >
                  <div
                    className="relative px-3 py-2 rounded-lg whitespace-normal cursor-pointer"
                    style={{
                      background: "linear-gradient(180deg, #faf6ee, #f5edd8)",
                      border: "2px solid #3D2B1A",
                      boxShadow: "2px 3px 0 rgba(0,0,0,0.2)",
                      width: "clamp(140px, 14vw, 200px)",
                    }}
                  >
                    {/* Name tag */}
                    <span
                      className="pixel-text block mb-1"
                      style={{
                        fontSize: "clamp(5px, 0.5vw, 7px)",
                        color: "#2E7D32",
                        letterSpacing: "1px",
                      }}
                    >
                      {npc.name}
                    </span>

                    {/* Quote */}
                    <p
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: "clamp(8px, 0.7vw, 11px)",
                        color: "#3D2B1A",
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      {npc.snippet}
                    </p>

                    {/* Speech bubble tail */}
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2"
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderTop: "6px solid #3D2B1A",
                      }}
                    />
                    <div
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{
                        top: "calc(100% - 1px)",
                        width: 0,
                        height: 0,
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: "5px solid #f5edd8",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
