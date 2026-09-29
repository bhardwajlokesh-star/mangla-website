import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, Check, Upload, Activity,
  AlertCircle, User, Phone, ShieldCheck,
  Heart, Brain, Bone, Droplets, Zap, Sparkles,
  CheckCircle2, Camera, FileImage, Trash2, Eye, Loader2
} from 'lucide-react';
import { submitHealthTest, makeReferenceId } from '../utils/submitHealthTest';
import { normalisePhone, isValidEmail, SUBMIT_ERRORS } from '../utils/sheetClient';
import { clinic } from '../config/clinic';
import SEO from '../components/SEO';

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

const INITIAL_FORM = {
  name: '', age: '', gender: '',
  phone: '', email: '',
  problem: '',
  symptoms: [],
  lifestyle: [],
  lifestyleNote: '',
  image: null, imageFile: null, imageName: '', imageSize: '',
  notes: '',
  consent: false,
  website: '' // honeypot — must stay empty; bots fill it
};



/* ─── Fonts + Styles ─── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #f7f3ed; }
    .ht-font-display { font-family: 'Cormorant Garamond', serif; }
    .ht-font-ui      { font-family: 'Space Grotesk', sans-serif; }
    .ht-font-body    { font-family: 'DM Sans', sans-serif; }

    @keyframes ht-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    .ht-input {
      width: 100%; padding: 14px 18px; border-radius: 14px;
      border: 2px solid #e2e8f0; background: #fff;
      font-family: 'DM Sans', sans-serif; font-size: 15px; color: #07202f;
      outline: none; transition: border-color .2s, box-shadow .2s;
    }
    .ht-input:focus {
      border-color: #0d7f78;
      box-shadow: 0 0 0 4px rgba(13,127,120,0.1);
    }
    .ht-input::placeholder { color: #94a3b8; }
    .ht-select { appearance: none; cursor: pointer; }
    .ht-textarea { resize: none; min-height: 130px; line-height: 1.6; }

    .ht-choice {
      padding: 16px 20px; border-radius: 14px; border: 2px solid #e2e8f0;
      background: #fff; cursor: pointer; transition: all .22s; text-align: left;
      font-family: 'DM Sans', sans-serif; font-size: 15px; color: #475569;
      display: flex; align-items: center; gap: 12; width: 100%;
    }
    .ht-choice:hover { border-color: #0d7f78; color: #07202f; }
    .ht-choice.selected {
      border-color: #0d7f78; background: #e8f4f3; color: #07202f;
    }
    .ht-choice.selected-gold {
      border-color: #c8a96e; background: #fdf6ec; color: #07202f;
    }

    .ht-drop-zone {
      border: 2.5px dashed #cbd5e1; border-radius: 20px;
      background: #fff; transition: all .25s; cursor: pointer;
      position: relative; overflow: hidden;
    }
    .ht-drop-zone:hover, .ht-drop-zone.drag-over {
      border-color: #0d7f78; background: #f0faf9;
    }
    .ht-drop-zone input[type=file] {
      position: absolute; inset: 0; opacity: 0; cursor: pointer; z-index: 10;
    }

    .ht-btn-primary {
      display: inline-flex; align-items: center; gap: 10px;
      background: linear-gradient(135deg, #0d7f78, #0a6560);
      color: #fff; border: none; cursor: pointer;
      font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 16px;
      padding: 16px 36px; border-radius: 100px;
      box-shadow: 0 6px 28px rgba(13,127,120,0.38);
      transition: transform .2s, box-shadow .2s;
    }
    .ht-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 36px rgba(13,127,120,0.48);
    }
    .ht-btn-back {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; border: none; cursor: pointer;
      font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px;
      color: #94a3b8; padding: 16px 0; transition: color .2s;
    }
    .ht-btn-back:hover { color: #07202f; }

    .ht-step-icon {
      width: 42px; height: 42px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: all .3s;
    }
    .ht-review-row {
      display: flex; gap: 8px; padding: 14px 0; border-bottom: 1px solid #f1f5f9;
      font-family: 'DM Sans', sans-serif;
    }
    .ht-review-row:last-child { border-bottom: none; }

    /* ─── Mobile responsive ─── */
    @media (max-width: 640px) {
      .ht-pair       { grid-template-columns: 1fr !important; }
      .ht-triple     { grid-template-columns: 1fr 1fr !important; }
      .ht-btn-primary { padding: 14px 24px !important; font-size: 15px !important; }
      .ht-btn-back    { padding: 14px 0 !important; font-size: 14px !important; }
      .ht-stepper-labels { display: none !important; }
    }
    @media (max-width: 400px) {
      .ht-triple { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ─── Step Config ─── */
const STEPS = [
  { label: 'Personal', icon: User },
  { label: 'Contact', icon: Phone },
  { label: 'Concern', icon: Heart },
  { label: 'Symptoms', icon: Activity },
  { label: 'Lifestyle', icon: Brain },
  { label: 'Image', icon: Camera },
  { label: 'Notes', icon: Sparkles },
  { label: 'Review', icon: CheckCircle2 },
];

const PROBLEMS = [
  { label: 'Skin Issue', icon: Sparkles, color: '#c8a96e' },
  { label: 'Sexual Health', icon: Zap, color: '#e05c8a' },
  { label: 'Joint Pain', icon: Bone, color: '#4a6fa5' },
  { label: 'Digestive Issue', icon: Droplets, color: '#0d7f78' },
  { label: 'Fever / Infection', icon: Activity, color: '#e07455' },
  { label: 'Other', icon: AlertCircle, color: '#64748b' },
];

const SYMPTOMS = [
  'Itching', 'Chronic Pain', 'Redness', 'Swelling',
  'Weakness', 'Nausea', 'Sleep Issues', 'Anxiety',
  'Fatigue', 'Headache', 'Rash', 'Breathlessness',
];

const LIFESTYLE_OPTIONS = [
  { label: 'Sedentary (Desk Job)', icon: '💻' },
  { label: 'Moderately Active', icon: '🚶' },
  { label: 'Very Active / Athlete', icon: '🏋️' },
  { label: 'Smoker', icon: '🚬' },
  { label: 'Occasional Drinker', icon: '🍷' },
  { label: 'Vegetarian Diet', icon: '🥦' },
];

/* ════════════════════════════════════════════════ */
const HealthTestPage = () => {
  const [step, setStep] = useState(1);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState(INITIAL_FORM);
  // One reference per attempt, so a retry after a network error isn't counted twice.
  const [referenceId, setReferenceId] = useState(() => makeReferenceId());

  const TOTAL = 8;
  const cardRef = useRef(null);

  // After moving between steps, bring the top of the form back into view
  // (on phones the Continue button is far below the step heading).
  const scrollCardIntoView = () => {
    requestAnimationFrame(() => {
      const el = cardRef.current;
      if (el && el.getBoundingClientRect().top < 80) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const update = (fields) => setFormData(p => ({ ...p, ...fields }));

  /* Returns an error message if the given step can't be left yet. */
  const validateStep = (n) => {
    if (n === 1 && formData.name.trim().length < 2) return 'Please enter your full name.';
    if (n === 1 && formData.age && (Number(formData.age) < 1 || Number(formData.age) > 120)) return 'Please enter a valid age.';
    if (n === 2 && !normalisePhone(formData.phone)) return 'Please enter a valid 10-digit mobile number.';
    if (n === 2 && formData.email && !isValidEmail(formData.email)) return 'Please check your email address, or leave it empty.';
    if (n === TOTAL && !formData.consent) return 'Please tick the consent box to submit.';
    return '';
  };

  const goNext = () => {
    const err = validateStep(step);
    setSubmitError(err);
    if (!err) {
      setStep(p => Math.min(p + 1, TOTAL));
      scrollCardIntoView();
    }
  };

  const goBack = () => {
    setSubmitError('');
    setStep(p => Math.max(p - 1, 1));
    scrollCardIntoView();
  };

  const handleSubmit = async () => {
    if (submitting) return;
    for (const n of [1, 2, TOTAL]) {
      const err = validateStep(n);
      if (err) {
        setSubmitError(err);
        if (n !== TOTAL) { setStep(n); scrollCardIntoView(); }
        return;
      }
    }
    setSubmitError('');
    setSubmitting(true);
    const res = await submitHealthTest({ ...formData, phone: normalisePhone(formData.phone), referenceId });
    setSubmitting(false);
    if (res.ok) {
      setSubmitted(true);
      window.scrollTo({ top: 0 });
    } else {
      setSubmitError(SUBMIT_ERRORS[res.reason] || SUBMIT_ERRORS.default);
    }
  };

  const startOver = () => {
    setSubmitted(false);
    setStep(1);
    window.scrollTo({ top: 0 });
    setFormData(INITIAL_FORM);
    setReferenceId(makeReferenceId());
  };

  /* ── Image handler: keep the File for upload, a data URL for preview ── */
  const handleImageFile = useCallback((file) => {
    if (!file || !(file.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name))) {
      setSubmitError('Please choose an image file (JPG, PNG or HEIC).');
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setSubmitError('That photo is larger than 10 MB. Please choose a smaller one.');
      return;
    }
    setSubmitError('');
    const sizeKB = (file.size / 1024).toFixed(0);
    const sizeMB = (file.size / 1048576).toFixed(1);
    const reader = new FileReader();
    reader.onload = (e) => {
      update({
        image: e.target.result,
        imageFile: file,
        imageName: file.name,
        imageSize: file.size > 1048576 ? `${sizeMB} MB` : `${sizeKB} KB`,
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
    e.target.value = '';                 // reset so same file can be re-selected
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  };

  const removeImage = () => update({ image: null, imageFile: null, imageName: '', imageSize: '' });

  /* ── Step renderer ── */
  const variants = {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, x: -32, transition: { duration: 0.22 } },
  };

  const renderStep = () => {
    switch (step) {

      /* ── 1: Personal ── */
      case 1:
        return (
          <motion.div key="s1" variants={variants} initial="hidden" animate="visible" exit="exit">
            <StepHeader icon={User} title="Tell us about yourself" sub="Your basic details help us personalise your assessment." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input className="ht-input" placeholder="Full Name (Required)" autoComplete="name" value={formData.name} onChange={e => update({ name: e.target.value })} />
              <div className="ht-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <input className="ht-input" type="number" placeholder="Age" min="1" max="120" value={formData.age} onChange={e => update({ age: e.target.value })} />
                <select className="ht-input ht-select" value={formData.gender} onChange={e => update({ gender: e.target.value })}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other / Prefer not to say</option>
                </select>
              </div>
            </div>
          </motion.div>
        );

      /* ── 2: Contact ── */
      case 2:
        return (
          <motion.div key="s2" variants={variants} initial="hidden" animate="visible" exit="exit">
            <StepHeader icon={Phone} title="How can we reach you?" sub="We'll send your report and appointment details here." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontFamily: "'Space Grotesk',sans-serif", fontSize: 14 }}>+91</span>
                <input className="ht-input" style={{ paddingLeft: 52 }} type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={18} placeholder="10-digit Mobile Number (Required)" value={formData.phone} onChange={e => update({ phone: e.target.value })} />
              </div>
              <input className="ht-input" type="email" autoComplete="email" placeholder="Email Address (Optional)" value={formData.email} onChange={e => update({ email: e.target.value })} />
              <div style={{ display: 'flex', gap: 8, background: '#fdf6ec', border: '1px solid #f0d9b0', borderRadius: 12, padding: '12px 16px' }}>
                <ShieldCheck size={17} color="#c8a96e" style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 13, color: '#78604a', lineHeight: 1.5, fontFamily: "'DM Sans',sans-serif" }}>
                  Your details are sent securely and used only by our medical team to contact you. We never share them.
                </p>
              </div>
            </div>
          </motion.div>
        );

      /* ── 3: Primary Concern ── */
      case 3:
        return (
          <motion.div key="s3" variants={variants} initial="hidden" animate="visible" exit="exit">
            <StepHeader icon={Heart} title="What is your primary concern?" sub="Select the area you'd most like us to focus on." />
            <div className="ht-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {PROBLEMS.map(({ label, icon: Icon, color }) => (
                <button
                  key={label}
                  className={`ht-choice ${formData.problem === label ? 'selected' : ''}`}
                  onClick={() => update({ problem: label })}
                  style={{ ...(formData.problem === label ? { borderColor: color, background: `${color}12` } : {}) }}
                >
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={17} color={color} />
                  </span>
                  <span style={{ fontWeight: 500, color: formData.problem === label ? '#07202f' : '#475569' }}>{label}</span>
                  {formData.problem === label && <Check size={16} color={color} style={{ marginLeft: 'auto' }} />}
                </button>
              ))}
            </div>
          </motion.div>
        );

      /* ── 4: Symptoms ── */
      case 4:
        return (
          <motion.div key="s4" variants={variants} initial="hidden" animate="visible" exit="exit">
            <StepHeader icon={Activity} title="Select your symptoms" sub="Choose all that apply — the more detail, the better your assessment." />
            <div className="ht-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {SYMPTOMS.map(s => {
                const sel = formData.symptoms.includes(s);
                return (
                  <button
                    key={s}
                    className={`ht-choice ${sel ? 'selected' : ''}`}
                    onClick={() => {
                      const ns = sel ? formData.symptoms.filter(x => x !== s) : [...formData.symptoms, s];
                      update({ symptoms: ns });
                    }}
                  >
                    <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${sel ? '#0d7f78' : '#cbd5e1'}`, background: sel ? '#0d7f78' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s', flexShrink: 0 }}>
                      {sel && <Check size={12} color="#fff" />}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: sel ? 600 : 400, color: sel ? '#07202f' : '#475569' }}>{s}</span>
                  </button>
                );
              })}
            </div>
            {formData.symptoms.length > 0 && (
              <div style={{ marginTop: 14, padding: '10px 14px', background: '#e8f4f3', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle2 size={15} color="#0d7f78" />
                <span style={{ fontSize: 13, color: '#0d7f78', fontWeight: 500 }}>{formData.symptoms.length} symptom{formData.symptoms.length > 1 ? 's' : ''} selected</span>
              </div>
            )}
          </motion.div>
        );

      /* ── 5: Lifestyle ── */
      case 5:
        return (
          <motion.div key="s5" variants={variants} initial="hidden" animate="visible" exit="exit">
            <StepHeader icon={Brain} title="Describe your lifestyle" sub="Select all that apply — this helps us give tailored recommendations." />
            <div className="ht-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {LIFESTYLE_OPTIONS.map(({ label, icon }) => {
                const sel = formData.lifestyle.includes(label);
                return (
                  <button
                    key={label}
                    className={`ht-choice ${sel ? 'selected' : ''}`}
                    onClick={() => {
                      const nl = sel ? formData.lifestyle.filter(x => x !== label) : [...formData.lifestyle, label];
                      update({ lifestyle: nl });
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{icon}</span>
                    <span style={{ fontSize: 14, fontWeight: sel ? 600 : 400 }}>{label}</span>
                    {sel && <Check size={14} color="#0d7f78" style={{ marginLeft: 'auto' }} />}
                  </button>
                );
              })}
            </div>
            <textarea
              className="ht-input ht-textarea"
              placeholder="Add any extra lifestyle details (diet, sleep patterns, stress level, medications…)"
              value={formData.lifestyleNote}
              onChange={e => update({ lifestyleNote: e.target.value })}
            />
          </motion.div>
        );

      /* ── 6: Image Upload ── */
      case 6:
        return (
          <motion.div key="s6" variants={variants} initial="hidden" animate="visible" exit="exit">
            <StepHeader icon={Camera} title="Upload a photo (Optional)" sub="A clear photo of the affected area helps our doctors assess more accurately." />

            {formData.image ? (
              /* ── Preview mode ── */
              <div style={{ borderRadius: 20, overflow: 'hidden', border: '2px solid #e2e8f0', background: '#fff' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={formData.image}
                    alt="Uploaded preview"
                    style={{ width: '100%', maxHeight: 320, objectFit: 'contain', display: 'block', background: '#f8fafc' }}
                  />
                  <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}>
                    <button
                      onClick={removeImage}
                      style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'rgba(220,38,38,0.9)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}
                    ><Trash2 size={16} /></button>
                  </div>
                </div>
                <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#e8f4f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileImage size={18} color="#0d7f78" />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#07202f', fontFamily: "'Space Grotesk',sans-serif" }}>{formData.imageName}</p>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>{formData.imageSize}</p>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle2 size={16} color="#0d7f78" />
                    <span style={{ fontSize: 13, color: '#0d7f78', fontWeight: 600 }}>Attached</span>
                  </div>
                </div>
                {/* Replace button */}
                <div style={{ padding: '0 20px 16px' }}>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#0d7f78', fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif" }}>
                    <input type="file" accept="image/*,.heic,.heif" style={{ display: 'none' }} onChange={handleFileInput} />
                    <Upload size={14} /> Replace Image
                  </label>
                </div>
              </div>
            ) : (
              /* ── Upload mode ── */
              <div>
                <div
                  className={`ht-drop-zone ${dragOver ? 'drag-over' : ''}`}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  style={{ padding: '48px 24px', textAlign: 'center' }}
                >
                  <input type="file" accept="image/*,.heic,.heif" onChange={handleFileInput} />
                  <div style={{ width: 72, height: 72, borderRadius: 20, background: dragOver ? '#e8f4f3' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', transition: 'background .2s' }}>
                    <Upload size={32} color={dragOver ? '#0d7f78' : '#94a3b8'} />
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 600, color: '#07202f', fontFamily: "'Space Grotesk',sans-serif", marginBottom: 8 }}>
                    Drag & drop your image here
                  </p>
                  <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 20 }}>or click anywhere in this box to browse</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#0d7f78', color: '#fff', padding: '10px 22px', borderRadius: 100, fontSize: 14, fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif" }}>
                    <Camera size={15} /> Choose File
                  </div>
                  <p style={{ marginTop: 16, fontSize: 12, color: '#cbd5e1' }}>Supports JPG, PNG, HEIC — Max 10 MB</p>
                </div>
                <div style={{ marginTop: 16, display: 'flex', gap: 8, padding: '12px 16px', background: '#f8fafc', borderRadius: 12 }}>
                  <Eye size={15} color="#94a3b8" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.5 }}>
                    This step is <strong style={{ color: '#64748b' }}>optional</strong> — you can skip it. Photos are sent securely and are only visible to our medical team.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        );

      /* ── 7: Notes ── */
      case 7:
        return (
          <motion.div key="s7" variants={variants} initial="hidden" animate="visible" exit="exit">
            <StepHeader icon={Sparkles} title="Anything else to share?" sub="Previous diagnoses, ongoing medications, allergies — every detail helps." />
            <textarea
              className="ht-input ht-textarea"
              style={{ minHeight: 180 }}
              placeholder="E.g. 'I've had this rash for 3 weeks. I'm currently on metformin. Allergic to penicillin.'"
              value={formData.notes}
              onChange={e => update({ notes: e.target.value })}
            />
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <AlertCircle size={15} color="#94a3b8" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.5 }}>The more detail you provide here, the more personalised and accurate your health report will be.</p>
            </div>
          </motion.div>
        );

      /* ── 8: Review ── */
      case 8:
        return (
          <motion.div key="s8" variants={variants} initial="hidden" animate="visible" exit="exit">
            <StepHeader icon={CheckCircle2} title="Review & submit" sub="Please verify your details before submitting your health assessment." />
            <div style={{ borderRadius: 18, overflow: 'hidden', border: '1.5px solid #e2e8f0', background: '#fff' }}>
              {[
                { label: 'Full Name', val: formData.name || '—' },
                { label: 'Age / Gender', val: formData.age ? `${formData.age} yrs / ${formData.gender || '—'}` : '—' },
                { label: 'Phone', val: formData.phone || '—' },
                { label: 'Email', val: formData.email || 'Not provided' },
                { label: 'Primary Concern', val: formData.problem || '—' },
                { label: 'Symptoms', val: formData.symptoms.length ? formData.symptoms.join(', ') : 'None selected' },
                { label: 'Lifestyle', val: formData.lifestyle.length ? formData.lifestyle.join(', ') : 'Not provided' },
                ...(formData.lifestyleNote ? [{ label: 'Lifestyle Notes', val: formData.lifestyleNote }] : []),
                { label: 'Photo', val: formData.image ? `✓ ${formData.imageName}` : 'Not uploaded', highlight: !!formData.image },
                { label: 'Notes', val: formData.notes || 'None' },
              ].map(({ label, val, highlight }) => (
                <div key={label} className="ht-review-row" style={{ padding: '14px 20px' }}>
                  <span style={{ fontSize: 13, color: '#94a3b8', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, minWidth: 130, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 14, color: highlight ? '#0d7f78' : '#07202f', fontFamily: "'DM Sans',sans-serif", fontWeight: highlight ? 600 : 400, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{val}</span>
                </div>
              ))}
            </div>
            <label style={{ marginTop: 20, display: 'flex', gap: 12, padding: '14px 18px', background: '#e8f4f3', borderRadius: 14, border: `1px solid ${formData.consent ? '#0d7f78' : '#b2d8d5'}`, cursor: 'pointer', alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={e => { update({ consent: e.target.checked }); if (e.target.checked) setSubmitError(''); }}
                style={{ width: 18, height: 18, marginTop: 2, accentColor: '#0d7f78', flexShrink: 0 }}
              />
              <span style={{ fontSize: 13, color: '#0a5752', lineHeight: 1.55 }}>
                I agree that {clinic.name} may store the health details{formData.image ? ' and photo' : ''} I have shared and contact me about this assessment. Only the clinic's medical team will see them. See our <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#0d7f78', fontWeight: 600 }}>Privacy Policy</a>.
              </span>
            </label>
          </motion.div>
        );

      default: return null;
    }
  };

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <>
        <Styles />
        <SEO title="Free Health Test" description="Take Mangla Healthcare's free online health assessment. Share your symptoms and a doctor from our Jaipur team will call you within 24 hours." />
        <div className="ht-font-body dock-clear" style={{ minHeight: '100vh', background: '#f7f3ed', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ background: '#fff', borderRadius: 32, padding: 'clamp(40px, 8vw, 80px)', maxWidth: 560, width: '100%', textAlign: 'center', boxShadow: '0 24px 80px rgba(7,32,47,0.12)' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg, #0d7f78, #0a6560)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}
            >
              <Check size={44} color="#fff" strokeWidth={2.5} />
            </motion.div>
            <h2 className="ht-font-display" style={{ fontSize: 36, color: '#07202f', fontWeight: 700, marginBottom: 14 }}>Assessment Submitted!</h2>
            <p style={{ color: '#64748b', fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
              Thank you, <strong style={{ color: '#07202f' }}>{formData.name || 'Patient'}</strong>. Our medical team will review your assessment and contact you on <strong style={{ color: '#0d7f78' }}>{formData.phone}</strong> within 24 hours.
            </p>
            <p className="ht-font-ui" style={{ display: 'inline-block', background: '#f7f3ed', border: '1px dashed #c8a96e', borderRadius: 12, padding: '10px 18px', fontSize: 14, color: '#07202f', marginBottom: 28 }}>
              Your reference number: <strong style={{ letterSpacing: '.05em' }}>{referenceId}</strong>
            </p>
            <div className="ht-triple" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 32 }}>
              {[{ icon: '🔬', label: 'Analysis', sub: 'Within 24h' }, { icon: '📞', label: 'Call Back', sub: 'By our team' }, { icon: '💊', label: 'Plan', sub: 'Personalised' }].map(({ icon, label, sub }) => (
                <div key={label} style={{ background: '#f8fafc', borderRadius: 14, padding: '16px 12px', textAlign: 'center' }}>
                  <p style={{ fontSize: 28, marginBottom: 6 }}>{icon}</p>
                  <p className="ht-font-ui" style={{ fontSize: 13, fontWeight: 700, color: '#07202f' }}>{label}</p>
                  <p style={{ fontSize: 12, color: '#94a3b8' }}>{sub}</p>
                </div>
              ))}
            </div>
            <button
              onClick={startOver}
              className="ht-btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >Start New Assessment</button>
          </motion.div>
        </div>
      </>
    );
  }

  /* ── Progress pct ── */
  const pct = Math.round((step / TOTAL) * 100);

  return (
    <>
      <Styles />
      <SEO title="Free Health Test" description="Take Mangla Healthcare's free online health assessment. Share your symptoms and a doctor from our Jaipur team will call you within 24 hours." />
      <div className="ht-font-body dock-clear" style={{ minHeight: '100vh', background: '#f7f3ed', padding: 'clamp(80px,12vw,128px) 16px 60px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>

          {/* ── Header ── */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="ht-font-ui" style={{ display: 'inline-block', background: 'rgba(13,127,120,0.12)', color: '#0d7f78', fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 100, marginBottom: 14 }}>
              Free Health Assessment
            </span>
            <h1 className="ht-font-display" style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)', color: '#07202f', fontWeight: 700, lineHeight: 1.15 }}>
              Tell Us About Your Health
            </h1>
          </motion.div>

          {/* ── Step Indicator ── */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span className="ht-font-ui" style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>
                Step {step} of {TOTAL} — <span style={{ color: '#07202f' }}>{STEPS[step - 1].label}</span>
              </span>
              <span className="ht-font-ui" style={{ fontSize: 13, fontWeight: 700, color: '#0d7f78' }}>{pct}%</span>
            </div>
            <div style={{ height: 6, background: '#e2e8f0', borderRadius: 100, overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5 }}
                style={{ height: '100%', background: 'linear-gradient(90deg, #0d7f78, #c8a96e)', borderRadius: 100 }}
              />
            </div>
            {/* Step dots */}
            <div style={{ display: 'flex', gap: 6, marginTop: 14, justifyContent: 'center' }}>
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const done = i + 1 < step;
                const active = i + 1 === step;
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{
                      width: active ? 36 : 28, height: active ? 36 : 28, borderRadius: '50%',
                      background: done ? '#0d7f78' : active ? '#07202f' : '#e2e8f0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all .3s', boxShadow: active ? '0 4px 12px rgba(7,32,47,0.25)' : 'none'
                    }}>
                      {done
                        ? <Check size={14} color="#fff" />
                        : <Icon size={active ? 16 : 13} color={active ? '#fff' : '#94a3b8'} />
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Form Card ── */}
          <div ref={cardRef} style={{ background: '#fff', borderRadius: 28, padding: 'clamp(28px,6vw,52px)', boxShadow: '0 16px 60px rgba(7,32,47,0.09)', position: 'relative', overflow: 'hidden', scrollMarginTop: 140 }}>
            {/* Decoration */}
            <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(13,127,120,0.05)', pointerEvents: 'none' }} />

            {/* Honeypot — hidden from real users, bots tend to fill it. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={formData.website}
              onChange={e => update({ website: e.target.value })}
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
            />

            <div style={{ minHeight: 380, position: 'relative', zIndex: 1 }}>
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                className="ht-btn-back"
                onClick={goBack}
                style={{ opacity: step === 1 ? 0 : 1, pointerEvents: step === 1 ? 'none' : 'auto' }}
              >
                <ChevronLeft size={18} /> Back
              </button>
              <button
                className="ht-btn-primary"
                disabled={submitting}
                style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }}
                onClick={() => step === TOTAL ? handleSubmit() : goNext()}
              >
                {step === TOTAL
                  ? (submitting
                      ? (<><Loader2 size={18} className="animate-spin" style={{ animation: 'ht-spin 1s linear infinite' }} /> Submitting...</>)
                      : (<><CheckCircle2 size={18} /> Submit Assessment</>))
                  : (<>Continue <ChevronRight size={18} /></>)}
              </button>
            </div>
            {submitError && (
              <p role="alert" style={{
                marginTop: 14, padding: '10px 14px', borderRadius: 10,
                background: '#fef2f2', border: '1px solid #fecaca',
                color: '#b91c1c', fontSize: 13.5, fontWeight: 500,
              }}>
                {submitError}
              </p>
            )}
          </div>

          {/* ── Trust Bar ── */}
          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {[
              { icon: ShieldCheck, label: 'Sent Securely' },
              { icon: User, label: 'Strictly Confidential' },
              { icon: Activity, label: 'Medical Accuracy' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#94a3b8' }}>
                <Icon size={15} />
                <span style={{ fontSize: 13, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

/* ── Reusable Step Header ── */
const StepHeader = ({ icon: Icon, title, sub }) => (
  <div style={{ marginBottom: 28 }}>
    <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(13,127,120,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
      <Icon size={22} color="#0d7f78" />
    </div>
    <h3 className="ht-font-display" style={{ fontSize: 'clamp(1.4rem,4vw,1.85rem)', color: '#07202f', fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>{title}</h3>
    <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.55 }}>{sub}</p>
  </div>
);

export default HealthTestPage;