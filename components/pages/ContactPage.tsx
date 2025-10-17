import React, { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Globe, Shield, Zap, Star, User, Building, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { LearningLadder } from "../animations/EnhancedAnimations";
import { submitContactForm } from "../../lib/supabase";

// ScrollProgressIndicator Component
function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pharma-primary via-green-500 to-blue-600 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// ParallaxElements Component
function ParallaxElements() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 200]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 8 floating particles with staggered animations */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-white/20 rounded-full"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Additional geometric shapes */}
      <motion.div
        className="absolute top-20 right-20 w-24 h-24 border-2 border-white/20 rounded-full"
        style={{ y: y1, rotate }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-16 h-16 bg-white/10 rounded-lg"
        style={{ y: y2 }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// AnimatedFormField Component
interface AnimatedFormFieldProps {
  children: React.ReactNode;
  delay?: number;
}

function AnimatedFormField({ children, delay = 0 }: AnimatedFormFieldProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30, rotateY: -15 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : undefined}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
    >
      {children}
    </motion.div>
  );
}

// FloatingContactCard Component
interface FloatingContactCardProps {
  children: React.ReactNode;
  index: number;
  delay?: number;
}

function FloatingContactCard({ children, index, delay = 0 }: FloatingContactCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      whileHover={{
        y: -8,
        scale: 1.02,
        rotateY: index % 2 === 0 ? 5 : -5
      }}
      transition={{
        delay,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-light-border"
    >
      {children}
    </motion.div>
  );
}

export function ContactPage() {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Benefits showcase (3 benefits) as per guide
  const benefits = [
    {
      icon: Zap,
      title: "24-hour response guarantee",
      description: "We commit to responding to all inquiries within 24 hours"
    },
    {
      icon: Shield,
      title: "Regulatory compliance expertise",
      description: "Expert knowledge in pharmaceutical regulations and standards"
    },
    {
      icon: Star,
      title: "Local support, global standards",
      description: "Local presence with international pharmaceutical expertise"
    }
  ];

  // Service options (6 services) as per guide
  const serviceOptions = [
    "Computer System Validation (CSV)",
    "Commissioning & Qualification (CQV)",
    "Excel Sheet Validation",
    "Pharmaceutical Training",
    "Data Logger Supplies",
    "General Inquiry"
  ];

  // Contact details (4 sections) as per guide
  const contactDetails = [
    {
      icon: MapPin,
      title: "Office Address",
      details: [
        "QUALIFY IT SOLUTIONS",
        "H No: 1-123/C/4, Sayanna Mansion, 5th floor",
        "Beside SR Digi School, Kolan Narayana Reddy Colony",
        "Venkatraya Nagar, Nizampet, HYDERABAD-500090, INDIA"
      ]
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "+91 8019426810",
        "+91 8019426812"
      ]
    },
    {
      icon: Mail,
      title: "Email Address",
      details: [
        "info@qualifyitsolutions.com"
      ]
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        "Mon-Sat: 9:00 AM - 6:00 PM",
        "Sunday: Closed"
      ]
    }
  ];

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const result = await submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        service: formData.service || 'General Inquiry',
        message: formData.message.trim(),
      });

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');

        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg relative overflow-hidden">
      <ScrollProgressIndicator />
      <LearningLadder />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pharma-primary to-blue-800 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <ParallaxElements />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto">
                Ready to start your pharmaceutical validation project? Our team of CSV & CQV experts is here to help you achieve regulatory compliance with cost-effective solutions.
              </p>
            </motion.div>

            {/* Benefits showcase */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    y: -5
                  }}
                >
                  <benefit.icon className="w-8 h-8 text-white mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-white/80">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form and Details Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-bg relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-light-border">
                <h2 className="text-3xl font-bold text-light-primary mb-6">Send us a Message</h2>
                <p className="text-light-secondary mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatedFormField delay={0.1}>
                      <label className="block text-sm font-medium text-light-primary mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-light-border rounded-xl focus:ring-2 focus:ring-pharma-primary focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </AnimatedFormField>

                    <AnimatedFormField delay={0.2}>
                      <label className="block text-sm font-medium text-light-primary mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-light-border rounded-xl focus:ring-2 focus:ring-pharma-primary focus:border-transparent transition-all duration-300"
                        placeholder="your.email@company.com"
                      />
                    </AnimatedFormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatedFormField delay={0.3}>
                      <label className="block text-sm font-medium text-light-primary mb-2">
                        <Building className="w-4 h-4 inline mr-2" />
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-light-border rounded-xl focus:ring-2 focus:ring-pharma-primary focus:border-transparent transition-all duration-300"
                        placeholder="Your company name"
                      />
                    </AnimatedFormField>

                    <AnimatedFormField delay={0.4}>
                      <label className="block text-sm font-medium text-light-primary mb-2">
                        <Globe className="w-4 h-4 inline mr-2" />
                        Service Interest
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-light-border rounded-xl focus:ring-2 focus:ring-pharma-primary focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </AnimatedFormField>
                  </div>

                  <AnimatedFormField delay={0.5}>
                    <label className="block text-sm font-medium text-light-primary mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-light-border rounded-xl focus:ring-2 focus:ring-pharma-primary focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your project requirements..."
                    />
                  </AnimatedFormField>

                  <AnimatedFormField delay={0.6}>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : submitStatus === 'success'
                          ? 'bg-green-600 hover:bg-green-700'
                          : submitStatus === 'error'
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-pharma-primary hover:bg-pharma-primary/90'
                      } text-white`}
                      whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : submitStatus === 'success' ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>Message Sent!</span>
                        </>
                      ) : submitStatus === 'error' ? (
                        <>
                          <AlertCircle className="w-5 h-5" />
                          <span>Try Again</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>

                    {/* Status Message */}
                    {submitMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 p-4 rounded-xl text-sm ${
                          submitStatus === 'success'
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {submitStatus === 'success' ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          )}
                          <span>{submitMessage}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatedFormField>
                </form>
              </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-light-primary mb-6">Get in Touch</h2>
                <p className="text-light-secondary text-lg mb-8">
                  We&apos;re here to help with your pharmaceutical validation needs. Contact us through any of the following methods.
                </p>
              </div>

              {contactDetails.map((detail, index) => (
                <FloatingContactCard key={index} index={index} delay={0.1 * index}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pharma-primary to-pharma-secondary rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <detail.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-light-primary mb-3">{detail.title}</h3>
                      <div className="space-y-1">
                        {detail.details.map((item, idx) => (
                          <p key={idx} className="text-light-secondary">{item}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </FloatingContactCard>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}