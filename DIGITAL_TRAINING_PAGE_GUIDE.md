# Digital Training Page - Complete Design Implementation Guide

## Page Overview & Purpose

### Service Focus
**Digital Training Modules** specializes in **digital learning platforms** for pharmaceutical companies, providing the future of pharmaceutical education with interactive digital training modules where users can learn at their own pace with cutting-edge technology and expert-designed content, offering comprehensive digital training experiences for pharmaceutical professionals.

### Target Audience
- Pharmaceutical professionals seeking digital learning solutions
- Quality assurance teams requiring flexible online training
- Remote pharmaceutical teams needing accessible education
- Training managers implementing digital learning platforms
- Manufacturing teams requiring self-paced learning modules
- Global pharmaceutical teams needing standardized digital training

---

## Color Palette & Brand Implementation

### Primary Color Scheme
The Digital Training page uses **pharma-primary to blue gradient** colors emphasizing digital innovation, technology-enabled learning, and pharmaceutical excellence:

```css
/* Primary Digital Training Colors */
Primary Blue: #1E40AF (var(--pharma-primary)) - Main digital learning theme
Deep Blue: #1E3A8A - Professional digital variant
Secondary Green: #059669 (var(--pharma-secondary)) - Success and completion
Accent Blue: #3B82F6 - Interactive digital elements
White: #FFFFFF - Clean digital background

/* Gradient Implementations */
bg-gradient-to-br from-pharma-primary to-blue-800 - Hero section digital gradient
bg-gradient-to-br from-gray-50 to-blue-50 - Platform features background
bg-gradient-to-r from-pharma-primary to-blue-800 - CTA section gradient
```

### Color Usage Patterns

#### Digital Learning Color System
```tsx
// Training module categories
interactive: '#1E40AF' (pharma-primary) - Interactive digital modules
video: '#3B82F6' - Video-based learning content
simulation: '#059669' (pharma-secondary) - Hands-on simulation exercises
casestudy: '#D97706' - Real-world case studies
transparency: 'rgba(30, 64, 175, 0.1)' - Subtle digital overlays

// Interactive elements
bg-white text-pharma-primary - Primary CTA buttons
border-white text-white - Secondary CTA buttons
bg-gradient-to-br from-pharma-primary to-pharma-secondary - Digital learning icons
```

#### Digital Platform Gradient System
```tsx
// Hero section backgrounds
bg-gradient-to-br from-pharma-primary to-blue-800 - Digital learning platform gradient

// Platform feature overlay colors
bg-pharma-primary/85 - "Digital Interactive Learning" overlay
bg-pharma-secondary/85 - "Certified Industry Recognition" overlay
bg-blue-600/85 - "Flexible Self-Paced Learning" overlay
bg-green-600/85 - "Expert Content Creators" overlay
```

---

## Complete Page Content Breakdown

### 1. Hero Section Content

#### Service Badge
```tsx
// Badge content with Monitor icon
<span className="text-white/80 font-semibold">Digital Learning Platform</span>
```

#### Main Headlines & Value Proposition
```tsx
// Primary headline with animated text shadow
"Digital Training Modules"

// Value proposition
"Experience the future of pharmaceutical education with our interactive digital training modules. Learn at your own pace with cutting-edge technology and expert-designed content."
```

#### Call-to-Action Buttons
```tsx
// Primary CTA
<button>
  <Play className="w-5 h-5" />
  Start Learning
</button>

// Secondary CTA
<button>
  <Download className="w-5 h-5" />
  Free Trial
</button>
```

#### Platform Features (4 cards)
```tsx
// Digital learning platform features with background images
{
  feature: "Digital",
  subtitle: "Interactive Learning",
  icon: Monitor,
  background: "digital learning online training",
  overlay: "bg-pharma-primary/85"
},
{
  feature: "Certified",
  subtitle: "Industry Recognition",
  icon: Award,
  background: "professional certification diploma",
  overlay: "bg-pharma-secondary/85"
},
{
  feature: "Flexible",
  subtitle: "Self-Paced Learning",
  icon: Clock,
  background: "medical training seminar",
  overlay: "bg-blue-600/85"
},
{
  feature: "Expert",
  subtitle: "Content Creators",
  icon: Target,
  background: "laboratory training education",
  overlay: "bg-green-600/85"
}
```

