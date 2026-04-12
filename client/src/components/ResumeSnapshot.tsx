/*
 * ResumeSnapshot — A clean, one-sheet résumé view
 * Design: Professional yet themed to match the pixel art world.
 * Opens as a full-screen modal with a scrollable, print-friendly résumé layout.
 * Includes: Skills & Tools, Languages, DFS promotion clarity, What I'm Looking For
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Mail, Linkedin, Brain, Globe, Music, Coffee, Leaf, Download, Languages, Wrench, Target } from "lucide-react";
import { ASSET_URLS } from "@/lib/gameData";

interface ResumeSnapshotProps {
  onClose: () => void;
}

export default function ResumeSnapshot({ onClose }: ResumeSnapshotProps) {
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
        className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-xl"
        style={{
          background: "#faf6ee",
          border: "4px solid #8B6914",
          boxShadow: "0 0 0 2px #faf6ee, 0 0 0 6px #8B6914, 6px 6px 0 rgba(0,0,0,0.25)",
        }}
        initial={{ scale: 0.85, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
      >
        {/* Header */}
        <div
          className="relative px-5 sm:px-8 py-5 sm:py-6"
          style={{
            background: "linear-gradient(135deg, #2D5016 0%, #1a3a0a 50%, #0f2906 100%)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors backdrop-blur-sm z-10"
          >
            <X size={18} />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1
              className="pixel-text text-sm sm:text-base text-white leading-relaxed mb-1"
            >
              MARCUS TAY YONG ERN
            </h1>
            <p
              className="text-emerald-200/90 text-sm sm:text-base font-semibold mb-3"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Account Manager at Meta | Business Transformation Leader
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-emerald-100/70" style={{ fontFamily: "'Nunito', sans-serif" }}>
              <a href="mailto:marcustayve@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail size={13} />
                marcustayve@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/mtye/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Linkedin size={13} />
                LinkedIn
              </a>
              <span className="flex items-center gap-1.5">
                <Languages size={13} />
                English · Chinese/Mandarin · Cantonese
              </span>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-5 sm:px-8 py-5 sm:py-6" style={{ maxHeight: "calc(92vh - 12rem)" }}>

          {/* Summary */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p
              className="text-sm text-gray-600 leading-relaxed italic border-l-3 pl-4"
              style={{ fontFamily: "'Nunito', sans-serif", borderColor: "#2D5016" }}
            >
              Passionate and results-driven executive with a proven track record in account management, IT project delivery, and business development. From scaling Meta's top clients 10x to orchestrating technology rollouts across 6 countries — I bring curiosity, tenacity, and a genuine love for building relationships.
            </p>
          </motion.div>

          {/* What I'm Looking For */}
          <motion.div
            className="mb-6 p-3.5 rounded-xl"
            style={{ background: "#EFF6FF", border: "2px solid #3B82F620" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.17 }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Target size={15} className="text-blue-600" />
              <span className="pixel-text text-[7px] sm:text-[8px] text-blue-700" style={{ letterSpacing: "1px" }}>
                WHAT I'M LOOKING FOR
              </span>
            </div>
            <p
              className="text-xs sm:text-[13px] text-gray-600 leading-relaxed"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              A client-facing or business development role where I can combine strategic thinking with genuine relationship-building — ideally at the intersection of technology, media, and commerce. I thrive in fast-paced, cross-functional environments where curiosity is rewarded and impact is measurable.
            </p>
          </motion.div>

          {/* Skills & Tools */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <SectionHeader title="SKILLS & TOOLS" />
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "Meta Ads Manager", color: "#10B981" },
                { label: "Meta Business Suite", color: "#10B981" },
                { label: "Performance Marketing", color: "#10B981" },
                { label: "Client Relationship Management", color: "#3B82F6" },
                { label: "Stakeholder Management", color: "#3B82F6" },
                { label: "Cross-Functional Leadership", color: "#3B82F6" },
                { label: "IT Project Delivery", color: "#8B5CF6" },
                { label: "Business Development", color: "#8B5CF6" },
                { label: "Data Analysis", color: "#F59E0B" },
                { label: "Retail Operations", color: "#F59E0B" },
                { label: "Event Management", color: "#F59E0B" },
                { label: "Digital Transformation", color: "#8B5CF6" },
              ].map((skill) => (
                <span
                  key={skill.label}
                  className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    background: `${skill.color}10`,
                    color: skill.color,
                    border: `1px solid ${skill.color}25`,
                  }}
                >
                  {skill.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.19 }}
          >
            <SectionHeader title="LANGUAGES" />
            <div className="flex gap-3">
              <LanguageBadge language="English" level="Fluent" color="#3B82F6" />
              <LanguageBadge language="Chinese (Mandarin)" level="Fluent" color="#EF4444" />
              <LanguageBadge language="Cantonese" level="Basic" color="#F59E0B" />
            </div>
          </motion.div>

          {/* Professional Experience */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SectionHeader title="PROFESSIONAL EXPERIENCE" />

            <ExperienceEntry
              company="Meta"
              role="Account Manager"
              period="2024 – Present"
              location="Australia & New Zealand"
              color="#10B981"
              bullets={[
                "Managing the top 1% of clients across Australia and New Zealand",
                "Portfolio spanning 25+ business verticals — from healthcare to top e-commerce brands",
                "Scaled an e-commerce brand from $8K/day to $50K/day in ad spend while achieving 3x ROAS",
                "Consistently scaling businesses 10x while maintaining impressive return on ad spend",
                "2025 Infinite Potential Award — Client Hero (sole recipient in APAC)",
              ]}
              delay={0.25}
            />

            {/* DFS Group — show as one block with internal promotions */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className="text-sm font-bold"
                  style={{ fontFamily: "'Nunito', sans-serif", color: "#2E7D32" }}
                >
                  DFS Group
                </h3>
                <span
                  className="px-2 py-0.5 rounded text-[9px] font-bold"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    background: "#2E7D3215",
                    color: "#2E7D32",
                    border: "1px solid #2E7D3225",
                  }}
                >
                  4 promotions in 5 years
                </span>
              </div>

              {/* DFS Role 1 */}
              <DFSRoleEntry
                role="IT Project Manager — Global Business Transformation"
                period="Apr 2022 – 2024"
                location="Singapore"
                bullets={[
                  "Orchestrated end-to-end technology rollouts for new retail complexes and airports across 6 countries",
                  "Collaborated with CTO & CIO on market entry strategy and risk mitigation",
                  "Managed 90+ internal and external client relationships across 16 departments",
                ]}
              />

              {/* DFS Role 2 */}
              <DFSRoleEntry
                role="Flagship Product Sales Manager — Fashion"
                period="Mar 2021 – Apr 2022"
                location="Hong Kong"
                bullets={[
                  "Directed operations of 8 luxury boutiques within DFS Hong Kong's Flagship store",
                  "60% YoY surge in brand sales during COVID; +205% above target on VIP fashion events",
                  "Drove revenue +78% through an innovative 'digital shopper' solution",
                ]}
              />

              {/* DFS Role 3 */}
              <DFSRoleEntry
                role="Global Strategy & Business Development"
                period="Mar 2020 – Mar 2021"
                location="Hong Kong"
                bullets={[
                  "Spearheaded store operations in Hainan, China across 13 departments",
                  "Conducted strategic analyses across 6 nations for Board-level expansion decisions",
                ]}
              />

              {/* DFS Role 4 */}
              <DFSRoleEntry
                role="Product Sales Manager — Beauty"
                period="Sep 2019 – Mar 2020"
                location="Singapore"
                bullets={[
                  "Oversaw a portfolio of 43 brands and led a team of 40+ professionals",
                  "Drove growth in sales volume, UPTs, and conversion rates across Skincare, Make-up, and Fragrances",
                ]}
                isLast
              />
            </motion.div>

            <ExperienceEntry
              company="Young Sustainable Impact SEA"
              role="Business Development"
              period="Jan 2018 – Aug 2019"
              location="Singapore"
              color="#1565C0"
              bullets={[
                "Secured over USD $280,000 in funding",
                "Orchestrated zero-waste Demo Days engaging 700+ investors",
              ]}
              delay={0.5}
            />
          </motion.div>

          {/* Education */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <SectionHeader title="EDUCATION" />

            <div className="space-y-3">
              <EducationEntry
                school="National University of Singapore"
                degree="BSc in Real Estate Management (Urban Planning)"
                period="2015 – 2019"
                highlights={["Honors with Distinction", "Dean's List — Fall 2017"]}
              />
              <EducationEntry
                school="European Business School — Germany"
                degree="Student Exchange Program (Master's in Real Estate Management)"
                period="Aug – Dec 2017"
                highlights={[]}
              />
              <EducationEntry
                school="Nanyang Polytechnic — Singapore"
                degree="Diploma in Banking and Financial Services"
                period="2010 – 2013"
                highlights={[]}
              />
            </div>
          </motion.div>

          {/* What Makes Marcus Unique */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <SectionHeader title="WHAT MAKES MARCUS UNIQUE" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <UniqueCard
                icon={<Brain size={16} />}
                title="Mensa Member"
                desc="A lifelong love of learning and problem-solving"
                color="#7C3AED"
              />
              <UniqueCard
                icon={<Globe size={16} />}
                title="Humanitarian"
                desc="5 weeks disaster relief in Yun Nan, China"
                color="#DC2626"
              />
              <UniqueCard
                icon={<Music size={16} />}
                title="Multi-Instrumentalist"
                desc="5 instruments, performed for Singapore's PM"
                color="#B71C1C"
              />
              <UniqueCard
                icon={<Coffee size={16} />}
                title="Coffee Entrepreneur"
                desc="Launched a college coffee enterprise with 80 baristas"
                color="#5D4037"
              />
              <UniqueCard
                icon={<Leaf size={16} />}
                title="Farmer"
                desc="Shepherded 70 animals across 2 farms in New Zealand"
                color="#F57F17"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="px-5 sm:px-8 py-3 border-t-2 flex items-center justify-between"
          style={{ borderColor: "#8B691425", background: "#8B691408" }}
        >
          <span className="pixel-text text-[5px] sm:text-[6px] opacity-30">
            LAST UPDATED: APRIL 2026
          </span>
          <div className="flex items-center gap-2">
            <a
              href={ASSET_URLS.resumePdf}
              download="resume.pdf"
              className="pixel-text text-[7px] sm:text-[8px] px-4 py-2 rounded-lg text-white transition-all hover:opacity-80 active:scale-95 flex items-center gap-1.5 no-underline"
              style={{ background: "#1565C0", boxShadow: "0 2px 0 #0D47A1" }}
            >
              <Download size={12} />
              DOWNLOAD RESUME
            </a>
            <button
              onClick={onClose}
              className="pixel-text text-[7px] sm:text-[8px] px-4 py-2 rounded-lg text-white transition-all hover:opacity-80 active:scale-95"
              style={{ background: "#2D5016", boxShadow: "0 2px 0 #1a3a0a" }}
            >
              CLOSE
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* --- Sub-components --- */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2
        className="pixel-text text-[8px] sm:text-[9px]"
        style={{ color: "#2D5016" }}
      >
        {title}
      </h2>
      <div className="flex-1 h-px bg-[#2D5016]/20" />
    </div>
  );
}

function LanguageBadge({ language, level, color }: { language: string; level: string; color: string }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
      style={{ background: `${color}08`, border: `1px solid ${color}20` }}
    >
      <span
        className="text-xs font-bold"
        style={{ fontFamily: "'Nunito', sans-serif", color }}
      >
        {language}
      </span>
      <span
        className="text-[10px] text-gray-400"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        {level}
      </span>
    </div>
  );
}

function ExperienceEntry({
  company,
  role,
  period,
  location,
  color,
  bullets,
  delay,
}: {
  company: string;
  role: string;
  period: string;
  location: string;
  color: string;
  bullets: string[];
  delay: number;
}) {
  return (
    <motion.div
      className="mb-4 last:mb-0"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div>
          <h3
            className="text-sm font-bold"
            style={{ fontFamily: "'Nunito', sans-serif", color }}
          >
            {company}
          </h3>
          <p
            className="text-xs text-gray-700 font-semibold"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {role}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <span
            className="text-[10px] sm:text-[11px] font-semibold text-gray-500 block"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {period}
          </span>
          <span
            className="text-[10px] text-gray-400"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {location}
          </span>
        </div>
      </div>
      <ul className="space-y-1 ml-0.5">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-[12px] sm:text-[13px] text-gray-600"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: color }}
            />
            <span className="leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function DFSRoleEntry({
  role,
  period,
  location,
  bullets,
  isLast = false,
}: {
  role: string;
  period: string;
  location: string;
  bullets: string[];
  isLast?: boolean;
}) {
  return (
    <div className={`ml-3 pl-3 ${!isLast ? "mb-3 pb-3 border-b border-dashed border-gray-200" : ""}`} style={{ borderLeft: "2px solid #2E7D3230" }}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <p
          className="text-xs text-gray-700 font-semibold"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {role}
        </p>
        <div className="text-right flex-shrink-0">
          <span
            className="text-[10px] sm:text-[11px] font-semibold text-gray-500 block"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {period}
          </span>
          <span
            className="text-[10px] text-gray-400"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {location}
          </span>
        </div>
      </div>
      <ul className="space-y-1 ml-0.5">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-[12px] sm:text-[13px] text-gray-600"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#2E7D32" }}
            />
            <span className="leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EducationEntry({
  school,
  degree,
  period,
  highlights,
}: {
  school: string;
  degree: string;
  period: string;
  highlights: string[];
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div>
        <h3
          className="text-sm font-bold text-gray-800"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {school}
        </h3>
        <p
          className="text-xs text-gray-600"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {degree}
        </p>
        {highlights.length > 0 && (
          <p
            className="text-[11px] text-emerald-700 font-semibold mt-0.5"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {highlights.join(" · ")}
          </p>
        )}
      </div>
      <span
        className="text-[10px] sm:text-[11px] font-semibold text-gray-500 flex-shrink-0"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        {period}
      </span>
    </div>
  );
}

function UniqueCard({
  icon,
  title,
  desc,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div
      className="flex items-start gap-3 p-3 rounded-lg"
      style={{ background: `${color}08`, border: `1px solid ${color}20` }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15`, color }}
      >
        {icon}
      </div>
      <div>
        <h4
          className="text-xs font-bold text-gray-800"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {title}
        </h4>
        <p
          className="text-[11px] text-gray-500"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
