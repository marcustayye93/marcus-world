/*
 * TestimonialsSection — Testimonials displayed as NPC speech bubbles
 * Design: RPG village bulletin board with character portraits
 */

import { motion } from "framer-motion";
import { X, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/gameData";

interface TestimonialsSectionProps {
  onClose: () => void;
}

export default function TestimonialsSection({ onClose }: TestimonialsSectionProps) {
  const npcEmojis = ["👔", "👩‍💼", "👩", "🧑‍💻"];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl"
        style={{
          background: "#faf6ee",
          border: "4px solid #5D4037",
          boxShadow: "0 0 0 2px #faf6ee, 0 0 0 4px #5D4037, 8px 8px 0 rgba(0,0,0,0.2)",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b-2 border-dashed border-amber-200 flex items-start justify-between">
          <div>
            <h2 className="pixel-text text-amber-900 text-sm sm:text-base mb-2">
              TESTIMONIALS
            </h2>
            <p className="text-gray-500 text-xs italic" style={{ fontFamily: "'Nunito', sans-serif" }}>
              What colleagues and leaders say about Marcus...
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-amber-800" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 * i, type: "spring" }}
            >
              <div className="flex gap-4 items-start">
                {/* NPC avatar */}
                <motion.div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: ["#E3F2FD", "#E8F5E9", "#FCE4EC", "#FFF3E0"][i % 4],
                    border: `2px solid ${["#1565C0", "#2E7D32", "#C2185B", "#E65100"][i % 4]}30`,
                  }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {npcEmojis[i % npcEmojis.length]}
                </motion.div>

                {/* Speech bubble */}
                <div className="flex-1">
                  <div
                    className="relative p-4 rounded-xl rounded-tl-none"
                    style={{
                      background: ["#E3F2FD", "#E8F5E9", "#FCE4EC", "#FFF3E0"][i % 4],
                      border: `2px solid ${["#1565C0", "#2E7D32", "#C2185B", "#E65100"][i % 4]}20`,
                    }}
                  >
                    <Quote size={14} className="absolute top-2 right-2 opacity-20" />
                    <p className="text-sm text-gray-700 leading-relaxed italic" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="mt-2 pl-1">
                    <p className="pixel-text text-[7px] sm:text-[8px] text-gray-700">
                      {testimonial.name}
                    </p>
                    <p className="text-[11px] text-gray-500" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Footer note */}
          <motion.div
            className="text-center pt-4 border-t-2 border-dashed border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-xs text-gray-400 italic" style={{ fontFamily: "'Nunito', sans-serif" }}>
              More testimonials available on{" "}
              <a
                href="https://www.linkedin.com/in/mtye/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
