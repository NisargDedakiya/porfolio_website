"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, Cpu, Database, Flame, Clock, Award, Terminal as TerminalIcon, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export function Dashboard() {
  const stats = [
    {
      title: "Projects Built",
      value: "3 Active",
      description: "Security automation & SaaS platforms",
      icon: <Cpu className="w-5 h-5 text-brand-primary" />,
    },
    {
      title: "Certifications",
      value: "5 Earned",
      description: "Offensive, defensive & general",
      icon: <Award className="w-5 h-5 text-brand-secondary" />,
    },
    {
      title: "Learning Hours",
      value: "1,500+ Hrs",
      description: "TryHackMe, HTB, and lab research",
      icon: <Clock className="w-5 h-5 text-brand-success" />,
    },
    {
      title: "Research Focus",
      value: "Web & API",
      description: "Vulnerability analysis & tools",
      icon: <Shield className="w-5 h-5 text-brand-warning" />,
    },
  ];

  const statuses = [
    { name: "Learning", desc: "Advanced Offensive & Defensive Tactics", status: "Active", color: "success" },
    { name: "Researching", desc: "API Security & Vulnerability Patterns", status: "Active", color: "blue" },
    { name: "Building", desc: "Forensic Analysis & Recon Automation Tools", status: "Active", color: "red" },
  ];

  const threatIntel = [
    {
      title: "Web Application Security",
      desc: "Deep analysis of modern web architectures, authentication bypasses, session vulnerabilities, and injection vectors.",
      threatLevel: "High Priority",
      icon: <ShieldAlert className="w-6 h-6 text-brand-primary" />,
      colorClass: "cyber-glass-glow-red",
    },
    {
      title: "API Security",
      desc: "Auditing REST/GraphQL endpoints for access control issues, logic flaws, rate limiting gaps, and injection risks.",
      threatLevel: "High Priority",
      icon: <Database className="w-6 h-6 text-brand-secondary" />,
      colorClass: "cyber-glass-glow-blue",
    },
    {
      title: "Bug Bounty Hunting",
      desc: "Responsible disclosure across crowdsourced platforms, practicing reconnaissance and deep-dive logic auditing.",
      threatLevel: "Active Pursuit",
      icon: <Flame className="w-6 h-6 text-brand-primary" />,
      colorClass: "cyber-glass-glow-red",
    },
    {
      title: "Digital Forensics",
      desc: "Incident response analysis, volatile memory parsing, Windows registry investigation, and forensic log correlation.",
      threatLevel: "Active Research",
      icon: <TerminalIcon className="w-6 h-6 text-brand-success" />,
      colorClass: "cyber-glass-glow-success",
    },
  ];

  return (
    <section id="dashboard" className="relative w-full py-24 bg-brand-bg/95 border-b border-white/5 z-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16 border-b border-brand-primary/10 pb-6">
          <div>
            <div className="text-[10px] text-brand-primary font-sans tracking-widest uppercase mb-1">
              Operations Overview
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight">
              Security Operations Dashboard
            </h2>
          </div>
          <div className="font-sans text-xs text-brand-secondary border border-brand-secondary/20 bg-brand-card/50 px-3 py-1.5 rounded flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
            <span>System Status: Active</span>
          </div>
        </div>

        {/* Top level stats: Mission Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <GlassCard className="p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
                <div className="p-3 bg-brand-bg border border-white/5 rounded-lg shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-text-secondary">
                    {stat.title}
                  </div>
                  <div className="text-xl font-extrabold text-white font-sans mt-0.5">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-text-secondary leading-snug mt-1 font-sans">
                    {stat.description}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Split Grid: Threat Intel & Security Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Threat Intelligence Cards (Left, 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-white font-sans tracking-tight mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-secondary" />
              Core Research Focus Vectors
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {threatIntel.map((intel, idx) => (
                <motion.div
                  key={intel.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <GlassCard
                    className={`h-full p-5 flex flex-col justify-between gap-4 transition-all duration-300 ${intel.colorClass}`}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                        <div className="p-2 bg-brand-bg border border-white/5 rounded-lg">
                          {intel.icon}
                        </div>
                        <span className="font-mono text-[9px] font-bold tracking-widest text-text-secondary uppercase px-2 py-0.5 border border-white/5 rounded">
                          {intel.threatLevel}
                        </span>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-bold text-white font-sans tracking-tight mb-1">
                          {intel.title}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed font-sans">
                          {intel.desc}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Security Status Widget (Right, 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-white font-sans tracking-tight mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-success" />
              Operational Status
            </h3>

            <GlassCard className="p-5 flex flex-col gap-5 border border-brand-secondary/15">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Indicator Name
                </span>
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  State
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {statuses.map((status) => {
                  let badgeColorClass = "text-brand-success bg-brand-success/5 border-brand-success/20";
                  if (status.color === "blue") badgeColorClass = "text-brand-secondary bg-brand-secondary/5 border-brand-secondary/20";
                  if (status.color === "red") badgeColorClass = "text-brand-primary bg-brand-primary/5 border-brand-primary/20";

                  return (
                    <div key={status.name} className="flex flex-col gap-1.5 border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="font-sans font-bold text-xs text-white">
                          {status.name}
                        </span>
                        <span className={`font-mono text-[9px] px-2 py-0.5 rounded border uppercase font-bold tracking-widest ${badgeColorClass}`}>
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse mr-1" />
                          {status.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-text-secondary leading-normal font-sans">
                        {status.desc}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Visual mini chart metric */}
              <div className="bg-brand-bg/60 border border-white/5 rounded-lg p-3.5 mt-2 flex flex-col gap-2 font-sans text-[9px] text-text-secondary">
                <div className="flex justify-between font-bold text-white font-sans">
                  <span>Recon Automation Coverage</span>
                  <span className="text-brand-secondary">92% COVERAGE</span>
                </div>
                <div className="w-full h-1 bg-brand-card rounded overflow-hidden">
                  <div className="w-[92%] h-full bg-brand-secondary rounded shadow-[0_0_8px_var(--brand-secondary)]" />
                </div>
                <div className="flex justify-between text-[8px] text-white/30 font-sans">
                  <span>Activity Logging: Active</span>
                  <span>Threat Intelligence: Synced</span>
                </div>
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
}
