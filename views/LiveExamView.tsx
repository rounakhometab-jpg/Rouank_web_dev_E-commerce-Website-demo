'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Exam, ExamAttempt } from '../lib/types';
import { getOptionList, normalizeChoiceToLetter } from '../lib/examHelpers';
import { Clock, CheckCircle2, ChevronLeft, ChevronRight, ShieldAlert, Sparkles } from 'lucide-react';

interface LiveExamViewProps {
  exam: Exam;
  onSubmitExam: (answers: Record<string, string | number>, examId?: string) => ExamAttempt;
  onFinishExam: (attempt: ExamAttempt) => void;
}

export const LiveExamView: React.FC<LiveExamViewProps> = ({
  exam,
  onSubmitExam,
  onFinishExam
}) => {
  const storageKey = `zenfotech_active_exam_${exam.id}`;

  const [currentIdx, setCurrentIdx] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const saved = localStorage.getItem(`zenfotech_active_exam_${exam.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.currentIdx === 'number') return parsed.currentIdx;
      }
    } catch {}
    return 0;
  });

  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem(`zenfotech_active_exam_${exam.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) return parsed.answers;
      }
    } catch {}
    return {};
  });

  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(() => {
    if (typeof window === 'undefined') return exam.durationMinutes * 60;
    try {
      const saved = localStorage.getItem(`zenfotech_active_exam_${exam.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.timeLeftSeconds === 'number' && parsed.timeLeftSeconds > 0) {
          return parsed.timeLeftSeconds;
        }
      }
    } catch {}
    return exam.durationMinutes * 60;
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Persist current state on change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        answers,
        timeLeftSeconds,
        currentIdx
      }));
    } catch {
      // ignore
    }
  }, [answers, timeLeftSeconds, currentIdx, storageKey]);

  const handleFinalSubmit = useCallback(() => {
    setShowConfirmModal(false);
    setIsEvaluating(true);
    localStorage.removeItem(storageKey);

    setTimeout(() => {
      const attempt = onSubmitExam(answers, exam.id);
      setIsEvaluating(false);
      onFinishExam(attempt);
    }, 1500); // Simulated Automated Assessment Engine processing
  }, [answers, exam.id, onSubmitExam, onFinishExam, storageKey]);

  const submitRef = useRef(handleFinalSubmit);
  useEffect(() => {
    submitRef.current = handleFinalSubmit;
  }, [handleFinalSubmit]);

  // Real Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => submitRef.current(), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const currentQuestion = exam.questions[currentIdx];
  const optionsList = currentQuestion ? getOptionList(currentQuestion) : [];

  const handleSelectOption = (letter: string) => {
    if (!currentQuestion) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: letter
    }));
  };

  if (isEvaluating) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full border-4 border-amber-500 border-t-transparent animate-spin mx-auto"></div>
        <h3 className="text-xl font-bold text-white">Automated Assessment Engine</h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          Evaluating your answers, checking against key benchmarks, and calculating topic scores...
        </p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h3 className="text-lg font-bold text-white">No Questions Found</h3>
        <p className="text-xs text-slate-400">This examination currently has no questions assigned.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Fixed Header with Timer */}
      <div className="bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-20 z-30 shadow-2xl">
        <div>
          <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">{exam.title}</span>
          <h2 className="text-base sm:text-lg font-bold text-white">
            Question {currentIdx + 1} of {exam.questions.length}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-sm font-bold ${
            timeLeftSeconds < 300
              ? 'bg-rose-950 text-rose-400 border-rose-800 animate-pulse'
              : 'bg-slate-950 text-amber-400 border-slate-800'
          }`}>
            <Clock className="w-4 h-4" />
            <span>Time Remaining: {timeString}</span>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all"
          >
            Submit Examination
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Question Navigation Grid 1..N */}
        <div className="lg:col-span-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
            <span className="font-bold text-white">Question Navigation Grid</span>
            <span className="text-emerald-400 font-mono font-bold">
              {Object.keys(answers).length} / {exam.questions.length} Answered
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {exam.questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = idx === currentIdx;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`py-2 rounded-lg font-mono font-bold text-xs transition-all ${
                    isCurrent
                      ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 shadow-md'
                      : isAnswered
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-800">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-emerald-950 border border-emerald-800 rounded"></span> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded"></span> Current
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-slate-950 border border-slate-800 rounded"></span> Unanswered
            </span>
          </div>
        </div>

        {/* Right: Current Question Box */}
        <div className="lg:col-span-8 bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-slate-800 text-amber-400 font-bold text-[10px] uppercase">
                Topic: {currentQuestion.topic || 'General AI'}
              </span>
              {currentQuestion.marks && (
                <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                  {currentQuestion.marks} Mark{currentQuestion.marks > 1 ? 's' : ''}
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-xl font-bold text-white leading-relaxed pt-1">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {optionsList.map((opt) => {
              const selectedChoice = answers[currentQuestion.id];
              const isSelected = selectedChoice === opt.letter || selectedChoice === String(opt.index);

              return (
                <button
                  key={opt.letter}
                  onClick={() => handleSelectOption(opt.letter)}
                  className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/20 border-2 border-amber-500 text-white font-bold shadow-md'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full font-mono text-xs flex items-center justify-center font-bold shrink-0 ${
                      isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {opt.letter}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => prev - 1)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold disabled:opacity-40 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Question</span>
            </button>

            {currentIdx < exam.questions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-md"
              >
                Review & Submit Exam
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Submit Examination?</h3>
            </div>
            
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <p>
                You have answered <strong className="text-emerald-400">{Object.keys(answers).length} out of {exam.questions.length} questions</strong>.
              </p>
              {exam.questions.length - Object.keys(answers).length > 0 && (
                <p className="text-amber-400 font-semibold">
                  ⚠️ You have {exam.questions.length - Object.keys(answers).length} unanswered question(s). Unanswered questions will be marked as skipped.
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Return to Exam
              </button>
              <button
                onClick={handleFinalSubmit}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-md"
              >
                Confirm & Evaluate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
