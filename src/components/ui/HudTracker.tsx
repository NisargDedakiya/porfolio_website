"use client";

import React, { useEffect, useState } from "react";
import { Shield, ShieldAlert, Cpu, Network, Lock, Unlock } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";

interface ClearanceLevel {
  id: string;
  level: number;
  label: string;
  codename: string;
}

const clearanceLevels: ClearanceLevel[] = [
  { id: "about", level: 1, label: "Operator Profile", codename: "OP_01_PROF" },
  { id: "skills", level: 2, label: "Capabilities", codename: "OP_02_CAPS" },
  { id: "projects", level: 3, label: "Operations Archive", codename: "OP_03_ARCH" },
  { id: "progression", level: 4, label: "Operator Progression", codename: "OP_04_PROG" },
  { id: "engagements", level: 5, label: "Active Engagements", codename: "OP_05_ENGA" },
  { id: "certifications", level: 6, label: "Qualifications", codename: "OP_06_QUAL" },
  { id: "blog", level: 7, label: "Research Log", codename: "OP_07_RESE" },
  { id: "contact", level: 8, label: "Mission Contact", codename: "OP_08_COMM" },
];

export function HudTracker() {
  const activeSection = useActiveSection([
    "hero",
    "about",
    "skills",
    "projects",
    "progression",
    "engagements",
    "certifications",
    "blog",
    "contact",
  ]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [ping, setPing] = useState(24);

  // Simple simulated system fluctuation for ping
  useEffect(() => {
    const interval = setInterval(() => {
      setPing((prev) => Math.max(12, Math.min(48, prev + Math.floor(Math.random() * 7) - 3)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Update clearance level based on active section
  useEffect(() => {
    if (!activeSection || activeSection === "hero") {
      setCurrentLevel(0);
      return;
    }
    const matchingLevel = clearanceLevels.find((level) => level.id === activeSection);
    if (matchingLevel) {
      setCurrentLevel(matchingLevel.level);
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-6 w-64 bg-brand-bg/60 backdrop-blur-md border border-brand-primary/10 p-5 rounded-lg cyber-glass-glow-cyan font-mono text-xs select-none">
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-brand-primary/20 pb-3 mb-2">
        <div className="flex items-center gap-2 text-brand-primary">
          <Shield className="w-4 h-4 animate-pulse" />
          <span className="font-bold tracking-wider uppercase text-[10px]">Security HUD</span>
        </div>
        <div className="text-[9px] text-brand-success flex items-center gap-1 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-ping" />
          ONLINE
        </div>
      </div>

      {/* Diagnostics */}
      <div className="grid grid-cols-2 gap-2 text-[10px] text-text-secondary border-b border-brand-primary/10 pb-3">
        <div className="flex flex-col">
          <span className="text-[8px] uppercase tracking-tight text-white/40">SYS_PING</span>
          <span className="font-bold text-brand-primary">{ping}ms</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] uppercase tracking-tight text-white/40">SYS_INTEGRITY</span>
          <span className="font-bold text-brand-success">100%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] uppercase tracking-tight text-white/40">ENCRYPT_KEY</span>
          <span className="font-bold text-brand-warning">AES_256</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] uppercase tracking-tight text-white/40">HUD_STATE</span>
          <span className="font-bold text-brand-primary">ACTIVE</span>
        </div>
      </div>

      {/* Security Clearance Levels */}
      <div className="flex flex-col gap-3 my-2">
        <div className="text-[9px] text-text-secondary uppercase tracking-wider mb-1 font-semibold flex items-center justify-between">
          <span>Access Clearance:</span>
          <span className="text-brand-primary font-bold">
            {currentLevel > 0 ? `LEVEL_0${currentLevel}` : "LEVEL_NULL"}
          </span>
        </div>

        {clearanceLevels.map((lvl) => {
          const isUnlocked = currentLevel >= lvl.level;
          const isActive = activeSection === lvl.id;

          return (
            <button
              key={lvl.id}
              onClick={() => scrollToSection(lvl.id)}
              className={`group flex items-center gap-3 text-left w-full p-2.5 rounded transition-all duration-300 border ${
                isActive
                  ? "bg-brand-primary/10 border-brand-primary text-white"
                  : isUnlocked
                  ? "bg-brand-card/30 border-white/5 text-brand-primary hover:border-brand-primary/50"
                  : "bg-brand-card/10 border-white/2 opacity-40 cursor-not-allowed text-text-secondary"
              }`}
              disabled={false} // Allow clicks to scroll anyway for better UX
            >
              <div className="flex items-center justify-center shrink-0">
                {isUnlocked ? (
                  <Unlock className={`w-3.5 h-3.5 ${isActive ? "text-brand-success" : "text-brand-primary"}`} />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-brand-warning" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center text-[9px] text-text-secondary font-bold group-hover:text-brand-primary transition-colors">
                  <span>{lvl.codename}</span>
                  {isActive && <span className="text-brand-success text-[8px] animate-pulse">● ACTIVE</span>}
                </div>
                <div className="font-sans font-medium text-xs truncate leading-tight mt-0.5">
                  {lvl.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Cyber Footer Details */}
      <div className="text-[8px] text-white/30 text-center uppercase tracking-widest mt-1">
        SYS_VER: 2026.06.20 // NISARG_D
      </div>
    </div>
  );
}
