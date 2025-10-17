import React from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CheckCircle, Shield, Target, Building, Scale, Zap, BookOpen, Award } from "lucide-react";

// Base hook for consistent triggers
function useServiceTrigger(threshold: number = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold,
    margin: "-5% 0px -5% 0px"
  });
  
  return { ref, isInView };
}

// ===== 1. PHARMA ENGINEERING ANIMATIONS =====

// Molecular Pattern Background
export function MolecularPatterns({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();

  const molecules = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 20,
    speed: 0.2 + Math.random() * 0.3
  }));

  // Create scroll-based parallax effect
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none opacity-10 ${className}`}>
      {molecules.map((molecule) => (
        <motion.div
          key={molecule.id}
            className="absolute"
            style={{
              left: `${molecule.x}%`,
              top: `${molecule.y}%`,
              y: parallaxY
            }}
            animate={{
              y: [-molecule.speed * 50, -molecule.speed * 200],
              rotate: [0, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <svg width={molecule.size} height={molecule.size} viewBox="0 0 40 40">
              <circle cx="20" cy="8" r="3" fill="currentColor" className="text-pharma-primary" />
              <circle cx="8" cy="20" r="3" fill="currentColor" className="text-pharma-secondary" />
              <circle cx="32" cy="20" r="3" fill="currentColor" className="text-pharma-primary" />
              <circle cx="20" cy="32" r="3" fill="currentColor" className="text-pharma-secondary" />
              <line x1="20" y1="8" x2="8" y2="20" stroke="currentColor" strokeWidth="1" className="text-pharma-neutral" />
              <line x1="8" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1" className="text-pharma-neutral" />
              <line x1="32" y1="20" x2="20" y2="32" stroke="currentColor" strokeWidth="1" className="text-pharma-neutral" />
            </svg>
          </motion.div>
        ))}
    </div>
  );
}

// Alternating Horizontal Reveal
export function EngineeringHorizontalReveal({ 
  children, 
  direction = "left",
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const { ref, isInView } = useServiceTrigger(0.3);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        x: direction === "left" ? -60 : 60,
        opacity: 0
      }}
      animate={isInView ? { x: 0, opacity: 1 } : undefined}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

// ===== 2. GXP APPLICATIONS ANIMATIONS =====

// Expanding Cards
export function GxpCardExpand({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) {
  const { ref, isInView } = useServiceTrigger(0.3);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        scale: 0.8,
        opacity: 0,
        rotateX: -10
      }}
      animate={isInView ? { 
        scale: 1,
        opacity: 1,
        rotateX: 0
      } : undefined}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{ willChange: "transform, opacity" }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  );
}

// ===== 3. PROJECT MANAGEMENT ANIMATIONS =====

// Top Progress Bar
export function ProjectProgressBar({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 h-1 bg-light-border ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-pharma-primary to-pharma-secondary origin-left"
        style={{ scaleX, willChange: "transform" }}
      />
    </div>
  );
}

// Project Phase Cards
export function ProjectPhaseReveal({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) {
  const { ref, isInView } = useServiceTrigger(0.3);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        y: 40,
        opacity: 0
      }}
      animate={isInView ? { 
        y: 0,
        opacity: 1
      } : undefined}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

// ===== 4. AUDIT & COMPLIANCE ANIMATIONS =====

// Animated Grid Lines
export function ComplianceGridLines({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.05, 0.15, 0.15, 0.05]);

  return (
    <motion.div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity, willChange: "opacity" }}
    >
      <svg className="w-full h-full">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-pharma-primary" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </motion.div>
  );
}

// Animated Checklist
export function AnimatedComplianceChecklist({ 
  items,
  className = ""
}: { 
  items: string[];
  className?: string;
}) {
  const { ref, isInView } = useServiceTrigger(0.2);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  useEffect(() => {
    if (!isInView) return;
    
    items.forEach((_, index) => {
      setTimeout(() => {
        setCheckedItems(prev => [...prev, index]);
      }, index * 200);
    });
  }, [isInView, items]);

  return (
    <div ref={ref} className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-start space-x-3"
          initial={{ x: -30, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : undefined}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          style={{ willChange: "transform, opacity" }}
        >
          <motion.div
            className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-pharma-primary flex items-center justify-center mt-0.5"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.3 }}
          >
            {checkedItems.includes(index) && (
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <CheckCircle className="w-4 h-4 text-pharma-primary" />
              </motion.div>
            )}
          </motion.div>
          <span className="text-light-primary font-medium leading-relaxed">
            {item}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ===== 5. SOFTWARE VALIDATION ANIMATIONS =====

// Validation Flowchart
export function ValidationFlowchart({ 
  steps,
  className = ""
}: {
  steps: Array<{ title: string; description: string }>;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: triggerRef, isInView } = useServiceTrigger(0.2);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const newStep = Math.floor(latest * steps.length);
      setActiveStep(Math.min(Math.max(newStep, 0), steps.length - 1));
    });

    return () => unsubscribe();
  }, [scrollYProgress, steps.length, isInView]);

  return (
    <div ref={triggerRef} className={className}>
      <div ref={containerRef} className="relative">
        {/* Connecting Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-pharma-primary/20">
          <motion.div
            className="w-full bg-gradient-to-b from-pharma-primary to-pharma-secondary origin-top"
            animate={{
              scaleY: isInView ? 1 : 0
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>

        {/* Validation Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative flex items-start space-x-6"
              initial={{ x: -40, opacity: 0 }}
              animate={
                isInView && index <= activeStep 
                  ? { x: 0, opacity: 1 } 
                  : { x: -40, opacity: 0 }
              }
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{ willChange: "transform, opacity" }}
            >
              {/* Step Node */}
              <motion.div
                className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg ${
                  index <= activeStep ? "bg-pharma-primary" : "bg-gray-300"
                }`}
                animate={index === activeStep ? {
                  boxShadow: [
                    "0 0 0 0 rgba(30, 64, 175, 0.4)",
                    "0 0 0 12px rgba(30, 64, 175, 0)",
                    "0 0 0 0 rgba(30, 64, 175, 0.4)"
                  ]
                } : undefined}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {index + 1}
              </motion.div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="pharma-card">
                  <h3 className="text-xl font-bold text-light-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-light-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== 6. TRAINING PROGRAMS ANIMATIONS =====

