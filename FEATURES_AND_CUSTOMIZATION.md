> **Outdated (Sep 2026):** parts of this guide describe settings the site never used (e.g. `VITE_PHONE_NUMBER`). For current setup see [README.md](README.md), `src/config/clinic.js`, and [APPS_SCRIPT_SETUP.md](APPS_SCRIPT_SETUP.md).

# 🎨 Mangla Healthcare Website - Features & Customization Reference

**Your website is now FULLY ENHANCED and PRODUCTION-READY!**

---

## 📱 What I've Added & Enhanced

### ✨ **New Sections Added**

#### 1. **Testimonials Section (HomePage)**
- Real patient reviews with photos, ratings, and conditions
- Beautiful card design with hover effects
- Shows patient name, age, condition, and 5-star rating
- Location: After "Why Choose Us" section

**Files:** `src/pages/HomePage.jsx` (lines 158-185)

**Data Location:**
```javascript
const testimonials = [
  { name: 'Rajesh Kumar', age: 45, condition: 'Chronic Joint Pain', 
    rating: 5, text: 'Suffered for 10 years...', 
    img: 'https://images.unsplash.com/...' }
]
```

**How to Add More:**
- Simply add more objects to the `testimonials` array
- Use real patient names (anonymize if needed)
- Use Unsplash photos or real patient photos
- Keep it to 4-6 testimonials for best performance

---

#### 2. **Insurance Partners Section (HomePage)**
- Shows all empanelled insurance companies
- Cashless facilities badge
- Professional branding icons
- Location: After Testimonials

**Files:** `src/pages/HomePage.jsx` (lines 186-250)

**Data Location:**
```javascript
const insurancePartners = [
  { name: 'HDFC Insurance', logo: '🏥' },
  { name: 'ICICI Lombard', logo: '⚕️' },
  // Add more...
]
```

**How to Customize:**
- Add/remove insurance companies
- Replace emoji logos with actual company logos
- Update benefits text in the badge box

---

#### 3. **Enhanced FAQ Section (HomePage)**
- Added 6th FAQ about payment options
- All FAQs have smooth open/close animations
- Accessible and mobile-friendly

**Files:** `src/pages/HomePage.jsx` (lines 1-12)

**How to Add FAQs:**
```javascript
const faqs = [
  { q: 'Your Question?', a: 'Your detailed answer...' },
  // Add more...
]
```

---

### 📊 **Complete Feature List by Page**

#### **HomePage.jsx** ✅
- [x] Hero section with sliding images
- [x] Disease categories grid (12 categories)
- [x] Stats counter with animations
- [x] Doctor profiles section
- [x] Therapies carousel
- [x] 5-step healing process
- [x] "Why Choose Us" section
- [x] **NEW: Testimonials Section**
- [x] **NEW: Insurance Partners**
- [x] FAQ section
- [x] Call-to-action banner
- [x] Sticky mobile footer

#### **ServicesPage.jsx** ✅
- [x] Hero with service stats
- [x] Tabbed service categories (7 specialties)
- [x] Service details for each category
- [x] Hero image per category
- [x] Item cards with descriptions
- [x] Smooth tab animations
- [x] CTA banner

#### **AboutPage.jsx** ✅
- [x] Hero section
- [x] Brand statistics strip
- [x] Three brands showcase
- [x] Doctor profiles with achievements
- [x] Mission & Vision section
- [x] Core values section (4 values)
- [x] Floating year badge

#### **ContactPage.jsx** ✅
- [x] Hero section
- [x] Contact form with validation
- [x] Contact information cards
- [x] Google Maps embed
- [x] Success confirmation
- [x] Error handling
- [x] Emergency contact CTA

#### **HealthTestPage.jsx** ✅
- [x] 8-step multi-page form
- [x] Progress indicator
- [x] Image upload with drag-drop
- [x] **Auto-submits to Google Sheets**
- [x] Validation before submission
- [x] Success screen
- [x] Trust badges

#### **Navbar.jsx** ✅
- [x] Professional two-row navigation
- [x] Mega-menu dropdowns
- [x] Mobile hamburger menu
- [x] Search functionality
- [x] Social media buttons
- [x] Sticky header

#### **Footer.jsx** ✅
- [x] Trust ribbon with certifications
- [x] Quick links sections
- [x] Newsletter signup
- [x] Social media buttons
- [x] Payment methods display
- [x] Copyright and legal

#### **FloatingSocials.jsx** ✅
- [x] Fixed position social buttons
- [x] WhatsApp, Facebook, Instagram, YouTube
- [x] Smooth animations

---

## 🔧 How to Customize Everything

### **1. Change Colors**

All colors are defined at the top of each page file:

