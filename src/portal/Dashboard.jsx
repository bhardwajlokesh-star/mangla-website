import { useState } from 'react';
import PortalLayout from './PortalLayout';
import { motion } from 'framer-motion';
import {
  Users, FileText, Calendar, Activity, ChevronRight, TrendingUp,
  TrendingDown, MoreVertical, ArrowUpRight, Clock, CheckCircle, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ label, value, icon: Icon, gradient, trend, trendVal, delay }) => (
  <motion.div
    initial={{ y: 24, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="rounded-2xl p-6 relative overflow-hidden"
    style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
  >
    <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -translate-y-8 translate-x-8" style={{ background: gradient }}></div>
    <div className="flex items-start justify-between mb-5">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: gradient }}>
        <Icon size={20} className="text-white" />
      </div>
      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}
        style={{ background: trend === 'up' ? '#ECFDF5' : '#FEF2F2' }}>
        {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {trendVal}
      </div>
    </div>
    <p className="text-3xl font-bold tracking-tight" style={{ color: '#0F172A', fontFamily: "'Outfit', sans-serif" }}>{value}</p>
    <p className="text-sm mt-1 font-medium" style={{ color: '#94A3B8' }}>{label}</p>
  </motion.div>
);

const statusConfig = {
  Completed: { bg: '#ECFDF5', color: '#059669', icon: CheckCircle },
  Pending: { bg: '#FFFBEB', color: '#D97706', icon: Clock },
  'In Progress': { bg: '#EFF6FF', color: '#2563EB', icon: Loader2 },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);

  const stats = [
    { label: 'Total Patients', value: '1,284', icon: Users, gradient: 'linear-gradient(135deg, #0EA5E9, #0284C7)', trend: 'up', trendVal: '+12%', delay: 0 },
    { label: 'Prescriptions', value: '458', icon: FileText, gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)', trend: 'up', trendVal: '+5%', delay: 0.07 },
    { label: "Today's Appointments", value: '18', icon: Calendar, gradient: 'linear-gradient(135deg, #10B981, #059669)', trend: 'down', trendVal: '-2%', delay: 0.14 },
    { label: 'Diagnostics Ordered', value: '24', icon: Activity, gradient: 'linear-gradient(135deg, #F59E0B, #D97706)', trend: 'up', trendVal: '+8%', delay: 0.21 },
  ];

  const recentPatients = [
    { name: 'Lokesh Sharma', id: 'M-1024', age: 28, sex: 'M', status: 'Completed', problem: 'Skin Allergy', time: '09:15 AM' },
    { name: 'Suresh Raina', id: 'M-1025', age: 35, sex: 'M', status: 'Pending', problem: 'Joint Pain', time: '10:30 AM' },
    { name: 'Priya Verma', id: 'M-1026', age: 24, sex: 'F', status: 'In Progress', problem: 'Viral Fever', time: '11:00 AM' },
    { name: 'Amitabh Gupta', id: 'M-1027', age: 52, sex: 'M', status: 'Completed', problem: 'Digestion Issues', time: '11:45 AM' },
    { name: 'Sunita Devi', id: 'M-1028', age: 45, sex: 'F', status: 'Pending', problem: 'General Weakness', time: '12:30 PM' },
  ];

  const todaySchedule = [
    { time: '2:00 PM', patient: 'Rohit Yadav', type: 'Follow-up' },
    { time: '3:00 PM', patient: 'Kavita Sharma', type: 'New Consultation' },
    { time: '4:30 PM', patient: 'Deepak Jain', type: 'Lab Review' },
  ];

  const avatarColors = ['#0EA5E9', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <PortalLayout>
      <div className="space-y-8" style={{ fontFamily: "'Outfit', sans-serif" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: '#94A3B8' }}>
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <h1 className="text-3xl font-bold" style={{ color: '#0F172A' }}>
                Good morning, <span style={{ background: 'linear-gradient(135deg, #0EA5E9, #0D9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dr. Devendra</span> 👋
              </h1>
              <p className="mt-1 text-sm" style={{ color: '#64748B' }}>You have 18 appointments today. 5 patients are waiting.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/portal/prescription')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #0EA5E9, #0D9488)' }}
              >
                <FileText size={16} /> New Prescription
              </button>
              <button
                onClick={() => navigate('/portal/records')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-slate-100"
                style={{ background: '#FFFFFF', color: '#334155', border: '1px solid #E2E8F0' }}
              >
                <Users size={16} /> View Records
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Patients Table */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold" style={{ color: '#0F172A' }}>Recent Patients</h2>
              <button
                onClick={() => navigate('/portal/records')}
                className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                style={{ color: '#0EA5E9' }}
              >
                View All <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    {['Patient', 'Problem', 'Time', 'Status'].map(h => (
                      <th key={h} className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest" style={{ color: '#94A3B8' }}>{h}</th>
                    ))}
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentPatients.map((p, i) => {
                    const { bg, color, icon: StatusIcon } = statusConfig[p.status];
                    return (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 + 0.3 }}
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                        style={{ borderBottom: i < recentPatients.length - 1 ? '1px solid #F8FAFC' : 'none' }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                              style={{ background: avatarColors[i % avatarColors.length] }}>
                              {p.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-sm" style={{ color: '#0F172A' }}>{p.name}</p>
                              <p className="text-xs" style={{ color: '#94A3B8' }}>{p.id} · {p.age}y/{p.sex}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: '#F1F5F9', color: '#334155' }}>{p.problem}</span>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium" style={{ color: '#64748B' }}>{p.time}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg w-fit text-xs font-bold" style={{ background: bg, color }}>
                            <StatusIcon size={12} />
                            {p.status}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <button
                              onClick={() => setActiveMenu(activeMenu === i ? null : i)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-all"
                            >
                              <MoreVertical size={16} style={{ color: '#94A3B8' }} />
                            </button>
                            {activeMenu === i && (
                              <div className="absolute right-0 top-10 w-40 rounded-xl shadow-xl z-10 overflow-hidden" style={{ background: '#FFF', border: '1px solid #E2E8F0' }}>
                                {['View Details', 'New Prescription', 'Delete'].map((opt, j) => (
                                  <button key={j} onClick={() => setActiveMenu(null)}
                                    className="w-full text-left px-4 py-3 text-xs font-semibold hover:bg-slate-50 transition-all"
                                    style={{ color: j === 2 ? '#EF4444' : '#334155', borderBottom: j < 2 ? '1px solid #F8FAFC' : 'none' }}>
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Today's Schedule */}
            <div className="rounded-2xl p-6" style={{ background: '#0A0F1E', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-white">Today's Schedule</h3>
                <span className="text-xs px-2 py-1 rounded-lg font-bold" style={{ background: 'rgba(14,165,233,0.15)', color: '#0EA5E9' }}>3 left</span>
              </div>
              <div className="space-y-4">
                {todaySchedule.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full mt-1" style={{ background: '#0EA5E9' }}></div>
                      {i < todaySchedule.length - 1 && <div className="w-px flex-grow my-1" style={{ background: 'rgba(255,255,255,0.06)', minHeight: '24px' }}></div>}
                    </div>
                    <div className="flex-grow pb-1">
                      <p className="text-xs font-bold" style={{ color: '#0EA5E9' }}>{s.time}</p>
                      <p className="text-sm font-semibold text-white mt-0.5">{s.patient}</p>
                      <p className="text-xs" style={{ color: '#475569' }}>{s.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <h3 className="font-bold mb-4" style={{ color: '#0F172A' }}>Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { label: 'Create Prescription', path: '/portal/prescription', gradient: 'linear-gradient(135deg, #0EA5E9, #0D9488)' },
                  { label: 'Add Diet Plan', path: '/portal/diet-exercise', gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' },
                  { label: 'Patient Records', path: '/portal/records', gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)' },
                ].map((action, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(action.path)}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all hover:opacity-90 text-white text-sm font-bold"
                    style={{ background: action.gradient }}
                  >
                    {action.label}
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="rounded-2xl p-5" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <h3 className="font-bold mb-4 text-sm" style={{ color: '#0F172A' }}>System Status</h3>
              {[
                { label: 'Database Sync', ok: true },
                { label: 'Backup Service', ok: true },
                { label: 'PDF Engine', ok: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < 2 ? '1px solid #F8FAFC' : 'none' }}>
                  <span className="text-xs font-medium" style={{ color: '#64748B' }}>{item.label}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-emerald-600">Operational</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Dashboard;