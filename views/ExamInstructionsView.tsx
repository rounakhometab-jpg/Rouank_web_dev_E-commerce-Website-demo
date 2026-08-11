'use client';

import React from 'react';
import { Exam } from '../lib/types';
import { Award, Clock, HelpCircle, CheckCircle2, AlertTriangle, Play, ShieldCheck } from 'lucide-react';

interface ExamInstructionsViewProps {
  exam: Exam;
  onStartExam: () => void;
  onNavigate: (view: string) => void;
}

export const ExamInstructionsView: React.FC<ExamInstructionsViewProps> = ({
  exam,
  onStartExam,
  onNavigate
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
          Official Online Assessment
        </span>
        <h1 className="text-3xl font-extrabold text-white">
          {exam.title}
        </h1>
        <p className="text-slate-400 text-xs">
          Comprehensive online examination for official Zenfotech Digital Certificate issuance.
        </p>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <Clock className="w-6 h-6 text-amber-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{exam.durationMinutes} Minutes</div>
          <p className="text-xs text-slate-400 mt-1">Countdown Exam Timer</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <HelpCircle className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{exam.totalQuestions} Questions</div>
          <p className="text-xs text-slate-400 mt-1">Multiple Choice Format</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <Award className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{exam.passingPercentage}% Mark</div>
          <p className="text-xs text-slate-400 mt-1">Passing Threshold</p>
        </div>
      </div>

      {/* Instructions Card */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 text-xs text-slate-300">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <span>Examination Rules & Instructions</span>
        </h3>

        <ul className="space-y-3 leading-relaxed">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Read each question carefully and select the single best option out of the 4 choices provided.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Use the Question Navigation Grid (1 to 20) on the left side to jump between questions anytime.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>The timer will automatically submit your exam when 30 minutes expire.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Scoring at least <strong>60% (12/20)</strong> will automatically unlock your verifiable Zenfotech Digital Certificate.</span>
          </li>
        </ul>

        <div className="p-3 bg-amber-950/40 border border-amber-800/50 rounded-xl text-amber-300 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>Do not close or refresh your browser while the live exam timer is running.</span>
        </div>
      </div>

      {/* Start Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => onNavigate('student-dashboard')}
          className="w-full sm:w-1/3 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800"
        >
          Cancel & Back
        </button>

        <button
          onClick={onStartExam}
          className="w-full sm:w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm shadow-xl flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>Start Online Examination</span>
        </button>
      </div>
    </div>
  );
};
