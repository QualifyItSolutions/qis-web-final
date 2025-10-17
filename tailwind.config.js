/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './App.tsx',
    './index.tsx',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Color Scheme
        primary: {
          50: '#DBEAFE',   // Light Blue (Background, subtle highlights)
          500: '#2563EB',  // Primary Blue (Main buttons, links, primary actions)
          600: '#1E40AF',  // Secondary Blue (Hover states, secondary elements)
          700: '#1D4ED8',  // Darker Blue (Active states)
          900: '#1E3A8A',  // Darkest Blue (Text on light backgrounds)
        },
        // Supporting Colors
        neutral: {
          50: '#F9FAFB',   // Lightest Gray
          100: '#F3F4F6',  // Light Gray (Background, cards)
          200: '#E5E7EB',  // Border Gray
          300: '#D1D5DB',  // Medium Light Gray
          500: '#6B7280',  // Neutral Gray (Text, borders)
          600: '#4B5563',  // Medium Gray
          700: '#374151',  // Dark Gray
          800: '#1F2937',  // Darker Gray
          900: '#1F2937',  // Dark Gray (Headings, important text)
        },
        // Accent Colors
        success: {
          500: '#10B981',  // Success Green (Positive actions, success states)
          600: '#059669',
        },
        warning: {
          500: '#F59E0B',  // Warning Orange (Alerts, notifications)
          600: '#D97706',
        },
        error: {
          500: '#EF4444',    // Error Red (Errors, destructive actions)
          600: '#DC2626',
        },
        // Green color palette
        green: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        // Gray color palette
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Dark theme colors
        'dark-bg': '#0F172A',
        'dark-card': '#1E293B',
        'dark-primary': '#FFFFFF',
        'dark-secondary': '#94A3B8',
        'dark-positive': '#22C55E',
        'dark-negative': '#EF4444',
        'dark-cta': '#3B82F6',
        'dark-tag': '#334155',
        'dark-hover': '#1E2535',
        'dark-table-hover': '#1C2A3A',
        'dark-border': '#374151',
        // Light theme colors
        'light-bg': '#FAFAFA',
        'light-card': '#FFFFFF',
        'light-primary': '#1F2937',
        'light-secondary': '#6B7280',
        'light-positive': '#059669',
        'light-negative': '#DC2626',
        'light-cta': '#2563EB',
        'light-tag': '#F3F4F6',
        'light-hover': '#F9FAFB',
        'light-table-hover': '#F3F4F6',
        'light-border': '#E5E7EB',
        // Pharma brand colors
        'pharma-primary': '#1E40AF',
        'pharma-secondary': '#059669',
        'pharma-accent': '#DC2626',
        'pharma-neutral': '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}


