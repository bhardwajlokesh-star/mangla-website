import { useState } from 'react';
import PortalLayout from './PortalLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Lock, Bell, User, Palette, Shield, ChevronRight, Check, X, Eye,
  EyeOff, Save, Monitor, Moon, Sun
} from 'lucide-react';

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className="relative inline-flex items-center rounded-full transition-all duration-300 flex-shrink-0"
    style={{
      width: 44, height: 24,
      background: checked ? 'linear-gradient(135deg, #0EA5E9, #0D9488)' : '#E2E8F0',
    }}
  >
    <motion.span
      animate={{ x: checked ? 22 : 2 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="inline-block w-5 h-5 rounded-full bg-white shadow-md"
    />
  </button>
);

const InputField = ({ label, type = 'text', value, onChange, placeholder, suffix }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#64748B' }}>{label}</label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
          style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A', paddingRight: isPassword || suffix ? 44 : 16 }}
          onFocus={e => { e.target.style.borderColor = '#0EA5E9'; e.target.style.background = '#FFF'; }}
          onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.background = '#F8FAFC'; }}
        />
        {isPassword && (
          <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }}>
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
        {suffix && !isPassword && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold" style={{ color: '#94A3B8' }}>{suffix}</span>
        )}
      </div>
    </div>
  );
};

