import { motion } from "framer-motion";
import { FolderKanban, ArrowRight, CheckCircle, AlertTriangle, TrendingUp, Send, FileCheck, Layers, Users } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LearningLadder } from "../animations/LearningLadder";
import { ProjectProgressBar } from "../animations/ServiceAnimations";

export function ProjectManagementPage() {
  // 6 interconnected project milestones as per guide
  const milestones = [
    { title: "Requirements Gathering", status: "completed", progress: 100, icon: FileCheck },
    { title: "Team Assignment", status: "completed", progress: 100, icon: Users },
    { title: "Risk Assessment", status: "completed", progress: 100, icon: AlertTriangle },
    { title: "Development Phase", status: "active", progress: 65, icon: Layers },
    { title: "Quality Review", status: "pending", progress: 0, icon: CheckCircle },
    { title: "Delivery", status: "pending", progress: 0, icon: TrendingUp }
  ];

  // 5-phase project methodology as per guide
  const roadmapPhases = [
    { phase: "Initiation", duration: "2-4 weeks", status: "completed" },
    { phase: "Planning", duration: "4-6 weeks", status: "completed" },
    { phase: "Execution", duration: "12-24 weeks", status: "active" },
    { phase: "Monitoring", duration: "Ongoing", status: "active" },
    { phase: "Closure", duration: "2-3 weeks", status: "pending" }
  ];

  // Trust indicators for hero section
  const trustIndicators = [
    "FDA-Validated Methodologies",
    "Regulatory Compliance Focus",
    "Pharmaceutical Expertise"
  ];

  return (
    <div className="bg-light-bg min-h-screen">
      <LearningLadder />
      <ProjectProgressBar />
      
      {/* Split-Screen Hero Section */}
      <section className="py-16 lg:py-20 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center min-h-[420px]">
            
            {/* Project Image Column */}
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Detailed pharmaceutical project planning and management workflow"
                  className="w-full h-[280px] md:h-[320px] lg:h-[360px] object-cover"
                  fallbackType="default"
                />
                
              </div>
            </motion.div>

            {/* Project Content Column */}
            <motion.div 
              className="space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Service Badge */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <FolderKanban className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-green-600">Expert Project Leadership</span>
                  <span className="text-sm text-light-secondary">Pharmaceutical Excellence</span>
                </div>
              </div>
              
              {/* Main Headline */}
              <h1 className="text-4xl lg:text-5xl font-bold text-light-primary leading-tight">
                Pharma Project Management
              </h1>
              
              {/* Value Proposition */}
              <p className="text-lg text-light-secondary leading-relaxed">
                Strategic project leadership for pharmaceutical companies, delivering initiatives on time, within budget, and in full compliance with regulatory requirements.
              </p>
              
              {/* Trust Indicators */}
              <div className="space-y-3">
                {trustIndicators.map((indicator, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-light-primary">{indicator}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Button */}
              <div className="flex justify-start pt-2">
                <motion.button 
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/enroll'}
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Milestone Tracker Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-light-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Real-Time Project Monitoring
            </motion.h2>
            <motion.p 
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Interactive project dashboard with real-time progress visualization and milestone tracking
            </motion.p>
          </div>

          {/* Interactive Project Dashboard */}
          <div className="relative bg-white rounded-3xl p-8 shadow-xl overflow-hidden">
            {/* Dashboard Grid Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <pattern id="dashboardGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="9" y="9" width="2" height="2" fill="currentColor" className="text-green-400" />
                    <path d="M0 10 L20 10 M10 0 L10 20" stroke="currentColor" strokeWidth="0.5" className="text-blue-400" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dashboardGrid)" />
              </svg>
            </div>

            {/* Milestone Cards Grid */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 h-full">
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                return (
                  <motion.div
                    key={index}
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-500 ${
                      milestone.status === 'completed' ? 'bg-green-50 border-green-200' :
                      milestone.status === 'active' ? 'bg-blue-50 border-blue-200' :
                      'bg-gray-50 border-gray-200'
                    }`}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    animate={milestone.status === 'active' ? {
                      boxShadow: [
                        "0 4px 20px rgba(59, 130, 246, 0.1)",
                        "0 8px 30px rgba(59, 130, 246, 0.2)",
                        "0 4px 20px rgba(59, 130, 246, 0.1)"
                      ]
                    } : undefined}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.3,
                      type: "spring",
                      stiffness: 100,
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    {/* Status Badge */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 ${
                      milestone.status === 'completed' ? 'bg-green-500' :
                      milestone.status === 'active' ? 'bg-blue-500' :
                      'bg-gray-400'
                    }`}>
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>

                    {/* Milestone Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-light-primary mb-2 sm:mb-3">
                      {milestone.title}
                    </h3>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1.5 sm:mb-2">
                      <motion.div 
                        className={`h-2 rounded-full ${
                          milestone.status === 'completed' ? 'bg-green-500' :
                          milestone.status === 'active' ? 'bg-blue-500' :
                          'bg-gray-400'
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${milestone.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1.5, 
                          delay: index * 0.8 + 0.5,
                          ease: "easeOut"
                        }}
                      />
                    </div>

                    {/* Progress Label */}
                    <div className={`text-xs font-semibold ${
                      milestone.status === 'completed' ? 'text-green-600' :
                      milestone.status === 'active' ? 'text-blue-600' :
                      'text-gray-500'
                    }`}>
                      {milestone.progress}% Complete
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Status Dashboard */}
            <motion.div 
              className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 2 }}
            >
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">3 Completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">1 In Progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-600">2 Pending</span>
                  </div>
                </div>
                <div className="text-right">
                  <motion.div 
                    className="text-lg font-bold text-green-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.5 }}
                  >
                    62% Complete
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Lifecycle Roadmap */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-light-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              5-Phase Project Methodology
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Systematic approach ensuring comprehensive project delivery and regulatory compliance
            </motion.p>
          </div>

          {/* Timeline Visualization */}
          <div className="relative mb-16">
            {/* Timeline Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 z-0"></div>
            <motion.div
              className="absolute top-6 left-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 z-10"
              initial={{ width: 0 }}
              whileInView={{ width: '60%' }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 2, ease: "easeOut" }}
            />

            {/* Phase Circles */}
            <div className="relative z-20 flex justify-between">
              {roadmapPhases.map((phase, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Phase Circle */}
                  <motion.div
                    className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-sm
                      ${phase.status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                        phase.status === 'active' ? 'bg-blue-500 border-blue-500 text-white' :
                        'bg-white border-gray-300 text-gray-500'}`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Phase Label */}
                  <div className="mt-4 text-center">
                    <div className="font-semibold text-light-primary">{phase.phase}</div>
                    <div className="text-sm text-light-secondary">{phase.duration}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Phase Description Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-12">
            {roadmapPhases.map((phase, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl border-2 ${
                  phase.status === 'completed' ? 'bg-green-50 border-green-200' :
                  phase.status === 'active' ? 'bg-blue-50 border-blue-200' :
                  'bg-gray-50 border-gray-200'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h4 className="font-bold text-light-primary mb-2">{phase.phase}</h4>
                <p className="text-sm text-light-secondary">
                  {phase.status === 'completed' ? 'Successfully completed phase with all deliverables met.' :
                   phase.status === 'active' ? 'Currently in progress with ongoing monitoring and execution.' :
                   'Planned phase with defined scope and timeline.'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Contact Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl font-bold text-light-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Start Your Project Today
            </motion.h2>
            <motion.p
              className="text-xl text-light-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Get expert pharmaceutical project management consultation and strategic leadership for your next initiative
            </motion.p>
          </div>

          <motion.div
            className="bg-white rounded-3xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-light-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-light-primary mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-primary mb-2">
                    Project Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300">
                    <option>Select project type</option>
                    <option>Pharmaceutical Facility</option>
                    <option>Validation & Compliance</option>
                    <option>Software Implementation</option>
                    <option>Process Improvement</option>
                    <option>Regulatory Compliance</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-light-primary mb-2">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Please describe your project requirements, timeline, and any specific challenges..."
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  type="submit"
                  className="flex-1 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  Request Consultation
                </motion.button>
                <motion.button
                  type="button"
                  className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Schedule Call
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
