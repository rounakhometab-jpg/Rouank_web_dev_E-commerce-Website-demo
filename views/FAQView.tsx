'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQView: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the Zenfotech AI Industry Certification Program?',
      a: 'It is a structured online certification course developed by Zenfotech AI Academy covering foundational and advanced Artificial Intelligence concepts, including Neural Networks, Prompt Engineering, Generative AI, RAG, and AI Agents.'
    },
    {
      q: 'How does the Online Final Examination work?',
      a: 'The exam consists of 20 multiple-choice questions with a 30-minute timed duration. Scoring 60% or higher automatically unlocks an official Zenfotech Digital Certificate.'
    },
    {
      q: 'Are certificates verifiable by employers?',
      a: 'Yes! Every issued certificate includes a unique Certificate ID (e.g. ZAA-2026-000001) which can be verified in real-time at /verify.'
    },
    {
      q: 'Is this a demo payment system?',
      a: 'Yes, this platform is configured with a demo e-commerce checkout flow. No real currency or payment card is charged.'
    },
    {
      q: 'What are the default demo login credentials?',
      a: 'Student Login: student@zenfotech.com / Demo@123\nAdmin Login: admin@zenfotech.com / Admin@123'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <HelpCircle className="w-10 h-10 text-amber-400 mx-auto" />
        <h1 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h1>
        <p className="text-slate-400 text-xs">Everything you need to know about Zenfotech AI Academy.</p>
      </div>

      <div className="space-y-3 text-xs">
        {faqs.map((f, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full p-4 text-left font-bold text-white flex items-center justify-between hover:bg-slate-800/50"
              >
                <span>{f.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
              {isOpen && (
                <div className="p-4 pt-0 text-slate-300 border-t border-slate-800/80 leading-relaxed whitespace-pre-line">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
