'use client';

import React, { useState } from 'react';
import { Exam, Course, ExamAttempt } from '../../lib/types';
import {
  Award,
  Plus,
  Eye,
  Edit,
  HelpCircle,
  Play,
  Trash2,
  CheckCircle,
  FileText,
  BarChart2,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';

interface ExamManagementViewProps {
  exams: Exam[];
  courses: Course[];
  examAttempts: ExamAttempt[];
  onNavigate: (view: string, param?: string) => void;
  onCreateExam: () => void;
  onEditExam: (exam: Exam) => void;
  onManageQuestions: (examId: string) => void;
  onPreviewExam: (examId: string) => void;
  onToggleStatus: (examId: string) => void;
  onDeleteExam: (examId: string) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const ExamManagementView: React.FC<ExamManagementViewProps> = ({
  exams,
  courses,
  examAttempts,
  onNavigate,
  onCreateExam,
  onEditExam,
  onManageQuestions,
  onPreviewExam,
  onToggleStatus,
  onDeleteExam,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Metrics
  const totalExams = exams.length;
  const publishedExams = exams.filter(e => e.status === 'published').length;
  const draftExams = exams.filter(e => e.status === 'draft').length;
  const totalAttempts = examAttempts.length;

  const averageScore = totalAttempts > 0
    ? Math.round(examAttempts.reduce((sum, a) => sum + (a.percentage || 0), 0) / totalAttempts)
    : 0;

  const passedAttempts = examAttempts.filter(a => a.passed).length;
  const passRate = totalAttempts > 0
    ? Math.round((passedAttempts / totalAttempts) * 100)
    : 0;

  const filteredExams = exams.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourseFilter === 'all' || e.courseId === selectedCourseFilter;
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Zenfotech AI Academy Assessment Suite</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Exam Management</h1>
          <p className="text-slate-400 text-xs mt-1">
            Create, manage, and evaluate online examinations and automated grading workflows.
          </p>
        </div>

        <button
          onClick={onCreateExam}
          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create New Exam</span>
        </button>
      </div>

      {/* Analytics Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold block">Total Exams</span>
          <div className="text-2xl font-black text-white">{totalExams}</div>
          <p className="text-[10px] text-slate-500 font-mono">Assigned Modules</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold block">Published Exams</span>
          <div className="text-2xl font-black text-emerald-400">{publishedExams}</div>
          <p className="text-[10px] text-emerald-500 font-mono">Live for Students</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold block">Draft Exams</span>
          <div className="text-2xl font-black text-amber-400">{draftExams}</div>
          <p className="text-[10px] text-amber-500 font-mono">Under Construction</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold block">Total Attempts</span>
          <div className="text-2xl font-black text-blue-400">{totalAttempts}</div>
          <p className="text-[10px] text-blue-500 font-mono">Completed Sessions</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold block">Average Score</span>
          <div className="text-2xl font-black text-amber-400">{averageScore}%</div>
          <p className="text-[10px] text-slate-400 font-mono">Across All Attempts</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold block">Pass Rate</span>
          <div className="text-2xl font-black text-emerald-400">{passRate}%</div>
          <p className="text-[10px] text-emerald-500 font-mono">{passedAttempts} Passed</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search exam by title or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="bg-transparent text-slate-200 font-medium focus:outline-none"
            >
              <option value="all" className="bg-slate-900">All Courses</option>
              {courses.map(c => (
                <option key={c.id} value={c.id} className="bg-slate-900">{c.title}</option>
              ))}
            </select>
          </div>

          <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({exams.length})
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === 'published' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Published ({publishedExams})
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === 'draft' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Drafts ({draftExams})
            </button>
          </div>
        </div>
      </div>

      {/* Exam Directory Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-white">
          <span>All Examinations ({filteredExams.length})</span>
          <span className="text-slate-400 font-mono text-[10px]">Auto-Evaluated System</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-4">Exam Name</th>
                <th className="p-4">Course</th>
                <th className="p-4">Questions</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Passing Score</th>
                <th className="p-4">Attempts</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredExams.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-400 space-y-3">
                    <Award className="w-10 h-10 text-slate-600 mx-auto" />
                    <p className="font-semibold">No examinations found matching your query.</p>
                    <button
                      onClick={onCreateExam}
                      className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                    >
                      Create First Examination
                    </button>
                  </td>
                </tr>
              ) : (
                filteredExams.map((ex) => {
                  const course = courses.find(c => c.id === ex.courseId);
                  const attemptsCount = examAttempts.filter(a => a.examId === ex.id).length;

                  return (
                    <tr key={ex.id} className="hover:bg-slate-800/40 transition-colors">
                      
                      {/* Exam Name & ID */}
                      <td className="p-4">
                        <div className="font-bold text-white text-sm hover:text-amber-400 cursor-pointer" onClick={() => onEditExam(ex)}>
                          {ex.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            {ex.id}
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">
                            {ex.examType || 'Final Examination'}
                          </span>
                        </div>
                      </td>

                      {/* Course */}
                      <td className="p-4 text-slate-300 font-medium">
                        {course?.title || 'AI Industry Certification Program'}
                      </td>

                      {/* Questions Count */}
                      <td className="p-4 font-mono font-bold text-amber-400">
                        {ex.questions?.length || ex.totalQuestions || 0} MCQs
                      </td>

                      {/* Duration */}
                      <td className="p-4 font-mono text-slate-300">
                        {ex.durationMinutes} mins
                      </td>

                      {/* Passing Score */}
                      <td className="p-4 font-mono font-bold text-emerald-400">
                        {ex.passingPercentage}%
                      </td>

                      {/* Attempts */}
                      <td className="p-4 font-mono text-slate-300">
                        {attemptsCount}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <button
                          onClick={() => {
                            onToggleStatus(ex.id);
                            onShowToast('Status Changed', `Exam status toggled to ${ex.status === 'published' ? 'Draft' : 'Published'}`, 'info');
                          }}
                          className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border tracking-wider transition-all ${
                            ex.status === 'published'
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-800 hover:bg-emerald-900'
                              : 'bg-amber-950 text-amber-400 border-amber-800 hover:bg-amber-900'
                          }`}
                        >
                          {ex.status === 'published' ? '✓ Published' : 'Draft'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* Manage Questions */}
                          <button
                            onClick={() => onManageQuestions(ex.id)}
                            title="Manage Questions"
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors"
                          >
                            <HelpCircle className="w-4 h-4" />
                          </button>

                          {/* Edit Exam */}
                          <button
                            onClick={() => onEditExam(ex)}
                            title="Edit Exam Settings"
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Preview Exam */}
                          <button
                            onClick={() => onPreviewExam(ex.id)}
                            title="Preview Student Exam Experience"
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 transition-colors"
                          >
                            <Play className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete exam "${ex.title}"?`)) {
                                onDeleteExam(ex.id);
                                onShowToast('Exam Deleted', 'Exam removed from system', 'info');
                              }
                            }}
                            title="Delete Exam"
                            className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
