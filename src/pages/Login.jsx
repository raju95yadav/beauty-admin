import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Eye,
  EyeOff,
  Sun,
  Moon,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const storeUrl = import.meta.env.VITE_STORE_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://beauty-glam-five.vercel.app');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading('Authenticating administrator...');
    try {
      const { data } = await api.post('/auth/admin-login', { email, password });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      toast.success(`Welcome back, ${data.user?.name || 'Admin'}!`, { id: loadingToast });
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Invalid administrator credentials.', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setEmail('admin@gmail.com');
    toast.success('Admin email pre-filled! Enter your admin password.', {
      icon: '✨',
      duration: 2500
    });
  };

  return (
    <div 
      className="min-h-screen relative overflow-x-hidden flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8 bg-cover bg-center bg-no-repeat transition-colors duration-500"
      style={{ backgroundImage: "url('/admin_login_background.png')" }}
    >      {/* Adaptive Theme Backdrop Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF9F6]/90 via-[#FAF9F6]/80 to-[#EFECE6]/90 dark:from-[#121214]/95 dark:via-[#18181B]/90 dark:to-[#121214]/95 backdrop-blur-[8px] transition-colors duration-500 pointer-events-none" />

      {/* Ambient Animated Light Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.25, 1],
            x: [0, 60, 0],
            y: [0, 40, 0],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-20 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-[#C5A880]/20 blur-[100px] sm:blur-[140px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -60, 0],
            y: [0, -50, 0],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-28 -right-20 w-80 sm:w-[550px] h-80 sm:h-[550px] bg-black/10 dark:bg-[#C5A880]/15 blur-[100px] sm:blur-[140px] rounded-full"
        />
      </div>

      {/* Top Header Controls Bar */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between pt-2 pb-4">
        {/* Brand identity chip */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#18181B]/80 backdrop-blur-xl border border-[#EFECE6] dark:border-white/10 shadow-sm"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A880] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A880]"></span>
          </span>
          <span className="text-xs font-bold tracking-tight text-[#121214] dark:text-[#FAF9F6]">
            GLAM BEAUTY <span className="text-[#9E8055] dark:text-[#E0CFA9] text-[10px] uppercase font-black px-1.5 py-0.5 rounded-md bg-[#C5A880]/15 border border-[#C5A880]/30">PORTAL</span>
          </span>
        </motion.div>

        {/* Theme Toggle & External Store Link */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <a
            href={storeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-[#18181B]/80 backdrop-blur-md border border-[#EFECE6] dark:border-white/10 text-xs font-semibold text-[#6E6D7A] hover:text-[#0D0D0D] dark:hover:text-[#C5A880] transition-all shadow-sm"
            title="Open customer storefront"
          >
            <span>Live Store</span>
            <ExternalLink size={13} />
          </a>

          {/* Theme switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Light/Dark theme"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-[#18181B]/80 backdrop-blur-md border border-[#EFECE6] dark:border-white/10 text-[#6E6D7A] dark:text-[#FAF9F6] hover:text-[#C5A880] transition-all shadow-sm active:scale-95"
          >
            {darkMode ? (
              <>
                <Sun size={15} className="text-[#C5A880] animate-spin-slow" />
                <span className="text-xs font-medium hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={15} className="text-[#121214]" />
                <span className="text-xs font-medium hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>
        </motion.div>
      </header>

      {/* Main Login Card Section */}
      <main className="relative z-10 w-full max-w-md my-auto py-4">
        {/* Animated Brand Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center size-16 sm:size-20 bg-[#0D0D0D] border border-[#C5A880]/40 rounded-3xl mb-4 shadow-xl shadow-black/20 text-[#C5A880] relative group cursor-pointer"
          >
            <ShieldCheck size={36} className="sm:size-10 relative z-10 drop-shadow-md text-[#C5A880]" />
            <Sparkles size={16} className="absolute top-2 right-2 text-[#C5A880] animate-pulse" />
            <div className="absolute inset-0 rounded-3xl bg-[#C5A880]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#121214] dark:text-[#FAF9F6] transition-colors duration-300">
            ADMIN <span className="text-[#C5A880]">ACCESS</span>
          </h1>
          <p className="mt-1.5 text-xs sm:text-xs font-bold text-[#6E6D7A] uppercase tracking-[0.25em]">
            Authorized Credentials Required
          </p>
        </motion.div>

        {/* Glassmorphic Login Card */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-2xl p-6 sm:p-8 rounded-[2rem] border border-[#EFECE6] dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(18,18,20,0.08)] dark:shadow-[0_25px_65px_-12px_rgba(0,0,0,0.8)] transition-all duration-300"
        >
          {/* Security Banner Pill */}
          <div className="mb-6 px-4 py-3 rounded-2xl bg-[#C5A880]/10 dark:bg-[#C5A880]/15 border border-[#C5A880]/20 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-[#0D0D0D] text-[#C5A880] shadow-sm border border-[#C5A880]/30">
                <KeyRound size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#121214] dark:text-[#FAF9F6] leading-tight">
                  Secure Admin Zone
                </p>
                <p className="text-[10px] text-[#6E6D7A] font-medium">
                  256-Bit Encrypted Session
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[10px] font-bold text-[#C5A880] hover:text-[#9E8055] underline decoration-[#C5A880]/40 transition-colors shrink-0 cursor-pointer"
              title="Click to pre-fill admin email"
            >
              Demo Fill
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label 
                htmlFor="admin-email"
                className="block text-xs font-bold text-[#6E6D7A] uppercase tracking-wider px-1"
              >
                Admin Email
              </label>
              <div className="relative group/input">
                <Mail 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6D7A] group-focus-within/input:text-[#C5A880] transition-colors pointer-events-none" 
                  size={19} 
                />
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="username"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FAF9F6] dark:bg-[#121214] border border-[#EFECE6] dark:border-white/10 focus:border-[#C5A880] focus:ring-4 focus:ring-[#C5A880]/15 text-[#121214] dark:text-[#FAF9F6] placeholder:text-[#6E6D7A]/50 text-sm font-semibold tracking-tight shadow-sm outline-none transition-all"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <label 
                  htmlFor="admin-password"
                  className="block text-xs font-bold text-[#6E6D7A] uppercase tracking-wider"
                >
                  Password
                </label>
                <span className="text-[11px] font-semibold text-[#6E6D7A]">
                  Required
                </span>
              </div>
              <div className="relative group/input">
                <Lock 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6D7A] group-focus-within/input:text-[#C5A880] transition-colors pointer-events-none" 
                  size={19} 
                />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-[#FAF9F6] dark:bg-[#121214] border border-[#EFECE6] dark:border-white/10 focus:border-[#C5A880] focus:ring-4 focus:ring-[#C5A880]/15 text-[#121214] dark:text-[#FAF9F6] placeholder:text-[#6E6D7A]/50 text-sm font-semibold tracking-tight shadow-sm outline-none transition-all"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#6E6D7A] hover:text-[#121214] dark:hover:text-[#FAF9F6] transition-colors rounded-lg focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.015 }}
              whileTap={{ scale: loading ? 1 : 0.985 }}
              className="w-full mt-2 py-4 px-6 rounded-2xl font-bold text-white bg-[#0D0D0D] hover:bg-[#262626] dark:bg-[#FAF9F6] dark:text-[#0D0D0D] dark:hover:bg-white shadow-lg shadow-black/15 active:shadow-md transition-all flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
            >
              {/* Button Shimmer Effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-[#C5A880]/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="size-5 border-3 border-[#C5A880]/30 border-t-[#C5A880] rounded-full animate-spin" />
                  <span className="text-xs uppercase tracking-[0.2em]">Verifying...</span>
                </div>
              ) : (
                <>
                  <span className="text-xs uppercase tracking-[0.2em]">Secure Administrator Login</span>
                  <ArrowRight size={18} className="text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </main>

      {/* Footer Security Badge */}
      <footer className="relative z-10 w-full max-w-md text-center py-2">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[11px] font-bold text-[#6E6D7A] uppercase tracking-[0.25em] flex items-center justify-center gap-2"
        >
          <ShieldCheck size={14} className="text-[#C5A880] shrink-0" />
          <span>Protected by Glam Security Protocol v4.2</span>
        </motion.p>
      </footer>
    </div>
  );
};

export default Login;


