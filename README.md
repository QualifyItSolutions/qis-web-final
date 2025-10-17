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