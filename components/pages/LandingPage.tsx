import { Shield, Users, Award, ArrowRight, CheckCircle, Building, Zap, Globe, BookOpen, Cpu, Code, CheckSquare } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "framer-motion";

// Enhanced Futuristic Scroll Progress Indicator
function FuturisticScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-2 z-50 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-dark-cta via-dark-positive to-purple-600 origin-left relative"
        style={{ scaleX }}
      >
        {/* Futuristic glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-75 blur-sm"
          animate={{
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Scanning line effect */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg shadow-cyan-400/50"
          style={{ left: useTransform(scaleX, [0, 1], ["0%", "100%"]) }}
        />
      </motion.div>
    </div>
  );
}

// Advanced Holographic Button Component
function HolographicButton({ children, className, variant = "primary", ...props }: {
  children: React.ReactNode;
  className?: string;
  variant?: string;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = variant === "primary" 
    ? "bg-gradient-to-r from-dark-cta via-blue-600 to-dark-positive text-white"
    : "border-2 border-dark-cta text-dark-cta bg-transparent";

  return (
    <motion.button
      ref={ref}
      className={`${baseStyles} px-8 py-4 rounded-xl font-semibold transition-all duration-300 group relative overflow-hidden ${className}`}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {/* Holographic scanning effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear"
        }}
      />
      
      {/* Glitch effect overlay */}
      <motion.div
        className="absolute inset-0 bg-cyan-400/10"
        animate={{
          opacity: [0, 1, 0],
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 5,
          repeatType: "mirror"
        }}
      />
      
        {children}
    </motion.button>
  );
}

// Advanced Futuristic Animated Background
function FuturisticAnimatedBackground() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated grid pattern */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ 
          y,
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Floating geometric shapes */}
      <motion.div 
        className="absolute top-20 left-20 w-32 h-32 border border-cyan-400/30 rounded-full"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        className="absolute top-40 right-32 w-24 h-24 border border-blue-500/30 transform rotate-45"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -360],
          scale: [1, 0.9, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      <motion.div
        className="absolute bottom-32 left-32 w-20 h-20 border border-purple-500/30 transform rotate-12"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 180],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </div>
  );
}

// Holographic Interactive Elements
function HolographicInteractiveElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Interactive light trail */}
      <motion.div
        className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
        style={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4
        }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}

// Futuristic Scroll Reveal Section
function FuturisticScrollRevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

