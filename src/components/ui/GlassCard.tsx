"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "red" | "success" | "warning" | "none";
  delay?: number;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  glowColor = "none",
  delay = 0,
  onClick,
}: GlassCardProps) {
  const glowClasses = {
    none: "border-white/5 bg-brand-card/40 hover:border-white/10 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
    cyan: "cyber-glass-glow-blue",
    red: "cyber-glass-glow-red",
    success: "cyber-glass-glow-success",
    warning: "border-brand-warning/15 hover:border-brand-warning/30 hover:shadow-[0_0_25px_rgba(255,176,32,0.08)] bg-brand-card/45",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className={twMerge(
        clsx(
          "cyber-glass rounded-xl p-6 relative overflow-hidden transition-all duration-300",
          glowClasses[glowColor],
          onClick && "cursor-pointer hover:scale-[1.01]"
        ),
        className
      )}
    >
      {/* Grid Overlay inside Card */}
      <div className="absolute inset-0 cyber-grid opacity-[0.02] pointer-events-none" />

      {children}
    </motion.div>
  );
}
