import { useState, useEffect } from "react";
import {
  Wrench,
  Code,
  Briefcase,
  Shield,
  CheckSquare,
  GraduationCap,
  Monitor,
  Menu,
  X,
  Download,
  ChevronDown,
  User,
  LogOut
} from "lucide-react";
import { downloadBrochure } from "../lib/supabase";
import { LandingPage } from "./pages/LandingPage";
import { PharmaEngineeringPage } from "./pages/PharmaEngineeringPage";
import { GxpApplicationsPage } from "./pages/GxpApplicationsPage";
import { ExcelValidationPage } from "./pages/ExcelValidationPage";
import { ProjectManagementPage } from "./pages/ProjectManagementPage";
import { AuditCompliancePage } from "./pages/AuditCompliancePage";
import { SoftwareValidationPage } from "./pages/SoftwareValidationPage";
import { TrainingProgramsPage } from "./pages/TrainingProgramsPage";
import { DigitalTrainingPage } from "./pages/DigitalTrainingPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { EnrollPage } from "./pages/EnrollPage";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../lib/auth-context";
import { AuthModal } from "./auth/AuthModal";
// Updated to use existing logo.png file (QIS Logo) with cache busting
// Force browser to reload new logo by adding timestamp
const logoVersion = '20250122_v3_new'; // Update this when logo changes
const qualifyLogoUrl = `/logo.png?v=${logoVersion}&t=${Date.now()}`;

const services = [
  { icon: Wrench, label: "Pharma Engineering", page: "pharma-engineering" },
  { icon: Code, label: "GxP Applications", page: "gxp-applications" },
  { icon: CheckSquare, label: "Excel Validation", page: "excel-validation" },
  { icon: Briefcase, label: "Project Management", page: "project-management" },
  { icon: Shield, label: "Audit & Compliance", page: "audit-compliance" },
  { icon: CheckSquare, label: "Software Validation", page: "software-validation" },
  { icon: GraduationCap, label: "Training Programs", page: "training-programs" },
  { icon: Monitor, label: "Digital Training", page: "digital-training" },
];



