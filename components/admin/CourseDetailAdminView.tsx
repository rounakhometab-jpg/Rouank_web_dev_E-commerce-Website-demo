'use client';

import React, { useState } from 'react';
import { Course, Module, Lesson } from '../../lib/types';
import {
  BookOpen,
  Layers,
  FileText,
  Plus,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  CheckCircle2,
  PlayCircle,
  Clock,
  ArrowLeft,
  Users,
  Award,
  Sparkles,
  Settings
} from 'lucide-react';

interface CourseDetailAdminViewProps {
  course: Course;
  onNavigate: (view: string, param?: string) => void;
  onEditCourse: (course: Course) => void;
  onAddModule: (courseId: string, moduleData: { title: string; description: string; estimatedHours?: number }) => void;
  onDeleteModule: (courseId: string, moduleId: string) => void;
  onReorderModules: (courseId: string, moduleIds: string[]) => void;
  onAddLesson: (courseId: string, moduleId: string) => void;
  onEditLesson: (courseId: string, moduleId: string, lesson: Lesson) => void;
  onDeleteLesson: (courseId: string, moduleId: string, lessonId: string) => void;
  onToggleLessonStatus: (courseId: string, moduleId: string, lessonId: string) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const CourseDetailAdminView: React.FC<CourseDetailAdminViewProps> = ({
  course,
  onNavigate,
  onEditCourse,
  onAddModule,
  onDeleteModule,
  onReorderModules,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
  onToggleLessonStatus,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'students' | 'settings'>('curriculum');

  // Add Module Modal State
  const [showAddModModal, setShowAddModModal] = useState(false);
  const [newModTitle, setNewModTitle] = useState('');
  const [newModDesc, setNewModDesc] = useState('');
  const [newModHours, setNewModHours] = useState(2);

  const handleCreateModuleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModTitle.trim()) return;

    onAddModule(course.id, {
      title: newModTitle,
      description: newModDesc,
      estimatedHours: newModHours
    });

    setNewModTitle('');
    setNewModDesc('');
    setShowAddModModal(false);
    onShowToast('Module Created', 'New module added to course curriculum.', 'success');
  };

