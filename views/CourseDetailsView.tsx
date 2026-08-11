'use client';

import React, { useState } from 'react';
import { Course } from '../lib/types';
import { useAppStore } from '../lib/store';
import { BookOpen, Clock, Award, CheckCircle2, ChevronDown, ChevronUp, Star, ShieldCheck, Lock, PlayCircle, HelpCircle, ShoppingBag, ArrowRight, Sparkles, Truck, Check } from 'lucide-react';

interface CourseDetailsViewProps {
  course: Course;
  onNavigate: (view: string, param?: any) => void;
}

export const CourseDetailsView: React.FC<CourseDetailsViewProps> = ({ course, onNavigate }) => {
  const { products, addToCart } = useAppStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'shop' | 'requirements' | 'certification' | 'faq'>('overview');
  const [openModuleId, setOpenModuleId] = useState<string>('mod_01');
  const [toast, setToast] = useState<string | null>(null);

  // Find products linked to this course
  const courseProducts = products.filter(p => 
    p.relatedCourseIds.includes('all') || 
    p.relatedCourseIds.includes(course.id) ||
    (course.relatedProductIds && course.relatedProductIds.includes(p.id))
  );

  const toggleModule = (id: string) => {
    setOpenModuleId(openModuleId === id ? '' : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Course Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider">
                {course.badge}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
                Level: {course.level}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold pl-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{course.rating} Rating</span>
                <span className="text-slate-500">({course.enrolledCount.toLocaleString('en-IN')} Students)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {course.description}
            </p>

            {/* Quick Specs */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span><strong className="text-white">{course.lessonCount}+</strong> Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span><strong className="text-white">Up to {course.learningHours}</strong> Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span><strong className="text-white">Digital Certificate</strong></span>
              </div>
            </div>
          </div>

          {/* Pricing & Checkout Card */}
          <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-medium">Program Enrollment Fee</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">₹{course.price.toLocaleString('en-IN')}</span>
                <span className="text-sm text-slate-500 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[10px] text-amber-400 font-bold uppercase">{course.discountPercentage}% Discount Applied</p>
            </div>

            <button
              onClick={() => onNavigate('checkout', course.id)}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl transition-all"
            >
              Enroll Now — ₹{course.price.toLocaleString('en-IN')}
            </button>

            <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Immediate Access to All Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Online Final Exam Included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verifiable Digital Certificate</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[300] bg-emerald-500 text-slate-950 px-5 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-3 animate-bounce">
          <Check className="w-5 h-5 bg-slate-950 text-emerald-400 rounded-full p-0.5" />
          <span>{toast}</span>
          <button onClick={() => onNavigate('cart')} className="ml-2 underline text-xs font-black">View Cart</button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto text-sm font-semibold pb-1">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'curriculum', label: 'Curriculum & Modules' },
          { id: 'shop', label: `Books & Accessories (${courseProducts.length})` },
          { id: 'requirements', label: 'Requirements' },
          { id: 'certification', label: 'Certification' },
          { id: 'faq', label: 'FAQ' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 rounded-t-xl shrink-0 transition-colors flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-500 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.id === 'shop' && <ShoppingBag className="w-4 h-4 text-amber-400" />}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 text-sm text-slate-300">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">About this Program</h3>
              <p className="leading-relaxed">
                The Zenfotech AI Industry Certification Program is designed for software professionals, data engineers, business consultants, and tech leaders seeking robust hands-on mastery over modern Artificial Intelligence architectures.
              </p>
            </div>

            <div>
              <h4 className="text-base font-bold text-white mb-3">What You Will Learn</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Deep neural network architectures & Transformer self-attention mechanisms',
                  'Systemic Prompt Engineering, Chain-of-Thought reasoning & Few-Shot alignment',
                  'Generative AI, multimodal visual pipelines, and synthetic data generation',
                  'Vector Databases, semantic embeddings, Cosine similarity & RAG architecture',
                  'Agentic workflows, function calling, tool integration & multi-agent coordination',
                  'Enterprise API deployment, microservices, semantic caching & cost governance',
                  'AI ethics, algorithmic bias auditing, regulatory compliance & data safety',
                  'Online examination strategy & practical industry case studies'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Curriculum Accordion Tab */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center justify-between">
              <span>Demo Curriculum — final lesson distribution will be configured by Zenfotech AI Academy.</span>
              <span className="bg-amber-500/20 px-2.5 py-1 rounded text-[10px]">500+ Lessons Total</span>
            </div>

            <div className="space-y-3">
              {course.modules.map((mod) => {
                const isOpen = openModuleId === mod.id;
                return (
                  <div key={mod.id} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors"
                    >
                      <div>
                        <h4 className="text-base font-bold text-white">{mod.title}</h4>
                        <p className="text-xs text-slate-400 mt-1">{mod.description}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-amber-400 font-mono font-semibold">{mod.lessons.length} Lessons</span>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-slate-800/80 space-y-2 bg-slate-900/40 text-xs">
                        {mod.lessons.map((les) => (
                          <div key={les.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <PlayCircle className="w-4 h-4 text-amber-400 shrink-0" />
                              <span className="text-slate-200 font-medium">{les.title}</span>
                            </div>
                            <span className="text-slate-500 font-mono">{les.durationMinutes} mins</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Books & Accessories Tab */}
        {activeTab === 'shop' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Official Course Learning Resources</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Enhance your learning with physical textbooks, practice workbooks, and custom study kits.
                </p>
              </div>

              <button
                onClick={() => onNavigate('shop')}
                className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0"
              >
                <span>Browse Full Store</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {courseProducts.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center">No specific physical books linked to this course yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courseProducts.map((p) => (
                  <div key={p.id} className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between transition-all">
                    <div>
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-3">
                        <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                          {p.categoryName}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-white text-sm line-clamp-1">{p.name}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{p.shortDescription}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-base font-black text-white">₹{p.price.toLocaleString('en-IN')}</span>
                        {p.mrp > p.price && (
                          <span className="text-[10px] text-slate-500 line-through ml-1.5 font-bold">₹{p.mrp.toLocaleString('en-IN')}</span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          addToCart(p, 1, course.id);
                          setToast(`Added "${p.name}" to cart!`);
                          setTimeout(() => setToast(null), 3000);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 shadow"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Requirements Tab */}
        {activeTab === 'requirements' && (
          <div className="space-y-4 text-sm text-slate-300">
            <h3 className="text-lg font-bold text-white">Prerequisites & Requirements</h3>
            <ul className="space-y-2">
              {course.requirements.map((req, i) => (
                <li key={i} className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Certification Tab */}
        {activeTab === 'certification' && (
          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex items-center gap-3 text-emerald-400">
              <ShieldCheck className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-bold text-white">Official Digital Certificate</h3>
                <p className="text-xs text-slate-400">Verifiable by corporate employers via /verify</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Upon completing coursework and scoring 60% or higher on the 30-minute Online Final Examination, an official Zenfotech Digital Certificate is instantly generated with a unique Certificate ID.
            </p>

            <button
              onClick={() => onNavigate('verify')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl text-xs font-bold border border-slate-700"
            >
              Test Certificate Verification Portal &rarr;
            </button>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-3 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1">Is this certification recognized?</h4>
              <p className="text-slate-400">Yes, Zenfotech AI Academy digital certificates are verified via an online ledger for corporate credentials.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-1">Can I retake the examination if I fail?</h4>
              <p className="text-slate-400">Yes, student accounts receive demo retake attempts to achieve the 60% passing mark.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