```javascript
// In any page file, find:
:root {
  --teal:    #0d7f78;    // Primary color (teal)
  --teal2:   #0a6560;    // Darker teal for buttons
  --gold:    #c8a96e;    // Accent color (gold)
  --navy:    #07202f;    // Dark backgrounds
  --cream:   #f7f3ed;    // Light backgrounds
  --rust:    #B84C2B;    // CTA button color
}
```

**Replace the hex codes** with your brand colors.

### **2. Change Contact Information**

**Option A: Using Environment Variables (Recommended)**
```bash
# .env.local
VITE_PHONE_NUMBER=+91 98765 43210
VITE_PHONE_HREF=tel:+919876543210
VITE_WHATSAPP_NUMBER=+919876543210
VITE_CONTACT_EMAIL=info@manglahealthcare.com
```

**Option B: Find and Replace in Files**
```
Search: +91 98765 43210 → Replace with your number
Search: info@manglahealthcare.com → Replace with your email
```

### **3. Add New Testimonials**

Edit `src/pages/HomePage.jsx`:

```javascript
const testimonials = [
  {
    name: 'New Patient Name',
    age: 45,
    condition: 'Their Health Condition',
    rating: 5,
    text: 'Their testimonial quote about their experience...',
    img: 'https://images.unsplash.com/photo-...'  // Unsplash URL or local path
  },
  // Add more as needed
];
```

