import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Monitor, Play, Users, Target, ArrowRight, Clock, Award, BookOpen, Tablet, Headphones, Shield, TrendingUp, X } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LearningLadder } from "../animations/EnhancedAnimations";
import { useRef, useState, useEffect } from "react";
import { Service } from "../../types";
import { VideoPlayer } from "../ui/VideoPlayer";

// DigitalLearningBackground Component
function DigitalLearningBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Digital Learning Platform - scrolls up faster */}
      <motion.div
        className="absolute top-0 right-0 w-2/3 h-96 opacity-4"
        style={{ y: y1 }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbGVhcm5pbmclMjBvbmxpbmUlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NTU1Mjk3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Digital Learning Background"
          className="w-full h-full object-cover rounded-3xl"
          fallbackType="training"
        />
      </motion.div>

      {/* Online Training Session - scrolls down */}
      <motion.div
        className="absolute bottom-20 left-0 w-1/2 h-80 opacity-3"
        style={{ y: y2 }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdHJhaW5pbmclMjBzZW1pbmFyfGVufDF8fHx8MTc1NTUyOTc0MXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Online Training Session"
          className="w-full h-full object-cover rounded-2xl"
          fallbackType="training"
        />
      </motion.div>

      {/* Professional Certification - scrolls up with rotation */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-1/3 h-64 opacity-5"
        style={{ y: y3 }}
        animate={{
          rotate: [0, 3, -3, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjZXJ0aWZpY2F0aW9uJTIwZGlwbG9tYXxlbnwxfHx8fDE3NTU1Mjk3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Professional Certification"
          className="w-full h-full object-cover rounded-xl"
          fallbackType="training"
        />
      </motion.div>

      {/* Training Classroom - floating animation */}
      <motion.div
        className="absolute top-2/3 left-1/3 w-1/4 h-48 opacity-4"
        animate={{
          y: [0, -20, 0],
          opacity: [0.04, 0.08, 0.04]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHRyYWluaW5nJTIwY2VydGlmaWNhdGlvbiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NTU1Mjk3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Training Classroom"
          className="w-full h-full object-cover rounded-lg"
          fallbackType="training"
        />
      </motion.div>

      {/* Animated tech elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-pharma-primary/10 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-pharma-secondary/10 rounded-lg"
        animate={{
          rotate: [0, 180, 360],
          y: [0, -15, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ModuleCard Component
interface ModuleCardProps {
  module: {
    id?: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    category: string;
    duration: string;
    level: string;
    description: string;
    topics: string[];
    videoSrc?: string;
    videoPoster?: string;
  };
  index: number;
  delay?: number;
  activeVideoId?: string | null;
  onVideoPlay?: (videoId: string) => void;
  onVideoPause?: () => void;
  onClick: (service: Service) => void;
}

function ModuleCard({ module, delay = 0, activeVideoId, onVideoPlay, onVideoPause, onClick }: ModuleCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isActiveVideo = activeVideoId === module.id;

  // Pause video when another video becomes active
  useEffect(() => {
    if (videoRef.current && !isActiveVideo && activeVideoId !== null) {
      videoRef.current.pause();
    }
  }, [activeVideoId, isActiveVideo]);


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
      className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-pharma-primary/20 h-full flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group"
      whileHover={{
        scale: 1.02,
        y: -8,
        boxShadow: "0 25px 50px rgba(30, 64, 175, 0.15)"
      }}
      onClick={() => onClick(module)}
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

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Module icon - Centered */}
        <motion.div
          className="w-14 h-14 bg-gradient-to-br from-pharma-primary to-pharma-secondary rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-all duration-300 shadow-md"
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
        >
          <div className="scale-75">
            <module.icon className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Category - Centered */}
        <span className="relative z-10 text-xs text-pharma-primary bg-pharma-primary/10 px-3 py-1 rounded-full font-semibold mb-4">
          {module.category}
        </span>

        {/* Module title - Centered */}
        <motion.h3
          className="relative z-10 text-xl font-bold text-light-primary group-hover:text-pharma-primary transition-colors text-center mb-2"
          whileHover={{ scale: 1.05 }}
        >
          {module.title}
        </motion.h3>


        {/* Module details */}
        <div className="flex items-center justify-between text-xs text-light-secondary mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{module.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{module.level}</span>
          </div>
        </div>

        {/* Animated topic tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {module.topics.map((topic, idx) => (
            <motion.span
              key={idx}
              className="px-2 py-1 bg-light-tag text-light-secondary text-xs rounded-full border border-light-border group-hover:border-pharma-primary/30 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + idx * 0.05 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(30, 64, 175, 0.1)"
              }}
            >
              {topic}
            </motion.span>
          ))}
        </div>

        {/* Video Section for Video-Based Modules */}
        {module.category === "Video-Based" && module.videoSrc && showVideo && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="relative">
              <VideoPlayer
                src={module.videoSrc}
                title={`${module.title} - Training Video`}
                className="w-full h-48 md:h-64 rounded-lg shadow-lg"
                controls={true}
                muted={true}
                onPlay={() => module.id && onVideoPlay?.(module.id)}
                onPause={() => onVideoPause?.()}
              />
              {/* Video overlay badge */}
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                VIDEO
              </div>
            </div>
          </motion.div>
        )}

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

export function DigitalTrainingPage() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedService(null);
  };

  const handleVideoClick = (moduleId: string) => {
    setFullscreenVideo(moduleId);
    setActiveVideoId(moduleId);
  };

  const handleCloseFullscreen = () => {
    setFullscreenVideo(null);
    setActiveVideoId(null);
  };

  // 6 training modules as per guide
  const modules = [
    {
      id: "gmp-digital-sop",
      icon: BookOpen,
      title: "GMP Digital SOP",
      category: "Video-Based",
      duration: "45 minutes",
      level: "All Levels",
      description: "Comprehensive video training on Good Manufacturing Practice (GMP) Digital Standard Operating Procedures. This module covers essential GMP principles, digital documentation requirements, and compliance standards for pharmaceutical manufacturing. Learn about proper procedures, documentation practices, and regulatory requirements through detailed video instruction.",
      topics: ["GMP Principles", "Digital Documentation", "SOP Compliance", "Quality Standards"],
      videoSrc: "/videos/GMP-Digital-SOP-Final.mp4",
      previewImage: "/videos/GMP-Digital-SOP-Final.mp4"
    },
    {
      id: "gdp-sop-training",
      icon: Shield,
      title: "GDP SOP Training",
      category: "Video-Based",
      duration: "45 minutes",
      level: "Intermediate",
      description: "Detailed training on Good Distribution Practice (GDP) Standard Operating Procedures. This video module provides comprehensive coverage of distribution practices, supply chain management, and regulatory compliance requirements. Essential for professionals involved in pharmaceutical distribution and logistics.",
      topics: ["GDP Guidelines", "Distribution Practices", "Supply Chain", "Regulatory Compliance"],
      videoSrc: "/videos/GDP-SOP.mp4",
      previewImage: "/videos/GDP-SOP.mp4"
    },
    {
      id: "safety-training",
      icon: Target,
      title: "Safety Training",
      category: "Video-Based",
      duration: "45 minutes",
      level: "All Levels",
      description: "Comprehensive safety training module covering workplace safety, hazard identification, and safety protocols in pharmaceutical environments. This video-based training ensures all personnel understand safety requirements and best practices for maintaining a safe working environment.",
      topics: ["Workplace Safety", "Hazard Identification", "Safety Protocols", "Emergency Procedures"],
      videoSrc: "/videos/Safety.mp4",
      previewImage: "/videos/Safety.mp4"
    },
    {
      id: "gmp-fundamentals",
      icon: Shield,
      title: "GMP Fundamentals",
      category: "Interactive",
      duration: "2 hours",
      level: "Beginner",
      description: "This interactive course provides a solid introduction to Good Manufacturing Practices (GMP), designed especially for professionals who are new to the pharmaceutical and life sciences industry. Through scenario-based exercises and interactive assessments, learners will understand the core principles of GMP, the role of documentation in ensuring product quality, and the importance of compliance in day-to-day operations. The module also highlights real-world examples of GMP violations and their consequences, helping participants appreciate why adherence to regulatory standards is critical.",
      topics: ["GMP Principles", "Documentation", "Quality Systems", "Regulatory Compliance"]
    },
    {
      id: "data-integrity",
      icon: Shield,
      title: "Data Integrity",
      category: "Simulation",
      duration: "1.5 hours",
      level: "Advanced",
      description: "Designed for advanced learners, this simulation-based module provides hands-on training in data integrity compliance. It delves into the ALCOA+ principles (Attributable, Legible, Contemporaneous, Original, Accurate, and beyond) and their application to electronic records and audit trails. Participants will work through real-world simulation exercises where they identify, assess, and remediate potential data integrity breaches. The module also highlights global regulatory expectations from FDA, EMA, and MHRA, making it an essential course for professionals responsible for ensuring the reliability and trustworthiness of pharmaceutical data.",
      topics: ["ALCOA+ Principles", "Electronic Records", "Audit Trails", "Regulatory Expectations"]
    },
    {
      id: "regulatory-updates",
      icon: TrendingUp,
      title: "Regulatory Updates",
      category: "Interactive",
      duration: "1 hour",
      level: "All Levels",
      description: "The regulatory landscape is constantly evolving, and staying updated is vital for compliance. This interactive module delivers the latest updates from FDA, EMA, ICH, and other key regulatory authorities, presented in a clear and practical format. Participants will explore recent changes in guidelines, industry best practices, and case studies highlighting compliance challenges faced by organizations. The course is suitable for all levels, from beginners to experienced professionals, providing insights that can be immediately applied to maintain compliance and improve operational readiness.",
      topics: ["FDA Updates", "EMA Guidelines", "ICH Standards", "Industry Trends"]
    },
    {
      id: "quality-management",
      icon: Award,
      title: "Quality Management",
      category: "Case Study",
      duration: "2.5 hours",
      level: "Intermediate",
      description: "This case study-driven module provides a deep dive into Quality Management Systems (QMS) and their role in ensuring pharmaceutical product safety and efficacy. Learners will examine real-world scenarios where QMS implementation, CAPA systems (Corrective and Preventive Actions), and risk management strategies were applied to solve quality challenges. Through interactive problem-solving exercises, participants will develop practical skills to design, implement, and continuously improve quality management processes in line with ICH Q10 guidelines.",
      topics: ["QMS Implementation", "CAPA Systems", "Risk Management", "ICH Q10 Guidelines"]
    },
  ];

  // 4 platform features as per guide
  const platformFeatures = [
    {
      feature: "Digital",
      subtitle: "Interactive Learning",
      icon: Monitor,
      background: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300",
      overlay: "bg-pharma-primary/85"
    },
    {
      feature: "Certified",
      subtitle: "Industry Recognition",
      icon: Award,
      background: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300",
      overlay: "bg-pharma-secondary/85"
    },
    {
      feature: "Flexible",
      subtitle: "Self-Paced Learning",
      icon: Clock,
      background: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300",
      overlay: "bg-blue-600/85"
    },
    {
      feature: "Expert",
      subtitle: "Content Creators",
      icon: Target,
      background: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=300",
      overlay: "bg-green-600/85"
    }
  ];

  // 2 digital learning features (removed crossed-out ones)
  const digitalFeatures = [
    {
      icon: Tablet,
      title: "Interactive Content",
      description: "Engaging multimedia content with simulations and assessments"
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Get help from industry experts through integrated chat support"
    }
  ];

  return (
    <div className="min-h-screen bg-light-bg relative overflow-hidden">
      <LearningLadder />
      <DigitalLearningBackground />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-pharma-primary to-blue-800 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content Column */}
            <div className="space-y-8">
              {/* Service Badge */}
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white/80 font-semibold">Digital Learning Platform</span>
                  <span className="text-white/60 text-sm">Interactive Training Modules</span>
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
                  Digital Training Modules
                </motion.h1>
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                  Experience the future of pharmaceutical education with our interactive digital training modules. Learn at your own pace with cutting-edge technology and expert-designed content.
                </p>
              </motion.div>

            </div>

            {/* Platform Features Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {platformFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative rounded-2xl overflow-hidden h-32 flex items-center justify-center text-center"
                  style={{
                    backgroundImage: `url(${feature.background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  <div className={`absolute inset-0 ${feature.overlay}`}></div>
                  <div className="relative z-10">
                    <feature.icon className="w-8 h-8 text-white mx-auto mb-2" />
                    <div className="text-lg font-bold text-white mb-1">{feature.feature}</div>
                    <div className="text-xs text-white/90">{feature.subtitle}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Training Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-light-text mb-6">
              Professional Video Training
            </h2>
            <p className="text-xl text-light-secondary max-w-3xl mx-auto mb-12">
              Access our comprehensive video training library featuring GMP, GDP, and Safety training modules with professional content and interactive controls.
            </p>
          </motion.div>

          {/* Three Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {modules.filter(module => module.category === "Video-Based").map((module, index) => (
              <motion.div
                key={module.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-light-border group relative overflow-hidden cursor-pointer transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(30, 64, 175, 0.15)"
                }}
                onClick={() => handleVideoClick(module.id)}
              >
                {/* Module Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pharma-primary to-blue-600 rounded-xl flex items-center justify-center text-white">
                      <module.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-light-text">{module.title}</h3>
                      <p className="text-sm text-light-secondary">{module.duration} • {module.level}</p>
                    </div>
                  </div>
                </div>

                {/* Video Preview */}
                <div className="mb-4 relative">
                  <div 
                    className="w-full h-48 rounded-lg shadow-lg bg-gray-900 flex items-center justify-center cursor-pointer group relative overflow-hidden"
                    onClick={() => handleVideoClick(module.id)}
                  >
                    {/* Video Thumbnail */}
                    <video 
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                      poster={module.videoSrc}
                      onLoadedMetadata={(e) => {
                        const video = e.currentTarget;
                        video.currentTime = 1; // Go to 1 second for thumbnail
                      }}
                    >
                      <source src={module.videoSrc} type="video/mp4" />
                    </video>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    
                    {/* Video Badge */}
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      VIDEO
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-light-secondary mb-4 line-clamp-3">
                  {module.description}
                </p>

                {/* Click to play hint */}
                <div className="text-center text-sm text-light-secondary mb-2">
                  Click to play fullscreen
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {module.topics.slice(0, 3).map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-light-tag text-light-secondary text-xs rounded-full border border-light-border"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Training Modules Section */}
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
              Interactive Training Modules
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Explore our comprehensive library of digital training modules designed for pharmaceutical professionals at every career stage.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.filter(module => module.category !== "Video-Based").map((module, index) => (
              <ModuleCard
                key={index}
                module={module}
                index={index}
                delay={index * 0.1}
                activeVideoId={activeVideoId}
                onClick={handleServiceClick}
                onVideoPlay={setActiveVideoId}
                onVideoPause={() => setActiveVideoId(null)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
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
              Platform Features
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Experience learning like never before with our advanced digital training platform
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {digitalFeatures.map((feature, index) => (
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
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-pharma-primary to-pharma-secondary rounded-2xl flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
                  whileHover={{
                    rotate: 360,
                    boxShadow: "0 15px 35px rgba(30, 64, 175, 0.4)"
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-lg font-bold text-light-primary mb-3 group-hover:text-pharma-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-light-secondary text-sm leading-relaxed">
                  {feature.description}
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
            Ready to Transform Your Learning Experience?
          </motion.h2>

          <motion.p
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Join thousands of pharmaceutical professionals advancing their careers through digital training
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

      {/* Fullscreen Video Modal */}
      {fullscreenVideo && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseFullscreen}
        >
          <motion.div
            className="relative w-full h-full max-w-7xl max-h-[90vh] m-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseFullscreen}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Fullscreen Video Player */}
            <VideoPlayer
              src={modules.find(m => m.id === fullscreenVideo)?.videoSrc || ""}
              title={`${modules.find(m => m.id === fullscreenVideo)?.title} - Training Video`}
              className="w-full h-full rounded-lg"
              controls={true}
              muted={false}
              autoplay={true}
              onPlay={() => setActiveVideoId(fullscreenVideo)}
              onPause={() => setActiveVideoId(null)}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}