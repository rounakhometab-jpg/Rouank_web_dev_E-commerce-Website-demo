'use client';

import React, { useState } from 'react';
import { Course, Lesson } from '../lib/types';
import { generateCertificatePDF } from '../lib/certificatePdfGenerator';
import {
  PlayCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Clock,
  FileText,
  Download,
  Lock,
  FileUp,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
  File,
  FolderArchive
} from 'lucide-react';

interface CoursePlayerViewProps {
  course: Course;
  completedLessonIds: string[];
  onMarkComplete: (lessonId: string) => void;
  onNavigate: (view: string, param?: string) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const CoursePlayerView: React.FC<CoursePlayerViewProps> = ({
  course,
  completedLessonIds,
  onMarkComplete,
  onNavigate,
  onShowToast
}) => {
  const allLessons = course.modules.flatMap(m => m.lessons);
  const [activeLessonId, setActiveLessonId] = useState<string>(allLessons[0]?.id || 'les_01');
  const [activeTab, setActiveTab] = useState<'notes' | 'resources'>('notes');

  const currentLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0];
  const currentModule = course.modules.find(m => m.id === currentLesson?.moduleId) || course.modules[0];

  const activeIndex = allLessons.findIndex(l => l.id === activeLessonId);
  const prevLesson = activeIndex > 0 ? allLessons[activeIndex - 1] : null;
  const nextLesson = activeIndex < allLessons.length - 1 ? allLessons[activeIndex + 1] : null;

  const isCompleted = completedLessonIds.includes(currentLesson.id);

  // Sequential Learning Locking Logic
  // A lesson is locked if the previous lesson in sequence is NOT completed, unless free preview is enabled
  const isLessonLocked = (lesson: Lesson, index: number): boolean => {
    if (index === 0) return false; // First lesson always unlocked
    if (lesson.settings?.isFreePreview) return false;
    const prev = allLessons[index - 1];
    if (!prev) return false;
    return !completedLessonIds.includes(prev.id);
  };

  const currentIsLocked = isLessonLocked(currentLesson, activeIndex);

  const handleComplete = () => {
    if (currentIsLocked) {
      onShowToast('Locked Unit', 'Complete the previous lesson first to unlock this content.', 'error');
      return;
    }
    onMarkComplete(currentLesson.id);
    onShowToast('Lesson Completed!', `Progress saved for ${currentLesson.title}`, 'success');
  };

  // Check overall course progress
  const completionPercentage = Math.round((completedLessonIds.length / (allLessons.length || 1)) * 100);
  const isCourseFullyCompleted = completionPercentage >= 100;

  const handleDownloadCertificate = () => {
    generateCertificatePDF({
      id: `ZAA-2026-${String(Math.floor(Math.random() * 900000) + 100000)}`,
      studentId: 'usr_student_01',
      studentName: 'Rahul Verma',
      courseTitle: course.title,
      issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'valid',
      scorePercentage: 92,
      verificationUrl: 'https://zenfotech.com/verify'
    });
    onShowToast('Certificate Generated!', 'Your official PDF certificate has been saved to downloads.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-xs text-slate-200">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">{currentModule?.title || 'Curriculum'}</span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">{currentLesson?.title || 'Course Player'}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isCourseFullyCompleted && (
            <button
              onClick={handleDownloadCertificate}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold flex items-center gap-1.5 shadow-lg animate-pulse"
            >
              <Award className="w-4 h-4" />
              <span>Download Certificate PDF</span>
            </button>
          )}
          <button
            onClick={() => onNavigate('student-dashboard')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold border border-slate-700"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Course Completion Banner */}
      {isCourseFullyCompleted && (
        <div className="bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-slate-900 border border-amber-500/40 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">Course Requirements Satisfied (100% Completed)</h3>
              <p className="text-slate-300 text-[11px]">
                You have passed all module lessons! Click the button to generate and claim your official credential.
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadCertificate}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-lg"
          >
            Claim Certificate PDF
          </button>
        </div>
      )}