### 2. Interactive Training Modules Section

#### Section Header
```tsx
"Interactive Training Modules"

"Explore our comprehensive library of digital training modules designed for pharmaceutical professionals at every career stage."
```

#### Training Module Cards (6 modules)
```tsx
const modules = [
  {
    icon: BookOpen,
    title: "GMP Fundamentals",
    category: "Interactive",
    duration: "2 hours",
    level: "Beginner",
    description: "Interactive modules covering Good Manufacturing Practices with real-world scenarios and assessments.",
    topics: ["GMP Principles", "Quality Systems", "Documentation"]
  },
  {
    icon: Monitor,
    title: "CSV Essentials",
    category: "Video-Based",
    duration: "3 hours",
    level: "Intermediate",
    description: "Comprehensive video training on Computer System Validation methodologies and implementation.",
    topics: ["GAMP 5", "Risk Assessment", "Validation Protocols"]
  },
  {
    icon: Target,
    title: "Data Integrity",
    category: "Simulation",
    duration: "1.5 hours",
    level: "Advanced",
    description: "Hands-on simulation exercises for understanding and implementing data integrity principles.",
    topics: ["ALCOA+", "Electronic Records", "Audit Trails"]
  },
  {
    icon: Award,
    title: "Regulatory Updates",
    category: "Interactive",
    duration: "1 hour",
    level: "All Levels",
    description: "Stay current with latest regulatory changes and industry best practices through interactive content.",
    topics: ["FDA Guidelines", "EMA Updates", "ICH Standards"]
  },
  {
    icon: Users,
    title: "Quality Management",
    category: "Case Study",
    duration: "2.5 hours",
    level: "Intermediate",
    description: "Real-world case studies exploring quality management challenges and solutions.",
    topics: ["QMS Implementation", "CAPA", "Risk Management"]
  },
  {
    icon: Globe,
    title: "Global Compliance",
    category: "Video-Based",
    duration: "2 hours",
    level: "Advanced",
    description: "Understanding international regulatory requirements and harmonization efforts.",
    topics: ["Global Standards", "Harmonization", "Regional Differences"]
  }
];

// Each module card includes "Start Module" button with Play icon
```

### 3. Platform Features Section

#### Section Header
```tsx
"Platform Features"

"Experience learning like never before with our advanced digital training platform"
```

#### Digital Learning Features (4 features)
```tsx
const features = [
  {
    icon: Smartphone,
    title: "Mobile Learning",
    description: "Access training content on any device, anywhere, anytime"
  },
  {
    icon: Tablet,
    title: "Interactive Content",
    description: "Engaging multimedia content with simulations and assessments"
  },
  {
    icon: Laptop,
    title: "Progress Tracking",
    description: "Monitor your learning progress with detailed analytics"
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Get help from industry experts through integrated chat support"
  }
];
```

### 4. Call-to-Action Section

#### Final CTA Content
```tsx
// This section would typically include final call-to-action content for platform access
// Based on pattern from other pages, likely includes:
"Ready to Transform Your Learning Experience?"
"Join thousands of pharmaceutical professionals advancing their careers through digital training"
<button>Start Free Trial</button>
<button>Schedule Demo</button>
```

---

## Layout Structure & Components

### 1. Page Container Architecture
```tsx
<div className="min-h-screen bg-light-bg relative overflow-hidden">
  <DigitalLearningBackground />       // Parallax digital learning imagery throughout page
  <HeroSection />                     // Digital learning platform introduction
  <ModulesSection />                  // 6 training module cards in 3-column grid
  <FeaturesSection />                 // 4 platform features in responsive grid
  <LearningLadder />                  // Universal page transition
  <CallToActionSection />             // Final platform access conversion
</div>
```

### 2. Hero Section Layout
**Design Pattern**: Two-column layout with content and digital platform features

