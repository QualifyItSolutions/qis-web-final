import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Learning Ladder Animation Component
export function LearningLadder({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const ladderProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Skill levels that build up progressively
  const skillLevels = [
    { name: "Foundation", color: "#059669", position: 15 },
    { name: "Intermediate", color: "#1E40AF", position: 35 },
    { name: "Advanced", color: "#7C3AED", position: 55 },
    { name: "Expert", color: "#DC2626", position: 75 },
    { name: "Master", color: "#EA580C", position: 90 }
  ];

  return (
    <div ref={containerRef} className={`fixed inset-0 pointer-events-none z-10 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ladderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#1E40AF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#DC2626" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0.9" />
          </linearGradient>
          
          <filter id="ladderGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="skillGlow">
            <feGaussianBlur stdDeviation="3" result="skillBlur"/>
            <feMerge>
              <feMergeNode in="skillBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main ladder rail */}
        <motion.line
          x1="10"
          y1="10"
          x2="10"
          y2="90"
          stroke="url(#ladderGradient)"
          strokeWidth="4"
          filter="url(#ladderGlow)"
          style={{ 
            pathLength: ladderProgress,
            willChange: "stroke-dasharray"
          }}
        />
        
        {/* Ladder rungs with skill levels */}
        {skillLevels.map((skill, index) => (
          <motion.g key={index}>
            {/* Horizontal rung */}
            <motion.line
              x1="8"
                y1={skill.position}
                x2="20"
                y2={skill.position}
                stroke={skill.color}
                strokeWidth="3"
                filter="url(#ladderGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              />
            </motion.g>
          ))}
      </svg>
    </div>
  );
}