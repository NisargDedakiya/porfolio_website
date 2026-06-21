"use client";

import React, { useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon, AlertTriangle } from "lucide-react";
import { personalInfo, skillsData, projectsData } from "@/data/portfolio";

interface HistoryItem {
  type: "input" | "output" | "error" | "system";
  text: string;
}

export function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize terminal boot sequence
  useEffect(() => {
    const bootSequence: HistoryItem[] = [
      { type: "system", text: "AUTHENTICATING SESSION..." },
      { type: "system", text: "ACCESS GRANTED: SEC_CLEARANCE_SECURE" },
      { type: "system", text: "INITIALIZING NISARG_D SECURE COMM-SHELL..." },
      { type: "output", text: "Welcome to Nisarg Dedakiya's Cybersecurity Core. [OS: v2026.06]" },
      { type: "output", text: "Type 'help' to list available command vectors." },
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < bootSequence.length) {
        const item = bootSequence[currentIdx];
        setHistory((prev) => [...prev, item]);
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal on history changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const commandText = input.trim();
    if (!commandText) return;

    const newHistory: HistoryItem[] = [...history, { type: "input", text: `guest@nisarg-sec:~$ ${commandText}` }];
    const cmd = commandText.toLowerCase();

    // Command parser
    if (cmd === "help") {
      newHistory.push({
        type: "output",
        text: `Available Command Vectors:
  about     - Display system owner credentials & background bio.
  skills    - List parsed cybersecurity & development capabilities.
  projects  - Summarize active security tools & frameworks.
  contact   - Print secure communication paths & links.
  clear     - Wipe local screen history.
  help      - Print this listing.`
      });
    } else if (cmd === "about") {
      newHistory.push({
        type: "output",
        text: `=== SYSTEM OWNER IDENTITY BRIEF ===
Name:        ${personalInfo.name}
Role:        Cybersecurity Specialist & Developer
Tagline:     "${personalInfo.tagline}"
Goal:        ${personalInfo.about.goal}
Interests:   ${personalInfo.about.interests.join(", ")}
Education:   ${personalInfo.about.education}`
      });
    } else if (cmd === "skills") {
      let skillOutput = "=== CAPABILITY DIAGNOSTICS ===\n";
      skillsData.forEach((cat) => {
        skillOutput += `\n[${cat.title.toUpperCase()}]\n`;
        cat.skills.forEach((s) => {
          const barLength = Math.round(s.level / 10);
          const bar = "█".repeat(barLength) + "░".repeat(10 - barLength);
          skillOutput += `  ${s.name.padEnd(25)} [${bar}] ${s.level}% (${s.status})\n`;
        });
      });
      newHistory.push({ type: "output", text: skillOutput });
    } else if (cmd === "projects") {
      let projOutput = "=== ACTIVE SECURITY DEPLOYMENTS ===\n";
      projectsData.forEach((p) => {
        projOutput += `\nProject:   ${p.name} (${p.status})
Tagline:   ${p.tagline}
Tech Stack: ${p.technologies.join(", ")}
Problem:   ${p.problem}
Solution:  ${p.solution}
Impact:    ${p.impact}\n`;
      });
      newHistory.push({ type: "output", text: projOutput });
    } else if (cmd === "contact") {
      newHistory.push({
        type: "output",
        text: `=== COMMUNICATIONS CHANNELS ===
Email:    ${personalInfo.contacts.email}
GitHub:   ${personalInfo.contacts.github}
LinkedIn: ${personalInfo.contacts.linkedin}
Resume:   ${personalInfo.contacts.resume}`
      });
    } else if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else {
      newHistory.push({
        type: "error",
        text: `Command error: '${commandText}' is invalid. Type 'help' to query available targets.`
      });
    }

    setHistory(newHistory);
    setInput("");
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={focusInput}
      className="relative w-full h-[350px] md:h-[400px] bg-brand-card/75 backdrop-blur-md rounded-lg border border-brand-primary/20 overflow-hidden font-mono flex flex-col text-xs shadow-2xl scanline"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between bg-brand-bg/90 border-b border-brand-primary/10 px-4 py-2.5 z-10">
        <div className="flex items-center gap-2 text-brand-primary">
          <TerminalIcon className="w-4 h-4" />
          <span className="text-[10px] tracking-wider uppercase font-semibold">nisarg_sec_shell.sh</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
      </div>

      {/* Terminal History */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5 scrollbar-thin scrollbar-thumb-brand-primary/20 select-text">
        {history.map((item, index) => (
          <div
            key={index}
            className={`whitespace-pre-wrap leading-relaxed ${
              item.type === "input"
                ? "text-white"
                : item.type === "system"
                ? "text-brand-warning/80"
                : item.type === "error"
                ? "text-red-400 font-bold flex items-start gap-1"
                : "text-brand-primary"
            }`}
          >
            {item.type === "error" && <AlertTriangle className="w-3.5 h-3.5 mt-0.5 inline-block shrink-0" />}
            {item.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input */}
      <form
        onSubmit={handleCommandSubmit}
        className="flex items-center border-t border-brand-primary/10 bg-brand-bg/85 px-4 py-2 z-10"
      >
        <span className="text-brand-success font-semibold mr-2 select-none">guest@nisarg-sec:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent text-white border-none outline-none caret-transparent focus:ring-0"
          autoFocus
          maxLength={50}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <div
          className="w-1.5 h-3.5 bg-brand-success ml-[-1px] animate-blink"
          style={{ visibility: isFocused ? "visible" : "hidden" }}
        />
      </form>
    </div>
  );
}
