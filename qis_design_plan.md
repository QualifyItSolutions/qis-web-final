This Figma Make file includes components from [shadcn/ui](https://ui.shadcn.com/) used under [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).

This Figma Make file includes photos from [Unsplash](https://unsplash.com) used under [license](https://unsplash.com/license).


# Component Architecture Documentation

## Component Hierarchy & Dependencies

### Main Application Structure
```
App.tsx
└── QualifyWebsite.tsx (Main Router & Theme Manager)
    ├── LandingPage.tsx (Dark Theme)
    │   ├── LearningLadder.tsx
    │   ├── ScrollAnimations.tsx (AnimatedText, AnimatedCounter)
    │   └── ServiceAnimations.tsx (MolecularPatterns)
    │
    ├── Service Pages (Light Theme) × 8
    │   ├── PharmaEngineeringPage.tsx
    │   │   ├── LearningLadder.tsx
    │   │   ├── MolecularPatterns.tsx
    │   │   ├── EngineeringHorizontalReveal.tsx
    │   │   ├── AnimatedComplianceChecklist.tsx
    │   │   └── MolecularEngineeringNetwork.tsx (Custom)
    │   │
    │   ├── GxpApplicationsPage.tsx
    │   ├── ProjectManagementPage.tsx
    │   ├── AuditCompliancePage.tsx
    │   │   ├── FloatingComplianceIcon.tsx (Custom)
    │   │   ├── SequentialChecklist.tsx (Custom)
    │   │   └── LiveComplianceMonitoring.tsx (Removed)
    │   │
    │   ├── SoftwareValidationPage.tsx
    │   ├── TrainingProgramsPage.tsx
    │   ├── RegulatorySupportPage.tsx
    │   └── DigitalTrainingPage.tsx
    │
    ├── AboutPage.tsx (Light Theme)
    └── ContactPage.tsx (Light Theme)
```

---

## Core Component Implementation

### 1. QualifyWebsite.tsx (Main Container)

#### Purpose & Responsibilities
- **Route Management**: Controls page navigation and theme switching
- **Theme Management**: Automatically applies dark/light theme based on route
- **Global State**: Manages current page state and navigation

#### Technical Implementation
```tsx
interface RouteConfig {
  path: string;
  component: React.ComponentType;
  theme: 'dark' | 'light';
  title: string;
}

const routes: RouteConfig[] = [
  { path: '/', component: LandingPage, theme: 'dark', title: 'Home' },
  { path: '/pharma-engineering', component: PharmaEngineeringPage, theme: 'light', title: 'Engineering' },
  // ... other routes
];
```

#### Design Decisions
- **Automatic Theme Switching**: Route-based theme assignment
- **Navigation State Management**: Clean URL-based navigation
- **Performance**: Component lazy loading for large pharmaceutical service pages

### 2. LearningLadder.tsx (Universal Animation)

#### Purpose & Design Philosophy
- **Professional Transition**: Suggests pharmaceutical progression and expertise
- **Universal Application**: Used across all pages for consistency
- **Performance**: Non-blocking page transition animation

#### Technical Implementation
```tsx
export function LearningLadder() {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Pharmaceutical ladder pattern implementation */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

#### Animation Design Elements
- **Geometric Steps**: Suggesting validation and compliance processes
- **Pharmaceutical Colors**: Blue gradient (#1E40AF → #3B82F6)
- **Professional Timing**: 800ms total duration with 300ms fade-out
- **Z-Index Management**: Fixed positioning without interfering with content

---

## Animation Component Architecture

### ScrollAnimations.tsx Components

#### AnimatedText Component
```tsx
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function AnimatedText({ text, className, delay = 0, duration = 0.8 }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {text}
    </motion.div>
  );
}
```

**Design Features**:
- **Pharmaceutical Timing**: Conservative 0.8s duration for professional feel
- **Subtle Movement**: 20px Y-axis movement for professional elegance
- **Intersection Observer**: Triggers at 20% visibility for smooth experience
- **One-time Animation**: Prevents re-triggering on scroll back

#### AnimatedCounter Component
```tsx
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({ end, duration = 2, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const increment = end / (duration * 60); // 60fps animation
    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + increment;
        return next >= end ? end : next;
      });
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-bold">
      {prefix}{Math.floor(count)}{suffix}
    </span>
  );
}
```

### ServiceAnimations.tsx Components

#### EngineeringHorizontalReveal Component
```tsx
interface RevealProps {
  children: React.ReactNode;
  direction: 'left' | 'right';
  delay?: number;
}

