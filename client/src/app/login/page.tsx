'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader2, KeyRound, Sparkles, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fieldVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08 + 0.3, duration: 0.4, ease: 'easeOut' as const },
  }),
};

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleDemoLogin = async (role: 'tenant' | 'landlord') => {
    setError(null);
    setLoading(true);

    const demoEmail = role === 'tenant' ? 'tenant@nextkey.xyz' : 'landlord@nextkey.xyz';
    const demoPassword = 'password123';

    setFormData({ email: demoEmail, password: demoPassword });

    try {
      const response = await api.post('/auth/login', { email: demoEmail, password: demoPassword });
      if (response.data.success) {
        const { token, user } = response.data;
        toast.success(`Sandbox Access Active: ${user.name} logged in!`);
        login(token, user);
      }
    } catch (err) {
      console.error('Demo login session failed:', err);
      let errMsg = 'Could not log in with demo account. Ensure you have seeded the database.';
      if (axios.isAxiosError(err)) errMsg = err.response?.data?.message || errMsg;
      toast.error(errMsg);
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email.trim() || !password.trim()) {
      setError('Email and password fields are required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password,
      });
      if (response.data.success) {
        const { token, user } = response.data;
        toast.success(`Logged in as ${user.name}!`);
        login(token, user);
      }
    } catch (err) {
      console.error('Login action failed:', err);
      let errMsg = 'Incorrect email or password. Please try again.';
      if (axios.isAxiosError(err)) errMsg = err.response?.data?.message || errMsg;
      toast.error(errMsg);
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-0 -left-4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-10 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, -25, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative w-full max-w-md space-y-8 z-10"
      >
        {/* Header */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <motion.div
            className="flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-100 rounded-full text-teal-700 font-semibold text-sm mb-4"
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
            </motion.div>
            <span>Welcome back to NextKey</span>
          </motion.div>
          <h2 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            Unlock your dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Sign in to check rental approvals or add new property listings
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-100 sm:px-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Demo Login Buttons */}
          <motion.div
            className="mb-6 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
              Quick Sandbox Access (Auto-fill & Login)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                onClick={() => handleDemoLogin('tenant')}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-indigo-600" />
                <span>Demo Tenant</span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => handleDemoLogin('landlord')}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-teal-50 hover:border-teal-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Demo Landlord</span>
              </motion.button>
            </div>
          </motion.div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-semibold">Or enter credentials</span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.97 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.97 }}
                  className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-sm text-rose-600 font-medium overflow-hidden"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Input */}
            <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <motion.div
                className="mt-1"
                animate={{ borderColor: focusedField === 'email' ? '#4f46e5' : 'transparent' }}
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="name@domain.com"
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-slate-800 text-sm"
                />
              </motion.div>
            </motion.div>

            {/* Password Input */}
            <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <motion.div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-slate-800 text-sm"
                />
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <motion.span
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Checking credentials...
                  </motion.span>
                ) : (
                  <motion.span
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <KeyRound className="w-4 h-4" />
                    Sign In
                  </motion.span>
                )}
              </motion.button>
            </motion.div>
          </form>

          <motion.div
            className="mt-6 border-t border-slate-100 pt-6 text-center text-sm text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            New to NextKey?{' '}
            <motion.span whileHover={{ scale: 1.02 }} className="inline-block">
              <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-500">
                Create an account
              </Link>
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