export function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <>
      <FuturisticScrollProgressIndicator />

      {/* Hero Section with Advanced Futuristic Animations */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg">
        {/* Advanced Futuristic Animated Background */}
        <FuturisticAnimatedBackground />
        <HolographicInteractiveElements />
        
        {/* Dynamic gradient overlay with holographic effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-radial from-cyan-400/5 via-transparent to-purple-500/5"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.05), transparent 70%)",
              "radial-gradient(circle at 60% 40%, rgba(59, 130, 246, 0.08), transparent 70%)",
              "radial-gradient(circle at 40% 60%, rgba(139, 92, 246, 0.06), transparent 70%)",
              "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.05), transparent 70%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ y, opacity, scale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-12"
          >
            {/* Simple static title without animations */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-dark-primary">
              Qualify IT Solutions
            </h1>
            
            {/* Simple static description without animations */}
            <div className="text-xl md:text-2xl text-dark-secondary max-w-4xl mx-auto leading-relaxed">
              <p className="mb-2">
                Your partner in quality, compliance, and innovation.
              </p>
              <p>
                Expert delivery of world-class pharmaceutical facilities.
              </p>
            </div>
          </motion.div>

          {/* Enhanced CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
          >
            <HolographicButton 
              variant="primary" 
              className="group relative"
              onClick={() => window.location.href = '/enroll'}
            >
              <motion.span 
                className="relative z-10 flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Cpu className="w-5 h-5" />
                </motion.div>
                Get Started Today
                <motion.div
                  className="group-hover:translate-x-2 transition-transform duration-300"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.span>
            </HolographicButton>
          </motion.div>
        </motion.div>

        {/* Futuristic corner decorations */}
        <motion.div
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-400/30"
          animate={{
            borderColor: ["rgba(6, 182, 212, 0.3)", "rgba(59, 130, 246, 0.5)", "rgba(139, 92, 246, 0.4)", "rgba(6, 182, 212, 0.3)"]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-400/30"
          animate={{
            borderColor: ["rgba(6, 182, 212, 0.3)", "rgba(59, 130, 246, 0.5)", "rgba(139, 92, 246, 0.4)", "rgba(6, 182, 212, 0.3)"]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyan-400/30"
          animate={{
            borderColor: ["rgba(6, 182, 212, 0.3)", "rgba(59, 130, 246, 0.5)", "rgba(139, 92, 246, 0.4)", "rgba(6, 182, 212, 0.3)"]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-400/30"
          animate={{
            borderColor: ["rgba(6, 182, 212, 0.3)", "rgba(59, 130, 246, 0.5)", "rgba(139, 92, 246, 0.4)", "rgba(6, 182, 212, 0.3)"]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 3 }}
        />
      </section>

      {/* Services Section with Enhanced Futuristic Animations */}
      <FuturisticScrollRevealSection className="py-32 bg-dark-bg relative">
        {/* Futuristic background pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-dark-primary mb-6">
              Our Expert Services
            </h2>
            <p className="text-xl text-dark-secondary max-w-3xl mx-auto">
              Comprehensive validation and engineering services for pharmaceutical, biotechnology, and software industries with local support and global expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Shield, title: "Computer System Validation (CSV)", description: "Comprehensive CSV services ensuring accuracy, reliability, and compliance with electronic record standards for pharmaceutical systems." },
              { icon: Code, title: "21 CFR Part 11 Compliance", description: "GAMP 5 Guidelines, Risk-Based Validation" },
              { icon: Building, title: "Commissioning & Qualification (CQV)", description: "Expert CQV services for pharmaceutical facilities from concept to operation with complete lifecycle support." },
              { icon: CheckSquare, title: "Excel Sheet Validation", description: "Critical spreadsheet validation ensuring accuracy, reliability, and regulatory compliance for pharmaceutical calculations." },
              { icon: Users, title: "Pharmaceutical Training", description: "Comprehensive training programs covering GMP, regulatory compliance, quality management, and data integrity." }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-dark-cta transition-all duration-300 hover:shadow-lg hover:shadow-dark-cta/20 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-dark-cta to-dark-positive rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-dark-secondary flex-grow text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FuturisticScrollRevealSection>

      {/* Features Section */}
      <FuturisticScrollRevealSection className="py-32 bg-dark-card relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-dark-primary mb-6">
              Why Choose Qualify IT Solutions?
            </h2>
            <p className="text-xl text-dark-secondary max-w-3xl mx-auto">
              As a startup company in engineering & design, we bring fresh perspectives and innovative solutions to traditional pharmaceutical validation challenges.
            </p>
        </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {[
              { icon: Award, title: "Expert CSV & CQV Engineers", description: "Expert CSV & CQV engineers with proven track record" },
              { icon: Globe, title: "Local Support, Global Expertise", description: "Local support with global subject matter expertise" },
              { icon: Zap, title: "Cost-Effective Solutions", description: "Cost-effective designs meeting regulatory requirements" },
              { icon: CheckCircle, title: "Complete Lifecycle Support", description: "Complete lifecycle support from concept to operation" },
              { icon: Shield, title: "GXP & Non-GXP Systems", description: "Specialized in GXP and Non-GXP systems" },
              { icon: BookOpen, title: "Training & Documentation", description: "Comprehensive training and documentation services" }
            ].map((feature, index) => (
        <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-dark-cta to-dark-positive rounded-xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-dark-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-dark-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>
                  </motion.div>
                ))}
          </div>
        </div>
      </FuturisticScrollRevealSection>

      {/* CTA Section */}
      <FuturisticScrollRevealSection className="py-32 bg-dark-bg relative">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-dark-primary mb-6">
              Ready to Start Your Validation Project?
            </h2>
            <p className="text-xl text-dark-secondary mb-8">
              Our team of CSV & CQV engineers is ready to take your project from concept to operation. Contact us today for a free consultation and discover how we can help ensure your pharmaceutical facility meets all regulatory requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <HolographicButton variant="primary">
                  Start Your Project
              </HolographicButton>
              <HolographicButton variant="secondary">
                  Learn More
              </HolographicButton>
            </div>
          </motion.div>
        </div>
      </FuturisticScrollRevealSection>
    </>
  );
}