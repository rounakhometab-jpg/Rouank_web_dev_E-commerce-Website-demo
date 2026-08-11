'use client';

import React from 'react';
import { Home, BookOpen, GraduationCap, Award, User as UserIcon } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userRole?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  userRole = 'student'
}) => {
  if (userRole === 'admin' && currentView.startsWith('admin')) {
    return null; // Admin mobile menu handles itself
  }

  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'student-dashboard', label: 'Learn', icon: GraduationCap },
    { id: 'student-exam', label: 'Exam', icon: Award },
    { id: 'student-profile', label: 'Profile', icon: UserIcon },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-slate-400 py-2 px-3 flex justify-around items-center shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id || currentView.startsWith(item.id);
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center gap-1 w-16 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              isActive
                ? 'text-amber-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
