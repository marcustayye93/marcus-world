/*
 * ConnectFooter — "Connect with Marcus" section
 * Design: Pixel art RPG style footer with social links
 * Appears as a modal overlay, matching the site's aesthetic
 */

import { motion } from "framer-motion";
import { X, Mail, Linkedin } from "lucide-react";

interface ConnectFooterProps {
  onClose: () => void;
}

const SOCIAL_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "marcustayve@gmail.com",
    href: "mailto:marcustayve@gmail.com",
    color: "#EA4335",
    description: "Drop me a line",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Marcus Tay",
    href: "https://www.linkedin.com/in/marcustay/",
    color: "#0A66C2",
    description: "Let's connect professionally",
  },

];

const FUN_FACTS = [
  "Marcus once performed clarinet for Singapore's Prime Minister.",
  "He scaled a brand from $8K/day to $50K/day in ad spend — with 3x ROAS.",
  "He's a member of Mensa Singapore — always curious, always learning.",
  "He shepherded 70 animals across 2 farms in New Zealand.",
  "He launched a coffee enterprise with 80 student baristas.",
  "He plays 5 musical instruments and was a DJ.",
];

export default function ConnectFooter({ onClose }: ConnectFooterProps) {
  const randomFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal content */}
      <motion.div
        className="relative w-full max-w-lg z-10 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #2D4A2D 0%, #1A3320 50%, #0F2415 100%)",
          border: "4px solid #5A8A3C",
          borderRadius: "0px",
          boxShadow: "0 0 0 2px #1A3320, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
          imageRendering: "pixelated" as any,
        }}
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Header */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{
            borderBottom: "3px solid #5A8A3C",
            background: "linear-gradient(180deg, rgba(90,138,60,0.3) 0%, transparent 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">💌</span>
            <div>
              <h2
                className="pixel-text text-[10px] sm:text-[12px] text-[#A8E06C]"
                style={{ letterSpacing: "2px" }}
              >
                CONNECT WITH MARCUS
              </h2>
              <p
                className="text-[11px] text-[#7CB850]/70 mt-0.5"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Let's start a conversation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#7CB850]/60 hover:text-[#A8E06C] transition-colors"
            style={{
              border: "2px solid #5A8A3C",
              background: "rgba(0,0,0,0.2)",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Social links */}
        <div className="p-6 space-y-3">
          {SOCIAL_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-3 group transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "2px solid rgba(90,138,60,0.3)",
                borderRadius: "0px",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{
                background: "rgba(90,138,60,0.15)",
                borderColor: "rgba(90,138,60,0.6)",
              }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{
                  background: `${link.color}20`,
                  border: `2px solid ${link.color}40`,
                }}
              >
                <link.icon size={18} style={{ color: link.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="pixel-text text-[7px] sm:text-[8px] text-[#A8E06C]"
                    style={{ letterSpacing: "1px" }}
                  >
                    {link.label.toUpperCase()}
                  </span>
                </div>
                <p
                  className="text-sm text-[#D4E8C4] truncate"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {link.value}
                </p>
                <p
                  className="text-[11px] text-[#7CB850]/50"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {link.description}
                </p>
              </div>
              <div className="text-[#5A8A3C] group-hover:text-[#A8E06C] transition-colors shrink-0">
                <span className="pixel-text text-[8px]">→</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Fun fact */}
        <div
          className="px-6 py-4 mx-6 mb-4"
          style={{
            background: "rgba(168,224,108,0.08)",
            border: "2px dashed rgba(90,138,60,0.3)",
          }}
        >
          <p
            className="pixel-text text-[6px] sm:text-[7px] text-[#7CB850]/60 mb-1"
            style={{ letterSpacing: "1px" }}
          >
            ✨ DID YOU KNOW?
          </p>
          <p
            className="text-[12px] text-[#D4E8C4]/80 italic"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {randomFact}
          </p>
        </div>

        {/* Footer tagline */}
        <div
          className="px-6 py-3 text-center"
          style={{
            borderTop: "2px solid rgba(90,138,60,0.2)",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          <p
            className="pixel-text text-[5px] sm:text-[6px] text-[#5A8A3C]/60"
            style={{ letterSpacing: "2px" }}
          >
            ALWAYS HAPPY TO CHAT OVER COFFEE ☕
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
