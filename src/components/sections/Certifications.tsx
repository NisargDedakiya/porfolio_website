"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldAlert, ShieldCheck, FileCheck } from "lucide-react";
import { certificationsData, Certification } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";

export function Certifications() {
  const getBadgeIcon = (type: Certification["badgeType"]) => {
    switch (type) {
      case "offensive":
        return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case "defensive":
        return <ShieldCheck className="w-5 h-5 text-brand-success" />;
      case "general":
      default:
        return <Award className="w-5 h-5 text-brand-primary" />;
    }
  };

  const getGlowColor = (type: Certification["badgeType"]) => {
    switch (type) {
      case "offensive":
        return "warning"; // Red-orange glow frame
      case "defensive":
        return "success"; // Green glow frame
      case "general":
      default:
        return "cyan"; // Cyan glow frame
    }
  };

  return (
    <section id="certifications" className="relative w-full py-24 bg-brand-bg/90 border-b border-brand-primary/5 z-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16 border-b border-brand-primary/10 pb-6">
          <div>
            <div className="text-[10px] text-brand-primary font-sans tracking-widest uppercase mb-1">
              Professional Credentials
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight">
              Certifications
            </h2>
          </div>
          <div className="font-sans text-xs text-text-secondary border border-brand-primary/15 bg-brand-card/50 px-3 py-1.5 rounded flex items-center gap-2">
            <span>Total Credentials: {certificationsData.length}</span>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.map((cert, cIdx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.4, delay: cIdx * 0.05 }}
            >
              <GlassCard
                glowColor={getGlowColor(cert.badgeType)}
                onClick={cert.verificationUrl ? () => window.open(cert.verificationUrl, "_blank") : undefined}
                className="h-full flex flex-col justify-between gap-4 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex flex-col gap-3.5">
                  {/* Badge & Date */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <div className="p-2 rounded bg-brand-bg border border-white/5 shrink-0">
                      {getBadgeIcon(cert.badgeType)}
                    </div>
                    <span className="font-sans text-[9px] text-text-secondary font-bold">
                      Issued: {cert.date}
                    </span>
                  </div>

                  {/* Cert Info */}
                  <div>
                    <h3 className="text-sm font-extrabold text-white uppercase font-sans tracking-tight mb-1 leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-[10px] text-text-secondary font-sans tracking-wide uppercase leading-none">
                      Issuer: {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Footer link overlay indicator */}
                {cert.verificationUrl && (
                  <div className="flex items-center gap-1.5 font-sans text-[8px] text-brand-primary font-bold uppercase tracking-wider mt-2 pt-2 border-t border-white/5">
                    <FileCheck className="w-3.5 h-3.5" />
                    Verify Credential
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
