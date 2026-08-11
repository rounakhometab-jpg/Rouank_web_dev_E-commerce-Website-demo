'use client';

import React, { useState } from 'react';
import { Course } from '../../lib/types';
import {
  BookOpen,
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle2,
  Upload,
  Sparkles,
  ArrowLeft,
  X,
  FileText,
  User,
  Globe,
  DollarSign,
  Clock,
  Layers,
  Search
} from 'lucide-react';

interface AddCourseViewProps {
  editingCourse?: Course | null;
  onSaveCourse: (course: Course) => void;
  onCancel: () => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const AddCourseView: React.FC<AddCourseViewProps> = ({
  editingCourse,
  onSaveCourse,
  onCancel,
  onShowToast
}) => {
  // SECTION A: BASIC INFORMATION
  const [title, setTitle] = useState(editingCourse?.title || '');
  const [shortDescription, setShortDescription] = useState(editingCourse?.shortDescription || editingCourse?.tagline || '');
  const [description, setDescription] = useState(editingCourse?.description || '');
  const [category, setCategory] = useState(editingCourse?.category || 'Generative AI');
  const [level, setLevel] = useState<Course['level']>(editingCourse?.level || 'Industry Ready');
  const [language, setLanguage] = useState(editingCourse?.language || 'English');

  // SECTION B: THUMBNAIL
  const [thumbnailUrl, setThumbnailUrl] = useState(editingCourse?.thumbnail || '');
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(editingCourse?.thumbnail || null);

  // SECTION C: COURSE DETAILS
  const [learningHours, setLearningHours] = useState(editingCourse?.learningHours || 120);
  const [lessonCount, setLessonCount] = useState(editingCourse?.lessonCount || 85);
  const [duration, setDuration] = useState(editingCourse?.duration || '12 Weeks');
  const [price, setPrice] = useState(editingCourse?.price || 4999);
  const [originalPrice, setOriginalPrice] = useState(editingCourse?.originalPrice || 14999);
  const [discountPrice, setDiscountPrice] = useState(editingCourse?.discountPrice || 4999);
  const [accessType, setAccessType] = useState<'lifetime' | 'limited'>(editingCourse?.accessType || 'lifetime');
  const [accessDuration, setAccessDuration] = useState(editingCourse?.accessDuration || '365 Days');

  // SECTION D: COURSE CONTENT (OBJECTIVES & REQUIREMENTS)
  const [objectives, setObjectives] = useState<string[]>(
    editingCourse?.objectives || [
      'Master Generative AI & Large Language Model architecture',
      'Build end-to-end Retrieval-Augmented Generation (RAG) systems',
      'Deploy autonomous multi-agent AI workflows in production'
    ]
  );
  const [requirements, setRequirements] = useState<string[]>(
    editingCourse?.requirements || [
      'Basic programming understanding in Python or JavaScript',
      'Curiosity for AI & machine learning concepts'
    ]
  );

  // SECTION E: COURSE FEATURES
  const [features, setFeatures] = useState<string[]>(
    editingCourse?.features || [
      'Online Learning',
      'Quizzes',
      'Assignments',
      'Final Examination',
      'Digital Certificate',
      'Progress Tracking',
      'Mobile Responsive Learning'
    ]
  );

  // SECTION F: INSTRUCTOR
  const [instructorName, setInstructorName] = useState(editingCourse?.instructor?.name || 'Dr. Aris V. K., Lead AI Scientist');
  const [instructorBio, setInstructorBio] = useState(editingCourse?.instructor?.bio || 'Senior AI Researcher & Former Google DeepMind Consultant');
  const [instructorPhoto, setInstructorPhoto] = useState(editingCourse?.instructor?.photo || '');

  // SECTION G: SEO
  const [seoTitle, setSeoTitle] = useState(editingCourse?.seo?.title || title);
  const [seoDescription, setSeoDescription] = useState(editingCourse?.seo?.description || shortDescription);
  const [seoKeywords, setSeoKeywords] = useState(editingCourse?.seo?.keywords || 'AI, Generative AI, Python, Machine Learning, Certification');
  const [seoSlug, setSeoSlug] = useState(editingCourse?.seo?.slug || 'ai-industry-certification');

  // SECTION H: STATUS
  const [status, setStatus] = useState<'draft' | 'published'>(editingCourse?.status === 'draft' ? 'draft' : 'published');

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setThumbnailPreview(objectUrl);
      setThumbnailUrl(objectUrl);
      onShowToast('Thumbnail Uploaded', `${file.name} loaded successfully (Demo Storage)`, 'info');
    }
  };

  const addObjective = () => setObjectives([...objectives, '']);
  const updateObjective = (index: number, val: string) => {
    const list = [...objectives];
    list[index] = val;
    setObjectives(list);
  };
  const removeObjective = (index: number) => setObjectives(objectives.filter((_, i) => i !== index));

  const addRequirement = () => setRequirements([...requirements, '']);
  const updateRequirement = (index: number, val: string) => {
    const list = [...requirements];
    list[index] = val;
    setRequirements(list);
  };
  const removeRequirement = (index: number) => setRequirements(requirements.filter((_, i) => i !== index));

  const toggleFeature = (featureName: string) => {
    if (features.includes(featureName)) {
      setFeatures(features.filter(f => f !== featureName));
    } else {
      setFeatures([...features, featureName]);
    }
  };

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) errs.title = 'Course Title is required';
    if (!shortDescription.trim()) errs.shortDescription = 'Course Short Description is required';
    if (!description.trim()) errs.description = 'Full Description is required';
    if (!category) errs.category = 'Category is required';
    if (price < 0) errs.price = 'Price cannot be negative';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (targetStatus: 'draft' | 'published') => {
    if (targetStatus === 'published' && !validate()) {
      onShowToast('Validation Error', 'Please complete all required fields.', 'error');
      return;
    }

    const discountPercentage = originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const courseData: Course = {
      id: editingCourse?.id || `COURSE-${Date.now().toString().slice(-6)}`,
      title,
      shortDescription,
      tagline: shortDescription,
      badge: level === 'Industry Ready' ? ' flagship program ' : `${level} Program`,
      description,
      category,
      level,
      language,
      thumbnail: thumbnailPreview || thumbnailUrl || 'https://picsum.photos/seed/ai-course/800/450',
      learningHours,
      lessonCount,
      duration,
      price,
      originalPrice,
      discountPrice,
      discountPercentage,
      rating: editingCourse?.rating || 4.9,
      enrolledCount: editingCourse?.enrolledCount || 1,
      accessType,
      accessDuration,
      objectives: objectives.filter(o => o.trim() !== ''),
      requirements: requirements.filter(r => r.trim() !== ''),
      features,
      instructor: {
        name: instructorName,
        bio: instructorBio,
        photo: instructorPhoto
      },
      seo: {
        title: seoTitle || title,
        description: seoDescription || shortDescription,
        keywords: seoKeywords,
        slug: seoSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      },
      status: targetStatus,
      createdAt: editingCourse?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      modules: editingCourse?.modules || []
    };

    onSaveCourse(courseData);
    onShowToast(
      targetStatus === 'published' ? 'Course Published' : 'Draft Saved',
      targetStatus === 'published'
        ? 'Course published successfully and is now active on the LMS.'
        : 'Course draft saved successfully.',
      'success'
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 text-xs text-slate-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">ZENFOTECH ADMIN COURSE BUILDER</div>
            <h1 className="text-xl font-extrabold text-white">
              {editingCourse ? 'Edit Course Program' : 'Create & Upload New Course'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave('draft')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave('published')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow-lg transition-colors"
          >
            Publish Course
          </button>
        </div>
      </div>

      {/* SECTION A — BASIC INFORMATION */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Section A — Basic Information</span>
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Course Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Zenfotech AI Industry Certification Program"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full bg-slate-950 border rounded-xl p-3 text-white text-xs ${
                errors.title ? 'border-rose-500' : 'border-slate-800'
              }`}
            />
            {errors.title && <p className="text-[10px] text-rose-400 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Course Short Description / Tagline <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Enterprise Mastery in Generative AI, LLMs, Vector DBs & Multi-Agent Systems"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className={`w-full bg-slate-950 border rounded-xl p-3 text-white text-xs ${
                errors.shortDescription ? 'border-rose-500' : 'border-slate-800'
              }`}
            />
            {errors.shortDescription && <p className="text-[10px] text-rose-400 mt-1">{errors.shortDescription}</p>}
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Course Full Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="Provide comprehensive details regarding the syllabus, projects, real-world applications..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full bg-slate-950 border rounded-xl p-3 text-white text-xs ${
                errors.description ? 'border-rose-500' : 'border-slate-800'
              }`}
            ></textarea>
            {errors.description && <p className="text-[10px] text-rose-400 mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Course Category <span className="text-rose-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs"
              >
                <option value="Generative AI">Generative AI</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Prompt Engineering">Prompt Engineering</option>
                <option value="AI Automation">AI Automation</option>
                <option value="Business AI">Business AI</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Course Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Industry Ready">Industry Ready</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Course Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Hinglish">Hinglish</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION B — COURSE THUMBNAIL */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-amber-400" />
          <span>Section B — Course Thumbnail</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <p className="text-slate-400 text-xs">
              Upload course cover image (Recommended 16:9 ratio, PNG/JPG/WEBP). Uploaded image renders in preview mode immediately.
            </p>

            <div className="border-2 border-dashed border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 text-center space-y-2 bg-slate-950/50 cursor-pointer transition-colors relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="font-semibold text-white">Click or drag & drop thumbnail image file</p>
              <p className="text-[10px] text-slate-500">Supports PNG, JPG, JPEG, WEBP up to 10MB</p>
            </div>

            <div className="space-y-1 pt-1">
              <label className="block text-slate-400 text-[11px] font-semibold">Or Direct Image URL</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={thumbnailUrl}
                onChange={(e) => {
                  setThumbnailUrl(e.target.value);
                  setThumbnailPreview(e.target.value);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs font-mono"
              />
            </div>
          </div>

          <div className="md:col-span-5 bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Thumbnail Live Preview</span>
            {thumbnailPreview ? (
              <div className="space-y-2">
                <img
                  src={thumbnailPreview}
                  alt="Course Thumbnail Preview"
                  className="w-full h-36 object-cover rounded-xl border border-slate-800"
                />
                <button
                  type="button"
                  onClick={() => {
                    setThumbnailPreview(null);
                    setThumbnailUrl('');
                  }}
                  className="text-rose-400 hover:text-rose-300 font-bold text-[10px] underline"
                >
                  Remove Thumbnail
                </button>
              </div>
            ) : (
              <div className="w-full h-36 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-slate-600 gap-2">
                <ImageIcon className="w-8 h-8" />
                <span>No Thumbnail Loaded</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION C — COURSE DETAILS & PRICING */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Section C — Course Details & Pricing</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Learning Hours</label>
            <input
              type="number"
              value={learningHours}
              onChange={(e) => setLearningHours(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Estimated Lessons</label>
            <input
              type="number"
              value={lessonCount}
              onChange={(e) => setLessonCount(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Course Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Access Type</label>
            <select
              value={accessType}
              onChange={(e) => setAccessType(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            >
              <option value="lifetime">Lifetime Access</option>
              <option value="limited">Limited Duration</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Final Price (₹) <span className="text-rose-400">*</span>
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Original Price / MRP (₹)</label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Calculated Discount</label>
            <div className="bg-slate-950 p-2.5 border border-slate-800 rounded-xl text-amber-400 font-bold font-mono">
              {originalPrice > 0 ? `${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF` : '0%'}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION D — COURSE CONTENT (OBJECTIVES & REQUIREMENTS) */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>Section D — Learning Objectives & Prerequisites</span>
        </h3>

        {/* Objectives */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="font-bold text-white">Learning Objectives (What students will learn)</label>
            <button
              type="button"
              onClick={addObjective}
              className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 text-[11px] font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Objective</span>
            </button>
          </div>

          <div className="space-y-2">
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={obj}
                  onChange={(e) => updateObjective(i, e.target.value)}
                  placeholder={`Objective ${i + 1}...`}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs"
                />
                <button
                  type="button"
                  onClick={() => removeObjective(i)}
                  className="p-2 text-rose-400 hover:text-rose-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="flex justify-between items-center">
            <label className="font-bold text-white">Course Prerequisites & Requirements</label>
            <button
              type="button"
              onClick={addRequirement}
              className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 text-[11px] font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Requirement</span>
            </button>
          </div>

          <div className="space-y-2">
            {requirements.map((req, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => updateRequirement(i, e.target.value)}
                  placeholder={`Requirement ${i + 1}...`}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs"
                />
                <button
                  type="button"
                  onClick={() => removeRequirement(i)}
                  className="p-2 text-rose-400 hover:text-rose-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION E — COURSE FEATURES */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Section E — Included Course Features</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            'Online Learning',
            'Quizzes',
            'Assignments',
            'Final Examination',
            'Digital Certificate',
            'Progress Tracking',
            'Mobile Responsive Learning',
            'Instructor Support'
          ].map((featureName) => {
            const isChecked = features.includes(featureName);
            return (
              <button
                key={featureName}
                type="button"
                onClick={() => toggleFeature(featureName)}
                className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-colors ${
                  isChecked
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border ${
                    isChecked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-700'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5 fill-slate-950 text-amber-500" />}
                </div>
                <span>{featureName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION F — INSTRUCTOR */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-amber-400" />
          <span>Section F — Course Instructor Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Instructor Name</label>
            <input
              type="text"
              value={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Instructor Designation & Bio</label>
            <input
              type="text"
              value={instructorBio}
              onChange={(e) => setInstructorBio(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>
        </div>
      </div>

      {/* SECTION G — SEO */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-400" />
          <span>Section G — SEO & URL Slug Settings</span>
        </h3>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">URL Slug</label>
              <input
                type="text"
                value={seoSlug}
                onChange={(e) => setSeoSlug(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">SEO Description</label>
            <input
              type="text"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold border border-slate-700"
        >
          Cancel
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave('draft')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave('published')}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow-xl"
          >
            Publish Course
          </button>
        </div>
      </div>

    </div>
  );
};
