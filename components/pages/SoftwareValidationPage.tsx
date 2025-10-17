import { motion, useScroll, useTransform } from "framer-motion";
import { CheckSquare, Code, Shield, Database, ArrowRight, CheckCircle, Monitor, Settings, X } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LearningLadder } from "../animations/EnhancedAnimations";
import { useRef, useState, useEffect } from "react";
import { Service, ValidationPhase } from "../../types";

// Validation Icon Component
function ValidationIcon({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: delay,
        ease: "easeOut"
      }}
      whileHover={{ scale: 1.2 }}
    >
      <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0" />
    </motion.div>
  );
}

// Validation Circuit Component
function ValidationCircuit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // 7 circuit nodes as per guide
  const circuitNodes = [
    { x: 8,  y: 25, label: "Requirements", icon: Database },
    { x: 33, y: 20, label: "Risk Assessment", icon: Shield },
    { x: 64, y: 28, label: "Testing", icon: Code },
    { x: 90, y: 24, label: "Documentation", icon: CheckSquare },
    { x: 18, y: 62, label: "IQ", icon: Settings },
    { x: 50, y: 70, label: "OQ", icon: Monitor },
    { x: 82, y: 66, label: "PQ", icon: CheckCircle }
  ];

  const [activatedNodes, setActivatedNodes] = useState<number[]>([]);

  // Activate nodes based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const nodeCount = Math.floor(latest * circuitNodes.length);
      setActivatedNodes(Array.from({ length: nodeCount }, (_, i) => i));
    });

    return () => unsubscribe();
  }, [scrollYProgress, circuitNodes.length]);

  // Connection lines between nodes
  const connections = [
    { from: 0, to: 1, progress: useTransform(scrollYProgress, [0, 0.15], [0, 1]) },
    { from: 1, to: 2, progress: useTransform(scrollYProgress, [0.15, 0.3], [0, 1]) },
    { from: 2, to: 3, progress: useTransform(scrollYProgress, [0.3, 0.45], [0, 1]) },
    { from: 0, to: 4, progress: useTransform(scrollYProgress, [0.45, 0.6], [0, 1]) },
    { from: 4, to: 5, progress: useTransform(scrollYProgress, [0.6, 0.75], [0, 1]) },
    { from: 5, to: 6, progress: useTransform(scrollYProgress, [0.75, 1], [0, 1]) }
  ];

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 h-64 sm:h-72 md:h-80">
      {/* Circuit Grid Background */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="circuitGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-indigo-300"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuitGrid)" />
      </svg>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="validationGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="1" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
          </linearGradient>
          <filter id="validationBlur">
            <feGaussianBlur stdDeviation="0.5"/>
          </filter>
        </defs>

        {connections.map((connection, index) => {
          const fromNode = circuitNodes[connection.from];
          const toNode = circuitNodes[connection.to];

          return (
            <motion.line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="url(#validationGlow)"
              strokeWidth="2"
              filter="url(#validationBlur)"
              initial={{ pathLength: 0 }}
              style={{
                pathLength: connection.progress,
                willChange: "stroke-dasharray"
              }}
            />
          );
        })}
      </svg>

      {/* Validation Nodes */}
      {circuitNodes.map((node, index) => {
        const isActivated = activatedNodes.includes(index);
        const Icon = node.icon;

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center border transition-all duration-300 ${
                  isActivated
                    ? 'bg-white border-indigo-500 shadow-md sm:shadow-lg shadow-indigo-500/20'
                    : 'bg-gray-100 border-gray-300'
                }`}
                whileHover={{ scale: 1.08 }}
                animate={isActivated ? {
                  boxShadow: [
                    "0 0 0 0 rgba(79, 70, 229, 0.3)",
                    "0 0 0 6px rgba(79, 70, 229, 0)",
                    "0 0 0 0 rgba(79, 70, 229, 0.3)"
                  ]
                } : undefined}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActivated ? 'text-indigo-600' : 'text-gray-400'}`} />
              </motion.div>
              <span className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-medium text-indigo-600 whitespace-nowrap">
                {node.label}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* Status Indicator */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${activatedNodes.length === circuitNodes.length ? 'bg-green-500' : 'bg-indigo-500'}`} />
          <span className="text-xs font-medium text-gray-700">
            {activatedNodes.length === circuitNodes.length ? 'Validation Complete' : 'Validating...'}
          </span>
        </div>
      </div>
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
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center text-white">
              <service.icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-light-primary">{service.title}</h3>
              <div className="w-12 h-1 bg-indigo-500 rounded-full mt-2"></div>
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
            className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600 transition-colors"
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

export function SoftwareValidationPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<ValidationPhase | null>(null);
  const [isPhasePopupOpen, setIsPhasePopupOpen] = useState(false);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedService(null);
  };

  const handlePhaseClick = (phase: ValidationPhase) => {
    setSelectedPhase(phase);
    setIsPhasePopupOpen(true);
  };

  const handleClosePhasePopup = () => {
    setIsPhasePopupOpen(false);
    setSelectedPhase(null);
  };

  // 3 main validation services as per guide
  const validationServices = [
    {
      icon: Database,
      title: "Computer System Validation (CSV)",
      description: "Our computer system validation services ensure that IT systems used in regulated environments operate accurately, reliably, and consistently. We validate systems to confirm they meet both business and regulatory requirements, while also ensuring they can detect, manage, and prevent invalid or modified records. With comprehensive testing and documentation, we help organizations maintain compliance and safeguard data integrity across their operations."
    },
    {
      icon: Settings,
      title: "Legacy System Upgradation",
      description: "Many organizations continue to rely on legacy systems that may not meet today's compliance or performance standards. We provide expert upgradation services that modernize these systems while maintaining operational continuity. Each upgrade is accompanied by complete validation documentation and compliance checks, ensuring a smooth transition without compromising regulatory requirements. This approach not only extends the lifecycle of older systems but also enhances their efficiency and reliability."
    },
    {
      icon: Code,
      title: "PLC and SCADA Validation",
      description: "Automation systems such as PLC (Programmable Logic Controllers) and SCADA (Supervisory Control and Data Acquisition) play a critical role in manufacturing and regulated industries. We offer specialized validation services for these systems, following GAMP (Good Automated Manufacturing Practice) guidelines to ensure full compliance. Our process verifies system functionality, reliability, and integration, helping organizations achieve safe, compliant, and efficient automation operations."
    }
  ];

  // 6 validation phases as per guide
  const validationPhases = [
    {
      phase: "Step 1",
      title: "Requirements Gathering",
      description: "The first step in the validation process is a detailed gathering of requirements to fully understand business objectives, user expectations, and compliance needs. This involves analyzing how Excel spreadsheets are currently being used, what critical business processes they support, and which regulatory standards they must comply with. During this stage, we collaborate with stakeholders to document functional and technical requirements, identify potential gaps, and ensure that all compliance obligations are addressed right from the start.",
      deliverables: [
        "Requirements Documentation",
        "System Impact Assessment",
        "User Requirements Specification"
      ]
    },
    {
      phase: "Step 2",
      title: "Risk Assessment",
      description: "Once requirements are established, we perform a comprehensive risk assessment to identify potential issues that could compromise data integrity, accuracy, or compliance. This includes evaluating the complexity of Excel formulas, macros, and data-handling processes, as well as highlighting critical control points where errors could occur. By assigning risk levels and implementing mitigation strategies, we help ensure that all risks are managed proactively, reducing the chance of compliance failures or costly mistakes.",
      deliverables: [
        "Risk Assessment Reports",
        "Risk Mitigation Strategies",
        "Critical Control Point Analysis"
      ]
    },
    {
      phase: "Step 3",
      title: "Validation Planning",
      description: "Based on the risk assessment, we develop a comprehensive validation plan that outlines the testing strategy, acceptance criteria, and documentation requirements. This plan includes detailed test cases for each critical function, user acceptance testing protocols, and procedures for handling deviations. The validation plan serves as a roadmap for the entire validation process, ensuring that all aspects of the Excel application are thoroughly tested and documented.",
      deliverables: [
        "Validation Master Plan",
        "Test Case Documentation",
        "Acceptance Criteria Definition"
      ]
    },
    {
      phase: "Step 4",
      title: "Testing & Documentation",
      description: "The testing phase involves executing all planned test cases, documenting results, and verifying that the Excel application meets all specified requirements. This includes functional testing of formulas and macros, performance testing under various data loads, and user acceptance testing with actual end users. All testing activities are thoroughly documented with evidence of compliance, creating a complete audit trail for regulatory inspections.",
      deliverables: [
        "Test Execution Records",
        "Performance Test Results",
        "User Acceptance Test Reports"
      ]
    },
    {
      phase: "Step 5",
      title: "User Training & Support",
      description: "To ensure successful implementation and ongoing compliance, we provide comprehensive user training on the validated Excel application. This includes training on proper usage procedures, data entry protocols, and maintenance requirements. We also establish ongoing support procedures to address any issues that may arise and ensure continued compliance with regulatory standards.",
      deliverables: [
        "Training Materials",
        "User Manuals",
        "Support Procedures"
      ]
    },
    {
      phase: "Step 6",
      title: "Ongoing Maintenance",
      description: "Validation is not a one-time activity but an ongoing process. We establish procedures for maintaining the validated state of Excel applications, including change control processes, periodic reviews, and re-validation when necessary. This ensures that the application remains compliant with regulatory requirements throughout its lifecycle and continues to meet business needs effectively.",
      deliverables: [
        "Change Control Procedures",
        "Periodic Review Reports",
        "Re-validation Protocols"
      ]
    }
  ];

  // 12 system types as per guide
  const systemTypes = [
    "Application Software Validation (GAMP & EU ANNEX 11)",
    "PLC and SCADA Systems",
    "EMS/BMS Qualification Systems",
    "Manufacturing Execution Systems (MES)",
    "Laboratory Information Systems (LIMS)",
    "Enterprise Resource Planning (ERP)",
    "Electronic Batch Records (EBR)",
    "Document Management Systems",
    "Distributed Control Systems (DCS)",
    "Quality Management Systems",
    "Environmental Monitoring Systems",
    "All Type Computerized Systems"
  ];

  return (
    <div className="bg-light-bg min-h-screen relative overflow-hidden">
      {/* Universal page transition */}
      <LearningLadder />

      {/* Hero Section */}
      <section className="py-16 lg:py-20 pt-20 bg-gradient-to-br from-indigo-50 to-blue-100 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center min-h-[420px]">
            {/* Content Column */}
            <div className="space-y-8">
              {/* Service Badge */}
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-indigo-600 font-semibold">System Validation</span>
                  <span className="text-light-secondary text-sm">Computer Software Validation</span>
                </div>
              </motion.div>

              {/* Main Headlines */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-light-primary leading-tight">
                  Computer Software
                  <span className="block text-indigo-600">Validation</span>
                </h1>
                <p className="text-lg text-light-secondary leading-relaxed max-w-2xl">
                  Validation of computer systems is essential to confirm their accuracy, reliability, consistent performance as intended, and capability to identify invalid or modified records. Our CSV specialists ensure complete compliance with electronic record standards.
                </p>
              </motion.div>

              {/* Call-to-Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/enroll'}
                >
                  <span>Enroll</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Compliance Indicators */}
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { badge: "21 CFR Part 11", delay: 1.4 },
                  { badge: "GAMP 5 Compliant", delay: 1.6 },
                  { badge: "Risk-Based Approach", delay: 1.8 }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg border border-indigo-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: item.delay, duration: 0.5 }}
                  >
                    <Shield className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-700">{item.badge}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Image Column */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, rotateY: -10 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHN5c3RlbSUyMHZhbGlkYXRpb24lMjBwaGFybWFjZXV0aWNhbHxlbnwxfHx8fDE3NTU1Mjk3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Computer system validation in pharmaceutical environment"
                  className="w-full h-[280px] md:h-[320px] lg:h-[360px] object-cover"
                  fallbackType="pharmaceutical"
                />
              </div>

              {/* Floating Validation Badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircle className="w-8 h-8 text-green-500" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Database className="w-8 h-8 text-indigo-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Validation Process Flow Section */}
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
              Validation Process Flow
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Real-time visualization of our comprehensive validation workflow with interconnected validation steps.
            </motion.p>
          </div>

          {/* Interactive Validation Circuit */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <ValidationCircuit />
          </motion.div>
        </div>
      </section>

      {/* Validation Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-light-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Validation Services
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Comprehensive computer system validation services following industry best practices and regulatory guidelines.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {validationServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-indigo-500/20 h-full flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
                onClick={() => handleServiceClick(service)}
                initial={{
                  opacity: 0,
                  y: 50,
                  rotateX: -15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  boxShadow: "0 20px 40px rgba(99, 102, 241, 0.15)",
                }}
                viewport={{ once: true }}
              >
                {/* Gradient Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Accent Lines - Properly aligned to card edges */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-indigo-500 origin-left"
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
                  className="absolute top-0 right-0 h-full w-1 bg-indigo-500 origin-top"
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
                  className="relative z-10 w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-all duration-300 shadow-md" 
                  whileHover={{ rotate: 180 }} 
                  transition={{ duration: 0.4 }}
                >
                  <div className="scale-75">
                    <service.icon className="w-7 h-7" />
                  </div>
                </motion.div>

                {/* Title - Centered */}
                <h3 className="relative z-10 text-xl font-bold text-light-primary group-hover:text-indigo-600 transition-colors duration-300 text-center">
                  {service.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Validation Phases Section */}
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
              Validation Phases
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Our systematic six-step approach ensures comprehensive validation with clear deliverables and audit trails.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {validationPhases.map((phase, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-light-border relative overflow-hidden h-full flex flex-col cursor-pointer"
                onClick={() => handlePhaseClick(phase)}
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                }}
              >
                {/* Phase Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div
                    className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-lg font-bold"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)"
                    }}
                  >
                    {index + 1}
                  </motion.div>
                  <motion.div className="text-sm font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                    {phase.phase}
                  </motion.div>
                </div>

                {/* Phase Content */}
                <div className="space-y-4 flex-grow">
                  <h3 className="text-xl font-bold text-light-primary">
                    {phase.title}
                  </h3>
                </div>

                {/* Deliverables */}
                <div className="mt-6">
                  <h4 className="text-base font-semibold text-light-primary mb-3">Key Deliverables:</h4>
                  <ul className="space-y-2">
                    {phase.deliverables.map((deliverable, idx) => (
                      <motion.li
                        key={idx}
                        className="text-sm text-light-secondary flex items-center space-x-2"
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.8 + idx * 0.1, duration: 0.4 }}
                      >
                        <ValidationIcon delay={index * 0.2 + 0.9 + idx * 0.1} />
                        <span>{deliverable}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-light-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              System Types We Validate
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Comprehensive validation services for all types of computerized systems in pharmaceutical operations.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemTypes.map((systemType, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200 hover:border-indigo-300 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 25px rgba(79, 70, 229, 0.15)",
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-light-primary group-hover:text-indigo-600 transition-colors">
                      {systemType}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to Validate Your Systems?
          </motion.h2>

          <motion.p
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Our computer system validation experts are ready to help ensure your systems meet all regulatory requirements and operate with complete reliability and compliance.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/enroll'}
            >
              <span>Enroll</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Service Popup Modal */}
      <ServicePopup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
        service={selectedService} 
      />

      {/* Phase Popup Modal */}
      {isPhasePopupOpen && selectedPhase && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClosePhasePopup}
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
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-lg font-bold">
                  {validationPhases.findIndex(p => p.title === selectedPhase.title) + 1}
                </div>
                <div>
                  <div className="text-sm font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full inline-block mb-2">
                    {selectedPhase.phase}
                  </div>
                  <h3 className="text-2xl font-bold text-light-primary">{selectedPhase.title}</h3>
                </div>
              </div>
              <button
                onClick={handleClosePhasePopup}
                className="text-light-secondary hover:text-light-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-light-secondary leading-relaxed mb-6">{selectedPhase.description}</p>
            
            <div>
              <h4 className="text-lg font-semibold text-light-primary mb-4">Key Deliverables:</h4>
              <ul className="space-y-3">
                {selectedPhase.deliverables.map((deliverable, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span className="text-light-secondary">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}