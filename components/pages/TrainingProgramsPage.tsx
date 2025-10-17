import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { BookOpen, Users, Award, Globe, Shield, Monitor, Target, FileText, TrendingUp, Clock, Lightbulb, ArrowRight, X } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LearningLadder } from "../animations/EnhancedAnimations";
import { useRef, useState } from "react";
import { Service } from "../../types";

// TrainingBackgroundElements Component
function TrainingBackgroundElements() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Training Classroom - scrolls up */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-96 opacity-5"
        style={{ y: y1 }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHRyYWluaW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc1NTUyOTc0MXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Training Background"
          className="w-full h-full object-cover rounded-3xl"
          fallbackType="training"
        />
      </motion.div>

      {/* Laboratory Training - scrolls down */}
      <motion.div
        className="absolute bottom-20 left-0 w-1/3 h-80 opacity-4"
        style={{ y: y2 }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwdHJhaW5pbmd8ZW58MXx8fHwxNzU1NTI5NzQxfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Laboratory Training"
          className="w-full h-full object-cover rounded-2xl"
          fallbackType="training"
        />
      </motion.div>

      {/* Professional Certification - scrolls up with rotation */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-1/4 h-64 opacity-6"
        style={{ y: y3 }}
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjZXJ0aWZpY2F0aW9ufGVufDF8fHx8MTc1NTUyOTc0MXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Professional Certification"
          className="w-full h-full object-cover rounded-xl"
          fallbackType="training"
        />
      </motion.div>

      {/* Geometric overlay elements */}
      <motion.div
        className="absolute top-32 left-1/3 w-24 h-24 border-2 border-pharma-primary/10 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute bottom-32 right-1/3 w-16 h-16 bg-pharma-secondary/10 rounded-lg rotate-45"
        animate={{
          rotate: [45, 225, 405],
          y: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ProgramCard Component
interface ProgramCardProps {
  program: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    category: string;
    duration: string;
    format: string;
    description: string;
    topics: string[];
  };
  index: number;
  delay?: number;
  onClick: (service: Service) => void;
}

function ProgramCard({ program, delay = 0, onClick }: ProgramCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{
        delay,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden border-2 border-transparent hover:border-pharma-primary/20 h-full flex flex-col items-center justify-center cursor-pointer group"
      whileHover={{
        scale: 1.02,
        y: -8,
        boxShadow: "0 25px 50px rgba(30, 64, 175, 0.15)"
      }}
      onClick={() => onClick(program)}
    >
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pharma-primary/5 to-pharma-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Accent Lines - Properly aligned to card edges */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-pharma-primary origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-full h-1 bg-pharma-secondary origin-right"
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
        className="absolute bottom-0 left-0 h-full w-1 bg-pharma-secondary origin-bottom"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top section - Icon, Category, Title */}
        <div className="flex flex-col items-center text-center">
          {/* Program icon - Centered */}
          <motion.div
            className="w-14 h-14 bg-gradient-to-br from-pharma-primary to-pharma-secondary rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-all duration-300 shadow-md"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
          >
            <div className="scale-75">
              <program.icon className="w-7 h-7" />
            </div>
          </motion.div>

          {/* Category - Centered */}
          <span className="relative z-10 text-xs text-pharma-primary bg-pharma-primary/10 px-3 py-1 rounded-full font-semibold mb-3">
            {program.category}
          </span>

          {/* Program title - Centered */}
          <motion.h3
            className="relative z-10 text-xl font-bold text-light-primary group-hover:text-pharma-primary transition-colors text-center mb-4"
            whileHover={{ scale: 1.05 }}
          >
            {program.title}
          </motion.h3>

          {/* Program details */}
          <div className="relative z-10 flex items-center justify-center space-x-6 mb-6">
            <div className="flex items-center space-x-2 text-light-secondary">
              <Clock className="w-4 h-4 text-pharma-primary" />
              <span className="text-sm">{program.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-light-secondary">
              <Users className="w-4 h-4 text-pharma-primary" />
              <span className="text-sm">{program.format}</span>
            </div>
          </div>
        </div>

        {/* Bottom section - Topic tags (always at bottom) */}
        <div className="mt-auto">
          {/* Animated topic tags with fixed height */}
          <div className="relative z-10 flex flex-wrap gap-2 justify-center min-h-[60px] items-start">
            {program.topics.slice(0, 3).map((topic, idx) => (
              <motion.span
                key={idx}
                className="bg-pharma-primary/10 text-pharma-primary text-xs font-medium px-3 py-1 rounded-full border border-pharma-primary/20 inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + idx * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(30, 64, 175, 0.15)"
                }}
              >
                {topic}
              </motion.span>
            ))}
          </div>
        </div>


      </div>
    </motion.div>
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
            <div className="w-16 h-16 bg-gradient-to-br from-pharma-primary to-pharma-secondary rounded-2xl flex items-center justify-center text-white">
              <service.icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-light-primary">{service.title}</h3>
              <div className="w-12 h-1 bg-pharma-primary rounded-full mt-2"></div>
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

export function TrainingProgramsPage() {
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

  // 6 training programs as per guide
  const programs = [
    {
      icon: BookOpen,
      title: "GMP Foundation Training",
      category: "Core Compliance",
      duration: "3 Days",
      format: "In-Person",
      description: "A comprehensive introduction to Good Manufacturing Practices (GMP), this program covers the essential regulatory requirements, documentation standards, and quality systems critical for pharmaceutical operations. Designed for professionals at all levels, it provides a solid foundation in compliance principles and prepares participants to effectively contribute to regulated environments.",
      topics: ["GMP Principles", "Documentation", "Quality Systems", "Regulatory Compliance"]
    },
    {
      icon: Shield,
      title: "Data Integrity Masterclass",
      category: "Advanced Compliance",
      duration: "2 Days",
      format: "Hybrid",
      description: "This advanced program delivers in-depth training on data integrity principles, focusing on ALCOA+ concepts, regulatory expectations, and lifecycle data management. Participants gain practical insights into electronic records, audit preparation, and risk-based controls, equipping them to maintain reliable and compliant pharmaceutical data systems.",
      topics: ["ALCOA+ Principles", "Risk Assessment", "Electronic Records", "Audit Preparation"]
    },
    {
      icon: Monitor,
      title: "Computer System Validation Training",
      category: "Technical Training",
      duration: "5 Days",
      format: "In-Person",
      description: "Focused on GAMP 5 guidelines and risk-based validation approaches, this course provides hands-on expertise in planning, executing, and documenting computer system validations. Participants learn how to design and implement validation protocols, address regulatory requirements such as 21 CFR Part 11, and ensure compliance across pharmaceutical IT systems.",
      topics: ["GAMP 5", "Risk Assessment", "Validation Protocols", "21 CFR Part 11"]
    },
    {
      icon: Target,
      title: "Commissioning & Qualification Training",
      category: "Engineering",
      duration: "4 Days",
      format: "In-Person",
      description: "This program provides practical training on CQV methodologies, including equipment qualification (IQ/OQ/PQ) protocols and facility commissioning processes. Participants gain hands-on experience in protocol development, acceptance criteria definition, and risk assessment, enabling them to confidently manage pharmaceutical manufacturing environments.",
      topics: ["IQ/OQ/PQ", "Risk Assessment", "Protocol Development", "Acceptance Criteria"]
    },
    {
      icon: FileText,
      title: "Regulatory Writing Workshop",
      category: "Documentation",
      duration: "3 Days",
      format: "Virtual",
      description: "A focused workshop designed to build expertise in regulatory writing and submission strategies. Participants learn to prepare structured, compliant documents, develop effective submission dossiers, and communicate with regulatory authorities. This training ensures professionals can create high-quality documentation that meets international standards.",
      topics: ["Regulatory Strategy", "Document Structure", "Submission Process", "Agency Interaction"]
    },
    {
      icon: TrendingUp,
      title: "Quality Management Systems Training",
      category: "Management",
      duration: "2 Days",
      format: "Hybrid",
      description: "This course delivers strategic training on the design, implementation, and maintenance of Quality Management Systems (QMS). Covering ICH Q10 guidelines, risk management practices, CAPA systems, and continuous improvement principles, it equips participants with the knowledge to strengthen compliance and enhance operational efficiency.",
      topics: ["ICH Q10", "Risk Management", "CAPA Systems", "Continuous Improvement"]
    }
  ];

  // 4 training benefits as per guide
  const benefits = [
    {
      icon: Award,
      title: "Industry-Recognized Certifications",
      description: "Receive certificates that are valued by pharmaceutical companies worldwide"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from experienced professionals with hands-on industry expertise"
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "Training aligned with international regulatory requirements and best practices"
    },
    {
      icon: Lightbulb,
      title: "Practical Application",
      description: "Real-world case studies and hands-on exercises for immediate implementation"
    }
  ];


  return (
    <div className="min-h-screen bg-light-bg relative overflow-hidden">
      <LearningLadder />
      <TrainingBackgroundElements />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-pharma-primary to-blue-800 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Service Badge */}
            <motion.div
              className="flex items-center justify-center space-x-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/80 font-semibold">Professional Development</span>
                <span className="text-white/60 text-sm">Training Programs</span>
              </div>
            </motion.div>

            {/* Main Headlines */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(255, 255, 255, 0)",
                    "0 0 20px rgba(255, 255, 255, 0.3)",
                    "0 0 0px rgba(255, 255, 255, 0)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Pharmaceutical Training Programs
              </motion.h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
                Comprehensive training programs designed to enhance your expertise in pharmaceutical validation, compliance, and quality management. Build skills that advance your career and ensure regulatory excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Training Programs Section */}
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
              Professional Training Programs
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Choose from our comprehensive range of pharmaceutical training programs designed to meet industry standards and advance your professional development.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <ProgramCard
                key={index}
                program={program}
                index={index}
                delay={index * 0.15}
                onClick={handleServiceClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Training Programs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-light-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              animate={{
                textShadow: [
                  "0 0 0px rgba(30, 64, 175, 0)",
                  "0 0 20px rgba(30, 64, 175, 0.3)",
                  "0 0 0px rgba(30, 64, 175, 0)"
                ]
              }}
            >
              Why Choose Our Training Programs?
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Invest in your professional development with training programs that deliver real-world skills and industry-recognized certifications.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-light-border text-center group h-full flex flex-col"
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
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-pharma-primary to-pharma-secondary rounded-2xl flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
                  whileHover={{
                    rotate: 360,
                    boxShadow: "0 15px 35px rgba(30, 64, 175, 0.4)"
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <benefit.icon className="w-7 h-7" />
                </motion.div>
                <h3 className="text-base font-bold text-light-primary mb-3 group-hover:text-pharma-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-light-secondary leading-relaxed flex-grow flex items-center justify-center text-center min-h-[60px]">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pharma-primary to-blue-800 text-white relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to Advance Your Career?
          </motion.h2>

          <motion.p
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Get started with our comprehensive pharmaceutical training programs and build the skills that advance your career and ensure regulatory excellence.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
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

