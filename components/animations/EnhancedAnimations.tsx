
import React from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState, ReactNode } from "react";
import { CheckCircle, Shield, Building, Scale, Zap, BookOpen, Award } from "lucide-react";

// Floating 3D Card Component
export function FloatingCard({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      return () => card.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Calculate rotation based on mouse position
  const rotateX = useSpring(
    mousePosition.y > 0 ? (mousePosition.y - 150) / 10 : 0,
    { stiffness: 300, damping: 30 }
  );
  
  const rotateY = useSpring(
    mousePosition.x > 0 ? (mousePosition.x - 150) / 10 : 0,
    { stiffness: 300, damping: 30 }
  );

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      animate={{
        rotateX: rotateX.get(),
        rotateY: rotateY.get()
      }}
      transition={{ delay }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pharma-secondary/20 to-green-600/20 rounded-2xl blur-xl opacity-60" />
      <div className="relative bg-white/10 backdrop-blur-md border border-pharma-secondary/30 rounded-2xl p-6 shadow-2xl">
        {children}
      </div>
    </motion.div>
  );
}

// Parallax Background Component
export function ParallaxBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -600]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Dynamic Grid */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: y1 }}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </motion.div>

      {/* Floating Geometric Shapes */}
      <motion.div 
        className="absolute top-20 left-20 w-32 h-32 border border-pharma-secondary/30 rounded-full"
        style={{ y: y2 }}
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div 
        className="absolute top-40 right-32 w-24 h-24 border border-green-500/30 transform rotate-45"
        style={{ y: y3 }}
        animate={{
          rotate: -360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Animated Particles */}
      <motion.div 
        className="absolute w-2 h-2 bg-pharma-secondary rounded-full shadow-lg shadow-pharma-secondary/50"
        style={{ y: y1 }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

// Smooth Scroll Reveal Component
export function ScrollReveal({ children, className = "", delay = 0, direction = "up" }: { children: ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 60 : 0,
      x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
      scale: 0.95,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)"
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: 0.8,
        delay: delay * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
}

// Glowing Button Component
export function GlowingButton({ children, className = "", onClick, ...props }: { children: ReactNode; className?: string; onClick?: () => void; [key: string]: unknown }) {
  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pharma-secondary via-green-600 to-pharma-secondary opacity-75 blur-sm" />
      <div className="relative bg-gradient-to-r from-pharma-secondary to-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <span className="relative z-10 flex items-center gap-3">
          {children}
        </span>
      </div>
    </motion.button>
  );
}

// Animated Section Header
export function AnimatedSectionHeader({ title, subtitle, className = "" }: { title: string; subtitle: string; className?: string }) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <ScrollReveal>
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-light-primary mb-6 bg-gradient-to-r from-pharma-secondary to-green-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h2>
      </ScrollReveal>
      
      <ScrollReveal delay={1}>
        <motion.p 
          className="text-xl text-light-secondary max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      </ScrollReveal>
    </div>
  );
}

// Floating Stats Component
export function FloatingStats({ stats, className = "" }: { stats: Array<{ icon: ReactNode; title: string; description: string }>; className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <ScrollReveal key={index} delay={index} direction="up">
          <FloatingCard delay={index * 0.1}>
            <div className="text-center">
              <motion.div 
                className="w-20 h-20 bg-gradient-to-br from-pharma-secondary to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {stat.icon}
              </motion.div>
              <motion.h3 
                className="text-2xl font-semibold text-light-primary mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {stat.title}
              </motion.h3>
              <motion.p 
                className="text-light-secondary"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {stat.description}
              </motion.p>
            </div>
          </FloatingCard>
        </ScrollReveal>
      ))}
    </div>
  );
}

// Interactive Service Grid
export function InteractiveServiceGrid({ services, className = "" }: { services: Array<{ icon: ReactNode; title: string; description: string; features?: string[] }>; className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {services.map((service, index) => (
        <ScrollReveal key={index} delay={index} direction="up">
          <FloatingCard delay={index * 0.1}>
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-pharma-secondary to-green-600 rounded-2xl flex items-center justify-center text-white mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {service.icon}
            </motion.div>
            <motion.h3 
              className="text-xl font-bold text-light-primary mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {service.title}
            </motion.h3>
            <motion.p 
              className="text-light-secondary leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {service.description}
            </motion.p>
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {service.features?.map((feature, featureIndex) => (
                <motion.div 
                  key={featureIndex} 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + featureIndex * 0.1 }}
                >
                  <div className="w-2 h-2 bg-pharma-secondary rounded-full"></div>
                  <span className="text-sm text-light-secondary">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </FloatingCard>
        </ScrollReveal>
      ))}
    </div>
  );
}

// Motion Blur Effect Component
export function MotionBlurEffect({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={className}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        filter: isHovered ? "blur(0px)" : "blur(0px)",
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Learning Ladder Animation Component
export function LearningLadder({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });



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
            pathLength: scrollYProgress,
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

// ===== SERVICE-SPECIFIC ANIMATIONS =====

// Base hook for consistent triggers
export function useServiceTrigger(threshold: number = 0.25) {
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
  
  const molecules = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 20,
    speed: 0.2 + Math.random() * 0.3
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none opacity-10 ${className}`}>
      {molecules.map((molecule) => (
        <motion.div
          key={molecule.id}
          className="absolute"
          style={{
            left: `${molecule.x}%`,
            top: `${molecule.y}%`,
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

// Floating Hexagonal Grid
export function FloatingHexGrid({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();

  const hexagons = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (i % 4) * 25 + 10,
    y: Math.floor(i / 4) * 30 + 10,
    delay: i * 0.1
  }));

  // Create transforms outside the map to avoid React Hooks violations
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none opacity-15 ${className}`}>
      {hexagons.map((hex) => (
        <motion.div
          key={hex.id}
          className="absolute"
          style={{
            left: `${hex.x}%`,
            top: `${hex.y}%`,
            y: parallaxY
          }}
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: [0, 180]
          }}
          transition={{
            duration: 1,
              delay: hex.delay,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <div className="w-8 h-8 text-pharma-primary fill-pharma-primary/20">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
            </div>
          </motion.div>
        ))}
    </div>
  );
}

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
  const { ref: triggerRef, isInView } = useServiceTrigger(0.1);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    // Show all steps when component comes into view
    setActiveStep(steps.length - 1);
    
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
        <div className="absolute left-8 top-0 bottom-0 w-0.5" style={{ backgroundColor: 'rgba(30, 64, 175, 0.2)' }}>
          <motion.div
            className="w-full bg-gradient-to-b from-pharma-primary to-pharma-secondary origin-top"
            style={{ 
              scaleY: isInView ? 1 : 0,
              willChange: "transform"
            }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                isInView 
                  ? { x: 0, opacity: 1 } 
                  : { x: -40, opacity: 0 }
              }
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{ willChange: "transform, opacity" }}
            >
              {/* Step Node */}
              <motion.div
                className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg ${
                  isInView ? "bg-pharma-primary" : "bg-gray-300"
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
                  scale: 1,
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