      {/* Main Player Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Curriculum Sidebar (Desktop 4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-4 max-h-[720px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm">Course Curriculum</h3>
            <span className="text-xs text-amber-400 font-mono font-bold">
              {completedLessonIds.length} / {allLessons.length} Done ({completionPercentage}%)
            </span>
          </div>

          <div className="space-y-4">
            {course.modules.map((mod) => (
              <div key={mod.id} className="space-y-1.5">
                <p className="text-[11px] font-bold text-slate-400 px-2 uppercase tracking-wide">{mod.title}</p>
                <div className="space-y-1">
                  {mod.lessons.map((les) => {
                    const idx = allLessons.findIndex(l => l.id === les.id);
                    const isActive = les.id === activeLessonId;
                    const done = completedLessonIds.includes(les.id);
                    const locked = isLessonLocked(les, idx);

                    return (
                      <button
                        key={les.id}
                        disabled={locked}
                        onClick={() => setActiveLessonId(les.id)}
                        className={`w-full text-left p-3 rounded-xl text-xs flex items-center justify-between transition-all ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                            : locked
                            ? 'bg-slate-950/50 text-slate-600 cursor-not-allowed border border-slate-900'
                            : 'bg-slate-950 text-slate-300 hover:bg-slate-800/80 border border-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate pr-2">
                          {done ? (
                            <CheckCircle2 className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />
                          ) : locked ? (
                            <Lock className="w-4 h-4 shrink-0 text-slate-600" />
                          ) : (
                            <PlayCircle className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                          {locked ? 'Locked' : `${les.durationMinutes}m`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Video Player & Lesson Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Video / Player Container */}
          <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 opacity-90"></div>
            
            {currentIsLocked ? (
              <div className="relative z-10 space-y-3 p-6 bg-slate-900/90 border border-amber-500/30 rounded-2xl max-w-md">
                <div className="w-12 h-12 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Lesson Locked</h3>
                <p className="text-slate-400 text-xs">
                  This unit requires sequential completion. Complete previous lesson{' '}
                  <span className="text-amber-400 font-bold">"{prevLesson?.title}"</span> to unlock video and materials.
                </p>
              </div>
            ) : (
              <div className="relative z-10 space-y-3">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl group-hover:scale-105 transition-transform cursor-pointer">
                  <PlayCircle className="w-10 h-10 fill-slate-950 text-amber-500" />
                </div>
                <h3 className="text-lg font-bold text-white">{currentLesson.title}</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">{currentLesson.summary}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-amber-400">
                  <Clock className="w-3 h-3" />
                  <span>{currentLesson.durationMinutes} Minutes Interactive Lecture</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              {prevLesson && (
                <button
                  onClick={() => setActiveLessonId(prevLesson.id)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold flex items-center gap-1 border border-slate-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              )}
              {nextLesson && (
                <button
                  disabled={isLessonLocked(nextLesson, activeIndex + 1)}
                  onClick={() => setActiveLessonId(nextLesson.id)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 disabled:opacity-40 text-slate-200 font-semibold flex items-center gap-1 border border-slate-700"
                >
                  <span>Next Lesson</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              disabled={currentIsLocked}
              onClick={handleComplete}
              className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all ${
                isCompleted
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Marked as Completed ✓' : 'Mark as Complete'}</span>
            </button>
          </div>

          {/* Tabs: Notes & Resources */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden space-y-4 p-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-2 ${
                  activeTab === 'notes' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Lesson Study Guide & Notes</span>
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-2 ${
                  activeTab === 'resources' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileUp className="w-4 h-4" />
                <span>Lesson Resources ({currentLesson.resources?.length || 0})</span>
              </button>
            </div>

            {activeTab === 'notes' ? (
              <div className="space-y-3 leading-relaxed">
                <p className="text-slate-300 font-medium">{currentLesson.summary}</p>
                <div className="whitespace-pre-line bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200">
                  {currentLesson.contentMarkdown || currentLesson.content || 'No additional notes provided.'}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {(!currentLesson.resources || currentLesson.resources.length === 0) ? (
                  <p className="text-slate-500 py-4 text-center">No downloadable resources attached to this lesson.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentLesson.resources.map((res, i) => (
                      <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 truncate">
                          <FileText className="w-5 h-5 text-amber-400 shrink-0" />
                          <div className="truncate">
                            <p className="font-bold text-white truncate">{res.name}</p>
                            <span className="text-[10px] text-slate-500 font-mono">{res.type || 'PDF'} • {res.size || '10 MB'}</span>
                          </div>
                        </div>
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1 shrink-0"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Get</span>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
