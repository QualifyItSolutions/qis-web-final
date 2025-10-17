import { motion, useInView } from "framer-motion";
import { Wrench, Cog, ArrowRight, Factory, Zap, Shield, Layers, Cpu, Database, X } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { MolecularPatterns, EngineeringHorizontalReveal, AnimatedComplianceChecklist } from "../animations/ServiceAnimations";
import { AnimatedText } from "../animations/ScrollAnimations";
import { LearningLadder } from "../animations/LearningLadder";
import { useRef, useState, useEffect, useMemo } from "react";
import { Service } from "../../types";

// Molecular Engineering Network Animation
function MolecularEngineeringNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Engineering molecules representing different systems
  const molecules = useMemo(() => [
    { x: 20, y: 30, label: "HVAC", icon: Zap, connections: [1, 3] },
    { x: 50, y: 20, label: "Cleanroom", icon: Layers, connections: [2, 4] },
    { x: 80, y: 35, label: "Equipment", icon: Cog, connections: [3, 4] },
    { x: 25, y: 70, label: "Utilities", icon: Database, connections: [4] },
    { x: 75, y: 65, label: "Control", icon: Cpu, connections: [] }
  ], []);

  const [activatedMolecules, setActivatedMolecules] = useState<number[]>([]);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;
    
    molecules.forEach((_, index) => {
      setTimeout(() => {
        setActivatedMolecules(prev => [...prev, index]);
      }, index * 500);
    });
  }, [isInView, molecules]);

  return (
    <div ref={containerRef} className="relative h-96 w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200 overflow-hidden">
      {/* Engineering Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="engineeringGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-400"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#engineeringGrid)" />
        </svg>
      </div>

      {/* Molecular Connections */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="engineeringFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
          </linearGradient>
          
          <filter id="engineeringGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {molecules.map((molecule, index) => 
          molecule.connections.map((connectionIndex) => {
            const targetMolecule = molecules[connectionIndex];
            const isActive = activatedMolecules.includes(index) && activatedMolecules.includes(connectionIndex);
            
            return (
              <motion.line
                key={`${index}-${connectionIndex}`}
                x1={molecule.x}
                y1={molecule.y}
                x2={targetMolecule.x}
                y2={targetMolecule.y}
                stroke="url(#engineeringFlow)"
                strokeWidth="2"
                filter="url(#engineeringGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isActive ? { pathLength: 1, opacity: 1 } : undefined}
                transition={{ 
                  duration: 1.5, 
                  delay: (index + connectionIndex) * 0.3,
                  ease: "easeInOut"
                }}
              />
            );
          })
        )}
      </svg>

      {/* Engineering Molecules */}
      {molecules.map((molecule, index) => {
        const Icon = molecule.icon;
        const isActivated = activatedMolecules.includes(index);
        
        return (
          <motion.div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${molecule.x}%`, top: `${molecule.y}%` }}
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={isActivated ? { scale: 1, opacity: 1, rotate: 0 } : undefined}
            transition={{ 
              duration: 0.8,
              delay: index * 0.4,
              type: "spring",
              stiffness: 150
            }}
            whileHover={{ scale: 1.2, rotate: 360 }}
          >
            <motion.div
              className={`relative w-16 h-16 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
                isActivated
                  ? 'bg-white border-blue-500 shadow-lg shadow-blue-500/30'
                  : 'bg-gray-100 border-gray-300'
              }`}
              animate={isActivated ? {
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.4)",
                  "0 0 0 12px rgba(59, 130, 246, 0)",
                  "0 0 0 0 rgba(59, 130, 246, 0.4)"
                ]
              } : undefined}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: index * 0.5
              }}
            >
              <Icon className={`w-7 h-7 ${isActivated ? 'text-blue-600' : 'text-gray-400'}`} />
              
              {/* Pulsing core */}
              <motion.div
                className={`absolute inset-3 rounded-xl ${isActivated ? 'bg-blue-500' : 'bg-transparent'}`}
                animate={isActivated ? {
                  opacity: [0, 0.3, 0],
                  scale: [0.8, 1.2, 0.8]
                } : undefined}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              />
            </motion.div>

            {/* System label */}
            <motion.div
              className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: -10 }}
              animate={isActivated ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: index * 0.4 + 0.5 }}
            >
              <span className={`text-sm font-semibold px-3 py-1 rounded-lg whitespace-nowrap ${
                isActivated
                  ? 'text-blue-600 bg-blue-100'
                  : 'text-gray-400 bg-gray-100'
              }`}>
                {molecule.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Engineering Flow Indicator */}
      <motion.div
        className="absolute top-4 right-4 flex items-center space-x-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={activatedMolecules.length > 0 ? { opacity: 1, scale: 1 } : undefined}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className={`w-3 h-3 rounded-full ${activatedMolecules.length === molecules.length ? 'bg-green-400' : 'bg-blue-400'}`}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0.4)",
              "0 0 0 8px rgba(59, 130, 246, 0)",
              "0 0 0 0 rgba(59, 130, 246, 0.4)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
        <span className="text-sm font-medium text-blue-600">
          {activatedMolecules.length === molecules.length ? 'System Integrated' : 'Engineering...'}
        </span>
      </motion.div>
    </div>
  );
}

// Service Popup Modal Component
function ServicePopup({ isOpen, onClose, service }: { isOpen: boolean; onClose: () => void; service: Service | null }) {
  if (!isOpen || !service) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pharma-primary to-blue-600 rounded-2xl flex items-center justify-center text-white">
              <service.icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-light-primary">{service.title}</h3>
              <div className="w-12 h-1 bg-pharma-secondary rounded-full mt-2"></div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-light-secondary leading-relaxed text-base">
            {service.description}
          </p>
        </div>
        
        <div className="mt-8 flex justify-end">
          <motion.button
            onClick={onClose}
            className="px-6 py-3 bg-pharma-primary text-white rounded-xl font-semibold hover:bg-pharma-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PharmaEngineeringPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const services = [
    { 
      icon: Factory, 
      title: "Facility Design", 
      description: "We offer end-to-end pharmaceutical facility design services that ensure full compliance with current Good Manufacturing Practices (cGMP). Our approach incorporates cleanroom classifications, controlled environmental parameters, and contamination control strategies to meet stringent regulatory requirements. From conceptual layouts to detailed engineering, we focus on optimizing space utilization, material and personnel flow, and integrating critical utilities and HVAC systems." 
    },
    { 
      icon: Cog, 
      title: "Equipment Engineering", 
      description: "Our Equipment Engineering services focus on the selection, design, and integration of high-performance equipment tailored for pharmaceutical manufacturing. We develop detailed User Requirement Specifications (URS), perform design qualification, and support vendor evaluation to ensure the right fit for your process needs. Whether it's standalone units or fully integrated systems, our team ensures compliance with GMP and 21 CFR Part 11 requirements." 
    },
    { 
      icon: Zap, 
      title: "Process Optimization", 
      description: "We help pharmaceutical companies enhance productivity and reduce variability through comprehensive Process Optimization services. By analyzing existing workflows and production data, we identify inefficiencies and implement improvements using Lean, Six Sigma, and Process Analytical Technology (PAT) principles. Our team supports technology transfer, scale-up activities, and implementation of continuous improvement strategies." 
    },
    { 
      icon: Shield, 
      title: "Validation Support", 
      description: "Our Validation Support services are designed to ensure your facilities, equipment, utilities, and processes consistently meet regulatory expectations and perform as intended. We prepare and execute comprehensive validation documentation including Validation Master Plans (VMP), Installation Qualification (IQ), Operational Qualification (OQ), and Performance Qualification (PQ). In addition, we provide cleaning validation, process validation, and computer system validation (CSV) aligned with global regulatory standards." 
    }
  ];

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedService(null);
  };

  const engineeringProcess = [
    "Requirements Analysis & Planning",
    "Conceptual Design Development",
    "Detailed Engineering & Documentation",
    "Manufacturing & Assembly",
    "Installation & Commissioning",
    "Validation & Testing",
    "Training & Handover",
    "Ongoing Support & Maintenance"
  ];

  const capabilities = [
    "GMP Facility Design",
    "Cleanroom Engineering",
    "HVAC System Design",
    "Process Equipment Selection",
    "Automation Integration",
    "Utility Systems Planning",
    "Validation Protocol Development",
    "Regulatory Compliance Assurance"
  ];

  return (
    <div className="min-h-screen bg-light-bg relative">
      <LearningLadder />
      <MolecularPatterns />

      <EngineeringHorizontalReveal direction="left">
        <section className="relative bg-gradient-to-br from-pharma-primary to-blue-800 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-pharma-primary/20 to-transparent" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white/80 font-semibold">Engineering Excellence</span>
                </div>
                <AnimatedText text="Pharmaceutical Engineering Solutions" className="text-4xl md:text-5xl font-bold mb-6" />
                <motion.p className="text-xl text-white/90 mb-8 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
                  Comprehensive engineering services for pharmaceutical manufacturing facilities, equipment design, and process optimization with full GMP compliance.
                </motion.p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <ImageWithFallback src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Pharmaceutical Manufacturing Facility" className="w-full h-80 object-cover" fallbackType="pharmaceutical" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pharma-primary/30 to-transparent" />
                </div>
                <motion.div className="absolute -top-6 -right-6 bg-white rounded-lg p-4 shadow-xl" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, type: "spring" }}>
                  <div className="text-2xl font-bold text-pharma-secondary">100%</div>
                  <div className="text-sm text-gray-600">GMP Compliant</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </EngineeringHorizontalReveal>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-card">
        <div className="max-w-7xl mx-auto">
          <EngineeringHorizontalReveal direction="left">
            <div className="text-center mb-16">
              <AnimatedText text="Integrated Engineering Systems" className="text-3xl md:text-4xl font-bold text-light-primary mb-6" />
              <motion.p className="text-xl text-light-secondary max-w-3xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.6 }}>
                Our comprehensive approach ensures seamless integration of all pharmaceutical engineering systems.
              </motion.p>
            </div>
          </EngineeringHorizontalReveal>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            <MolecularEngineeringNetwork />
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <EngineeringHorizontalReveal direction="right">
            <div className="text-center mb-16">
              <AnimatedText text="Engineering Service Capabilities" className="text-3xl md:text-4xl font-bold text-light-primary mb-6" />
              <motion.p className="text-xl text-light-secondary max-w-3xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                From conceptual design to final validation, we provide end-to-end engineering solutions
              </motion.p>
            </div>
          </EngineeringHorizontalReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <EngineeringHorizontalReveal key={index} direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.2}>
                <motion.div 
                  className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-pharma-primary/20 h-full flex flex-col items-center justify-center cursor-pointer relative overflow-hidden" 
                  whileHover={{ scale: 1.02, y: -8 }}
                  onClick={() => handleServiceClick(service)}
                >
                  {/* Gradient Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pharma-primary/5 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Accent Lines - Properly aligned to card edges */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-pharma-primary origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-full h-1 bg-blue-600 origin-right"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute top-0 right-0 h-full w-1 bg-pharma-primary origin-top"
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-full w-1 bg-blue-600 origin-bottom"
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Icon Container - Centered */}
                  <motion.div 
                    className="relative z-10 w-14 h-14 bg-gradient-to-br from-pharma-primary to-blue-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-all duration-300 shadow-md" 
                    whileHover={{ rotate: 180 }} 
                    transition={{ duration: 0.4 }}
                  >
                    <div className="scale-75">
                      <service.icon className="w-8 h-8" />
                    </div>
                  </motion.div>
                  
                  {/* Title - Centered */}
                  <h3 className="relative z-10 text-xl font-bold text-light-primary group-hover:text-pharma-primary transition-colors duration-300 text-center">
                    {service.title}
                  </h3>
                  
                  {/* Hover Indicator */}
                  <motion.div 
                    className="absolute bottom-4 right-4 w-8 h-8 bg-pharma-primary/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowRight className="w-4 h-4 text-pharma-primary" />
                  </motion.div>
                </motion.div>
              </EngineeringHorizontalReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <EngineeringHorizontalReveal direction="left">
              <div>
                <AnimatedText text="Our Engineering Process" className="text-3xl md:text-4xl font-bold text-light-primary mb-6" />
                <motion.p className="text-xl text-light-secondary mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                  Our systematic approach ensures every project meets the highest standards of pharmaceutical engineering excellence and regulatory compliance.
                </motion.p>
                <AnimatedComplianceChecklist items={engineeringProcess} />
              </div>
            </EngineeringHorizontalReveal>
            <EngineeringHorizontalReveal direction="right" delay={0.3}>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <ImageWithFallback src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Engineering Process" className="w-full h-96 object-cover" fallbackType="engineering" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pharma-primary/20 to-transparent" />
                </div>
              </div>
            </EngineeringHorizontalReveal>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <EngineeringHorizontalReveal direction="left">
            <div className="text-center mb-16">
              <AnimatedText text="Technical Capabilities" className="text-3xl md:text-4xl font-bold text-light-primary mb-6" />
              <motion.p className="text-xl text-light-secondary" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                Comprehensive engineering expertise across all pharmaceutical manufacturing domains
              </motion.p>
            </div>
          </EngineeringHorizontalReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((capability, index) => (
              <EngineeringHorizontalReveal key={index} direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.1}>
                <motion.div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-light-color hover:border-pharma-primary/30" whileHover={{ scale: 1.02 }}>
                  <motion.div className="w-3 h-3 bg-pharma-secondary rounded-full" animate={{ boxShadow: [
                    "0 0 0 0 rgba(16, 185, 129, 0.7)",
                    "0 0 0 6px rgba(16, 185, 129, 0)"
                  ] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }} />
                  <span className="text-light-primary font-medium">{capability}</span>
                </motion.div>
              </EngineeringHorizontalReveal>
            ))}
          </div>
        </div>
      </section>

      <EngineeringHorizontalReveal direction="right">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pharma-primary to-blue-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <AnimatedText text="Ready to Engineer Your Success?" className="text-3xl md:text-4xl font-bold mb-6" />
              <motion.p className="text-xl text-white/90 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                Partner with our engineering experts to build world-class pharmaceutical facilities
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
                <motion.button 
                  className="px-8 py-4 bg-white text-pharma-primary rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg" 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/enroll'}
                >
                  Schedule Consultation
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </EngineeringHorizontalReveal>

      {/* Service Popup Modal */}
      <ServicePopup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
        service={selectedService} 
      />
    </div>
  );
}