```tsx
// Hero with pharma-primary to blue gradient background
<section className="py-20 bg-gradient-to-br from-pharma-primary to-blue-800 text-white relative overflow-hidden">
  <DigitalLearningBackground />    // Parallax background digital training images
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <ContentColumn />             // Left: Service intro + CTAs
      <PlatformFeaturesGrid />      // Right: 2x2 digital platform features with images
    </div>
  </div>
</section>
```

### 3. DigitalLearningBackground Component
**Design Pattern**: Parallax floating digital learning imagery with scroll effects

```tsx
function DigitalLearningBackground() {
  // 4 parallax digital learning images with different scroll speeds
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);  // Digital learning platform
  const y2 = useTransform(scrollY, [0, 1000], [0, 200]);   // Online training session
  const y3 = useTransform(scrollY, [0, 1000], [0, -100]);  // Professional certification
  
  return (
    <>
      <DigitalLearningPlatformImage />    // Top-right, digital learning online training
      <OnlineTrainingSessionImage />      // Bottom-left, medical training seminar
      <ProfessionalCertificationImage />  // Center-right, professional certification
      <TrainingClassroomImage />          // Center-left, pharmaceutical training classroom
      <TechElements />                    // Animated pharma-themed geometric overlays
    </>
  );
}
```

### 4. ModuleCard Component
**Design Pattern**: Enhanced training module cards with category-based hover backgrounds

```tsx
function ModuleCard({ module, index, delay }) {
  return (
    <motion.div className="light-card group hover:shadow-xl transition-all duration-500 relative overflow-hidden">
      <CategoryBasedBackground />          // Dynamic background based on module category
      <IconAndCategory />                  // Pharma gradient icon + category badge
      <TitleAndDescription />              // Module title and description
      <ModuleDetails />                    // Duration and level with icons
      <TopicTags />                        // Animated topic tags
      <StartModuleButton />                // "Start Module" CTA with Play icon
    </motion.div>
  );
}
```

**Category-Based Backgrounds**:
- **Interactive**: Digital learning online training imagery
- **Video-Based**: Medical training seminar imagery
- **Simulation/Case Study**: Pharmaceutical training classroom imagery

---

## Typography Implementation

### Heading Hierarchy
```css
/* Page Title (Hero) */
H1 : 4xl/5xl (36px/48px), 700 weight, white color with animated text shadow
"Digital Training Modules"

/* Section Headers */
H2 : 3xl/4xl (30px/36px), 700 weight, light-primary color with animated scaling
"Interactive Training Modules"

/* Module Titles */
H3 : lg (18px), 700 weight, light-primary color, hover:pharma-primary
"GMP Fundamentals"

/* Feature Titles */
H3 : base (16px), 700 weight, light-primary color, hover:pharma-primary
"Mobile Learning"

/* Module Categories */
.category : xs (12px), 600 weight, pharma-primary color with pharma-primary/10 background
"Interactive"
```

### Body Text Styling
```css
/* Hero Description */
.hero-text : xl (20px), 400 weight, white/90 color, 1.5 line-height

/* Section Descriptions */
.section-desc : xl (20px), 400 weight, light-secondary color

/* Module Descriptions */
.module-desc : sm (14px), 400 weight, light-secondary color, 1.5 line-height

/* Feature Descriptions */
.feature-desc : sm (14px), 400 weight, light-secondary color, 1.5 line-height

/* Module Details */
.module-detail : xs (12px), 400 weight, light-secondary color
```

---

## Image & Media Implementation

### Digital Learning Background Images