const SectionCard = ({ title, icon: Icon, accentColor, active, onClick }) => (
  <motion.button
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="text-left p-6 rounded-2xl transition-all w-full"
    style={{
      background: active ? `${accentColor}10` : '#FFF',
      border: `1px solid ${active ? accentColor + '40' : '#E2E8F0'}`,
      boxShadow: active ? `0 4px 20px ${accentColor}20` : '0 2px 8px rgba(0,0,0,0.04)',
    }}
  >
    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: active ? accentColor : '#F1F5F9' }}>
      <Icon size={20} style={{ color: active ? '#FFF' : '#64748B' }} />
    </div>
    <p className="font-bold text-sm mb-1" style={{ color: '#0F172A' }}>{title}</p>
    <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: active ? accentColor : '#94A3B8' }}>
      {active ? 'Editing' : 'Configure'} <ChevronRight size={12} />
    </div>
  </motion.button>
);

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    name: 'Dr. Devendra Kumar',
    email: 'devendra@mangla-healthcare.in',
    phone: '+91 99926 54891',
    specialization: 'General Medicine',
    regNo: 'MCI-123456789',
    clinic: 'Mangla Healthcare',
    address: '123 Medical Square, Healthcare City, Jaipur, Rajasthan - 302001',
    bio: 'Experienced General Physician and Ayurveda practitioner with 12+ years of clinical experience.'
  });

  // Security state
  const [security, setSecurity] = useState({
    currentPassword: '', newPassword: '', confirmPassword: '',
    twoFactor: true, loginAlerts: true, sessionTimeout: '30',
  });

  // Notification state
  const [notif, setNotif] = useState({
    emailNotif: true, smsNotif: false, pushNotif: true,
    newPatient: true, prescription: true, reminder: true, report: false, system: true
  });

  // Appearance state
  const [appearance, setAppearance] = useState({
    theme: 'light',
    accentColor: '#0EA5E9',
    fontSize: 'medium',
    compactMode: false,
    animations: true,
  });

  // Privacy state
  const [privacy, setPrivacy] = useState({
    dataSharing: false, analytics: true, twoFactorBackup: true,
    auditLog: true, autoBackup: true
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const sections = [
    { id: 'profile', title: 'Profile Settings', icon: User, color: '#0EA5E9' },
    { id: 'security', title: 'Security', icon: Lock, color: '#8B5CF6' },
    { id: 'notifications', title: 'Notifications', icon: Bell, color: '#F59E0B' },
    { id: 'appearance', title: 'Appearance', icon: Palette, color: '#EC4899' },
    { id: 'privacy', title: 'Privacy & Data', icon: Shield, color: '#10B981' },
    { id: 'region', title: 'Language & Region', icon: Globe, color: '#EF4444' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-5">
            {/* Avatar */}
            <div className="flex items-center gap-5 pb-5" style={{ borderBottom: '1px solid #F1F5F9' }}>
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0EA5E9, #0D9488)' }}>D</div>
              <div>
                <p className="font-black text-base" style={{ color: '#0F172A' }}>Profile Photo</p>
                <p className="text-xs mt-0.5 mb-3" style={{ color: '#94A3B8' }}>JPG, PNG or GIF. Max 2MB.</p>
                <div className="flex gap-2">
                  <button className="text-xs font-bold px-4 py-2 rounded-xl transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0D9488)', color: '#FFF' }}>Upload Photo</button>
                  <button className="text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-50 transition-all" style={{ color: '#EF4444', border: '1px solid #FECACA' }}>Remove</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Full Name" value={profile.name} onChange={v => setProfile({ ...profile, name: v })} />
              <InputField label="Email Address" type="email" value={profile.email} onChange={v => setProfile({ ...profile, email: v })} />
              <InputField label="Phone Number" value={profile.phone} onChange={v => setProfile({ ...profile, phone: v })} />
              <InputField label="Specialization" value={profile.specialization} onChange={v => setProfile({ ...profile, specialization: v })} />
              <InputField label="Registration Number" value={profile.regNo} onChange={v => setProfile({ ...profile, regNo: v })} />
              <InputField label="Clinic / Hospital Name" value={profile.clinic} onChange={v => setProfile({ ...profile, clinic: v })} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#64748B' }}>Clinic Address</label>
              <textarea rows={2} value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none resize-none transition-all"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#64748B' }}>Short Bio</label>
              <textarea rows={3} value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none resize-none"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }} />
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="rounded-xl p-5" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <p className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: '#334155' }}>Change Password</p>
              <div className="space-y-4">
                <InputField label="Current Password" type="password" value={security.currentPassword} onChange={v => setSecurity({ ...security, currentPassword: v })} placeholder="Enter current password" />
                <InputField label="New Password" type="password" value={security.newPassword} onChange={v => setSecurity({ ...security, newPassword: v })} placeholder="Min 8 characters" />
                <InputField label="Confirm New Password" type="password" value={security.confirmPassword} onChange={v => setSecurity({ ...security, confirmPassword: v })} placeholder="Repeat new password" />
                {security.newPassword && security.confirmPassword && (
                  <div className={`flex items-center gap-2 text-xs font-semibold ${security.newPassword === security.confirmPassword ? 'text-emerald-600' : 'text-red-500'}`}>
                    {security.newPassword === security.confirmPassword ? <Check size={14} /> : <X size={14} />}
                    {security.newPassword === security.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Two-Factor Authentication', desc: 'Require OTP login via SMS or email', key: 'twoFactor' },
                { label: 'Login Alerts', desc: 'Receive email on new device login', key: 'loginAlerts' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{item.desc}</p>
                  </div>
                  <Toggle checked={security[item.key]} onChange={v => setSecurity({ ...security, [item.key]: v })} />
                </div>
              ))}
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>Session Timeout</p>
                  <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>Auto-logout after inactivity</p>
                </div>
                <select value={security.sessionTimeout} onChange={e => setSecurity({ ...security, sessionTimeout: e.target.value })}
                  className="px-3 py-2 rounded-xl text-sm font-bold outline-none" style={{ background: '#FFF', border: '1px solid #E2E8F0', color: '#0F172A' }}>
                  {['15', '30', '60', '120'].map(v => <option key={v} value={v}>{v} minutes</option>)}
                </select>
              </div>
            </div>

            <div className="rounded-xl p-4" style={{ background: '#FFF5F5', border: '1px solid #FECACA' }}>
              <p className="text-sm font-black text-red-700 mb-1">Danger Zone</p>
              <p className="text-xs text-red-500 mb-3">These actions are irreversible. Please proceed with caution.</p>
              <button className="text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-100 transition-all" style={{ color: '#EF4444', border: '1px solid #FECACA', background: '#FFF' }}>
                Delete Account
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#94A3B8' }}>Channels</p>
              {[
                { label: 'Email Notifications', desc: 'Send alerts to your registered email', key: 'emailNotif' },
                { label: 'SMS Notifications', desc: 'Receive text messages for critical alerts', key: 'smsNotif' },
                { label: 'Push Notifications', desc: 'Browser and mobile push notifications', key: 'pushNotif' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{item.desc}</p>
                  </div>
                  <Toggle checked={notif[item.key]} onChange={v => setNotif({ ...notif, [item.key]: v })} />
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#94A3B8' }}>Alert Types</p>
              {[
                { label: 'New Patient Registration', key: 'newPatient' },
                { label: 'Prescription Generated', key: 'prescription' },
                { label: 'Follow-up Reminders', key: 'reminder' },
                { label: 'Lab Reports Ready', key: 'report' },
                { label: 'System Maintenance', key: 'system' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-slate-50 transition-all" style={{ border: '1px solid #F1F5F9' }}>
                  <p className="text-sm font-medium" style={{ color: '#334155' }}>{item.label}</p>
                  <Toggle checked={notif[item.key]} onChange={v => setNotif({ ...notif, [item.key]: v })} />
                </div>
              ))}
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>Theme</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'light', label: 'Light', icon: Sun },
                  { id: 'dark', label: 'Dark', icon: Moon },
                  { id: 'system', label: 'System', icon: Monitor },
                ].map(t => {
                  const Icon = t.icon;
                  const active = appearance.theme === t.id;
                  return (
                    <button key={t.id} onClick={() => setAppearance({ ...appearance, theme: t.id })}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all"
                      style={{ background: active ? '#EFF6FF' : '#F8FAFC', border: `1px solid ${active ? '#0EA5E9' : '#E2E8F0'}` }}>
                      <Icon size={20} style={{ color: active ? '#0EA5E9' : '#64748B' }} />
                      <span className="text-xs font-bold" style={{ color: active ? '#0EA5E9' : '#64748B' }}>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>Accent Color</p>
              <div className="flex gap-3 flex-wrap">
                {['#0EA5E9', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'].map(color => (
                  <button key={color} onClick={() => setAppearance({ ...appearance, accentColor: color })}
                    className="w-9 h-9 rounded-xl transition-all"
                    style={{ background: color, outline: appearance.accentColor === color ? `3px solid ${color}` : 'none', outlineOffset: 2 }}>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>Font Size</p>
              <div className="flex gap-2">
                {['small', 'medium', 'large'].map(size => (
                  <button key={size} onClick={() => setAppearance({ ...appearance, fontSize: size })}
                    className="px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all"
                    style={{ background: appearance.fontSize === size ? '#0F172A' : '#F1F5F9', color: appearance.fontSize === size ? '#FFF' : '#64748B' }}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Compact Mode', desc: 'Reduce spacing for more data density', key: 'compactMode' },
                { label: 'Animations', desc: 'Enable smooth transitions and effects', key: 'animations' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{item.desc}</p>
                  </div>
                  <Toggle checked={appearance[item.key]} onChange={v => setAppearance({ ...appearance, [item.key]: v })} />
                </div>
              ))}
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-3">
            {[
              { label: 'Share Analytics Data', desc: 'Help improve the portal with anonymous usage data', key: 'analytics' },
              { label: 'Data Sharing with Partners', desc: 'Allow de-identified data sharing for research', key: 'dataSharing' },
              { label: 'Two-Factor Backup Codes', desc: 'Generate backup codes for 2FA recovery', key: 'twoFactorBackup' },
              { label: 'Audit Log', desc: 'Record all account activity for compliance', key: 'auditLog' },
              { label: 'Automatic Cloud Backup', desc: 'Daily encrypted backup of all patient records', key: 'autoBackup' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>{item.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{item.desc}</p>
                </div>
                <Toggle checked={privacy[item.key]} onChange={v => setPrivacy({ ...privacy, [item.key]: v })} />
              </div>
            ))}
            <div className="mt-4 p-4 rounded-xl" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
              <p className="text-xs font-semibold" style={{ color: '#1E40AF' }}>
                🔒 All patient data is encrypted using AES-256 and stored securely in compliance with HIPAA/DISHA standards.
              </p>
            </div>
          </div>
        );

      case 'region':
        return (
          <div className="space-y-4">
            {[
              { label: 'Language', options: ['English', 'Hindi', 'Gujarati', 'Marathi', 'Tamil'], defaultVal: 'English' },
              { label: 'Time Zone', options: ['IST (UTC+5:30)', 'UTC', 'EST (UTC-5)', 'PST (UTC-8)'], defaultVal: 'IST (UTC+5:30)' },
              { label: 'Date Format', options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'], defaultVal: 'DD/MM/YYYY' },
              { label: 'Currency', options: ['INR (₹)', 'USD ($)', 'EUR (€)'], defaultVal: 'INR (₹)' },
            ].map(field => (
              <div key={field.label}>
                <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#64748B' }}>{field.label}</label>
                <select defaultValue={field.defaultVal} className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none"
                  style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A' }}>
                  {field.options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            ))}
          </div>
        );

      default: return null;
    }
  };

  return (
    <PortalLayout>
      <div style={{ fontFamily: "'Outfit', sans-serif" }}>
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold" style={{ color: '#0F172A' }}>Account Settings</h1>
          <p className="text-sm mt-0.5" style={{ color: '#94A3B8' }}>Manage your profile, security, and portal preferences.</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* Section Nav */}
          <div className="xl:w-72 flex-shrink-0">
            <div className="grid grid-cols-2 xl:grid-cols-1 gap-3">
              {sections.map(section => (
                <SectionCard
                  key={section.id}
                  title={section.title}
                  icon={section.icon}
                  accentColor={section.color}
                  active={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                />
              ))}
            </div>
          </div>

          {/* Content Panel */}
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl p-7"
                style={{ background: '#FFF', border: '1px solid #E2E8F0' }}
              >
                <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <div>
                    <h2 className="text-lg font-black" style={{ color: '#0F172A' }}>
                      {sections.find(s => s.id === activeSection)?.title}
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>Update your preferences below</p>
                  </div>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: saved ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #0EA5E9, #0D9488)', minWidth: 110 }}
                  >
                    {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save</>}
                  </button>
                </div>
                {renderContent()}
              </motion.div>
            </AnimatePresence>

            {/* System Info Card */}
            <div className="mt-5 rounded-2xl p-6" style={{ background: '#0A0F1E', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#334155' }}>System Information</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Portal Version', value: 'v2.4.1-stable' },
                  { label: 'Last Login', value: 'Today, 10:24 AM' },
                  { label: 'Location', value: 'Jaipur, Rajasthan' },
                  { label: 'Data Sync', value: '✅ Active', special: true },
                  { label: 'Storage Used', value: '2.4 GB / 10 GB' },
                  { label: 'API Status', value: '✅ Operational', special: true },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-xs font-semibold mb-1" style={{ color: '#475569' }}>{item.label}</p>
                    <p className="text-sm font-bold" style={{ color: item.special ? '#34D399' : '#CBD5E1' }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Settings;