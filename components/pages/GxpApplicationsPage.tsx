import { motion } from "framer-motion";
import { Code, Shield } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LearningLadder } from "../animations/LearningLadder";
import { FloatingHexGrid } from "../animations/EnhancedAnimations";
import ManagementModules from "./ManagementModules";

export function GxpApplicationsPage() {
  return (
    <div className="min-h-screen bg-light-bg relative">
      <LearningLadder />
      <FloatingHexGrid />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pharma-secondary to-green-700 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Service Badge */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 font-semibold">GxP Compliance</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                  GxP Applications
                </h1>
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                  Comprehensive GxP application development and validation services ensuring regulatory compliance and data integrity for pharmaceutical systems and critical business processes.
                </p>
              </div>

            </motion.div>

            {/* Image Column */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Software Development"
                  className="w-full h-80 object-cover"
                  fallbackType="engineering"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pharma-secondary/30 to-transparent" />
              </div>

              {/* Floating Icons */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl"
                initial={{ opacity: 0, scale: 0.5, rotate: -360 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, type: "spring" }}
              >
                <Code className="w-8 h-8 text-pharma-secondary" />
              </motion.div>

              <motion.div
                className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl"
                initial={{ opacity: 0, scale: 0.5, rotate: 360 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.5, type: "spring" }}
              >
                <Shield className="w-8 h-8 text-pharma-primary" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Q-Docx Hero Section above Management Modules */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none mb-6">
            <span className="block">Audit‑Ready.</span>
            <span className="block text-blue-600 mt-2">Pharma‑Perfect.</span>
            <span className="block mt-2">Q‑Docx</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The complete GxP Document Management System designed for pharmaceutical compliance. Streamline your document workflows with enterprise-grade security and regulatory compliance.
          </p>
        </div>
      </section>
      <ManagementModules />
    </div>
  );
}