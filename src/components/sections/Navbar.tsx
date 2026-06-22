"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useActiveSection } from "@/hooks/useActiveSection";

interface NavLink {
  id: string;
  label: string;
}

const navLinks: NavLink[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "bug-bounty", label: "Bug Bounty" },
  { id: "certifications", label: "Certifications" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const activeSection = useActiveSection([
    "hero",
    "about",
    "skills",
    "projects",
    "bug-bounty",
    "certifications",
    "research",
    "contact",
  ]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll position to update style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset scroll for sticky navbar
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans select-none ${
          isScrolled
            ? "bg-brand-bg/90 backdrop-blur-md border-b border-brand-primary/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-white/5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo / Professional Brand */}
          <div
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <Shield className="w-5 h-5 text-brand-primary transition-transform duration-300 group-hover:scale-110" />
            <span className="text-white font-bold tracking-tight text-sm font-sans">
              NISARG <span className="text-brand-primary">DEDAKIYA</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id || (link.id === "hero" && !activeSection);
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    suppressHydrationWarning
                    className={`relative text-xs tracking-wider transition-all duration-200 uppercase font-medium py-1.5 ${
                      isActive ? "text-brand-primary font-bold" : "text-text-secondary hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="navActiveLine"
                        className="absolute left-0 bottom-0 w-full h-[2px] bg-brand-primary shadow-[0_0_8px_var(--brand-primary)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Social Icons & Status */}
            <div className="flex items-center gap-5 pl-6 border-l border-white/10">
              <a
                href="https://github.com/NisargDedakiya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-text-secondary hover:text-white transition-colors"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/nisarg-dedakiya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-text-secondary hover:text-white transition-colors"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/Nisarg_Dedakiya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) Profile"
                className="text-text-secondary hover:text-white transition-colors"
              >
                <FaXTwitter className="w-3.5 h-3.5" />
              </a>

              {/* Status Indicator */}
              <div className="flex items-center gap-1.5 text-brand-success bg-brand-success/5 border border-brand-success/20 px-2.5 py-1 rounded text-[10px] font-sans uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
                <span>OPERATIONAL</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            suppressHydrationWarning
            className="lg:hidden p-1.5 bg-brand-card/50 border border-white/5 rounded text-brand-primary hover:border-brand-primary/45 transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 w-full max-h-[calc(100vh-70px)] overflow-y-auto z-40 bg-brand-bg/95 border-b border-white/10 backdrop-blur-lg flex flex-col font-sans py-6 px-6 gap-4 shadow-2xl select-none"
          >
            <div className="flex flex-col gap-2 tracking-wider">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id || (link.id === "hero" && !activeSection);
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    suppressHydrationWarning
                    className={`py-3.5 px-4 rounded-lg text-left text-xs uppercase font-semibold transition-all ${
                      isActive
                        ? "bg-brand-primary/10 border border-brand-primary/25 text-brand-primary shadow-[0_0_10px_rgba(255,77,77,0.05)]"
                        : "bg-brand-card/20 border border-white/5 text-text-secondary hover:border-brand-primary/20"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
            
            {/* Social Links Mobile Drawer */}
            <div className="flex justify-center gap-6 py-4 border-t border-white/5 pt-4 text-text-secondary">
              <a
                href="https://github.com/NisargDedakiya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="hover:text-white transition-colors"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/nisarg-dedakiya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="hover:text-white transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/Nisarg_Dedakiya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) Profile"
                className="hover:text-white transition-colors"
              >
                <FaXTwitter className="w-4.5 h-4.5" />
              </a>
            </div>

            {/* System Status in Drawer */}
            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-[10px] text-white/40 font-sans">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-brand-primary" />
                <span>PORTFOLIO</span>
              </div>
              <div className="flex items-center gap-1.5 text-brand-success font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse mr-1" />
                <span>ACTIVE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
