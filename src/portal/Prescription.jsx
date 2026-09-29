import { useState, useRef } from 'react';
import PortalLayout from './PortalLayout';
import { motion } from 'framer-motion';
import { Plus, Trash2, Printer, Download, User, Activity, ClipboardList, CheckCircle2, Stethoscope, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { doctors } from '../pages/doctorsData';
import { clinic } from '../config/clinic';

// A4 at 96 DPI. The PDF is always rendered at this width so the output is
// identical no matter how wide the doctor's screen is.
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

const newRegNo = () => 'M-' + Math.floor(1000 + Math.random() * 9000);
const today = () => new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

let medId = 0;
const emptyMedicine = () => ({ id: ++medId, name: '', dosage: '', duration: '', instruction: '', timing: 'After Food' });
const isEmptyMedicine = (m) => !m.name && !m.dosage && !m.duration && !m.instruction;

const emptyVitals = { bp: '', pulse: '', temp: '', weight: '', spo2: '' };
const emptyNotes = { history: '', examination: '', diagnosis: '', reviewAfter: '7', specialNotes: '' };

const InputField = ({ label, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#64748B' }}>{label}</label>}
    <input
      {...props}
      className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
      style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
      onFocus={e => e.target.style.borderColor = '#0EA5E9'}
      onBlur={e => e.target.style.borderColor = '#E2E8F0'}
    />
  </div>
);

const TextAreaField = ({ label, rows = 3, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#64748B' }}>{label}</label>}
    <textarea
      rows={rows}
      {...props}
      className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all resize-none"
      style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
      onFocus={e => e.target.style.borderColor = '#0EA5E9'}
      onBlur={e => e.target.style.borderColor = '#E2E8F0'}
    />
  </div>
);

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(13,148,136,0.15))' }}>
      <Icon size={16} style={{ color: '#0EA5E9' }} />
    </div>
    <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: '#334155' }}>{title}</h3>
  </div>
);

