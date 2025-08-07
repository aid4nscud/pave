"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CarSilhouette() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  return (
    <div ref={ref} className="hidden md:block absolute right-0 top-24 w-80 lg:w-96 h-56 lg:h-64 pointer-events-none">
      <motion.div style={{ y, opacity }} className="w-full h-full">
        <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7a1d2d" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#b91c1c" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Car Body */}
          <path d="M60 140 L80 120 L120 110 L280 110 L320 120 L340 140 L340 160 L320 170 L80 170 L60 160 Z" fill="url(#carGradient)" filter="url(#glow)" />
          
          {/* Windshield */}
          <path d="M100 120 L120 100 L260 100 L280 120 L260 110 L120 110 Z" fill="rgba(244, 63, 94, 0.25)" stroke="rgba(122, 29, 45, 0.5)" strokeWidth="1" />
          
          {/* Wheels */}
          <circle cx="110" cy="170" r="15" fill="rgba(75, 85, 99, 0.8)" />
          <circle cx="110" cy="170" r="8" fill="rgba(55, 65, 81, 0.9)" />
          <circle cx="290" cy="170" r="15" fill="rgba(75, 85, 99, 0.8)" />
          <circle cx="290" cy="170" r="8" fill="rgba(55, 65, 81, 0.9)" />
          
          {/* Door Lines */}
          <line x1="150" y1="120" x2="150" y2="160" stroke="rgba(122, 29, 45, 0.4)" strokeWidth="1" />
          <line x1="250" y1="120" x2="250" y2="160" stroke="rgba(122, 29, 45, 0.4)" strokeWidth="1" />
          
          {/* Sensor Arrays */}
          <circle cx="340" cy="130" r="3" fill="#ef4444" opacity="0.85" />
          <circle cx="335" cy="135" r="2" fill="#f43f5e" opacity="0.8" />
          <circle cx="60" cy="130" r="3" fill="#ef4444" opacity="0.85" />
          <circle cx="65" cy="135" r="2" fill="#f43f5e" opacity="0.8" />
        </svg>
      </motion.div>
    </div>
  );
}
