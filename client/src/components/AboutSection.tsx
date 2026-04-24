/*
 * AboutSection — Full-screen modal with Marcus's personal story
 * Design: RPG character sheet / stats page aesthetic
 * Features RPG-style animated stats bars for professional strengths
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Brain, Heart, Leaf, ChefHat, Mail, Linkedin, Swords, Shield, Sparkles, Music, Flame, Zap } from "lucide-react";
import { ABOUT_ME, ASSET_URLS } from "@/lib/gameData";

interface AboutSectionProps {
  onClose: () => void;
}

/* ── RPG stat definitions based on Marcus's actual strengths ── */
const RPG_STATS = [
  {
    name: "Client Mastery",
    value: 95,
    maxValue: 100,
    icon: Swords,
    color: "#10B981",
    bgColor: "#D1FAE5",
    description: "Scaling 25+ verticals in ANZ — 2025 Client Hero (Infinite Potential Award, APAC)",
  },
  {
    name: "Leadership",
    value: 92,
    maxValue: 100,
    icon: Shield,
    color: "#3B82F6",
    bgColor: "#DBEAFE",
    description: "IT rollouts across 6 countries at DFS, 90+ stakeholders & 16 departments",
  },
  {
    name: "Creativity",
    value: 90,
    maxValue: 100,
    icon: Sparkles,
    color: "#F59E0B",
    bgColor: "#FEF3C7",
    description: "5 instruments, DJ sets, and pixel-perfect campaigns",
  },
  {
    name: "Adaptability",
    value: 94,
    maxValue: 100,
    icon: Zap,
    color: "#8B5CF6",
    bgColor: "#EDE9FE",
    description: "Luxury retail → Global strategy → IT → Meta → Farming → Music",
  },
  {
    name: "Music",
    value: 88,
    maxValue: 100,
    icon: Music,
    color: "#EF4444",
    bgColor: "#FEE2E2",
    description: "Orchestra clarinetist, performed for Singapore's PM",
  },
  {
    name: "Resilience",
    value: 96,
    maxValue: 100,
    icon: Flame,
    color: "#F97316",
    bgColor: "#FFEDD5",
    description: "Earthquake relief in Yunnan, 70 animals on 2 farms",
  },
];

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
          <div className="flex items-center gap-3">
            {/* Small portrait in header */}
            <div
              className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
              style={{
                border: "2px solid #D4A853",
                boxShadow: "0 0 0 1px #1a2e1a, 0 0 8px rgba(212,168,83,0.3)",
              }}
            >
              <img
                src={ASSET_URLS.marcusPortrait}
                alt="Marcus"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="pixel-text text-emerald-800 text-sm sm:text-base mb-0.5">
                ABOUT MARCUS
              </h2>
              <p className="text-gray-500 text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Character Sheet — Stats &amp; Story
              </p>
            </div>
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

          {/* ═══ RPG STATS BAR ═══ */}
          <motion.div
            className="rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1a2e1a 0%, #0f1f0f 100%)",
              border: "3px solid #2E7D32",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.4), 0 0 15px rgba(46,125,50,0.15)",
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {/* Stats header */}
            <div
              className="px-4 py-2.5 flex items-center justify-between"
              style={{
                background: "linear-gradient(90deg, #2E7D32 0%, #1B5E20 100%)",
                borderBottom: "2px solid #4CAF50",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">⚔️</span>
                <span className="pixel-text text-[8px] sm:text-[9px] text-emerald-100 tracking-wider">
                  CHARACTER STATS
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="pixel-text text-[7px] text-emerald-300/70">LVL</span>
                <span className="pixel-text text-[10px] text-amber-300">30</span>
              </div>
            </div>

            {/* Stats list */}
            <div className="p-3 sm:p-4 space-y-2.5">
              {RPG_STATS.map((stat, i) => (
                <RPGStatBar key={stat.name} stat={stat} index={i} />
              ))}
            </div>

            {/* Total power footer */}
            <div
              className="px-4 py-2 flex items-center justify-between"
              style={{
                background: "linear-gradient(90deg, rgba(212,168,83,0.15), rgba(212,168,83,0.05))",
                borderTop: "1px solid rgba(212,168,83,0.2)",
              }}
            >
              <span className="pixel-text text-[7px] text-amber-400/80 tracking-wider">TOTAL POWER</span>
              <div className="flex items-center gap-1">
                <motion.span
                  className="pixel-text text-[11px] sm:text-xs text-amber-300"
                  animate={{ textShadow: ["0 0 4px rgba(251,191,36,0)", "0 0 8px rgba(251,191,36,0.6)", "0 0 4px rgba(251,191,36,0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {RPG_STATS.reduce((sum, s) => sum + s.value, 0)} / {RPG_STATS.reduce((sum, s) => sum + s.maxValue, 0)}
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            className="flex flex-wrap gap-2 justify-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "#3B82F610", border: "1px solid #3B82F620" }}>
              <span className="text-sm">🇬🇧</span>
              <span className="text-xs font-bold text-blue-600" style={{ fontFamily: "'Nunito', sans-serif" }}>English</span>
              <span className="text-[10px] text-gray-400" style={{ fontFamily: "'Nunito', sans-serif" }}>Fluent</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "#EF444410", border: "1px solid #EF444420" }}>
              <span className="text-sm">🇨🇳</span>
              <span className="text-xs font-bold text-red-500" style={{ fontFamily: "'Nunito', sans-serif" }}>Chinese/Mandarin</span>
              <span className="text-[10px] text-gray-400" style={{ fontFamily: "'Nunito', sans-serif" }}>Fluent</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "#F59E0B10", border: "1px solid #F59E0B20" }}>
              <span className="text-sm">🇭🇰</span>
              <span className="text-xs font-bold text-amber-500" style={{ fontFamily: "'Nunito', sans-serif" }}>Cantonese</span>
              <span className="text-[10px] text-gray-400" style={{ fontFamily: "'Nunito', sans-serif" }}>Basic</span>
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
              title="MENSA MEMBER"
              color="#7C3AED"
              bgColor="#F5F3FF"
              delay={0.7}
            >
              Member of Mensa Singapore — a lifelong love of learning, problem-solving, and staying curious.
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
                href="mailto:marcustayye@gmail.com"
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

/* ── RPG Stat Bar Component ── */
function RPGStatBar({ stat, index }: { stat: typeof RPG_STATS[0]; index: number }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = (stat.value / stat.maxValue) * 100;
  const Icon = stat.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(stat.value);
    }, 300 + index * 120);
    return () => clearTimeout(timer);
  }, [stat.value, index]);

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.08 }}
    >
      <div className="flex items-center gap-2.5">
        {/* Icon */}
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: `${stat.color}20`,
            border: `1.5px solid ${stat.color}40`,
          }}
        >
          <Icon size={14} style={{ color: stat.color }} />
        </div>

        {/* Name + bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between mb-0.5">
            <span
              className="pixel-text text-[6px] sm:text-[7px] tracking-wider"
              style={{ color: stat.color }}
            >
              {stat.name.toUpperCase()}
            </span>
            <span className="pixel-text text-[7px] sm:text-[8px] text-white/80">
              {animatedValue}<span className="text-white/30">/{stat.maxValue}</span>
            </span>
          </div>

          {/* Bar track */}
          <div
            className="h-3 sm:h-3.5 rounded-sm overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Filled bar */}
            <motion.div
              className="h-full rounded-sm relative overflow-hidden"
              style={{
                background: `linear-gradient(90deg, ${stat.color}CC, ${stat.color})`,
                boxShadow: `0 0 8px ${stat.color}40`,
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.2, delay: 0.3 + index * 0.12, ease: "easeOut" }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, delay: 1.5 + index * 0.12, repeat: Infinity, repeatDelay: 4 }}
              />
              {/* Pixel grid overlay for retro feel */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)",
                }}
              />
            </motion.div>
          </div>

          {/* Description on hover / always visible on mobile */}
          <p
            className="text-[9px] sm:text-[10px] mt-0.5 leading-tight"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Nunito', sans-serif" }}
          >
            {stat.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Stat Card (existing) ── */
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
