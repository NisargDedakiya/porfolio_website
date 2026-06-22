"use client";

import React from "react";
import { Shield, User, GraduationCap, Target, Key, Cpu } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";

export function About() {
  const getIcon = (interest: string) => {
    switch (interest.toLowerCase()) {
      case "cybersecurity":
        return <Shield className="w-5 h-5 text-brand-primary" />;
      case "bug bounty hunting":
      case "bug bounty":
        return <Key className="w-5 h-5 text-brand-success" />;
      case "digital forensics":
        return <Cpu className="w-5 h-5 text-brand-secondary" />;
      default:
        return <Shield className="w-5 h-5 text-brand-primary" />;
    }
  };

  return (
    <section id="about" className="relative w-full py-16 md:py-24 bg-brand-bg/90 border-b border-white/5 z-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16 border-b border-brand-primary/10 pb-6">
          <div>
            <div className="text-[10px] text-brand-primary font-sans tracking-widest uppercase mb-1">
              Professional Profile
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight">
              About Me
            </h2>
          </div>
          <div className="font-sans text-xs text-text-secondary border border-brand-primary/15 bg-brand-card/50 px-3 py-1.5 rounded flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
            Active Status
          </div>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Dossier Card Column (Left, 5 cols) */}
          <div className="lg:col-span-5">
            <GlassCard glowColor="cyan" className="flex flex-col gap-6">
              {/* Profile Brief Header */}
              <div className="flex items-center gap-4 border-b border-brand-secondary/15 pb-4">
                <div className="w-16 h-16 rounded-lg border border-brand-secondary/20 bg-brand-bg flex items-center justify-center relative overflow-hidden group">
                  <User className="w-8 h-8 text-brand-secondary group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/10 to-transparent pointer-events-none" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white leading-none mb-1.5 font-sans">
                    {personalInfo.name}
                  </h3>
                  <p className="text-[10px] text-brand-secondary font-sans tracking-wider uppercase truncate leading-none">
                    Security Student & Hunter
                  </p>
                </div>
              </div>

              {/* Profile Details List */}
              <div className="flex flex-col gap-1 font-sans text-xs text-text-secondary">
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 py-2.5 gap-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-white/40">Status</span>
                  <span className="text-brand-success font-semibold sm:text-right">Active Student & Researcher</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 py-2.5 gap-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-white/40">Specialization</span>
                  <span className="text-brand-primary font-semibold sm:text-right">Offensive Security</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 py-2.5 gap-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-white/40">Academic Track</span>
                  <span className="text-white font-medium sm:text-right">B.Tech CSE Student</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 py-2.5 gap-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-white/40">Focus Areas</span>
                  <span className="text-brand-secondary font-semibold sm:text-right">Bug Bounty & Automation</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2.5 gap-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-white/40">Platform Rank</span>
                  <span className="text-brand-success font-bold sm:text-right">TryHackMe Top 1%</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Description and Interests Column (Right, 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Professional Summary */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5 text-brand-secondary">
                <GraduationCap className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-sm tracking-wider uppercase font-sans">Academic Track & Focus</h3>
              </div>
              <p className="text-text-secondary leading-relaxed text-sm font-sans">
                {personalInfo.about.bio}
              </p>
            </div>

            {/* Career Goal */}
            <div className="flex flex-col gap-3 border-l-2 border-brand-secondary/20 pl-4 py-1">
              <div className="flex items-center gap-2 text-brand-warning">
                <Target className="w-4 h-4 shrink-0" />
                <h4 className="font-bold text-xs uppercase tracking-wider font-sans">Mission Statement</h4>
              </div>
              <p className="text-text-secondary italic text-xs leading-relaxed font-sans">
                &quot;{personalInfo.about.goal}&quot;
              </p>
            </div>

            {/* Core Focus Fields */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-sm tracking-wider uppercase text-brand-primary font-sans">
                Core Focus Fields
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personalInfo.about.interests.map((interest, idx) => (
                  <GlassCard
                    key={idx}
                    className="p-4 flex items-start gap-3 bg-brand-card/25 border border-white/5 hover:border-brand-secondary/20 transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-brand-bg border border-white/5 shrink-0">
                      {getIcon(interest)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs font-sans">{interest}</h4>
                      <p className="text-[10px] text-text-secondary mt-1 font-sans">
                        Actively researching and testing in simulated environments.
                      </p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
