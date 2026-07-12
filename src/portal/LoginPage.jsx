import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Stethoscope, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === 'doctor' && password === 'admin123') {
      navigate('/portal/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-20">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
      >
        <div className="bg-slate-900 p-10 text-center text-white relative">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Stethoscope size={80} />
          </div>
          <div className="bg-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-900/20">
            <Lock className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold">Doctor Portal</h2>
          <p className="text-slate-400 mt-2">Secure access for medical staff</p>
        </div>

        <div className="p-10 md:p-12">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  name="username"
                  type="text" 
                  placeholder="doctor"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  name="password"
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="admin123"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-primary-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200 group"
            >
              Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="#" className="text-slate-400 text-sm hover:text-primary-600">Forgot your credentials?</a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
