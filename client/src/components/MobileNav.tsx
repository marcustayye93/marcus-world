/*
 * MobileNav — Bottom navigation bar for mobile devices
 * Design: RPG-style quick menu with zone shortcuts
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, MessageSquare, FileText, Mail } from "lucide-react";
import type { Zone } from "@/lib/gameData";

interface MobileNavProps {
  zones: Zone[];
  onZoneClick: (zone: Zone) => void;
  onAboutClick: () => void;
  onTestimonialsClick: () => void;
  onSnapshotClick?: () => void;
  onConnectClick?: () => void;
}

export default function MobileNav({ zones, onZoneClick, onAboutClick, onTestimonialsClick, onSnapshotClick, onConnectClick }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <motion.button
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{
          background: "linear-gradient(135deg, var(--color-zone-dfs), #1B5E20)",
          border: "3px solid #1B5E20",
        }}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <Menu size={24} className="text-white" />
        )}
      </motion.button>

      {/* Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-5 z-40 w-56"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "var(--color-rpg-parchment)",
                border: "3px solid var(--color-zone-dfs)",
                boxShadow: "4px 4px 0 rgba(0,0,0,0.2)",
              }}
            >
              <div className="p-2 border-b-2 border-dashed border-emerald-200">
                <span className="pixel-text text-[7px] text-emerald-800 px-2">QUICK TRAVEL</span>
              </div>

              <div className="p-2 space-y-1">
                {zones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => {
                      onZoneClick(zone);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-left"
                  >
                    <span className="text-lg">{zone.icon}</span>
                    <span className="text-xs font-semibold text-gray-700" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      {zone.name}
                    </span>
                  </button>
                ))}

                <div className="border-t border-gray-200 my-1" />

                {onSnapshotClick && (
                  <button
                    onClick={() => {
                      onSnapshotClick();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-left"
                  >
                    <FileText size={18} className="text-emerald-700" />
                    <span className="text-xs font-semibold text-gray-700" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      R\u00e9sum\u00e9 Snapshot
                    </span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onAboutClick();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-left"
                >
                  <User size={18} className="text-emerald-600" />
                  <span className="text-xs font-semibold text-gray-700" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    About Marcus
                  </span>
                </button>

                <button
                  onClick={() => {
                    onTestimonialsClick();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-left"
                >
                  <MessageSquare size={18} className="text-amber-600" />
                  <span className="text-xs font-semibold text-gray-700" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    Testimonials
                  </span>
                </button>

                {onConnectClick && (
                  <button
                    onClick={() => {
                      onConnectClick();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-left"
                  >
                    <Mail size={18} className="text-blue-600" />
                    <span className="text-xs font-semibold text-gray-700" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      Connect with Marcus
                    </span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
