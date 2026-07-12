import React, { useState, useRef } from 'react';
import PortalLayout from './PortalLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, Utensils, Dumbbell, Clock, Info,
  CheckCircle2, Printer, X, Upload, Sun, Sunset, Moon
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const EXERCISE_IMAGES = [
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=600',
];

const mealIcons = {
  breakfast: <Sun size={18} style={{ color: '#F59E0B' }} />,
  lunch: <Sunset size={18} style={{ color: '#EF4444' }} />,
  dinner: <Moon size={18} style={{ color: '#6366F1' }} />,
};

const mealColors = {
  breakfast: { bg: '#FFFBEB', border: '#FDE68A', accent: '#F59E0B' },
  lunch: { bg: '#FFF5F5', border: '#FECACA', accent: '#EF4444' },
  dinner: { bg: '#F5F3FF', border: '#DDD6FE', accent: '#6366F1' },
};

const DietExercise = () => {
  const [activeTab, setActiveTab] = useState('diet');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const planRef = useRef();
  const exercisePdfRef = useRef();

  const [patientName, setPatientName] = useState('');
  const [diet, setDiet] = useState({
    type: 'veg',
    breakfast: '', lunch: '', dinner: '',
    avoid: 'Sugar, fried food, processed items, carbonated beverages',
    water: '8–10 glasses/day',
    note: 'Chew slowly, eat at regular intervals, maintain 2–3 hr gap before sleep.',
  });

  const [exercises, setExercises] = useState([
    {
      name: 'Knee Stretch',
      sets: '3 sets',
      reps: '10 reps',
      duration: '10 min',
      desc: 'Lie flat on your back. Slowly bring one knee to your chest, hold for 10 seconds, then switch. Helps improve flexibility and relieve knee tension.',
      image: EXERCISE_IMAGES[0],
      category: 'Flexibility',
    },
    {
      name: 'Shoulder Roll',
      sets: '2 sets',
      reps: '15 reps',
      duration: '5 min',
      desc: 'Roll shoulders forward and backward in a circular motion. Excellent for relieving neck and upper back stiffness.',
      image: EXERCISE_IMAGES[1],
      category: 'Mobility',
    },
  ]);

  const addExercise = () => {
    setExercises([...exercises, {
      name: '',
      sets: '3 sets',
      reps: '10 reps',
      duration: '10 min',
      desc: '',
      image: EXERCISE_IMAGES[exercises.length % EXERCISE_IMAGES.length],
      category: 'General',
    }]);
  };

  const updateExercise = (i, field, value) => {
    const ex = [...exercises];
    ex[i][field] = value;
    setExercises(ex);
  };

  const removeExercise = (i) => setExercises(exercises.filter((_, idx) => idx !== i));

  const generateDietPDF = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const element = planRef.current;
      const canvas = await html2canvas(element, { scale: 3, useCORS: true, backgroundColor: '#ffffff', logging: false });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`DietPlan_${patientName || 'Patient'}.pdf`);
      setGenerated(true);
      setTimeout(() => setGenerated(false), 3000);
    } catch (err) { console.error(err); }
    setIsGenerating(false);
  };

  const generateExercisePDF = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const element = exercisePdfRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      // Multi-page PDF if content is long
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`ExercisePlan_${patientName || 'Patient'}.pdf`);
      setGenerated(true);
      setTimeout(() => setGenerated(false), 3000);
    } catch (err) { console.error(err); }
    setIsGenerating(false);
  };

  const categories = ['Flexibility', 'Mobility', 'Strength', 'Cardio', 'Balance', 'Breathing', 'General'];

  return (
    <PortalLayout>
      <div style={{ fontFamily: "'Outfit', sans-serif" }}>
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-7">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#0F172A' }}>Diet & Exercise Plan</h1>
            <p className="text-sm mt-0.5" style={{ color: '#94A3B8' }}>Design personalized wellness protocols for your patients.</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="text"
              placeholder="Patient Name (for PDF)"
              value={patientName}
              onChange={e => setPatientName(e.target.value)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium outline-none"
              style={{ background: '#FFF', border: '1px solid #E2E8F0', color: '#0F172A', width: 200 }}
            />
            <button
              onClick={activeTab === 'diet' ? generateDietPDF : generateExercisePDF}
              disabled={isGenerating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg transition-all hover:opacity-90 disabled:opacity-70"
              style={{ background: generated ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #0EA5E9, #0D9488)', minWidth: 168 }}
            >
              {generated ? <><CheckCircle2 size={16} /> Saved!</> : isGenerating ? '⏳ Generating...' : <><Printer size={16} /> Export PDF</>}
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 rounded-2xl w-fit mb-7" style={{ background: '#E2E8F0' }}>
          {[
            { id: 'diet', label: 'Diet Plan', icon: Utensils },
            { id: 'exercise', label: 'Exercise Protocol', icon: Dumbbell },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: active ? '#FFFFFF' : 'transparent',
                  color: active ? '#0F172A' : '#64748B',
                  boxShadow: active ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'diet' ? (
            <motion.div key="diet" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Diet Config Form */}
                <div className="rounded-2xl p-7" style={{ background: '#FFF', border: '1px solid #E2E8F0' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-black text-sm uppercase tracking-widest" style={{ color: '#334155' }}>Meal Configuration</h3>
                    <div className="flex p-1 rounded-xl gap-1" style={{ background: '#F1F5F9' }}>
                      {['veg', 'non-veg'].map(type => (
                        <button
                          key={type}
                          onClick={() => setDiet({ ...diet, type })}
                          className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all"
                          style={{
                            background: diet.type === type ? '#FFF' : 'transparent',
                            color: diet.type === type ? (type === 'veg' ? '#059669' : '#DC2626') : '#94A3B8',
                            boxShadow: diet.type === type ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                          }}
                        >
                          {type === 'veg' ? '🥦' : '🍗'} {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    {['breakfast', 'lunch', 'dinner'].map(meal => {
                      const colors = mealColors[meal];
                      return (
                        <div key={meal}>
                          <div className="flex items-center gap-2 mb-2">
                            {mealIcons[meal]}
                            <label className="text-xs font-black uppercase tracking-widest capitalize" style={{ color: '#334155' }}>{meal}</label>
                          </div>
                          <textarea
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none resize-none transition-all"
                            style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: '#0F172A' }}
                            placeholder={`Enter ${meal} items, portions, and timings...`}
                            value={diet[meal]}
                            onChange={e => setDiet({ ...diet, [meal]: e.target.value })}
                            onFocus={e => e.target.style.outline = `2px solid ${colors.accent}`}
                            onBlur={e => e.target.style.outline = 'none'}
                          />
                        </div>
                      );
                    })}

                    <div className="rounded-xl p-4" style={{ background: '#FFF5F5', border: '1px solid #FECACA' }}>
                      <p className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color: '#DC2626' }}>
                        <Info size={14} /> Avoid / Restrict
                      </p>
                      <textarea
                        rows={2}
                        className="w-full bg-transparent text-sm outline-none resize-none"
                        style={{ color: '#7F1D1D' }}
                        value={diet.avoid}
                        onChange={e => setDiet({ ...diet, avoid: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest block mb-1.5" style={{ color: '#64748B' }}>Water Intake</label>
                        <input
                          className="w-full px-3 py-2.5 rounded-xl text-sm font-medium outline-none"
                          style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
                          value={diet.water}
                          onChange={e => setDiet({ ...diet, water: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest block mb-1.5" style={{ color: '#64748B' }}>General Note</label>
                        <input
                          className="w-full px-3 py-2.5 rounded-xl text-sm font-medium outline-none"
                          style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
                          value={diet.note}
                          onChange={e => setDiet({ ...diet, note: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diet Plan PDF Preview */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#94A3B8' }}>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    PDF Preview
                  </p>
                  <div
                    ref={planRef}
                    className="rounded-2xl overflow-hidden shadow-xl"
                    style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', fontFamily: "'Outfit', sans-serif" }}
                  >
                    {/* PDF Header */}
                    <div style={{ background: 'linear-gradient(135deg, #0A0F1E, #0F2137)', padding: '24px 32px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ color: '#FFF', fontSize: 20, fontWeight: 800 }}>Mangla Healthcare</p>
                          <p style={{ color: '#0EA5E9', fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginTop: 2 }}>Personalized Diet Plan</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ color: '#94A3B8', fontSize: 10 }}>Dr. Devendra Kumar</p>
                          <p style={{ color: '#64748B', fontSize: 9 }}>MBBS, MD</p>
                          <p style={{ color: '#334155', fontSize: 9, marginTop: 4 }}>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: 3, background: 'linear-gradient(90deg, #0EA5E9, #0D9488, #10B981)' }}></div>

                    {patientName && (
                      <div style={{ padding: '12px 32px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                        <p style={{ fontSize: 9, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5 }}>Patient</p>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{patientName}</p>
                      </div>
                    )}

                    <div style={{ padding: '24px 32px' }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 20, alignItems: 'center' }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#FFF', background: diet.type === 'veg' ? '#059669' : '#DC2626', padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
                          {diet.type === 'veg' ? '🥦 Vegetarian' : '🍗 Non-Vegetarian'} Diet
                        </span>
                      </div>

                      {['breakfast', 'lunch', 'dinner'].map(meal => {
                        const colors = mealColors[meal];
                        return (
                          <div key={meal} style={{ marginBottom: 16, padding: '14px 16px', borderRadius: 12, background: colors.bg, border: `1px solid ${colors.border}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                              <div style={{ width: 6, height: 6, borderRadius: '50%', background: colors.accent }}></div>
                              <p style={{ fontSize: 9, fontWeight: 700, color: colors.accent, textTransform: 'uppercase', letterSpacing: 1.5 }}>{meal}</p>
                            </div>
                            <p style={{ fontSize: 12, color: '#334155', lineHeight: 1.6 }}>{diet[meal] || 'Not specified'}</p>
                          </div>
                        );
                      })}

                      <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 10, background: '#FFF5F5', border: '1px solid #FECACA' }}>
                        <p style={{ fontSize: 9, fontWeight: 700, color: '#DC2626', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>⛔ Foods to Avoid</p>
                        <p style={{ fontSize: 11, color: '#7F1D1D' }}>{diet.avoid}</p>
                      </div>

                      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div style={{ padding: '10px 14px', borderRadius: 10, background: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                          <p style={{ fontSize: 9, fontWeight: 700, color: '#2563EB', marginBottom: 3, textTransform: 'uppercase', letterSpacing: 1 }}>💧 Water Intake</p>
                          <p style={{ fontSize: 11, color: '#1E40AF' }}>{diet.water}</p>
                        </div>
                        <div style={{ padding: '10px 14px', borderRadius: 10, background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                          <p style={{ fontSize: 9, fontWeight: 700, color: '#059669', marginBottom: 3, textTransform: 'uppercase', letterSpacing: 1 }}>📝 General Advice</p>
                          <p style={{ fontSize: 11, color: '#065F46' }}>{diet.note}</p>
                        </div>
                      </div>

                      <div style={{ marginTop: 28, paddingTop: 16, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ width: 120, height: 36, borderBottom: '1px solid #334155', marginBottom: 4 }}></div>
                          <p style={{ fontSize: 9, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: 1 }}>Dr. Devendra Kumar</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="exercise" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm font-semibold" style={{ color: '#64748B' }}>{exercises.length} exercise{exercises.length !== 1 ? 's' : ''} in protocol</p>
                <button
                  onClick={addExercise}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-md hover:opacity-90 transition-all"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
                >
                  <Plus size={16} /> Add Exercise
                </button>
              </div>

              {/* Exercise Cards (Editable) */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
                {exercises.map((ex, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-2xl overflow-hidden group"
                    style={{ background: '#FFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={ex.image}
                        alt="Exercise"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
                        <select
                          value={ex.category}
                          onChange={e => updateExercise(i, 'category', e.target.value)}
                          className="text-xs font-bold px-2.5 py-1 rounded-lg outline-none border-0"
                          style={{ background: 'rgba(139,92,246,0.85)', color: '#FFF', backdropFilter: 'blur(4px)' }}
                        >
                          {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <button
                          onClick={() => removeExercise(i)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                          style={{ background: 'rgba(239,68,68,0.85)', color: '#FFF', backdropFilter: 'blur(4px)' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <input
                        type="text"
                        placeholder="Exercise name..."
                        className="w-full font-bold text-base outline-none border-b border-transparent transition-all pb-1"
                        style={{ color: '#0F172A', borderBottomColor: 'transparent' }}
                        onFocus={e => e.target.style.borderBottomColor = '#8B5CF6'}
                        onBlur={e => e.target.style.borderBottomColor = 'transparent'}
                        value={ex.name}
                        onChange={e => updateExercise(i, 'name', e.target.value)}
                      />
                      <div className="grid grid-cols-3 gap-2">
                        {['sets', 'reps', 'duration'].map(field => (
                          <div key={field}>
                            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#94A3B8' }}>{field}</p>
                            <input
                              type="text"
                              className="w-full px-2 py-1.5 rounded-lg text-xs font-bold text-center outline-none"
                              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#334155' }}
                              value={ex[field]}
                              onChange={e => updateExercise(i, field, e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Describe how to perform this exercise..."
                        className="w-full text-xs outline-none resize-none"
                        style={{ color: '#64748B', lineHeight: 1.6 }}
                        value={ex.desc}
                        onChange={e => updateExercise(i, 'desc', e.target.value)}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ══ EXERCISE PDF TEMPLATE (hidden) ══ */}
              <div
                ref={exercisePdfRef}
                style={{
                  position: 'fixed',
                  left: '-9999px',
                  top: 0,
                  width: 794,
                  background: '#FFFFFF',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {/* PDF Header */}
                <div style={{ background: 'linear-gradient(135deg, #0A0F1E, #0F2137)', padding: '28px 40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ color: '#FFF', fontSize: 22, fontWeight: 800 }}>Mangla Healthcare</p>
                      <p style={{ color: '#8B5CF6', fontSize: 10, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase', marginTop: 3 }}>
                        Exercise & Physiotherapy Protocol
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: '#FFF', fontSize: 13, fontWeight: 700 }}>Dr. Devendra Kumar</p>
                      <p style={{ color: '#94A3B8', fontSize: 10 }}>MBBS, MD</p>
                      {patientName && <p style={{ color: '#0EA5E9', fontSize: 11, fontWeight: 600, marginTop: 4 }}>Patient: {patientName}</p>}
                      <p style={{ color: '#475569', fontSize: 9, marginTop: 2 }}>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
                <div style={{ height: 4, background: 'linear-gradient(90deg, #8B5CF6, #0EA5E9, #0D9488)' }}></div>

                {/* Instructions banner */}
                <div style={{ padding: '12px 40px', background: '#F5F3FF', borderBottom: '1px solid #DDD6FE', display: 'flex', gap: 24 }}>
                  <div style={{ fontSize: 11, color: '#4C1D95' }}>
                    ⏱ <strong>Perform daily</strong> unless specified &nbsp;|&nbsp;
                    🔥 <strong>Warm up</strong> for 5 min before starting &nbsp;|&nbsp;
                    💧 <strong>Stay hydrated</strong> throughout &nbsp;|&nbsp;
                    ⛔ <strong>Stop if pain occurs</strong>
                  </div>
                </div>

                {/* Exercise list with images */}
                <div style={{ padding: '28px 40px' }}>
                  {exercises.map((ex, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 20,
                        marginBottom: 24,
                        padding: 16,
                        borderRadius: 14,
                        border: '1px solid #E2E8F0',
                        background: i % 2 === 0 ? '#FAFBFC' : '#FFFFFF',
                        pageBreakInside: 'avoid',
                      }}
                    >
                      {/* Exercise Image */}
                      <div style={{ flexShrink: 0, width: 160, height: 120, borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
                        <img
                          src={ex.image}
                          alt={ex.name || 'Exercise'}
                          crossOrigin="anonymous"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
                          padding: '8px 8px 6px',
                        }}>
                          <span style={{ fontSize: 8, fontWeight: 700, color: '#FFF', textTransform: 'uppercase', letterSpacing: 1 }}>
                            {ex.category}
                          </span>
                        </div>
                      </div>

                      {/* Exercise Details */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: '#8B5CF6', background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 6, padding: '1px 8px' }}>{i + 1}</span>
                            <p style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>{ex.name || `Exercise ${i + 1}`}</p>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                          {[
                            { label: 'Sets', value: ex.sets, color: '#0EA5E9' },
                            { label: 'Reps', value: ex.reps, color: '#10B981' },
                            { label: 'Duration', value: ex.duration, color: '#F59E0B' },
                          ].map((stat, j) => (
                            <div key={j} style={{ flex: 1, textAlign: 'center', padding: '6px 4px', borderRadius: 8, background: '#F8FAFC', border: `1px solid ${stat.color}22` }}>
                              <p style={{ fontSize: 8, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</p>
                              <p style={{ fontSize: 12, fontWeight: 800, color: stat.color, marginTop: 2 }}>{stat.value}</p>
                            </div>
                          ))}
                        </div>

                        <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.65 }}>{ex.desc || 'Follow doctor\'s instructions for this exercise.'}</p>
                      </div>
                    </div>
                  ))}

                  {/* Footer */}
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <p style={{ fontSize: 10, color: '#64748B' }}>📞 Emergency: +91 99926 54891</p>
                      <p style={{ fontSize: 9, color: '#94A3B8', marginTop: 3, fontStyle: 'italic' }}>Consult your doctor before modifying the exercise plan.</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: 120, height: 36, borderBottom: '1px solid #334155', marginBottom: 4 }}></div>
                      <p style={{ fontSize: 9, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: 1 }}>Dr. Devendra Kumar</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PortalLayout>
  );
};

export default DietExercise;