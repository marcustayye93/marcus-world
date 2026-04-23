/*
 * ZoneModal — Content panel that opens when a zone is clicked
 * Design: RPG-style dialog with pixel borders, zone image header, and detailed content
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { Zone } from "@/lib/gameData";

interface ZoneModalProps {
  zone: Zone;
  onClose: () => void;
}

export default function ZoneModal({ zone, onClose }: ZoneModalProps) {
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
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl"
        style={{
          background: "var(--color-rpg-parchment)",
          border: `4px solid ${zone.color}`,
          boxShadow: `0 0 0 2px var(--color-rpg-parchment), 0 0 0 6px ${zone.color}, 6px 6px 0 rgba(0,0,0,0.25)`,
        }}
        initial={{ scale: 0.85, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
      >
        {/* Header image */}
        <div className="relative h-44 sm:h-52 overflow-hidden">
          <img
            src={zone.image}
            alt={zone.name}
            className="w-full h-full object-cover pixel-render"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Zone title overlay */}
          <div className="absolute bottom-4 left-5 right-14">
            <div className="flex items-center gap-3 mb-1.5">
              <motion.span
                className="text-3xl sm:text-4xl"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {zone.icon}
              </motion.span>
              <div>
                <h2 className="pixel-text text-white text-xs sm:text-sm drop-shadow-lg leading-relaxed">
                  {zone.name}
                </h2>
                <p className="text-white/75 text-xs sm:text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {zone.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6" style={{ maxHeight: "calc(90vh - 14rem)" }}>
          {/* Description */}
          <motion.p
            className="text-sm sm:text-base leading-relaxed mb-6"
            style={{ fontFamily: "'Nunito', sans-serif", color: "#4a4540" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {zone.description}
          </motion.p>

          {/* Details */}
          {zone.details.map((detail, i) => (
            <motion.div
              key={i}
              className="mb-5 last:mb-0"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * (i + 1) }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3
                  className="pixel-text text-[8px] sm:text-[9px] leading-relaxed"
                  style={{ color: zone.color }}
                >
                  {detail.title}
                </h3>
                {detail.period && (
                  <span
                    className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold whitespace-nowrap"
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      background: `${zone.color}15`,
                      color: zone.color,
                    }}
                  >
                    {detail.period}
                  </span>
                )}
              </div>

              <ul className="space-y-2.5">
                {detail.bullets.map((bullet, j) => (
                  <motion.li
                    key={j}
                    className="flex items-start gap-2.5 text-[13px] sm:text-sm text-gray-600"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 * (i + 1) + 0.04 * j }}
                  >
                    <span
                      className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: zone.color }}
                    />
                    <span className="leading-relaxed">{bullet}</span>
                  </motion.li>
                ))}
              </ul>

              {i < zone.details.length - 1 && (
                <div className="mt-4 border-t-2 border-dashed" style={{ borderColor: `${zone.color}25` }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="px-5 py-3 border-t-2 flex items-center justify-between"
          style={{ borderColor: `${zone.color}25`, background: `${zone.color}08` }}
        >
          <div className="flex items-center gap-2">
            <span className="pixel-text text-[6px] sm:text-[7px] opacity-40">
              ZONE EXPLORED ✓
            </span>
          </div>
          <button
            onClick={onClose}
            className="pixel-text text-[7px] sm:text-[8px] px-4 py-2 rounded-lg text-white transition-all hover:opacity-80 active:scale-95"
            style={{ background: zone.color, boxShadow: `0 2px 0 ${zone.color}80` }}
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