const selectStyle = { background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' };

const Prescription = () => {
  const [busy, setBusy] = useState(null); // 'pdf' | 'print' | null
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState('');

  const [doctorSlug, setDoctorSlug] = useState(doctors[0].slug);
  const doctor = doctors.find(d => d.slug === doctorSlug) || doctors[0];

  const [patientInfo, setPatientInfo] = useState(() => ({ regNo: newRegNo(), name: '', age: '', sex: '', date: today() }));
  const [vitals, setVitals] = useState(emptyVitals);
  const [notes, setNotes] = useState(emptyNotes);
  const [medicines, setMedicines] = useState(() => [emptyMedicine()]);

  const prescriptionRef = useRef(null);

  const addMedicine = () => setMedicines(prev => [...prev, emptyMedicine()]);
  const removeMedicine = (id) => setMedicines(prev => prev.filter(m => m.id !== id));
  const updateMed = (id, field, value) =>
    setMedicines(prev => prev.map(m => (m.id === id ? { ...m, [field]: value } : m)));

  const filledMedicines = medicines.filter(m => !isEmptyMedicine(m));

  /* Render the preview at a fixed A4 width and split it across as many
     A4 pages as needed, instead of shrinking everything onto one page.
     Pages break only between blocks marked data-rx-break (table rows,
     note sections), so no line of text is ever cut in half. */
  const buildPdf = async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    let breakPoints = [];
    const canvas = await html2canvas(prescriptionRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 1400,
      onclone: (_doc, el) => {
        Object.assign(el.style, {
          width: `${A4_WIDTH_PX}px`,
          minHeight: `${A4_HEIGHT_PX - 4}px`, // a hair under A4 so rounding never spills a blank page
          borderRadius: '0',
          boxShadow: 'none',
          border: 'none',
        });
        const top = el.getBoundingClientRect().top;
        breakPoints = [...el.querySelectorAll('[data-rx-break]')]
          .map(n => n.getBoundingClientRect().bottom - top)
          .sort((a, b) => a - b);
      },
    });

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageW = pdf.internal.pageSize.getWidth();
    const pxPerCss = canvas.width / A4_WIDTH_PX;
    const pageHeightPx = Math.floor(canvas.width * (pdf.internal.pageSize.getHeight() / pageW));
    const topMarginPx = Math.round(36 * pxPerCss);          // breathing room on continuation pages
    const breaks = breakPoints.map(b => Math.round(b * pxPerCss));

    let y = 0;
    for (let page = 0; y < canvas.height - 8 * pxPerCss; page++) {
      const offset = page === 0 ? 0 : topMarginPx;
      const room = pageHeightPx - offset;
      let end = Math.min(y + room, canvas.height);
      if (end < canvas.height) {
        // Pull the cut back to the last block boundary that fits on this page.
        const safe = breaks.filter(b => b > y + room * 0.3 && b <= end).pop();
        if (safe) end = safe;
      }
      const sliceH = end - y;
      const slice = document.createElement('canvas');
      slice.width = canvas.width;
      slice.height = sliceH + offset;
      const ctx = slice.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, slice.width, slice.height);
      ctx.drawImage(canvas, 0, y, canvas.width, sliceH, 0, offset, canvas.width, sliceH);
      if (page > 0) pdf.addPage();
      pdf.addImage(slice.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, pageW, slice.height * (pageW / canvas.width));
      y = end;
    }
    return pdf;
  };

  const fileName = () => {
    const safeName = (patientInfo.name || 'Patient').trim().replace(/[^\wऀ-ॿ]+/g, '_');
    return `Prescription_${safeName}_${patientInfo.regNo}.pdf`;
  };

  const run = async (kind) => {
    if (busy) return;
    setError('');
    // Open the print window synchronously so popup blockers allow it.
    const printWin = kind === 'print' ? window.open('', '_blank') : null;
    setBusy(kind);
    try {
      const pdf = await buildPdf();
      if (kind === 'print') {
        pdf.autoPrint();
        const url = pdf.output('bloburl');
        if (printWin) printWin.location.href = url;
        else window.open(url, '_blank');
      } else {
        pdf.save(fileName());
        setGenerated(true);
        setTimeout(() => setGenerated(false), 3000);
      }
    } catch (err) {
      console.error(err);
      printWin?.close();
      setError('Could not create the PDF. Please try again, or use a recent version of Chrome/Edge.');
    }
    setBusy(null);
  };

  const hasContent =
    patientInfo.name || patientInfo.age || filledMedicines.length > 0 ||
    Object.values(vitals).some(Boolean) || notes.history || notes.diagnosis || notes.examination || notes.specialNotes;

  const reset = () => {
    if (hasContent && !window.confirm('Clear this prescription and start a new one?')) return;
    setPatientInfo({ regNo: newRegNo(), name: '', age: '', sex: '', date: today() });
    setVitals(emptyVitals);
    setNotes(emptyNotes);
    setMedicines([emptyMedicine()]);
    setError('');
  };

  return (
    <PortalLayout>
      <div style={{ fontFamily: "'Outfit', sans-serif" }}>
        {/* Page Header */}
        <div className="flex items-center justify-between mb-7 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#0F172A' }}>New Prescription</h1>
            <p className="text-sm mt-0.5" style={{ color: '#94A3B8' }}>Reg No: <span className="font-bold" style={{ color: '#0EA5E9' }}>{patientInfo.regNo}</span></p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={reset} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-slate-100" style={{ background: '#FFF', color: '#64748B', border: '1px solid #E2E8F0' }}>
              <RotateCcw size={15} /> Reset
            </button>
            <button
              onClick={() => run('print')}
              disabled={!!busy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-slate-100 disabled:opacity-70"
              style={{ background: '#FFF', color: '#0F172A', border: '1px solid #E2E8F0' }}
            >
              <Printer size={15} /> {busy === 'print' ? 'Preparing…' : 'Print'}
            </button>
            <button
              onClick={() => run('pdf')}
              disabled={!!busy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg transition-all hover:opacity-90 disabled:opacity-70"
              style={{ background: generated ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #0EA5E9, #0D9488)', minWidth: 160 }}
            >
              {generated ? <><CheckCircle2 size={16} /> PDF Saved!</> : busy === 'pdf' ? <><span className="animate-spin">⏳</span> Generating...</> : <><Download size={16} /> Download PDF</>}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl text-sm font-semibold" style={{ background: '#FEF2F2', color: '#B91C1C', border: '1px solid #FECACA' }}>
            {error}
          </div>
        )}

        <div className="flex flex-col xl:flex-row gap-6">
          {/* ═══ FORM PANEL ═══ */}
          <div className="xl:w-[46%] space-y-5">
            {/* Patient Info */}
            <div className="rounded-2xl p-6" style={{ background: '#FFF', border: '1px solid #E2E8F0' }}>
              <SectionHeader icon={User} title="Patient Information" />
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#64748B' }}>Consulting Doctor</label>
                  <select
                    value={doctorSlug}
                    onChange={e => setDoctorSlug(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
                    style={selectStyle}
                  >
                    {doctors.map(d => <option key={d.slug} value={d.slug}>{d.name} — {d.qualifications}</option>)}
                  </select>
                </div>
                <InputField label="Full Name" placeholder="e.g. Ramesh Kumar Sharma" value={patientInfo.name} onChange={e => setPatientInfo({ ...patientInfo, name: e.target.value })} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <InputField label="Age" type="number" min="0" max="120" placeholder="Age" value={patientInfo.age} onChange={e => setPatientInfo({ ...patientInfo, age: e.target.value })} />
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#64748B' }}>Sex</label>
                    <select
                      value={patientInfo.sex}
                      onChange={e => setPatientInfo({ ...patientInfo, sex: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
                      style={selectStyle}
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <InputField label="Date" value={patientInfo.date} onChange={e => setPatientInfo({ ...patientInfo, date: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Vitals */}
            <div className="rounded-2xl p-6" style={{ background: '#FFF', border: '1px solid #E2E8F0' }}>
              <SectionHeader icon={Activity} title="Vitals" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <InputField label="BP (mmHg)" placeholder="120/80" value={vitals.bp} onChange={e => setVitals({ ...vitals, bp: e.target.value })} />
                <InputField label="Pulse (bpm)" placeholder="72" value={vitals.pulse} onChange={e => setVitals({ ...vitals, pulse: e.target.value })} />
                <InputField label="Temp (°F)" placeholder="98.6" value={vitals.temp} onChange={e => setVitals({ ...vitals, temp: e.target.value })} />
                <InputField label="Weight (kg)" placeholder="70" value={vitals.weight} onChange={e => setVitals({ ...vitals, weight: e.target.value })} />
                <InputField label="SpO₂ (%)" placeholder="98" value={vitals.spo2} onChange={e => setVitals({ ...vitals, spo2: e.target.value })} />
              </div>
            </div>

            {/* Clinical Notes */}
            <div className="rounded-2xl p-6" style={{ background: '#FFF', border: '1px solid #E2E8F0' }}>
              <SectionHeader icon={ClipboardList} title="Clinical Notes" />
              <div className="space-y-4">
                <TextAreaField label="Patient History & Complaints" placeholder="Chief complaint, duration, associated symptoms..." value={notes.history} onChange={e => setNotes({ ...notes, history: e.target.value })} />
                <TextAreaField label="Examination / Findings" rows={2} placeholder="Nadi pariksha, general & systemic examination..." value={notes.examination} onChange={e => setNotes({ ...notes, examination: e.target.value })} />
                <TextAreaField label="Diagnosis" placeholder="Clinical diagnosis and ICD codes if applicable..." value={notes.diagnosis} onChange={e => setNotes({ ...notes, diagnosis: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Review After (days)" type="number" min="0" value={notes.reviewAfter} onChange={e => setNotes({ ...notes, reviewAfter: e.target.value })} />
                </div>
                <TextAreaField label="Special Notes / Instructions" rows={2} placeholder="Precautions, lifestyle changes, referral notes..." value={notes.specialNotes} onChange={e => setNotes({ ...notes, specialNotes: e.target.value })} />
              </div>
            </div>

            {/* Medicines */}
            <div className="rounded-2xl p-6" style={{ background: '#FFF', border: '1px solid #E2E8F0' }}>
              <div className="flex items-center justify-between mb-5 pb-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(124,58,237,0.15))' }}>
                    <ClipboardList size={16} style={{ color: '#8B5CF6' }} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: '#334155' }}>Medicines</h3>
                </div>
                <button onClick={addMedicine} className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0D9488)', color: '#FFF' }}>
                  <Plus size={14} /> Add Medicine
                </button>
              </div>
              <div className="space-y-3">
                {medicines.map((med, i) => (
                  <motion.div
                    key={med.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl p-4 relative"
                    style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#94A3B8' }}>Medicine {i + 1}</span>
                      {medicines.length > 1 && (
                        <button onClick={() => removeMedicine(med.id)} aria-label={`Remove medicine ${i + 1}`} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-all" style={{ color: '#EF4444' }}>
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text" placeholder="Medicine / Drug Name (e.g. Ashwagandha Churna)"
                        className="w-full px-3 py-2.5 rounded-lg text-sm font-medium outline-none"
                        style={{ background: '#FFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
                        value={med.name} onChange={e => updateMed(med.id, 'name', e.target.value)}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input type="text" placeholder="Dosage (e.g. 1-0-1)" className="px-3 py-2 rounded-lg text-xs font-medium outline-none" style={{ background: '#FFF', border: '1px solid #E2E8F0', color: '#0F172A' }} value={med.dosage} onChange={e => updateMed(med.id, 'dosage', e.target.value)} />
                        <input type="text" placeholder="Duration (e.g. 15 days)" className="px-3 py-2 rounded-lg text-xs font-medium outline-none" style={{ background: '#FFF', border: '1px solid #E2E8F0', color: '#0F172A' }} value={med.duration} onChange={e => updateMed(med.id, 'duration', e.target.value)} />
                        <select className="px-3 py-2 rounded-lg text-xs font-medium outline-none" style={{ background: '#FFF', border: '1px solid #E2E8F0', color: '#0F172A' }} value={med.timing} onChange={e => updateMed(med.id, 'timing', e.target.value)}>
                          <option>After Food</option>
                          <option>Before Food</option>
                          <option>With Food</option>
                          <option>Empty Stomach</option>
                          <option>At Bedtime</option>
                          <option>Morning</option>
                          <option>SOS</option>
                        </select>
                      </div>
                      <input type="text" placeholder="Special instruction (e.g. avoid dairy, take with warm water)" className="w-full px-3 py-2 rounded-lg text-xs font-medium outline-none" style={{ background: '#FFF', border: '1px solid #E2E8F0', color: '#64748B' }} value={med.instruction} onChange={e => updateMed(med.id, 'instruction', e.target.value)} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ PREVIEW PANEL ═══ */}
          <div className="xl:w-[54%] min-w-0">
            <div className="xl:sticky xl:top-0">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold" style={{ color: '#64748B' }}>Live Preview — A4 Format</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-semibold text-emerald-600">Updates as you type</span>
                </div>
              </div>

              {/* Scrolls sideways on narrow screens; the PDF is always full A4 width. */}
              <div className="overflow-x-auto rounded-2xl">
              {/* THE PRESCRIPTION PREVIEW */}
              <div
                ref={prescriptionRef}
                className="bg-white rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: '1px solid #E2E8F0', minHeight: 900, minWidth: 640, fontFamily: "'Outfit', sans-serif" }}
              >
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #0A0F1E 0%, #0F2137 100%)', padding: '32px 40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <div style={{ background: 'linear-gradient(135deg, #0EA5E9, #0D9488)', width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Stethoscope size={22} color="white" />
                        </div>
                        <div>
                          <p style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1 }}>{clinic.name}</p>
                          <p style={{ color: '#0EA5E9', fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', marginTop: 2 }}>{clinic.tagline}</p>
                        </div>
                      </div>
                      <p style={{ color: '#94A3B8', fontSize: 11, marginTop: 8 }}>📍 {clinic.address}</p>
                      <p style={{ color: '#94A3B8', fontSize: 11 }}>📞 {clinic.phone} &nbsp;|&nbsp; 🌐 {clinic.website}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700 }}>{doctor.name}</p>
                      <p style={{ color: '#0EA5E9', fontSize: 11, fontWeight: 600 }}>{doctor.qualifications}</p>
                      <p style={{ color: '#94A3B8', fontSize: 10, marginTop: 4 }}>{doctor.registration}</p>
                      <div style={{ marginTop: 8, background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)', borderRadius: 8, padding: '4px 12px', display: 'inline-block' }}>
                        <p style={{ color: '#0EA5E9', fontSize: 10, fontWeight: 700 }}>{clinic.opdHours}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gradient divider */}
                <div style={{ height: 4, background: 'linear-gradient(90deg, #0EA5E9, #0D9488, #8B5CF6)' }}></div>

                {/* Patient Info Bar */}
                <div data-rx-break style={{ padding: '20px 40px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1.2fr', gap: 16 }}>
                    {[
                      { label: 'Patient Name', value: patientInfo.name || '—' },
                      { label: 'Age / Sex', value: `${patientInfo.age || '—'} / ${patientInfo.sex || '—'}` },
                      { label: 'Reg. No', value: patientInfo.regNo },
                      { label: 'Date', value: patientInfo.date },
                    ].map(f => (
                      <div key={f.label}>
                        <p style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1.5 }}>{f.label}</p>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginTop: 3, wordBreak: 'break-word' }}>{f.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vitals Strip */}
                {Object.values(vitals).some(Boolean) && (
                  <div data-rx-break style={{ padding: '12px 40px', background: '#EFF6FF', borderBottom: '1px solid #DBEAFE', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    {[
                      { label: 'BP', value: vitals.bp, unit: 'mmHg' },
                      { label: 'Pulse', value: vitals.pulse, unit: 'bpm' },
                      { label: 'Temp', value: vitals.temp, unit: '°F' },
                      { label: 'Weight', value: vitals.weight, unit: 'kg' },
                      { label: 'SpO₂', value: vitals.spo2, unit: '%' },
                    ].filter(v => v.value).map(v => (
                      <div key={v.label} style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: 9, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{v.label}</p>
                        <p style={{ fontSize: 16, fontWeight: 800, color: '#1E40AF' }}>{v.value} <span style={{ fontSize: 9, color: '#64748B', fontWeight: 500 }}>{v.unit}</span></p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Body */}
                <div style={{ padding: '28px 40px' }}>
                  {/* History, Examination & Diagnosis */}
                  {(notes.history || notes.examination || notes.diagnosis) && (
                    <div style={{ marginBottom: 24, padding: 16, background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                      {[
                        { label: 'History & Complaints', value: notes.history },
                        { label: 'Examination / Findings', value: notes.examination },
                      ].filter(n => n.value).map(n => (
                        <div key={n.label} data-rx-break style={{ marginBottom: 10 }}>
                          <p style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1.5 }}>{n.label}</p>
                          <p style={{ fontSize: 12, color: '#334155', marginTop: 4, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{n.value}</p>
                        </div>
                      ))}
                      {notes.diagnosis && (
                        <div data-rx-break>
                          <p style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1.5 }}>Diagnosis</p>
                          <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginTop: 4, whiteSpace: 'pre-wrap' }}>{notes.diagnosis}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Rx Section */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <span style={{ fontFamily: 'Georgia, serif', fontSize: 36, fontWeight: 700, fontStyle: 'italic', color: '#0EA5E9', lineHeight: 1 }}>Rx</span>
                      <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, #E2E8F0, transparent)' }}></div>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr data-rx-break style={{ background: '#F1F5F9' }}>
                          {['#', 'Medicine / Drug Name', 'Dosage', 'Duration', 'Timing'].map(h => (
                            <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 9, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1.5, borderBottom: '1px solid #E2E8F0' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filledMedicines.length === 0 ? (
                          <tr>
                            <td colSpan={5} style={{ padding: '16px 12px', fontSize: 12, color: '#94A3B8', fontStyle: 'italic' }}>No medicines added yet.</td>
                          </tr>
                        ) : filledMedicines.map((med, i) => (
                          <tr key={med.id} data-rx-break style={{ borderBottom: '1px solid #F1F5F9', background: i % 2 === 0 ? '#FFFFFF' : '#FAFBFC' }}>
                            <td style={{ padding: '12px', fontSize: 11, color: '#94A3B8', fontWeight: 700, verticalAlign: 'top' }}>{i + 1}</td>
                            <td style={{ padding: '12px', verticalAlign: 'top' }}>
                              <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{med.name || '—'}</p>
                              {med.instruction && <p style={{ fontSize: 10, color: '#64748B', marginTop: 2, fontStyle: 'italic' }}>{med.instruction}</p>}
                            </td>
                            <td style={{ padding: '12px', fontSize: 12, color: '#334155', fontWeight: 600, verticalAlign: 'top' }}>{med.dosage || '—'}</td>
                            <td style={{ padding: '12px', fontSize: 12, color: '#334155', fontWeight: 600, verticalAlign: 'top' }}>{med.duration || '—'}</td>
                            <td style={{ padding: '12px', verticalAlign: 'top' }}>
                              <span style={{ display: 'inline-block', fontSize: 10, lineHeight: '16px', fontWeight: 700, color: '#0D9488', background: '#F0FDFA', border: '1px solid #CCFBF1', borderRadius: 6, padding: '1px 8px 3px', whiteSpace: 'nowrap' }}>{med.timing}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Special Notes */}
                  {notes.specialNotes && (
                    <div data-rx-break style={{ marginBottom: 24, padding: '12px 16px', borderLeft: '3px solid #0EA5E9', background: '#EFF6FF', borderRadius: '0 8px 8px 0' }}>
                      <p style={{ fontSize: 9, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>Special Instructions</p>
                      <p style={{ fontSize: 12, color: '#1E40AF', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{notes.specialNotes}</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      {notes.reviewAfter && Number(notes.reviewAfter) > 0 && (
                        <p style={{ fontSize: 10, color: '#64748B', marginBottom: 4 }}>🔄 Please review after <strong>{notes.reviewAfter} {Number(notes.reviewAfter) === 1 ? 'day' : 'days'}</strong></p>
                      )}
                      <p style={{ fontSize: 10, color: '#64748B' }}>🚨 Emergency: {clinic.emergencyPhone} (24/7)</p>
                      <p style={{ fontSize: 9, color: '#94A3B8', marginTop: 8, fontStyle: 'italic' }}>This prescription is valid for 30 days from the date of issue.</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: 140, height: 48, borderBottom: '1.5px solid #334155', marginBottom: 6 }}></div>
                      <p style={{ fontSize: 10, fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: 1 }}>{doctor.name}</p>
                      <p style={{ fontSize: 9, color: '#64748B' }}>{doctor.qualifications}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom strip */}
                <div style={{ height: 4, background: 'linear-gradient(90deg, #0EA5E9, #0D9488, #8B5CF6)' }}></div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Prescription;
