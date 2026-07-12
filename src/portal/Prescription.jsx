import React, { useState, useRef } from 'react';
import PortalLayout from './PortalLayout';
import { motion } from 'framer-motion';
import { Plus, Trash2, Printer, User, Activity, ClipboardList, CheckCircle2, Stethoscope, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

const Prescription = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const [patientInfo, setPatientInfo] = useState({
    regNo: 'M-' + Math.floor(1000 + Math.random() * 9000),
    name: '', age: '', sex: '',
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
  });

  const [vitals, setVitals] = useState({ bp: '', pulse: '', temp: '', weight: '', spo2: '' });
  const [notes, setNotes] = useState({ history: '', examination: '', diagnosis: '', reviewAfter: '7', specialNotes: '' });
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', duration: '', instruction: '', timing: 'After Food' }]);

  const prescriptionRef = useRef();

  const addMedicine = () => setMedicines([...medicines, { name: '', dosage: '', duration: '', instruction: '', timing: 'After Food' }]);
  const removeMedicine = (i) => setMedicines(medicines.filter((_, idx) => idx !== i));

  const updateMed = (i, field, value) => {
    const m = [...medicines];
    m[i][field] = value;
    setMedicines(m);
  };

  const generatePDF = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const element = prescriptionRef.current;
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;
      const x = (pdfWidth - scaledWidth) / 2;
      pdf.addImage(imgData, 'PNG', x, 0, scaledWidth, scaledHeight);
      pdf.save(`Prescription_${patientInfo.name || 'Patient'}_${patientInfo.regNo}.pdf`);
      setGenerated(true);
      setTimeout(() => setGenerated(false), 3000);
    } catch (err) {
      console.error(err);
    }
    setIsGenerating(false);
  };

  const reset = () => {
    setPatientInfo({ regNo: 'M-' + Math.floor(1000 + Math.random() * 9000), name: '', age: '', sex: '', date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) });
    setVitals({ bp: '', pulse: '', temp: '', weight: '', spo2: '' });
    setNotes({ history: '', examination: '', diagnosis: '', reviewAfter: '7', specialNotes: '' });
    setMedicines([{ name: '', dosage: '', duration: '', instruction: '', timing: 'After Food' }]);
  };

  return (
    <PortalLayout>
      <style>{`
        @media print { .no-print { display: none !important; } }
        .rx-preview table { border-collapse: collapse; width: 100%; }
      `}</style>
      <div style={{ fontFamily: "'Outfit', sans-serif" }}>
        {/* Page Header */}
        <div className="flex items-center justify-between mb-7 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#0F172A' }}>New Prescription</h1>
            <p className="text-sm mt-0.5" style={{ color: '#94A3B8' }}>Reg No: <span className="font-bold" style={{ color: '#0EA5E9' }}>{patientInfo.regNo}</span></p>
          </div>
          <div className="flex gap-3 no-print">
            <button onClick={reset} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-slate-100" style={{ background: '#FFF', color: '#64748B', border: '1px solid #E2E8F0' }}>
              <RotateCcw size={15} /> Reset
            </button>
            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg transition-all hover:opacity-90 disabled:opacity-70"
              style={{ background: generated ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #0EA5E9, #0D9488)', minWidth: 160 }}
            >
              {generated ? <><CheckCircle2 size={16} /> PDF Saved!</> : isGenerating ? <><span className="animate-spin">⏳</span> Generating...</> : <><Printer size={16} /> Generate PDF</>}
            </button>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* ═══ FORM PANEL ═══ */}
          <div className="xl:w-[46%] space-y-5 no-print">
            {/* Patient Info */}
            <div className="rounded-2xl p-6" style={{ background: '#FFF', border: '1px solid #E2E8F0' }}>
              <SectionHeader icon={User} title="Patient Information" />
              <div className="space-y-4">
                <InputField label="Full Name" placeholder="e.g. Ramesh Kumar Sharma" value={patientInfo.name} onChange={e => setPatientInfo({ ...patientInfo, name: e.target.value })} />
                <div className="grid grid-cols-3 gap-3">
                  <InputField label="Age" type="number" placeholder="Age" value={patientInfo.age} onChange={e => setPatientInfo({ ...patientInfo, age: e.target.value })} />
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider" style={{ color: '#64748B' }}>Sex</label>
                    <select
                      value={patientInfo.sex}
                      onChange={e => setPatientInfo({ ...patientInfo, sex: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
                      style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}
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
              <div className="grid grid-cols-3 gap-3">
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
                <TextAreaField label="Diagnosis" placeholder="Clinical diagnosis and ICD codes if applicable..." value={notes.diagnosis} onChange={e => setNotes({ ...notes, diagnosis: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Review After (days)" type="number" value={notes.reviewAfter} onChange={e => setNotes({ ...notes, reviewAfter: e.target.value })} />
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
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl p-4 relative"
                    style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#94A3B8' }}>Medicine {i + 1}</span>
                      {i > 0 && (
                        <button onClick={() => removeMedicine(i)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-all" style={{ color: '#EF4444' }}>
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text" placeholder="Medicine / Drug Name (e.g. Azithromycin 500mg)"
                        className="w-full px-3 py-2.5 rounded-lg text-sm font-medium outline-none"
                        style={{ background: '#FFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
                        value={med.name} onChange={e => updateMed(i, 'name', e.target.value)}
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input type="text" placeholder="Dosage" className="px-3 py-2 rounded-lg text-xs font-medium outline-none" style={{ background: '#FFF', border: '1px solid #E2E8F0', color: '#0F172A' }} value={med.dosage} onChange={e => updateMed(i, 'dosage', e.target.value)} />
                        <input type="text" placeholder="Duration" className="px-3 py-2 rounded-lg text-xs font-medium outline-none" style={{ background: '#FFF', border: '1px solid #E2E8F0', color: '#0F172A' }} value={med.duration} onChange={e => updateMed(i, 'duration', e.target.value)} />
                        <select className="px-3 py-2 rounded-lg text-xs font-medium outline-none" style={{ background: '#FFF', border: '1px solid #E2E8F0', color: '#0F172A' }} value={med.timing} onChange={e => updateMed(i, 'timing', e.target.value)}>
                          <option>After Food</option>
                          <option>Before Food</option>
                          <option>With Food</option>
                          <option>Empty Stomach</option>
                          <option>At Bedtime</option>
                          <option>Morning</option>
                          <option>SOS</option>
                        </select>
                      </div>
                      <input type="text" placeholder="Special instruction (e.g. avoid dairy, take with warm water)" className="w-full px-3 py-2 rounded-lg text-xs font-medium outline-none" style={{ background: '#FFF', border: '1px solid #E2E8F0', color: '#64748B' }} value={med.instruction} onChange={e => updateMed(i, 'instruction', e.target.value)} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ PREVIEW PANEL ═══ */}
          <div className="xl:w-[54%]">
            <div className="sticky top-6">
              <div className="flex items-center justify-between mb-4 no-print">
                <p className="text-sm font-bold" style={{ color: '#64748B' }}>Live Preview — A4 Format</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-semibold text-emerald-600">Syncing...</span>
                </div>
              </div>

              {/* THE PRESCRIPTION PREVIEW */}
              <div
                ref={prescriptionRef}
                className="rx-preview bg-white rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: '1px solid #E2E8F0', minHeight: 900, fontFamily: "'Outfit', sans-serif" }}
              >
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #0A0F1E 0%, #0F2137 100%)', padding: '32px 40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <div style={{ background: 'linear-gradient(135deg, #0EA5E9, #0D9488)', width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Stethoscope size={22} color="white" />
                        </div>
                        <div>
                          <p style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1 }}>Mangla Healthcare</p>
                          <p style={{ color: '#0EA5E9', fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', marginTop: 2 }}>Nursing Home & Ayurveda Center</p>
                        </div>
                      </div>
                      <p style={{ color: '#475569', fontSize: 11, marginTop: 8 }}>📍 123 Medical Square, Healthcare City, Rajasthan, IN - 302001</p>
                      <p style={{ color: '#475569', fontSize: 11 }}>📞 +91 99926 54891 &nbsp;|&nbsp; 🌐 mangla-healthcare.in</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700 }}>Dr. Devendra Kumar</p>
                      <p style={{ color: '#0EA5E9', fontSize: 11, fontWeight: 600 }}>MBBS, MD (General Medicine)</p>
                      <p style={{ color: '#475569', fontSize: 10, marginTop: 4 }}>Reg. No: MCI-123456789</p>
                      <div style={{ marginTop: 8, background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)', borderRadius: 8, padding: '4px 12px', display: 'inline-block' }}>
                        <p style={{ color: '#0EA5E9', fontSize: 10, fontWeight: 700 }}>OPD: Mon–Sat | 9AM–2PM, 5PM–8PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gradient divider */}
                <div style={{ height: 4, background: 'linear-gradient(90deg, #0EA5E9, #0D9488, #8B5CF6)' }}></div>

                {/* Patient Info Bar */}
                <div style={{ padding: '20px 40px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                    {[
                      { label: 'Patient Name', value: patientInfo.name || '—' },
                      { label: 'Age / Sex', value: `${patientInfo.age || '—'} / ${patientInfo.sex || '—'}` },
                      { label: 'Reg. No', value: patientInfo.regNo },
                      { label: 'Date', value: patientInfo.date },
                    ].map((f, i) => (
                      <div key={i}>
                        <p style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1.5 }}>{f.label}</p>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginTop: 3 }}>{f.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vitals Strip */}
                {(vitals.bp || vitals.pulse || vitals.temp || vitals.weight || vitals.spo2) && (
                  <div style={{ padding: '12px 40px', background: '#EFF6FF', borderBottom: '1px solid #DBEAFE', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    {[
                      { label: 'BP', value: vitals.bp, unit: 'mmHg' },
                      { label: 'Pulse', value: vitals.pulse, unit: 'bpm' },
                      { label: 'Temp', value: vitals.temp, unit: '°F' },
                      { label: 'Weight', value: vitals.weight, unit: 'kg' },
                      { label: 'SpO₂', value: vitals.spo2, unit: '%' },
                    ].filter(v => v.value).map((v, i) => (
                      <div key={i} style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: 9, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{v.label}</p>
                        <p style={{ fontSize: 16, fontWeight: 800, color: '#1E40AF' }}>{v.value} <span style={{ fontSize: 9, color: '#64748B', fontWeight: 500 }}>{v.unit}</span></p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Body */}
                <div style={{ padding: '28px 40px' }}>
                  {/* History & Diagnosis */}
                  {(notes.history || notes.diagnosis) && (
                    <div style={{ marginBottom: 24, padding: 16, background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                      {notes.history && (
                        <div style={{ marginBottom: 10 }}>
                          <p style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1.5 }}>History & Complaints</p>
                          <p style={{ fontSize: 12, color: '#334155', marginTop: 4, lineHeight: 1.6 }}>{notes.history}</p>
                        </div>
                      )}
                      {notes.diagnosis && (
                        <div>
                          <p style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1.5 }}>Diagnosis</p>
                          <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginTop: 4 }}>{notes.diagnosis}</p>
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
                        <tr style={{ background: '#F1F5F9' }}>
                          {['#', 'Medicine / Drug Name', 'Dosage', 'Duration', 'Timing'].map((h, i) => (
                            <th key={i} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 9, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1.5, borderBottom: '1px solid #E2E8F0' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {medicines.map((med, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #F8FAFC', background: i % 2 === 0 ? '#FFFFFF' : '#FAFBFC' }}>
                            <td style={{ padding: '12px', fontSize: 11, color: '#94A3B8', fontWeight: 700 }}>{i + 1}</td>
                            <td style={{ padding: '12px' }}>
                              <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{med.name || '—'}</p>
                              {med.instruction && <p style={{ fontSize: 10, color: '#64748B', marginTop: 2, fontStyle: 'italic' }}>{med.instruction}</p>}
                            </td>
                            <td style={{ padding: '12px', fontSize: 12, color: '#334155', fontWeight: 600 }}>{med.dosage || '—'}</td>
                            <td style={{ padding: '12px', fontSize: 12, color: '#334155', fontWeight: 600 }}>{med.duration || '—'}</td>
                            <td style={{ padding: '12px' }}>
                              <span style={{ fontSize: 10, fontWeight: 700, color: '#0D9488', background: '#F0FDFA', border: '1px solid #CCFBF1', borderRadius: 6, padding: '2px 8px' }}>{med.timing}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Special Notes */}
                  {notes.specialNotes && (
                    <div style={{ marginBottom: 24, padding: '12px 16px', borderLeft: '3px solid #0EA5E9', background: '#EFF6FF', borderRadius: '0 8px 8px 0' }}>
                      <p style={{ fontSize: 9, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>Special Instructions</p>
                      <p style={{ fontSize: 12, color: '#1E40AF', lineHeight: 1.6 }}>{notes.specialNotes}</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <p style={{ fontSize: 10, color: '#64748B', marginBottom: 4 }}>🔄 Please review after <strong>{notes.reviewAfter || '7'} days</strong></p>
                      <p style={{ fontSize: 10, color: '#64748B' }}>🚨 Emergency: +91 99926 54891 (24/7)</p>
                      <p style={{ fontSize: 9, color: '#94A3B8', marginTop: 8, fontStyle: 'italic' }}>This prescription is valid for 30 days from the date of issue.</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: 140, height: 48, borderBottom: '1.5px solid #334155', marginBottom: 6 }}></div>
                      <p style={{ fontSize: 10, fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: 1 }}>Dr. Devendra Kumar</p>
                      <p style={{ fontSize: 9, color: '#64748B' }}>MBBS, MD</p>
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
    </PortalLayout>
  );
};

export default Prescription;