#### DigitalLearningBackground System
```tsx
// 4 parallax digital learning images with scroll-based movement
const digitalLearningImages = [
  {
    src: "digital-learning-online-training.jpg",
    alt: "Digital Learning Background",
    position: "top-0 right-0 w-2/3 h-96",
    opacity: "opacity-4",
    parallax: y1 // Moves up on scroll
  },
  {
    src: "medical-training-seminar.jpg",
    alt: "Online Training Session",
    position: "bottom-20 left-0 w-1/2 h-80",
    opacity: "opacity-3",
    parallax: y2 // Moves down on scroll
  },
  {
    src: "professional-certification-diploma.jpg",
    alt: "Professional Certification",
    position: "top-1/3 right-1/4 w-1/3 h-64",
    opacity: "opacity-5",
    parallax: y3, // Moves up faster on scroll
    extraAnimation: { rotate: [0, 3, -3, 0], scale: [1, 1.05, 1] }
  },
  {
    src: "pharmaceutical-training-certification-classroom.jpg",
    alt: "Training Classroom",
    position: "top-2/3 left-1/3 w-1/4 h-48",
    opacity: "opacity-4",
    extraAnimation: { y: [0, -20, 0], opacity: [0.04, 0.08, 0.04] }
  }
];
```

#### Hero Platform Features Images
```tsx
// 4 digital platform feature cards with background images and colored overlays
const platformFeatureImages = [
  {
    background: "digital-learning-online-training.jpg",
    overlay: "bg-pharma-primary/85",
    feature: "Digital",
    subtitle: "Interactive Learning",
    icon: Monitor
  },
  {
    background: "professional-certification-diploma.jpg",
    overlay: "bg-pharma-secondary/85",
    feature: "Certified",
    subtitle: "Industry Recognition",
    icon: Award
  },
  {
    background: "medical-training-seminar.jpg",
    overlay: "bg-blue-600/85",
    feature: "Flexible",
    subtitle: "Self-Paced Learning",
    icon: Clock
  },
  {
    background: "laboratory-training-education.jpg",
    overlay: "bg-green-600/85",
    feature: "Expert",
    subtitle: "Content Creators",
    icon: Target
  }
];
```

### Module Card Background System
```tsx
// Category-based background images for module cards on hover
const moduleBackgrounds = {
  "Interactive": "digital-learning-online-training.jpg",
  "Video-Based": "medical-training-seminar.jpg",
  "Simulation": "pharmaceutical-training-certification-classroom.jpg",
  "Case Study": "pharmaceutical-training-certification-classroom.jpg"
};

// Hover background with low opacity
<motion.div
  className="absolute inset-0 opacity-0 group-hover:opacity-4 transition-opacity duration-500"
  style={{
    backgroundImage: moduleBackgrounds[module.category],
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
/>
```

### Section Background Implementation
```tsx
// Animated background pattern for modules section
<motion.div 
  className="absolute inset-0 opacity-2"
  animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
  style={{ 
    backgroundImage: "digital-learning-online-training-pattern.jpg",
    backgroundSize: "300px 300px",
    backgroundRepeat: "repeat"
  }}
/>

// Features section with fixed background attachment
<motion.div 
  className="absolute top-0 left-0 w-full h-full opacity-3"
  style={{
    backgroundImage: "medical-training-seminar-background.jpg",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  }}
/>
```

---

## Animation System Implementation

### 1. Page-Level Animations

#### LearningLadder Component
**Purpose**: Universal pharmaceutical page transition
- **Duration**: 800ms professional fade-out
- **Z-Index**: 50 (above all content)
- **Positioning**: Fixed overlay covering entire viewport

#### DigitalLearningBackground Parallax
```tsx
// Scroll-based parallax movement for digital learning imagery
const { scrollY } = useScroll();
const y1 = useTransform(scrollY, [0, 1000], [0, -150]);   // Digital platform moves up
const y2 = useTransform(scrollY, [0, 1000], [0, 200]);    // Training session moves down
const y3 = useTransform(scrollY, [0, 1000], [0, -100]);   // Certification moves up faster

// Additional certification image animation
animate={{ 
  rotate: [0, 3, -3, 0],
  scale: [1, 1.05, 1]
}}
transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}

// Training classroom floating animation
animate={{
  y: [0, -20, 0],
  opacity: [0.04, 0.08, 0.04]
}}
transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
```

### 2. Hero Section Animations

#### Animated Text Shadow Effect
```tsx
// Hero title with pulsing text shadow
<motion.h1
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
```

