"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing Operations Center...");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds max duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 25) {
        setStatusText("Initializing Operations Center...");
      } else if (pct < 50) {
        setStatusText("Loading Assets...");
      } else if (pct < 75) {
        setStatusText("Loading Intelligence...");
      } else {
        setStatusText("Establishing Secure Connection...");
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            onComplete();
          }, 400); // Allow fadeout transition
        }, 150);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B1220] select-none"
        >
          {/* Subtle ambient central glow */}
          <div className="absolute w-[300px] h-[300px] bg-brand-primary/5 rounded-full filter blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col items-center max-w-sm w-full px-6 text-center z-10">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8 p-4 rounded-2xl bg-brand-card border border-white/5 shadow-xl relative"
            >
              <Shield className="w-8 h-8 text-brand-primary animate-pulse" />
              <div className="absolute inset-0 bg-brand-primary/5 filter blur-lg rounded-2xl -z-10" />
            </motion.div>

            {/* Name/Sub */}
            <motion.h1
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-white font-sans font-bold text-sm tracking-widest uppercase mb-1"
            >
              Nisarg Dedakiya
            </motion.h1>
            
            <motion.p
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-text-secondary font-sans text-[10px] tracking-wider uppercase mb-8"
            >
              Cybersecurity Portfolio
            </motion.p>

            {/* Progress Track */}
            <div className="w-full h-1 bg-brand-card border border-white/5 rounded-full overflow-hidden mb-3 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status logs */}
            <div className="h-4 flex items-center justify-center">
              <p className="text-[10px] font-sans text-brand-secondary tracking-wide uppercase">
                {statusText}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
