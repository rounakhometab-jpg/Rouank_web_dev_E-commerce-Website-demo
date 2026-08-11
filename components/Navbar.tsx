'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';
import { User } from '../lib/types';
import { Menu, X, Shield, ChevronDown, LogOut, BookOpen, Award, UserCheck, ShieldCheck, Settings, PlayCircle, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  user: User | null;
  onLogout: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  user,
  onLogout,
  unreadCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [userDropdownOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'about', label: 'About' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'certification', label: 'Certification' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] w-full max-w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md box-border">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between box-border">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="hover:opacity-95 transition-opacity text-left focus:outline-none shrink-0"
        >
          <Logo variant="light" size="md" showTagline={false} />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-amber-400 bg-slate-800/80 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Right Action Area */}
        <div className="hidden md:flex items-center gap-3">
          {/* Certificate Verification Badge/Button */}
          <button
            onClick={() => handleNavClick('verify')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 hover:bg-emerald-900/40 transition-colors shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Certificate</span>
          </button>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm font-medium hover:bg-slate-750 transition-colors focus:outline-none"
                aria-expanded={userDropdownOpen}
              >
                <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate text-slate-100 font-semibold">{user.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                  user.role === 'admin' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {user.role}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Compact Dropdown menu */}
              {userDropdownOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-64 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl py-2 z-[200] text-xs font-sans text-slate-200 divide-y divide-slate-800/80"
                  style={{ width: '250px' }}
                >
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-xs shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-white truncate text-xs">{user.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                            user.role === 'admin' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {user.role}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-1">
                    {user.role === 'admin' ? (
                      <button
                        type="button"
                        onClick={() => handleNavClick('admin-dashboard')}
                        className="w-full text-left px-4 py-2 flex items-center gap-2.5 text-amber-400 hover:bg-slate-800 transition-colors font-medium"
                      >
                        <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Admin Control Panel</span>
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleNavClick('student-dashboard')}
                          className="w-full text-left px-4 py-2 flex items-center gap-2.5 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
                          <span>Dashboard</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNavClick('student-dashboard')}
                          className="w-full text-left px-4 py-2 flex items-center gap-2.5 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          <PlayCircle className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>My Courses</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNavClick('student-certificate')}
                          className="w-full text-left px-4 py-2 flex items-center gap-2.5 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Certificates</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNavClick('student-profile')}
                          className="w-full text-left px-4 py-2 flex items-center gap-2.5 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          <UserIcon className="w-4 h-4 text-purple-400 shrink-0" />
                          <span>Profile</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNavClick('student-profile')}
                          className="w-full text-left px-4 py-2 flex items-center gap-2.5 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          <Settings className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>Settings</span>
                        </button>
                      </>
                    )}
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        onLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 flex items-center gap-2.5 text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors font-semibold"
                    >
                      <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('login')}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNavClick('register')}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/10 transition-all"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {user && (
            <button
              onClick={() => handleNavClick(user.role === 'admin' ? 'admin-dashboard' : 'student-dashboard')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-amber-400 text-xs font-semibold border border-slate-700"
            >
              Portal
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white border border-slate-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 z-[400]">
          <div className="space-y-1 border-b border-slate-800 pb-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                  currentView === link.id
                    ? 'text-amber-400 bg-slate-800 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('verify')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-400 flex items-center gap-2 hover:bg-slate-800/60"
            >
              <ShieldCheck className="w-4 h-4" />
              Verify Certificate
            </button>
          </div>

          {!user ? (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => handleNavClick('login')}
                className="w-full py-2.5 rounded-xl border border-slate-700 text-sm font-semibold text-slate-200 text-center"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNavClick('register')}
                className="w-full py-2.5 rounded-xl bg-amber-400 text-slate-900 text-sm font-semibold text-center"
              >
                Register
              </button>
            </div>
          ) : (
            <div className="pt-2 space-y-2">
              <div className="px-3 py-2 bg-slate-800 rounded-lg text-xs">
                <p className="font-semibold text-slate-100">{user.name}</p>
                <p className="text-slate-400">{user.email}</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full py-2 rounded-lg bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs font-semibold"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
