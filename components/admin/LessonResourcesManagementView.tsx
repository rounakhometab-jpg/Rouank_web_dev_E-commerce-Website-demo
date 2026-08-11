'use client';

import React, { useState } from 'react';
import { Course, Lesson, LessonResource } from '../../lib/types';
import {
  FileUp,
  Plus,
  Search,
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Check,
  File,
  Film,
  Music,
  Image as ImageIcon,
  FolderArchive
} from 'lucide-react';

interface LessonResourcesManagementViewProps {
  courses: Course[];
  onAddOrUpdateLesson: (courseId: string, moduleId: string, lessonData: Partial<Lesson> & { title: string }) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const LessonResourcesManagementView: React.FC<LessonResourcesManagementViewProps> = ({
  courses,
  onAddOrUpdateLesson,
  onShowToast
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || 'ai-industry-certification');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  const allModules = currentCourse?.modules || [];
  const allLessons = allModules.flatMap(m => m.lessons || []);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string>(allModules[0]?.id || '');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(allLessons[0]?.id || '');

  // Form Fields
  const [resName, setResName] = useState('');
  const [resDesc, setResDesc] = useState('');
  const [resType, setResType] = useState<'PDF' | 'PPT' | 'PPTX' | 'DOC' | 'DOCX' | 'ZIP' | 'Image' | 'Audio' | 'Video' | 'External Link'>('PDF');
  const [resUrl, setResUrl] = useState('');
  const [resSize, setResSize] = useState('8.5 MB');
  const [resDownloadable, setResDownloadable] = useState(true);
  const [resStatus, setResStatus] = useState<'published' | 'hidden'>('published');

  // Flattened resources list across all lessons in selected course
  const allResources = allModules.flatMap(m =>
    (m.lessons || []).flatMap(l =>
      (l.resources || []).map(r => ({
        ...r,
        courseId: currentCourse.id,
        courseTitle: currentCourse.title,
        moduleId: m.id,
        moduleTitle: m.title,
        lessonId: l.id,
        lessonTitle: l.title
      }))
    )
  );

  const handleOpenAddModal = () => {
    setResName('');
    setResDesc('');
    setResType('PDF');
    setResUrl('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf');
    setResSize('12.4 MB');
    setResDownloadable(true);
    setResStatus('published');
    if (allModules.length > 0) setSelectedModuleId(allModules[0].id);
    if (allLessons.length > 0) setSelectedLessonId(allLessons[0].id);
    setShowModal(true);
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName.trim() || !resUrl.trim()) {
      onShowToast('Validation Error', 'Resource Name and File/Link URL are required.', 'error');
      return;
    }

    const targetLesson = allLessons.find(l => l.id === selectedLessonId);
    if (!targetLesson) {
      onShowToast('Error', 'Please select a valid lesson.', 'error');
      return;
    }

    const newResource: LessonResource = {
      id: `res_${Date.now()}`,
      name: resName.trim(),
      description: resDesc.trim(),
      type: resType,
      url: resUrl.trim(),
      size: resSize.trim(),
      downloadable: resDownloadable,
      status: resStatus,
      courseId: selectedCourseId,
      moduleId: targetLesson.moduleId,
      lessonId: targetLesson.id,
      createdAt: new Date().toISOString()
    };

    const existingResources = targetLesson.resources || [];
    const updatedResources = [...existingResources, newResource];

    onAddOrUpdateLesson(selectedCourseId, targetLesson.moduleId, {
      ...targetLesson,
      resources: updatedResources
    });

    onShowToast('Resource Added', `"${resName}" attached to ${targetLesson.title}`, 'success');
    setShowModal(false);
  };

  const handleDeleteResource = (lessonId: string, moduleId: string, resourceName: string) => {
    const targetLesson = allLessons.find(l => l.id === lessonId);
    if (!targetLesson) return;

    if (confirm(`Remove resource "${resourceName}" from lesson "${targetLesson.title}"?`)) {
      const updatedResources = (targetLesson.resources || []).filter(r => r.name !== resourceName);
      onAddOrUpdateLesson(selectedCourseId, moduleId, {
        ...targetLesson,
        resources: updatedResources
      });
      onShowToast('Resource Removed', `Deleted "${resourceName}".`, 'info');
    }
  };

