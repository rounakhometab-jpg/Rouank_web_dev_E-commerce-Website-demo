'use client';

import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { UserRole } from '../lib/types';
import { Shield, BookOpen, CheckCircle2, Lock, Mail, User as UserIcon, Phone, KeyRound, ArrowRight } from 'lucide-react';

interface AuthViewProps {
  initialMode?: 'login' | 'register';
  onLogin: (email: string, password: string) => { success: boolean; message: string; role?: UserRole };
  onRegister: (name: string, email: string, mobile: string) => { success: boolean; message: string };
  onNavigate: (view: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialMode = 'login',
  onLogin,
  onRegister,
  onNavigate
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const res = onLogin(email, password);
    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        if (res.role === 'admin') {
          onNavigate('admin-dashboard');
        } else {
          onNavigate('student-dashboard');
        }
      }, 500);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name || !email) {
      setErrorMsg('Please enter your full name and email.');
      return;
    }

    const res = onRegister(name, email, mobile);
    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        onNavigate('student-dashboard');
      }, 600);
    } else {
      setErrorMsg(res.message);
    }
  };

  const fillDemoStudent = () => {
    setEmail('student@zenfotech.com');
    setPassword('Demo@123');
    setErrorMsg('');
  };

  const fillDemoAdmin = () => {
    setEmail('admin@zenfotech.com');
    setPassword('Admin@123');
    setErrorMsg('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      
      {/* Header Logo */}
      <div className="text-center space-y-2">
        <Logo variant="light" size="lg" showTagline={true} className="justify-center" />
        <h2 className="text-2xl font-extrabold text-white pt-2">
          {mode === 'login' ? 'Sign In to Zenfotech AI Academy' : 'Create Student Account'}
        </h2>
        <p className="text-xs text-slate-400">
          Access your courses, quizzes, final examination, and digital certificate.
        </p>
      </div>

      {/* Demo Credentials Quick Switcher Box (Requirement: Must be on Login Page) */}
      {mode === 'login' && (
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-amber-500/40 space-y-3">
          <div className="text-xs font-bold text-amber-400 flex items-center justify-between">
            <span>QUICK DEMO LOGIN ACCESS</span>
            <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded">PRE-LOADED</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={fillDemoStudent}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-left space-y-1 transition-all group"
            >
              <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Demo Student</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono truncate">student@zenfotech.com</p>
              <p className="text-[9px] text-amber-400 group-hover:underline font-semibold">Click to Fill Credentials</p>
            </button>

            <button
              type="button"
              onClick={fillDemoAdmin}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-left space-y-1 transition-all group"
            >
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Shield className="w-3.5 h-3.5" />
                <span>Demo Admin</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono truncate">admin@zenfotech.com</p>
              <p className="text-[9px] text-amber-400 group-hover:underline font-semibold">Click to Fill Credentials</p>
            </button>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
        
        {/* Toggle Login vs Register */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`w-1/2 py-2 rounded-lg transition-colors ${
              mode === 'login' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`w-1/2 py-2 rounded-lg transition-colors ${
              mode === 'register' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="student@zenfotech.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-xl transition-all"
            >
              Create Account & Register
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
