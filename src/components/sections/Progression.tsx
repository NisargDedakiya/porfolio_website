import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { CheckCircle2, Circle, Activity } from "lucide-react";
import { learningTimeline, TimelineEvent } from "@/data/portfolio";

export function Progression() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 50%"],
  });

  const getStatusIcon = (status: TimelineEvent["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-brand-success shrink-0" />;
      case "active":
        return <Activity className="w-5 h-5 text-brand-primary animate-pulse shrink-0" />;
      case "planned":
      default:
        return <Circle className="w-5 h-5 text-white/20 shrink-0" />;
    }
  };

  const getStatusLabel = (status: TimelineEvent["status"]) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "active":
        return "In Progress";
      case "planned":
      default:
        return "Planned";
    }
  };

  // Define dynamic variants based on the item status
  const getCardVariants = (status: TimelineEvent["status"]) => {
    const activeBorder = 
      status === "completed" 
        ? "rgba(34, 197, 94, 0.3)" 
        : status === "active"
        ? "rgba(255, 77, 77, 0.35)"
        : "rgba(59, 130, 246, 0.25)";

    const activeGlow = 
      status === "completed" 
        ? "0 0 20px rgba(34, 197, 94, 0.06)" 
        : status === "active"
        ? "0 0 25px rgba(255, 77, 77, 0.12)"
        : "0 0 20px rgba(59, 130, 246, 0.05)";

    return {
      inactive: {
        opacity: 0.3,
        scale: 0.98,
        filter: "blur(1px)",
        borderColor: "rgba(255, 255, 255, 0.04)",
        boxShadow: "0 0 0px rgba(0, 0, 0, 0)",
        backgroundColor: "rgba(17, 24, 39, 0.35)"
      },
      active: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        borderColor: activeBorder,
        boxShadow: activeGlow,
        backgroundColor: "rgba(17, 24, 39, 0.7)"
      }
    };
  };

  return (
    <section id="progression" className="relative w-full py-16 md:py-24 bg-brand-bg/90 border-b border-brand-primary/5 z-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16 border-b border-brand-primary/10 pb-6">
          <div>
            <div className="text-[10px] text-brand-primary font-sans tracking-widest uppercase mb-1">
              Career Timeline
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight font-sans">
              Professional Timeline
            </h2>
          </div>
          <div className="font-sans text-xs text-text-secondary border border-brand-primary/15 bg-brand-card/50 px-3 py-1.5 rounded flex items-center gap-2">
            <span>Timeline Active</span>
          </div>
        </div>

        {/* Timeline Flow */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto pl-6 flex flex-col gap-12">
          
          {/* Base Timeline Line (Muted) */}
          <div className="absolute left-[8px] top-2 bottom-2 w-[1px] bg-white/5 pointer-events-none" />
          
          {/* Animated Scroll-Linked Timeline Line */}
          <motion.div
            style={{ scaleY: scrollYProgress, originY: 0 }}
            className="absolute left-[8px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-success pointer-events-none"
          />

          {learningTimeline.map((event) => {
            const cardVariants = getCardVariants(event.status);

            return (
              <motion.div
                key={event.year}
                initial="inactive"
                whileInView="active"
                viewport={{ once: true, margin: "-10% 0px" }}
                className="relative flex items-start gap-6 group"
              >
                {/* Timeline Indicator Dot */}
                <motion.div
                  variants={{
                    inactive: {
                      scale: 0.85,
                      borderColor: "rgba(255, 255, 255, 0.05)",
                      backgroundColor: "rgba(11, 18, 32, 0.8)",
                      opacity: 0.5
                    },
                    active: {
                      scale: 1.15,
                      borderColor: event.status === "active" ? "rgba(255, 77, 77, 0.4)" : "rgba(34, 197, 94, 0.4)",
                      backgroundColor: "rgba(11, 18, 32, 0.95)",
                      opacity: 1
                    }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute left-[-31px] top-1.5 p-1 rounded-full border transition-colors z-20 bg-brand-bg"
                >
                  {getStatusIcon(event.status)}
                </motion.div>

                {/* Card content */}
                <motion.div
                  variants={cardVariants}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="cyber-glass rounded-xl p-5 relative overflow-hidden w-full border text-left"
                >
                  {/* Grid Overlay inside Card */}
                  <div className="absolute inset-0 cyber-grid opacity-[0.02] pointer-events-none" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2 mb-3 relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-lg font-black text-brand-primary tracking-tight">
                        {event.year}
                      </span>
                      <h3 className="text-sm font-extrabold text-white uppercase tracking-tight font-sans">
                        {event.title}
                      </h3>
                    </div>
                    <span
                      className={`font-sans text-[8px] font-bold tracking-widest uppercase ${
                        event.status === "completed"
                          ? "text-brand-success"
                          : event.status === "active"
                          ? "text-brand-primary animate-pulse"
                          : "text-white/30"
                      }`}
                    >
                      {getStatusLabel(event.status)}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans relative z-10">
                    {event.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