  const getIconForType = (type?: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-4 h-4 text-red-400" />;
      case 'PPT':
      case 'PPTX': return <FileText className="w-4 h-4 text-amber-400" />;
      case 'ZIP': return <FolderArchive className="w-4 h-4 text-purple-400" />;
      case 'Video': return <Film className="w-4 h-4 text-blue-400" />;
      case 'Audio': return <Music className="w-4 h-4 text-emerald-400" />;
      case 'Image': return <ImageIcon className="w-4 h-4 text-pink-400" />;
      default: return <ExternalLink className="w-4 h-4 text-cyan-400" />;
    }
  };

  // Filtered resources
  const filteredResources = allResources.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.lessonTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || r.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 text-xs text-slate-200">
      
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <FileUp className="w-4 h-4" />
            <span>Lesson Resources Repository</span>
          </div>
          <h1 className="text-xl font-extrabold text-white">Lesson Study Guides & Downloadables</h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Manage PDFs, slides, code repositories, datasets, and external learning links attached to lessons.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold flex items-center gap-2 shadow-lg transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Upload Resource</span>
        </button>
      </div>

      {/* Course Select & Filters */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-slate-400 font-bold whitespace-nowrap flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Course:</span>
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="flex-1 md:w-80 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-bold focus:border-amber-400 focus:outline-none"
          >
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search resources or lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-bold focus:border-amber-400 focus:outline-none"
          >
            <option value="all">All File Types</option>
            <option value="PDF">PDF Documents</option>
            <option value="PPT">PPT / PPTX Slides</option>
            <option value="ZIP">ZIP Archives</option>
            <option value="External Link">External Links</option>
          </select>
        </div>

      </div>

      {/* Resources Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {filteredResources.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FileUp className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Resources Found</h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto">
              No study attachments found for this course. Click "+ Upload Resource" to attach files.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4 font-extrabold">Resource Name</th>
                  <th className="py-3 px-4 font-extrabold">Type</th>
                  <th className="py-3 px-4 font-extrabold">Attached Lesson</th>
                  <th className="py-3 px-4 font-extrabold">Size</th>
                  <th className="py-3 px-4 font-extrabold">Downloadable</th>
                  <th className="py-3 px-4 font-extrabold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredResources.map((res, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-white">
                      <div className="flex items-center gap-2.5">
                        {getIconForType(res.type)}
                        <div>
                          <p className="hover:text-amber-400 cursor-pointer">{res.name}</p>
                          {res.description && (
                            <p className="text-[10px] text-slate-400 font-normal line-clamp-1">{res.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-bold text-[10px] border border-slate-700">
                        {res.type || 'PDF'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-medium">
                      <p className="text-amber-400 font-bold line-clamp-1">{res.lessonTitle}</p>
                      <p className="text-[10px] text-slate-500 line-clamp-1">{res.moduleTitle}</p>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">{res.size || '—'}</td>
                    <td className="py-3 px-4">
                      {res.downloadable !== false ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Yes
                        </span>
                      ) : (
                        <span className="text-slate-500 font-bold">No</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors"
                          title="Open Resource URL"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDeleteResource(res.lessonId, res.moduleId, res.name)}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/50 transition-colors"
                          title="Delete Resource"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* UPLOAD RESOURCE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveResource} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-6 p-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <FileUp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-white">+ Attach Lesson Resource</h2>
                  <p className="text-[11px] text-slate-400">Add PDF slides, code files or external links</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-lg font-mono"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Module & Lesson *</label>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={selectedModuleId}
                    onChange={(e) => {
                      setSelectedModuleId(e.target.value);
                      const mod = allModules.find(m => m.id === e.target.value);
                      if (mod && mod.lessons.length > 0) {
                        setSelectedLessonId(mod.lessons[0].id);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:border-amber-400 focus:outline-none"
                  >
                    {allModules.map(m => (
                      <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </select>

                  <select
                    value={selectedLessonId}
                    onChange={(e) => setSelectedLessonId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:border-amber-400 focus:outline-none"
                  >
                    {allLessons.filter(l => l.moduleId === selectedModuleId).map(l => (
                      <option key={l.id} value={l.id}>{l.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Resource Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Complete GenAI Cheatsheet & Prompt Guide PDF"
                  value={resName}
                  onChange={(e) => setResName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Resource Type</label>
                  <select
                    value={resType}
                    onChange={(e) => setResType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:border-amber-400 focus:outline-none"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="PPT">PPT / PPTX Slides</option>
                    <option value="DOC">DOC / DOCX File</option>
                    <option value="ZIP">ZIP Code / Dataset</option>
                    <option value="Image">Image Graphic</option>
                    <option value="Video">Video File</option>
                    <option value="External Link">External Web Link</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">File Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 14.5 MB"
                    value={resSize}
                    onChange={(e) => setResSize(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Resource File / Link URL *</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={resUrl}
                  onChange={(e) => setResUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Short notes about what this resource contains..."
                  value={resDesc}
                  onChange={(e) => setResDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={resDownloadable}
                    onChange={(e) => setResDownloadable(e.target.checked)}
                    className="w-4 h-4 rounded accent-amber-500"
                  />
                  <span className="font-bold text-slate-300">Allow Direct Download</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-750"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow-md"
              >
                Attach Resource
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
