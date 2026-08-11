'use client';

import React, { useState } from 'react';
import { User, Course, Exam, Order, Certificate, AppNotification } from '../lib/types';
import { Shield, Users, BookOpen, Award, CreditCard, Bell, Settings, RotateCcw, Plus, Trash2, CheckCircle2, XCircle, Search, BarChart3 } from 'lucide-react';

interface AdminDashboardViewProps {
  user: User;
  students: User[];
  courses: Course[];
  exam: Exam;
  orders: Order[];
  notifications: AppNotification[];
  onAddQuestion: (q: Omit<Exam['questions'][0], 'id'>) => void;
  onDeleteQuestion: (id: string) => void;
  onBroadcastNotif: (title: string, message: string) => void;
  onToggleStudentStatus: (id: string) => void;
  onRevokeCert: () => void;
  onResetDemo: () => void;
  onNavigate: (view: string) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  user,
  students,
  courses,
  exam,
  orders,
  notifications,
  onAddQuestion,
  onDeleteQuestion,
  onBroadcastNotif,
  onToggleStudentStatus,
  onRevokeCert,
  onResetDemo,
  onNavigate,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'courses' | 'exam' | 'orders' | 'notifs' | 'settings'>('overview');

  // Question form state
  const [newQText, setNewQText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctOptIdx, setCorrectOptIdx] = useState(0);

