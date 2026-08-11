'use client';

import React, { useState, useEffect } from 'react';
import { ExamAttempt, Certificate } from '../lib/types';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldCheck,
  BarChart2,
  Eye,
  Check,
  X,
  HelpCircle,
  Filter,
  ArrowRight,
  Sparkles
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'summary' | 'review'>('summary');
  const [filterType, setFilterType] = useState<'all' | 'correct' | 'wrong' | 'skipped'>('all');

  useEffect(() => {
    if (attempt && attempt.passed) {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 }
      });
    }
  }, [attempt]);

  if (!attempt) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">No Exam Attempt Found</h3>
        <p className="text-xs text-slate-400">Please launch the final examination from your student portal.</p>
        <button
          onClick={() => onNavigate('student-exam-instructions')}
          className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
        >
          Go to Final Examination
        </button>
      </div>
    );
  }

  const detailedAnswers = attempt.detailedAnswers || [];

  const filteredReviewAnswers = detailedAnswers.filter(ans => {
    if (filterType === 'correct') return ans.isCorrect;
    if (filterType === 'wrong') return !ans.isCorrect && !ans.isSkipped;
    if (filterType === 'skipped') return ans.isSkipped;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 text-xs">
      
      {/* Top Result Banner */}
      <div className={`p-8 rounded-3xl border text-center space-y-5 shadow-2xl transition-all ${
        attempt.passed
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border-emerald-500/50'
          : 'bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950 border-rose-500/50'
      }`}>
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border ${
          attempt.passed
            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-500/20'
            : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
        }`}>
          {attempt.passed ? <Award className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
        </div>

        <div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            attempt.passed
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
          }`}>
            {attempt.passed ? '✓ PASSED EXAMINATION' : 'FAILED — RETAKE AVAILABLE'}
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            {attempt.passed ? 'Congratulations! You Passed!' : 'Examination Attempt Completed'}
          </h1>

          <p className="text-slate-300 text-xs mt-1 max-w-md mx-auto leading-relaxed">
            {attempt.passed
              ? 'You have satisfied all academic requirements. Your verified digital certificate is now generated.'
              : `You scored ${attempt.percentage}%. The passing threshold is ${attempt.passingScore || 60}%. Review your answer report and retake when ready.`}
          </p>
        </div>

        {/* Big Score Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-800/80 max-w-2xl mx-auto">
          <div>
            <div className="text-3xl font-black text-amber-400">{attempt.percentage}%</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold mt-0.5">Final Percentage</div>
          </div>

          <div>
            <div className="text-2xl font-bold text-emerald-400">{attempt.correctCount} / {attempt.totalQuestions}</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold mt-0.5">✓ Correct Answers</div>
          </div>

          <div>
            <div className="text-2xl font-bold text-rose-400">{attempt.wrongCount}</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold mt-0.5">✕ Incorrect Answers</div>
          </div>

          <div>
            <div className="text-2xl font-bold text-slate-400">{attempt.skippedCount}</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold mt-0.5">— Skipped Answers</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
          
          <button
            onClick={() => setActiveTab(activeTab === 'review' ? 'summary' : 'review')}
            className={`px-6 py-3 rounded-xl font-bold text-xs border transition-all flex items-center gap-2 ${
              activeTab === 'review'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-amber-500/40'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{activeTab === 'review' ? 'Hide Answer Review' : 'Review Question Answers'}</span>
          </button>

          {attempt.passed ? (
            <button
              onClick={() => onNavigate('student-certificate')}
              className="px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-xl transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>View & Download Digital Certificate</span>
            </button>
          ) : (
            <button
              onClick={onRetakeExam}
              className="px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-xl transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Examination</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('student-dashboard')}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700"
          >
            Dashboard
          </button>

        </div>
      </div>

      {/* Topic Performance Breakdown Card */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-amber-400" />
          <span>Topic Mastery Breakdown</span>
        </h3>

        <div className="space-y-3.5">
          {Object.entries(attempt.topicScores || {}).map(([topic, pct]) => (
            <div key={topic} className="space-y-1">
              <div className="flex justify-between font-semibold text-slate-300">
                <span>{topic}</span>
                <span className="text-amber-400 font-mono font-bold">{pct}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-500 ${pct >= 60 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Answer Review Section */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-400" />
              <span>Full Answer Key & Explanation Review</span>
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">Compare your responses with the correct answer keys and read detailed explanations.</p>
          </div>

          {/* Review Filter Buttons */}
          <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1 shrink-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterType === 'all' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({detailedAnswers.length})
            </button>
            <button
              onClick={() => setFilterType('correct')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterType === 'correct' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Correct ({attempt.correctCount})
            </button>
            <button
              onClick={() => setFilterType('wrong')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterType === 'wrong' ? 'bg-rose-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Wrong ({attempt.wrongCount})
            </button>
            <button
              onClick={() => setFilterType('skipped')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterType === 'skipped' ? 'bg-amber-600 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Skipped ({attempt.skippedCount})
            </button>
          </div>
        </div>

        {filteredReviewAnswers.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            No questions matching the filter &quot;{filterType}&quot;.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviewAnswers.map((ans, idx) => (
              <div
                key={ans.questionId || idx}
                className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {ans.topic && (
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold text-[10px] uppercase mr-2">
                        {ans.topic}
                      </span>
                    )}
                    <h4 className="text-sm font-bold text-white inline leading-relaxed">
                      {ans.questionText}
                    </h4>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase border shrink-0 ${
                    ans.isCorrect
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : ans.isSkipped
                      ? 'bg-amber-950 text-amber-400 border-amber-800'
                      : 'bg-rose-950 text-rose-400 border-rose-800'
                  }`}>
                    {ans.isCorrect ? '✓ Correct' : ans.isSkipped ? '— Skipped' : '✕ Incorrect'}
                  </span>
                </div>

                {/* Answers Comparison Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  
                  {/* Student Choice */}
                  <div className={`p-3.5 rounded-xl border font-medium ${
                    ans.isCorrect
                      ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
                      : ans.isSkipped
                      ? 'bg-amber-950/20 border-amber-900/60 text-amber-300'
                      : 'bg-rose-950/30 border-rose-800 text-rose-300'
                  }`}>
                    <span className="text-[10px] font-bold uppercase block text-slate-400 mb-1">
                      Your Choice:
                    </span>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className={`w-5 h-5 rounded-full font-bold flex items-center justify-center shrink-0 ${
                        ans.isCorrect ? 'bg-emerald-500 text-slate-950' : ans.isSkipped ? 'bg-amber-500 text-slate-950' : 'bg-rose-500 text-white'
                      }`}>
                        {ans.selectedAnswer}
                      </span>
                      <span>{ans.selectedAnswerText}</span>
                    </div>
                  </div>

                  {/* Correct Key */}
                  <div className="p-3.5 rounded-xl border bg-emerald-950/30 border-emerald-800 text-emerald-300 font-medium">
                    <span className="text-[10px] font-bold uppercase block text-emerald-400 mb-1">
                      ✓ Correct Answer Key:
                    </span>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
                        {ans.correctAnswer}
                      </span>
                      <span>{ans.correctAnswerText}</span>
                    </div>
                  </div>

                </div>

                {/* Explanation Callout */}
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 leading-relaxed text-xs">
                  <strong className="text-amber-400 font-bold block mb-0.5">Explanation / Why?</strong>
                  <p>{ans.explanation || 'Explanation not provided for this question.'}</p>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
