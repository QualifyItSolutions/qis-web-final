# Environment Setup Guide
## Qualify IT Solutions - Pharmaceutical Consulting Website

---

## ✅ Current Environment Status

**Application Status**: ✅ FULLY CONFIGURED AND RUNNING

The application is **fully functional** and does **NOT require** additional environment variable configuration for basic operation.

---

## 🔧 System Requirements

### Minimum Requirements:
- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher
- **Operating System**: macOS, Linux, or Windows
- **RAM**: 2GB minimum
- **Disk Space**: 500MB for node_modules

### Recommended:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **RAM**: 4GB or more
- **Disk Space**: 1GB

---

## 📦 Installation & Setup

### Step 1: Verify Node.js Installation

```bash
# Check Node.js version
node --version
# Expected: v16.0.0 or higher

# Check npm version
npm --version
# Expected: v8.0.0 or higher
```

### Step 2: Install Dependencies

```bash
# Navigate to project directory
cd qualify-it-solutions

# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

### Step 3: Start Development Server

```bash
# Start the development server
npm run dev

# Expected output:
# ▲ Next.js 14.2.32
# - Local: http://localhost:3000
# ✓ Ready in 3.7s
```

### Step 4: Access Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🌍 Environment Variables (Optional)

### Current Configuration

The application uses **hardcoded Supabase credentials** for public access:

```typescript
// lib/supabase.ts
const supabaseUrl = 'https://pkgybbdijmrxsgdskggb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

**Status**: ✅ Configured and working

### Optional Environment Variables

For production deployment, you may want to use environment variables:

#### Create `.env.local` file:

```bash
# Supabase Configuration (Optional - currently hardcoded)
NEXT_PUBLIC_SUPABASE_URL=https://pkgybbdijmrxsgdskggb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Email Service (Optional - currently logs to console)
RESEND_API_KEY=your_resend_api_key_here
# OR
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Analytics (Optional)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id_here

# API Configuration (Optional)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

#### Create `.env.production` file:

```bash
# Production Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-production-supabase.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key

# Production Email Service
RESEND_API_KEY=your_production_resend_key

# Production Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_production_analytics_id

# Production API
NEXT_PUBLIC_API_URL=https://your-production-domain.com
```

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

**Features:**
- Hot module reloading
- Source maps for debugging
- Detailed error messages
- Accessible at: `http://localhost:3000`

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

**Output:**
- Optimized bundle
- Minified code
- Production-ready assets
- Accessible at: `http://localhost:3000`

### Static Export

```bash
# Build and export as static site
npm run build
npm run export
```

**Output:**
- Static HTML files in `out/` directory
- Can be deployed to any static hosting
- No server required

---

## 🔍 Verification Checklist

After setup, verify the following:

- [ ] Node.js version is v16 or higher
- [ ] npm version is v8 or higher
- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts successfully
- [ ] Application accessible at `http://localhost:3000`
- [ ] Landing page loads with animations
- [ ] Service pages are accessible
- [ ] Enrollment form is functional
- [ ] No console errors in browser DevTools
- [ ] Images load or show fallback gradients

---

## 🐛 Troubleshooting

### Issue: Port 3000 Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
npm run dev -- -p 3001
```

### Issue: Dependencies Installation Fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### Issue: Build Fails with TypeScript Errors

```bash
# Check TypeScript configuration
npx tsc --noEmit

# Run linting
npm run lint

# Fix linting issues
npx eslint . --fix
```

### Issue: Images Not Loading

The application has built-in fallback gradients. If images don't load:
- Check browser console for network errors
- Verify internet connection
- Images will automatically show colored gradients as fallback

---

## 📊 Available Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build            # Build for production
npm start                # Start production server
npm run export           # Export as static site

# Code Quality
npm run lint             # Run ESLint
npm run lint -- --fix    # Fix linting issues

# Utilities
npm run clean            # Clean build artifacts
npm run type-check       # Check TypeScript types
```

---

## 🔐 Security Notes

### Current Configuration:
- ✅ Supabase anon key is public (by design)
- ✅ No sensitive credentials in code
- ✅ All API calls use HTTPS
- ✅ Row-level security configured in Supabase

### Production Recommendations:
1. Use environment variables for all credentials
2. Enable CORS restrictions
3. Implement rate limiting
4. Use HTTPS only
5. Regular security audits
6. Keep dependencies updated

---

## 📚 Additional Resources

### Documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

### Project Documentation:
- `README.md` - Project overview
- `DEPLOYMENT_GUIDE.md` - Deployment instructions
- `DATABASE_SETUP_GUIDE.md` - Database configuration
- `EMAIL_SETUP_GUIDE.md` - Email service setup
- `AUDIT_REPORT.md` - Comprehensive audit results

---

## ✅ Setup Complete

Your environment is now ready for development!

**Next Steps:**
1. Run `npm run dev`
2. Open `http://localhost:3000`
3. Start developing!

**Questions?** Check the documentation files or browser console for detailed error messages.

