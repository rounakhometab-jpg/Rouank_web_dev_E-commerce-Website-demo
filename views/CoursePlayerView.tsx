'use client';

import React, { useState } from 'react';
import { Course, Lesson } from '../lib/types';
import { PlayCircle, CheckCircle2, ChevronRight, ChevronLeft, BookOpen, Clock, FileText, Download, Check, Sparkles } from 'lucide-react';

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
  // Find first non-completed lesson or default to first lesson
  const allLessons = course.modules.flatMap(m => m.lessons);
  const [activeLessonId, setActiveLessonId] = useState<string>(allLessons[0]?.id || 'les_01');

  const currentLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0];
  const currentModule = course.modules.find(m => m.id === currentLesson?.moduleId) || course.modules[0];

  const activeIndex = allLessons.findIndex(l => l.id === activeLessonId);
  const prevLesson = activeIndex > 0 ? allLessons[activeIndex - 1] : null;
  const nextLesson = activeIndex < allLessons.length - 1 ? allLessons[activeIndex + 1] : null;

  const isCompleted = completedLessonIds.includes(currentLesson.id);

  const handleComplete = () => {
    onMarkComplete(currentLesson.id);
    onShowToast('Lesson Completed!', `Progress saved for ${currentLesson.title}`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800">
        <div>
          <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">{currentModule.title}</span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">{currentLesson.title}</h1>
        </div>
        <button
          onClick={() => onNavigate('student-dashboard')}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold self-start sm:self-auto border border-slate-700"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Main Player Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Curriculum Sidebar (Desktop 4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-4 max-h-[680px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm">Course Curriculum</h3>
            <span className="text-xs text-amber-400 font-mono font-bold">
              {completedLessonIds.length} / {allLessons.length} Done
            </span>
          </div>

          <div className="space-y-4">
            {course.modules.map((mod) => (
              <div key={mod.id} className="space-y-1.5">
                <p className="text-xs font-bold text-slate-400 px-2 uppercase tracking-wide">{mod.title}</p>
                <div className="space-y-1">
                  {mod.lessons.map((les) => {
                    const isActive = les.id === activeLessonId;
                    const done = completedLessonIds.includes(les.id);

                    return (
                      <button
                        key={les.id}
                        onClick={() => setActiveLessonId(les.id)}
                        className={`w-full text-left p-3 rounded-xl text-xs flex items-center justify-between transition-all ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                            : 'bg-slate-950 text-slate-300 hover:bg-slate-800/80 border border-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate pr-2">
                          {done ? (
                            <CheckCircle2 className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />
                          ) : (
                            <PlayCircle className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                          {les.durationMinutes}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Lesson Content & Video Player (Desktop 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Video / Interactive Player Area */}
          <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 opacity-90"></div>
            
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
          </div>

          {/* Action Toolbar: Mark Complete & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              {prevLesson && (
                <button
                  onClick={() => setActiveLessonId(prevLesson.id)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              )}
              {nextLesson && (
                <button
                  onClick={() => setActiveLessonId(nextLesson.id)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700"
                >
                  <span>Next Lesson</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={handleComplete}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all ${
                isCompleted
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Marked as Completed ✓' : 'Mark as Complete'}</span>
            </button>
          </div>

          {/* Detailed Study Notes & Text Content */}
          <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <span>Lesson Study Guide & Notes</span>
            </h3>

            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>{currentLesson.summary}</p>
              <div className="whitespace-pre-line bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-200">
                {currentLesson.contentMarkdown}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
