# 🏥 Mangla Healthcare Website - Complete Setup & Features Guide

**Last Updated**: May 26, 2026  
**Status**: ✅ Fully Enhanced & Production-Ready

---

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Features Overview](#features-overview)
3. [Google Sheets Integration](#google-sheets-integration)
4. [Environment Setup](#environment-setup)
5. [Deployment Guide](#deployment-guide)
6. [Customization Guide](#customization-guide)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Google Account (for Sheets integration)
- Vercel/Netlify account (for deployment) - optional

### Installation
```bash
# 1. Clone or navigate to your project
cd mangla-website

# 2. Install dependencies
npm install

# 3. Create .env.local from .env.example
cp .env.example .env.local

# 4. Update .env.local with your details
# - VITE_HEALTH_TEST_ENDPOINT (from Google Apps Script)
# - VITE_PHONE_NUMBER
# - VITE_CONTACT_EMAIL

# 5. Start development server
npm run dev

# Open http://localhost:5173
```

---

## ✨ Features Overview

### 1. **Homepage** - Complete Revamp
- ✅ Dynamic hero with multiple slides and parallax effects
- ✅ "What We Treat" disease categories (12 specialties)
- ✅ **Testimonials Section** - Real patient reviews with ratings
- ✅ **Insurance Partners** - Cashless facilities showcase
- ✅ Stats counter (20+ Years, 25,000+ Patients)
- ✅ Doctor profiles with specializations
- ✅ Therapies carousel (6 Ayurvedic treatments)
- ✅ 5-step healing process visualization
- ✅ "Why Choose Us" differentiators
- ✅ FAQ section with smooth animations
- ✅ CTA banner & sticky mobile bottom bar

**Key Enhancements:**
- Real patient testimonials with photos and ratings
- Insurance partner logos with cashless badge
- Better CTAs encouraging free health test
- Improved mobile responsiveness

### 2. **Services Page** - Detailed Specialities
- ✅ 7 service categories (General, Skin, Sexual Health, Piles, Joint, Diagnostics, Ayurveda)
- ✅ Tabbed interface for easy navigation
- ✅ Each service has:
  - Beautiful hero image
  - Tagline and description
  - 4-6 detailed service items
  - Service count and benefits badges
- ✅ Smooth animations between tabs
- ✅ CTA banner to book appointments

### 3. **Free Health Test** - Multi-Step Assessment
The form is an 8-step wizard that collects:
1. **Personal Info** - Name, Age, Gender
2. **Contact Details** - Phone (required), Email
3. **Primary Concern** - Skin, Sexual Health, Joint Pain, Digestive, Fever, Other
4. **Symptoms** - Multi-select from 12 common symptoms
5. **Lifestyle** - Activity level, smoking, diet, etc.
6. **Photo Upload** - Optional image of affected area
7. **Additional Notes** - Medications, allergies, diagnosis history
8. **Review & Submit** - Final verification before submission

**Features:**
- ✅ Real-time progress indicator (percentage & visual bar)
- ✅ Step dots showing completed/current/pending steps
- ✅ Beautiful step headers with icons
- ✅ Validation before submission
- ✅ **Automatically submits to Google Sheet**
- ✅ Success page with next steps
- ✅ Mobile-optimized form

### 4. **Contact Page** - Professional Communication
- ✅ Form with fields: Name, Phone, Email, Reason, Message
- ✅ Real-time validation with error messages
- ✅ Loading state with spinner
- ✅ Success confirmation showing customer details
- ✅ Contact info cards: Phone, Email, Address, Hours
- ✅ Google Maps embed showing clinic location
- ✅ Insurance & facilities information
- ✅ Emergency contact number prominently displayed

### 5. **About Page** - Brand Story
- ✅ Hero section with mission statement
- ✅ Our Story - Detailed history and values
- ✅ Meet Our Doctors - Doctor profiles with qualifications
- ✅ Our Brands - 3 sub-brands (Nursing Home, Nirogpeeth Ayurveda, Durgadevi Ultrasound)
- ✅ Core Values - Compassion, Integrity, Excellence, Community
- ✅ Brand testimonials and achievements

### 6. **Navigation** - Professional Navbar
- ✅ Two-row navigation design
- ✅ Primary nav: Home, Hospital, Panchkarma, Specialities, Pain Management, SPA, Yoga
- ✅ Secondary nav: Shop, Suvarnaprashan, Pathya, Garbh Sanskar, About, Contact
- ✅ Mega-menu dropdowns for complex categories
- ✅ Mobile hamburger menu with smooth animations
- ✅ Sticky header on scroll
- ✅ Search functionality
- ✅ Social media links
- ✅ Active page indicator

### 7. **Footer** - Complete Footer
- ✅ Trust ribbon with 4 certifications
- ✅ Quick links (6 categories × 6 links each)
- ✅ Newsletter signup
- ✅ Social media buttons
- ✅ Payment methods displayed
- ✅ Bottom copyright & legal links
- ✅ Beautiful gradient background with texture

### 8. **Floating Social Links** - Easy Contact
- ✅ Fixed position social buttons
- ✅ WhatsApp, Facebook, Instagram, YouTube
- ✅ Subtle animations and hover effects

### 9. **Mobile Bottom Bar** - Sticky CTA
- ✅ Two buttons: "Book Consultation" & "Call Us"
- ✅ Visible on mobile viewports only
- ✅ Always accessible

### 10. **Animations & Polish**
- ✅ Framer Motion animations throughout
- ✅ Scroll-triggered animations
- ✅ Parallax effects on hero
- ✅ Smooth page transitions
- ✅ Hover effects on interactive elements
- ✅ Loading states with spinners
- ✅ Success confirmations with checkmarks

---

## 📊 Google Sheets Integration

### What Happens?
When someone submits the Free Health Test form:
1. Data is sent to Google Apps Script
2. Script adds a new row to your Google Sheet
3. Sheet includes: timestamp, name, age, contact, problem, symptoms, lifestyle, image info, notes, source
4. You get real-time submissions for follow-up

### Setup Instructions

#### Step 1: Create Google Sheet
1. Open [sheets.new](https://sheets.new)
2. Rename sheet to "Mangla Health Test Submissions"
3. Add header row in Sheet1:
```
timestamp | name | age | gender | phone | email | problem | symptoms | lifestyle | hasImage | imageName | imageSize | notes | source | userAgent
```

#### Step 2: Create Apps Script
1. Click **Extensions → Apps Script**
2. Delete existing code and paste from `APPS_SCRIPT_SETUP.md`
3. **Save the project** and name it "ManglaHealthTest"

#### Step 3: Deploy as Web App
1. Click **Deploy → New Deployment**
2. Click gear icon → select **Web app**
3. Fill:
   - **Description**: "Health Test Sink v1"
   - **Execute as**: Your Google email
   - **Who has access**: "Anyone"
4. Click **Deploy** and authorize
5. **Copy the Web app URL** (looks like: `https://script.google.com/macros/s/AKfycb.../exec`)

#### Step 4: Add to Environment
**Method 1 - Environment File (Recommended):**
```bash
# Create .env.local
VITE_HEALTH_TEST_ENDPOINT=https://script.google.com/macros/s/YOUR_ID/exec
```

**Method 2 - Hard-code:**
Open `src/utils/submitHealthTest.js` and replace placeholder URL

#### Step 5: Test
1. Run `npm run dev`
2. Go to /health-test
3. Fill form and submit
4. Check your Google Sheet - should see new row appear within 1-2 seconds
5. If no row appears:
   - Open DevTools → Network tab
   - Look for request to `/exec`
   - Check Apps Script Executions tab for errors

#### Optional: Email Notifications
In Apps Script, uncomment the email lines to get notified on each submission:
```javascript
const EMAIL_TO = 'your@email.com';
```

---

## 🔧 Environment Setup

### Create `.env.local`
Copy from `.env.example` and fill in:

```env
# Google Sheets - REQUIRED for health test to work
VITE_HEALTH_TEST_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec

# Contact Information
VITE_PHONE_NUMBER=+91 98765 43210
VITE_PHONE_HREF=tel:+919876543210
VITE_WHATSAPP_NUMBER=+919876543210

# Optional but recommended
VITE_CONTACT_EMAIL=info@manglahealthcare.com
VITE_SITE_NAME=Mangla Healthcare
```

### How to Get Deployment ID?
From your Apps Script URL: `https://script.google.com/macros/s/**AKfycb27xZa...**  /exec`

Copy the bold part → paste into `VITE_HEALTH_TEST_ENDPOINT`

---

## 🚀 Deployment Guide

### Vercel (Recommended - Free tier available)

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/mangla-website.git
git push -u origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" → Import your GitHub repo
   - Framework: Vite
   - Click Import

3. **Add Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add all from your `.env.local`
   - Click Deploy

4. **Your site is live!**
   - Visit the provided URL
   - Google Sheets will still work

### Netlify

1. **Connect GitHub** (same as Vercel)
2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment Variables:**
   - Site settings → Build & deploy → Environment
   - Add your variables
4. **Deploy**

### Traditional Hosting (VPS, Bluehost, etc.)

```bash
# Build the project
npm run build

# The 'dist' folder contains static files
# Upload contents of 'dist' to your hosting

# For Apache:
# Make sure .htaccess routes to index.html for React Router

# .htaccess example:
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_FILENAME} -f [OR]
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ /index.html [L]
</IfModule>
```

---

## 🎨 Customization Guide

### Change Colors
Open any page file (e.g., `src/pages/HomePage.jsx`):
```javascript
// Find the Styles component and update:
:root {
  --teal:    #0d7f78;    // Main color
  --teal2:   #0a6560;    // Darker teal
  --gold:    #c8a96e;    // Accent
  --navy:    #07202f;    // Dark
  --cream:   #f7f3ed;    // Light background
}
```

### Change Contact Information
Search and replace in all files:
- Phone: `+91 98765 43210` → your number
- Email: `info@manglahealthcare.com` → your email

Or use environment variables (preferred).

### Add New Doctors
In `src/pages/HomePage.jsx`:
```javascript
const doctors = [
  { 
    name: 'Dr. Name', 
    qual: 'MBBS, MD', 
    exp: '10 Years', 
    img: 'https://images.unsplash.com/...'
  },
  // Add more...
];
```

### Add New Testimonials
In `src/pages/HomePage.jsx`:
```javascript
const testimonials = [
  {
    name: 'Patient Name',
    age: 45,
    condition: 'Health Condition',
    rating: 5,
    text: 'Their testimonial...',
    img: 'https://images.unsplash.com/...'
  },
  // Add more...
];
```

### Add Services
In `src/pages/ServicesPage.jsx`:
```javascript
const categories = [
  {
    id: 'new-service',
    label: 'New Service Name',
    Icon: IconComponent,
    color: '#hexcolor',
    items: [
      { name: 'Service 1', desc: 'Description...' },
    ]
  },
];
```

### Change Maps Location
In `src/pages/ContactPage.jsx`:
Find the iframe and update the embed code with your location coordinates

---

## 🐛 Troubleshooting

### Health Test Not Saving to Sheet
**Check 1:** Apps Script deployment
- Go to Apps Script → Deployments
- Click edit pencil
- Does URL match in `.env.local`?

**Check 2:** Redeployment mistake
- **Common error**: Creating a new deployment instead of new version
- Fix: Always click **Manage deployments → Edit → New version → Deploy**
- Keep the same URL!

**Check 3:** Browser console errors
- Open DevTools (F12)
- Go to Console tab
- Submit form and look for errors
- Check Network tab for failed requests

**Check 4:** Apps Script errors
- Go to Apps Script editor
- Click clock icon (Executions)
- Look at recent runs for error messages

### Forms Not Submitting
1. Check phone number format (minimum 10 digits)
2. Make sure all required fields are filled (red outline)
3. Check network connection
4. Try different browser

### Page Not Loading
1. Run `npm run build` to check for errors
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check console for errors (F12)
4. Restart dev server (npm run dev)

### Images Not Loading
1. Check Unsplash URLs are accessible
2. Verify image paths if using local images
3. Check CORS headers on server

### Mobile Layout Issues
1. Check the responsive breakpoints in CSS
2. Test on actual mobile device (not just browser resize)
3. Check viewport meta tags in index.html

---

## 📞 Support & Contact

- **Website Issues**: Check browser console (F12)
- **Deployment Help**: Reference the deployment section above
- **Custom Features**: Contact your developer

---

## 📝 Checklist Before Going Live

- [ ] Google Apps Script deployed and working
- [ ] `.env.local` configured with your details
- [ ] All contact numbers updated
- [ ] All emails updated
- [ ] Doctor profiles updated
- [ ] Maps location updated
- [ ] Insurance partners list updated
- [ ] Testimonials added
- [ ] Deployed to production
- [ ] Test health form submission
- [ ] Test contact form submission
- [ ] Test on mobile device
- [ ] All links working
- [ ] Social media links correct
- [ ] Images loading properly

---

## 🎯 Next Steps (Optional Enhancements)

- [ ] Add appointment booking system
- [ ] Create blog/resources section
- [ ] Add patient portal login
- [ ] Setup email notifications
- [ ] Add online payment integration
- [ ] Create admin dashboard
- [ ] Add chatbot for FAQs
- [ ] Setup analytics (Google Analytics)
- [ ] Add SEO optimization
- [ ] Create mobile app

---

**Version**: 1.0  
**Last Updated**: May 26, 2026  
**Status**: ✅ Production Ready

For questions or issues, refer to the troubleshooting section above or check your browser's developer console.