export function EngineeringHorizontalReveal({ 
  children, 
  direction, 
  delay = 0 
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const xOffset = direction === 'left' ? -50 : 50;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xOffset }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Page-Specific Component Architecture

### Pharmaceutical Engineering Page Components

#### MolecularEngineeringNetwork Component
**Purpose**: Visualizes interconnected pharmaceutical engineering systems

```tsx
function MolecularEngineeringNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const molecules = [
    { x: 20, y: 30, label: "HVAC", icon: Zap, connections: [1, 3] },
    { x: 50, y: 20, label: "Cleanroom", icon: Layers, connections: [2, 4] },
    // ... more engineering systems
  ];

  return (
    <div className="relative h-96 w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl">
      {/* Engineering grid background */}
      {/* Molecular connections with SVG animations */}
      {/* Interactive engineering nodes */}
    </div>
  );
}
```

**Key Features**:
- **Interactive Nodes**: Hoverable engineering system representations
- **SVG Connections**: Animated lines showing system integration
- **Progressive Activation**: Staggered animation of pharmaceutical systems
- **Professional Styling**: Engineering-appropriate colors and patterns

### Audit & Compliance Page Components

#### FloatingComplianceIcon Component
```tsx
function FloatingComplianceIcon({
  icon: Icon,
  delay = 0,
  className = "",
}: {
  icon: React.ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.5, rotate: -180 }}
      animate={isInView ? { 
        opacity: 0.8, 
        y: 0, 
        scale: 1, 
        rotate: 0 
      } : undefined}
      transition={{
        duration: 1.2,
        delay,
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
```

#### SequentialChecklist Component
```tsx
function SequentialChecklist({
  items,
  delay = 0,
}: {
  items: Array<{ item: string; status: string }>;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="space-y-2">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-50 transition-colors group"
          initial={{ opacity: 0, x: -30, scale: 0.9 }}
          animate={isInView ? { 
            opacity: 1, 
            x: 0, 
            scale: 1 
          } : undefined}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.15,
            ease: "easeOut",
          }}
          whileHover={{ scale: 1.02, x: 5 }}
        >
          {/* Compliance checklist item implementation */}
        </motion.div>
      ))}
    </div>
  );
}
```

---

## Enhanced Image Handling System

### ImageWithFallback Component Architecture

#### Core Implementation
```tsx
interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'pharmaceutical' | 'engineering' | 'compliance' | 'training' | 'generic';
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, fallbackType = 'generic', ...rest } = props;

  const handleError = () => setDidError(true);

  if (didError) {
    return <PharmaceuticalFallbackDisplay />;
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={style} 
      {...rest} 
      onError={handleError} 
    />
  );
}
```

#### Pharmaceutical Fallback Design System
```tsx
const getGradientFallback = (type: FallbackType) => {
  const gradients = {
    pharmaceutical: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 30%, #60A5FA 70%, #93C5FD 100%)',
    engineering: 'linear-gradient(135deg, #059669 0%, #10B981 30%, #34D399 70%, #6EE7B7 100%)',
    compliance: 'linear-gradient(135deg, #DC2626 0%, #EF4444 30%, #F87171 70%, #FCA5A5 100%)',
    training: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 30%, #A78BFA 70%, #C4B5FD 100%)',
    generic: 'linear-gradient(135deg, #374151 0%, #4B5563 30%, #6B7280 70%, #9CA3AF 100%)'
  };
  return gradients[type];
};
```

---

## Shared UI Components Integration

### Button System Implementation

#### Theme-Aware Button Classes
```css
/* Light Theme Pharmaceutical Buttons */
.light-button-primary {
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  color: #FFFFFF;
  background-color: var(--color-pharma-primary);
  transition: all 0.2s ease;
}

.light-button-primary:hover {
  background-color: #1E3A8A;
  box-shadow: 0 0 0 1px var(--color-pharma-primary), 0 0 8px rgba(30, 64, 175, 0.2);
}

/* Dark Theme Pharmaceutical Buttons */
.dark-button-primary {
  background-color: var(--color-dark-cta);
  color: #FFFFFF;
}

.dark-button-primary:hover {
  background-color: #2563eb;
  box-shadow: 0 0 0 1px var(--color-dark-cta), 0 0 8px rgba(59, 130, 246, 0.4);
}
```

### Card System Implementation

#### Pharmaceutical Professional Cards
```css
.pharma-card {
  border-radius: 0.75rem;
  border: 1px solid var(--color-light-border);
  padding: 2rem;
  background-color: var(--color-light-card);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px;
  transition: all 0.3s ease;
}

.pharma-card:hover {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 8px 24px;
  transform: translateY(-2px);
}
```

---

## Performance & Optimization Patterns

### Animation Performance
- **GPU Acceleration**: All animations use `transform` and `opacity` only
- **Intersection Observer**: Efficient scroll-triggered animations
- **Animation Cleanup**: Proper cleanup of timers and observers
- **Reduced Motion Support**: Respects user accessibility preferences

### Bundle Optimization
- **Page-Level Splitting**: Each service page loads independently
- **Shared Component Reuse**: Common animations and UI components
- **Tree Shaking**: Only necessary pharmaceutical components included
- **Lazy Loading**: Images and heavy components load on demand

### Memory Management
- **Effect Cleanup**: Proper cleanup of useEffect hooks
- **Reference Management**: Careful ref usage for animation targets
- **State Optimization**: Minimal state updates for pharmaceutical components

This architectural documentation provides a comprehensive understanding of how the pharmaceutical design system is implemented through React component architecture, animation systems, and professional user interface patterns appropriate for the pharmaceutical consulting industry.

# Qualify IT Solutions - Local Development Guide

## Overview
This guide helps you run the Qualify IT Solutions pharmaceutical consulting website locally with proper image handling and layouts.

## Quick Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone or download the project files
# Navigate to project directory
cd qualify-it-solutions

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

## Image Handling Solutions

### Problem
External Unsplash images may not load properly in local development, causing layout issues.

### Solutions Implemented

1. **Enhanced ImageWithFallback Component**
   - Automatically detects image load failures
   - Provides pharmaceutical-themed CSS gradient fallbacks
   - Maintains proper aspect ratios and layouts
   - Uses professional patterns and icons

2. **Fallback Types Available**
   - `pharmaceutical` - Blue gradient with medical icons
   - `engineering` - Green gradient with engineering icons  
   - `compliance` - Red gradient with compliance icons
   - `training` - Purple gradient with training icons
   - `generic` - Gray gradient for general content

## File Structure
```
├── App.tsx                    # Main application entry
├── components/
│   ├── pages/                 # All service pages
│   ├── figma/
│   │   └── ImageWithFallback.tsx  # Enhanced image component
│   ├── animations/            # Scroll animations
│   └── ui/                    # UI components
├── styles/
│   └── globals.css           # Theme and styling
└── DEPLOYMENT_GUIDE.md       # This guide
```

## Local Development Tips

### 1. Image Loading
- All images now have intelligent fallbacks
- No need to download external images manually
- Layouts remain professional even without internet

### 2. Performance
- CSS gradients load instantly
- No external dependencies for core functionality
- Smooth animations work offline

### 3. Styling
- Professional pharmaceutical theme maintained
- Responsive design works across all devices
- Dark theme for landing page, light theme for services

## Customization

### Adding New Images
```jsx
<ImageWithFallback
  src="your-image-url.jpg"
  alt="Description of image"
  className="w-full h-64 object-cover"
  fallbackType="pharmaceutical" // Choose appropriate type
/>
```

### Theme Colors
Edit `/styles/globals.css` to modify:
- Dark theme colors (landing page)
- Light theme colors (service pages)
- Pharmaceutical brand colors
- Component styling

### Animations
Located in `/components/animations/`:
- `ScrollAnimations.tsx` - Text and scroll effects
- `LearningLadder.tsx` - Universal page animation
- `ServiceAnimations.tsx` - Service-specific effects

## Production Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Static Site Generation
The website is designed as a static site and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting provider

### Environment Variables
No environment variables required for basic functionality.
For external APIs (contact forms, analytics), add:
```bash
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## Troubleshooting

### Images Not Loading
- Check network connection
- Images will automatically use CSS fallbacks
- Verify `fallbackType` prop is set correctly

### Layout Issues
- Ensure all CSS custom properties are loaded
- Check browser console for errors
- Verify responsive classes are applied

### Animation Performance
- Reduce motion in browser accessibility settings affects animations
- GPU acceleration is enabled for smooth performance
- Animations are optimized for 60fps

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement for older browsers

## Contact & Support
For technical issues or customization requests related to this pharmaceutical consulting website, refer to the component documentation or check the browser console for specific error messages.

---

**Note**: This is a professional pharmaceutical consulting website template. All medical and regulatory content should be reviewed by qualified professionals before use in production environments.


# Qualify IT Solutions - Component Design Implementation Guide

## Table of Contents
1. [Design System Architecture](#design-system-architecture)
2. [Theme Implementation](#theme-implementation)
3. [Component Categories](#component-categories)
4. [Animation System](#animation-system)
5. [Page Components](#page-components)
6. [UI Components](#ui-components)
7. [Layout Patterns](#layout-patterns)
8. [Best Practices](#best-practices)

---

## Design System Architecture

### Overall Architecture
```
App.tsx (Entry Point)
└── QualifyWebsite.tsx (Main Container)
    ├── LandingPage.tsx (Dark Theme)
    ├── Service Pages × 8 (Light Theme)
    ├── About/Contact Pages (Light Theme)
    └── Shared Components
```

### Design Philosophy Implementation
- **Dual-Theme System**: Dark for landing (premium feel), Light for services (readability)
- **Pharmaceutical Aesthetics**: Clean lines, professional spacing, medical-grade precision
- **Progressive Enhancement**: Content-first approach with layered animations
- **Responsive Design**: Mobile-first with pharmaceutical industry device support

---

## Theme Implementation

### CSS Custom Properties System
Located in `/styles/globals.css`, the theme system uses:

```css
/* Dual Theme Architecture */
:root {
  /* Dark Theme (Landing Page Only) */
  --dark-bg: #0F172A;
  --dark-card: #1E293B;
  --dark-primary-text: #FFFFFF;
  --dark-secondary-text: #94A3B8;
  
  /* Light Theme (Service Pages) */
  --light-bg: #FAFAFA;
  --light-card: #FFFFFF;
  --light-primary-text: #1F2937;
  --light-secondary-text: #6B7280;
  
  /* Pharmaceutical Brand Colors */
  --pharma-primary: #1E40AF;
  --pharma-secondary: #059669;
  --pharma-accent: #DC2626;
}
```

### Theme Application Strategy
- **Landing Page**: Uses `bg-dark-bg`, `text-dark-primary` classes
- **Service Pages**: Uses `bg-light-bg`, `text-light-primary` classes  
- **Brand Elements**: Uses `text-pharma-primary`, `bg-pharma-secondary` consistently
- **Interactive Elements**: Consistent hover states across themes

---

## Component Categories

### 1. Layout Components

#### QualifyWebsite.tsx (Main Container)
**Purpose**: Main routing and theme management container
**Design Implementation**:
```tsx
// Theme management through route-based styling
const isDarkPage = currentPath === '/';
return (
  <div className={isDarkPage ? 'bg-dark-bg' : 'bg-light-bg'}>
    <Navigation theme={isDarkPage ? 'dark' : 'light'} />
    <main>{currentPage}</main>
  </div>
);
```

**Key Design Decisions**:
- Route-based theme switching
- Consistent navigation across themes
- Pharmaceutical brand color integration

#### Navigation Component
**Design Implementation**:
- **Dark Theme**: Transparent background with white text
- **Light Theme**: White background with pharmaceutical primary text
- **Responsive**: Hamburger menu for mobile with pharmaceutical iconography
- **Brand Integration**: Logo positioning with pharmaceutical color scheme

### 2. Animation Components

#### LearningLadder.tsx (Universal Page Animation)
**Purpose**: Professional page transition suggesting pharmaceutical progression
**Design Implementation**:
```tsx
// Pharmaceutical-appropriate motion design
<motion.div
  className="fixed inset-0 pointer-events-none z-50"
  initial={{ opacity: 1 }}
  animate={{ opacity: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  {/* Pharmaceutical ladder pattern */}
</motion.div>
```

**Visual Elements**:
- Clean geometric steps suggesting validation processes
- Pharmaceutical blue gradient (#1E40AF → #3B82F6)
- Professional timing (0.8s duration, ease-out)
- Non-intrusive z-index management

#### ScrollAnimations.tsx (Text & Element Animations)
**Key Animations**:
1. **AnimatedText**: Character-by-character reveal for pharmaceutical precision
2. **AnimatedCounter**: Number animations for metrics and statistics
3. **FadeInUp**: Content reveals with pharmaceutical-appropriate timing

**Implementation Pattern**:
```tsx
// Professional pharmaceutical timing
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
```

#### ServiceAnimations.tsx (Service-Specific Animations)
**Components**:
1. **MolecularPatterns**: Background pharmaceutical patterns
2. **EngineeringHorizontalReveal**: Directional content reveals
3. **AnimatedComplianceChecklist**: Sequential validation item reveals

---

## Page Components

### Landing Page (Dark Theme)

#### Design Implementation Strategy
```tsx
// Dark theme pharmaceutical landing page
<section className="bg-dark-bg text-dark-primary">
  <div className="bg-gradient-to-br from-pharma-primary to-blue-800">
    {/* Hero content with pharmaceutical animations */}
  </div>
</section>
```

**Key Design Elements**:
- **Hero Section**: Full-width pharmaceutical gradient background
- **Service Grid**: 8-service overview with professional hover animations
- **Trust Indicators**: Statistics with pharmaceutical credibility metrics
- **CTA Sections**: Dual-button pattern (primary + secondary pharmaceutical actions)

**Animation Implementation**:
- Futuristic but professional scroll-triggered animations
- Pharmaceutical molecular pattern backgrounds
- Staggered service card reveals
- Professional hover states with pharmaceutical glow effects

### Service Pages (Light Theme - 8 Pages)

#### Common Design Pattern
All 8 service pages follow this pharmaceutical-appropriate structure:

```tsx
// Standard service page structure
<div className="min-h-screen bg-light-bg">
  {/* Universal Learning Ladder Animation */}
  <LearningLadder />
  
  {/* Service-Specific Background Patterns */}
  <ServiceSpecificPatterns />
  
  {/* Hero Section */}
  <section className="bg-gradient-to-br from-pharma-primary to-blue-800">
    {/* Professional pharmaceutical hero content */}
  </section>
  
  {/* Capabilities/Process Sections */}
  <section className="py-20 bg-light-card">
    {/* Service-specific content with pharmaceutical styling */}
  </section>
  
  {/* CTA Section */}
  <section className="bg-pharma-gradient">
    {/* Professional consultation call-to-action */}
  </section>
</div>
```

#### Page-Specific Implementations

**1. Pharmaceutical Engineering Page**
- **Molecular Network Animation**: Engineering systems integration visualization
- **Color Scheme**: Engineering green (#059669) with pharmaceutical blue
- **Special Components**: Interactive engineering molecule network
- **Imagery Fallback**: Engineering-themed CSS gradients

**2. GxP Applications Page**
- **Code Flow Animation**: Software development visualization
- **Color Scheme**: Technology blue with pharmaceutical compliance green
- **Special Components**: Animated code blocks and development workflows
- **Professional Focus**: Software validation and pharmaceutical compliance

**3. Project Management Page**
- **Timeline Animation**: Project progression with pharmaceutical milestones
- **Color Scheme**: Professional blue with success green indicators
- **Special Components**: Interactive project timeline and milestone tracking
- **Management Focus**: Pharmaceutical project lifecycle visualization

**4. Audit & Compliance Page**
- **Compliance Checklist Animation**: Sequential validation item reveals
- **Color Scheme**: Compliance red (#DC2626) with pharmaceutical blue
- **Special Components**: Floating compliance icons, comparison tables
- **Regulatory Focus**: Professional audit readiness visualization

**5. Software Validation Page**
- **Validation Flow Animation**: CSV process step visualization
- **Color Scheme**: Validation green with pharmaceutical primary blue
- **Special Components**: Interactive validation workflow diagrams
- **Technical Focus**: Computer system validation processes

**6. Training Programs Page**
- **Knowledge Growth Animation**: Educational progression visualization
- **Color Scheme**: Education purple with pharmaceutical green
- **Special Components**: Training module progressions, certification displays
- **Educational Focus**: Professional pharmaceutical training pathways

**7. Regulatory Support Page**
- **Regulatory Timeline**: Submission process visualization
- **Color Scheme**: Regulatory blue with compliance indicators
- **Special Components**: Regulatory milestone tracking, submission workflows
- **Compliance Focus**: Pharmaceutical regulatory submission processes

**8. Digital Training Page**
- **Interactive Learning**: Digital module progression animation
- **Color Scheme**: Digital purple with pharmaceutical brand colors
- **Special Components**: Online learning platform visualization
- **Technology Focus**: Digital pharmaceutical education delivery

### About & Contact Pages

#### About Page Design Implementation
- **Company Story**: Professional pharmaceutical consulting narrative
- **Team Section**: Expert credentials with pharmaceutical industry focus
- **Values**: Pharmaceutical compliance and quality commitment visualization
- **Visual Elements**: Professional photography with pharmaceutical context

#### Contact Page Design Implementation
- **Professional Form**: Pharmaceutical consultation request structure
- **Contact Methods**: Multiple professional communication channels
- **Location Information**: Office locations with pharmaceutical industry context
- **CTA Integration**: Consultation booking with pharmaceutical service focus

---

## UI Components (Shadcn Integration)

### Button System Implementation

#### Primary Pharmaceutical Button
```tsx
// Pharmaceutical primary button
<Button className="light-button-primary bg-pharma-primary hover:bg-pharma-primary/90">
  {children}
</Button>
```

#### Secondary Pharmaceutical Button  
```tsx
// Pharmaceutical secondary button
<Button className="light-button-secondary border-pharma-primary text-pharma-primary">
  {children}
</Button>
```

### Card System Implementation

#### Pharmaceutical Professional Card
```tsx
// Enhanced pharmaceutical card
<Card className="pharma-card hover:shadow-xl transition-all duration-300">
  <CardHeader className="pb-4">
    <div className="w-12 h-12 bg-pharma-gradient rounded-xl flex items-center justify-center">
      <Icon className="w-6 h-6 text-white" />
    </div>
  </CardHeader>
  <CardContent>{content}</CardContent>
</Card>
```

### Form Components Implementation

#### Professional Pharmaceutical Forms
```tsx
// Pharmaceutical consultation form styling
<Form className="space-y-6">
  <FormField className="space-y-2">
    <Label className="text-light-primary font-medium">
      Professional Inquiry
    </Label>
    <Input className="bg-light-card border-light-border focus:border-pharma-primary" />
  </FormField>
</Form>
```

---

## Animation System

### Performance Optimization
- **GPU Acceleration**: All animations use `transform` and `opacity`
- **Smooth Timing**: Professional easing functions (ease-out, spring)
- **Pharmaceutical Appropriate**: Conservative motion respecting industry expectations
- **Accessibility**: Respects `prefers-reduced-motion` settings

### Animation Categories

#### 1. Scroll-Triggered Animations
```tsx
// Professional pharmaceutical scroll animations
const useScrollAnimation = () => {
  return useInView(ref, { 
    once: true, 
    amount: 0.2, // Conservative trigger point
    transition: { duration: 0.6, ease: "easeOut" }
  });
};
```

#### 2. Hover Interactions
```tsx
// Pharmaceutical professional hover states
<motion.div
  whileHover={{ 
    scale: 1.02, // Subtle professional enhancement
    boxShadow: "0 10px 30px rgba(30, 64, 175, 0.1)" // Pharmaceutical blue glow
  }}
  transition={{ duration: 0.3 }}
>
```

#### 3. Loading States
```tsx
// Pharmaceutical professional loading
<motion.div
  animate={{ rotate: 360 }}
  transition={{ 
    duration: 2, 
    repeat: Infinity, 
    ease: "linear" 
  }}
  className="w-6 h-6 border-2 border-pharma-primary border-t-transparent rounded-full"
/>
```

---

## Layout Patterns

### Grid Systems
- **Service Grids**: 1-4 column responsive grids for service showcases
- **Feature Lists**: 2-3 column layouts for capabilities and features
- **Content Sections**: Alternating left-right layouts for visual variety

### Spacing System Implementation
```css
/* Pharmaceutical spacing consistency */
.section-spacing { @apply py-20; } /* Major sections */
.content-spacing { @apply py-12; } /* Content areas */
.component-spacing { @apply py-6; } /* Components */
.element-spacing { @apply py-3; } /* Elements */
```

### Responsive Breakpoints
```css
/* Mobile-first pharmaceutical responsive design */
@media (min-width: 640px) { /* Tablet pharmaceutical workflows */ }
@media (min-width: 1024px) { /* Desktop pharmaceutical applications */ }
@media (min-width: 1280px) { /* Large pharmaceutical workstations */ }
```

---

## Image Handling System

### Enhanced ImageWithFallback Component
**Purpose**: Professional pharmaceutical image handling with intelligent fallbacks

#### Implementation
```tsx
// Pharmaceutical-themed image fallback system
<ImageWithFallback
  src="external-pharmaceutical-image.jpg"
  alt="Professional pharmaceutical content"
  className="w-full h-64 object-cover rounded-xl"
  fallbackType="pharmaceutical" // pharmaceutical, engineering, compliance, training
/>
```

#### Fallback Design Types
1. **Pharmaceutical**: Blue gradient with medical icons
2. **Engineering**: Green gradient with engineering icons  
3. **Compliance**: Red gradient with compliance icons
4. **Training**: Purple gradient with education icons
5. **Generic**: Professional gray gradient

#### Professional Fallback Styling
```tsx
// CSS gradient fallback with pharmaceutical patterns
<div style={{
  background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 30%, #60A5FA 70%)',
  backgroundImage: 'pharmaceutical-pattern-overlay.svg'
}}>
  <PharmaceuticalIcon />
  <ProfessionalDescription />
</div>
```

---

## Best Practices

### Design Consistency
1. **Color Usage**: Always use CSS custom properties for pharmaceutical brand colors
2. **Typography**: Maintain pharmaceutical document-appropriate font weights and sizes
3. **Spacing**: Use consistent spacing scale for professional layouts
4. **Animation**: Conservative, professional motion appropriate for pharmaceutical industry

### Performance Guidelines
1. **Lazy Loading**: Implement for pharmaceutical content images
2. **Animation Optimization**: GPU-accelerated professional animations only
3. **Code Splitting**: Page-level splitting for pharmaceutical service sections
4. **Bundle Optimization**: Minimize bundle size for pharmaceutical industry networks

### Accessibility Standards
1. **Color Contrast**: WCAG AA compliance for pharmaceutical documentation
2. **Keyboard Navigation**: Full pharmaceutical workflow keyboard accessibility
3. **Screen Reader Support**: Comprehensive ARIA for pharmaceutical technical content
4. **Motion Sensitivity**: Respect pharmaceutical user accessibility preferences

### Pharmaceutical Industry Standards
1. **Professional Appearance**: Conservative design appropriate for regulated industry
2. **Trust Indicators**: Visual elements that reinforce pharmaceutical expertise
3. **Compliance Visual Language**: Colors and patterns suggesting regulatory compliance
4. **International Compatibility**: Design works across global pharmaceutical markets

---

## Component Interaction Patterns

### Professional User Flows
1. **Landing Discovery**: Dark theme → Service exploration motivation
2. **Service Deep Dive**: Light theme → Detailed pharmaceutical service information
3. **Consultation Request**: Professional contact forms → Business engagement
4. **Trust Building**: Credentials display → Pharmaceutical industry credibility

### State Management
- **Theme State**: Route-based automatic theme switching
- **Animation State**: Intersection observer for professional scroll triggers
- **Form State**: Professional pharmaceutical consultation form handling
- **Loading State**: Pharmaceutical-appropriate loading indicators

This implementation guide demonstrates how the pharmaceutical design system is consistently applied across all components, maintaining professional industry standards while providing modern user experience through thoughtful design patterns and conservative but effective animations.


# Styling Patterns & Component Variants

## CSS Architecture Overview

### Tailwind V4 Custom Implementation
The pharmaceutical design system uses a hybrid approach combining:
- **CSS Custom Properties**: Theme variables and pharmaceutical brand colors
- **Tailwind Utilities**: Responsive design and spacing
- **Component Classes**: Reusable pharmaceutical UI patterns
- **Theme-Specific Variants**: Dark/light mode implementations

---

## Theme-Specific Styling Patterns

### 1. Dark Theme (Landing Page)

#### Background & Container Patterns
```css
/* Dark theme containers */
.dark-hero-section {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #374151 100%);
  color: var(--color-dark-primary-text);
}

.dark-card-container {
  background-color: var(--color-dark-card);
  border: 1px solid var(--color-dark-border);
  border-radius: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 12px;
}

/* Dark theme pharmaceutical gradients */
.dark-pharma-gradient {
  background: linear-gradient(135deg, var(--color-pharma-primary) 0%, #1E40AF 50%, #3B82F6 100%);
}
```

#### Interactive Element Patterns
```css
/* Dark theme buttons */
.dark-button-primary {
  background-color: var(--color-dark-cta);
  color: #FFFFFF;
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.dark-button-primary:hover {
  background-color: #2563eb;
  box-shadow: 0 0 0 1px var(--color-dark-cta), 0 0 8px rgba(59, 130, 246, 0.4);
  transform: translateY(-1px);
}

/* Dark theme pharmaceutical glow effects */
.dark-pharma-glow:hover {
  box-shadow: 0 0 20px rgba(30, 64, 175, 0.3);
}
```

### 2. Light Theme (Service Pages)

#### Professional Container Patterns
```css
/* Light theme professional containers */
.light-section-container {
  background-color: var(--color-light-bg);
  color: var(--color-light-primary-text);
  padding: 5rem 0; /* 80px pharmaceutical section spacing */
}

.light-card-professional {
  background-color: var(--color-light-card);
  border: 1px solid var(--color-light-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 12px;
  transition: all 0.3s ease;
}

.light-card-professional:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 24px;
  transform: translateY(-2px);
}
```

#### Service-Specific Color Patterns
```css
/* Pharmaceutical Engineering (Green) */
.engineering-accent {
  color: var(--color-pharma-secondary); /* #059669 */
  background: linear-gradient(135deg, #059669 0%, #10B981 50%, #34D399 100%);
}

/* Compliance & Audit (Red) */
.compliance-accent {
  color: var(--color-pharma-accent); /* #DC2626 */
  background: linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #F87171 100%);
}

/* Training & Education (Purple) */
.training-accent {
  color: #7C3AED;
  background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 50%, #A78BFA 100%);
}
```

---

## Component-Specific Styling Patterns

### 1. Service Page Hero Sections

#### Common Hero Pattern
```tsx
// Standard pharmaceutical service hero structure
<section className="relative bg-gradient-to-br from-pharma-primary to-blue-800 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
  <div className="absolute inset-0 bg-black/20" />
  <div className="absolute inset-0 bg-gradient-to-r from-pharma-primary/20 to-transparent" />
  
  <div className="max-w-7xl mx-auto relative z-10">
    {/* Hero content with pharmaceutical styling */}
  </div>
</section>
```

#### Hero Styling Classes
```css
.pharma-hero-overlay {
  background: linear-gradient(
    135deg, 
    rgba(30, 64, 175, 0.9) 0%, 
    rgba(59, 130, 246, 0.8) 50%, 
    rgba(96, 165, 250, 0.7) 100%
  );
}

.pharma-hero-content {
  z-index: 10;
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
}
```

### 2. Service Grid Components

#### Service Card Pattern
```tsx
// Pharmaceutical service card structure
<motion.div
  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-light-color hover:border-pharma-primary/30"
  whileHover={{ 
    scale: 1.05,
    boxShadow: "0 20px 40px rgba(30, 64, 175, 0.1)"
  }}
>
  <motion.div 
    className="w-16 h-16 bg-gradient-to-br from-pharma-primary to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300"
    whileHover={{ rotate: 360 }}
    transition={{ duration: 0.6 }}
  >
    {serviceIcon}
  </motion.div>
  
  <h3 className="text-xl font-bold text-light-primary mb-4 group-hover:text-pharma-primary transition-colors">
    {serviceTitle}
  </h3>
  
  <p className="text-light-secondary leading-relaxed">
    {serviceDescription}
  </p>
</motion.div>
```

#### Service Grid CSS Classes
```css
.service-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.service-card-icon {
  width: 4rem;
  height: 4rem;
  background: var(--pharma-gradient);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.service-card-icon:hover {
  transform: scale(1.1) rotate(360deg);
}
```

### 3. Form Components

#### Professional Pharmaceutical Forms
```tsx
// Pharmaceutical consultation form pattern
<form className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-light-border">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <label className="text-light-primary font-medium text-sm">
        Company Name *
      </label>
      <input 
        className="w-full px-4 py-3 border border-light-border rounded-xl focus:border-pharma-primary focus:ring-2 focus:ring-pharma-primary/20 transition-all"
        placeholder="Your pharmaceutical company"
      />
    </div>
  </div>
</form>
```

#### Form Styling Classes
```css
.pharma-form-container {
  background-color: var(--color-light-card);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--color-light-border);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 12px;
}

.pharma-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-light-border);
  border-radius: 0.75rem;
  background-color: var(--color-light-card);
  transition: all 0.2s ease;
}

.pharma-input:focus {
  border-color: var(--color-pharma-primary);
  box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.1);
  outline: none;
}

.pharma-label {
  display: block;
  font-weight: 500;
  color: var(--color-light-primary-text);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}
```

---

## Animation-Specific Styling

### 1. Scroll-Triggered Animation Classes

#### Base Animation Utilities
```css
.animate-fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animate-fade-in-up.in-view {
  opacity: 1;
  transform: translateY(0);
}

.animate-scale-in {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.animate-scale-in.in-view {
  opacity: 1;
  transform: scale(1);
}
```

#### Pharmaceutical-Specific Animation Classes
```css
.pharma-reveal-left {
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.pharma-reveal-left.in-view {
  opacity: 1;
  transform: translateX(0);
}

.pharma-pulse-glow {
  animation: pharma-pulse 2s infinite;
}

@keyframes pharma-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(30, 64, 175, 0.4);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(30, 64, 175, 0);
  }
}
```

### 2. Hover & Interactive States

#### Professional Hover Patterns
```css
/* Pharmaceutical card hover enhancement */
.pharma-card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.pharma-card-hover:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(30, 64, 175, 0.08),
    0 0 0 1px rgba(30, 64, 175, 0.05);
}

/* Button interaction states */
.pharma-button-interactive {
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}

.pharma-button-interactive::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.pharma-button-interactive:hover::before {
  left: 100%;
}
```

---

## Responsive Design Patterns

### 1. Mobile-First Pharmaceutical Layout

#### Breakpoint-Specific Classes
```css
/* Mobile pharmaceutical layout (320px+) */
.pharma-mobile {
  padding: 1rem;
  font-size: 0.875rem;
}

.pharma-mobile .service-grid {
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet pharmaceutical layout (768px+) */
@media (min-width: 768px) {
  .pharma-tablet {
    padding: 1.5rem;
  }
  
  .pharma-tablet .service-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop pharmaceutical layout (1024px+) */
@media (min-width: 1024px) {
  .pharma-desktop {
    padding: 2rem;
  }
  
  .pharma-desktop .service-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

/* Large pharmaceutical workstation (1280px+) */
@media (min-width: 1280px) {
  .pharma-large {
    padding: 2.5rem;
  }
  
  .pharma-large .service-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem;
  }
}
```

### 2. Component-Specific Responsive Patterns

#### Service Page Responsive Layout
```css
.service-hero-responsive {
  padding: 4rem 1rem; /* Mobile */
}

@media (min-width: 640px) {
  .service-hero-responsive {
    padding: 5rem 1.5rem; /* Tablet */
  }
}

@media (min-width: 1024px) {
  .service-hero-responsive {
    padding: 6rem 2rem; /* Desktop */
  }
}

.service-content-responsive {
  display: grid;
  grid-template-columns: 1fr; /* Mobile single column */
  gap: 2rem;
}

@media (min-width: 1024px) {
  .service-content-responsive {
    grid-template-columns: 1fr 1fr; /* Desktop two columns */
    gap: 4rem;
  }
}
```

---

## Image & Media Patterns

### 1. Professional Image Styling

#### Image Container Patterns
```css
.pharma-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  background: var(--color-light-card);
  border: 1px solid var(--color-light-border);
}

.pharma-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom, 
    transparent 0%, 
    rgba(30, 64, 175, 0.1) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.pharma-image-container:hover .pharma-image-overlay {
  opacity: 1;
}
```

#### Fallback Image Styling
```css
.pharma-image-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--pharma-gradient);
  color: white;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
}

.pharma-image-fallback::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Ccircle cx='51' cy='51' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 60px 60px;
  opacity: 0.2;
}
```

---

## Accessibility & Professional Standards

### 1. Focus States & Keyboard Navigation

#### Professional Focus Patterns
```css
.pharma-focus {
  outline: none;
  transition: box-shadow 0.2s ease;
}

