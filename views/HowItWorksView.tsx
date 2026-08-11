'use client';

import React from 'react';
import { BookOpen, CreditCard, Award, ShieldCheck, ArrowRight } from 'lucide-react';

interface HowItWorksViewProps {
  onNavigate: (view: string) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Enroll in Program',
      desc: 'Select the flagship AI Industry Certification course and complete the demo e-commerce enrollment flow.',
      icon: CreditCard
    },
    {
      num: '02',
      title: 'Complete Interactive Modules',
      desc: 'Access video lectures, comprehensive markdown study notes, and module quizzes in the Student LMS player.',
      icon: BookOpen
    },
    {
      num: '03',
      title: 'Take Online Final Exam',
      desc: 'Attempt the 30-minute, 20-MCQ online examination with real-time evaluation by the automated assessment engine.',
      icon: Award
    },
    {
      num: '04',
      title: 'Receive Digital Certificate',
      desc: 'Achieve 60%+ to instantly generate your printable, verifiable Zenfotech Digital Certificate.',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/30 text-xs font-bold uppercase">
          Learning Journey
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">How Zenfotech AI Academy Works</h1>
        <p className="text-slate-400 text-xs max-w-md mx-auto">
          A seamless 4-step path from enrollment to verifiable AI industry certification.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.num} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3 relative">
              <span className="text-3xl font-extrabold text-slate-800 font-mono absolute right-6 top-6">{step.num}</span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={() => onNavigate('courses')}
          className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-xs shadow-xl inline-flex items-center gap-2"
        >
          <span>Explore Course Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