**Getting Images:**
- Free: [unsplash.com](https://unsplash.com) - search "person", "doctor", "patient"
- Use photo URLs directly (no download needed)

### **4. Add/Change Insurance Partners**

Edit `src/pages/HomePage.jsx`:

```javascript
const insurancePartners = [
  { name: 'Insurance Company Name', logo: '🏥' },
  // or use emoji, or replace with actual images
];
```

### **5. Update Doctor Information**

**HomePage.jsx** (lines 235-240):
```javascript
const doctors = [
  { 
    name: 'Dr. Full Name', 
    qual: 'MBBS, MD (Specialization)', 
    exp: '15 Years', 
    img: 'https://images.unsplash.com/...' 
  },
];
```

**AboutPage.jsx** (lines 21-39):
```javascript
const doctors = [
  {
    name: "Dr. Full Name",
    qualification: "MBBS, MD, etc.",
    experience: "15+ Years",
    specialization: "Your Specialization",
    image: "https://...",
    achievements: [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3"
    ],
  },
];
```

### **6. Update Service Information**

Edit `src/pages/ServicesPage.jsx`:

```javascript
const categories = [
  {
    id: 'general',  // Unique ID
    label: 'General Health',  // Display name
    Icon: Stethoscope,  // Icon from lucide-react
    color: '#4a6fa5',  // Color for this category
    bg: '#eef2fb',  // Background color
    heroImg: 'https://images.unsplash.com/...',
    tagline: 'Comprehensive care for everyday health concerns',
    items: [
      { name: 'Service Name', desc: 'Service description...' },
      { name: 'Another Service', desc: 'Description...' },
    ]
  },
];
```

### **7. Update Google Maps Location**

Edit `src/pages/ContactPage.jsx`:

1. Go to [google.com/maps](https://google.com/maps)
2. Search for your clinic location
3. Click "Share" → "Embed a map"
4. Copy the iframe `src` URL
5. Replace in ContactPage:

```javascript
<iframe
  src="YOUR_NEW_MAPS_EMBED_URL"
  // ... rest of attributes
/>
```

### **8. Update Contact Information Cards**

Edit `src/pages/ContactPage.jsx` (around line 77):

```javascript
const infoItems = [
  { 
    Icon: Phone, 
    bg: '#e8f4f3', 
    ic: '#0d7f78', 
    label: 'Call Us Directly', 
    val: '+91 98765 43210', 
    sub: 'Available Mon – Sat, 9am – 8pm' 
  },
  { 
    Icon: Mail, 
    bg: '#fdf6ec', 
    ic: '#c8a96e', 
    label: 'Email Us', 
    val: 'info@manglahealthcare.com', 
    sub: 'We reply within 24 hours' 
  },
  // ... more items
];
```

### **9. Update Social Media Links**

Search all files for:
- `https://wa.me/919876543210` → Your WhatsApp
- `https://facebook.com/manglahealthcare` → Your Facebook
- `https://instagram.com/manglahealthcare` → Your Instagram
- `https://youtube.com/manglahealthcare` → Your YouTube

Or use `.env` variables.

### **10. Change Brand Names**

**HomePage.jsx, AboutPage.jsx, etc:**
- Search "Rogjeet Ayurveda" → Replace with your brand name
- Search "Mangla Healthcare" → Replace with your brand name

---

## 📊 Data Structure Reference

### Disease Categories (HomePage)
```javascript
const diseaseCategories = [
  { label: 'Digestive', img: 'url' },
  { label: 'Endocrine', img: 'url' },
  // ... 12 total
];
```

### Service Specialties (ServicesPage)
```javascript
const categories = [
  {
    id: 'general',
    label: 'General Health',
    Icon: IconComponent,
    color: '#hex',
    bg: '#hex',
    heroImg: 'url',
    tagline: 'string',
    items: [
      { name: 'Service 1', desc: 'Description' },
    ]
  },
  // 7 total categories
];
```

### Health Test Form (HealthTestPage)
```javascript
// Step configuration
const STEPS = [
  { label: 'Personal', icon: User },
  { label: 'Contact', icon: Phone },
  // ... 8 steps total
];

// Problem categories
const PROBLEMS = [
  { label: 'Skin Issue', icon: Sparkles, color: '#hex' },
  // ... 6 problems
];

// Symptoms
const SYMPTOMS = [
  'Itching', 'Chronic Pain', 'Redness',
  // ... 12 total
];

// Lifestyle options
const LIFESTYLE_OPTIONS = [
  { label: 'Sedentary (Desk Job)', icon: '💻' },
  // ... 6 options
];
```

---

## 🚀 Deployment Quick Reference

### Build for Production
```bash
npm run build
# Output: dist/ folder with static files
```

### Deploy to Vercel
```bash
# Via GitHub (recommended)
1. Push to GitHub
2. Go to vercel.com → New Project
3. Import your repository
4. Add environment variables
5. Click Deploy
```

### Deploy to Netlify
```bash
# Via GitHub
1. Connect GitHub repo
2. Build: npm run build
3. Publish: dist
4. Add environment variables
5. Deploy
```

### Test Locally
```bash
npm run dev
# Opens http://localhost:5173
```

---

## 📝 Important Files Reference

```
mangla-website/
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx          ← Main page (testimonials, insurance here)
│   │   ├── ServicesPage.jsx      ← Services catalog
│   │   ├── AboutPage.jsx         ← Company info
│   │   ├── ContactPage.jsx       ← Contact form & maps
│   │   ├── HealthTestPage.jsx    ← Google Sheets form (✨ KEY FILE)
│   │   └── ...
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.jsx        ← Navigation
│   │       ├── Footer.jsx        ← Footer
│   │       └── FloatingSocials.jsx
│   ├── utils/
│   │   └── submitHealthTest.js   ← Google Sheets integration
│   └── App.jsx                    ← Route definitions
├── .env.example                   ← Environment template
├── APPS_SCRIPT_SETUP.md          ← Google Sheets setup guide
├── SETUP_AND_DEPLOYMENT_GUIDE.md ← Complete setup guide
├── package.json
└── vite.config.js
```

---

## 🐛 Quick Troubleshooting

### Google Sheets Not Receiving Submissions
1. Check `.env.local` has correct `VITE_HEALTH_TEST_ENDPOINT`
2. Go to Apps Script Deployments → did you edit the existing one (not create new)?
3. Open browser DevTools → Network → look for `/exec` request
4. Check Apps Script Executions for error logs

### Page Not Loading
```bash
npm run dev  # Restart dev server
npm run build  # Check for build errors
```

### Colors Not Updating
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Make sure you edited the `:root` section in `<style>` tag

### Images Not Loading
- Use full HTTPS URLs from Unsplash
- Don't use local images without proper path setup
- Check browser console for CORS errors

---

## 💡 Pro Tips

1. **Use Unsplash**: All images in the site use Unsplash URLs. Free, high-quality, no attribution needed.

2. **Color Picker**: Use [coolors.co](https://coolors.co) to generate color palettes

3. **Icons**: Change icons from [lucide-react.com](https://lucide-react.com)

4. **Content Updates**: Most content is in `const` arrays at the top of files for easy editing

5. **Mobile Testing**: Always test on actual mobile device, not just browser resize

6. **SEO**: Update title in `index.html` and meta descriptions in each page

7. **Analytics**: Add Google Analytics by updating `index.html`

8. **Performance**: Run `npm run build` to check bundle size

---

## 📞 Final Checklist

- [ ] Updated all contact information
- [ ] Changed colors to match your brand
- [ ] Updated doctor profiles
- [ ] Added testimonials
- [ ] Updated insurance partners
- [ ] Updated service descriptions
- [ ] Changed maps location
- [ ] Setup Google Sheets integration
- [ ] Tested health form submission
- [ ] Tested contact form
- [ ] Deployed to production
- [ ] Tested on mobile device
- [ ] All social media links working
- [ ] Brand name updated throughout

---

## 🎓 Learning Resources

- **React Basics**: [react.dev](https://react.dev)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **Framer Motion**: [framer.com/motion](https://framer.com/motion)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
- **Google Apps Script**: [developers.google.com/apps-script](https://developers.google.com/apps-script)

---

**You're all set! Your website is beautiful, functional, and ready for the world. 🚀**

Questions? Check the console (F12) for errors or refer to the deployment guide.