#### CTA Button Animations
```tsx
// Primary CTA with gradient overlay and hover effects
<motion.button
  whileHover={{ 
    scale: 1.05, 
    y: -2,
    boxShadow: "0 15px 35px rgba(255, 255, 255, 0.3)"
  }}
  whileTap={{ scale: 0.95 }}
>
  <motion.div className="absolute inset-0 bg-gradient-to-r from-pharma-secondary to-green-600 opacity-0 group-hover:opacity-20 transition-opacity" />
  <span className="relative z-10 flex items-center gap-2">
    <Play className="w-5 h-5" />
    Start Learning
  </span>
</motion.button>
```

#### Platform Features Grid Hover Effects
```tsx
// Individual platform feature cards with hover scaling
<motion.div
  whileHover={{ scale: 1.05 }}
  style={{
    backgroundImage: featureBackground,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
  <div className="absolute inset-0 bg-pharma-primary/85"></div>
  <div className="relative z-10">
    <Monitor className="w-8 h-8 text-white mx-auto mb-2" />
    <div className="text-lg font-bold text-white mb-1">Digital</div>
    <div className="text-xs text-white/90">Interactive Learning</div>
  </div>
</motion.div>
```

### 3. Training Module Cards Animation System

#### ModuleCard Entrance Animation
```tsx
// Staggered module card reveals with spring physics
<motion.div
  initial={{ opacity: 0, y: 60, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ 
    delay: index * 0.1,         // 0.1s stagger between cards
    duration: 0.8,
    type: "spring",
    stiffness: 100
  }}
  whileHover={{ 
    y: -8, 
    scale: 1.02,
    boxShadow: "0 25px 50px rgba(30, 64, 175, 0.15)"
  }}
>
```

#### Module Icon Animations
```tsx
// Training module icons with complex hover animations
<motion.div 
  className="w-12 h-12 bg-gradient-to-br from-pharma-primary to-pharma-secondary rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
  whileHover={{ 
    rotate: [0, -10, 10, 0],
    boxShadow: "0 15px 35px rgba(30, 64, 175, 0.4)"
  }}
  transition={{ duration: 0.6 }}
>
  {module.icon}
</motion.div>
```

#### Topic Tags Animation
```tsx
// Individual topic tags with staggered reveals
<motion.span
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
```

### 4. Platform Features Section Animations

#### Section Header Effects
```tsx
// Platform features section header with animated text shadow
<motion.h2 
  className="text-3xl md:text-4xl font-bold text-light-primary mb-6"
  animate={{ 
    textShadow: [
      "0 0 0px rgba(30, 64, 175, 0)",
      "0 0 20px rgba(30, 64, 175, 0.3)",
      "0 0 0px rgba(30, 64, 175, 0)"
    ]
  }}
  transition={{ duration: 4, repeat: Infinity }}
>
  Platform Features
</motion.h2>
```

#### Feature Cards with Rotating Icons
```tsx
// Feature cards with spring entrance and rotating icons
<motion.div
  initial={{ opacity: 0, y: 50, scale: 0.9 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
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
    {feature.icon}
  </motion.div>
</motion.div>
```

---

## Complex Component Implementations

### 1. DigitalLearningBackground Component

#### Parallax Digital Learning Images
```tsx
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
          src="digital-learning-online-training.jpg"
          alt="Digital Learning Background"
          className="w-full h-full object-cover rounded-3xl"
        />
      </motion.div>

      {/* Online Training Session - scrolls down */}
      <motion.div 
        className="absolute bottom-20 left-0 w-1/2 h-80 opacity-3"
        style={{ y: y2 }}
      >
        <ImageWithFallback
          src="medical-training-seminar.jpg"
          alt="Online Training Session"
          className="w-full h-full object-cover rounded-2xl"
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
          src="professional-certification-diploma.jpg"
          alt="Professional Certification"
          className="w-full h-full object-cover rounded-xl"
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
          src="pharmaceutical-training-certification-classroom.jpg"
          alt="Training Classroom"
          className="w-full h-full object-cover rounded-lg"
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
```

### 2. ModuleCard Component

