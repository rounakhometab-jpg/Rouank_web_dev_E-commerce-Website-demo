'use client';

import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { Course } from '../lib/types';
import { SafeImage } from '../components/ui/SafeImage';
import { BookOpen, ShieldCheck, Cpu, Smartphone, Award, CheckCircle2, ChevronRight, Star, Clock, Zap, ArrowRight, HelpCircle } from 'lucide-react';

interface HomeViewProps {
  courses: Course[];
  onNavigate: (view: string, param?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ courses, onNavigate }) => {
  const mainCourse = courses.find(c => c.id === 'ai-industry-certification') || courses[0];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <HeroSection
        onExploreClick={() => onNavigate('courses')}
        onVerifyClick={() => onNavigate('verify')}
        onStartCourseClick={() => onNavigate('course-details', 'ai-industry-certification')}
      />

      {/* Trust & Value Section (4-5 column feature section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Why Choose Zenfotech AI Academy
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Structured, career-aligned Artificial Intelligence education engineered for real-world business implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Structured Learning</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Learn through organized modules, self-paced lessons, and case studies.
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Practical AI Skills</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Focus on practical prompt engineering, LLMs, agents, and RAG systems.
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Online Assessment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete module quizzes and a final online examination with live timers.
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Digital Certification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive a verifiable digital certificate upon successful exam completion.
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Learn Anywhere</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Responsive web & mobile-app-ready experience across desktop, tablet, and mobile.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Flagship Program Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* Subtle gold glow line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Flagship Certification Program</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {mainCourse.title}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {mainCourse.description}
              </p>

              {/* Program Metrics Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-800/80 text-xs">
                <div>
                  <span className="text-slate-400 block">Lessons</span>
                  <strong className="text-amber-400 text-base font-bold">500+ Lessons</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Learning Hours</span>
                  <strong className="text-blue-400 text-base font-bold">Up to 500 Hrs</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Assessment</span>
                  <strong className="text-emerald-400 text-base font-bold">Online Exam</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Credential</span>
                  <strong className="text-amber-400 text-base font-bold">Verifiable Cert</strong>
                </div>
              </div>

              {/* Course Features list */}
              <div className="space-y-2 text-xs text-slate-300">
                {mainCourse.features.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-slate-400 italic">
                Demo Curriculum — final lesson distribution will be configured by Zenfotech AI Academy.
              </p>

              {/* Pricing & CTA */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      ₹{mainCourse.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-slate-500 line-through">
                      ₹{mainCourse.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase">50% Special Enrollment Discount</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigate('course-details', mainCourse.id)}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onNavigate('checkout', mainCourse.id)}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>

            {/* Right Card Visual */}
            <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="aspect-video bg-gradient-to-tr from-slate-900 to-indigo-900 rounded-xl flex flex-col items-center justify-center p-6 text-center border border-slate-800 relative">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2 border border-amber-500/40">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">AI Industry Certificate</h4>
                <p className="text-xs text-slate-400 mt-1">Authorized by Zenfotech AI Academy</p>
                <span className="mt-3 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[10px] font-bold">
                  VERIFIED CREDENTIAL
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                  <span>Level</span>
                  <span className="text-white font-semibold">{mainCourse.level}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                  <span>Language</span>
                  <span className="text-white font-semibold">English</span>
                </div>
                <div className="flex justify-between py-1 text-slate-400">
                  <span>Access</span>
                  <span className="text-amber-400 font-semibold">Lifetime Access</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mobile Experience Showcase "Learn Anywhere" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold">
              <Smartphone className="w-4 h-4" />
              <span>Mobile-App-Ready Architecture</span>
            </div>

            <h2 className="text-3xl font-extrabold text-white">
              Learn Anywhere on Any Device
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Access your student dashboard, view lesson videos, attempt quizzes, and check your examination results seamlessly from your mobile phone, tablet, or laptop.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Responsive mobile navigation bottom bar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mobile-friendly exam navigation grid</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Offline progress state syncing</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('courses')}
              className="mt-4 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-bold transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Mobile Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Mockup Graphic */}
          <div className="flex justify-center">
            <div className="w-64 bg-slate-950 border-4 border-slate-700 rounded-[36px] p-4 shadow-2xl space-y-4">
              <div className="w-16 h-4 bg-slate-800 rounded-full mx-auto mb-2"></div>
              
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="text-[10px] text-amber-400 font-bold">STUDENT DASHBOARD</div>
                <div className="font-bold text-white text-xs">AI Industry Certification</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-[68%]"></div>
                </div>
                <div className="text-[9px] text-slate-400">340/500 Lessons Completed</div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="text-[10px] text-emerald-400 font-bold">FINAL EXAM</div>
                <div className="text-[11px] font-bold text-white">Score: 82% (PASSED)</div>
              </div>

              <div className="bg-amber-500 text-slate-950 p-2.5 rounded-xl font-bold text-center text-xs">
                View Digital Certificate
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Preview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400 mt-1">Get quick answers about Zenfotech AI Academy certification.</p>
        </div>

        <div className="space-y-3 text-xs">
          {[
            {
              q: 'How does the AI Industry Certification course work?',
              a: 'Students enroll online, complete structured modules & lessons, attempt module quizzes, and take the 30-minute online final examination. Passing scores automatically unlock the verifiable digital certificate.'
            },
            {
              q: 'How many lessons and hours are included?',
              a: 'The flagship program offers up to 500 Learning Hours and 500+ structured lesson topics across 8 comprehensive AI modules.'
            },
            {
              q: 'Is the certificate verifiable online?',
              a: 'Yes! Every certificate contains a unique Certificate ID (e.g. ZAA-2026-000001) that can be verified anytime on our public verification portal at /verify.'
            }
          ].map((faq, i) => (
            <div key={i} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-slate-300 leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate('faq')}
            className="text-xs text-amber-400 font-semibold hover:underline"
          >
            View all FAQs &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
