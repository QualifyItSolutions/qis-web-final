import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Shield, CheckCircle, ArrowRight, Target, Lightbulb, Heart, X } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LearningLadder } from "../animations/EnhancedAnimations";

// ScrollProgressIndicator Component
function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pharma-primary via-pharma-secondary to-blue-600 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// ParallaxElements Component
function ParallaxElements() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 100]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 180]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border-2 border-white/20 rounded-full"
        style={{ y: y1, rotate }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-lg"
        style={{ y: y2 }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-16 h-16 border-2 border-pharma-secondary/30 rounded-full"
        style={{ y: y1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// FloatingCard Component
interface FloatingCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function FloatingCard({ children, delay = 0, className = "" }: FloatingCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
      whileHover={{ y: -8, scale: 1.02, rotateX: 5 }}
      transition={{
        delay,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-light-border ${className}`}
    >
      {children}
    </motion.div>
  );
}

// StaggerContainer Component
interface StaggerContainerProps {
  children: React.ReactNode;
  delayIncrement?: number;
  className?: string;
}

function StaggerContainer({ children, delayIncrement = 0.1, className = "" }: StaggerContainerProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            delay: index * delayIncrement
          });
        }
        return child;
      })}
    </div>
  );
}

// Value Popup Modal Component
function ValuePopup({ isOpen, onClose, value }: { isOpen: boolean; onClose: () => void; value: { icon: React.ComponentType<{ className?: string }>; title: string; description: string } | null }) {
  if (!isOpen || !value) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pharma-primary to-pharma-secondary rounded-2xl flex items-center justify-center text-white">
              <value.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-light-primary">{value.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-light-secondary hover:text-light-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-light-secondary leading-relaxed">{value.description}</p>
      </motion.div>
    </motion.div>
  );
}

export function AboutPage() {
  const [selectedValue, setSelectedValue] = useState<{ icon: React.ComponentType<{ className?: string }>; title: string; description: string } | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleValueClick = (value: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }) => {
    setSelectedValue(value);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedValue(null);
  };

  // Core Values (4 items) as per guide
  const coreValues = [
    {
      icon: Shield,
      title: "Quality Excellence",
      description: "We are dedicated to delivering world-class pharmaceutical facilities and services that consistently meet the highest standards of quality and regulatory expectations. Every project we undertake is guided by rigorous quality frameworks, ensuring reliability, safety, and long-term value. Our focus on quality excellence drives not only compliance but also trust, giving our clients the confidence that their operations are built on a foundation of integrity and precision."
    },
    {
      icon: Target,
      title: "Regulatory Compliance",
      description: "With ever-changing global regulations, maintaining compliance is essential. Our team ensures full alignment with GxP requirements, FDA guidelines, EMA directives, and international pharmaceutical standards. By integrating compliance into every stage of development and validation, we help clients minimize regulatory risks, prepare effectively for audits, and maintain smooth market access. Our proactive compliance approach ensures that your operations remain future-ready."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We believe that innovation is key to overcoming today's pharmaceutical challenges. By combining deep industry expertise with fresh perspectives and cutting-edge solutions, we deliver smarter, faster, and more cost-effective validation strategies. Our innovative methodologies transform traditional approaches, streamline processes, and enhance overall efficiency—helping clients stay ahead in a competitive and highly regulated environment."
    },
    {
      icon: Heart,
      title: "Client Satisfaction",
      description: "Our clients are at the center of everything we do. We are committed to providing top-notch, customized services that address unique project needs while making the experience smooth and stress-free. From project initiation to delivery, we emphasize clear communication, reliability, and partnership. Client satisfaction isn't just a goal—it's our promise, reflected in the long-term relationships we build and the success we help our clients achieve."
    }
  ];

  // Industries Served (4 sectors) as per guide
  const industries = [
    {
      emoji: "🏭",
      title: "Pharmaceutical",
      description: "Manufacturing facilities, quality control systems, and regulatory compliance solutions"
    },
    {
      emoji: "🧬",
      title: "Biotechnology",
      description: "Biotech facilities, research systems, and specialized equipment validation"
    },
    {
      emoji: "🏗️",
      title: "Infrastructure",
      description: "Facility design, utilities validation, and infrastructure commissioning"
    },
    {
      emoji: "💻",
      title: "Software",
      description: "Application validation, system integration, and software compliance"
    }
  ];

  // Expertise Areas (8 items) as per guide
  const expertiseAreas = [
    "Computer System Validation (CSV)",
    "Commissioning & Qualification (CQV)",
    "Excel Sheet Validation",
    "Pharmaceutical Training Programs",
    "GAMP 5 Guidelines Implementation",
    "21 CFR Part 11 Compliance",
    "Risk-Based Validation Strategies",
    "Data Integrity Solutions"
  ];

  // Client Portfolio (5 major clients) with local logo integration
  const clients = [
    {
      name: "Virchow Biotech Pvt Ltd",
      location: "Units 1,2,4,5",
      logo: "/logos/virchow_biotech.png"
    },
    {
      name: "GCBC Vaccines PVT LTD",
      location: "Medchal, MuppireddyPalli",
      logo: "/logos/gcbc_vaccines.jpg"
    },
    {
      name: "Inter Chieme werken \"De Adellar\" B.V.",
      location: "Netherlands",
      logo: "/logos/interchemie_deadellar.png"
    },
    {
      name: "Bharat Bio Tech",
      location: "Turkapally",
      logo: "/logos/bharat_biotech.jpg"
    },
    {
      name: "SVVS Cal Labs PVT LTD",
      location: "Pragathi Nagar",
      logo: "/logos/svvs_cal_labs.png"
    }
  ];

  return (
    <div className="min-h-screen bg-light-bg relative overflow-hidden">
      <ScrollProgressIndicator />
      <LearningLadder />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pharma-primary to-blue-800 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <ParallaxElements />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Company Introduction */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  About Qualify IT Solutions
                </h1>
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  Leading pharmaceutical validation and compliance experts delivering world-class solutions for regulatory excellence and operational efficiency.
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <motion.button
                  className="bg-white text-pharma-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.location.href = '/contact';
                  }}
                >
                  Contact Us
                </motion.button>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-bg relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-light-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our Core Values
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              The principles that guide our commitment to pharmaceutical excellence and client success
            </motion.p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <FloatingCard key={index} className="p-8 text-center">
                <div className="cursor-pointer" onClick={() => handleValueClick(value)}>
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-pharma-primary to-pharma-secondary rounded-2xl flex items-center justify-center text-white mb-6 mx-auto"
                    whileHover={{
                      rotate: 360,
                      boxShadow: "0 15px 35px rgba(30, 64, 175, 0.4)"
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <value.icon className="w-8 h-8" />
                  </motion.div>
          <h3 className="text-lg font-bold text-light-primary mb-4">
            {value.title}
          </h3>
                </div>
              </FloatingCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Industries Served Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-light-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Industries We Serve
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Delivering specialized validation and compliance solutions across diverse pharmaceutical sectors
            </motion.p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <FloatingCard key={index} className="p-8 text-center">
                <motion.div
                  className="text-6xl mb-6"
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, 0]
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {industry.emoji}
                </motion.div>
                <h3 className="text-lg font-bold text-light-primary mb-4">
                  {industry.title}
                </h3>
                <p className="text-light-secondary text-sm leading-relaxed">
                  {industry.description}
                </p>
              </FloatingCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Expertise Areas Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-bg relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-light-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our Expertise Areas
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Comprehensive pharmaceutical validation and compliance services across all critical areas
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-light-border text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 25px rgba(30, 64, 175, 0.15)",
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pharma-primary to-pharma-secondary rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-light-primary text-sm">
                  {area}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Portfolio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-light-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our Client Portfolio
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Trusted by leading pharmaceutical and biotechnology companies worldwide
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-light-border text-center"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(30, 64, 175, 0.15)"
                }}
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
                  <ImageWithFallback
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="w-full h-full object-contain p-2"
                    fallbackType="pharmaceutical"
                  />
                </div>
                <h3 className="text-lg font-bold text-light-primary mb-2">
                  {client.name}
                </h3>
                <p className="text-light-secondary text-sm">
                  {client.location}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pharma-primary to-blue-800 text-white relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to Partner with Us?
          </motion.h2>

          <motion.p
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Let&apos;s discuss how our expertise can help your pharmaceutical operations achieve regulatory excellence and operational efficiency.
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              className="bg-white text-pharma-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/enroll'}
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Value Popup Modal */}
      <ValuePopup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
        value={selectedValue} 
      />
    </div>
  );
}