#### Enhanced Module Card with Category-Based Background Integration
```tsx
function ModuleCard({ module, index, delay = 0 }) {
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
      className="light-card group hover:shadow-xl transition-all duration-500 relative overflow-hidden"
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(30, 64, 175, 0.15)"
      }}
    >
      {/* Dynamic background based on module category */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-4 transition-opacity duration-500"
        style={{
          backgroundImage: module.category === "Interactive" 
            ? "digital-learning-online-training.jpg"
            : module.category === "Video-Based"
            ? "medical-training-seminar.jpg"
            : "pharmaceutical-training-certification-classroom.jpg",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      <div className="relative z-10">
        {/* Module icon and category */}
        <motion.div 
          className="flex items-center justify-between mb-4"
          whileHover={{ x: 5 }}
        >
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-pharma-primary to-pharma-secondary rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
            whileHover={{ 
              rotate: [0, -10, 10, 0],
              boxShadow: "0 15px 35px rgba(30, 64, 175, 0.4)"
            }}
            transition={{ duration: 0.6 }}
          >
            {module.icon}
          </motion.div>
          <span className="text-xs text-pharma-primary bg-pharma-primary/10 px-2 py-1 rounded-full">
            {module.category}
          </span>
        </motion.div>

        {/* Module title and description */}
        <motion.h3 
          className="text-lg font-bold text-light-primary mb-2 group-hover:text-pharma-primary transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          {module.title}
        </motion.h3>

        <motion.p 
          className="text-light-secondary mb-4 text-sm leading-relaxed"
          initial={{ opacity: 0.8 }}
          whileInView={{ opacity: 1 }}
        >
          {module.description}
        </motion.p>

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

        {/* Start Module button */}
        <motion.button 
          className="w-full light-button-primary text-sm py-2 group/btn relative overflow-hidden"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 8px 20px rgba(30, 64, 175, 0.3)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pharma-secondary to-green-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"
            layoutId={`module-bg-${index}`}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Play className="w-4 h-4" />
            Start Module
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
```

---

## Responsive Design Patterns

### Breakpoint Strategy
```css
/* Mobile First Approach */
Base: 320px+ - Single column layouts, stacked elements
sm: 640px+ - Enhanced spacing, button groups in rows
md: 768px+ - 2-column grids for modules and features
lg: 1024px+ - Hero side-by-side layout, 3-column module grid
xl: 1280px+ - 4-column features grid with maximum width constraints
```

### Component Responsive Behavior

#### Hero Section
```tsx
// Responsive grid layout
className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"

// Responsive typography
className="text-4xl md:text-5xl font-bold mb-6"

// Responsive button layout
className="flex flex-col sm:flex-row gap-4"

// Responsive platform features grid (always 2x2)
className="grid grid-cols-2 gap-4"
```

#### Modules Grid
```tsx
// Responsive module grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Mobile-friendly card spacing
className="space-y-4" // Consistent spacing within cards
```

#### Features Section
```tsx
// Responsive features grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"

// Mobile text sizing
className="text-sm leading-relaxed" // Smaller text for mobile readability
```

---

## Component Dependencies & Imports

### Required Imports
```tsx
// Animation system
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { LearningLadder } from "../animations/LearningLadder";

// UI components and state management
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useRef } from "react";

// Icons (Lucide React)
import { 
  Monitor,         // Primary digital learning icon and platform features
  Play,            // Start learning and module buttons
  Users,           // User level indicators and features
  Award,           // Certification and achievements
  BookOpen,        // GMP fundamentals and learning
  Clock,           // Duration indicators and flexible learning
  Target,          // Data integrity and expert content
  Globe,           // Global compliance
  Download,        // Free trial and downloads
  CheckCircle,     // Completion indicators
  Smartphone,      // Mobile learning
  Tablet,          // Interactive content
  Laptop,          // Progress tracking
  Headphones       // Expert support
} from "lucide-react";
```

### Custom Components Used

#### LearningLadder
- **Purpose**: Universal page transition animation
- **Implementation**: Fixed overlay with pharmaceutical stepping pattern
- **Timing**: 800ms fade-out with professional easing

