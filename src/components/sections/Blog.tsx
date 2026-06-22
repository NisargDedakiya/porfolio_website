"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, Calendar, Clock } from "lucide-react";
import { blogPosts, BlogPost } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";

export function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "CTF Writeups", "Security Research", "Learning Notes", "Tool Reviews"];

  const getCategoryColor = (cat: BlogPost["category"]) => {
    switch (cat) {
      case "Security Research":
        return "text-brand-primary border-brand-primary/20 bg-brand-primary/5";
      case "CTF Writeups":
        return "text-brand-success border-brand-success/20 bg-brand-success/5";
      case "Learning Notes":
        return "text-brand-warning border-brand-warning/20 bg-brand-warning/5";
      case "Tool Reviews":
        return "text-white/60 border-white/10 bg-white/2";
      default:
        return "text-text-secondary border-white/10";
    }
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.snippet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="research" className="relative w-full py-16 md:py-24 bg-brand-bg/95 border-b border-brand-primary/5 z-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-16 border-b border-brand-primary/10 pb-6">
          <div>
            <div className="text-[10px] text-brand-primary font-sans tracking-widest uppercase mb-1">
              Publications & Research
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight font-sans">
              Research Log
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-sm font-sans text-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search research logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              suppressHydrationWarning
              className="w-full bg-brand-card/65 border border-white/10 pl-10 pr-4 py-2.5 rounded-lg text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 placeholder-text-secondary/40 font-sans tracking-wide"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 font-sans text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              suppressHydrationWarning
              className={`px-3 py-1.5 rounded transition-all duration-300 border uppercase tracking-wider text-[9px] font-bold ${
                selectedCategory === cat
                  ? "bg-brand-primary/10 border-brand-primary text-brand-primary shadow-[0_0_10px_rgba(0,217,255,0.15)]"
                  : "bg-brand-card/45 border-white/5 text-text-secondary hover:border-brand-primary/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Post List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, pIdx) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.4, delay: pIdx * 0.05 }}
                >
                  <GlassCard glowColor="none" className="h-full flex flex-col justify-between gap-5 hover:border-brand-primary/15 transition-colors">
                    <div className="flex flex-col gap-3">
                      {/* Category Badge & Stats */}
                      <div className="flex items-center justify-between font-mono text-[9px]">
                        <span
                          className={`px-2 py-0.5 rounded border font-bold uppercase tracking-wider ${getCategoryColor(
                            post.category
                          )}`}
                        >
                          {post.category}
                        </span>
                        
                        <div className="flex items-center gap-1.5 text-text-secondary font-bold">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{post.views} VIEWS</span>
                        </div>
                      </div>

                      {/* Post Title */}
                      <h3 className="text-base md:text-lg font-bold text-white leading-snug group-hover:text-brand-primary transition-colors uppercase font-sans tracking-tight">
                        {post.title}
                      </h3>

                      {/* Post Snippet */}
                      <p className="text-xs text-text-secondary leading-relaxed font-sans">
                        {post.snippet}
                      </p>
                    </div>

                    {/* Footer Metadata */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto font-mono text-[10px] text-text-secondary font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-primary/60" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-primary/60" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-lg bg-brand-card/10 text-center font-sans">
                <Search className="w-8 h-8 text-brand-warning/60 mb-3" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  No Research Found
                </span>
                <span className="text-xs text-text-secondary mt-1">
                  Adjust your search query or filters.
                </span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
