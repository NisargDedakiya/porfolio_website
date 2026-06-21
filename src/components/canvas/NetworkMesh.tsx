"use client";

import React, { useEffect, useRef } from "react";

export function NetworkMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const maxParticles = Math.min(60, Math.floor((width * height) / 25000)); // Responsive count
    const connectionDistance = 120;
    const mouse = { x: -1000, y: -1000, active: false };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Slow speeds for subtle movement
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 1;
        // Blue and Red particles
        this.color = Math.random() > 0.3 ? "rgba(59, 130, 246, 0.25)" : "rgba(255, 77, 77, 0.2)";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce boundaries
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    const drawConnections = (c: CanvasRenderingContext2D) => {
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.1;
            c.beginPath();
            c.moveTo(p1.x, p1.y);
            c.lineTo(p2.x, p2.y);
            c.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            c.lineWidth = 0.5;
            c.stroke();
          }
        }

        // Connect to mouse pointer
        if (mouse.active) {
          const mDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
          if (mDist < connectionDistance * 1.5) {
            const alpha = (1 - mDist / (connectionDistance * 1.5)) * 0.15;
            c.beginPath();
            c.moveTo(p1.x, p1.y);
            c.lineTo(mouse.x, mouse.y);
            c.strokeStyle = `rgba(255, 77, 77, ${alpha})`; // Red line to mouse
            c.lineWidth = 0.7;
            c.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Particle rendering
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      drawConnections(ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    // Start animation loop
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
