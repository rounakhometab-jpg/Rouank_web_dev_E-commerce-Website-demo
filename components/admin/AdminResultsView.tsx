'use client';

import React, { useState } from 'react';
import { ExamAttempt, Exam, User } from '../../lib/types';
import { getOptionText, normalizeChoiceToLetter } from '../../lib/examHelpers';
import {
  BarChart,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Award,
  Download,
  Trash2,
  X,
  FileSpreadsheet,
  Clock,
  UserCheck
} from 'lucide-react';

interface AdminResultsViewProps {
  examAttempts: ExamAttempt[];
  exams: Exam[];
  students: User[];
  onDeleteAttempt?: (attemptId: string) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const AdminResultsView: React.FC<AdminResultsViewProps> = ({
  examAttempts,
  exams,
  students,
  onDeleteAttempt,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'PASSED' | 'FAILED'>('all');
  const [selectedAttempt, setSelectedAttempt] = useState<ExamAttempt | null>(null);

  const filteredAttempts = examAttempts.filter(a => {
    const matchesSearch =
      (a.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.studentEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.examTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.examId || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'PASSED' && a.passed) ||
      (statusFilter === 'FAILED' && !a.passed);

    return matchesSearch && matchesStatus;
  });

  const totalAttempts = examAttempts.length;
  const totalPassed = examAttempts.filter(a => a.passed).length;
  const passRate = totalAttempts > 0 ? Math.round((totalPassed / totalAttempts) * 100) : 0;
  const averageScore = totalAttempts > 0
    ? Math.round(examAttempts.reduce((sum, a) => sum + (a.percentage || 0), 0) / totalAttempts)
    : 0;

  const handleExportCSV = () => {
    if (examAttempts.length === 0) {
      onShowToast('No Results', 'No exam attempts available to export.', 'info');
      return;
    }

    const headers = ['Attempt ID', 'Student Name', 'Student Email', 'Exam ID', 'Exam Title', 'Score (%)', 'Result', 'Correct', 'Wrong', 'Skipped', 'Submitted At'];
    const rows = examAttempts.map(a => [
      a.id,
      `"${a.studentName}"`,
      `"${a.studentEmail || ''}"`,
      a.examId,
      `"${a.examTitle || ''}"`,
      `${a.percentage}%`,
      a.passed ? 'PASSED' : 'FAILED',
      a.correctCount,
      a.wrongCount,
      a.skippedCount,
      a.completedAt || a.submittedAt || ''
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `zenfotech_exam_results_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast('Export Successful', 'Exam results downloaded as CSV report.', 'success');
  };

  return (
    <div className="space-y-6 text-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <BarChart className="w-4 h-4" />
            <span>Grading Ledger & Evaluation Analytics</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Student Exam Results</h1>
          <p className="text-slate-400 text-xs mt-1">
            Automated grading evaluation logs, pass/fail status, and student answer breakdowns.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-2 shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Results CSV</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold block">Total Submissions</span>
          <div className="text-2xl font-black text-white">{totalAttempts}</div>
          <p className="text-[10px] text-slate-500 font-mono">Recorded Attempts</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold block">Passed Submissions</span>
          <div className="text-2xl font-black text-emerald-400">{totalPassed}</div>
          <p className="text-[10px] text-emerald-500 font-mono">Qualified Students</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold block">Pass Rate</span>
          <div className="text-2xl font-black text-amber-400">{passRate}%</div>
          <p className="text-[10px] text-amber-500 font-mono">Benchmark Score</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold block">Average Score</span>
          <div className="text-2xl font-black text-blue-400">{averageScore}%</div>
          <p className="text-[10px] text-blue-500 font-mono">Mean Performance</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student, email, exam title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              statusFilter === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Submissions
          </button>
          <button
            onClick={() => setStatusFilter('PASSED')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              statusFilter === 'PASSED' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Passed ({totalPassed})
          </button>
          <button
            onClick={() => setStatusFilter('FAILED')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              statusFilter === 'FAILED' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Failed ({totalAttempts - totalPassed})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Exam Title</th>
                <th className="p-4">Score</th>
                <th className="p-4">Correct / Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Submitted Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredAttempts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-slate-400">
                    No exam attempts recorded yet matching filter.
                  </td>
                </tr>
              ) : (
                filteredAttempts.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Student */}
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{att.studentName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{att.studentEmail || 'student@zenfotech.com'}</div>
                    </td>

                    {/* Exam Title */}
                    <td className="p-4">
                      <div className="font-semibold text-slate-200">{att.examTitle || 'AI Industry Final Certification'}</div>
                      <div className="text-[10px] text-amber-400 font-mono">{att.examId}</div>
                    </td>

                    {/* Score */}
                    <td className="p-4 font-mono font-bold text-amber-400 text-sm">
                      {att.percentage}%
                    </td>

                    {/* Breakdown */}
                    <td className="p-4 font-mono text-slate-300">
                      <span className="text-emerald-400 font-bold">{att.correctCount}</span> / {att.totalQuestions}
                      <span className="text-[10px] text-slate-500 block">({att.wrongCount} Wrong, {att.skippedCount} Skipped)</span>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                        att.passed
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : 'bg-rose-950 text-rose-400 border-rose-800'
                      }`}>
                        {att.passed ? '✓ PASSED' : '✕ FAILED'}
                      </span>
                    </td>

                    {/* Submitted Date */}
                    <td className="p-4 text-slate-400 font-mono text-[10px]">
                      {att.completedAt ? new Date(att.completedAt).toLocaleString() : 'Recent'}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedAttempt(att)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-[11px] flex items-center gap-1 border border-slate-700"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Review</span>
                        </button>

                        {onDeleteAttempt && (
                          <button
                            onClick={() => {
                              if (confirm('Delete this attempt record?')) {
                                onDeleteAttempt(att.id);
                                onShowToast('Attempt Deleted', 'Removed from evaluation ledger', 'info');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Answer Review Detail Modal for Admin */}
      {selectedAttempt && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
              <div>
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Attempt Audit & Answer Review</span>
                <h3 className="text-lg font-bold text-white">{selectedAttempt.studentName} — {selectedAttempt.examTitle || 'Final Examination'}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Attempt ID: {selectedAttempt.id}</p>
              </div>

              <button
                onClick={() => setSelectedAttempt(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Banner */}
            <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 shrink-0 ${
              selectedAttempt.passed ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200' : 'bg-rose-950/40 border-rose-800 text-rose-200'
            }`}>
              <div className="flex items-center gap-3">
                {selectedAttempt.passed ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <XCircle className="w-6 h-6 text-rose-400" />}
                <div>
                  <div className="font-extrabold text-sm uppercase">{selectedAttempt.passed ? 'PASSED EXAMINATION' : 'FAILED EXAMINATION'}</div>
                  <div className="text-xs opacity-90">Score: {selectedAttempt.percentage}% ({selectedAttempt.correctCount} / {selectedAttempt.totalQuestions} Correct)</div>
                </div>
              </div>

              <div className="text-right font-mono text-xs">
                <span className="block font-bold">Passing Benchmark: {selectedAttempt.passingScore || 60}%</span>
                <span className="text-slate-400">{selectedAttempt.completedAt ? new Date(selectedAttempt.completedAt).toLocaleDateString() : 'Today'}</span>
              </div>
            </div>

            {/* Answer List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              {(!selectedAttempt.detailedAnswers || selectedAttempt.detailedAnswers.length === 0) ? (
                <p className="text-slate-400 py-6 text-center">No question level detail recorded for this legacy attempt.</p>
              ) : (
                selectedAttempt.detailedAnswers.map((ans, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-bold text-white text-sm">
                        Q{idx + 1}. {ans.questionText}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                        ans.isCorrect ? 'bg-emerald-950 text-emerald-400' : ans.isSkipped ? 'bg-amber-950 text-amber-400' : 'bg-rose-950 text-rose-400'
                      }`}>
                        {ans.isCorrect ? '✓ Correct' : ans.isSkipped ? '— Skipped' : '✕ Wrong'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                      <div className={`p-2.5 rounded-lg border ${
                        ans.isCorrect ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300' : ans.isSkipped ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-rose-950/30 border-rose-800 text-rose-300'
                      }`}>
                        <strong className="block text-[10px] uppercase text-slate-400 font-sans">Student Answer:</strong>
                        <span>{ans.selectedAnswer}: {ans.selectedAnswerText}</span>
                      </div>

                      <div className="p-2.5 rounded-lg border bg-emerald-950/20 border-emerald-800/60 text-emerald-300">
                        <strong className="block text-[10px] uppercase text-emerald-400 font-sans">Correct Answer Key:</strong>
                        <span>{ans.correctAnswer}: {ans.correctAnswerText}</span>
                      </div>
                    </div>

                    {ans.explanation && (
                      <p className="text-slate-400 text-[11px] pt-1">
                        <strong className="text-amber-400">Explanation:</strong> {ans.explanation}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-800 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedAttempt(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
              >
                Close Audit Review
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
