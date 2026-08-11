'use client';

import React, { useState, useEffect } from 'react';
import { Exam, ExamAttempt } from '../lib/types';
import { Clock, AlertTriangle, ChevronLeft, ChevronRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface LiveExamViewProps {
  exam: Exam;
  onSubmitExam: (answers: Record<string, number>) => ExamAttempt;
  onFinishExam: (attempt: ExamAttempt) => void;
}

export const LiveExamView: React.FC<LiveExamViewProps> = ({
  exam,
  onSubmitExam,
  onFinishExam
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(exam.durationMinutes * 60);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleFinalSubmit = React.useCallback(() => {
    setShowConfirmModal(false);
    setIsEvaluating(true);

    setTimeout(() => {
      const attempt = onSubmitExam(answers);
      setIsEvaluating(false);
      onFinishExam(attempt);
    }, 1500); // Simulated Automated Assessment Engine processing
  }, [answers, onSubmitExam, onFinishExam]);

  const submitRef = React.useRef(handleFinalSubmit);
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

  const handleSelectOption = (optionIdx: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIdx
    }));
  };

  if (isEvaluating) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full border-4 border-amber-500 border-t-transparent animate-spin mx-auto"></div>
        <h3 className="text-xl font-bold text-white">Automated Assessment Engine</h3>
        <p className="text-slate-400 text-xs">
          Evaluating your 20 examination answers and calculating topic performance...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Fixed Header with Timer */}
      <div className="bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-24 z-30 shadow-2xl">
        <div>
          <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">{exam.title}</span>
          <h2 className="text-base sm:text-lg font-bold text-white">Question {currentIdx + 1} of {exam.questions.length}</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm font-bold text-amber-400">
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
        
        {/* Left: Question Navigation Grid 1..20 */}
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
                      ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
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
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-950 border border-emerald-800 rounded"></span> Answered</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-amber-500 rounded"></span> Current</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-950 border border-slate-800 rounded"></span> Unanswered</span>
          </div>
        </div>

        {/* Right: Current Question Box */}
        <div className="lg:col-span-8 bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded bg-slate-800 text-amber-400 font-bold text-[10px] uppercase">
              Topic: {currentQuestion.topic}
            </span>
            <h3 className="text-base sm:text-xl font-bold text-white leading-relaxed pt-1">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((optText, optIdx) => {
              const selected = answers[currentQuestion.id] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                    selected
                      ? 'bg-amber-500/20 border-2 border-amber-500 text-white font-bold shadow-md'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full font-mono text-xs flex items-center justify-center font-bold ${
                      selected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{optText}</span>
                  </div>
                  {selected && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Bottom Next / Prev Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => prev - 1)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold disabled:opacity-40 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Question</span>
            </button>

            {currentIdx < exam.questions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md"
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
            
            <p className="text-xs text-slate-300 leading-relaxed">
              You have answered <strong className="text-emerald-400">{Object.keys(answers).length} out of 20 questions</strong>.
              Submitting now will send your answers to the Automated Assessment Engine for instant evaluation.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Return to Exam
              </button>
              <button
                onClick={handleFinalSubmit}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
