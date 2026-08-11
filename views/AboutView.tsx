'use client';

import React from 'react';
import { Logo } from '../components/Logo';
import { ShieldCheck, BookOpen, Cpu, Award, Smartphone } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Hero */}
      <div className="text-center space-y-4">
        <Logo variant="light" size="lg" showTagline={true} className="justify-center" />
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white pt-4">
          Empowering Business With Artificial Intelligence
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
          Zenfotech AI Academy is the dedicated EdTech platform of Zenfotech Private Limited, delivering structured, industry-aligned Artificial Intelligence learning and verifiable digital certification.
        </p>
      </div>

      {/* Mission & Approach */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Our Learning Mission</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            To bridge the gap between high-level AI theory and practical corporate implementation. We build structured, self-paced curriculum that equips software engineers, data professionals, and business managers with real-world AI capabilities.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Technology-Enabled Ecosystem</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Our Learning Management System combines interactive video lectures, comprehensive study notes, module quizzes, automated 30-minute final examinations, and an online certificate verification portal.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-2xl font-bold text-white text-center">Core Pillars of Zenfotech Education</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <strong className="text-amber-400 text-sm block">1. Rigorous Curriculum</strong>
            <p className="text-slate-400 leading-relaxed">Up to 500 Learning Hours covering Neural Architecture, Prompt Engineering, LLMs, Agents, Vector Search, and AI Ethics.</p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <strong className="text-blue-400 text-sm block">2. Objective Online Testing</strong>
            <p className="text-slate-400 leading-relaxed">30-minute timed final examinations evaluating conceptual clarity and practical decision making.</p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <strong className="text-emerald-400 text-sm block">3. Verifiable Credentials</strong>
            <p className="text-slate-400 leading-relaxed">Every certificate bears a unique ID that can be instantly verified by corporate employers at /verify.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
