/*
 * AboutSection — Full-screen modal with Marcus's personal story
 * Design: RPG character sheet / stats page aesthetic
 * Emphasis on Mensa membership and intellectual depth
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Brain, Heart, Leaf, ChefHat, Mail, Linkedin } from "lucide-react";
import { ABOUT_ME } from "@/lib/gameData";

interface AboutSectionProps {
  onClose: () => void;
}

export default function AboutSection({ onClose }: AboutSectionProps) {
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
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl"
        style={{
          background: "#faf6ee",
          border: "4px solid #2E7D32",
          boxShadow: "0 0 0 2px #faf6ee, 0 0 0 6px #2E7D32, 6px 6px 0 rgba(0,0,0,0.25)",
        }}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", damping: 22 }}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b-2 border-dashed border-emerald-200 flex items-start justify-between bg-gradient-to-r from-emerald-50 to-sky-50">
          <div>
            <h2 className="pixel-text text-emerald-800 text-sm sm:text-base mb-1.5">
              ABOUT MARCUS
            </h2>
            <p className="text-gray-500 text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Character Sheet — The Full Story
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-emerald-800" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6 space-y-5" style={{ maxHeight: "calc(90vh - 5rem)" }}>
          {/* Three Words */}
          <motion.div
            className="flex gap-2 sm:gap-3 justify-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {ABOUT_ME.threeWords.map((word, i) => (
              <motion.div
                key={word}
                className="px-4 py-2 rounded-xl text-center shadow-sm"
                style={{
                  background: ["#DBEAFE", "#D1FAE5", "#FEF3C7"][i],
                  border: `2px solid ${["#3B82F6", "#10B981", "#F59E0B"][i]}30`,
                }}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 + i * 0.12, type: "spring" }}
              >
                <span className="pixel-text text-[8px] sm:text-[9px]" style={{ color: ["#2563EB", "#059669", "#D97706"][i] }}>
                  {word}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Mensa Badge - PROMINENT */}
          <motion.div
            className="relative p-4 rounded-xl text-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #312E81, #4338CA)",
              border: "3px solid #6366F1",
              boxShadow: "0 0 20px rgba(99,102,241,0.3)",
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 80%, white 1px, transparent 1px)",
                backgroundSize: "60px 60px, 40px 40px, 50px 50px",
              }}
            />
            <div className="relative">
              <motion.div
                className="text-4xl mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🧠
              </motion.div>
              <p className="pixel-text text-[9px] sm:text-[10px] text-indigo-200 mb-1">
                MENSA SINGAPORE
              </p>
              <p className="text-white text-sm sm:text-base font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>
                IQ ranked at the 99th percentile
              </p>
              <p className="text-indigo-300 text-xs mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Top 1% of the population
              </p>
            </div>
          </motion.div>

          {/* Motto */}
          <motion.div
            className="relative p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-200/50"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-2xl absolute -top-3 left-4">💬</div>
            <blockquote className="text-sm italic text-gray-600 leading-relaxed pl-2 pt-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
              "{ABOUT_ME.motto}"
            </blockquote>
            <p className="text-right text-xs text-gray-400 mt-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
              — Marcus's life philosophy
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StatCard
              icon={<Heart className="text-rose-500" size={18} />}
              title="HUMANITARIAN"
              color="#E11D48"
              bgColor="#FFF1F2"
              delay={0.4}
            >
              {ABOUT_ME.humanitarian}
            </StatCard>

            <StatCard
              icon={<Leaf className="text-emerald-500" size={18} />}
              title="SUSTAINABILITY"
              color="#059669"
              bgColor="#ECFDF5"
              delay={0.5}
            >
              {ABOUT_ME.sustainability}
            </StatCard>

            <StatCard
              icon={<ChefHat className="text-amber-500" size={18} />}
              title="COOKING"
              color="#D97706"
              bgColor="#FFFBEB"
              delay={0.6}
            >
              {ABOUT_ME.cooking}
            </StatCard>

            <StatCard
              icon={<Brain className="text-violet-500" size={18} />}
              title="SELF-AWARENESS"
              color="#7C3AED"
              bgColor="#F5F3FF"
              delay={0.7}
            >
              Believes deeply in self-awareness as the foundation for growth, kindness, and authentic connection with others.
            </StatCard>
          </div>

          {/* Contact */}
          <motion.div
            className="text-center pt-4 border-t-2 border-dashed border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="pixel-text text-[7px] sm:text-[8px] text-gray-400 mb-3">CONNECT WITH MARCUS</p>
            <div className="flex gap-3 justify-center">
              <a
                href="mailto:marcustayve@gmail.com"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-all hover:shadow-lg active:scale-95"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                <Mail size={16} />
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/mtye/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all hover:shadow-lg active:scale-95"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatCard({
  icon,
  title,
  color,
  bgColor,
  delay,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  bgColor: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="p-3.5 rounded-xl"
      style={{ background: bgColor, border: `2px solid ${color}15` }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="pixel-text text-[6px] sm:text-[7px]" style={{ color }}>
          {title}
        </span>
      </div>
      <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
        {children}
      </p>
    </motion.div>
  );
}
