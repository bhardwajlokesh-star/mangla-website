import React, { useState, useMemo } from 'react';
import PortalLayout from './PortalLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, MoreVertical, Eye, Download, Trash2,
  Calendar, Phone, ChevronUp, ChevronDown, X, Plus,
  CheckCircle, Clock, Loader2, ArrowUpRight, Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STATUS_CONFIG = {
  Completed: { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0', icon: CheckCircle },
  Pending: { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A', icon: Clock },
  'In Progress': { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE', icon: Loader2 },
};

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #0EA5E9, #0284C7)',
  'linear-gradient(135deg, #8B5CF6, #7C3AED)',
  'linear-gradient(135deg, #10B981, #059669)',
  'linear-gradient(135deg, #F59E0B, #D97706)',
  'linear-gradient(135deg, #EF4444, #DC2626)',
];

const initialPatients = [
  { id: 'M-1024', name: 'Lokesh Sharma', age: '28', sex: 'M', phone: '+91 98765 43210', problem: 'Skin Allergy', date: '2026-04-25', status: 'Completed', visits: 3 },
  { id: 'M-1025', name: 'Suresh Raina', age: '35', sex: 'M', phone: '+91 87654 32109', problem: 'Joint Pain', date: '2026-04-26', status: 'Pending', visits: 1 },
  { id: 'M-1026', name: 'Priya Verma', age: '24', sex: 'F', phone: '+91 76543 21098', problem: 'Viral Fever', date: '2026-04-27', status: 'In Progress', visits: 2 },
  { id: 'M-1027', name: 'Amitabh Gupta', age: '52', sex: 'M', phone: '+91 65432 10987', problem: 'Digestive Issues', date: '2026-04-28', status: 'Completed', visits: 5 },
  { id: 'M-1028', name: 'Sunita Devi', age: '45', sex: 'F', phone: '+91 54321 09876', problem: 'General Weakness', date: '2026-04-28', status: 'Pending', visits: 1 },
  { id: 'M-1029', name: 'Arjun Mehta', age: '31', sex: 'M', phone: '+91 43210 98765', problem: 'Migraine', date: '2026-04-29', status: 'Completed', visits: 4 },
  { id: 'M-1030', name: 'Kavita Bhandari', age: '38', sex: 'F', phone: '+91 32109 87654', problem: 'Thyroid', date: '2026-04-30', status: 'In Progress', visits: 7 },
  { id: 'M-1031', name: 'Deepak Jain', age: '60', sex: 'M', phone: '+91 21098 76543', problem: 'Hypertension', date: '2026-05-01', status: 'Pending', visits: 12 },
];

const PatientRecords = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const toggleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const filtered = useMemo(() => {
    return patients
      .filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase()) || p.problem.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone.includes(searchTerm);
        const matchStatus = statusFilter === 'All' || p.status === statusFilter;
        return matchSearch && matchStatus;
      })
      .sort((a, b) => {
        let va = a[sortField], vb = b[sortField];
        if (sortField === 'age') { va = parseInt(va); vb = parseInt(vb); }
        if (sortField === 'date') { va = new Date(va); vb = new Date(vb); }
        if (va < vb) return sortDir === 'asc' ? -1 : 1;
        if (va > vb) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
  }, [patients, searchTerm, statusFilter, sortField, sortDir]);

  const deletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
    setActiveMenu(null);
    if (selectedPatient?.id === id) setSelectedPatient(null);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronUp size={12} style={{ color: '#CBD5E1' }} />;
    return sortDir === 'asc' ? <ChevronUp size={12} style={{ color: '#0EA5E9' }} /> : <ChevronDown size={12} style={{ color: '#0EA5E9' }} />;
  };

  const counts = {
    All: patients.length,
    Completed: patients.filter(p => p.status === 'Completed').length,
    Pending: patients.filter(p => p.status === 'Pending').length,
    'In Progress': patients.filter(p => p.status === 'In Progress').length,
  };

  return (
    <PortalLayout>
      <div style={{ fontFamily: "'Outfit', sans-serif" }}>
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-7">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#0F172A' }}>Patient Records</h1>
            <p className="text-sm mt-0.5" style={{ color: '#94A3B8' }}>{patients.length} total patients · {counts.Pending} pending</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/portal/prescription')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-md hover:opacity-90 transition-all"
              style={{ background: 'linear-gradient(135deg, #0EA5E9, #0D9488)' }}
            >
              <Plus size={16} /> New Patient
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-slate-100"
              style={{ background: '#FFF', color: '#334155', border: '1px solid #E2E8F0' }}>
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* Stats Pills */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {Object.entries(counts).map(([status, count]) => {
            const isActive = statusFilter === status;
            const cfg = status !== 'All' ? STATUS_CONFIG[status] : null;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: isActive ? (cfg ? cfg.bg : '#0F172A') : '#FFF',
                  color: isActive ? (cfg ? cfg.color : '#FFF') : '#64748B',
                  border: `1px solid ${isActive ? (cfg ? cfg.border : '#0F172A') : '#E2E8F0'}`,
                }}
              >
                {status} <span className="rounded-full px-1.5 py-0.5" style={{ background: isActive ? 'rgba(0,0,0,0.1)' : '#F1F5F9', fontSize: 10 }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="mb-5 flex gap-3">
          <div className="flex-grow flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: '#FFF', border: '1px solid #E2E8F0' }}>
            <Search size={16} className="flex-shrink-0" style={{ color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search by name, ID, problem, or phone..."
              className="flex-grow text-sm outline-none bg-transparent"
              style={{ color: '#0F172A' }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} style={{ color: '#94A3B8' }}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Table */}
          <div className={`${selectedPatient ? 'xl:w-[58%]' : 'w-full'} transition-all`}>
            <div className="rounded-2xl overflow-hidden" style={{ background: '#FFF', border: '1px solid #E2E8F0' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    {[
                      { label: 'Patient', field: 'name' },
                      { label: 'Contact', field: null },
                      { label: 'Problem', field: 'problem' },
                      { label: 'Date', field: 'date' },
                      { label: 'Status', field: 'status' },
                    ].map(col => (
                      <th
                        key={col.label}
                        className="px-6 py-4 text-left"
                        onClick={() => col.field && toggleSort(col.field)}
                        style={{ cursor: col.field ? 'pointer' : 'default', userSelect: 'none' }}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                          {col.label}
                          {col.field && <SortIcon field={col.field} />}
                        </div>
                      </th>
                    ))}
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((p, i) => {
                      const cfg = STATUS_CONFIG[p.status];
                      const StatusIcon = cfg.icon;
                      const isSelected = selectedPatient?.id === p.id;
                      return (
                        <motion.tr
                          key={p.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.03 }}
                          onClick={() => setSelectedPatient(isSelected ? null : p)}
                          className="group cursor-pointer transition-all"
                          style={{
                            borderBottom: '1px solid #F8FAFC',
                            background: isSelected ? '#F0F9FF' : 'transparent',
                          }}
                          onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#F8FAFC'; }}
                          onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                                style={{ background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}
                              >
                                {p.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-sm" style={{ color: '#0F172A' }}>{p.name}</p>
                                <p className="text-xs" style={{ color: '#94A3B8' }}>{p.id} · {p.age}y/{p.sex}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-xs font-medium flex items-center gap-1.5" style={{ color: '#64748B' }}>
                              <Phone size={12} style={{ color: '#94A3B8' }} /> {p.phone}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: '#F1F5F9', color: '#334155' }}>{p.problem}</span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-xs font-medium flex items-center gap-1.5" style={{ color: '#64748B' }}>
                              <Calendar size={12} style={{ color: '#94A3B8' }} /> {p.date}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg w-fit text-xs font-bold" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                              <StatusIcon size={11} />
                              {p.status}
                            </div>
                          </td>
                          <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                            <div className="relative">
                              <button
                                onClick={() => setActiveMenu(activeMenu === p.id ? null : p.id)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-slate-100 transition-all"
                              >
                                <MoreVertical size={16} style={{ color: '#64748B' }} />
                              </button>
                              <AnimatePresence>
                                {activeMenu === p.id && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.92, y: 4 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.92 }}
                                    className="absolute right-0 top-10 w-44 rounded-xl shadow-xl z-20 overflow-hidden"
                                    style={{ background: '#FFF', border: '1px solid #E2E8F0' }}
                                  >
                                    {[
                                      { label: 'View Details', icon: Eye, action: () => { setSelectedPatient(p); setActiveMenu(null); } },
                                      { label: 'New Prescription', icon: ArrowUpRight, action: () => navigate('/portal/prescription') },
                                      { label: 'Delete Record', icon: Trash2, danger: true, action: () => deletePatient(p.id) },
                                    ].map((opt, j) => {
                                      const Icon = opt.icon;
                                      return (
                                        <button
                                          key={j}
                                          onClick={opt.action}
                                          className="w-full text-left px-4 py-3 text-xs font-semibold hover:bg-slate-50 transition-all flex items-center gap-2.5"
                                          style={{ color: opt.danger ? '#EF4444' : '#334155', borderBottom: j < 2 ? '1px solid #F8FAFC' : 'none' }}
                                        >
                                          <Icon size={14} /> {opt.label}
                                        </button>
                                      );
                                    })}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#F1F5F9' }}>
                    <Users size={28} style={{ color: '#CBD5E1' }} />
                  </div>
                  <p className="font-bold text-sm" style={{ color: '#64748B' }}>No patients match your search</p>
                  <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>Try adjusting your filters</p>
                  <button onClick={() => { setSearchTerm(''); setStatusFilter('All'); }} className="mt-4 text-xs font-bold px-4 py-2 rounded-xl transition-all hover:bg-slate-100" style={{ color: '#0EA5E9' }}>
                    Clear Filters
                  </button>
                </div>
              )}

              <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop: '1px solid #F8FAFC' }}>
                <p className="text-xs font-medium" style={{ color: '#94A3B8' }}>Showing {filtered.length} of {patients.length} records</p>
                <div className="flex gap-1">
                  {[1, 2, 3].map(page => (
                    <button key={page} className="w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center"
                      style={{ background: page === 1 ? '#0F172A' : '#F1F5F9', color: page === 1 ? '#FFF' : '#64748B' }}
                    >{page}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Patient Detail Panel */}
          <AnimatePresence>
            {selectedPatient && (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                className="hidden xl:block xl:w-[42%]"
              >
                <div className="rounded-2xl overflow-hidden sticky top-6" style={{ background: '#FFF', border: '1px solid #E2E8F0' }}>
                  {/* Detail Header */}
                  <div style={{ background: 'linear-gradient(135deg, #0A0F1E, #0F2137)', padding: '24px' }}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black flex-shrink-0"
                          style={{ background: AVATAR_GRADIENTS[patients.findIndex(p => p.id === selectedPatient.id) % AVATAR_GRADIENTS.length] }}>
                          {selectedPatient.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-black text-lg leading-tight">{selectedPatient.name}</p>
                          <p className="text-xs font-semibold mt-0.5" style={{ color: '#0EA5E9' }}>{selectedPatient.id}</p>
                        </div>
                      </div>
                      <button onClick={() => setSelectedPatient(null)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all" style={{ color: '#64748B' }}>
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Age', value: `${selectedPatient.age}y` },
                        { label: 'Sex', value: selectedPatient.sex === 'M' ? 'Male' : 'Female' },
                        { label: 'Visits', value: selectedPatient.visits },
                      ].map((info, i) => (
                        <div key={i} className="text-center rounded-xl p-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                          <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: '#94A3B8' }}>{info.label}</p>
                          <p className="font-black text-lg" style={{ color: '#0F172A' }}>{info.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: 'Primary Complaint', value: selectedPatient.problem },
                        { label: 'Phone', value: selectedPatient.phone },
                        { label: 'Last Visit', value: selectedPatient.date },
                      ].map((row, i) => (
                        <div key={i} className="flex justify-between items-start py-3" style={{ borderBottom: '1px solid #F8FAFC' }}>
                          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>{row.label}</span>
                          <span className="text-sm font-semibold text-right" style={{ color: '#334155', maxWidth: '60%' }}>{row.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>Status</span>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                        style={{ background: STATUS_CONFIG[selectedPatient.status].bg, color: STATUS_CONFIG[selectedPatient.status].color, border: `1px solid ${STATUS_CONFIG[selectedPatient.status].border}` }}>
                        {selectedPatient.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={() => navigate('/portal/prescription')}
                        className="py-3 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90"
                        style={{ background: 'linear-gradient(135deg, #0EA5E9, #0D9488)' }}
                      >
                        New Prescription
                      </button>
                      <button
                        onClick={() => deletePatient(selectedPatient.id)}
                        className="py-3 rounded-xl text-sm font-bold transition-all hover:bg-red-50"
                        style={{ background: '#FFF5F5', color: '#EF4444', border: '1px solid #FECACA' }}
                      >
                        Delete Record
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PortalLayout>
  );
};

export default PatientRecords;