export function QualifyWebsite() {
  // Always start with 'home' to prevent hydration mismatch
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Authentication
  const { user, signOut } = useAuth();

  // Initialize client state and sync with URL after hydration
  useEffect(() => {
    setIsClient(true);
    
    // Only update page state after client hydration is complete
    const path = window.location.pathname.slice(1);
    const pathToPage: { [key: string]: string } = {
      'software-validation': 'software-validation',
      'pharma-engineering': 'pharma-engineering',
      'gxp-applications': 'gxp-applications',
      'excel-validation': 'excel-validation',
      'project-management': 'project-management',
      'audit-compliance': 'audit-compliance',
      'training-programs': 'training-programs',
      'regulatory-support': 'regulatory-support',
      'digital-training': 'digital-training',
      'about': 'about',
      'contact': 'contact',
      'enroll': 'enroll'
    };
    
    if (path && pathToPage[path]) {
      setActivePage(pathToPage[path]);
    }
    
    setIsInitialized(true);
  }, []);

  // Auto-scroll to top when page changes
  useEffect(() => {
    if (isClient) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [activePage, isClient]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector('[data-services-dropdown]');
      const button = document.querySelector('[data-services-button]');
      
      if (dropdown && button && 
          !dropdown.contains(event.target as Node) && 
          !button.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    if (!isClient) return;
    
    const handlePopState = () => {
      const path = window.location.pathname.slice(1);
      if (path && path !== activePage) {
        const pathToPage: { [key: string]: string } = {
          'software-validation': 'software-validation',
          'pharma-engineering': 'pharma-engineering',
          'gxp-applications': 'gxp-applications',
          'project-management': 'project-management',
          'audit-compliance': 'audit-compliance',
          'training-programs': 'training-programs',
          'regulatory-support': 'regulatory-support',
          'digital-training': 'digital-training',
          'about': 'about',
          'contact': 'contact'
        };
        
        if (pathToPage[path]) {
          setActivePage(pathToPage[path]);
        } else {
          setActivePage('home');
        }
      } else if (!path) {
        setActivePage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [activePage, isClient]);

  const handlePageChange = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false); // Close dropdown when navigating
    
    // Update URL to match the selected page (only after client hydration)
    if (isClient) {
      if (page === 'home') {
        window.history.pushState({}, '', '/');
      } else {
        window.history.pushState({}, '', `/${page}`);
      }
    }
  };

  const handleDownloadBrochure = async () => {
    console.log('Downloading Qualify IT Solutions brochure...');

    // Show a brief loading state
    const button = document.querySelector('[data-navbar-download]') as HTMLButtonElement;
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = '<div class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>Downloading...';
      button.disabled = true;

      try {
        const result = await downloadBrochure();

        if (result.success) {
          // Show success message briefly
          button.innerHTML = '<div class="w-4 h-4 text-green-600 mr-2">✓</div>Downloaded!';
          setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
          }, 2000);
        } else {
          throw new Error(result.error || 'Download failed');
        }
      } catch (error) {
        console.error('Download error:', error);
        button.innerHTML = '<div class="w-4 h-4 text-red-600 mr-2">✗</div>Failed';
        setTimeout(() => {
          button.innerHTML = originalText;
          button.disabled = false;
        }, 2000);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isServicePage = services.some(service => service.page === activePage);

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <LandingPage />;
      case "pharma-engineering":
        return <PharmaEngineeringPage />;
      case "gxp-applications":
        return <GxpApplicationsPage />;
      case "excel-validation":
        return <ExcelValidationPage />;
      case "project-management":
        return <ProjectManagementPage />;
      case "audit-compliance":
        return <AuditCompliancePage />;
      case "software-validation":
        return <SoftwareValidationPage />;
      case "training-programs":
        return <TrainingProgramsPage />;
      case "digital-training":
        return <DigitalTrainingPage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "enroll":
        return <EnrollPage />;
      default:
        return <LandingPage />;
    }
  };

  const isHomePage = activePage === "home";

  return (
    <div className={`min-h-screen ${isHomePage ? 'bg-dark-bg' : 'bg-light-bg'}`} style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>
      {/* Navigation Header - Updated to white background with optimized height for logo */}
      <nav className="bg-white border-light-color border-b sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 py-2">
            {/* Logo - Optimized size with responsive design and professional styling */}
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => handlePageChange("home")}
              role="button"
              tabIndex={0}
              aria-label="Navigate to home page"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePageChange("home");
                }
              }}
            >
              <div className="w-20 h-20 relative overflow-hidden rounded-xl p-1.5 sm:p-2 hover:bg-white/10 transition-all duration-300 group-focus:ring-2 group-focus:ring-blue-500 group-focus:ring-offset-2">
                <ImageWithFallback
                  src={qualifyLogoUrl}
                  alt="QIS - Qualify IT Solutions Logo"
                  className="w-full h-full object-contain"
                  style={{
                    backgroundColor: 'transparent',
                    filter: 'contrast(1.05) brightness(1.0) saturate(1.1)',
                    // Remove background padding by scaling and cropping
                    transform: 'scale(1.2)',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    // Clip any overflow to create tight crop
                    clipPath: 'inset(10% 10% 10% 10%)'
                  }}
                  fallbackType="pharmaceutical"
                />
              </div>
            </div>

            {/* Desktop Navigation - Updated text colors for white background */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handlePageChange("home")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activePage === "home"
                    ? 'text-pharma-primary bg-light-hover'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Home
              </button>
              
              {/* Services Dropdown with Improved UX */}
              <div className="relative" data-services-dropdown>
                <button
                  data-services-button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                    isServicePage
                      ? 'text-pharma-primary bg-light-hover'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Enhanced Dropdown with Active State Highlighting - Updated to white background */}
                <div className={`absolute left-0 mt-2 w-72 bg-white border-light-color border rounded-lg shadow-xl transition-all duration-200 ${
                  servicesDropdownOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'
                }`}>
                  <div className="py-2">
                    {services.map((service) => {
                      const Icon = service.icon;
                      const isActiveService = service.page === activePage;
                      return (
                        <button
                          key={service.page}
                          onClick={() => handlePageChange(service.page)}
                          className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-3 transition-all duration-200 ${
                            isActiveService
                              ? 'text-pharma-primary bg-pharma-primary/10 border-l-4 border-pharma-primary shadow-sm'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-light-hover'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isActiveService ? 'text-pharma-primary' : ''}`} />
                          <div className="flex flex-col">
                            <span className={`font-medium ${isActiveService ? 'font-semibold' : ''}`}>
                              {service.label}
                            </span>
                            {isActiveService && (
                              <span className="text-xs text-light-secondary">
                                Currently viewing
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handlePageChange("about")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activePage === "about"
                    ? 'text-pharma-primary bg-light-hover'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                About
              </button>

              <button
                onClick={handleDownloadBrochure}
                data-navbar-download
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 text-gray-700 hover:text-gray-900 border border-light-color hover:bg-light-hover"
              >
                <Download className="w-4 h-4" />
                Brochure
              </button>

              {/* Authentication Buttons */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 text-gray-700 hover:text-gray-900 border border-light-color hover:bg-light-hover"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 text-gray-700 hover:text-gray-900 border border-light-color hover:bg-light-hover"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </button>
              )}

              <button
                onClick={() => handlePageChange("contact")}
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 border border-blue-500"
              >
                Contact Us
              </button>
            </div>

            {/* Mobile menu button - Updated for white background */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-700"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu - Updated to white background */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-light-color border-t mt-2 py-4 rounded-b-xl">
              <div className="space-y-2">
                <button
                  onClick={() => handlePageChange("home")}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                    activePage === "home"
                      ? 'text-pharma-primary bg-light-hover'
                      : 'text-gray-700'
                  }`}
                >
                  Home
                </button>
                
                {/* Mobile Services - Updated styling */}
                <div className="space-y-1">
                  <div className="px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Services
                  </div>
                  {services.map((service) => {
                    const Icon = service.icon;
                    const isActiveService = service.page === activePage;
                    return (
                      <button
                        key={service.page}
                        onClick={() => handlePageChange(service.page)}
                        className={`block w-full text-left px-6 py-2 text-sm rounded-lg transition-colors ${
                          isActiveService
                            ? 'text-pharma-primary bg-pharma-primary/10'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-light-hover'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4" />
                          <span>{service.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange("about")}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activePage === "about"
                      ? 'text-pharma-primary bg-light-hover'
                      : 'text-gray-700'
                  }`}
                >
                  About
                </button>

                <button
                  onClick={handleDownloadBrochure}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-light-hover"
                >
                  <Download className="w-4 h-4" />
                  Brochure
                </button>

                {/* Mobile Authentication Buttons */}
                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-500 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-light-hover"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-light-hover"
                  >
                    <User className="w-4 h-4" />
                    Sign In
                  </button>
                )}

                <button
                  onClick={() => handlePageChange("contact")}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                >
                  Contact Us
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {!isInitialized ? (
          // Loading state to prevent hydration flash
          <div className="min-h-screen flex items-center justify-center bg-dark-bg">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-pharma-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-dark-secondary">Loading...</p>
            </div>
          </div>
        ) : (
          renderContent()
        )}
      </main>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="signin"
      />
    </div>
  );
}