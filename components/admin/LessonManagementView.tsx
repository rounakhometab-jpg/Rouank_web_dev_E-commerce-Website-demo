'use client';

import React, { useState } from 'react';
import { Course, Lesson } from '../../lib/types';
import {
  FileText,
  Plus,
  Search,
  PlayCircle,
  CheckCircle2,
  Edit,
  Copy,
  Trash2,
  Eye,
  Filter,
  FileUp,
  Clock,
  Layers,
  HelpCircle
} from 'lucide-react';

interface LessonManagementViewProps {
  courses: Course[];
  onNavigate: (view: string, param?: string) => void;
  onEditLesson: (courseId: string, moduleId: string, lesson: Lesson) => void;
  onDuplicateLesson: (courseId: string, moduleId: string, lessonId: string) => void;
  onToggleLessonStatus: (courseId: string, moduleId: string, lessonId: string) => void;
  onDeleteLesson: (courseId: string, moduleId: string, lessonId: string) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const LessonManagementView: React.FC<LessonManagementViewProps> = ({
  courses,
  onNavigate,
  onEditLesson,
  onDuplicateLesson,
  onToggleLessonStatus,
  onDeleteLesson,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [deleteConfirmInfo, setDeleteConfirmInfo] = useState<{ courseId: string; moduleId: string; lessonId: string } | null>(null);

  // Flatten all lessons across courses and modules
  const allFlattenedLessons: {
    course: Course;
    moduleTitle: string;
    moduleId: string;
    lesson: Lesson;
  }[] = [];

  courses.forEach((c) => {
    (c.modules || []).forEach((m) => {
      (m.lessons || []).forEach((l) => {
        allFlattenedLessons.push({
          course: c,
          moduleTitle: m.title,
          moduleId: m.id,
          lesson: l
        });
      });
    });
  });

  const filteredLessons = allFlattenedLessons.filter(({ course, moduleTitle, lesson }) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lesson.shortDescription && lesson.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
      moduleTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse = selectedCourseFilter === 'all' || course.id === selectedCourseFilter;
    const matchesType = selectedTypeFilter === 'all' || lesson.type === selectedTypeFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && lesson.status !== 'draft') ||
      (statusFilter === 'draft' && lesson.status === 'draft');

    return matchesSearch && matchesCourse && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-8 text-xs text-slate-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">ZENFOTECH ACADEMY</div>
          <h1 className="text-2xl font-extrabold text-white">Lesson Management Bank</h1>
          <p className="text-slate-400 mt-1">Manage, filter and publish lesson content across all course modules.</p>
        </div>

        <button
          onClick={() => onNavigate('add-lesson')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Lesson</span>
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-white text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Course filter */}
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl p-2 text-white text-xs"
          >
            <option value="all">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          {/* Type filter */}
          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl p-2 text-white text-xs"
          >
            <option value="all">All Types</option>
            <option value="video">Video</option>
            <option value="article">Article</option>
            <option value="pdf">PDF</option>
            <option value="quiz">Quiz</option>
            <option value="assignment">Assignment</option>
            <option value="live_class">Live Class</option>
          </select>

          {/* Status filter */}
          <div className="flex items-center gap-1">
            {(['all', 'published', 'draft'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-colors ${
                  statusFilter === s
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lesson List Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="p-4">Lesson</th>
                <th className="p-4">Course & Module</th>
                <th className="p-4">Type</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredLessons.map(({ course, moduleTitle, moduleId, lesson }) => (
                <tr key={lesson.id} className="hover:bg-slate-800/50">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{lesson.title}</div>
                    <p className="text-slate-400 text-[11px] line-clamp-1">{lesson.shortDescription || lesson.summary}</p>
                  </td>

                  <td className="p-4 space-y-0.5">
                    <p className="text-amber-400 font-bold">{course.title}</p>
                    <p className="text-slate-400 text-[10px]">{moduleTitle}</p>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono font-bold border border-slate-800 uppercase text-[9px]">
                      {lesson.type || 'video'}
                    </span>
                  </td>

                  <td className="p-4 font-mono text-slate-300">
                    {lesson.durationMinutes || 15} mins
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        lesson.status === 'draft'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}
                    >
                      {lesson.status || 'published'}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onEditLesson(course.id, moduleId, lesson)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700"
                        title="Edit Lesson"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onDuplicateLesson(course.id, moduleId, lesson.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                        title="Duplicate Lesson"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onToggleLessonStatus(course.id, moduleId, lesson.id)}
                        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-bold text-[10px]"
                      >
                        {lesson.status === 'draft' ? 'Publish' : 'Draft'}
                      </button>

                      <button
                        onClick={() => setDeleteConfirmInfo({ courseId: course.id, moduleId, lessonId: lesson.id })}
                        className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800"
                        title="Delete Lesson"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLessons.length === 0 && (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <FileText className="w-10 h-10 mx-auto text-slate-600" />
            <p className="font-bold text-white">No lessons found</p>
            <p>Try adjusting your search query or filters.</p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteConfirmInfo && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-white">Delete Lesson Confirmation</h3>
            <p className="text-slate-300">Are you sure you want to delete this lesson? This action cannot be undone.</p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmInfo(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteLesson(deleteConfirmInfo.courseId, deleteConfirmInfo.moduleId, deleteConfirmInfo.lessonId);
                  setDeleteConfirmInfo(null);
                  onShowToast('Lesson Deleted', 'Lesson removed from course.', 'info');
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold"
              >
                Delete Lesson
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