#### DigitalLearningBackground
- **Purpose**: Complex parallax background system with digital learning imagery
- **Implementation**: 4 parallax images + 2 animated tech elements with scroll transforms
- **Features**: Different scroll speeds, rotation animations, floating effects, and opacity variations

#### ModuleCard
- **Purpose**: Enhanced training module cards with category-based background integration
- **Animation**: Spring-based entrance with staggered reveals (0.1s delays)
- **Features**: Category-based hover backgrounds, rotating icons, animated topic tags, gradient CTAs

#### ImageWithFallback
- **Purpose**: Intelligent image loading with digital training-themed fallbacks
- **Fallback Type**: Professional digital learning gradients
- **Features**: Automatic failure detection with branded replacements

---

## Performance Optimization

### Animation Performance
- **GPU Acceleration**: All animations use `transform` and `opacity` only
- **Scroll-Based Transforms**: Efficient useTransform for parallax effects
- **Intersection Observer**: Efficient scroll-triggered animations for module cards
- **Staggered Loading**: Sequential reveals prevent overwhelming users (0.1s stagger)

### Parallax Optimization
- **Transform Only**: Parallax uses only transform: translateY for performance
- **Scroll Caching**: Scroll progress values cached with useTransform
- **Pointer Events**: Background elements use pointer-events: none
- **Will-Change**: Applied to actively transforming elements

### Bundle Optimization
- **Component Splitting**: Digital training-specific components are modular
- **Icon Tree Shaking**: Only imported Lucide icons are bundled
- **Image Optimization**: Responsive images with professional fallback system
- **Background Images**: Optimized sizes for different use cases (w=300, w=400, w=1200)

### Memory Management
- **Effect Cleanup**: Proper cleanup of useEffect hooks and timers
- **Animation Cleanup**: Motion components properly unmount
- **Scroll Observer Cleanup**: Parallax scroll observers properly disposed
- **Background Image Loading**: Lazy loading for background images

---

## Business Context & Content Strategy

### Service Positioning
**Digital Training Modules** positions itself as the **digital learning platform** specialist within the pharmaceutical consulting suite, emphasizing:
- **Future of Education**: Interactive digital training modules with cutting-edge technology
- **Self-Paced Learning**: Flexible access with comprehensive digital training experiences
- **Expert-Designed Content**: Professional pharmaceutical training for all career stages
- **Technology Integration**: Mobile, interactive, and progress-tracked learning

### Content Hierarchy
1. **Hero**: Digital learning platform introduction with platform features
2. **Modules**: 6 comprehensive training modules with categories and topics
3. **Features**: 4 key platform advantages for digital learning experience
4. **Trust Building**: Platform capabilities and professional development focus
5. **Call-to-Action**: Multiple conversion points for trial and demo access

### Call-to-Action Strategy
- **Primary CTA**: "Start Learning" - Direct engagement for immediate platform access
- **Secondary CTA**: "Free Trial" - Trial access for platform evaluation
- **Module CTAs**: "Start Module" - Direct module engagement for specific training
- **Progressive Engagement**: Platform features build capability understanding, modules provide specifics

### Training Module Categories
- **Interactive**: GMP Fundamentals, Regulatory Updates - Engaging interactive content
- **Video-Based**: CSV Essentials, Global Compliance - Comprehensive video training
- **Simulation**: Data Integrity - Hands-on practical exercises
- **Case Study**: Quality Management - Real-world application examples

### Digital Platform Focus
- **Accessibility**: Mobile learning with device flexibility and anywhere access
- **Engagement**: Interactive content with multimedia simulations and assessments
- **Progress**: Detailed analytics and learning progress monitoring
- **Support**: Expert assistance through integrated platform features
- **Certification**: Industry-recognized digital credentials and pharmaceutical compliance

This comprehensive guide covers every aspect of the Digital Training page implementation, from the specific content in every block and button to the complex parallax background system and professional pharmaceutical digital learning design patterns that create an effective, engaging digital education service presentation.