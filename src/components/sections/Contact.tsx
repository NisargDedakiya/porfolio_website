"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, FileText, ShieldAlert, Terminal as TerminalIcon } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { personalInfo } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

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

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "encrypting" | "sending" | "success" | "error">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to transmit message securely.");
      }

      setStatus("success");
      // Clear form
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Secure transmission error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 bg-brand-bg/90 border-b border-brand-primary/5 z-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16 border-b border-brand-primary/10 pb-6">
          <div>
            <div className="text-[10px] text-brand-primary font-sans tracking-widest uppercase mb-1">
              Connect With Me
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight font-sans">
              Contact
            </h2>
          </div>
          <div className="font-sans text-xs text-text-secondary border border-brand-primary/15 bg-brand-card/50 px-3 py-1.5 rounded flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
            Active & Available
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Channels & Info Panel (Left, 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <GlassCard glowColor="none" className="flex flex-col gap-6">
              <h3 className="text-base font-bold text-white font-sans uppercase tracking-wide border-b border-white/5 pb-3">
                Get In Touch
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                Feel free to reach out for research collaboration, job opportunities, or security consultations. I am always open to discussing new challenges and offensive security methodologies.
              </p>

              {/* Direct Link Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5 font-sans text-xs">
                {/* Email (Professional email contact button) */}
                <a
                  href={`mailto:${personalInfo.contacts.email}`}
                  aria-label="Send professional email to Nisarg Dedakiya"
                  className="flex items-center gap-3.5 p-3 rounded-lg bg-brand-bg/60 border border-brand-primary/15 hover:border-brand-primary/45 hover:text-white transition-all group shadow-[0_0_12px_rgba(0,217,255,0.02)]"
                >
                  <div className="p-1.5 rounded bg-brand-primary/10 text-brand-primary border border-brand-primary/20 group-hover:bg-brand-primary/25 transition-colors">
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[8px] uppercase tracking-wider text-white/40">Email</div>
                    <div className="truncate text-[11px] leading-tight font-medium text-white/80">{personalInfo.contacts.email}</div>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href={personalInfo.contacts.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nisarg's GitHub Profile"
                  className="flex items-center gap-3.5 p-3 rounded-lg bg-brand-bg/60 border border-white/5 hover:border-brand-primary/25 hover:text-white transition-all group"
                >
                  <div className="p-1.5 rounded bg-white/5 text-white/70 border border-white/10 group-hover:bg-white/10 transition-colors">
                    <FaGithub className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[8px] uppercase tracking-wider text-white/40">GitHub</div>
                    <div className="truncate text-[11px] leading-tight font-medium text-white/80">GitHub - NisargDedakiya</div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={personalInfo.contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nisarg's LinkedIn Profile"
                  className="flex items-center gap-3.5 p-3 rounded-lg bg-brand-bg/60 border border-brand-primary/15 hover:border-brand-primary/30 hover:text-white transition-all group"
                >
                  <div className="p-1.5 rounded bg-brand-primary/10 text-brand-primary border border-brand-primary/20 group-hover:bg-brand-primary/25 transition-colors">
                    <FaLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[8px] uppercase tracking-wider text-white/40">LinkedIn</div>
                    <div className="truncate text-[11px] leading-tight font-medium text-white/80">LinkedIn - Nisarg Dedakiya</div>
                  </div>
                </a>

                {/* X (Twitter) */}
                <a
                  href={personalInfo.contacts.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nisarg's X (Twitter) Profile"
                  className="flex items-center gap-3.5 p-3 rounded-lg bg-brand-bg/60 border border-white/5 hover:border-brand-primary/25 hover:text-white transition-all group"
                >
                  <div className="p-1.5 rounded bg-white/5 text-white/70 border border-white/10 group-hover:bg-white/10 transition-colors">
                    <FaXTwitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[8px] uppercase tracking-wider text-white/40">X (Twitter)</div>
                    <div className="truncate text-[11px] leading-tight font-medium text-white/80">X - Nisarg_Dedakiya</div>
                  </div>
                </a>

                {/* HackerOne */}
                <a
                  href={personalInfo.contacts.hackerone}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nisarg's HackerOne Bug Bounty Profile"
                  className="flex items-center gap-3.5 p-3 rounded-lg bg-brand-bg/60 border border-red-500/10 hover:border-red-500/30 hover:text-white transition-all group"
                >
                  <div className="p-1.5 rounded bg-red-500/5 text-red-400 border border-red-500/10 group-hover:bg-red-500/15 transition-colors">
                    <HackerOneIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[8px] uppercase tracking-wider text-white/40">HackerOne</div>
                    <div className="truncate text-[11px] leading-tight font-medium text-white/80">HackerOne - sharingansec</div>
                  </div>
                </a>

                {/* Bugcrowd */}
                <a
                  href={personalInfo.contacts.bugcrowd}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nisarg's Bugcrowd Bug Bounty Profile"
                  className="flex items-center gap-3.5 p-3 rounded-lg bg-brand-bg/60 border border-amber-500/10 hover:border-amber-500/30 hover:text-white transition-all group"
                >
                  <div className="p-1.5 rounded bg-amber-500/5 text-amber-400 border border-amber-500/10 group-hover:bg-amber-500/15 transition-colors">
                    <BugcrowdIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[8px] uppercase tracking-wider text-white/40">Bugcrowd</div>
                    <div className="truncate text-[11px] leading-tight font-medium text-white/80">Bugcrowd - SharinganSec</div>
                  </div>
                </a>
              </div>
            </GlassCard>
          </div>

          {/* Form and Telemetry Success Panel (Right, 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <GlassCard glowColor={status !== "idle" ? "success" : "none"} className="p-6">
              <AnimatePresence mode="wait">
                {status === "idle" || status === "error" ? (
                  <motion.form
                    onSubmit={handleFormSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-5"
                  >
                    <h3 className="text-base font-bold text-white font-sans uppercase tracking-wide border-b border-white/5 pb-3">
                      Send a Message
                    </h3>

                    {status === "error" && (
                      <div className="bg-brand-primary/10 border border-brand-primary/30 text-brand-primary rounded p-3 text-xs font-sans">
                        Transmission failed. Please verify credentials, or email me directly at <a href={`mailto:${personalInfo.contacts.email}`} className="underline font-bold hover:text-white transition-colors">{personalInfo.contacts.email}</a>.
                      </div>
                    )}

                    {/* Name & Email Group */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5 font-sans text-[10px]">
                        <label className="uppercase text-white/50 tracking-wider">Your Name</label>
                        <input
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. John Doe"
                          suppressHydrationWarning
                          className="w-full bg-brand-bg border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-primary/50"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 font-sans text-[10px]">
                        <label className="uppercase text-white/50 tracking-wider">Email Address</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. john@example.com"
                          suppressHydrationWarning
                          className="w-full bg-brand-bg border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-primary/50"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1.5 font-sans text-[10px]">
                      <label className="uppercase text-white/50 tracking-wider">Subject</label>
                      <input
                        required
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g. Collaboration Inquiry"
                        suppressHydrationWarning
                        className="w-full bg-brand-bg border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-primary/50"
                      />
                    </div>

                    {/* Message Body */}
                    <div className="flex flex-col gap-1.5 font-sans text-[10px]">
                      <label className="uppercase text-white/50 tracking-wider">Message</label>
                      <textarea
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your message here..."
                        rows={5}
                        suppressHydrationWarning
                        className="w-full bg-brand-bg border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-primary/50 resize-none font-sans"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="border-t border-white/5 pt-4 mt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full flex items-center justify-center gap-2 font-sans"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Send Message
                      </Button>
                    </div>
                  </motion.form>
                ) : status === "sending" ? (
                  /* Modern SaaS loading state */
                  <motion.div
                    key="sending-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 gap-4 min-h-[350px]"
                  >
                    <div className="w-10 h-10 border-2 border-brand-secondary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-sans text-text-secondary">Sending your message securely...</p>
                  </motion.div>
                ) : (
                  /* Premium SaaS success state */
                  <motion.div
                    key="success-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 gap-5 text-center min-h-[350px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-success/10 border border-brand-success/35 flex items-center justify-center text-brand-success">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-sans">Message Sent!</h3>
                      <p className="text-xs text-text-secondary mt-1.5 max-w-xs font-sans leading-relaxed">
                        Thank you for reaching out. Your message has been received. I will get back to you as soon as possible.
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setStatus("idle")}
                      className="px-6 py-2 text-xs font-sans mt-2"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
