'use client';

import React, { useState } from 'react';
import { User, Course, StudentProgress, Order, AppNotification } from '../lib/types';
import { CertificateCard } from '../components/CertificateCard';
import { BookOpen, Award, Clock, CheckCircle2, ChevronRight, Bell, CreditCard, User as UserIcon, Settings, PlayCircle, ShieldCheck, Lock, Sparkles } from 'lucide-react';

interface StudentDashboardViewProps {
  user: User;
  course: Course;
  progress: StudentProgress;
  orders: Order[];
  notifications: AppNotification[];
  onNavigate: (view: string, param?: string) => void;
  onMarkNotifRead: (id: string) => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  user,
  course,
  progress,
  orders,
  notifications,
  onNavigate,
  onMarkNotifRead
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'exam' | 'certificate' | 'orders' | 'notifications' | 'profile'>('dashboard');

  const totalLessons = course.modules.flatMap(m => m.lessons).length || 17;
  const completedCount = progress.completedLessonIds?.length || 11;
  const completionPercentage = Math.round((completedCount / totalLessons) * 100);

  // Demo display scaling to 500 lessons / 500 hours metric
  const scaledLessonsCompleted = Math.round((completedCount / totalLessons) * 500);
  const scaledHoursCompleted = scaledLessonsCompleted;

  const examAttempt = progress.examAttempt;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner Greeting */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">STUDENT LEARNING MANAGEMENT SYSTEM</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Good morning, {user.name} 👋</h1>
          <p className="text-xs text-slate-300">Enrolled in <strong className="text-amber-400">{course.title}</strong></p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('course-player', course.id)}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
          >
            <PlayCircle className="w-4 h-4 fill-slate-950" />
            <span>Continue Learning</span>
          </button>
        </div>
      </div>

      {/* LMS Navigation Bar */}
      <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
          { id: 'courses', label: 'My Course', icon: PlayCircle },
          { id: 'exam', label: 'Final Exam', icon: Award },
          { id: 'certificate', label: 'Certificate', icon: ShieldCheck },
          { id: 'orders', label: 'My Orders', icon: CreditCard },
          { id: 'notifications', label: `Notifications (${notifications.filter(n => !n.read).length})`, icon: Bell },
          { id: 'profile', label: 'Profile Settings', icon: UserIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl shrink-0 flex items-center gap-2 transition-colors ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Views */}

      {/* Dashboard Overview */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          
          {/* Metrics Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-semibold">Course Completion</div>
              <div className="text-3xl font-extrabold text-amber-400">{completionPercentage}%</div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-amber-500 h-full" style={{ width: `${completionPercentage}%` }}></div>
              </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-semibold">Lessons Completed</div>
              <div className="text-3xl font-extrabold text-blue-400">{scaledLessonsCompleted} / 500</div>
              <p className="text-[10px] text-slate-500">Structured Lesson Progression</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-semibold">Learning Hours</div>
              <div className="text-3xl font-extrabold text-emerald-400">{scaledHoursCompleted} / 500</div>
              <p className="text-[10px] text-slate-500">Up to 500 Learning Hours</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-semibold">Exam Result</div>
              <div className="text-3xl font-extrabold text-amber-400">
                {examAttempt ? `${examAttempt.percentage}%` : 'Pending'}
              </div>
              <p className="text-[10px] text-emerald-400 font-bold uppercase">
                {examAttempt?.passed ? '✓ PASSED & VERIFIED' : 'Attempt Ready'}
              </p>
            </div>
          </div>

          {/* Active Course Card */}
          <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-1 bg-amber-500 text-slate-950 text-[10px] font-bold uppercase rounded">
                  {course.badge}
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">{course.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{course.tagline}</p>
              </div>

              <button
                onClick={() => onNavigate('course-player', course.id)}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shrink-0"
              >
                Resume Learning
              </button>
            </div>

            {/* Modules overview list */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Module Status</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {course.modules.slice(0, 4).map((mod) => (
                  <div key={mod.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{mod.title}</span>
                    <span className="text-emerald-400 font-bold text-[10px]">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Final Examination & Certificate Status Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Exam card */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-400" />
                <div>
                  <h4 className="text-base font-bold text-white">Final Online Examination</h4>
                  <p className="text-xs text-slate-400">20 MCQs | 30 Mins | Passing: 60%</p>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex justify-between items-center">
                <span>Status:</span>
                <strong className={examAttempt?.passed ? 'text-emerald-400' : 'text-amber-400'}>
                  {examAttempt?.passed ? 'Passed (82%)' : 'Ready to Take'}
                </strong>
              </div>

              <button
                onClick={() => onNavigate('student-exam-instructions')}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs border border-slate-700"
              >
                Launch Examination &rarr;
              </button>
            </div>

            {/* Certificate card */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
                <div>
                  <h4 className="text-base font-bold text-white">Digital Certificate</h4>
                  <p className="text-xs text-slate-400">Official Verifiable Credential</p>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex justify-between items-center">
                <span>Certificate ID:</span>
                <strong className="text-amber-400 font-mono">{progress.certificate?.id || 'ZAA-2026-000001'}</strong>
              </div>

              <button
                onClick={() => setActiveTab('certificate')}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
              >
                View / Print Certificate &rarr;
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Course Player Tab */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <button
            onClick={() => onNavigate('course-player', course.id)}
            className="w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3 hover:border-amber-500/50 transition-all group"
          >
            <PlayCircle className="w-12 h-12 text-amber-400 mx-auto group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-white">{course.title}</h3>
            <p className="text-xs text-slate-400">Click to enter full interactive course player with lesson videos & notes</p>
          </button>
        </div>
      )}

      {/* Exam Tab */}
      {activeTab === 'exam' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 text-center max-w-xl mx-auto space-y-4">
            <Award className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Final Online Examination</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Complete 20 multiple-choice questions in 30 minutes. Scoring 60% or above will generate your official verifiable certificate.
            </p>
            <button
              onClick={() => onNavigate('student-exam-instructions')}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-xs shadow-xl"
            >
              Start Examination Now
            </button>
          </div>
        </div>
      )}

      {/* Certificate Tab */}
      {activeTab === 'certificate' && (
        <div className="space-y-6">
          <CertificateCard
            certificate={progress.certificate || null}
            onVerifyClick={(id) => onNavigate('verify')}
          />
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">My Orders & Receipts</h3>
          <div className="space-y-3">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <p className="text-amber-400 font-bold text-sm">{ord.id}</p>
                  <p className="text-slate-300 font-sans font-semibold mt-0.5">{ord.courseTitle}</p>
                  <p className="text-slate-500 text-[10px]">Txn ID: {ord.transactionId}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-bold">₹{ord.amount.toLocaleString('en-IN')}</p>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] uppercase font-bold">
                    {ord.paymentStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Notifications Inbox</h3>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => onMarkNotifRead(n.id)}
                className={`p-4 rounded-xl border text-xs space-y-1 transition-all cursor-pointer ${
                  n.read ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-800/80 border-amber-500/50 text-slate-100 font-semibold'
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-bold text-sm text-white">{n.title}</p>
                  <span className="text-[10px] text-slate-500">{new Date(n.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 max-w-xl mx-auto space-y-4 text-xs text-slate-300">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Student Profile Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Full Name</label>
              <input type="text" readOnly value={user.name} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Email Address</label>
              <input type="email" readOnly value={user.email} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Mobile Number</label>
              <input type="text" readOnly value={user.mobile || '+91 98765 43210'} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
