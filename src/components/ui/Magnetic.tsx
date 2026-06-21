"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.25, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for target offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for translation coordinates
  const springConfig = { damping: 20, stiffness: 200, mass: 0.25 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate the center coordinates of the target element
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center to mouse position
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Apply translation scaled by the strength parameter
    x.set(deltaX * strength);
    y.set(deltaY * strength);
  };

  const handleMouseLeave = () => {
    // Reset position smoothly
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
