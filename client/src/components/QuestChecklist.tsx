/*
 * QuestChecklist — Collapsible RPG quest log tracking exploration objectives
 * Design: Parchment-styled panel anchored to bottom-right (desktop) or top (mobile)
 * Inspired by Chase Naidoo's Pixel Art Portfolio checklist
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Scroll } from "lucide-react";

interface QuestChecklistProps {
  discoveredZones: Set<string>;
  totalZones: number;
  resumeOpened: boolean;
  testimonialsOpened: boolean;
  aboutOpened: boolean;
  easterEggFound: boolean;
}

interface Quest {
  id: string;
  label: string;
  check: (props: QuestChecklistProps) => boolean;
}

const QUESTS: Quest[] = [
  {
    id: "explore-all",
    label: "Explore all 6 zones",
    check: (p) => p.discoveredZones.size >= p.totalZones,
  },
  {
    id: "resume",
    label: "Open the Resume Snapshot",
    check: (p) => p.resumeOpened,
  },
  {
    id: "about",
    label: "Read the About section",
    check: (p) => p.aboutOpened,
  },
  {
    id: "testimonials",
    label: "Check out Testimonials",
    check: (p) => p.testimonialsOpened,
  },
  {
    id: "easter-egg",
    label: "Find the Easter egg",
    check: (p) => p.easterEggFound,
  },
];

export default function QuestChecklist(props: QuestChecklistProps) {
  const [isOpen, setIsOpen] = useState(false);

  const completedCount = useMemo(
    () => QUESTS.filter((q) => q.check(props)).length,
    [props]
  );

  const allComplete = completedCount === QUESTS.length;

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-35 hidden md:block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
    >
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer"
        style={{
          background: allComplete
            ? "linear-gradient(135deg, rgba(245,158,11,0.9), rgba(217,119,6,0.9))"
            : "linear-gradient(135deg, rgba(6,78,59,0.92), rgba(4,60,45,0.95))",
          border: allComplete
            ? "2px solid #FCD34D"
            : "2px solid rgba(255,255,255,0.15)",
          boxShadow: allComplete
            ? "0 0 16px rgba(245,158,11,0.4)"
            : "0 4px 12px rgba(0,0,0,0.3)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Scroll size={14} className={allComplete ? "text-yellow-100" : "text-emerald-300"} />
        <span className={`pixel-text text-[7px] ${allComplete ? "text-yellow-100" : "text-emerald-200"}`}>
          QUESTS {completedCount}/{QUESTS.length}
        </span>
        {isOpen ? (
          <ChevronDown size={12} className={allComplete ? "text-yellow-200" : "text-emerald-300/70"} />
        ) : (
          <ChevronUp size={12} className={allComplete ? "text-yellow-200" : "text-emerald-300/70"} />
        )}
      </motion.button>

      {/* Expanded checklist panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 w-64"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #faf6ee 0%, #f5edd8 100%)",
                border: "3px solid #3D2B1A",
                boxShadow: "4px 4px 0 rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              {/* Header */}
              <div
                className="px-3 py-2 flex items-center gap-2"
                style={{
                  background: "linear-gradient(180deg, rgba(6,78,59,0.95), rgba(4,60,45,0.97))",
                  borderBottom: "2px solid #022c22",
                }}
              >
                <span className="text-sm">📜</span>
                <span className="pixel-text text-[7px] text-emerald-200">QUEST LOG</span>
              </div>

              {/* Quest items */}
              <div className="px-3 py-2 space-y-1.5">
                {QUESTS.map((quest) => {
                  const done = quest.check(props);
                  return (
                    <motion.div
                      key={quest.id}
                      className="flex items-center gap-2"
                      initial={false}
                      animate={{ opacity: done ? 0.7 : 1 }}
                    >
                      <div
                        className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0"
                        style={{
                          background: done
                            ? "linear-gradient(135deg, #2E7D32, #1B5E20)"
                            : "rgba(0,0,0,0.08)",
                          border: done
                            ? "1.5px solid #4CAF50"
                            : "1.5px solid rgba(0,0,0,0.2)",
                        }}
                      >
                        {done && (
                          <motion.span
                            className="text-white text-[8px] font-bold"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            ✓
                          </motion.span>
                        )}
                      </div>
                      <span
                        className="text-[11px]"
                        style={{
                          fontFamily: "'Nunito', sans-serif",
                          color: done ? "#8B7355" : "#3D2B1A",
                          textDecoration: done ? "line-through" : "none",
                        }}
                      >
                        {quest.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer progress */}
              <div
                className="px-3 py-2 flex items-center gap-2"
                style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}
              >
                <div className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: allComplete
                        ? "linear-gradient(90deg, #FCD34D, #F59E0B)"
                        : "linear-gradient(90deg, #2E7D32, #4CAF50)",
                    }}
                    animate={{ width: `${(completedCount / QUESTS.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span
                  className="text-[9px]"
                  style={{ fontFamily: "'Nunito', sans-serif", color: "#8B7355" }}
                >
                  {completedCount}/{QUESTS.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
