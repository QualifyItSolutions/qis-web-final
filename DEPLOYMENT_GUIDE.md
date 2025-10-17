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