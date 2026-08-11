'use client';

import React, { useState } from 'react';
import { Course, Module, Lesson, QuizQuestion, LessonResource } from '../../lib/types';
import {
  FileText,
  PlayCircle,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  FileUp,
  Image as ImageIcon,
  HelpCircle,
  Settings,
  ArrowLeft,
  X,
  Clock,
  Sparkles,
  Link,
  Eye,
  File
} from 'lucide-react';

interface AddLessonViewProps {
  courses: Course[];
  initialCourseId?: string;
  initialModuleId?: string;
  editingLesson?: Lesson | null;
  onSaveLesson: (courseId: string, moduleId: string, lesson: Partial<Lesson> & { title: string }) => void;
  onCancel: () => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const AddLessonView: React.FC<AddLessonViewProps> = ({
  courses,
  initialCourseId,
  initialModuleId,
  editingLesson,
  onSaveLesson,
  onCancel,
  onShowToast
}) => {
  // Course & Module Selection
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourseId || editingLesson?.courseId || courses[0]?.id || ''
  );

  const selectedCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  const availableModules = selectedCourse?.modules || [];

  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    initialModuleId || editingLesson?.moduleId || availableModules[0]?.id || ''
  );

  // Lesson Core Info
  const [title, setTitle] = useState(editingLesson?.title || '');
  const [shortDescription, setShortDescription] = useState(editingLesson?.shortDescription || editingLesson?.summary || '');
  const [contentMarkdown, setContentMarkdown] = useState(
    editingLesson?.contentMarkdown || editingLesson?.content || '### Key Learning Concepts\n- Point 1\n- Point 2'
  );
  const [durationMinutes, setDurationMinutes] = useState(editingLesson?.durationMinutes || 20);
  const [lessonType, setLessonType] = useState<Lesson['type']>(editingLesson?.type || 'video');

  // Video Upload State
  const [videoUrl, setVideoUrl] = useState(editingLesson?.videoUrl || '');
  const [videoFileName, setVideoFileName] = useState(editingLesson?.videoFileName || '');
  const [videoFileSize, setVideoFileSize] = useState(editingLesson?.videoFileSize || '');
  const [videoPreview, setVideoPreview] = useState<string | null>(editingLesson?.videoUrl || null);

  // PDF / Document Resources State
  const [resources, setResources] = useState<LessonResource[]>(
    editingLesson?.resources || [
      { name: 'AI Architecture Whitepaper.pdf', type: 'PDF', url: 'https://example.com/doc.pdf', size: '2.4 MB' }
    ]
  );
  const [newResName, setNewResName] = useState('');
  const [newResUrl, setNewResUrl] = useState('');
  const [newResType, setNewResType] = useState('PDF');

  // Lesson Images State
  const [images, setImages] = useState<string[]>(editingLesson?.images || []);

  // Multi-Attachments
  const [attachments, setAttachments] = useState(editingLesson?.attachments || []);

  // Lesson Quiz State
  const [quizTitle, setQuizTitle] = useState(editingLesson?.quiz?.title || 'Lesson Understanding Quiz');
  const [passingScore, setPassingScore] = useState(editingLesson?.quiz?.passingScore || 70);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(
    editingLesson?.quiz?.questions || [
      {
        id: 'q1',
        question: 'What is the primary advantage of Transformer self-attention mechanism?',
        options: [
          'Parallel execution across text sequences',
          'Linear memory complexity',
          'Single-threaded execution',
          'No vector matrix required'
        ],
        correctAnswer: 0,
        explanation: 'Self-attention processes tokens in parallel unlike sequential RNNs.'
      }
    ]
  );

  // Lesson Settings
  const [settings, setSettings] = useState({
    isFreePreview: editingLesson?.settings?.isFreePreview || false,
    allowComments: editingLesson?.settings?.allowComments ?? true,
    isRequired: editingLesson?.settings?.isRequired ?? true,
    sequentialLearning: editingLesson?.settings?.sequentialLearning ?? true,
    downloadResources: editingLesson?.settings?.downloadResources ?? true,
    certificateRequirement: editingLesson?.settings?.certificateRequirement ?? true
  });

  // Preview Mode Toggle
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setVideoPreview(url);
      setVideoFileName(file.name);
      setVideoFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      onShowToast('Video Selected', `${file.name} ready for playback (Demo Storage)`, 'info');
    }
  };

  const handleAddResource = () => {
    if (!newResName || !newResUrl) return;
    setResources([...resources, { name: newResName, type: newResType, url: newResUrl, size: 'Demo File' }]);
    setNewResName('');
    setNewResUrl('');
    onShowToast('Resource Added', 'Document attached to lesson', 'success');
  };

  const removeResource = (idx: number) => {
    setResources(resources.filter((_, i) => i !== idx));
  };

  const addQuizQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      {
        id: `q_${Date.now()}`,
        question: 'New Question statement...',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'Explanation statement...'
      }
    ]);
  };

  const updateQuizQuestion = (idx: number, updated: Partial<QuizQuestion>) => {
    const list = [...quizQuestions];
    list[idx] = { ...list[idx], ...updated };
    setQuizQuestions(list);
  };

  const removeQuizQuestion = (idx: number) => {
    setQuizQuestions(quizQuestions.filter((_, i) => i !== idx));
  };

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};
    if (!selectedCourseId) errs.course = 'Please select a course';
    if (!selectedModuleId) errs.module = 'Please select a module';
    if (!title.trim()) errs.title = 'Lesson title is required';

    if (lessonType === 'video' && !videoUrl && !videoFileName) {
      errs.video = 'Please upload a video file or provide a video URL';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (status: 'draft' | 'published') => {
    if (status === 'published' && !validate()) {
      onShowToast('Validation Error', 'Please complete all required lesson fields.', 'error');
      return;
    }

    const lessonObj: Partial<Lesson> & { title: string } = {
      id: editingLesson?.id,
      courseId: selectedCourseId,
      moduleId: selectedModuleId,
      title,
      shortDescription,
      summary: shortDescription,
      contentMarkdown,
      content: contentMarkdown,
      durationMinutes,
      learningHours: Math.ceil(durationMinutes / 60 * 100) / 100,
      type: lessonType,
      videoUrl,
      videoFileName,
      videoFileSize,
      resources,
      attachments,
      images,
      quiz: lessonType === 'quiz' ? { id: `quiz_${Date.now()}`, title: quizTitle, passingScore, questions: quizQuestions } : undefined,
      settings,
      status
    };

    onSaveLesson(selectedCourseId, selectedModuleId, lessonObj);
    onShowToast(
      status === 'published' ? 'Lesson Published' : 'Draft Saved',
      status === 'published' ? 'Lesson is live in student LMS.' : 'Draft saved in lesson bank.',
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
            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">LESSON UPLOAD ENGINE</div>
            <h1 className="text-xl font-extrabold text-white">
              {editingLesson ? 'Edit Lesson Content' : 'Upload New Lesson Content'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold border border-slate-700 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>{isPreviewMode ? 'Exit Preview' : 'Lesson Preview'}</span>
          </button>
          <button
            onClick={() => handleSave('draft')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave('published')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow-lg"
          >
            Publish Lesson
          </button>
        </div>
      </div>

      {/* PREVIEW MODE DISPLAY */}
      {isPreviewMode ? (
        <div className="bg-slate-900 p-8 rounded-2xl border border-amber-500/50 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase rounded">
              STUDENT LMS PREVIEW
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">{title || 'Untitled Lesson'}</h2>
            <p className="text-slate-400 mt-1">{shortDescription}</p>
          </div>

          {videoPreview && (
            <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center">
              <video src={videoPreview} controls className="w-full h-full rounded-2xl" />
            </div>
          )}

          <div className="prose prose-invert max-w-none bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono">
            {contentMarkdown}
          </div>
        </div>
      ) : (
        <>
          {/* COURSE & MODULE SELECTION */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>1. Course & Module Target</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Select Target Course <span className="text-rose-400">*</span>
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => {
                    setSelectedCourseId(e.target.value);
                    const course = courses.find(c => c.id === e.target.value);
                    if (course && course.modules.length > 0) {
                      setSelectedModuleId(course.modules[0].id);
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Select Target Module <span className="text-rose-400">*</span>
                </label>
                <select
                  value={selectedModuleId}
                  onChange={(e) => setSelectedModuleId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs"
                >
                  {availableModules.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
                {availableModules.length === 0 && (
                  <p className="text-[10px] text-amber-400 mt-1">No modules found in this course. Create a module first.</p>
                )}
              </div>
            </div>
          </div>

          {/* LESSON DETAILS & TYPE */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>2. Lesson Identity & Format</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Lesson Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Deep Learning Architecture & Transformer Self-Attention"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs"
                />
                {errors.title && <p className="text-[10px] text-rose-400 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Lesson Short Description / Summary</label>
                <input
                  type="text"
                  placeholder="A brief overview of key learning takeaways..."
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Lesson Duration (Minutes)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Lesson Content Format</label>
                  <select
                    value={lessonType}
                    onChange={(e) => setLessonType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="video">Video Lecture (Upload / Embed)</option>
                    <option value="article">Article / Markdown Reading</option>
                    <option value="pdf">PDF Document / Presentation</option>
                    <option value="quiz">Interactive Quiz Assessment</option>
                    <option value="assignment">Hands-on Assignment</option>
                    <option value="live_class">Live Recorded Class</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* VIDEO UPLOAD SECTION (If Video type) */}
          {lessonType === 'video' && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-amber-400" />
                <span>3. Video Lesson Upload & URL</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-3">
                  <div className="border-2 border-dashed border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 text-center space-y-2 bg-slate-950/50 relative cursor-pointer">
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      onChange={handleVideoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 text-amber-400 mx-auto" />
                    <p className="font-semibold text-white">Upload MP4, WEBM, MOV Video File</p>
                    <p className="text-[10px] text-slate-500">Demo video upload preview loaded into player</p>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] font-semibold mb-1">Or YouTube / Vimeo / Direct Video URL</label>
                    <input
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=... or direct MP4 URL"
                      value={videoUrl}
                      onChange={(e) => {
                        setVideoUrl(e.target.value);
                        setVideoPreview(e.target.value);
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="md:col-span-5 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Video Status</span>
                  {videoFileName && (
                    <div className="space-y-1 text-xs">
                      <p className="text-white font-bold truncate">{videoFileName}</p>
                      <p className="text-slate-400 text-[10px]">File Size: {videoFileSize}</p>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] uppercase font-bold inline-block">
                        Ready for LMS
                      </span>
                    </div>
                  )}

                  {videoPreview ? (
                    <div className="pt-2">
                      <video src={videoPreview} controls className="w-full h-32 rounded-xl bg-black object-cover" />
                    </div>
                  ) : (
                    <div className="h-32 bg-slate-900 rounded-xl flex items-center justify-center text-slate-600 text-xs">
                      No Video Loaded
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STUDY GUIDE & MARKDOWN CONTENT */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>4. Detailed Study Notes & Guide (Markdown Content)</span>
            </h3>

            <div>
              <textarea
                rows={8}
                value={contentMarkdown}
                onChange={(e) => setContentMarkdown(e.target.value)}
                placeholder="Write comprehensive lesson notes, code snippets, formula definitions..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white font-mono text-xs leading-relaxed"
              ></textarea>
            </div>
          </div>

          {/* RESOURCES & ATTACHMENTS */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <FileUp className="w-4 h-4 text-amber-400" />
              <span>5. PDF & Document Resource Attachments</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Resource Name (e.g. AI Cheat Sheet)"
                value={newResName}
                onChange={(e) => setNewResName(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
              <input
                type="url"
                placeholder="Resource URL (PDF / Drive link)"
                value={newResUrl}
                onChange={(e) => setNewResUrl(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
              <button
                type="button"
                onClick={handleAddResource}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl p-2.5 flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Attach Resource</span>
              </button>
            </div>

            <div className="space-y-2 pt-2">
              {resources.map((res, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <File className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <p className="font-bold text-white">{res.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{res.url}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeResource(i)}
                    className="text-rose-400 hover:text-rose-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* QUIZ BUILDER (If type = quiz) */}
          {lessonType === 'quiz' && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>Lesson Quiz Builder</span>
                </h3>
                <button
                  type="button"
                  onClick={addQuizQuestion}
                  className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add MCQ Question</span>
                </button>
              </div>

              <div className="space-y-4">
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-amber-400">Question #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeQuizQuestion(idx)}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => updateQuizQuestion(idx, { question: e.target.value })}
                      placeholder="Enter question statement..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => (
                        <input
                          key={optIdx}
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...q.options];
                            newOpts[optIdx] = e.target.value;
                            updateQuizQuestion(idx, { options: newOpts });
                          }}
                          placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                          className="bg-slate-900 border border-slate-800 rounded-xl p-2 text-white"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LESSON SETTINGS */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-400" />
              <span>6. Lesson Settings & Controls</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-3 rounded-xl border border-slate-800">
                <input
                  type="checkbox"
                  checked={settings.isFreePreview}
                  onChange={(e) => setSettings({ ...settings, isFreePreview: e.target.checked })}
                  className="rounded text-amber-500"
                />
                <span>Free Preview Lesson</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-3 rounded-xl border border-slate-800">
                <input
                  type="checkbox"
                  checked={settings.isRequired}
                  onChange={(e) => setSettings({ ...settings, isRequired: e.target.checked })}
                  className="rounded text-amber-500"
                />
                <span>Mark as Required for Completion</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-3 rounded-xl border border-slate-800">
                <input
                  type="checkbox"
                  checked={settings.downloadResources}
                  onChange={(e) => setSettings({ ...settings, downloadResources: e.target.checked })}
                  className="rounded text-amber-500"
                />
                <span>Allow Resource Downloads</span>
              </label>
            </div>
          </div>
        </>
      )}

    </div>
  );
};
