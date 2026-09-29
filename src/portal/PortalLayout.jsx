import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Utensils, Users,
  Settings, LogOut, Bell, Search,
  ChevronRight, Stethoscope, X, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { isSignedIn, signOut } from './auth';

const menuItems = [
  { name: 'Dashboard', path: '/portal/dashboard', icon: LayoutDashboard },
  { name: 'Prescription', path: '/portal/prescription', icon: FileText },
  { name: 'Diet & Exercise', path: '/portal/diet-exercise', icon: Utensils },
  { name: 'Patient Records', path: '/portal/records', icon: Users },
  { name: 'Settings', path: '/portal/settings', icon: Settings },
];

const notifications = [
  { text: 'New patient registered: Arjun Mehta', time: '2 min ago', unread: true },
  { text: 'Prescription #M-1029 generated', time: '18 min ago', unread: true },
  { text: 'Follow-up reminder: Priya Verma', time: '1 hr ago', unread: false },
  { text: 'Lab results uploaded for M-1024', time: '3 hrs ago', unread: false },
];

const SidebarContent = ({ pathname, onNavigate, onLogout }) => (
  <div className="flex flex-col h-full" style={{ fontFamily: "'Outfit', sans-serif" }}>
    {/* Logo */}
    <div className="px-6 pt-8 pb-6">
      <Link to="/" className="flex items-center gap-3">
        <div className="relative">
          <div style={{ background: 'linear-gradient(135deg, #0EA5E9, #0D9488)' }} className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
            <Stethoscope size={20} className="text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"></div>
        </div>
        <div>
          <p className="text-white font-bold text-lg leading-none tracking-tight">Mangla</p>
          <p style={{ color: '#0EA5E9' }} className="text-xs font-semibold tracking-widest uppercase">Healthcare</p>
        </div>
      </Link>
    </div>

    {/* Doctor Profile Card */}
    <div className="mx-4 mb-6 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div style={{ background: 'linear-gradient(135deg, #0EA5E9, #0D9488)' }} className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
          D
        </div>
        <div className="min-w-0">
          <p className="text-white font-bold text-sm truncate">Dr. Devendra Kumar</p>
          <p className="text-xs truncate" style={{ color: '#64748B' }}>MBBS, MD — General Physician</p>
        </div>
      </div>
      <div className="mt-3 pt-3 flex items-center gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-emerald-400 font-semibold">On Duty · OPD Open</span>
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-grow px-4 space-y-1">
      <p className="px-3 mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: '#334155' }}>Navigation</p>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        return (
          <Link key={item.name} to={item.path} onClick={onNavigate}>
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative"
              style={{
                background: isActive ? 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(13,148,136,0.2))' : 'transparent',
                border: isActive ? '1px solid rgba(14,165,233,0.3)' : '1px solid transparent',
              }}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full" style={{ background: 'linear-gradient(to bottom, #0EA5E9, #0D9488)' }}></div>
              )}
              <Icon size={18} style={{ color: isActive ? '#0EA5E9' : '#475569' }} />
              <span className="font-semibold text-sm" style={{ color: isActive ? '#E2E8F0' : '#64748B' }}>{item.name}</span>
              {isActive && <ChevronRight size={14} className="ml-auto" style={{ color: '#0EA5E9' }} />}
            </motion.div>
          </Link>
        );
      })}
    </nav>

    {/* Logout */}
    <div className="p-4 mt-auto">
      <div className="rounded-xl p-3 mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-xs font-semibold mb-1" style={{ color: '#475569' }}>Portal Version</p>
        <p className="text-xs" style={{ color: '#334155' }}>v2.4.1-stable · All systems normal</p>
      </div>
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
        style={{ color: '#F87171' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <LogOut size={18} />
        <span className="font-semibold text-sm">Logout</span>
      </button>
    </div>
  </div>
);

const PortalLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  if (!isSignedIn()) return <Navigate to="/portal/login" replace state={{ from: location.pathname }} />;

  const logout = () => {
    signOut();
    navigate('/portal/login');
  };
  const sidebarProps = { pathname: location.pathname, onNavigate: () => setMobileOpen(false), onLogout: logout };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
      `}</style>
      <div className="min-h-screen flex overflow-hidden" style={{ background: '#F1F5F9', fontFamily: "'Outfit', sans-serif" }}>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-72 flex-col flex-shrink-0" style={{ background: '#0A0F1E', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <SidebarContent {...sidebarProps} />
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-40 lg:hidden"
                style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              />
              <motion.aside
                initial={{ x: -288 }} animate={{ x: 0 }} exit={{ x: -288 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 h-full w-72 z-50 flex flex-col lg:hidden"
                style={{ background: '#0A0F1E' }}
              >
                <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white p-2">
                  <X size={20} />
                </button>
                <SidebarContent {...sidebarProps} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main */}
        <main className="flex-grow flex flex-col h-screen overflow-hidden">
          {/* Topbar */}
          <header className="h-16 flex items-center justify-between px-6 flex-shrink-0" style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileOpen(true)} className="lg:hidden text-slate-500 hover:text-slate-900 p-2">
                <Menu size={20} />
              </button>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <Search size={16} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search patients, prescriptions..."
                  className="bg-transparent outline-none text-sm w-64"
                  style={{ color: '#64748B' }}
                />
                <kbd className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: '#E2E8F0', color: '#94A3B8' }}>⌘K</kbd>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                  style={{ background: notifOpen ? '#F1F5F9' : 'transparent' }}
                >
                  <Bell size={18} style={{ color: '#475569' }} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 top-12 w-80 rounded-2xl shadow-2xl overflow-hidden z-50"
                      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
                    >
                      <div className="px-5 py-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <p className="font-bold text-slate-900">Notifications</p>
                        <p className="text-xs text-slate-400 mt-0.5">2 unread alerts</p>
                      </div>
                      {notifications.map((n, i) => (
                        <div key={i} className="px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3" style={{ borderBottom: i < notifications.length - 1 ? '1px solid #F8FAFC' : 'none' }}>
                          <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.unread ? '#0EA5E9' : '#E2E8F0' }}></div>
                          <div>
                            <p className="text-sm" style={{ color: '#334155', fontWeight: n.unread ? '600' : '400' }}>{n.text}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div style={{ width: 1, height: 28, background: '#E2E8F0' }}></div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold" style={{ color: '#0F172A' }}>Dr. Devendra</p>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>Chief Physician</p>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #0EA5E9, #0D9488)' }} className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer">
                  D
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default PortalLayout;