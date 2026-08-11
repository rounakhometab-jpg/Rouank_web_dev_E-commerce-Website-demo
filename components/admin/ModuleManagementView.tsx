'use client';

import React, { useState } from 'react';
import { Course, Module, Lesson } from '../../lib/types';
import {
  Layers,
  Plus,
  Edit3,
  Trash2,
  ChevronUp,
  ChevronDown,
  BookOpen,
  Clock,
  FileText,
  CheckCircle,
  Eye,
  ArrowRight,
  Filter,
  Search,
  Check,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';

interface ModuleManagementViewProps {
  courses: Course[];
  initialCourseId?: string;
  onAddOrUpdateModule: (courseId: string, moduleData: Partial<Module> & { title: string }) => void;
  onDeleteModule: (courseId: string, moduleId: string) => void;
  onReorderModules: (courseId: string, moduleIds: string[]) => void;
  onNavigate: (view: string, param?: string) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const ModuleManagementView: React.FC<ModuleManagementViewProps> = ({
  courses,
  initialCourseId,
  onAddOrUpdateModule,
  onDeleteModule,
  onReorderModules,
  onNavigate,
  onShowToast
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourseId || courses[0]?.id || 'ai-industry-certification'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);

  // Form Fields
  const [modTitle, setModTitle] = useState('');
  const [modDesc, setModDesc] = useState('');
  const [modNumber, setModNumber] = useState<number>(1);
  const [modThumbnail, setModThumbnail] = useState('');
  const [modHours, setModHours] = useState<number>(2);
  const [modStatus, setModStatus] = useState<'draft' | 'published'>('published');

  const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  const allModules = currentCourse?.modules || [];

  const handleOpenAddModal = () => {
    setEditingModule(null);
    setModTitle('');
    setModDesc('');
    setModNumber(allModules.length + 1);
    setModThumbnail('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80');
    setModHours(2);
    setModStatus('published');
    setShowModal(true);
  };

  const handleOpenEditModal = (mod: Module) => {
    setEditingModule(mod);
    setModTitle(mod.title);
    setModDesc(mod.description || '');
    setModNumber(mod.moduleNumber || mod.order || 1);
    setModThumbnail(mod.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80');
    setModHours(mod.estimatedHours || 2);
    setModStatus(mod.status || 'published');
    setShowModal(true);
  };

  const handleSaveModule = (saveAndPublish = false) => {
    if (!modTitle.trim()) {
      onShowToast('Validation Error', 'Module Title is required', 'error');
      return;
    }

    const targetStatus = saveAndPublish ? 'published' : modStatus;

    // Formatted module ID generator: MODULE-000001
    const totalCountAcrossAll = courses.flatMap(c => c.modules || []).length;
    const formattedId = editingModule
      ? editingModule.id
      : `MODULE-${String(totalCountAcrossAll + 1).padStart(6, '0')}`;

    onAddOrUpdateModule(selectedCourseId, {
      id: formattedId,
      courseId: selectedCourseId,
      title: modTitle.trim(),
      description: modDesc.trim(),
      moduleNumber: Number(modNumber) || (allModules.length + 1),
      order: Number(modNumber) || (allModules.length + 1),
      thumbnail: modThumbnail,
      estimatedHours: Number(modHours) || 2,
      status: targetStatus,
      lessons: editingModule?.lessons || []
    });

    onShowToast(
      editingModule ? 'Module Updated' : 'Module Created',
      `"${modTitle}" saved successfully. Unique ID: ${formattedId}`,
      'success'
    );

    setShowModal(false);
  };

  const handleDelete = (modId: string, title: string) => {
    if (confirm(`Are you sure you want to delete module "${title}"? All inside lessons will be removed.`)) {
      onDeleteModule(selectedCourseId, modId);
      onShowToast('Module Deleted', `Removed "${title}" from course curriculum.`, 'info');
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const modulesCopy = [...allModules];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;

    if (targetIdx < 0 || targetIdx >= modulesCopy.length) return;

    const temp = modulesCopy[index];
    modulesCopy[index] = modulesCopy[targetIdx];
    modulesCopy[targetIdx] = temp;

    onReorderModules(selectedCourseId, modulesCopy.map(m => m.id));
    onShowToast('Reordered', 'Module order updated successfully.', 'info');
  };

  // Filtered modules
  const filteredModules = allModules.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.description && m.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || (m.status || 'published') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-xs text-slate-200">
      
      {/* Top Banner & Header Controls */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Module Management System</span>
          </div>
          <h1 className="text-xl font-extrabold text-white">Course Modules & Learning Pathways</h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Organize course units, set estimated hours, publish statuses, and sequence lesson flows.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold flex items-center gap-2 shadow-lg transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Module</span>
        </button>
      </div>

      {/* Course Selection & Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Course Select */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-slate-400 font-bold whitespace-nowrap flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Select Course:</span>
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="flex-1 md:w-80 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-bold focus:border-amber-400 focus:outline-none"
          >
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.modules?.length || 0} Modules)
              </option>
            ))}
          </select>
        </div>

        {/* Search & Status Filter */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-colors ${
                statusFilter === 'all' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({allModules.length})
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-colors ${
                statusFilter === 'published' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Published ({allModules.filter(m => (m.status || 'published') === 'published').length})
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-colors ${
                statusFilter === 'draft' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Drafts ({allModules.filter(m => m.status === 'draft').length})
            </button>
          </div>
        </div>

      </div>

      {/* Module List Grid / Cards */}
      {filteredModules.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Layers className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Modules Found</h3>
          <p className="text-slate-400 text-xs max-w-sm mx-auto">
            {searchTerm ? 'No modules match your search filter.' : 'This course has no modules yet. Click "+ Add Module" to start building curriculum.'}
          </p>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Module</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredModules.map((mod, index) => {
            const isDraft = mod.status === 'draft';
            const lessonCount = mod.lessons?.length || 0;

            return (
              <div
                key={mod.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-md"
              >
                {/* Left Section: Number, Thumbnail, Info */}
                <div className="flex items-start gap-4 flex-1">
                  
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-1 items-center justify-center pt-1">
                    <button
                      disabled={index === 0}
                      onClick={() => handleMove(index, 'up')}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
                      title="Move Up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      #{mod.moduleNumber || mod.order || index + 1}
                    </span>
                    <button
                      disabled={index === allModules.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
                      title="Move Down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Module Thumbnail / Icon */}
                  <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0 relative group">
                    <img
                      src={mod.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'}
                      alt={mod.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-amber-400 opacity-80" />
                    </div>
                  </div>

                  {/* Module Details */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold border border-slate-700">
                        ID: {mod.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          isDraft
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {isDraft ? 'Draft' : 'Published'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white hover:text-amber-400 transition-colors">
                      {mod.title}
                    </h3>

                    {mod.description && (
                      <p className="text-slate-400 text-xs line-clamp-2">{mod.description}</p>
                    )}

                    <div className="flex items-center gap-4 text-slate-400 text-[11px] pt-1">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-amber-400" />
                        <strong className="text-slate-200">{lessonCount}</strong> Lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <strong className="text-slate-200">{mod.estimatedHours || 2}</strong> Learning Hours
                      </span>
                    </div>
                  </div>

                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 border-slate-800/80 pt-3 md:pt-0">
                  <button
                    onClick={() => onNavigate('add-lesson', selectedCourseId)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold border border-slate-700 flex items-center gap-1.5 transition-colors"
                    title="Manage Lessons inside this Module"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Manage Lessons</span>
                  </button>

                  <button
                    onClick={() => handleOpenEditModal(mod)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    title="Edit Module"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(mod.id, mod.title)}
                    className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/50 transition-colors"
                    title="Delete Module"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* CREATE / EDIT MODULE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-6 p-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-white">
                    {editingModule ? 'Edit Module' : '+ Add New Module'}
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Course: <span className="text-amber-400 font-bold">{currentCourse?.title}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-lg font-mono"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Module Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Module 01: Foundations of Generative AI"
                  value={modTitle}
                  onChange={(e) => setModTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Module Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief overview of key concepts covered in this module..."
                  value={modDesc}
                  onChange={(e) => setModDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Module Sequence No.</label>
                  <input
                    type="number"
                    min={1}
                    value={modNumber}
                    onChange={(e) => setModNumber(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Estimated Hours</label>
                  <input
                    type="number"
                    step={0.5}
                    min={0.5}
                    value={modHours}
                    onChange={(e) => setModHours(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Thumbnail Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={modThumbnail}
                  onChange={(e) => setModThumbnail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Module Status</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setModStatus('published')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      modStatus === 'published'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Published
                  </button>
                  <button
                    type="button"
                    onClick={() => setModStatus('draft')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      modStatus === 'draft'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Draft
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-750"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveModule(false)}
                className="px-4 py-2 rounded-xl bg-slate-700 text-white font-bold hover:bg-slate-600"
              >
                Save Module
              </button>
              <button
                type="button"
                onClick={() => handleSaveModule(true)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow-md"
              >
                Save & Publish
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
