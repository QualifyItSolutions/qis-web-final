"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Mail, Phone, ArrowRight, User, Building, Calendar, FileText } from "lucide-react";
import { LearningLadder } from "../animations/EnhancedAnimations";
import { submitEnrollmentForm } from "../../lib/supabase";

export function EnrollPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    interests: [] as string[],
    startDate: "",
    notes: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const interestOptions = [
    "Validation & Compliance Training",
    "Regulatory Workshops (FDA, EMA, GxP)",
    "Corporate Consulting / Project Enrollment",
    "Career Development & Individual Training"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitEnrollmentForm({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        role: formData.role,
        interests: formData.interests,
        start_date: formData.startDate,
        notes: formData.notes
      });

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(result.error || 'Failed to submit enrollment');
      }
    } catch (error) {
      console.error('Enrollment submission error:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-light-bg">
        <LearningLadder />
        
        {/* Success Message */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-12 shadow-xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-green-600" />
              </motion.div>
              
              <h1 className="text-4xl font-bold text-light-primary mb-4">
                Enrollment Submitted Successfully!
              </h1>
              
              <p className="text-xl text-light-secondary mb-8">
                Thank you for your interest in Qualify IT Solutions. Our team will contact you within 24–48 hours to confirm enrollment and guide you through the next steps.
              </p>
              
              <motion.button
                onClick={() => window.location.href = '/'}
                className="bg-pharma-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-pharma-primary/90 transition-all duration-300 flex items-center justify-center space-x-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Return to Home</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg">
      <LearningLadder />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pharma-primary to-blue-800 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Enroll with Qualify IT Solutions
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Take the first step toward compliance excellence and operational success. Please complete the form below to begin your enrollment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enrollment Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-light-primary mb-4">
                Enrollment Form
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-light-primary mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-secondary w-5 h-5" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-light-border rounded-xl focus:ring-2 focus:ring-pharma-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-light-primary mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-secondary w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-light-border rounded-xl focus:ring-2 focus:ring-pharma-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-light-primary mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-secondary w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-light-border rounded-xl focus:ring-2 focus:ring-pharma-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-light-primary mb-2">
                    Organization / Company Name *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-secondary w-5 h-5" />
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-light-border rounded-xl focus:ring-2 focus:ring-pharma-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter your organization name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-light-primary mb-2">
                    Role / Designation *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-light-border rounded-xl focus:ring-2 focus:ring-pharma-primary focus:border-transparent transition-all duration-300"
                    placeholder="Enter your role or designation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-light-primary mb-2">
                    Preferred Start Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-secondary w-5 h-5" />
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-light-border rounded-xl focus:ring-2 focus:ring-pharma-primary focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Area of Interest */}
              <div>
                <label className="block text-sm font-semibold text-light-primary mb-4">
                  Area of Interest (Select one or more) *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {interestOptions.map((interest, index) => (
                    <motion.label
                      key={interest}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center space-x-3 p-4 border border-light-border rounded-xl hover:bg-light-bg cursor-pointer transition-all duration-300"
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="w-5 h-5 text-pharma-primary border-light-border rounded focus:ring-pharma-primary"
                      />
                      <span className="text-light-secondary">{interest}</span>
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-semibold text-light-primary mb-2">
                  Additional Notes / Requirements
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-light-secondary w-5 h-5" />
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-light-border rounded-xl focus:ring-2 focus:ring-pharma-primary focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about any specific requirements or additional information..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              {submitError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{submitError}</p>
                </div>
              )}
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pharma-primary text-white py-4 rounded-xl font-semibold hover:bg-pharma-primary/90 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Enroll Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-light-primary mb-6">
              Submit & Next Steps
            </h3>
            <p className="text-lg text-light-secondary mb-8">
              Click Enroll Now to submit your details.
            </p>
            <p className="text-light-secondary mb-8">
              Our team will contact you within 24–48 hours to confirm enrollment, share program details, and guide you through the onboarding process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light-bg">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-light-primary mb-6">
              Need Help?
            </h3>
            <p className="text-lg text-light-secondary mb-6">
              For any enrollment-related queries, contact us at:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-pharma-primary" />
                <span className="text-light-secondary">info@qualifyitsolutions.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-pharma-primary" />
                <span className="text-light-secondary">+91 8019426810</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
