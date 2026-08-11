'use client';

import React, { useState } from 'react';
import { Course } from '../../lib/types';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  Copy,
  Trash2,
  Eye,
  Edit,
  Download,
  Upload,
  MoreVertical,
  Users,
  Award,
  Sparkles,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

interface CourseManagementViewProps {
  courses: Course[];
  onNavigate: (view: string, param?: string) => void;
  onEditCourse: (course: Course) => void;
  onDuplicateCourse: (courseId: string) => void;
  onToggleStatus: (courseId: string) => void;
  onDeleteCourse: (courseId: string) => void;
  onImportCourses: (json: string) => void;
  onExportCourses: () => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const CourseManagementView: React.FC<CourseManagementViewProps> = ({
  courses,
  onNavigate,
  onEditCourse,
  onDuplicateCourse,
  onToggleStatus,
  onDeleteCourse,
  onImportCourses,
  onExportCourses,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const totalCourses = courses.length;
  const publishedCount = courses.filter(c => c.status !== 'draft').length;
  const draftCount = courses.filter(c => c.status === 'draft').length;
  const totalEnrollments = courses.reduce((sum, c) => sum + (c.enrolledCount || 0), 0);

  const filteredCourses = courses.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.category && c.category.toLowerCase().includes(searchQuery.toLowerCase()));

    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'published') return matchesSearch && c.status !== 'draft';
    if (statusFilter === 'draft') return matchesSearch && c.status === 'draft';
    return matchesSearch;
  });

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          onImportCourses(content);
          onShowToast('Courses Imported', 'Course catalog updated from JSON file.', 'success');
        } catch (err) {
          onShowToast('Import Error', 'Invalid course JSON structure.', 'error');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8 text-xs text-slate-200">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">ZENFOTECH ACADEMY</div>
          <h1 className="text-2xl font-extrabold text-white">Course Management</h1>
          <p className="text-slate-400 mt-1">Create, manage and publish your AI learning programs.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold border border-slate-700 cursor-pointer flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
          </label>

          <button
            onClick={onExportCourses}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold border border-slate-700 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export Catalog</span>
          </button>

          <button
            onClick={() => onNavigate('add-course')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold flex items-center gap-2 shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 font-semibold">Total Courses</span>
          <div className="text-3xl font-extrabold text-white">{totalCourses}</div>
          <p className="text-[10px] text-slate-500">Master Catalog Listings</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 font-semibold">Published Programs</span>
          <div className="text-3xl font-extrabold text-emerald-400">{publishedCount}</div>
          <p className="text-[10px] text-emerald-400 font-bold">Active in Student LMS</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 font-semibold">Draft Programs</span>
          <div className="text-3xl font-extrabold text-amber-400">{draftCount}</div>
          <p className="text-[10px] text-amber-400">In Development</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 font-semibold">Total Enrollments</span>
          <div className="text-3xl font-extrabold text-blue-400">{totalEnrollments.toLocaleString('en-IN')}</div>
          <p className="text-[10px] text-slate-500">Student Signups</p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-white placeholder-slate-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {(['all', 'published', 'draft'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                statusFilter === status
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Course List / Table */}
      <div className="space-y-4">
        {filteredCourses.map((c) => (
          <div
            key={c.id}
            className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            {/* Thumbnail & Meta */}
            <div className="flex items-start gap-4">
              <img
                src={c.thumbnail || 'https://picsum.photos/seed/ai/200/120'}
                alt={c.title}
                className="w-24 h-16 object-cover rounded-xl border border-slate-800 shrink-0 bg-slate-950"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[9px] font-extrabold uppercase">
                    {c.badge || c.level}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{c.category || 'Generative AI'}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      c.status === 'draft'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}
                  >
                    {c.status || 'published'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{c.title}</h3>
                
                <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px] pt-1">
                  <span>
                    <strong className="text-slate-200">{c.modules?.length || 0}</strong> Modules
                  </span>
                  <span>
                    <strong className="text-slate-200">{c.lessonCount || 0}</strong> Lessons
                  </span>
                  <span>
                    <strong className="text-slate-200">{c.learningHours || 0}</strong> Hours
                  </span>
                  <span className="text-amber-400 font-bold font-mono">
                    ₹{c.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 self-end md:self-auto shrink-0">
              <button
                onClick={() => onNavigate('course-detail-admin', c.id)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => onEditCourse(c)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5 text-blue-400" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => onDuplicateCourse(c.id)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold border border-slate-700 flex items-center gap-1"
                title="Duplicate Course"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onToggleStatus(c.id)}
                className={`px-3 py-2 rounded-xl font-bold border transition-colors ${
                  c.status === 'draft'
                    ? 'bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border-emerald-800'
                    : 'bg-amber-950 hover:bg-amber-900 text-amber-400 border-amber-800'
                }`}
              >
                {c.status === 'draft' ? 'Publish' : 'Unpublish'}
              </button>

              <button
                onClick={() => setDeleteConfirmId(c.id)}
                className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800"
                title="Delete Course"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredCourses.length === 0 && (
          <div className="bg-slate-900 p-12 rounded-2xl border border-slate-800 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No courses match your search</h3>
            <p className="text-slate-400">Try modifying filters or add a new course.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-white">Delete Course Confirmation</h3>
            <p className="text-slate-300">
              Are you sure you want to delete this course? All associated modules and lesson references will be removed.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteCourse(deleteConfirmId);
                  setDeleteConfirmId(null);
                  onShowToast('Course Deleted', 'Course removed from store.', 'info');
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
