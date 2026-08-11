'use client';

import React, { useState } from 'react';
import { Award, BookOpen, Clock, ShieldCheck, CheckCircle2, ChevronRight, PlayCircle, BarChart3, Star, Layers, Check } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onVerifyClick: () => void;
  onStartCourseClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onVerifyClick,
  onStartCourseClick
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'progress' | 'modules' | 'exam' | 'certificate'>('dashboard');

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden pt-12 pb-20 border-b border-slate-800">
      {/* Background Subtle Gradient & Grid Patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Chip */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-amber-400 font-bold">2026 Edition</span>
            <span className="text-slate-500">|</span>
            <span>AI Industry Certification Program</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Hero Headline & Subheading */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Master AI. <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">Build the Future.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Industry-focused AI learning with structured lessons, practical skills, online assessment and digital certification.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore Programs</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onVerifyClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>View Certification</span>
            </button>
          </div>

          {/* Hero Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-800/80 max-w-4xl mx-auto text-left">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">500+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Structured Lessons</div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">Up to 500</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Learning Hours</div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">Online</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Final Examination</div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">Digital</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Verifiable Certificate</div>
            </div>
          </div>
        </div>

        {/* Realistic Product Interactive Showcase */}
        <div className="mt-16 max-w-5xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Showcase Control Bar */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between overflow-x-auto gap-2">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="ml-2 text-xs text-slate-500 font-mono hidden sm:inline">zenfotech.com/student/lms</span>
            </div>

            {/* View switcher tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 shrink-0 text-xs">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeTab === 'progress' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Progress
              </button>
              <button
                onClick={() => setActiveTab('modules')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeTab === 'modules' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Curriculum
              </button>
              <button
                onClick={() => setActiveTab('exam')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeTab === 'exam' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Exam
              </button>
              <button
                onClick={() => setActiveTab('certificate')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeTab === 'certificate' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Certificate
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-8 min-h-[340px] flex flex-col justify-center bg-slate-900">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
                  <div>
                    <div className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">Enrolled Course</div>
                    <h3 className="text-xl font-bold text-white">AI Industry Certification Program</h3>
                    <p className="text-xs text-slate-400 mt-1">Status: Active Student | Enrolled August 2026</p>
                  </div>
                  <button 
                    onClick={onStartCourseClick}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 self-start sm:self-auto shadow-md"
                  >
                    Continue Learning
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-xs font-medium">Overall Completion</div>
                    <div className="text-2xl font-extrabold text-amber-400 mt-1">68%</div>
                    <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-amber-500 h-full w-[68%]"></div>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-xs font-medium">Lessons Covered</div>
                    <div className="text-2xl font-extrabold text-blue-400 mt-1">340 / 500</div>
                    <p className="text-[10px] text-slate-500 mt-1">Self-Paced Module Progression</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-xs font-medium">Exam Status</div>
                    <div className="text-2xl font-extrabold text-emerald-400 mt-1">Ready (82%)</div>
                    <p className="text-[10px] text-emerald-400 mt-1 font-semibold">Passed & Verified</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-white">Module Progression Tracker</span>
                  <span className="text-amber-400 font-mono font-bold">340 / 500 Hours Completed</span>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Module 01: AI Fundamentals', pct: 100, status: 'Completed' },
                    { name: 'Module 02: Prompt Engineering', pct: 100, status: 'Completed' },
                    { name: 'Module 03: Generative AI & Multimodal', pct: 80, status: 'In Progress' },
                    { name: 'Module 04: Machine Learning & RAG', pct: 60, status: 'In Progress' },
                    { name: 'Module 05: Agentic Workflows', pct: 0, status: 'Upcoming' },
                  ].map((m, idx) => (
                    <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                          m.pct === 100 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {m.pct === 100 ? <Check className="w-3 h-3" /> : idx + 1}
                        </div>
                        <span className="text-slate-200 font-medium">{m.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
                          <div className="bg-amber-500 h-full" style={{ width: `${m.pct}%` }}></div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.pct === 100 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>{m.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'modules' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-400 mb-2">
                  Demo Curriculum preview — final lesson distribution is configured by Zenfotech AI Academy.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    'Mod 01 — AI Fundamentals',
                    'Mod 02 — Prompt Engineering',
                    'Mod 03 — Generative AI',
                    'Mod 04 — Machine Learning',
                    'Mod 05 — AI Automation',
                    'Mod 06 — Practical Projects',
                    'Mod 07 — Industry Applications',
                    'Mod 08 — Final Preparation'
                  ].map((title, i) => (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{title}</span>
                      <span className="text-slate-500 text-[11px]">8 Lessons</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'exam' && (
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Online Final Examination</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  20 Multiple Choice Questions | 30 Minutes Duration | Passing Threshold: 60%
                </p>
                <div className="flex justify-center gap-4 text-xs font-mono">
                  <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                    Last Score: <strong className="text-emerald-400">82%</strong>
                  </div>
                  <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                    Result: <strong className="text-emerald-400">PASSED</strong>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'certificate' && (
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
                <ShieldCheck className="w-10 h-10 text-amber-400" />
                <div>
                  <h4 className="text-base font-bold text-white">Official Zenfotech Digital Certificate</h4>
                  <p className="text-xs text-slate-400 mt-1">Certificate ID: ZAA-2026-000001 | Verified Status</p>
                </div>
                <button
                  onClick={onVerifyClick}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 rounded-lg text-xs font-semibold"
                >
                  Verify Certificate Online
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
