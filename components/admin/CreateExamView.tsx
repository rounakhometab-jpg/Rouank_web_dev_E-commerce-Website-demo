'use client';

import React, { useState } from 'react';
import { Exam, Course } from '../../lib/types';
import {
  Award,
  ArrowLeft,
  Save,
  CheckCircle,
  HelpCircle,
  Clock,
  Percent,
  RotateCcw,
  Sliders,
  ShieldAlert
} from 'lucide-react';

interface CreateExamViewProps {
  courses: Course[];
  editingExam?: Exam | null;
  onSaveExam: (examData: Partial<Exam> & { title: string; courseId: string }) => void;
  onCancel: () => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const CreateExamView: React.FC<CreateExamViewProps> = ({
  courses,
  editingExam,
  onSaveExam,
  onCancel,
  onShowToast
}) => {
  const isEditing = !!editingExam;

  const [title, setTitle] = useState(editingExam?.title || '');
  const [courseId, setCourseId] = useState(editingExam?.courseId || (courses[0]?.id || 'ai-industry-certification'));
  const [moduleId, setModuleId] = useState(editingExam?.moduleId || '');
  const [description, setDescription] = useState(editingExam?.description || '');
  const [durationMinutes, setDurationMinutes] = useState(editingExam?.durationMinutes || 30);
  const [passingPercentage, setPassingPercentage] = useState(editingExam?.passingPercentage || 60);
  const [maxAttempts, setMaxAttempts] = useState(editingExam?.maxAttempts ?? 1);
  const [examType, setExamType] = useState<'Module Quiz' | 'Final Examination'>(editingExam?.examType || 'Final Examination');
  const [status, setStatus] = useState<'draft' | 'published'>(editingExam?.status || 'published');
  
  const [randomizeQuestions, setRandomizeQuestions] = useState(editingExam?.randomizeQuestions ?? false);
  const [randomizeOptions, setRandomizeOptions] = useState(editingExam?.randomizeOptions ?? false);
  const [negativeMarking, setNegativeMarking] = useState(editingExam?.negativeMarking ?? false);
  const [negativeMarksPerWrong, setNegativeMarksPerWrong] = useState(editingExam?.negativeMarksPerWrong ?? 0.25);

  const selectedCourse = courses.find(c => c.id === courseId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !courseId) {
      onShowToast('Validation Error', 'Please fill in Exam Title and Course', 'error');
      return;
    }

    onSaveExam({
      id: editingExam?.id,
      title: title.trim(),
      courseId,
      moduleId: moduleId || undefined,
      description: description.trim(),
      durationMinutes: Number(durationMinutes),
      passingPercentage: Number(passingPercentage),
      maxAttempts: Number(maxAttempts),
      examType,
      status,
      randomizeQuestions,
      randomizeOptions,
      negativeMarking,
      negativeMarksPerWrong: Number(negativeMarksPerWrong),
      questions: editingExam?.questions || []
    });

    onShowToast(
      isEditing ? 'Exam Updated' : 'Exam Created',
      `Examination "${title}" successfully saved.`,
      'success'
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              {isEditing ? `Edit Exam: ${editingExam.id}` : 'Create Examination'}
            </span>
            <h1 className="text-xl font-bold text-white">
              {isEditing ? editingExam.title : 'Configure New Examination'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Update Examination' : 'Save & Continue'}</span>
          </button>
        </div>
      </div>

      {/* Main Configuration Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Basic Information */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Exam Overview & Basic Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Exam Title */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-slate-300 font-semibold block">
                Exam Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. AI Industry Final Certification Examination 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>

            {/* Target Course */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">
                Associated Course <span className="text-rose-400">*</span>
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 font-medium"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            {/* Exam Type */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">
                Exam Type
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 font-medium"
              >
                <option value="Final Examination">Final Examination (Certification Trigger)</option>
                <option value="Module Quiz">Module Level Practice Quiz</option>
              </select>
            </div>

            {/* Description */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-slate-300 font-semibold block">Exam Instructions & Overview</label>
              <textarea
                rows={3}
                placeholder="Provide guidelines for students prior to launching the examination..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

          </div>
        </div>

        {/* Section 2: Timing, Grading & Limits */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Timing, Passing Benchmark & Attempt Limits</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Duration Minutes */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">
                Duration (Minutes) <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                min={5}
                max={300}
                required
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono font-bold"
              />
            </div>

            {/* Passing Percentage */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">
                Passing Benchmark (%) <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                min={10}
                max={100}
                required
                value={passingPercentage}
                onChange={(e) => setPassingPercentage(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-400 font-mono font-bold"
              />
            </div>

            {/* Max Attempts */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">
                Maximum Attempts Allowed
              </label>
              <select
                value={maxAttempts}
                onChange={(e) => setMaxAttempts(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-medium"
              >
                <option value={1}>1 Attempt Only</option>
                <option value={2}>2 Attempts</option>
                <option value={3}>3 Attempts</option>
                <option value={5}>5 Attempts</option>
                <option value={0}>Unlimited Retakes</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">Publication Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-bold"
              >
                <option value="published">Published (Visible to Enrolled Students)</option>
                <option value="draft">Draft (Hidden from Students)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Section 3: Advanced Rules & Negative Marking */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Anti-Cheating & Scoring Rules</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Randomize Questions */}
            <label className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700">
              <div>
                <span className="font-bold text-white block">Randomize Questions Order</span>
                <span className="text-[10px] text-slate-400">Shuffles question sequence for every attempt</span>
              </div>
              <input
                type="checkbox"
                checked={randomizeQuestions}
                onChange={(e) => setRandomizeQuestions(e.target.checked)}
                className="w-5 h-5 accent-amber-500 rounded"
              />
            </label>

            {/* Randomize Options */}
            <label className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700">
              <div>
                <span className="font-bold text-white block">Randomize Options Sequence</span>
                <span className="text-[10px] text-slate-400">Shuffles choices A, B, C, D dynamically</span>
              </div>
              <input
                type="checkbox"
                checked={randomizeOptions}
                onChange={(e) => setRandomizeOptions(e.target.checked)}
                className="w-5 h-5 accent-amber-500 rounded"
              />
            </label>

            {/* Negative Marking */}
            <label className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700">
              <div>
                <span className="font-bold text-white block">Enable Negative Marking</span>
                <span className="text-[10px] text-slate-400">Deduct marks for incorrect choices</span>
              </div>
              <input
                type="checkbox"
                checked={negativeMarking}
                onChange={(e) => setNegativeMarking(e.target.checked)}
                className="w-5 h-5 accent-rose-500 rounded"
              />
            </label>

            {/* Negative Deduction value */}
            {negativeMarking && (
              <div className="p-4 bg-slate-950 rounded-xl border border-rose-900/60 space-y-1.5">
                <label className="text-rose-400 font-semibold block">Deduction Per Wrong Answer</label>
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="2.0"
                  value={negativeMarksPerWrong}
                  onChange={(e) => setNegativeMarksPerWrong(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-rose-300 font-mono font-bold"
                />
              </div>
            )}

          </div>
        </div>

        {/* Submit Actions Footer */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-xl flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Save Changes' : 'Save Exam & Continue to Questions'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
