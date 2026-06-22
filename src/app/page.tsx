"use client";

import React from "react";
import { NetworkMesh } from "@/components/canvas/NetworkMesh";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Progression } from "@/components/sections/Progression";
import { BugBounty } from "@/components/sections/BugBounty";
import { Certifications } from "@/components/sections/Certifications";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { Dashboard } from "@/components/sections/Dashboard";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { personalInfo } from "@/data/portfolio";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Custom premium SVGs for HackerOne and Bugcrowd
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

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Auto scroll to target section on load from rewritten subpaths (e.g. /about -> scroll to #about)
  useEffect(() => {
    if (!loading) {
      let path = window.location.pathname.replace(/^\/|\/$/g, "");
      if (path) {
        if (path === "blog") path = "research";
        if (path === "engagements") path = "bug-bounty";
        setTimeout(() => {
          const element = document.getElementById(path);
          if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: elementPosition - navbarHeight,
              behavior: "smooth",
            });
          }
        }, 150);
      }
    }
  }, [loading]);

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative min-h-screen bg-brand-bg text-white overflow-x-hidden flex flex-col font-sans"
      >
        {/* Interactive Background Particle Mesh */}
        <NetworkMesh />

      {/* Sticky Main Navigation */}
      <Navbar />

      {/* Section Streams */}
      <main className="flex-1 flex flex-col w-full relative">
        {/* HERO SECTION */}
        <Hero />

        {/* ABOUT PROFILE SECTION */}
        <About />

        {/* OPERATIONS DASHBOARD */}
        <Dashboard />

        {/* SKILLS MATRIX SECTION */}
        <Skills />

        {/* PROJECTS SECTION */}
        <Projects />

        {/* OPERATOR PROGRESSION SECTION */}
        <Progression />

        {/* BUG BOUNTY SECTION */}
        <BugBounty />

        {/* CERTIFICATIONS SECTION */}
        <Certifications />

        {/* BLOG RESEARCH LOG SECTION */}
        <Blog />

        {/* CONTACT LINK SECTION */}
        <Contact />
      </main>

      {/* Footer bar */}
      <footer className="relative w-full py-12 bg-brand-bg border-t border-brand-primary/5 font-mono text-[10px] text-text-secondary/55 text-center z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-left">
            <div className="text-white font-bold uppercase text-xs">
              Nisarg Dedakiya
            </div>
            <div className="text-[9px] text-white/50 leading-relaxed font-sans">
              Cybersecurity Student | Bug Bounty Hunter | Digital Forensics Enthusiast
            </div>
            <div className="text-[9px] text-white/30 mt-1">
              &copy; {new Date().getFullYear()} NISARG DEDAKIYA. ALL RIGHTS RESERVED.
            </div>
          </div>

          {/* Social Icons Footer */}
          <div className="flex gap-5 text-text-secondary items-center">
            <a
              href={personalInfo.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-brand-primary transition-colors"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-brand-primary transition-colors"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.contacts.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) Profile"
              className="hover:text-brand-primary transition-colors"
            >
              <FaXTwitter className="w-3.5 h-3.5" />
            </a>
            <a
              href={personalInfo.contacts.hackerone}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HackerOne Profile"
              className="hover:text-red-500 transition-colors"
            >
              <HackerOneIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.contacts.bugcrowd}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bugcrowd Profile"
              className="hover:text-amber-500 transition-colors"
            >
              <BugcrowdIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
      </motion.div>
    </>
  );
}
