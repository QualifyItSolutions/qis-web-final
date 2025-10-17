import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState, RefObject } from "react";

// Enhanced useInView hook with 20-30% visibility trigger
export function useScrollTrigger(threshold: number = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold,
    margin: "-10% 0px -10% 0px"
  });
  
  return { ref, isInView };
}

// Scroll Progress Hook for Synchronized Animations
export function useScrollProgress(elementRef: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start end", "end start"]
  });
  
  return scrollYProgress;
}

// Base Animation Component with Refined Transitions
interface BaseAnimationProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export function ScrollReveal({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.6,
  threshold = 0.25,
  className = ""
}: BaseAnimationProps) {
  const { ref, isInView } = useScrollTrigger(threshold);

  const variants = {
    up: { initial: { y: 40, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    down: { initial: { y: -40, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: -40, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: 40, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
    scale: { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 } }
  };

  const variant = variants[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={variant.initial}
      animate={isInView ? variant.animate : variant.initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0, 1], // Custom easeOut curve for pharmaceutical precision
      }}
      style={{ willChange: "transform, opacity" }} // GPU acceleration
    >
      {children}
    </motion.div>
  );
}

// Staggered Animation Container
export function StaggerContainer({ 
  children, 
  staggerDelay = 0.1, 
  threshold = 0.25,
  className = ""
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  threshold?: number;
  className?: string;
}) {
  const { ref, isInView } = useScrollTrigger(threshold);
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: index * staggerDelay,
            ease: [0.25, 0.25, 0, 1]
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

// Progressive Text Animation
export function AnimatedText({ 
  text, 
  className = "",
  wordDelay = 0.08,
  threshold = 0.3
}: { 
  text: string; 
  className?: string;
  wordDelay?: number;
  threshold?: number;
}) {
  const { ref, isInView } = useScrollTrigger(threshold);
  const words = text.split(" ");

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{
            duration: 0.4,
            delay: i * wordDelay,
            ease: [0.25, 0.25, 0, 1]
          }}
          className="inline-block mr-2"
          style={{ willChange: "transform, opacity" }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

// Scroll-Synchronized Progress Line
export function ProgressLine({ 
  className = "",
  color = "bg-pharma-primary",
  thickness = "h-0.5"
}: {
  className?: string;
  color?: string;
  thickness?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { ref: triggerRef, isInView } = useScrollTrigger(0.2);
  const scrollYProgress = useScrollProgress(ref);
  
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={triggerRef} className={`relative ${className}`}>
      <div ref={ref} className={`w-full ${thickness} bg-gray-200 rounded-full overflow-hidden`}>
        <motion.div
          className={`${thickness} ${color} rounded-full origin-left`}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          style={isInView ? { scaleX } : undefined}
          transition={{ 
            duration: 0.3, 
            ease: [0.25, 0.25, 0, 1] 
          }}
        />
      </div>
    </div>
  );
}

// Timeline Component with Scroll Synchronization
export function ScrollSyncTimeline({ 
  items,
  className = ""
}: {
  items: Array<{ title: string; description: string; icon?: React.ReactNode }>;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: triggerRef, isInView } = useScrollTrigger(0.2);
  const scrollYProgress = useScrollProgress(containerRef);
  
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const newIndex = Math.floor(latest * items.length);
      setActiveIndex(Math.min(Math.max(newIndex, 0), items.length - 1));
    });

    return () => unsubscribe();
  }, [scrollYProgress, items.length, isInView]);

  return (
    <div ref={triggerRef} className={className}>
      <div ref={containerRef} className="relative">
        {/* Vertical Progress Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200">
          <motion.div
            className="w-full bg-pharma-primary origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.25, 0, 1] }}
          />
        </div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex items-start space-x-6"
              initial={{ x: -30, opacity: 0 }}
              animate={isInView && index <= activeIndex ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.25, 0, 1]
              }}
              style={{ willChange: "transform, opacity" }}
            >
              {/* Timeline Node */}
              <motion.div
                className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center border-2 ${
                  index <= activeIndex 
                    ? "bg-pharma-primary border-pharma-primary text-white shadow-lg" 
                    : "bg-white border-gray-300 text-gray-400"
                }`}
                animate={index === activeIndex ? {
                  boxShadow: [
                    "0 0 0 0 rgba(30, 64, 175, 0.4)",
                    "0 0 0 8px rgba(30, 64, 175, 0)",
                    "0 0 0 0 rgba(30, 64, 175, 0.4)"
                  ]
                } : undefined}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {item.icon || (index + 1)}
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-light-primary mb-1">
                  {item.title}
                </h3>
                <p className="text-light-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Flowchart Steps with Precise Animations
export function FlowchartSteps({ 
  steps,
  direction = "horizontal",
  className = ""
}: {
  steps: Array<{ title: string; description: string; icon?: React.ReactNode }>;
  direction?: "horizontal" | "vertical";
  className?: string;
}) {
  const { ref, isInView } = useScrollTrigger(0.2);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!isInView) return;
    
    steps.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSteps(prev => [...prev, index]);
      }, index * 300);
    });
  }, [isInView, steps]);

  const containerClass = direction === "horizontal" 
    ? "flex flex-col md:flex-row gap-6" 
    : "space-y-6";

  return (
    <div ref={ref} className={`${containerClass} ${className}`}>
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="relative flex-1"
          initial={{ x: -40, opacity: 0 }}
          animate={visibleSteps.includes(index) ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.25, 0, 1]
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Connection Line */}
          {direction === "horizontal" && index < steps.length - 1 && (
            <motion.div
              className="absolute top-6 -right-3 w-6 h-0.5 bg-pharma-primary/30 hidden md:block"
              initial={{ scaleX: 0 }}
              animate={visibleSteps.includes(index + 1) ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.25, 0, 1] }}
              style={{ transformOrigin: "left" }}
            />
          )}

          <div className="pharma-card text-center space-y-4 relative">
            {/* Step Number/Icon */}
            <motion.div
              className="w-12 h-12 bg-pharma-primary text-white rounded-xl flex items-center justify-center mx-auto font-semibold"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={visibleSteps.includes(index) ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.25, 0, 1] }}
            >
              {step.icon || (index + 1)}
            </motion.div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-light-primary">
                {step.title}
              </h3>
              <p className="text-light-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Highlight Effect */}
            <motion.div
              className="absolute inset-0 bg-pharma-primary/5 rounded-2xl -z-10"
              initial={{ opacity: 0 }}
              animate={visibleSteps.includes(index) ? { 
                opacity: [0, 0.5, 0],
                scale: [0.95, 1.02, 1]
              } : { opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                delay: 0.5,
                ease: [0.25, 0.25, 0, 1]
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Card Grid with Sequential Animation
export function AnimatedCardGrid({ 
  children, 
  columns = 3, 
  staggerDelay = 0.1,
  className = ""
}: {
  children: React.ReactNode;
  columns?: number;
  staggerDelay?: number;
  className?: string;
}) {
  const { ref, isInView } = useScrollTrigger(0.2);
  const childrenArray = Array.isArray(children) ? children : [children];

  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }[columns] || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div ref={ref} className={`grid ${gridClass} gap-6 ${className}`}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: index * staggerDelay,
            ease: [0.25, 0.25, 0, 1]
          }}
          style={{ willChange: "transform, opacity" }}
          whileHover={{ 
            y: -4,
            transition: { duration: 0.2, ease: [0.25, 0.25, 0, 1] }
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

// Counter Animation with Precision
export function AnimatedCounter({ 
  end, 
  start = 0, 
  duration = 1.5,
  suffix = "",
  className = ""
}: {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const { ref, isInView } = useScrollTrigger(0.3);
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Use easeOut curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(start + (end - start) * easeOut);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, start, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.25, 0, 1] }}
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  );
}

// Parallax Background Pattern (Lightweight)
export function ParallaxPattern({ 
  pattern = "dots",
  intensity = 0.3,
  className = ""
}: {
  pattern?: "dots" | "grid" | "lines";
  intensity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, intensity * 100]);

  const patternStyles = {
    dots: "radial-gradient(circle at 1px 1px, rgba(30,64,175,0.15) 1px, transparent 0)",
    grid: "linear-gradient(rgba(30,64,175,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,64,175,0.1) 1px, transparent 1px)",
    lines: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(30,64,175,0.1) 10px, rgba(30,64,175,0.1) 11px)"
  };

  const patternSizes = {
    dots: "20px 20px",
    grid: "20px 20px",
    lines: "30px 30px"
  };

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: patternStyles[pattern],
        backgroundSize: patternSizes[pattern],
        y,
        willChange: "transform"
      }}
    />
  );
}

// Parallax Container Component (Backward Compatibility)
export function ParallaxContainer({ 
  children, 
  speed = 0.5,
  className = ""
}: { 
  children: React.ReactNode; 
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <motion.div 
      ref={ref} 
      style={{ y, willChange: "transform" }} 
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Diagonal Reveal Component (Backward Compatibility)
export function DiagonalReveal({ 
  children, 
  direction = "left",
  className = ""
}: { 
  children: React.ReactNode; 
  direction?: "left" | "right";
  className?: string;
}) {
  const { ref, isInView } = useScrollTrigger(0.3);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ 
          clipPath: direction === "left" 
            ? "polygon(0 0, 0 0, 0 100%, 0 100%)" 
            : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
        }}
        animate={isInView ? { 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" 
        } : undefined}
        transition={{ 
          duration: 0.8, 
          ease: [0.25, 0.25, 0, 1]
        }}
        style={{ willChange: "clip-path" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Circular Reveal Component (Backward Compatibility)
export function CircularReveal({ 
  children,
  className = ""
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isInView } = useScrollTrigger(0.3);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={isInView ? { clipPath: "circle(100% at 50% 50%)" } : undefined}
        transition={{ 
          duration: 1, 
          ease: [0.25, 0.25, 0, 1]
        }}
        style={{ willChange: "clip-path" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Floating Molecules Component (Backward Compatibility)
export function FloatingMolecules({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const molecules = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {molecules.map((molecule) => (
        <motion.div
          key={molecule.id}
          className="absolute bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full backdrop-blur-sm border border-blue-300/30"
          style={{
            width: molecule.size,
            height: molecule.size,
            left: `${molecule.x}%`,
            top: `${molecule.y}%`,
            rotate,
            willChange: "transform"
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1], 
            opacity: [0, 0.8, 0.6],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 4 + molecule.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: [0.25, 0.25, 0, 1]
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-white/30 to-transparent rounded-full" />
        </motion.div>
      ))}
    </div>
  );
}

// Neural Network Background Component (Backward Compatibility)
export function NeuralNetworkBackground({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();

  const networkOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.6, 0.6, 0.3]);

  const nodes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <motion.div 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: networkOpacity, willChange: "opacity" }}
    >
      <svg className="w-full h-full">
        {nodes.map((node, i) => {
          const otherNodes = nodes.slice(i + 1);
          return otherNodes.map((otherNode, j) => {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
            );
            
            if (distance < 25) {
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${otherNode.x}%`}
                  y2={`${otherNode.y}%`}
                  stroke="rgba(59, 130, 246, 0.2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 2, 
                    delay: Math.random() * 2,
                    ease: [0.25, 0.25, 0, 1]
                  }}
                />
              );
            }
            return null;
          });
        })}
        
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="2"
            fill="rgba(59, 130, 246, 0.6)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: Math.random(),
              ease: [0.25, 0.25, 0, 1]
            }}
            whileHover={{ scale: 1.5, fill: "rgba(20, 184, 166, 0.8)" }}
          />
        ))}
      </svg>
    </motion.div>
  );
}