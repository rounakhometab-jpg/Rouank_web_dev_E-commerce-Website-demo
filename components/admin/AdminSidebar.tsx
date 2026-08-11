'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  FileText,
  Award,
  HelpCircle,
  BarChart,
  ShieldCheck,
  CreditCard,
  ShoppingBag,
  Bell,
  FileSpreadsheet,
  Settings,
  ChevronDown,
  ChevronRight,
  Plus,
  List,
  FolderTree,
  FileUp,
  LogOut,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string, param?: string) => void;
  onExitAdmin?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  onExitAdmin,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const [coursesOpen, setCoursesOpen] = useState(true);
  const [lessonsOpen, setLessonsOpen] = useState(true);

  const isActive = (tab: string) => currentTab === tab;

  const handleNav = (tab: string, param?: string) => {
    onSelectTab(tab, param);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 md:static md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black text-sm">
              ZA
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-tight">ZENFOTECH</h2>
              <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Admin Portal</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 text-xs font-semibold text-slate-400">
          
          {/* Dashboard */}
          <button
            onClick={() => handleNav('overview')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              isActive('overview')
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </button>

          {/* Students */}
          <button
            onClick={() => handleNav('students')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              isActive('students')
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Students</span>
          </button>

          {/* COURSES Collapsible Group */}
          <div className="space-y-0.5 pt-1">
            <button
              onClick={() => setCoursesOpen(!coursesOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 shrink-0 text-amber-400" />
                <span className="font-bold text-slate-200">Courses</span>
              </div>
              {coursesOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {coursesOpen && (
              <div className="ml-6 space-y-1 border-l border-slate-800 pl-3 pt-1">
                <button
                  onClick={() => handleNav('courses')}
                  className={`w-full text-left py-2 px-2.5 rounded-lg flex items-center gap-2 transition-colors ${
                    isActive('courses')
                      ? 'bg-amber-500/10 text-amber-400 font-bold'
                      : 'hover:text-white'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>All Courses</span>
                </button>
                <button
                  onClick={() => handleNav('add-course')}
                  className={`w-full text-left py-2 px-2.5 rounded-lg flex items-center gap-2 transition-colors ${
                    isActive('add-course')
                      ? 'bg-amber-500/10 text-amber-400 font-bold'
                      : 'hover:text-white'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Course</span>
                </button>
                <button
                  onClick={() => handleNav('course-categories')}
                  className={`w-full text-left py-2 px-2.5 rounded-lg flex items-center gap-2 transition-colors ${
                    isActive('course-categories')
                      ? 'bg-amber-500/10 text-amber-400 font-bold'
                      : 'hover:text-white'
                  }`}
                >
                  <FolderTree className="w-3.5 h-3.5" />
                  <span>Course Categories</span>
                </button>
              </div>
            )}
          </div>

          {/* Modules */}
          <button
            onClick={() => handleNav('modules')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              isActive('modules')
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Modules</span>
          </button>

          {/* LESSONS Collapsible Group */}
          <div className="space-y-0.5 pt-1">
            <button
              onClick={() => setLessonsOpen(!lessonsOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 shrink-0 text-amber-400" />
                <span className="font-bold text-slate-200">Lessons</span>
              </div>
              {lessonsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {lessonsOpen && (
              <div className="ml-6 space-y-1 border-l border-slate-800 pl-3 pt-1">
                <button
                  onClick={() => handleNav('all-lessons')}
                  className={`w-full text-left py-2 px-2.5 rounded-lg flex items-center gap-2 transition-colors ${
                    isActive('all-lessons')
                      ? 'bg-amber-500/10 text-amber-400 font-bold'
                      : 'hover:text-white'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>All Lessons</span>
                </button>
                <button
                  onClick={() => handleNav('add-lesson')}
                  className={`w-full text-left py-2 px-2.5 rounded-lg flex items-center gap-2 transition-colors ${
                    isActive('add-lesson')
                      ? 'bg-amber-500/10 text-amber-400 font-bold'
                      : 'hover:text-white'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Lesson</span>
                </button>
                <button
                  onClick={() => handleNav('lesson-resources')}
                  className={`w-full text-left py-2 px-2.5 rounded-lg flex items-center gap-2 transition-colors ${
                    isActive('lesson-resources')
                      ? 'bg-amber-500/10 text-amber-400 font-bold'
                      : 'hover:text-white'
                  }`}
                >
                  <FileUp className="w-3.5 h-3.5" />
                  <span>Lesson Resources</span>
                </button>
              </div>
            )}
          </div>

          {/* Exams */}
          <button
            onClick={() => handleNav('exams')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              isActive('exams')
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            <span>Exams</span>
          </button>

          {/* Questions */}
          <button
            onClick={() => handleNav('exam')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              isActive('exam')
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>Questions</span>
          </button>

          {/* Results */}
          <button
            onClick={() => handleNav('results')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              isActive('results')
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BarChart className="w-4 h-4 shrink-0" />
            <span>Results</span>
          </button>

          {/* Certificates */}
          <button
            onClick={() => handleNav('certificates')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              isActive('certificates')
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Certificates</span>
          </button>

          {/* Payments */}
          <button
            onClick={() => handleNav('payments')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              isActive('payments')
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4 shrink-0" />
            <span>Payments</span>
          </button>

          {/* Orders */}
          <button
            onClick={() => handleNav('orders')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              isActive('orders')
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>Orders</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => handleNav('notifs')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              isActive('notifs')
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Bell className="w-4 h-4 shrink-0" />
            <span>Notifications</span>
          </button>

          {/* Reports */}
          <button
            onClick={() => handleNav('reports')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              isActive('reports')
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 shrink-0" />
            <span>Reports</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => handleNav('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              isActive('settings')
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Settings</span>
          </button>

        </div>

        {/* Footer: Exit Admin Mode */}
        {onExitAdmin && (
          <div className="p-3 border-t border-slate-800">
            <button
              onClick={onExitAdmin}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-slate-700"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Admin Portal</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
