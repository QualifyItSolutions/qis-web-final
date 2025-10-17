import { motion } from "framer-motion";
import { Code, Database, Shield, ArrowRight, Monitor, Lock, CheckCircle, FileSpreadsheet, X } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LearningLadder } from "../animations/LearningLadder";
import { FloatingHexGrid } from "../animations/EnhancedAnimations";
import { GxpCardExpand } from "../animations/ServiceAnimations";
import { useState } from "react";

interface ValidationStep {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function ExcelValidationPage() {
  const [selectedStep, setSelectedStep] = useState<ValidationStep | null>(null);
  const [showStepPopup, setShowStepPopup] = useState(false);

  const handleStepClick = (step: ValidationStep) => {
    setSelectedStep(step);
    setShowStepPopup(true);
  };

  const handleCloseStepPopup = () => {
    setShowStepPopup(false);
    setSelectedStep(null);
  };

  // 6-step Excel Sheet Validation process
  const validationProcess = [
    {
      step: "1",
      title: "Requirements Gathering",
      description: "We begin Excel sheet validation with a thorough requirement gathering phase, focusing on understanding the functional needs and regulatory expectations for GxP usage. This involves close collaboration with end users to define calculation logic, input parameters, and compliance controls such as access restrictions, audit trails, and electronic signatures. A comprehensive analysis ensures all spreadsheet functions and configurations meet FDA 21 CFR Part 11 and EU Annex 11 guidelines, laying a solid foundation for a compliant and robust validation process.",
      icon: <Database className="w-8 h-8" />
    },
    {
      step: "2",
      title: "Risk Assessment",
      description: "Our team performs detailed risk assessments to evaluate the intended use and potential compliance impact of each Excel-based tool. We identify critical control points, assess the likelihood and severity of data integrity risks, and classify spreadsheets based on their GxP relevance. This step allows for a risk-based validation strategy, focusing efforts where regulatory scrutiny and business impact are highest. The goal is to ensure traceability, reliability, and control of all spreadsheet-driven operations.",
      icon: <Monitor className="w-8 h-8" />
    },
    {
      step: "3",
      title: "Validation Planning",
      description: "In this phase, we establish a structured validation approach tailored to Excel applications used in GxP environments. The plan outlines deliverables, responsible stakeholders, testing scope, and timelines. It includes the creation of validation documents such as the Validation Plan, User Requirement Specification (URS), Functional Specification (FS), and Traceability Matrix. Our approach aligns with industry best practices, ensuring readiness for audits and inspections while supporting long-term compliance maintenance.",
      icon: <Shield className="w-8 h-8" />
    },
    {
      step: "4",
      title: "Testing & Documentation",
      description: "We execute rigorous testing protocols to verify that each Excel spreadsheet performs reliably and meets all documented requirements. This includes installation qualification (IQ), operational qualification (OQ), and, where applicable, performance qualification (PQ). Automated and manual test scripts are developed to cover all logical pathways and formula outputs. Final deliverables include a complete validation package with signed documentation, change control history, and audit trail review, ensuring full traceability and regulatory alignment.",
      icon: <Code className="w-8 h-8" />
    },
    {
      step: "5",
      title: "Training & Support",
      description: "Finally, we provide user training to ensure that teams can effectively work with the validated Excel applications while following established procedures. Training sessions are tailored to different user groups, covering both functional use and compliance responsibilities. In addition, we offer ongoing support and maintenance services to ensure continued compliance, resolve issues promptly, and adapt the application to evolving business or regulatory requirements. This helps organizations sustain long-term reliability and compliance of their Excel-based systems.",
      icon: <Lock className="w-8 h-8" />
    },
    {
      step: "6",
      title: "Documentation",
      description: "A complete and compliant documentation package is produced, capturing every stage of the validation process. This includes requirement specifications, risk assessments, test plans, executed test results, and validation reports. The documentation not only meets stringent pharmaceutical and regulatory standards but also provides clear audit trails that support inspections and compliance reviews. This serves as both evidence of due diligence and a resource for ongoing quality management.",
      icon: <CheckCircle className="w-8 h-8" />
    }
  ];