  // Broadcast notif state
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');

  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQText || !optA || !optB || !optC || !optD) return;

    onAddQuestion({
      question: newQText,
      options: [optA, optB, optC, optD],
      correctAnswer: correctOptIdx,
      explanation: 'Added by Admin Manager.',
      topic: 'Admin Custom Topic'
    });

    setNewQText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    onShowToast('Question Added', 'New MCQ added to Question Bank', 'success');
  };

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle || !notifMsg) return;
    onBroadcastNotif(notifTitle, notifMsg);
    setNotifTitle('');
    setNotifMsg('');
    onShowToast('Notification Broadcasted', 'Sent to all enrolled students', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 p-6 rounded-3xl border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">ZENFOTECH ADMIN CONTROL PANEL</div>
            <h1 className="text-2xl font-extrabold text-white">Platform Management Engine</h1>
          </div>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
        >
          Exit Admin Mode
        </button>
      </div>

      {/* Admin Navigation Bar */}
      <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'overview', label: 'Overview Metrics', icon: BarChart3 },
          { id: 'students', label: `Students (${students.length})`, icon: Users },
          { id: 'courses', label: `Courses (${courses.length})`, icon: BookOpen },
          { id: 'exam', label: `Exam Questions (${exam.questions.length})`, icon: Award },
          { id: 'orders', label: `Orders (${orders.length})`, icon: CreditCard },
          { id: 'notifs', label: 'Broadcast Center', icon: Bell },
          { id: 'settings', label: 'Admin Settings', icon: Settings },
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

      {/* Overview Metrics */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-semibold">Total Students</span>
              <div className="text-3xl font-extrabold text-white">{students.length}</div>
              <p className="text-[10px] text-emerald-400 font-bold">Active Platform Accounts</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-semibold">Total Programs</span>
              <div className="text-3xl font-extrabold text-amber-400">{courses.length}</div>
              <p className="text-[10px] text-slate-500">Flagship & Demo Listings</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-semibold">Total Revenue (Demo)</span>
              <div className="text-3xl font-extrabold text-emerald-400">₹{(orders.reduce((sum, o) => sum + o.amount, 0)).toLocaleString('en-IN')}</div>
              <p className="text-[10px] text-slate-500">Demo Transactions</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-semibold">Certificates Issued</span>
              <div className="text-3xl font-extrabold text-blue-400">1</div>
              <p className="text-[10px] text-emerald-400 font-bold">Verifiable Digital ID</p>
            </div>
          </div>

          {/* Realistic Metric Charts Visual Representation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Enrollment Trend (Monthly)</h3>
              <div className="h-40 flex items-end justify-between gap-2 border-b border-slate-800 pb-2 pt-4">
                {[
                  { m: 'Jan', v: 40 },
                  { m: 'Feb', v: 65 },
                  { m: 'Mar', v: 80 },
                  { m: 'Apr', v: 120 },
                  { m: 'May', v: 160 },
                  { m: 'Jun', v: 210 },
                  { m: 'Jul', v: 290 },
                  { m: 'Aug', v: 350 },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t"
                      style={{ height: `${(item.v / 350) * 100}%` }}
                    ></div>
                    <span className="text-[9px] text-slate-500 font-mono">{item.m}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Exam Pass Rate Performance</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300">
                    <span>Passed (&gt;= 60%)</span>
                    <span className="text-emerald-400 font-bold">82%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mt-1">
                    <div className="bg-emerald-500 h-full w-[82%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300">
                    <span>Failed (&lt; 60%)</span>
                    <span className="text-rose-400 font-bold">18%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mt-1">
                    <div className="bg-rose-500 h-full w-[18%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Students Management */}
      {activeTab === 'students' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Student Accounts Directory</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-3">Student</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {students.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-white">{std.name}</td>
                    <td className="p-3 font-mono text-slate-300">{std.email}</td>
                    <td className="p-3 text-amber-400">AI Industry Certification</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        std.status === 'active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}>
                        {std.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onToggleStudentStatus(std.id)}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold border border-slate-700"
                      >
                        {std.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Courses Management */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          {courses.map((c) => (
            <div key={c.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 text-xs">
              <div>
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px] uppercase">{c.badge}</span>
                <h4 className="text-base font-bold text-white mt-1">{c.title}</h4>
                <p className="text-slate-400 text-xs mt-0.5">{c.lessonCount} Lessons | {c.learningHours} Hours | Price: ₹{c.price.toLocaleString('en-IN')}</p>
              </div>
              <span className="px-3 py-1 bg-slate-950 rounded text-amber-400 font-mono font-bold">Active Listing</span>
            </div>
          ))}
        </div>
      )}

      {/* Exam & Question Bank Management */}
      {activeTab === 'exam' && (
        <div className="space-y-6">
          {/* Add Question Form */}
          <form onSubmit={handleAddQuestionSubmit} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add MCQ to Question Bank</span>
            </h3>

            <div className="space-y-2">
              <label className="text-slate-300 font-semibold block">Question Text</label>
              <input
                type="text"
                required
                placeholder="Enter question statement..."
                value={newQText}
                onChange={(e) => setNewQText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Option A</label>
                <input type="text" required value={optA} onChange={(e) => setOptA(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Option B</label>
                <input type="text" required value={optB} onChange={(e) => setOptB(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Option C</label>
                <input type="text" required value={optC} onChange={(e) => setOptC(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Option D</label>
                <input type="text" required value={optD} onChange={(e) => setOptD(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Correct Option Index (0 = A, 1 = B, 2 = C, 3 = D)</label>
              <select
                value={correctOptIdx}
                onChange={(e) => setCorrectOptIdx(Number(e.target.value))}
                className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              >
                <option value={0}>Option A</option>
                <option value={1}>Option B</option>
                <option value={2}>Option C</option>
                <option value={3}>Option D</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
            >
              Add Question
            </button>
          </form>

          {/* Existing Questions List */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">Question Bank ({exam.questions.length} MCQs)</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {exam.questions.map((q, idx) => (
                <div key={q.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-start gap-4">
                  <div>
                    <span className="text-amber-400 font-mono font-bold mr-2">Q{idx + 1}.</span>
                    <span className="text-slate-200 font-medium">{q.question}</span>
                  </div>
                  <button
                    onClick={() => onDeleteQuestion(q.id)}
                    className="text-rose-400 hover:text-rose-300 p-1 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Orders */}
      {activeTab === 'orders' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Transaction Receipts</h3>
          <div className="space-y-2">
            {orders.map((o) => (
              <div key={o.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs font-mono">
                <div>
                  <p className="text-amber-400 font-bold">{o.id}</p>
                  <p className="text-slate-300 font-sans">{o.studentName} ({o.studentEmail})</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">₹{o.amount.toLocaleString('en-IN')}</p>
                  <p className="text-emerald-400 uppercase text-[10px]">{o.paymentStatus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Broadcast Center */}
      {activeTab === 'notifs' && (
        <form onSubmit={handleBroadcastSubmit} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs max-w-xl mx-auto">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Broadcast Notification to Students</h3>
          
          <div className="space-y-1">
            <label className="text-slate-300 font-semibold block">Notification Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Final Examination Deadline Update"
              value={notifTitle}
              onChange={(e) => setNotifTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold block">Message</label>
            <textarea
              required
              rows={3}
              placeholder="Enter announcement details..."
              value={notifMsg}
              onChange={(e) => setNotifMsg(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
          >
            Send Notification Broadcast
          </button>
        </form>
      )}

      {/* Admin Settings & Reset Demo Data */}
      {activeTab === 'settings' && (
        <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 max-w-xl mx-auto text-xs text-slate-300">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Admin Platform Controls</h3>

          <div className="space-y-2">
            <h4 className="font-bold text-amber-400 text-sm">Certificate Governance</h4>
            <p className="text-slate-400">Revoke current student certificate for administrative review.</p>
            <button
              onClick={() => {
                onRevokeCert();
                onShowToast('Certificate Revoked', 'Status changed to revoked in ledger', 'info');
              }}
              className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 font-bold border border-rose-800"
            >
              Revoke Student Certificate
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <h4 className="font-bold text-amber-400 text-sm">Reset Demo State</h4>
            <p className="text-slate-400">Restore all localStorage data to the initial Zenfotech AI Academy demo state.</p>
            <button
              onClick={() => {
                onResetDemo();
                onShowToast('Demo Reset', 'Restored initial sample data state', 'success');
              }}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold flex items-center gap-2 shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
