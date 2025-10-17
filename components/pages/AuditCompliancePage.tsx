import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertTriangle, FileCheck, Users, Target, ArrowRight, Award, Clock, Zap, X } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LearningLadder } from "../animations/EnhancedAnimations";
import { useState } from "react";

// Service type definition
interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Floating Compliance Icon Component
function FloatingComplianceIcon({ icon: Icon, delay = 0, className = "" }: {
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute ${className} pointer-events-none`}
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.5,
        rotate: -180,
      }}
      animate={{
        opacity: 0.8,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.2,
        rotate: 360,
        opacity: 1,
        transition: { duration: 0.3 },
      }}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-300/30 rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-red-600" />
      </div>
    </motion.div>
  );
}

// Sequential Checklist Component
function SequentialChecklist({ items, delay = 0 }: { items: string[]; delay?: number }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
          initial={{ opacity: 0, x: -30, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.15,
            ease: "easeOut",
          }}
          whileHover={{ scale: 1.02, x: 5 }}
        >
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-800">{item}</span>
        </motion.div>
      ))}
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
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center text-white">
              <service.icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-light-primary">{service.title}</h3>
              <div className="w-12 h-1 bg-red-500 rounded-full mt-2"></div>
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
            className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
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

export function AuditCompliancePage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedService(null);
  };

  // 8 compliance checklist items as per guide
  const complianceChecklist = [
    "21 CFR Part 11 Electronic Records",
    "Data Integrity (ALCOA+)",
    "Computer System Validation",
    "Audit Trail Management",
    "Change Control Procedures",
    "Risk Assessment Protocols",
    "Deviation Management",
    "Training & Documentation"
  ];

  // 6 audit services as per guide
  const auditServices = [
    {
      title: "Pre-Audit Assessments",
      description: "Before a regulatory inspection takes place, organizations must ensure they are fully prepared. Our pre-audit assessments provide a detailed readiness evaluation, reviewing systems, documentation, and processes against compliance requirements. This proactive step helps identify weaknesses, strengthen documentation, and reduce the risk of non-conformities during official audits.",
      icon: FileCheck
    },
    {
      title: "Gap Analysis & Remediation",
      description: "Through gap analysis, we identify areas where existing processes or documentation fall short of regulatory expectations. Once gaps are identified, we work closely with your team to implement corrective and preventive actions, ensuring compliance frameworks are robust and future-ready. This service helps minimize regulatory risks and enhances overall audit preparedness.",
      icon: Target
    },
    {
      title: "Mock Audit Simulations",
      description: "Mock audits provide a valuable opportunity to prepare teams for real inspections. We simulate regulatory audit conditions, evaluating staff readiness, documentation accuracy, and process consistency. These practice sessions not only build confidence but also highlight areas for improvement, ensuring smoother performance during actual regulatory reviews.",
      icon: Users
    },
    {
      title: "Continuous Compliance Monitoring",
      description: "Regulatory compliance is not a one-time effort but an ongoing commitment. Our continuous monitoring services provide routine checks, process surveillance, and compliance tracking to ensure organizations maintain high standards consistently. By identifying issues early, we help prevent costly non-compliances and maintain operational integrity.",
      icon: Clock
    },
    {
      title: "Regulatory Intelligence",
      description: "The regulatory landscape is constantly evolving, with new guidelines and requirements introduced frequently. Our regulatory intelligence services keep organizations informed of changes and industry best practices, allowing timely updates to internal systems. This ensures businesses remain compliant while adapting smoothly to new expectations.",
      icon: Zap
    },
    {
      title: "Audit Response Support",
      description: "Even with preparation, regulatory inspections can present challenges. Our audit response support provides expert assistance during and after audits, helping address regulator queries, provide additional documentation, and implement corrective actions where needed. This ensures a professional, effective, and timely response to regulatory bodies.",
      icon: Award
    }
  ];


  // Compliant organization characteristics as per guide
  const compliantOrganization = {
    title: "Compliant Organization",
    keyCharacteristics: [
      "Proactive compliance monitoring",
      "Well-documented procedures",
      "Regular internal audits",
      "Trained compliance team",
      "Risk-based approach",
      "Continuous improvement culture"
    ],
    businessOutcomes: [
      "Successful regulatory inspections",
      "Reduced compliance risks",
      "Faster product approvals",
      "Enhanced reputation",
      "Lower operational costs"
    ]
  };

  // Non-compliant organization characteristics as per guide
  const nonCompliantOrganization = {
    title: "Non-Compliant Organization",
    keyCharacteristics: [
      "Reactive approach to compliance",
      "Inadequate documentation",
      "Infrequent compliance reviews",
      "Limited compliance expertise",
      "Fragmented processes",
      "Resistance to change"
    ],
    businessOutcomes: [
      "Regulatory enforcement actions",
      "Product recalls or delays",
      "Warning letters or fines",
      "Damaged reputation",
      "Increased operational costs"
    ]
  };

  return (
    <div className="bg-light-bg min-h-screen relative overflow-hidden">
      {/* Universal page transition */}
      <LearningLadder />

      {/* Floating Compliance Icons */}
      <FloatingComplianceIcon icon={Shield} delay={0.5} className="top-20 left-10" />
      <FloatingComplianceIcon icon={FileCheck} delay={1} className="top-40 right-20" />
      <FloatingComplianceIcon icon={AlertTriangle} delay={1.5} className="top-60 left-1/4" />
      <FloatingComplianceIcon icon={Target} delay={2} className="bottom-40 right-10" />
      <FloatingComplianceIcon icon={Users} delay={2.5} className="bottom-60 left-20" />
      <FloatingComplianceIcon icon={Award} delay={3} className="top-80 right-1/3" />

      {/* Hero Section */}
      <section className="py-16 lg:py-20 pt-20 relative z-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1636973879067-9404573bdc78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWRpdCUyMGFuZCUyMGNvbXBsaWFuY2UlMjBwaGFybWFjZXV0aWNhbHxlbnwxfHx8fDE3NTU1Mjk3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Professional pharmaceutical compliance office environment"
            className="w-full h-full object-cover"
            fallbackType="compliance"
          />
          <div className="absolute inset-0 bg-white/85" />
        </div>

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
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-red-600 font-semibold">Regulatory Excellence</span>
                  <span className="text-light-secondary text-sm">Audit & Compliance</span>
                </div>
              </motion.div>

              {/* Main Headlines */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-light-primary leading-tight">
                  Pharma Audit &
                  <span className="block text-red-600">Compliance</span>
                </h1>
                <p className="text-lg text-light-secondary leading-relaxed max-w-2xl">
                  Ensure regulatory readiness with comprehensive audit preparation, compliance monitoring, and risk management services designed for pharmaceutical excellence.
                </p>
              </motion.div>


              {/* Compliance Readiness Assessment Checklist */}
              <motion.div
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-red-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-lg font-bold text-light-primary mb-4">Compliance Readiness Assessment</h3>
                <SequentialChecklist items={complianceChecklist} delay={1} />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Comprehensive Audit & Compliance Services Section */}
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
              Comprehensive Audit & Compliance Services
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Our systematic approach ensures your organization maintains the highest standards of pharmaceutical compliance and regulatory readiness.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {auditServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-red-500/20 h-full flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
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
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.15)",
                }}
                viewport={{ once: true }}
              >
                {/* Gradient Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Accent Lines - Properly aligned to card edges */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-red-500 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-full h-1 bg-orange-600 origin-right"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute top-0 right-0 h-full w-1 bg-red-500 origin-top"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-full w-1 bg-orange-600 origin-bottom"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon Container - Centered */}
                <motion.div 
                  className="relative z-10 w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-all duration-300 shadow-md" 
                  whileHover={{ rotate: 180 }} 
                  transition={{ duration: 0.4 }}
                >
                  <div className="scale-75">
                    <service.icon className="w-7 h-7" />
                  </div>
                </motion.div>

                {/* Title - Centered */}
                <h3 className="relative z-10 text-xl font-bold text-light-primary group-hover:text-red-600 transition-colors duration-300 text-center">
                  {service.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Compliance Advantage Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-light-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              The Compliance Advantage
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              See the dramatic difference between compliant and non-compliant organizations in operational efficiency, regulatory outcomes, and business success.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Compliant Organization */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 border border-green-200"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-800">{compliantOrganization.title}</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-green-800 mb-4">Key Characteristics</h4>
                  <ul className="space-y-3">
                    {compliantOrganization.keyCharacteristics.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-green-700 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-800 mb-4">Business Outcomes</h4>
                  <ul className="space-y-3">
                    {compliantOrganization.businessOutcomes.map((outcome, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        />
                        <span className="text-green-700 text-sm font-medium">{outcome}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Non-Compliant Organization */}
            <motion.div
              className="bg-gradient-to-br from-red-50 to-orange-100 rounded-3xl p-8 border border-red-200"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-red-800">{nonCompliantOrganization.title}</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-red-800 mb-4">Key Characteristics</h4>
                  <ul className="space-y-3">
                    {nonCompliantOrganization.keyCharacteristics.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span className="text-red-700 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-red-800 mb-4">Business Outcomes</h4>
                  <ul className="space-y-3">
                    {nonCompliantOrganization.businessOutcomes.map((outcome, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        />
                        <span className="text-red-700 text-sm font-medium">{outcome}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Contact CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-orange-600 text-white relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to Achieve Regulatory Excellence?
          </motion.h2>

          <motion.p
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Our audit and compliance experts are ready to help ensure your pharmaceutical operations meet all regulatory standards and achieve sustainable compliance excellence.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2"
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
    </div>
  );
}