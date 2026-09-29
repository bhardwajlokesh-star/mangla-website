import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coffee, Utensils, Apple, Leaf, Heart, Clock, Phone, Star, ShoppingCart,
  Plus, Minus, X, FlaskConical, Droplet, Wind, Zap, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ════════════════════════════════════════════════════════════
   HOSPITAL CAFE PAGE — AYURVEDIC WELLNESS NUTRITION
   - Menu with detailed nutritional info
   - Health benefits per dish
   - Ordering system
   - Chef profiles
   - Patient testimonials
   ════════════════════════════════════════════════════════════ */

/* Moon icon from lucide-react alternatives */
const Moon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const MENU_CATEGORIES = [
  {
    id: 'breakfast',
    name: 'Breakfast (6 AM - 10 AM)',
    icon: Coffee,
    color: '#f59e0b',
    items: [
      {
        id: 'pb-1',
        name: 'Golden Milk Khichdi',
        desc: 'Warm khichdi with turmeric, ghee, and digestive spices',
        price: '₹180',
        benefits: ['Boosts immunity', 'Anti-inflammatory', 'Easy digestion', 'Energy boost'],
        nutrition: 'Cal: 280 | Protein: 8g | Fiber: 4g | Vata↓'
      },
      {
        id: 'pb-2',
        name: 'Sattu Pancakes with Honey',
        desc: 'Roasted barley flour pancakes topped with raw honey',
        price: '₹150',
        benefits: ['High protein', 'Balances Pitta', 'Brain health', 'Blood sugar control'],
        nutrition: 'Cal: 220 | Protein: 12g | Fiber: 3g | Pitta↓'
      },
      {
        id: 'pb-3',
        name: 'Herb-Infused Oatmeal',
        desc: 'Organic oats with ashwagandha, dates, and warming spices',
        price: '₹140',
        benefits: ['Stress relief', 'Strength', 'Bone health', 'Sustained energy'],
        nutrition: 'Cal: 260 | Protein: 9g | Fiber: 5g | Vata↓'
      },
      {
        id: 'pb-4',
        name: 'Moong Sprout Salad',
        desc: 'Fresh sprouted moong with cucumber, coconut, and lime',
        price: '₹120',
        benefits: ['Detox', 'Enzyme-rich', 'Cooling', 'Liver support'],
        nutrition: 'Cal: 95 | Protein: 7g | Fiber: 3g | Pitta↓'
      },
      {
        id: 'pb-5',
        name: 'Ragi Porridge with Jaggery',
        desc: 'Millet porridge sweetened with jaggery and cardamom',
        price: '₹130',
        benefits: ['Iron-rich', 'Calcium boost', 'Energy', 'Diabetes-friendly'],
        nutrition: 'Cal: 240 | Protein: 8g | Iron: 4mg | Kapha↑'
      }
    ]
  },
  {
    id: 'lunch',
    name: 'Lunch (12 PM - 3 PM)',
    icon: Utensils,
    color: '#10b981',
    items: [
      {
        id: 'pl-1',
        name: 'Shali Rice with Ghee Ghee',
        desc: 'Premium aged rice with clarified butter and seasonal vegetables',
        price: '₹200',
        benefits: ['Easily digestible', 'Nourishing', 'Strengthening', 'Vata calming'],
        nutrition: 'Cal: 380 | Carbs: 52g | Healthy fats: 12g | Complete meal'
      },
      {
        id: 'pl-2',
        name: 'Mung Dal Soup with Spices',
        desc: 'Protein-rich lentil soup with curry leaves, turmeric, and ginger',
        price: '₹160',
        benefits: ['Cooling', 'Detoxifying', 'Protein boost', 'Pitta balance'],
        nutrition: 'Cal: 180 | Protein: 14g | Fiber: 8g | Alkalizing'
      },
      {
        id: 'pl-3',
        name: 'Baked Vegetables with Herbal Oil',
        desc: 'Seasonal organic vegetables baked in herb-infused sesame oil',
        price: '₹170',
        benefits: ['Nutrient-dense', 'Antioxidant', 'Digestive support', 'Cleansing'],
        nutrition: 'Cal: 150 | Fiber: 6g | Vitamins: A,C,K | Vegan'
      },
      {
        id: 'pl-4',
        name: 'Buttermilk Curry (Takra)',
        desc: 'Probiotic buttermilk-based curry with ginger and cumin',
        price: '₹140',
        benefits: ['Gut health', 'Digestive enzymes', 'Metabolism', 'Cooling'],
        nutrition: 'Cal: 120 | Probiotics: 2B CFU | Protein: 6g | Live cultures'
      },
      {
        id: 'pl-5',
        name: 'Barley & Vegetable Pulao',
        desc: 'Light grain with fresh peas, carrots, and warming spices',
        price: '₹190',
        benefits: ['Detox support', 'Weight management', 'Cholesterol control', 'Filling'],
        nutrition: 'Cal: 240 | Fiber: 7g | Protein: 9g | Low glycemic'
      }
    ]
  },
  {
    id: 'dinner',
    name: 'Dinner (6 PM - 9 PM)',
    icon: Moon,
    color: '#8b5cf6',
    items: [
      {
        id: 'pd-1',
        name: 'Creamy Sesame Soup',
        desc: 'Warm, nourishing soup with sesame, ginger, and medicinal herbs',
        price: '₹150',
        benefits: ['Sleep support', 'Relaxing', 'Joint care', 'Calcium rich'],
        nutrition: 'Cal: 180 | Calcium: 280mg | Omega-3: 1.5g | Warming'
      },
      {
        id: 'pd-2',
        name: 'Khichdi with Ghee & Vegetables',
        desc: 'Light, easily digestible comfort food with medicinal toppings',
        price: '₹140',
        benefits: ['Perfect digestion', 'Gentle on system', 'Calming', 'Detox meal'],
        nutrition: 'Cal: 220 | Protein: 7g | Balanced macros | Healing'
      },
      {
        id: 'pd-3',
        name: 'Spinach & Chickpea Stew',
        desc: 'Nutrient-dense greens with protein, cumin, and coriander',
        price: '₹160',
        benefits: ['Iron boost', 'Strength', 'Anti-anemia', 'Energy for recovery'],
        nutrition: 'Cal: 200 | Iron: 5mg | Protein: 12g | Vegetarian'
      },
      {
        id: 'pd-4',
        name: 'Teff Grain Bowl',
        desc: 'Ancient grain with steamed vegetables and tahini dressing',
        price: '₹170',
        benefits: ['Complete protein', 'Energy', 'Muscle recovery', 'Sustained fullness'],
        nutrition: 'Cal: 260 | Protein: 11g | Fiber: 6g | Nutrient-dense'
      },
      {
        id: 'pd-5',
        name: 'Warm Milk with Herbs',
        desc: 'Golden milk alternative with ashwagandha, saffron, and cardamom',
        price: '₹90',
        benefits: ['Deep sleep', 'Stress relief', 'Mood balance', 'Recovery'],
        nutrition: 'Cal: 120 | Calcium: 240mg | Adaptogens: Yes | Soothing'
      }
    ]
  },
  {
    id: 'juices',
    name: 'Fresh Herbal Juices',
    icon: Droplet,
    color: '#ec4899',
    items: [
      {
        id: 'pj-1',
        name: 'Beetroot & Ginger Cleanse',
        desc: 'Fresh beetroot with warming ginger and lemon',
        price: '₹120',
        benefits: ['Blood purifier', 'Iron boost', 'Circulation', 'Detox support'],
        nutrition: 'Cal: 65 | Iron: 1.5mg | Vitamin C: 15mg | Antioxidant'
      },
      {
        id: 'pj-2',
        name: 'Turmeric Golden Juice',
        desc: 'Turmeric, ginger, black pepper, coconut oil, and honey',
        price: '₹130',
        benefits: ['Anti-inflammatory', 'Immune boost', 'Joint health', 'Pain relief'],
        nutrition: 'Cal: 80 | Curcumin: 95mg | Vitamin C: 10mg | Superfood'
      },
      {
        id: 'pj-3',
        name: 'Citrus & Mint Refresh',
        desc: 'Orange, lemon, fresh mint, and raw honey',
        price: '₹100',
        benefits: ['Vitamin C', 'Cooling', 'Digestion', 'Refreshing'],
        nutrition: 'Cal: 55 | Vitamin C: 45mg | Natural sugars: 12g | Raw'
      },
      {
        id: 'pj-4',
        name: 'Wheatgrass & Tulsi Shot',
        desc: 'Concentrated wheatgrass juice with holy basil',
        price: '₹150',
        benefits: ['Liver detox', 'Oxygen boost', 'Immunity', 'Chlorophyll'],
        nutrition: 'Cal: 35 | Chlorophyll: High | Enzymes: Active | Potent'
      },
      {
        id: 'pj-5',
        name: 'Pomegranate & Hibiscus',
        desc: 'Antioxidant-rich pomegranate with cooling hibiscus',
        price: '₹140',
        benefits: ['Antioxidant', 'Heart health', 'Circulation', 'Cooling'],
        nutrition: 'Cal: 90 | Polyphenols: High | Vitamin C: 20mg | Pure'
      }
    ]
  },
  {
    id: 'snacks',
    name: 'Healthy Snacks',
    icon: Apple,
    color: '#3b82f6',
    items: [
      {
        id: 'ps-1',
        name: 'Roasted Chickpea Nuts',
        desc: 'Organic chickpeas roasted with spices, salt-free',
        price: '₹80',
        benefits: ['Protein snack', 'Energy boost', 'Sustained fullness', 'Clean eating'],
        nutrition: 'Cal: 180 | Protein: 12g | Fiber: 6g | Natural'
      },
      {
        id: 'ps-2',
        name: 'Dates & Walnut Balls',
        desc: 'Energy balls with dates, walnuts, and cardamom',
        price: '₹100',
        benefits: ['Natural energy', 'Brain food', 'Mood boost', 'Antioxidant'],
        nutrition: 'Cal: 160 | Omega-3: 1g | Fiber: 3g | Vegan'
      },
      {
        id: 'ps-3',
        name: 'Cucumber & Herb Sticks',
        desc: 'Fresh cucumber with herb-based yogurt dip',
        price: '₹90',
        benefits: ['Cooling', 'Hydrating', 'Low calorie', 'Digestive'],
        nutrition: 'Cal: 45 | Hydration: High | Enzymes: Yes | Fresh'
      },
      {
        id: 'ps-4',
        name: 'Seasonal Fruit Plate',
        desc: 'Assorted organic fruits selected by Ayurvedic principles',
        price: '₹150',
        benefits: ['Vitamins', 'Natural hydration', 'Fiber', 'Seasonal balance'],
        nutrition: 'Cal: 120 | Fiber: 4g | Natural sugars: 22g | Organic'
      },
      {
        id: 'ps-5',
        name: 'Herbal Biscuits',
        desc: 'Whole grain biscuits with ashwagandha and jaggery',
        price: '₹70',
        benefits: ['Energy', 'Stress relief', 'Bone health', 'Portable'],
        nutrition: 'Cal: 140 | Fiber: 2g | Adaptogens: Yes | Whole grain'
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Healing Desserts',
    icon: Heart,
    color: '#f43f5e',
    items: [
      {
        id: 'pdh-1',
        name: 'Sesame Ladoo',
        desc: 'Traditional sesame balls with jaggery and ghee',
        price: '₹120',
        benefits: ['Calcium boost', 'Bone health', 'Joint support', 'Traditional'],
        nutrition: 'Cal: 200 | Calcium: 320mg | Sesame: Full | Ghee: Quality'
      },
      {
        id: 'pdh-2',
        name: 'Coconut & Jaggery Halwa',
        desc: 'Slow-roasted coconut with organic jaggery and ghee',
        price: '₹110',
        benefits: ['Nourishing', 'Warming', 'Satisfaction', 'Digestive spices'],
        nutrition: 'Cal: 190 | Healthy fats: 8g | Natural: Yes | Portion: Mindful'
      },
      {
        id: 'pdh-3',
        name: 'Rice Kheer with Cardamom',
        desc: 'Creamy rice pudding with milk, dates, and ground cardamom',
        price: '₹130',
        benefits: ['Calming', 'Sleep support', 'Nourishing', 'Comfort food'],
        nutrition: 'Cal: 210 | Protein: 8g | Calcium: 180mg | Mild sweetness'
      },
      {
        id: 'pdh-4',
        name: 'Date & Almond Energy Bars',
        desc: 'No-bake bars with dates, almonds, and cinnamon',
        price: '₹100',
        benefits: ['Energy', 'Whole food', 'No sugar added', 'Portable'],
        nutrition: 'Cal: 180 | Protein: 6g | Fiber: 4g | Plant-based'
      },
      {
        id: 'pdh-5',
        name: 'Honey-Sesame Brittle',
        desc: 'Crispy sesame brittle with raw honey and coconut oil',
        price: '₹110',
        benefits: ['Calcium', 'Antioxidant', 'Sweet satisfaction', 'Ancient recipe'],
        nutrition: 'Cal: 170 | Sesame: High | Honey: Raw | Crunchy'
      }
    ]
  }
];

const HEALTH_BENEFITS = [
  {
    icon: Heart,
    title: 'Dosha-Balanced',
    desc: 'Every meal designed to balance Vata, Pitta, and Kapha according to your constitution'
  },
  {
    icon: FlaskConical,
    title: 'Organic Sourcing',
    desc: 'All ingredients sourced from certified organic farms within 200km radius'
  },
  {
    icon: Leaf,
    title: 'Medicinal Herbs',
    desc: 'Each dish incorporates therapeutic herbs that support specific health conditions'
  },
  {
    icon: Droplet,
    title: 'Bioavailability',
    desc: 'Prepared with traditional cooking methods that maximize nutrient absorption'
  },
  {
    icon: Wind,
    title: 'Digestive Support',
    desc: 'Spices chosen to enhance digestion and promote healthy gut bacteria'
  },
  {
    icon: Zap,
    title: 'Energy Optimization',
    desc: 'Meals timed and composed to support natural circadian rhythm and energy cycles'
  }
];

const CHEF_PROFILES = [
  {
    name: 'Chef Rajendra Singh',
    role: 'Head Chef & Ayurvedic Culinary Expert',
    exp: '18 years',
    specialty: 'Panchakarma Therapeutic Diets',
    bio: 'Trained at Kerala Ayurveda Institute, specialized in therapeutic meal planning for post-treatment recovery.'
  },
  {
    name: 'Dr. Meera Patel',
    role: 'Nutritionist & Dietician',
    exp: '12 years',
    specialty: 'Personalized Diet Plans',
    bio: 'MD in Nutrition, creates customized menus for specific health conditions and treatment protocols.'
  }
];

const PATIENT_TESTIMONIALS = [
  {
    name: 'Arun Sharma',
    condition: 'Digestive Issues',
    text: 'The hospital café food has been a game-changer. I can actually digest everything without discomfort. The khichdi and soups are exactly what my system needed.',
    rating: 5
  },
  {
    name: 'Rajshree Verma',
    condition: 'Post-Surgery Recovery',
    text: 'After my Panchakarma, the tailored café meals made all the difference in my recovery. Every item was so carefully chosen. Highly recommend!',
    rating: 5
  },
  {
    name: 'Vikram Gupta',
    condition: 'Chronic Inflammation',
    text: 'The anti-inflammatory meals have reduced my joint pain significantly. The turmeric juice and herbal preparations are genuinely healing.',
    rating: 5
  }
];

const HospitalCafePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('breakfast');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const currentCategory = MENU_CATEGORIES.find(c => c.id === selectedCategory);
  const currentItems = currentCategory?.items || [];

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c =>
        c.id === item.id ? { ...c, qty: c.qty + 1 } : c
      ));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const updateQty = (itemId, delta) => {
    setCart(cart.map(c =>
      c.id === itemId
        ? { ...c, qty: Math.max(1, c.qty + delta) }
        : c
    ).filter(c => c.qty > 0));
  };

  const totalPrice = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace('₹', ''));
    return sum + (price * item.qty);
  }, 0);

  return (
    <>
      <div style={{ background: '#fff' }}>
        {/* ══ HERO ══ */}
        <section style={{ position: 'relative', overflow: 'hidden', background: '#07202f', minHeight: 480, display: 'flex', alignItems: 'center', paddingTop: 80 }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1920&q=80"
              alt="Ayurvedic Cafe"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at bottom, rgba(13,127,120,0.4), rgba(7,32,47,0.8))' }} />
          </div>

          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p style={{ fontSize: 14, color: '#c8a96e', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Hospital Nutrition</p>
              <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 20 }}>
                Ayurvedic Café & Wellness Kitchen
              </h1>
              <p style={{ fontSize: 18, color: 'rgba(247,243,237,0.8)', maxWidth: 700, margin: '0 auto 30px', lineHeight: 1.6 }}>
                Therapeutic nutrition designed by Ayurvedic doctors. Every meal is medicine, every bite is healing.
              </p>
            </motion.div>

            <motion.div
              style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <button
                onClick={() => setCartOpen(!cartOpen)}
                style={{
                  background: 'linear-gradient(135deg, #0d7f78, #0a6a65)',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.3s'
                }}
              >
                <ShoppingCart size={20} />
                Order Now ({cart.length})
              </button>
              <Link
                to="/contact"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  border: '2px solid rgba(255,255,255,0.3)',
                  padding: '12px 28px',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.3s'
                }}
              >
                <Phone size={20} />
                Request Delivery
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ══ HEALTH BENEFITS ══ */}
        <section style={{ padding: '80px 24px', background: '#f7f3ed' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.div style={{ textAlign: 'center', marginBottom: 60 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <p style={{ fontSize: 14, color: '#0d7f78', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Why Our Café</p>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 700, color: '#07202f', marginBottom: 16 }}>Therapeutic Nutrition Science</h2>
              <p style={{ fontSize: 16, color: '#64748b', maxWidth: 600, margin: '0 auto' }}>
                Every meal is formulated by Ayurvedic doctors to support healing, balance doshas, and enhance treatment outcomes.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
              {HEALTH_BENEFITS.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      background: '#fff',
                      padding: 32,
                      borderRadius: 16,
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.3s'
                    }}
                    whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(13,127,120,0.1)' }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                      <Icon size={24} color="#0d7f78" />
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#07202f', marginBottom: 10 }}>{benefit.title}</h3>
                    <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{benefit.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ MENU SELECTOR ══ */}
        <section style={{ padding: '80px 24px', background: '#fff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.div style={{ textAlign: 'center', marginBottom: 50 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 700, color: '#07202f' }}>Our Menu</h2>
              <p style={{ fontSize: 16, color: '#64748b', marginTop: 12 }}>Select a category to explore therapeutic meal options</p>
            </motion.div>

            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', marginBottom: 40, paddingBottom: 12 }}>
              {MENU_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      background: isActive ? cat.color : '#f1f5f9',
                      color: isActive ? '#fff' : '#07202f',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 14,
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s'
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Icon size={18} />
                    {cat.name.split('(')[0].trim()}
                  </motion.button>
                );
              })}
            </div>

            {/* Menu Items Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}
              >
                {currentItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      background: '#fff',
                      border: '2px solid #e2e8f0',
                      borderRadius: 16,
                      padding: 24,
                      transition: 'all 0.3s'
                    }}
                    whileHover={{ borderColor: currentCategory.color, boxShadow: `0 12px 24px rgba(${parseInt(currentCategory.color.slice(1, 3), 16)},${parseInt(currentCategory.color.slice(3, 5), 16)},${parseInt(currentCategory.color.slice(5, 7), 16)},0.1)` }}
                  >
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#07202f' }}>{item.name}</h3>
                        <span style={{ fontSize: 16, fontWeight: 700, color: currentCategory.color }}>{item.price}</span>
                      </div>
                      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>{item.desc}</p>
                    </div>

                    {/* Nutrition & Benefits */}
                    <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #e2e8f0' }}>
                      <p style={{ fontSize: 12, color: '#475569', fontWeight: 600, marginBottom: 8 }}>⚡ {item.nutrition}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {item.benefits.map((benefit, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: 11,
                              background: 'rgba(13,127,120,0.1)',
                              color: '#0d7f78',
                              padding: '4px 10px',
                              borderRadius: 6,
                              fontWeight: 500
                            }}
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        width: '100%',
                        background: currentCategory.color,
                        color: '#fff',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      + Add to Order
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ══ CHEF PROFILES ══ */}
        <section style={{ padding: '80px 24px', background: '#f7f3ed' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.div style={{ textAlign: 'center', marginBottom: 50 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 700, color: '#07202f' }}>Our Culinary Experts</h2>
              <p style={{ fontSize: 16, color: '#64748b', marginTop: 12 }}>Combining Ayurvedic wisdom with culinary mastery</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
              {CHEF_PROFILES.map((chef, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: 32,
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #0d7f78, #0a6a65)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
                    {chef.name.charAt(0)}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#07202f', marginBottom: 4 }}>{chef.name}</h3>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#0d7f78', marginBottom: 8 }}>{chef.role}</p>
                  <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>{chef.exp} of experience</p>
                  <p style={{ fontSize: 12, background: '#f0fdf4', color: '#166534', padding: '8px 12px', borderRadius: 6, marginBottom: 12, fontWeight: 500 }}>🌿 {chef.specialty}</p>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{chef.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section style={{ padding: '80px 24px', background: '#fff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.div style={{ textAlign: 'center', marginBottom: 50 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 700, color: '#07202f' }}>Patient Stories</h2>
              <p style={{ fontSize: 16, color: '#64748b', marginTop: 12 }}>How therapeutic nutrition has transformed their healing journeys</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {PATIENT_TESTIMONIALS.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: '#f8fafc',
                    borderRadius: 16,
                    padding: 24,
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} size={16} color="#f59e0b" fill="#f59e0b" />
                    ))}
                  </div>
                  <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, marginBottom: 16 }}>"{testimonial.text}"</p>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#07202f' }}>{testimonial.name}</p>
                    <p style={{ fontSize: 13, color: '#0d7f78', fontWeight: 500 }}>{testimonial.condition}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section style={{ padding: '80px 24px', background: '#f7f3ed' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.div style={{ textAlign: 'center', marginBottom: 50 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 700, color: '#07202f' }}>How to Order</h2>
              <p style={{ fontSize: 16, color: '#64748b', marginTop: 12 }}>Simple, delicious, therapeutic nutrition delivered to you</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {[
                { icon: ShoppingCart, title: 'Browse Menu', desc: 'Select from 25+ therapeutic meals organized by meal time' },
                { icon: Clock, title: 'Choose Time', desc: 'Pick your preferred delivery time: breakfast, lunch, or dinner' },
                { icon: Phone, title: 'Order Now', desc: 'Call +91 99926 54891 or message us your selections' },
                { icon: Utensils, title: 'Fresh Delivery', desc: 'Hot, fresh meals delivered to your room or home within 1 hour' },
                { icon: CheckCircle2, title: 'Personalization', desc: 'Let our nutritionist customize meals for your condition' },
                { icon: Heart, title: 'Feel Better', desc: 'Experience the therapeutic power of Ayurvedic nutrition' }
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      background: '#fff',
                      borderRadius: 16,
                      padding: 28,
                      border: '1px solid #e2e8f0',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: 12, background: 'linear-gradient(135deg, rgba(13,127,120,0.1), rgba(200,169,110,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <Icon size={28} color="#0d7f78" />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#07202f', marginBottom: 10 }}>{step.title}</h3>
                    <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #07202f, #0d7f78)', textAlign: 'center' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 700, color: '#fff', marginBottom: 20 }}>Ready to Heal with Food?</h2>
              <p style={{ fontSize: 16, color: 'rgba(247,243,237,0.8)', marginBottom: 32 }}>Order your first therapeutic meal today and experience the difference Ayurvedic nutrition can make.</p>

              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setCartOpen(!cartOpen)}
                  style={{
                    background: '#c8a96e',
                    color: '#07202f',
                    border: 'none',
                    padding: '14px 32px',
                    borderRadius: 10,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Order Now
                </button>
                <a
                  href="tel:+919992654891"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    border: '2px solid rgba(255,255,255,0.3)',
                    padding: '12px 32px',
                    borderRadius: 10,
                    fontSize: 16,
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ CART SIDEBAR ══ */}
        <AnimatePresence>
          {cartOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setCartOpen(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0,0,0,0.5)',
                  zIndex: 40
                }}
              />
              <motion.div
                initial={{ x: 400 }}
                animate={{ x: 0 }}
                exit={{ x: 400 }}
                style={{
                  position: 'fixed',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: 'min(400px, 100%)',
                  background: '#fff',
                  zIndex: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '-4px 0 12px rgba(0,0,0,0.1)'
                }}
              >
                {/* Header */}
                <div style={{ padding: 20, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#07202f' }}>Your Order</h3>
                  <button
                    onClick={() => setCartOpen(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Items */}
                <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
                  {cart.length === 0 ? (
                    <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: 40 }}>Your order is empty. Browse the menu above!</p>
                  ) : (
                    cart.map(item => {
                      const price = parseInt(item.price.replace('₹', ''));
                      return (
                        <div key={item.id} style={{ paddingBottom: 16, borderBottom: '1px solid #e2e8f0', marginBottom: 16 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <p style={{ fontSize: 14, fontWeight: 600, color: '#07202f' }}>{item.name}</p>
                            <p style={{ fontSize: 14, fontWeight: 700, color: '#0d7f78' }}>₹{price * item.qty}</p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              style={{ width: 28, height: 28, border: '1px solid #e2e8f0', background: '#fff', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Minus size={14} />
                            </button>
                            <span style={{ flex: 1, textAlign: 'center', fontWeight: 600, color: '#07202f' }}>{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              style={{ width: 28, height: 28, border: '1px solid #e2e8f0', background: '#fff', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                  <div style={{ padding: 20, borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
                    <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ color: '#64748b' }}>Subtotal</span>
                        <span style={{ fontWeight: 600, color: '#07202f' }}>₹{totalPrice}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Delivery</span>
                        <span style={{ fontWeight: 600, color: '#0d7f78' }}>Free</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                      <span style={{ fontWeight: 700, color: '#07202f', fontSize: 16 }}>Total</span>
                      <span style={{ fontWeight: 700, color: '#0d7f78', fontSize: 18 }}>₹{totalPrice}</span>
                    </div>
                    <a
                      href={`tel:+919992654891?body=I want to place order for items worth ₹${totalPrice}`}
                      style={{
                        display: 'block',
                        width: '100%',
                        background: 'linear-gradient(135deg, #0d7f78, #0a6a65)',
                        color: '#fff',
                        textAlign: 'center',
                        padding: '12px 16px',
                        borderRadius: 8,
                        fontWeight: 700,
                        textDecoration: 'none',
                        cursor: 'pointer',
                        marginBottom: 8
                      }}
                    >
                      Call to Confirm
                    </a>
                    <button
                      onClick={() => setCart([])}
                      style={{
                        width: '100%',
                        background: '#f1f5f9',
                        color: '#64748b',
                        border: 'none',
                        padding: '12px 16px',
                        borderRadius: 8,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Clear Cart
                    </button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default HospitalCafePage;
