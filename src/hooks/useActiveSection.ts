"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[], options?: IntersectionObserverInit) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      options || {
        rootMargin: "-30% 0px -50% 0px", // Trigger when the section occupies the focal area
        threshold: 0.05,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds, options]);

  return activeSection;
}
