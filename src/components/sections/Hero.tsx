"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Shield, Award, Briefcase } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import dynamic from "next/dynamic";

const CyberGlobe = dynamic(
  () => import("@/components/canvas/CyberGlobe").then((mod) => mod.CyberGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full border border-white/5 bg-brand-card/10 animate-pulse flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
      </div>
    ),
  }
);

export function Hero() {
  const roles = [
    { title: "Cybersecurity Student", icon: <Award className="w-3.5 h-3.5" /> },
    { title: "Bug Bounty Hunter", icon: <Shield className="w-3.5 h-3.5" /> },
    { title: "Digital Forensics Enthusiast", icon: <Briefcase className="w-3.5 h-3.5" /> },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-bg px-6 py-24 z-10"
    >
      {/* Grid overlay and visual radial glow */}
      <div className="absolute inset-0 cyber-grid opacity-[0.08] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid-radial pointer-events-none" />
      
      {/* Ambient background light gradients */}
      <div className="absolute top-[20%] left-[15%] w-[350px] h-[350px] bg-brand-primary/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[20%] right-[15%] w-[350px] h-[350px] bg-brand-secondary/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse duration-[12s]" />

      {/* Main Content Area Grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 text-left px-4">
        
        {/* Left Column Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Subtle Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-brand-card/50 backdrop-blur-md border border-brand-primary/15 px-4 py-2 rounded-full text-xs text-brand-primary font-sans tracking-wider uppercase mb-8 shadow-[0_0_20px_rgba(255,77,77,0.03)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
            PORTFOLIO OVERVIEW
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white font-sans mb-6"
          >
            {personalInfo.name}
          </motion.h1>

          {/* Professional Badges Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-start gap-3 mb-8 max-w-2xl"
          >
            {roles.map((role) => (
              <span
                key={role.title}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium font-sans text-white/95 bg-brand-card/65 border border-white/5 hover:border-brand-secondary/35 transition-colors shadow-sm"
              >
                <span className="text-brand-secondary">{role.icon}</span>
                {role.title}
              </span>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl font-sans tracking-wide leading-relaxed mb-12"
          >
            Building expertise in offensive security, vulnerability research, digital forensics, and security automation.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-start w-full max-w-sm sm:max-w-none"
          >
            <Button
              variant="primary"
              onClick={() => scrollTo("projects")}
              className="px-8 py-3.5 text-sm font-semibold rounded-lg shadow-lg hover:shadow-brand-primary/20 hover:scale-[1.02] transition-all font-sans"
            >
              Explore My Work
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.open(personalInfo.contacts.resume, "_blank")}
              className="px-8 py-3.5 text-sm font-semibold rounded-lg bg-brand-card hover:bg-brand-card/85 text-white border border-white/10 hover:border-brand-secondary/40 hover:scale-[1.02] shadow-md transition-all font-sans"
            >
              Download Resume
            </Button>
          </motion.div>
        </div>

        {/* Right Column Cyber Globe */}
        <div className="lg:col-span-5 w-full h-[320px] md:h-[450px] flex items-center justify-center relative">
          <div className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] bg-brand-secondary/5 rounded-full filter blur-[80px] pointer-events-none animate-pulse duration-[6s]" />
          <CyberGlobe />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-65 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => scrollTo("about")}
      >
        <span className="font-sans text-[10px] tracking-wider text-text-secondary uppercase select-none font-semibold">
          Explore Dashboard
        </span>
        <ChevronDown className="w-4 h-4 text-brand-primary animate-bounce" />
      </div>
    </section>
  );
}
