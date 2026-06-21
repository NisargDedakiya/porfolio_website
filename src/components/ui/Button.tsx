"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-mono font-bold tracking-wider uppercase transition-all duration-300 select-none overflow-hidden active:scale-95";

  const sizeStyles = {
    sm: "px-4 py-2 text-[10px] gap-1.5 rounded-sm",
    md: "px-6 py-3 text-xs gap-2 rounded",
    lg: "px-8 py-4 text-sm gap-2.5 rounded-md",
  };

  const variantStyles = {
    primary: "bg-brand-primary/10 border border-brand-primary text-brand-primary shadow-[0_0_15px_rgba(0,217,255,0.05)] hover:bg-brand-primary/25 hover:shadow-[0_0_20px_rgba(0,217,255,0.2)]",
    secondary: "bg-brand-card border border-white/10 text-white hover:bg-white/5 hover:border-white/20",
    success: "bg-brand-success/10 border border-brand-success text-brand-success shadow-[0_0_15px_rgba(0,255,136,0.05)] hover:bg-brand-success/25 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)]",
    warning: "bg-brand-warning/10 border border-brand-warning text-brand-warning shadow-[0_0_15px_rgba(245,158,11,0.05)] hover:bg-brand-warning/25 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]",
    ghost: "bg-transparent border border-transparent text-text-secondary hover:text-white hover:bg-white/5",
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant]), className)}
      suppressHydrationWarning
      {...props}
    >
      {/* Decorative technical line inside button */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-current opacity-60" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-current opacity-60" />
      
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