  // Key capabilities for Excel validation
  const keyCapabilities = [
    "Functional Requirements Analysis",
    "Comprehensive Testing Strategies", 
    "Regulatory Compliance Expertise",
    "User Training & Support",
    "Risk-Based Validation Approach",
    "Complete Documentation Packages",
    "Data Integrity Assurance",
    "Ongoing Maintenance Protocols"
  ];

  return (
    <div className="bg-light-bg min-h-screen">
      <LearningLadder />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pharma-primary to-blue-800 text-white relative overflow-hidden">
        <FloatingHexGrid />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Content Column */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Service Badge */}
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FileSpreadsheet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-pharma-secondary">Excel Validation</div>
                  <div className="text-xs text-white/80">Pharmaceutical Excellence</div>
                </div>
              </motion.div>

              {/* Main Headlines */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Excel Sheet
                  <span className="block text-pharma-secondary">Validation</span>
                </h1>
                <p className="text-lg text-white/90 leading-relaxed max-w-2xl">
                  Comprehensive Excel spreadsheet validation services ensuring regulatory compliance and data integrity for pharmaceutical calculations and critical business processes.
                </p>
              </motion.div>

              {/* Trust Indicators */}
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <CheckCircle className="w-5 h-5 text-pharma-secondary flex-shrink-0" />
                  <span className="text-sm font-medium text-white">FDA-Validated Methodologies</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <CheckCircle className="w-5 h-5 text-pharma-secondary flex-shrink-0" />
                  <span className="text-sm font-medium text-white">Regulatory Compliance Focus</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <CheckCircle className="w-5 h-5 text-pharma-secondary flex-shrink-0" />
                  <span className="text-sm font-medium text-white">Pharmaceutical Expertise</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Image Column */}
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Excel spreadsheet validation and pharmaceutical data analysis"
                  className="w-full h-[400px] object-cover"
                  fallbackType="default"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Capabilities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-light-primary mb-6">
              Key Capabilities
            </h2>
            <p className="text-xl text-light-secondary max-w-3xl mx-auto">
              Comprehensive Excel sheet validation services with proven pharmaceutical expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 p-6 bg-light-bg rounded-xl hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-3 h-3 bg-pharma-secondary rounded-full flex-shrink-0"></div>
                <span className="text-light-primary font-medium">{capability}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Validation Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-bg relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-light-primary mb-6">
              Excel Validation Process
            </h2>
            <p className="text-xl text-light-secondary max-w-3xl mx-auto">
              Our systematic 6-step approach ensures comprehensive Excel spreadsheet validation with complete regulatory compliance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {validationProcess.map((step, index) => (
              <GxpCardExpand
                key={index}
                delay={index * 0.1}
              >
                <div 
                  className="p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors duration-300"
                  onClick={() => handleStepClick(step)}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-pharma-primary to-pharma-secondary rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
                    {step.icon}
                  </div>
                  <div className="text-sm font-semibold text-pharma-primary bg-pharma-primary/10 px-3 py-1 rounded-full inline-block mb-4">
                    Step {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-light-primary mb-4">
                    {step.title}
                  </h3>
                </div>
              </GxpCardExpand>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pharma-primary to-blue-800 text-white relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to Validate Your Excel Applications?
          </motion.h2>

          <motion.p
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Let our experts ensure your Excel spreadsheets meet pharmaceutical regulatory requirements and maintain data integrity
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              className="px-8 py-3 bg-white text-pharma-secondary rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/enroll'}
            >
              Get Excel Validation Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Step Popup */}
      {showStepPopup && selectedStep && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseStepPopup}
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
                <div className="w-12 h-12 bg-pharma-primary text-white rounded-xl flex items-center justify-center text-lg font-bold">
                  {selectedStep.step}
                </div>
                <div>
                  <div className="text-sm font-semibold text-pharma-primary bg-pharma-primary/10 px-3 py-1 rounded-full inline-block mb-2">
                    Step {selectedStep.step}
                  </div>
                  <h3 className="text-2xl font-bold text-light-primary">{selectedStep.title}</h3>
                </div>
              </div>
              <button
                onClick={handleCloseStepPopup}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-light-secondary leading-relaxed mb-6">{selectedStep.description}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