// Vertical Learning Path
export function TrainingLadder({ 
  programs,
  className = ""
}: {
  programs: Array<{ title: string; level: string; duration: string }>;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: triggerRef } = useServiceTrigger(0.2);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <div ref={triggerRef} className={className}>
      <div ref={containerRef} className="relative">
        {/* Ladder Structure */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-pharma-primary to-pharma-secondary">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-pharma-secondary to-pharma-primary origin-top"
            style={{
              scaleY: scrollYProgress
            }}
          />
        </div>

        {/* Training Programs */}
        <div className="space-y-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              className="relative flex items-center space-x-6"
              initial={{ 
                scale: 0.9,
                y: 30,
                opacity: 0
              }}
              whileInView={{ 
                scale: 1,
                y: 0,
                opacity: 1
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{ willChange: "transform, opacity" }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {/* Ladder Rung */}
              <motion.div
                className="w-16 h-16 bg-white rounded-xl border-2 border-pharma-primary flex items-center justify-center shadow-lg"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(30, 64, 175, 0.3)"
                }}
              >
                <BookOpen className="w-8 h-8 text-pharma-primary" />
              </motion.div>

              {/* Program Card */}
              <div className="flex-1">
                <div className="pharma-card">
                  <h3 className="text-lg font-bold text-light-primary mb-2">
                    {program.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-light-secondary">
                    <span className="bg-pharma-primary/10 text-pharma-primary px-2 py-1 rounded">
                      {program.level}
                    </span>
                    <span>{program.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== 7. REGULATORY SUPPORT ANIMATIONS =====

// Bridge Connection Animation
export function RegulatoryBridge({ className = "" }: { className?: string }) {
  const { ref, isInView } = useServiceTrigger(0.3);

  return (
    <div ref={ref} className={`relative py-16 ${className}`}>
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Company Side */}
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="w-20 h-20 bg-pharma-primary rounded-2xl flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Building className="w-10 h-10 text-white" />
          </motion.div>
          <span className="text-light-primary font-semibold">Your Company</span>
        </motion.div>

        {/* Connection Bridge */}
        <div className="flex-1 relative mx-8">
          <motion.div
            className="h-1 bg-gradient-to-r from-pharma-primary to-pharma-secondary rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : undefined}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: "left", willChange: "transform" }}
          />
          
          {/* Pulse Effect */}
          <motion.div
            className="absolute top-0 left-0 w-2 h-1 bg-white rounded-full"
            animate={isInView ? {
              x: ["0%", "100%"],
              opacity: [1, 0.5, 1]
            } : undefined}
            transition={{
              duration: 2,
              delay: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ willChange: "transform, opacity" }}
          />

          {/* Support Icons */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex space-x-2">
              <Shield className="w-5 h-5 text-pharma-secondary" />
              <Zap className="w-5 h-5 text-pharma-primary" />
              <Award className="w-5 h-5 text-pharma-secondary" />
            </div>
          </motion.div>
        </div>

        {/* Regulator Side */}
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="w-20 h-20 bg-pharma-secondary rounded-2xl flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, rotate: -5 }}
          >
            <Scale className="w-10 h-10 text-white" />
          </motion.div>
          <span className="text-light-primary font-semibold">Regulators</span>
        </motion.div>
      </div>
    </div>
  );
}

// ===== 8. DIGITAL TRAINING ANIMATIONS =====

// Progressive Learning Journey Path
export function ProgressiveLearningPath({ 
  className = "",
  sections = 4 
}: { 
  className?: string;
  sections?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div ref={containerRef} className={`fixed inset-0 pointer-events-none z-10 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="learningPathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.7" />
            <stop offset="75%" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.9" />
          </linearGradient>
          
          <filter id="pathGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="4" result="strongBlur"/>
            <feMerge> 
              <feMergeNode in="strongBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background path */}
        <motion.path
          d="M 15 20 Q 35 10, 50 25 Q 65 40, 85 30 Q 95 20, 100 40"
          stroke="rgba(30, 64, 175, 0.1)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Main glowing path */}
        <motion.path
          d="M 15 20 Q 35 10, 50 25 Q 65 40, 85 30 Q 95 20, 100 40"
          stroke="url(#learningPathGradient)"
          strokeWidth="3"
          fill="none"
          filter="url(#pathGlow)"
          style={{ 
            pathLength: pathProgress,
            willChange: "stroke-dasharray"
          }}
        />
        
        {/* Enhanced glow layer */}
        <motion.path
          d="M 15 20 Q 35 10, 50 25 Q 65 40, 85 30 Q 95 20, 100 40"
          stroke="url(#learningPathGradient)"
          strokeWidth="6"
          fill="none"
          filter="url(#strongGlow)"
          style={{ 
            pathLength: pathProgress,
            opacity: glowIntensity,
            willChange: "stroke-dasharray, opacity"
          }}
        />

        {/* Progress pulse */}
        <motion.circle
          r="3"
          fill="#06B6D4"
          filter="url(#strongGlow)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ 
            offsetPath: "path('M 15 20 Q 35 10, 50 25 Q 65 40, 85 30 Q 95 20, 100 40')",
            willChange: "offset-distance"
          }}
        />
        
        {/* Journey nodes */}
        {Array.from({ length: sections }, (_, index) => {
          const progress = (index + 1) / sections;

          return (
            <motion.g key={index}>
              <motion.circle
                cx={15 + progress * 85}
                cy={20 + Math.sin(progress * Math.PI * 2) * 10}
                r="4"
                fill="#1E40AF"
                filter="url(#pathGlow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: progress * 2,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                style={{
                  scale: progress,
                  willChange: "transform"
                }}
              />
              <motion.circle
                cx={15 + progress * 85}
                cy={20 + Math.sin(progress * Math.PI * 2) * 10}
                r="2"
                fill="#FFFFFF"
                style={{
                  scale: progress,
                  willChange: "transform"
                }}
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

// Futuristic Module Card Animation
export function FuturisticModuleReveal({ 
  children, 
  delay = 0,
  index = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  index?: number;
  className?: string;
}) {
  const { ref, isInView } = useServiceTrigger(0.2);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);

  return (
    <motion.div
      ref={containerRef}
      className={className}
    >
      <motion.div
        ref={ref}
        initial={{ 
          scale: 0.85,
          opacity: 0,
          y: 40,
          rotateX: -15,
          filter: "blur(10px)"
        }}
        animate={isInView ? { 
          scale: 1,
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)"
        } : undefined}
        style={{
          y,
          opacity,
          scale,
          willChange: "transform, opacity, filter"
        }}
        transition={{ 
          duration: 0.8, 
          delay: delay + index * 0.15,
          ease: [0.16, 1, 0.3, 1]
        }}
        whileHover={{ 
          scale: 1.03,
          y: -8,
          rotateX: 2,
          transition: { 
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1]
          }
        }}
      >
        <motion.div
          className="relative"
          initial={{ 
            boxShadow: "0 0 0 0 rgba(30, 64, 175, 0)" 
          }}
          animate={isInView ? {
            boxShadow: [
              "0 0 0 0 rgba(30, 64, 175, 0)",
              "0 0 30px 0 rgba(30, 64, 175, 0.1)",
              "0 0 60px 0 rgba(30, 64, 175, 0.05)",
              "0 0 30px 0 rgba(30, 64, 175, 0.1)"
            ]
          } : undefined}
          transition={{
            duration: 3,
            delay: delay + index * 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{
            boxShadow: "0 0 80px 0 rgba(30, 64, 175, 0.15)"
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Synchronized Module Grid
export function SynchronizedModuleGrid({ 
  children,
  className = ""
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isInView } = useServiceTrigger(0.1);
  const [revealedModules, setRevealedModules] = useState<number[]>([]);

  useEffect(() => {
    if (!isInView) return;
    
    // Reveal modules in a staggered sequence
    const moduleCount = React.Children.count(children);
    
    for (let i = 0; i < moduleCount; i++) {
      setTimeout(() => {
        setRevealedModules(prev => [...prev, i]);
      }, i * 200);
    }
  }, [isInView, children]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ 
            scale: 0.9,
            opacity: 0,
            y: 30,
            filter: "blur(5px)"
          }}
          animate={revealedModules.includes(index) ? {
            scale: 1,
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
          } : undefined}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 100
          }}
          style={{ willChange: "transform, opacity, filter" }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

// Minimal Professional Loader
export function DigitalTrainingLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-pharma-primary rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.2,
            delay: index * 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Legacy Curved Learning Path (kept for backward compatibility)
export function CurvedLearningPath({ className = "" }: { className?: string }) {
  return <ProgressiveLearningPath className={className} sections={4} />;
}

// Legacy Precise Module Scale-In (kept for backward compatibility)
export function DigitalModuleReveal({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) {
  return (
    <FuturisticModuleReveal delay={delay} className={className}>
      {children}
    </FuturisticModuleReveal>
  );
}

// Legacy Components (for backward compatibility)
export function ValidationIcon({ 
  delay = 0,
  type = "check",
  className = ""
}: { 
  delay?: number;
  type?: "check" | "shield" | "target";
  className?: string;
}) {
  const { ref, isInView } = useServiceTrigger(1);
  
  const icons = {
    check: CheckCircle,
    shield: Shield,
    target: Target
  };
  
  const Icon = icons[type];

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
      style={{ willChange: "transform, opacity" }}
      whileHover={{ scale: 1.1 }}
    >
      <Icon className="w-4 h-4 text-pharma-primary flex-shrink-0" />
    </motion.div>
  );
}

// Metric Dashboard for legacy support
export function MetricsDashboard({ 
  metrics,
  className = ""
}: {
  metrics: Array<{
    label: string;
    value: number;
    unit: string;
    change: number;
    target?: number;
  }>;
  className?: string;
}) {
  const { ref, isInView } = useServiceTrigger(0.3);
  const [animatedMetrics, setAnimatedMetrics] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    if (!isInView) return;
    
    metrics.forEach((metric, index) => {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / 1500, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = metric.value * easeOut;
        
        setAnimatedMetrics(prev => ({ ...prev, [index]: currentValue }));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      setTimeout(() => {
        animationFrame = requestAnimationFrame(animate);
      }, index * 200);

      return () => cancelAnimationFrame(animationFrame);
    });
  }, [isInView, metrics]);

  return (
    <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          className="pharma-card text-center space-y-3"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          style={{ willChange: "transform, opacity" }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <div className="text-2xl font-bold text-pharma-primary">
            {Math.round(animatedMetrics[index] || 0).toLocaleString()}{metric.unit}
          </div>
          <div className="text-light-secondary font-medium">
            {metric.label}
          </div>
          {metric.change !== undefined && (
            <div className={`text-sm font-semibold ${
              metric.change >= 0 ? "text-emerald-600" : "text-red-600"
            }`}>
              {metric.change >= 0 ? "+" : ""}{metric.change.toFixed(1)}%
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}