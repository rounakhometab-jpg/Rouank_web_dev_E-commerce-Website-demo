'use client';

import React, { useState } from 'react';
import { User, Course, Exam, Order, AppNotification, Lesson, Module } from '../lib/types';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { CourseManagementView } from '../components/admin/CourseManagementView';
import { AddCourseView } from '../components/admin/AddCourseView';
import { CourseDetailAdminView } from '../components/admin/CourseDetailAdminView';
import { LessonManagementView } from '../components/admin/LessonManagementView';
import { AddLessonView } from '../components/admin/AddLessonView';
import {
  Shield,
  Users,
  BookOpen,
  Award,
  CreditCard,
  Bell,
  Settings,
  RotateCcw,
  Plus,
  Trash2,
  Menu,
  BarChart3,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

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
  onNavigate: (view: string, param?: string) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;

  // Course, Module & Lesson CRUD from store
  onUpsertCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
  onDuplicateCourse: (courseId: string) => void;
  onToggleCourseStatus: (courseId: string) => void;
  onAddOrUpdateModule: (courseId: string, moduleData: { title: string; description: string; estimatedHours?: number }) => void;
  onDeleteModule: (courseId: string, moduleId: string) => void;
  onReorderModules: (courseId: string, moduleIds: string[]) => void;
  onAddOrUpdateLesson: (courseId: string, moduleId: string, lessonData: Partial<Lesson> & { title: string }) => void;
  onDeleteLesson: (courseId: string, moduleId: string, lessonId: string) => void;
  onDuplicateLesson: (courseId: string, moduleId: string, lessonId: string) => void;
  onToggleLessonStatus: (courseId: string, moduleId: string, lessonId: string) => void;
  onImportCourses: (json: string) => void;
  onExportCourses: () => string;
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
  onShowToast,
  onUpsertCourse,
  onDeleteCourse,
  onDuplicateCourse,
  onToggleCourseStatus,
  onAddOrUpdateModule,
  onDeleteModule,
  onReorderModules,
  onAddOrUpdateLesson,
  onDeleteLesson,
  onDuplicateLesson,
  onToggleLessonStatus,
  onImportCourses,
  onExportCourses
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedCourseParam, setSelectedCourseParam] = useState<string | null>(null);
  const [editingCourseObj, setEditingCourseObj] = useState<Course | null>(null);
  const [editingLessonObj, setEditingLessonObj] = useState<Lesson | null>(null);
  const [targetModuleId, setTargetModuleId] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Exam question form state
  const [newQText, setNewQText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctOptIdx, setCorrectOptIdx] = useState(0);

  // Broadcast notif state
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');

  const handleSelectTab = (tab: string, param?: string) => {
    setActiveTab(tab);
    if (param) setSelectedCourseParam(param);
    if (tab === 'add-course') {
      setEditingCourseObj(null);
    }
    if (tab === 'add-lesson') {
      setEditingLessonObj(null);
    }
  };

  const handleExportJSON = () => {
    const jsonStr = onExportCourses();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zenfotech-courses-export-${Date.now()}.json`;
    a.click();
    onShowToast('Export Downloaded', 'Course catalog JSON saved to file.', 'success');
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseParam) || courses[0];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100">
      
      {/* Admin Sidebar */}
      <AdminSidebar
        currentTab={activeTab}
        onSelectTab={handleSelectTab}
        onExitAdmin={() => onNavigate('home')}
        isMobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Admin Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* Mobile Header Toggle */}
        <div className="md:hidden flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl bg-slate-800 text-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-extrabold text-white text-sm">Zenfotech Admin Portal</span>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-bold text-amber-400"
          >
            Exit Admin
          </button>
        </div>

        {/* OVERVIEW METRICS TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xl">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">ZENFOTECH ADMIN CONTROL PANEL</div>
                  <h1 className="text-2xl font-extrabold text-white">Platform Management Dashboard</h1>
                </div>
              </div>

              <button
                onClick={() => onNavigate('home')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
              >
                Exit Admin Mode
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-semibold">Total Students</span>
                <div className="text-3xl font-extrabold text-white">{students.length}</div>
                <p className="text-[10px] text-emerald-400 font-bold">Active Accounts</p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-semibold">Total Programs</span>
                <div className="text-3xl font-extrabold text-amber-400">{courses.length}</div>
                <p className="text-[10px] text-slate-500">Live & Draft Courses</p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-semibold">Demo Revenue</span>
                <div className="text-3xl font-extrabold text-emerald-400">
                  ₹{(orders.reduce((sum, o) => sum + o.amount, 0)).toLocaleString('en-IN')}
                </div>
                <p className="text-[10px] text-slate-500">Order Receipts</p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-semibold">Certificates Issued</span>
                <div className="text-3xl font-extrabold text-blue-400">1</div>
                <p className="text-[10px] text-emerald-400 font-bold">Verifiable ID</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white">Enrollment Trend</h3>
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

        {/* ALL COURSES MANAGEMENT VIEW */}
        {activeTab === 'courses' && (
          <CourseManagementView
            courses={courses}
            onNavigate={(view, param) => handleSelectTab(view, param)}
            onEditCourse={(course) => {
              setEditingCourseObj(course);
              setActiveTab('add-course');
            }}
            onDuplicateCourse={onDuplicateCourse}
            onToggleStatus={onToggleCourseStatus}
            onDeleteCourse={onDeleteCourse}
            onImportCourses={onImportCourses}
            onExportCourses={handleExportJSON}
            onShowToast={onShowToast}
          />
        )}

        {/* ADD / EDIT COURSE VIEW */}
        {activeTab === 'add-course' && (
          <AddCourseView
            editingCourse={editingCourseObj}
            onSaveCourse={(course) => {
              onUpsertCourse(course);
              setEditingCourseObj(null);
              setActiveTab('courses');
            }}
            onCancel={() => {
              setEditingCourseObj(null);
              setActiveTab('courses');
            }}
            onShowToast={onShowToast}
          />
        )}

        {/* COURSE DETAILS & CURRICULUM BUILDER */}
        {activeTab === 'course-detail-admin' && selectedCourse && (
          <CourseDetailAdminView
            course={selectedCourse}
            onNavigate={(view, param) => handleSelectTab(view, param)}
            onEditCourse={(course) => {
              setEditingCourseObj(course);
              setActiveTab('add-course');
            }}
            onAddModule={onAddOrUpdateModule}
            onDeleteModule={onDeleteModule}
            onReorderModules={onReorderModules}
            onAddLesson={(courseId, moduleId) => {
              setSelectedCourseParam(courseId);
              setTargetModuleId(moduleId);
              setEditingLessonObj(null);
              setActiveTab('add-lesson');
            }}
            onEditLesson={(courseId, moduleId, lesson) => {
              setSelectedCourseParam(courseId);
              setTargetModuleId(moduleId);
              setEditingLessonObj(lesson);
              setActiveTab('add-lesson');
            }}
            onDeleteLesson={onDeleteLesson}
            onToggleLessonStatus={onToggleLessonStatus}
            onShowToast={onShowToast}
          />
        )}

        {/* ALL LESSONS BANK VIEW */}
        {activeTab === 'all-lessons' && (
          <LessonManagementView
            courses={courses}
            onNavigate={(view, param) => handleSelectTab(view, param)}
            onEditLesson={(courseId, moduleId, lesson) => {
              setSelectedCourseParam(courseId);
              setTargetModuleId(moduleId);
              setEditingLessonObj(lesson);
              setActiveTab('add-lesson');
            }}
            onDuplicateLesson={onDuplicateLesson}
            onToggleLessonStatus={onToggleLessonStatus}
            onDeleteLesson={onDeleteLesson}
            onShowToast={onShowToast}
          />
        )}

        {/* ADD / EDIT LESSON VIEW */}
        {activeTab === 'add-lesson' && (
          <AddLessonView
            courses={courses}
            initialCourseId={selectedCourseParam || undefined}
            initialModuleId={targetModuleId || undefined}
            editingLesson={editingLessonObj}
            onSaveLesson={(courseId, moduleId, lesson) => {
              onAddOrUpdateLesson(courseId, moduleId, lesson);
              setEditingLessonObj(null);
              setActiveTab('all-lessons');
            }}
            onCancel={() => {
              setEditingLessonObj(null);
              setActiveTab('all-lessons');
            }}
            onShowToast={onShowToast}
          />
        )}

        {/* LESSON RESOURCES */}
        {activeTab === 'lesson-resources' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Lesson Document & PDF Resources</h3>
            <p className="text-slate-400">Manage digital downloads and whitepapers attached to lessons.</p>
          </div>
        )}

        {/* COURSE CATEGORIES */}
        {activeTab === 'course-categories' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Course Taxonomy & Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Generative AI', 'Artificial Intelligence', 'Machine Learning', 'Prompt Engineering', 'AI Automation', 'Business AI'].map((cat) => (
                <div key={cat} className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-bold text-white">
                  {cat}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULES TAB */}
        {activeTab === 'modules' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">All Modules Directory</h3>
            <p className="text-slate-400">Total modules across all courses: {courses.reduce((sum, c) => sum + (c.modules?.length || 0), 0)}</p>
          </div>
        )}

        {/* STUDENTS MANAGEMENT */}
        {activeTab === 'students' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Student Accounts Directory</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Student</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
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

        {/* EXAMS, QUESTIONS, RESULTS, CERTIFICATES, PAYMENTS, ORDERS, NOTIFICATIONS, REPORTS, SETTINGS */}
        {(activeTab === 'exams' || activeTab === 'exam') && (
          <div className="space-y-6 text-xs">
            {/* Add Question Form */}
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!newQText || !optA || !optB || !optC || !optD) return;
              onAddQuestion({
                question: newQText,
                options: [optA, optB, optC, optD],
                correctAnswer: correctOptIdx,
                explanation: 'Added by Admin Manager.',
                topic: 'Admin Custom Topic'
              });
              setNewQText(''); setOptA(''); setOptB(''); setOptC(''); setOptD('');
              onShowToast('Question Added', 'New MCQ added to Question Bank', 'success');
            }} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
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

            {/* Questions Bank */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
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

        {(activeTab === 'payments' || activeTab === 'orders') && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Transaction Receipts & Payment Logs</h3>
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

        {activeTab === 'notifs' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!notifTitle || !notifMsg) return;
            onBroadcastNotif(notifTitle, notifMsg);
            setNotifTitle(''); setNotifMsg('');
            onShowToast('Notification Broadcasted', 'Sent to all enrolled students', 'info');
          }} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs max-w-xl mx-auto">
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

        {activeTab === 'results' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Student Exam Results</h3>
            <p className="text-slate-300">Detailed examination metrics and pass rates.</p>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Certificates Register</h3>
            <p className="text-slate-300">1 Digital Certificate issued (ZAA-2026-000001).</p>
            <button
              onClick={() => {
                onRevokeCert();
                onShowToast('Certificate Revoked', 'Status changed to revoked in ledger', 'info');
              }}
              className="px-4 py-2 rounded-xl bg-rose-950/60 text-rose-300 font-bold border border-rose-800"
            >
              Revoke Student Certificate
            </button>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Platform Analytics & Reports</h3>
            <p className="text-slate-300">Export CSV reports for student progress, course completions, and revenues.</p>
          </div>
        )}

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

      </main>
    </div>
  );
};
