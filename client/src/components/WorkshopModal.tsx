/*
 * WorkshopModal — RPG inventory panel for The Workshop zone
 * Design: inventory grid of 9 tappable project icons. Tapping an item
 * opens its detail view (write-up + demo link) inside the same modal.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ExternalLink, Hammer } from "lucide-react";
import { WORKSHOP_PROJECTS, type WorkshopProject } from "@/lib/workshopData";

interface WorkshopModalProps {
  onClose: () => void;
}

const COPPER = "#B87333";
const COPPER_DARK = "#8F5A28";

function InventorySlot({
  project,
  index,
  onSelect,
}: {
  project: WorkshopProject;
  index: number;
  onSelect: () => void;
}) {
  return (
    <motion.button
      onClick={onSelect}
      aria-label={`Inspect ${project.name}`}
      className="relative rounded-xl p-2 sm:p-3 flex flex-col items-center gap-1.5 sm:gap-2 cursor-pointer text-center"
      style={{
        background: "linear-gradient(180deg, #fffdf7 0%, #f5edd8 100%)",
        border: `3px solid ${COPPER}55`,
        boxShadow: "3px 3px 0 rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
      whileHover={{ scale: 1.04, borderColor: COPPER }}
      whileTap={{ scale: 0.94 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <img
        src={project.icon}
        alt={`${project.name} icon`}
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain pixel-render"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <span
        className="pixel-text text-[6px] sm:text-[7px] leading-relaxed"
        style={{ color: "#3D2B1A" }}
      >
        {project.name.toUpperCase()}
      </span>
      {project.demoUrl === null && (
        <span
          className="pixel-text text-[5px] sm:text-[6px] px-1.5 py-0.5 rounded"
          style={{ background: `${COPPER}20`, color: COPPER }}
        >
          SOON
        </span>
      )}
    </motion.button>
  );
}

function ProjectDetail({
  project,
  onBack,
}: {
  project: WorkshopProject;
  onBack: () => void;
}) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.22 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 mb-4 cursor-pointer"
        style={{ color: COPPER }}
        aria-label="Back to inventory"
      >
        <ArrowLeft size={14} />
        <span className="pixel-text text-[7px] sm:text-[8px]">BACK TO INVENTORY</span>
      </button>

      <div className="flex items-start gap-4 mb-4">
        <img
          src={project.icon}
          alt={`${project.name} icon`}
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain pixel-render flex-shrink-0 rounded-xl p-1"
          style={{
            background: "#fffdf7",
            border: `3px solid ${COPPER}66`,
            boxShadow: "3px 3px 0 rgba(0,0,0,0.15)",
          }}
          draggable={false}
        />
        <div>
          <h3 className="pixel-text text-[9px] sm:text-[11px] leading-relaxed mb-1.5" style={{ color: "#2A1A0A" }}>
            {project.name.toUpperCase()}
          </h3>
          <p className="text-xs sm:text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif", color: COPPER }}>
            {project.tagline}
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        {project.writeup.map((para, i) => (
          <p
            key={i}
            className="text-sm sm:text-[15px] leading-relaxed"
            style={{ fontFamily: "'Nunito', sans-serif", color: "#4a4540" }}
          >
            {para}
          </p>
        ))}
      </div>

      {project.demoUrl ? (
        <motion.a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: COPPER_DARK,
            border: "2px solid #8B6914",
            boxShadow: "0 3px 0 #6B4423, 0 4px 8px rgba(0,0,0,0.25)",
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <ExternalLink size={16} />
          {project.linkLabel}
        </motion.a>
      ) : (
        <span
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl pixel-text text-[7px] sm:text-[8px]"
          style={{
            background: `${COPPER}15`,
            border: `2px dashed ${COPPER}66`,
            color: COPPER,
          }}
        >
          <Hammer size={14} />
          {project.linkLabel.toUpperCase()}
        </span>
      )}
    </motion.div>
  );
}

export default function WorkshopModal({ onClose }: WorkshopModalProps) {
  const [selected, setSelected] = useState<WorkshopProject | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-xl"
        style={{
          background: "var(--color-rpg-parchment)",
          border: `4px solid ${COPPER}`,
          boxShadow: `0 0 0 2px var(--color-rpg-parchment), 0 0 0 6px ${COPPER}, 6px 6px 0 rgba(0,0,0,0.25)`,
        }}
        initial={{ scale: 0.85, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        role="dialog"
        aria-label="The Workshop inventory"
      >
        {/* Header */}
        <div
          className="relative px-5 sm:px-6 pt-5 pb-4"
          style={{
            background: COPPER_DARK,
            borderBottom: `3px solid #6B4423`,
          }}
        >
          <div className="flex items-center gap-3 pr-10">
            <span
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: COPPER,
                border: "2px solid #6B4423",
                boxShadow: "0 2px 0 #6B4423",
              }}
            >
              <Hammer size={22} className="text-white" />
            </span>
            <div>
              <h2 className="pixel-text text-white text-xs sm:text-sm leading-relaxed" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.35)" }}>
                THE WORKSHOP
              </h2>
              <p className="text-xs sm:text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif", color: "#FFE8C9" }}>
                Every build is a crafted item.
              </p>
            </div>
          </div>

          <button
            aria-label="Close the workshop"
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6" style={{ maxHeight: "calc(90vh - 13rem)" }}>
          <AnimatePresence mode="wait">
            {selected ? (
              <ProjectDetail key="detail" project={selected} onBack={() => setSelected(null)} />
            ) : (
              <motion.div key="grid" exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.18 }}>
                <div className="space-y-3 mb-6">
                  <p className="text-sm sm:text-[15px] leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif", color: "#4a4540" }}>
                    Everything I've built, in one inventory.
                  </p>
                  <p className="text-sm sm:text-[15px] leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif", color: "#4a4540" }}>
                    Nine projects, each one live and playable, spanning finance, food, travel, and family.
                  </p>
                  <p className="text-sm sm:text-[15px] leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif", color: "#4a4540" }}>
                    Tap any item to inspect it, then go play the demo yourself.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                  {WORKSHOP_PROJECTS.map((project, i) => (
                    <InventorySlot
                      key={project.id}
                      project={project}
                      index={i}
                      onSelect={() => setSelected(project)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom bar */}
        <div
          className="px-5 py-3 border-t-2 flex items-center justify-between"
          style={{ borderColor: `${COPPER}30`, background: `${COPPER}10` }}
        >
          <span className="pixel-text text-[6px] sm:text-[7px] opacity-40">
            {selected ? "ITEM INSPECTED" : "9 ITEMS IN INVENTORY"}
          </span>
          <button
            aria-label="Close the workshop"
            onClick={onClose}
            className="pixel-text text-[7px] sm:text-[8px] px-4 py-2 rounded-lg text-white transition-all hover:opacity-80 active:scale-95"
            style={{ background: COPPER, boxShadow: `0 2px 0 ${COPPER}80` }}
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
