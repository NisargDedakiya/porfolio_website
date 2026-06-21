"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import { bugBountyPlatforms } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

// Custom SVG Icons for HackerOne and Bugcrowd to look extremely premium
const HackerOneIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm8.5 14.25L12 20.5l-8.5-4.25V8.75L12 4.5l8.5 4.25v7.5z" />
    <path d="M11 7h2v5h-2zm0 6h2v4h-2z" />
  </svg>
);

const BugcrowdIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2a9.927 9.927 0 00-7.07 2.93A9.927 9.927 0 002 12c0 2.76 1.12 5.26 2.93 7.07C6.74 20.88 9.24 22 12 22s5.26-1.12 7.07-2.93C20.88 17.26 22 14.76 22 12s-1.12-5.26-2.93-7.07A9.927 9.927 0 0012 2zm0 2c1.93 0 3.68.78 4.95 2.05A6.953 6.953 0 0119 11v1c0 1.93-.78 3.68-2.05 4.95A6.953 6.953 0 0112 19c-1.93 0-3.68-.78-4.95-2.05A6.953 6.953 0 015 12v-1c0-1.93.78-3.68 2.05-4.95A6.953 6.953 0 0112 4zm-2.5 5.5v1h5v-1h-5zm0 3v1h5v-1h-5z" />
  </svg>
);

export function BugBounty() {
  return (
    <section id="bug-bounty" className="relative w-full py-24 bg-brand-bg/95 border-b border-brand-primary/5 z-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16 border-b border-brand-primary/10 pb-6">
          <div>
            <div className="text-[10px] text-brand-primary font-sans tracking-widest uppercase mb-1">
              Active Engagements
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight">
              Active Engagements
            </h2>
            <p className="text-sm text-text-secondary max-w-2xl mt-4 font-sans leading-relaxed">
              Actively learning and practicing web application security through bug bounty programs, vulnerability research, labs, and real-world security testing.
            </p>
          </div>
          <div className="font-sans text-xs text-brand-success border border-brand-success/15 bg-brand-card/50 px-3 py-1.5 rounded flex items-center gap-2 self-start md:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
            Active Profiles
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bugBountyPlatforms.map((platform, pIdx) => {
            const isH1 = platform.name === "HackerOne";
            const iconColor = "text-brand-primary"; // Use Red Team Primary Accent color
            const glowColor = "red"; // Frame with Red Team Accent glow

            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: pIdx * 0.1 }}
              >
                <GlassCard glowColor={glowColor} className="h-full flex flex-col justify-between gap-6">
                  <div>
                    {/* Platform Header */}
                    <div className="flex items-center gap-4 border-b border-white/5 pb-4 mb-5">
                      <div className="p-3 rounded bg-brand-bg border border-white/5 shrink-0 flex items-center justify-center">
                        {isH1 ? (
                          <HackerOneIcon className={`w-7 h-7 ${iconColor}`} />
                        ) : (
                          <BugcrowdIcon className={`w-7 h-7 ${iconColor}`} />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white font-mono uppercase leading-none mb-1.5">
                          {platform.name} Profile
                        </h3>
                        <p className="text-xs text-brand-primary font-mono lowercase">
                          @{platform.username}
                        </p>
                      </div>
                    </div>

                    {/* Stats Counter Placeholders */}
                    <div className="grid grid-cols-2 gap-4 font-mono text-xs mb-4">
                      <div className="bg-brand-bg/60 border border-white/5 p-3 rounded flex flex-col gap-1">
                        <span className="text-[8px] uppercase tracking-wider text-white/30">
                          Programs Participated
                        </span>
                        <span className="text-lg font-extrabold text-white">
                          {platform.programsParticipated}
                        </span>
                      </div>
                      <div className="bg-brand-bg/60 border border-white/5 p-3 rounded flex flex-col gap-1">
                        <span className="text-[8px] uppercase tracking-wider text-white/30">
                          Findings Resolved
                        </span>
                        <span className="text-lg font-extrabold text-white">
                          {platform.findingsCount}
                        </span>
                      </div>
                    </div>

                    {/* Focus Area */}
                    <div className="bg-brand-bg/60 border border-white/5 p-3 rounded flex flex-col gap-1 font-mono text-xs mb-6">
                      <span className="text-[8px] uppercase tracking-wider text-white/30">
                        Research Focus
                      </span>
                      <span className="text-xs font-semibold text-brand-primary truncate">
                        {platform.researchFocus.toUpperCase()}
                      </span>
                    </div>

                    {/* Achievements Placeholders */}
                    <div className="flex flex-col gap-3">
                      <h4 className="font-mono font-bold text-[10px] uppercase text-text-secondary tracking-widest flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-brand-primary" />
                        Achievements
                      </h4>
                      <div className="flex flex-col gap-2 font-mono text-[9px] text-text-secondary">
                        {platform.achievements.map((ach) => (
                          <div key={ach} className="flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-brand-success shrink-0" />
                            <span>{ach.toUpperCase()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions CTA */}
                  <div className="border-t border-white/5 pt-5 mt-4">
                    <Button
                      variant="primary"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => window.open(platform.profileUrl, "_blank")}
                      aria-label={`View Nisarg's ${platform.name} profile`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View {platform.name} Profile
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
