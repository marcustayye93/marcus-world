/*
 * The Journey of Marcus — Home Page
 * Design: Ghibli Pixel Overworld — 8-bit RPG meets Studio Ghibli warmth
 * An interactive overworld map where visitors click on buildings to explore zones
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroScreen from "@/components/IntroScreen";
import OverworldMap from "@/components/OverworldMap";
import ZoneModal from "@/components/ZoneModal";
import HUD from "@/components/HUD";
import DialogBox from "@/components/DialogBox";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MobileNav from "@/components/MobileNav";
import MobileBuildingList from "@/components/MobileBuildingList";
import CompletionBanner from "@/components/CompletionBanner";
import ResumeSnapshot from "@/components/ResumeSnapshot";
import ConnectFooter from "@/components/ConnectFooter";
import QuestChecklist from "@/components/QuestChecklist";
import PixelLoadingScreen from "@/components/PixelLoadingScreen";
import { ZONES, EASTER_EGGS, ASSET_URLS, type Zone } from "@/lib/gameData";
import { playStartGame, playBuildingEnter, playDiscovery, playClose, playTab, playClick, setMuted } from "@/lib/sfx";

export default function Home() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [immersionMode, setImmersionMode] = useState<"full" | "quick" | "resume" | null>(null);
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [discoveredZones, setDiscoveredZones] = useState<Set<string>>(new Set());
  const [showAbout, setShowAbout] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showSnapshot, setShowSnapshot] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [easterEggCount, setEasterEggCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [completionShown, setCompletionShown] = useState(false);

  // Quest tracking state
  const [resumeOpened, setResumeOpened] = useState(false);
  const [aboutOpened, setAboutOpened] = useState(false);
  const [testimonialsOpened, setTestimonialsOpened] = useState(false);

  // Music state
  const [musicMuted, setMusicMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Initialize audio when game starts
  useEffect(() => {
    if (gameStarted && !audioRef.current) {
      const audio = new Audio(ASSET_URLS.bgMusic);
      audio.loop = true;
      audio.volume = 0.25;
      audioRef.current = audio;
      // Try to play — browsers may block autoplay until user interaction
      audio.play().catch(() => {
        // Autoplay blocked; will play on next user interaction
        const playOnInteraction = () => {
          audio.play().catch(() => {});
          document.removeEventListener("click", playOnInteraction);
          document.removeEventListener("keydown", playOnInteraction);
        };
        document.addEventListener("click", playOnInteraction);
        document.addEventListener("keydown", playOnInteraction);
      });
    }
    return () => {
      // Cleanup on unmount
    };
  }, [gameStarted]);

  // Sync mute state with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = musicMuted;
    }
  }, [musicMuted]);

  // Pause music when tab is hidden / closed, resume when visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
      } else if (gameStarted && !musicMuted) {
        audioRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [gameStarted, musicMuted]);

  const handleToggleMusic = useCallback(() => {
    setMusicMuted((prev) => {
      const next = !prev;
      setMuted(next); // Sync SFX mute with music mute
      return next;
    });
    playClick();
  }, []);

  const [gameStartTime, setGameStartTime] = useState(0);

  const handleStartGame = useCallback(() => {
    playStartGame();
    setGameStarted(true);
    setGameStartTime(Date.now());
    // Delay showing dialog to avoid Enter key double-trigger
    setTimeout(() => {
      setShowDialog(true);
      setDialogIndex(0);
    }, 300);
  }, []);

  const handleZoneClick = useCallback((zone: Zone) => {
    const wasDiscovered = discoveredZones.has(zone.id);
    playBuildingEnter();
    setActiveZone(zone);
    setShowDialog(false);
    setDiscoveredZones((prev) => {
      const next = new Set(Array.from(prev));
      next.add(zone.id);
      return next;
    });
    // Play discovery fanfare if this is a new zone
    if (!wasDiscovered) {
      setTimeout(() => playDiscovery(), 400);
    }
  }, [discoveredZones]);

  const handleCloseZone = useCallback(() => {
    playClose();
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

  // Keyboard handler for modals (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle dialog advancement when dialog is showing and no zone is open
      // Ignore for first 600ms after game start to prevent double-trigger
      if (showDialog && !activeZone && (e.key === " " || e.key === "Enter")) {
        if (Date.now() - gameStartTime > 600) {
          handleNextDialog();
        }
      }
      if (e.key === "Escape") {
        if (activeZone) handleCloseZone();
        else if (showAbout) setShowAbout(false);
        else if (showTestimonials) setShowTestimonials(false);
        else if (showSnapshot) setShowSnapshot(false);
        else if (showConnect) setShowConnect(false);
        else if (showCompletion) setShowCompletion(false);
        else if (showDialog) setShowDialog(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showDialog, activeZone, showAbout, showTestimonials, showSnapshot, showConnect, showCompletion, handleNextDialog, handleCloseZone, gameStartTime]);

  // Konami code Easter egg
  useEffect(() => {
    const konamiCode = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "KeyB", "KeyA",
    ];
    let konamiIndex = 0;
    let lastKeyTime = 0;

    const handleKonami = (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastKeyTime > 800) {
        konamiIndex = 0;
      }
      lastKeyTime = now;

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

  // Assets to preload
  const assetsToPreload = [
    ASSET_URLS.overworld,
    ASSET_URLS.marcusPortrait,
    ASSET_URLS.bgMusic,
  ];

  // Handle immersion mode selection
  const handleImmersionSelect = useCallback((mode: "full" | "quick" | "resume") => {
    setImmersionMode(mode);
    playStartGame();
    setGameStarted(true);
    setGameStartTime(Date.now());

    if (mode === "resume") {
      // Go straight to resume
      setTimeout(() => { setShowSnapshot(true); setResumeOpened(true); }, 400);
    } else if (mode === "quick") {
      // Quick tour: skip dialog, auto-open About section for a quick overview
      setTimeout(() => {
        setShowAbout(true);
        setAboutOpened(true);
      }, 600);
    } else {
      // Full adventure: show dialog
      setTimeout(() => {
        setShowDialog(true);
        setDialogIndex(0);
      }, 300);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f0e6d3] overflow-hidden relative">
      {/* Pixel loading screen — preloads key assets */}
      {!assetsLoaded && (
        <PixelLoadingScreen
          onLoaded={() => setAssetsLoaded(true)}
          assetsToLoad={assetsToPreload}
        />
      )}

      <AnimatePresence mode="wait">
        {!gameStarted ? (
          <IntroScreen
            key="intro"
            onStart={handleStartGame}
            onSkipToResume={() => handleImmersionSelect("resume")}
            onImmersionSelect={handleImmersionSelect}
          />
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
              onAboutClick={() => { playTab(); setShowAbout(true); setAboutOpened(true); }}
              onTestimonialsClick={() => { playTab(); setShowTestimonials(true); setTestimonialsOpened(true); }}
              onHintClick={() => {
                playClick();
                setShowDialog(true);
                setDialogIndex(Math.floor(Math.random() * EASTER_EGGS.punnyDialogues.length));
              }}
              onSnapshotClick={() => { playTab(); setShowSnapshot(true); setResumeOpened(true); }}
              onConnectClick={() => { playTab(); setShowConnect(true); }}
              musicMuted={musicMuted}
              onToggleMusic={handleToggleMusic}
            />

            <OverworldMap
              zones={ZONES}
              discoveredZones={discoveredZones}
              onZoneClick={handleZoneClick}
              onSnapshotClick={() => setShowSnapshot(true)}
            />

            {/* Mobile building list — always visible on small screens */}
            {isMobile && (
              <MobileBuildingList
                zones={ZONES}
                discoveredZones={discoveredZones}
                onZoneClick={handleZoneClick}
              />
            )}

            {isMobile && (
              <MobileNav
                zones={ZONES}
                onZoneClick={handleZoneClick}
                onAboutClick={() => setShowAbout(true)}
                onTestimonialsClick={() => setShowTestimonials(true)}
                onSnapshotClick={() => setShowSnapshot(true)}
                onConnectClick={() => setShowConnect(true)}
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
                <AboutSection onClose={() => { playClose(); setShowAbout(false); }} />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showTestimonials && (
                <TestimonialsSection onClose={() => { playClose(); setShowTestimonials(false); }} />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showSnapshot && (
                <ResumeSnapshot onClose={() => { playClose(); setShowSnapshot(false); }} />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showConnect && (
                <ConnectFooter onClose={() => { playClose(); setShowConnect(false); }} />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showCompletion && (
                <CompletionBanner onDismiss={() => setShowCompletion(false)} />
              )}
            </AnimatePresence>

            {/* Quest checklist — only show in full adventure mode */}
            {immersionMode !== "quick" && immersionMode !== "resume" && <QuestChecklist
              discoveredZones={discoveredZones}
              totalZones={ZONES.length}
              resumeOpened={resumeOpened}
              testimonialsOpened={testimonialsOpened}
              aboutOpened={aboutOpened}
              easterEggFound={easterEggCount > 0}
            />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