  const moveModule = (index: number, direction: 'up' | 'down') => {
    const modules = [...(course.modules || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= modules.length) return;

    const temp = modules[index];
    modules[index] = modules[targetIdx];
    modules[targetIdx] = temp;

    onReorderModules(course.id, modules.map(m => m.id));
    onShowToast('Curriculum Reordered', 'Module order updated.', 'info');
  };

  return (
    <div className="space-y-8 text-xs text-slate-200 max-w-6xl mx-auto px-4 py-8">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('courses')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase">
                  {course.badge}
                </span>
                <span className="text-[10px] text-amber-400 font-mono font-bold uppercase">
                  {course.status || 'published'}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white mt-1">{course.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('course-player', course.id)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold border border-slate-700 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Course</span>
            </button>
            <button
              onClick={() => onEditCourse(course)}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow-lg"
            >
              Edit Program Info
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 text-slate-300">
          <div>
            <span className="text-slate-500 text-[10px] block">Total Modules</span>
            <strong className="text-white text-base font-bold">{course.modules?.length || 0} Modules</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">Total Lessons</span>
            <strong className="text-amber-400 text-base font-bold">{course.lessonCount || 0} Lessons</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">Learning Hours</span>
            <strong className="text-blue-400 text-base font-bold">{course.learningHours || 0} Hours</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">Price</span>
            <strong className="text-emerald-400 text-base font-bold">₹{course.price.toLocaleString('en-IN')}</strong>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
        {[
          { id: 'curriculum', label: 'Curriculum Builder & Lessons', icon: Layers },
          { id: 'overview', label: 'Program Overview', icon: BookOpen },
          { id: 'students', label: 'Enrolled Students', icon: Users },
          { id: 'settings', label: 'Course Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl shrink-0 flex items-center gap-2 transition-colors ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CURRICULUM BUILDER TAB */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Course Modules & Lessons</h3>
              <p className="text-slate-400 text-[11px]">Organize modules, upload lessons, and order content for students.</p>
            </div>
            <button
              onClick={() => setShowAddModModal(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Module</span>
            </button>
          </div>

          <div className="space-y-4">
            {(course.modules || []).map((mod, modIdx) => (
              <div key={mod.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                {/* Module Header */}
                <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => moveModule(modIdx, 'up')}
                        disabled={modIdx === 0}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveModule(modIdx, 'down')}
                        disabled={modIdx === course.modules.length - 1}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-mono font-bold text-xs uppercase">
                          Module {modIdx + 1}
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400 text-[11px]">{(mod.lessons || []).length} Lessons</span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-0.5">{mod.title}</h4>
                      {mod.description && <p className="text-slate-400 text-[11px] mt-0.5">{mod.description}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => onAddLesson(course.id, mod.id)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-bold border border-amber-500/30 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Lesson</span>
                    </button>

                    <button
                      onClick={() => onDeleteModule(course.id, mod.id)}
                      className="p-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800"
                      title="Delete Module"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Module Lessons List */}
                <div className="p-4 space-y-2 bg-slate-900/50">
                  {(mod.lessons || []).map((les, lesIdx) => (
                    <div
                      key={les.id}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <PlayCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <p className="font-bold text-white">{les.title}</p>
                          <p className="text-[10px] text-slate-400">
                            Format: <span className="uppercase font-mono text-amber-400">{les.type || 'video'}</span> | {les.durationMinutes || 15} mins
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onEditLesson(course.id, mod.id, les)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold border border-slate-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onToggleLessonStatus(course.id, mod.id, les.id)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                            les.status === 'draft' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          }`}
                        >
                          {les.status || 'published'}
                        </button>
                        <button
                          onClick={() => onDeleteLesson(course.id, mod.id, les.id)}
                          className="p-1 text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {(mod.lessons || []).length === 0 && (
                    <div className="p-6 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
                      <p className="font-medium text-xs">No lessons in this module yet.</p>
                      <button
                        onClick={() => onAddLesson(course.id, mod.id)}
                        className="text-amber-400 font-bold hover:underline text-[11px] mt-1 inline-block"
                      >
                        + Upload First Lesson
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {(course.modules || []).length === 0 && (
              <div className="bg-slate-900 p-12 rounded-2xl border border-slate-800 text-center space-y-3">
                <Layers className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">No Modules Added Yet</h3>
                <p className="text-slate-400">Click below to create the first curriculum module for this course.</p>
                <button
                  onClick={() => setShowAddModModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  + Add First Module
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Course Synopsis</h3>
          <p className="text-slate-300 leading-relaxed text-sm">{course.description}</p>
        </div>
      )}

      {/* STUDENTS TAB */}
      {activeTab === 'students' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Enrolled Student Roster</h3>
          <p className="text-slate-400">Enrolled student accounts: <strong className="text-amber-400">{course.enrolledCount}</strong> active learners.</p>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Course Admin Controls</h3>
          <button
            onClick={() => onEditCourse(course)}
            className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl"
          >
            Edit Course Metadata
          </button>
        </div>
      )}

      {/* Add Module Modal */}
      {showAddModModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateModuleSubmit} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">Add New Curriculum Module</h3>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Module Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Module 01: Core AI Foundations"
                value={newModTitle}
                onChange={(e) => setNewModTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Module Description</label>
              <textarea
                rows={2}
                placeholder="Short module overview..."
                value={newModDesc}
                onChange={(e) => setNewModDesc(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              ></textarea>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Estimated Learning Hours</label>
              <input
                type="number"
                value={newModHours}
                onChange={(e) => setNewModHours(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold"
              >
                Save Module
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
