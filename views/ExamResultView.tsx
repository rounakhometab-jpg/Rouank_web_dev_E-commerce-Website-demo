'use client';

import React, { useEffect } from 'react';
import { ExamAttempt, Certificate } from '../lib/types';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, ShieldCheck, BarChart2 } from 'lucide-react';

interface ExamResultViewProps {
  attempt: ExamAttempt | null;
  certificate: Certificate | null;
  onNavigate: (view: string, param?: string) => void;
  onRetakeExam: () => void;
}

export const ExamResultView: React.FC<ExamResultViewProps> = ({
  attempt,
  certificate,
  onNavigate,
  onRetakeExam
}) => {
  useEffect(() => {
    if (attempt && attempt.passed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [attempt]);

  if (!attempt) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">No Exam Attempt Found</h3>
        <p className="text-xs text-slate-400">Please start the examination from your student dashboard.</p>
        <button
          onClick={() => onNavigate('student-exam-instructions')}
          className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
        >
          Go to Final Examination
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      
      {/* Result Status Banner */}
      <div className={`p-8 rounded-3xl border text-center space-y-4 shadow-2xl ${
        attempt.passed
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border-emerald-500/50'
          : 'bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950 border-rose-500/50'
      }`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto border ${
          attempt.passed
            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
            : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
        }`}>
          {attempt.passed ? <Award className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
        </div>

        <div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            attempt.passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
          }`}>
            {attempt.passed ? '✓ PASSED EXAMINATION' : 'FAILED — RETAKE AVAILABLE'}
          </span>

          <h1 className="text-3xl font-extrabold text-white mt-3">
            {attempt.passed ? 'Congratulations! You Passed!' : 'Examination Attempt Complete'}
          </h1>

          <p className="text-slate-300 text-xs mt-1 max-w-md mx-auto">
            {attempt.passed
              ? 'You have successfully satisfied all certification requirements. Your official digital certificate is ready.'
              : 'You did not reach the 60% passing mark. You can review the performance breakdown and retake the test.'}
          </p>
        </div>

        {/* Big Score Card */}
        <div className="flex justify-center items-center gap-6 py-4 border-y border-slate-800">
          <div>
            <div className="text-3xl font-extrabold text-amber-400">{attempt.percentage}%</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Final Score</div>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div>
            <div className="text-2xl font-bold text-white">{attempt.correctCount} / {attempt.totalQuestions}</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Correct Answers</div>
          </div>
        </div>

        {/* Primary Action */}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          {attempt.passed ? (
            <button
              onClick={() => onNavigate('student-certificate')}
              className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-xl transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>View & Download Digital Certificate</span>
            </button>
          ) : (
            <button
              onClick={onRetakeExam}
              className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-xl transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Examination</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('student-dashboard')}
            className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Module Topic Breakdown Card */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-amber-400" />
          <span>Topic Performance Breakdown</span>
        </h3>

        <div className="space-y-3 text-xs">
          {Object.entries(attempt.topicScores || {}).map(([topic, pct]) => (
            <div key={topic} className="space-y-1">
              <div className="flex justify-between font-semibold text-slate-300">
                <span>{topic}</span>
                <span className="text-amber-400 font-mono">{pct}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all ${pct >= 60 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
