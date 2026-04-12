/*
 * Marcus's World — Home Page
 * Design: Ghibli Pixel Overworld — 8-bit RPG meets Studio Ghibli warmth
 * An interactive overworld map where visitors explore zones of Marcus's life
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroScreen from "@/components/IntroScreen";
import OverworldMap from "@/components/OverworldMap";
import ZoneModal from "@/components/ZoneModal";
import HUD from "@/components/HUD";
import DialogBox from "@/components/DialogBox";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MobileNav from "@/components/MobileNav";
import CompletionBanner from "@/components/CompletionBanner";
import { ZONES, EASTER_EGGS, type Zone } from "@/lib/gameData";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [discoveredZones, setDiscoveredZones] = useState<Set<string>>(new Set());
  const [showAbout, setShowAbout] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [easterEggCount, setEasterEggCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [completionShown, setCompletionShown] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Check for completion
  useEffect(() => {
    if (discoveredZones.size === ZONES.length && !completionShown) {
      setTimeout(() => {
        setShowCompletion(true);
        setCompletionShown(true);
      }, 800);
    }
  }, [discoveredZones, completionShown]);

  const handleStartGame = useCallback(() => {
    setGameStarted(true);
    setShowDialog(true);
    setDialogIndex(0);
  }, []);

  const handleZoneClick = useCallback((zone: Zone) => {
    setActiveZone(zone);
    setShowDialog(false);
    setDiscoveredZones((prev) => {
      const next = new Set(Array.from(prev));
      next.add(zone.id);
      return next;
    });
  }, []);

  const handleCloseZone = useCallback(() => {
    setActiveZone(null);
  }, []);

  const handleNextDialog = useCallback(() => {
    if (dialogIndex < EASTER_EGGS.punnyDialogues.length - 1) {
      setDialogIndex((prev) => prev + 1);
    } else {
      setShowDialog(false);
    }
  }, [dialogIndex]);

  const handleDismissDialog = useCallback(() => {
    setShowDialog(false);
  }, []);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showDialog && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        handleNextDialog();
      }
      if (e.key === "Escape") {
        if (activeZone) handleCloseZone();
        else if (showAbout) setShowAbout(false);
        else if (showTestimonials) setShowTestimonials(false);
        else if (showCompletion) setShowCompletion(false);
        else if (showDialog) setShowDialog(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showDialog, activeZone, showAbout, showTestimonials, showCompletion, handleNextDialog, handleCloseZone]);

  // Konami code Easter egg
  useEffect(() => {
    const konamiCode = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "KeyB", "KeyA",
    ];
    let konamiIndex = 0;

    const handleKonami = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setEasterEggCount((prev) => prev + 1);
          konamiIndex = 0;
          document.body.classList.add("konami-active");
          setTimeout(() => document.body.classList.remove("konami-active"), 3000);
        }
      } else {
        konamiIndex = 0;
      }
    };
    window.addEventListener("keydown", handleKonami);
    return () => window.removeEventListener("keydown", handleKonami);
  }, []);

  return (
    <div className="min-h-screen bg-[#f0e6d3] overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!gameStarted ? (
          <IntroScreen key="intro" onStart={handleStartGame} />
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen"
          >
            <HUD
              discoveredZones={discoveredZones}
              totalZones={ZONES.length}
              easterEggs={easterEggCount}
              onAboutClick={() => setShowAbout(true)}
              onTestimonialsClick={() => setShowTestimonials(true)}
              onHintClick={() => {
                setShowDialog(true);
                setDialogIndex(Math.floor(Math.random() * EASTER_EGGS.punnyDialogues.length));
              }}
            />

            <OverworldMap
              zones={ZONES}
              discoveredZones={discoveredZones}
              onZoneClick={handleZoneClick}
            />

            {isMobile && (
              <MobileNav
                zones={ZONES}
                onZoneClick={handleZoneClick}
                onAboutClick={() => setShowAbout(true)}
                onTestimonialsClick={() => setShowTestimonials(true)}
              />
            )}

            <AnimatePresence>
              {showDialog && !activeZone && (
                <DialogBox
                  message={EASTER_EGGS.punnyDialogues[dialogIndex]}
                  onNext={handleNextDialog}
                  onDismiss={handleDismissDialog}
                  isLast={dialogIndex === EASTER_EGGS.punnyDialogues.length - 1}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {activeZone && (
                <ZoneModal zone={activeZone} onClose={handleCloseZone} />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showAbout && (
                <AboutSection onClose={() => setShowAbout(false)} />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showTestimonials && (
                <TestimonialsSection onClose={() => setShowTestimonials(false)} />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showCompletion && (
                <CompletionBanner onDismiss={() => setShowCompletion(false)} />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
