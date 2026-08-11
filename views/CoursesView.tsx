'use client';

import React, { useState } from 'react';
import { Course } from '../lib/types';
import { Search, Filter, BookOpen, Clock, Award, Star, CheckCircle2, ChevronRight } from 'lucide-react';

interface CoursesViewProps {
  courses: Course[];
  onNavigate: (view: string, param?: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ courses, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || c.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
          Zenfotech Course Catalog
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          AI Industry Programs & Certifications
        </h1>
        <p className="text-slate-400 text-sm">
          Explore structured Artificial Intelligence programs designed for professionals, engineers, and enterprise leaders.
        </p>
      </div>

      {/* Search & Filter Control Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search AI courses, modules, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs font-medium">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {['All', 'Beginner', 'Intermediate', 'Industry Ready'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg shrink-0 transition-colors ${
                selectedLevel === lvl
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isFlagship = course.id === 'ai-industry-certification';

          return (
            <div
              key={course.id}
              className={`bg-slate-900 rounded-2xl border transition-all hover:border-slate-700 flex flex-col justify-between overflow-hidden ${
                isFlagship ? 'border-amber-500/50 shadow-xl shadow-amber-500/5' : 'border-slate-800'
              }`}
            >
              <div className="p-6 space-y-4">
                {/* Badge & Level */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    isFlagship ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {course.badge}
                  </span>
                  <span className="text-xs text-amber-400 font-semibold">{course.level}</span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{course.lessonCount}+ Lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Up to {course.learningHours} Hrs</span>
                  </div>
                </div>

                {/* Features bullet list */}
                <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                  {course.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Price & Action */}
              <div className="p-6 pt-0 border-t border-slate-800/80 bg-slate-900/50 flex items-center justify-between mt-4">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-extrabold text-white">
                      ₹{course.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 line-through">
                      ₹{course.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase">{course.discountPercentage}% OFF</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('course-details', course.id)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onNavigate('checkout', course.id)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1"
                  >
                    <span>Enroll</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