.pharma-focus:focus {
  box-shadow: 
    0 0 0 2px var(--color-light-card),
    0 0 0 4px var(--color-pharma-primary);
}

.pharma-focus:focus-visible {
  box-shadow: 
    0 0 0 2px var(--color-light-card),
    0 0 0 4px var(--color-pharma-primary),
    inset 0 0 0 1px var(--color-pharma-primary);
}
```

### 2. High Contrast & Color Accessibility

#### WCAG Compliant Color Patterns
```css
/* High contrast text combinations */
.pharma-high-contrast {
  color: var(--color-light-primary-text); /* #1F2937 - 14.91:1 contrast */
  background-color: var(--color-light-bg); /* #FAFAFA */
}

.pharma-accessible-link {
  color: var(--color-pharma-primary); /* #1E40AF */
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: text-decoration-color 0.2s ease;
}

.pharma-accessible-link:hover,
.pharma-accessible-link:focus {
  text-decoration-color: currentColor;
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .pharma-animation,
  .pharma-transition {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This comprehensive styling patterns documentation provides detailed implementation guidance for maintaining consistent pharmaceutical design aesthetics across all components while ensuring professional appearance, accessibility compliance, and industry-appropriate visual standards.





# Qualify IT Solutions - Pharmaceutical Consulting Website

A modern, responsive website for pharmaceutical validation, compliance, and engineering services built with React, Next.js, and Tailwind CSS.

![Qualify IT Solutions](https://img.shields.io/badge/Pharmaceutical-Consulting-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.0-blue)

## 🏥 About

Qualify IT Solutions provides expert pharmaceutical consulting services including:
- **Computer System Validation (CSV)** - 21 CFR Part 11 compliance
- **Commissioning & Qualification (CQV)** - Complete facility validation
- **Excel Sheet Validation** - Critical spreadsheet validation
- **Pharmaceutical Training** - GMP and compliance training programs

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Download/Clone the project**
   ```bash
   # If using Git
   git clone <repository-url>
   cd qualify-it-solutions
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or  
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎨 Features

### Design & User Experience
- **Dual Theme System**: Dark theme for landing page, light theme for service pages
- **Advanced Animations**: Smooth scroll-triggered animations with pharmaceutical styling
- **Responsive Design**: Mobile-first approach with seamless device adaptation
- **Professional Aesthetics**: Pharmaceutical industry-appropriate color schemes and layouts

### Technical Features
- **Smart Image Fallbacks**: Automatic CSS gradient fallbacks for offline development
- **Performance Optimized**: GPU-accelerated animations and efficient loading
- **Accessibility Focused**: WCAG compliant with proper contrast ratios and keyboard navigation
- **SEO Ready**: Semantic HTML structure with proper meta tags

### Service Pages
1. **Pharmaceutical Engineering** - Facility design and equipment engineering
2. **GxP Applications Development** - Custom pharmaceutical software solutions  
3. **Project Management** - End-to-end project coordination
4. **Audit & Compliance** - Regulatory readiness and compliance monitoring
5. **Software Validation** - Computer system validation services
6. **Training Programs** - Professional development and certification
7. **Regulatory Support** - Submission and regulatory guidance
8. **Digital Training** - Online learning modules and assessments

## 🖼️ Image Handling

### Local Development Solution
The website includes an enhanced `ImageWithFallback` component that automatically handles image loading issues:

```jsx
<ImageWithFallback
  src="external-image-url.jpg"
  alt="Professional description"
  className="w-full h-64 object-cover"
  fallbackType="pharmaceutical" // pharmaceutical, engineering, compliance, training
/>
```

### Fallback Types
- **pharmaceutical**: Blue gradient with medical icons
- **engineering**: Green gradient with engineering icons  
- **compliance**: Red gradient with compliance icons
- **training**: Purple gradient with education icons
- **generic**: Professional gray gradient

## 🎯 Page Structure

```
├── Landing Page (Dark Theme)
│   ├── Hero with futuristic animations
│   ├── Services overview
│   └── Why choose us section
│
├── Service Pages (Light Theme)
│   ├── Pharmaceutical Engineering
│   ├── GxP Applications  
│   ├── Project Management
│   ├── Audit & Compliance
│   ├── Software Validation
│   ├── Training Programs
│   ├── Regulatory Support
│   └── Digital Training
│
├── About Page
├── Contact Page  
└── Navigation System
```

## 🔧 Customization

### Theme Colors
Edit `/styles/globals.css` to modify colors:
```css
:root {
  /* Dark Theme (Landing Page) */
  --dark-bg: #0F172A;
  --dark-primary: #FFFFFF;
  --dark-cta: #3B82F6;
  
  /* Light Theme (Service Pages) */
  --light-bg: #FAFAFA;
  --light-primary: #1F2937;
  --pharma-primary: #1E40AF;
}
```

### Animation Settings
Modify animations in `/components/animations/`:
- `ScrollAnimations.tsx` - Text reveals and scroll effects
- `LearningLadder.tsx` - Universal page transition animation
- `ServiceAnimations.tsx` - Service-specific visual effects

### Content Updates
Update service information in individual page components located in `/components/pages/`

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Static Export (Recommended)
```bash
npm run build
npm run export
```

### Deployment Platforms
- **Vercel** (Recommended for Next.js)
- **Netlify** (Great for static sites)
- **GitHub Pages** (Free hosting)
- **Any CDN** (After static export)

## 📁 Project Structure

```
qualify-it-solutions/
├── components/
│   ├── pages/              # Individual page components
│   ├── animations/         # Animation components
│   ├── figma/             # Enhanced image handling
│   └── ui/                # Reusable UI components
├── styles/
│   └── globals.css        # Theme and global styles
├── App.tsx               # Main application component
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🔍 Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 88+
- **Responsive**: Optimized for all screen sizes (320px - 4K)
- **Performance**: 60fps animations with GPU acceleration

## 🛠️ Development Tips

### Performance
- Images automatically fallback to CSS gradients
- Animations use `transform` and `opacity` for GPU acceleration
- Components are optimized for minimal re-renders

### Debugging
- Check browser console for any loading issues
- Use React Developer Tools for component debugging
- Network tab shows external resource loading status

### Accessibility
- All animations respect `prefers-reduced-motion`
- Proper ARIA labels and semantic HTML
- Keyboard navigation support
- High contrast mode compatibility

## 📞 Support & Contact

This is a professional pharmaceutical consulting website template. For customization or technical support:

- Review component documentation in code comments
- Check browser developer tools for specific errors
- Ensure all dependencies are properly installed
- Verify Node.js version compatibility

## 📄 License

MIT License - See LICENSE file for details

---

**🔬 Professional Use**: This website template is designed for pharmaceutical consulting businesses. All regulatory and compliance content should be reviewed by qualified professionals before production use.

**🎨 Design System**: Built with a comprehensive pharmaceutical industry design system including appropriate color schemes, typography, and interaction patterns.

**⚡ Performance**: Optimized for fast loading and smooth animations across all devices and connection speeds.