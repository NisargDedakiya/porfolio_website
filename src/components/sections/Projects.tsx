"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch, AlertCircle, CheckCircle2, Award, ChevronDown } from "lucide-react";
import { projectsData, Project } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { TiltCard } from "@/components/ui/TiltCard";

export function Projects() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "Operational":
        return "text-brand-success border-brand-success/30 bg-brand-success/5";
      case "Beta":
        return "text-brand-secondary border-brand-secondary/30 bg-brand-secondary/5";
      case "Development":
        return "text-brand-warning border-brand-warning/30 bg-brand-warning/5";
      case "Planned":
      default:
        return "text-white/40 border-white/10 bg-white/5";
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedProject((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="relative w-full py-16 md:py-24 bg-brand-bg/90 border-b border-white/5 z-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-20 border-b border-brand-primary/10 pb-6">
          <div>
            <div className="text-[10px] text-brand-primary font-sans tracking-widest uppercase mb-1">
              Case Studies
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight">
              Featured Case Studies
            </h2>
            <p className="text-sm text-text-secondary mt-2 max-w-xl font-sans">
              Detailed breakdown of specialized security tooling, full-stack frameworks, and automated analysis systems.
            </p>
          </div>
          <div className="font-mono text-xs text-brand-secondary border border-brand-secondary/20 bg-brand-card/50 px-3 py-1.5 rounded flex items-center gap-2 self-start md:self-auto">
            <span>Featured Work: {projectsData.length} {projectsData.length === 1 ? "Project" : "Projects"}</span>
          </div>
        </div>

        {/* Projects Case Study List */}
        <div className="flex flex-col gap-12">
          {projectsData.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const isExpanded = expandedProject === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
              >
                <TiltCard>
                  <GlassCard className="p-6 md:p-8 flex flex-col gap-6 hover:border-brand-secondary/20 transition-all duration-300">
                    
                    {/* Top Header / Layout Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      
                      {/* Project Image Mockup (lg:col-span-5) */}
                      <div className={`lg:col-span-5 w-full relative h-[220px] md:h-[280px] rounded-lg border border-white/10 overflow-hidden bg-brand-bg/50 group ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                        <Image
                          src={project.image}
                          alt={`${project.name} Dashboard Mockup`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/85 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Project Tech Stack Overlay (Mobile Only) */}
                        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 lg:hidden z-10">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="bg-brand-card/90 border border-white/10 text-[9px] text-white/90 px-2 py-0.5 rounded font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Primary Info (lg:col-span-7) */}
                      <div className={`lg:col-span-7 flex flex-col gap-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                        
                        {/* Title & Status */}
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl md:text-2xl font-bold text-white font-sans tracking-tight">
                            {project.name}
                          </h3>
                          <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border uppercase ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>

                        {/* Role & Core Deployment Stack */}
                        <div className="flex flex-col gap-2.5 text-xs text-text-secondary">
                          <div className="flex items-center gap-1.5 font-sans">
                            <span className="text-brand-secondary font-bold font-sans">Role:</span>
                            <span className="text-white font-semibold">{project.role}</span>
                          </div>
                          {project.securityFocus && (
                            <div className="flex items-center gap-1.5 font-sans">
                              <span className="text-brand-primary font-bold font-sans">Focus:</span>
                              <span className="text-brand-success font-semibold px-2 py-0.5 border border-brand-success/15 bg-brand-success/5 rounded text-[10px] tracking-wide uppercase">{project.securityFocus}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-text-secondary leading-relaxed font-sans">
                          {project.tagline}
                        </p>

                        {/* Operational Telemetry Metrics */}
                        {project.metrics && (
                          <div className="grid grid-cols-3 gap-3 my-2 font-mono text-[10px]">
                            {project.metrics.map((metric) => (
                              <div key={metric.label} className="bg-brand-bg/60 border border-white/5 p-2 rounded flex flex-col gap-0.5 text-left">
                                <span className="text-[7.5px] uppercase tracking-wider text-white/30 truncate">
                                  {metric.label}
                                </span>
                                <span className="text-xs font-black text-white truncate">
                                  {metric.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Desktop Tech Stack */}
                        <div className="hidden lg:flex flex-wrap gap-2 mt-1">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="bg-brand-bg border border-white/5 px-2.5 py-1 rounded text-[10px] text-white/70 font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Expandable Case Study Details Button */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-white/5">
                          <button
                            onClick={() => toggleExpand(project.id)}
                            suppressHydrationWarning
                            className="flex items-center gap-1.5 text-xs text-brand-secondary hover:text-white font-semibold font-sans transition-colors self-start sm:self-auto"
                          >
                            {isExpanded ? "Hide Details" : "View Case Study"}
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                          </button>
                          
                          <div className="flex flex-wrap gap-2.5 w-full sm:w-auto sm:ml-auto justify-start sm:justify-end">
                            {project.githubUrl && (
                              <Button
                                variant="secondary"
                                size="sm"
                                className="flex-1 sm:flex-none text-[11px] px-3.5 py-1.5 font-sans border border-white/10 text-white hover:border-brand-primary/40 flex items-center gap-1.5"
                                onClick={() => window.open(project.githubUrl, "_blank")}
                              >
                                <GitBranch className="w-3.5 h-3.5" />
                                View Source
                              </Button>
                            )}
                            {project.liveUrl && (
                              <Button
                                variant="primary"
                                size="sm"
                                className="flex-1 sm:flex-none text-[11px] px-3.5 py-1.5 font-sans flex items-center gap-1.5"
                                onClick={() => window.open(project.liveUrl, "_blank")}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                View Project
                              </Button>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Expandable Case Study Details Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/10 mt-6 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Problem */}
                            <div className="flex items-start gap-3 p-4 bg-brand-bg/50 border border-brand-primary/10 rounded-lg">
                              <AlertCircle className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-sans font-bold text-xs uppercase text-brand-primary tracking-wider mb-1.5">
                                  Problem Statement
                                </h4>
                                <p className="text-text-secondary text-xs leading-relaxed font-sans">
                                  {project.problem}
                                </p>
                              </div>
                            </div>

                            {/* Solution */}
                            <div className="flex items-start gap-3 p-4 bg-brand-bg/50 border border-brand-success/15 rounded-lg">
                              <CheckCircle2 className="w-5 h-5 text-brand-success shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-sans font-bold text-xs uppercase text-brand-success tracking-wider mb-1.5">
                                  Solution Matrix
                                </h4>
                                <p className="text-text-secondary text-xs leading-relaxed font-sans">
                                  {project.solution}
                                </p>
                              </div>
                            </div>

                            {/* Impact (Spans 2 columns on desktop) */}
                            <div className="md:col-span-2 p-4 bg-brand-secondary/5 border border-brand-secondary/15 rounded-lg flex flex-col gap-2">
                              <h4 className="font-sans font-bold text-[10px] uppercase text-brand-secondary tracking-widest flex items-center gap-1.5">
                                <Award className="w-4 h-4 text-brand-secondary" />
                                Quantifiable Operations Impact
                              </h4>
                              <p className="text-white/95 font-sans leading-relaxed text-xs italic">
                                &quot;{project.impact}&quot;
                              </p>
                            </div>

                            {/* Key Capabilities list */}
                            <div className="md:col-span-2">
                              <h4 className="font-sans font-bold text-[10px] uppercase text-white/50 tracking-wider mb-3">
                                Core Technical Capabilities Tested
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-text-secondary">
                                {project.features.map((feat, fIdx) => (
                                  <div key={fIdx} className="flex items-center gap-2">
                                    <span className="text-brand-secondary font-bold">&gt;</span>
                                    <span>{feat}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Screenshots Gallery */}
                            {project.screenshots && (
                              <div className="md:col-span-2 border-t border-white/5 pt-6 mt-2">
                                <h4 className="font-sans font-bold text-[10px] uppercase text-white/50 tracking-wider mb-4 flex items-center gap-2">
                                  <span>Application Interface Telemetry</span>
                                  <span className="h-[1px] flex-1 bg-white/5" />
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                  {project.screenshots.map((screen, sIdx) => (
                                    <div 
                                      key={sIdx} 
                                      className="relative aspect-[9/19] rounded-lg border border-white/10 overflow-hidden bg-brand-bg hover:border-brand-secondary/40 transition-colors group cursor-pointer"
                                      onClick={() => window.open(screen, "_blank")}
                                    >
                                      <Image
                                        src={screen}
                                        alt={`Application screenshot ${sIdx + 1}`}
                                        fill
                                        sizes="(max-width: 640px) 50vw, 20vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-[10px] font-mono text-white/90 border border-white/20 bg-white/5 px-2 py-1 rounded">
                                          Expand
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </GlassCard>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
