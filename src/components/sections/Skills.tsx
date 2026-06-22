"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Key, Terminal as TerminalIcon, Cpu, Settings } from "lucide-react";
import { skillsData, Skill } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { Magnetic } from "@/components/ui/Magnetic";

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const getCategoryIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "offensive security":
        return <Shield className="w-4 h-4 text-brand-primary" />;
      case "defensive security":
        return <Key className="w-4 h-4 text-brand-success" />;
      case "development":
        return <Cpu className="w-4 h-4 text-brand-warning" />;
      case "tools & infrastructure":
        return <Settings className="w-4 h-4 text-brand-primary/80" />;
      default:
        return <TerminalIcon className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Skill["status"]) => {
    switch (status) {
      case "Active":
        return "text-brand-success border-brand-success/30 bg-brand-success/5";
      case "Armed":
        return "text-brand-primary border-brand-primary/30 bg-brand-primary/5";
      case "Ready":
        return "text-white/80 border-white/20 bg-white/5";
      case "Compiling":
        return "text-brand-warning border-brand-warning/30 bg-brand-warning/5 animate-pulse";
      default:
        return "text-text-secondary border-white/10";
    }
  };

  const getLevelLabel = (level: number) => {
    if (level >= 88) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Intermediate";
    return "Familiar";
  };

  const getLevelColor = (level: number) => {
    if (level >= 88) return "text-brand-primary";
    if (level >= 80) return "text-brand-secondary";
    if (level >= 70) return "text-brand-success";
    return "text-text-secondary";
  };

  const categories = ["All", ...skillsData.map((c) => c.title)];

  const filteredCategories =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((c) => c.title === activeCategory);

  return (
    <section id="skills" className="relative w-full py-16 md:py-24 bg-brand-bg/95 border-b border-brand-primary/5 z-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-brand-primary/10 pb-6">
          <div>
            <div className="text-[10px] text-brand-primary font-sans tracking-widest uppercase mb-1">
              System Skill Mapping
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight">
              Capabilities
            </h2>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 font-mono text-xs">
            {categories.map((cat) => (
              <Magnetic key={cat} strength={0.15}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  suppressHydrationWarning
                  className={`px-3 py-1.5 rounded transition-all duration-300 border uppercase tracking-wider text-[10px] font-bold ${
                    activeCategory === cat
                      ? "bg-brand-primary/10 border-brand-primary text-brand-primary shadow-[0_0_12px_rgba(0,217,255,0.15)]"
                      : "bg-brand-card/40 border-white/5 text-text-secondary hover:border-brand-primary/30 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* Skill Category Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, catIdx) => (
              <motion.div
                key={category.title}
                layout
                initial={{ opacity: 0, scale: 0.98, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: catIdx * 0.08 }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <GlassCard glowColor="none" className="h-full flex flex-col gap-6">
                    {/* Category Title */}
                    <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                      <div className="p-2 rounded bg-brand-bg border border-white/5">
                        {getCategoryIcon(category.title)}
                      </div>
                      <div>
                        <h3 className="font-bold text-white font-sans text-sm uppercase tracking-wide">
                          {category.title}
                        </h3>
                        <p className="text-[9px] text-text-secondary font-sans uppercase tracking-widest mt-0.5">
                          Domain: {category.title}
                        </p>
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="flex flex-col gap-6">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="flex flex-col gap-3 p-4 bg-brand-bg/50 border border-white/5 rounded-lg hover:border-brand-secondary/20 transition-all duration-300">
                          {/* Name, Status, Percentage */}
                          <div className="flex items-center justify-between font-mono text-xs">
                            <span className="text-white font-bold text-sm tracking-tight">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              {/* Status Pill */}
                              <Magnetic strength={0.12}>
                                <span
                                  className={`text-[8px] px-2 py-0.5 rounded border tracking-widest font-bold uppercase ${getStatusColor(
                                    skill.status
                                  )}`}
                                >
                                  {skill.status}
                                </span>
                              </Magnetic>
                              <span className={`font-mono text-[9px] px-2 py-0.5 rounded border uppercase font-bold tracking-wider ${getLevelColor(skill.level)} bg-white/2`}>
                                {getLevelLabel(skill.level)}
                              </span>
                            </div>
                          </div>

                          {/* Render Sub-skills Tags */}
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {skill.subskills.map((sub) => (
                              <span
                                key={sub}
                                className="bg-brand-card/70 border border-white/5 px-2 py-0.5 rounded text-[9px] text-text-secondary font-sans tracking-wide"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
