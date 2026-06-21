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

  const categories = ["All", ...skillsData.map((c) => c.title)];

  const filteredCategories =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((c) => c.title === activeCategory);

  return (
    <section id="skills" className="relative w-full py-24 bg-brand-bg/95 border-b border-brand-primary/5 z-10 px-6">
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
                    <div className="flex flex-col gap-5">
                      {category.skills.map((skill, skillIdx) => (
                        <div key={skill.name} className="flex flex-col gap-2">
                          {/* Name, Status, Percentage */}
                          <div className="flex items-center justify-between font-mono text-xs">
                            <span className="text-white font-medium">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              {/* Status Pill */}
                              <Magnetic strength={0.12}>
                                <span
                                  className={`text-[8px] px-2 py-0.5 rounded-full border tracking-widest font-bold uppercase ${getStatusColor(
                                    skill.status
                                  )}`}
                                >
                                  {skill.status}
                                </span>
                              </Magnetic>
                              <span className="text-brand-primary font-bold">{skill.level}%</span>
                            </div>
                          </div>

                          {/* Progress Track */}
                          <div className="relative w-full h-2 bg-brand-bg border border-white/5 rounded overflow-hidden">
                            {/* Animated Progress Bar */}
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: false }}
                              transition={{ duration: 1, delay: skillIdx * 0.1 }}
                              className={`absolute top-0 left-0 h-full rounded ${
                                category.title.toLowerCase().includes("offensive")
                                  ? "bg-gradient-to-r from-brand-primary/80 to-brand-primary shadow-[0_0_10px_var(--brand-primary)]"
                                  : category.title.toLowerCase().includes("defensive")
                                  ? "bg-gradient-to-r from-brand-success/80 to-brand-success shadow-[0_0_10px_var(--brand-success)]"
                                  : "bg-gradient-to-r from-brand-warning/80 to-brand-warning shadow-[0_0_10px_var(--brand-warning)]"
                              }`}
                            />
                            
                            {/* Grid Sub-Divisions */}
                            <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
                              <div className="w-[1px] h-full bg-white/20" />
                              <div className="w-[1px] h-full bg-white/20" />
                              <div className="w-[1px] h-full bg-white/20" />
                              <div className="w-[1px] h-full bg-white/20" />
                              <div className="w-[1px] h-full bg-white/20" />
                              <div className="w-[1px] h-full bg-white/20" />
                              <div className="w-[1px] h-full bg-white/20" />
                              <div className="w-[1px] h-full bg-white/20" />
                              <div className="w-[1px] h-full bg-white/20" />
                            </div>
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
