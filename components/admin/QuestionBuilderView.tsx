'use client';

import React, { useState } from 'react';
import { Exam, ExamQuestion } from '../../lib/types';
import { getOptionList, getCorrectAnswerLetter } from '../../lib/examHelpers';
import {
  HelpCircle,
  Plus,
  ArrowLeft,
  Trash2,
  Edit,
  Copy,
  CheckCircle2,
  Award,
  Layers,
  Sparkles,
  X
} from 'lucide-react';

interface QuestionBuilderViewProps {
  exam: Exam;
  onNavigateBack: () => void;
  onAddQuestion: (examId: string, q: Omit<ExamQuestion, 'id'>) => void;
  onUpdateQuestion: (examId: string, questionId: string, q: Partial<ExamQuestion>) => void;
  onDeleteQuestion: (examId: string, questionId: string) => void;
  onDuplicateQuestion: (examId: string, questionId: string) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const QuestionBuilderView: React.FC<QuestionBuilderViewProps> = ({
  exam,
  onNavigateBack,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onDuplicateQuestion,
  onShowToast
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQ, setEditingQ] = useState<ExamQuestion | null>(null);

  // Form State
  const [questionText, setQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctAnswerLetter, setCorrectAnswerLetter] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [explanation, setExplanation] = useState('');
  const [marks, setMarks] = useState<number>(1);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [topic, setTopic] = useState('AI Fundamentals');

  const openAddModal = () => {
    setEditingQ(null);
    setQuestionText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setCorrectAnswerLetter('A');
    setExplanation('');
    setMarks(1);
    setDifficulty('Medium');
    setTopic('AI Fundamentals');
    setIsModalOpen(true);
  };

  const openEditModal = (q: ExamQuestion) => {
    setEditingQ(q);
    setQuestionText(q.question);
    const opts = getOptionList(q);
    setOptA(opts[0]?.text || '');
    setOptB(opts[1]?.text || '');
    setOptC(opts[2]?.text || '');
    setOptD(opts[3]?.text || '');
    setCorrectAnswerLetter(getCorrectAnswerLetter(q));
    setExplanation(q.explanation || '');
    setMarks(q.marks || 1);
    setDifficulty(q.difficulty || 'Medium');
    setTopic(q.topic || 'AI Fundamentals');
    setIsModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !optA.trim() || !optB.trim() || !optC.trim() || !optD.trim()) {
      onShowToast('Validation Error', 'Please complete question statement and all 4 options', 'error');
      return;
    }

    const questionPayload: Omit<ExamQuestion, 'id'> = {
      question: questionText.trim(),
      options: [optA.trim(), optB.trim(), optC.trim(), optD.trim()],
      correctAnswer: correctAnswerLetter,
      explanation: explanation.trim() || 'No explanation provided.',
      marks: Number(marks) || 1,
      difficulty,
      topic
    };

    if (editingQ) {
      onUpdateQuestion(exam.id, editingQ.id, questionPayload);
      onShowToast('Question Updated', 'MCQ updated in question bank', 'success');
    } else {
      onAddQuestion(exam.id, questionPayload);
      onShowToast('Question Added', 'New MCQ added to question bank', 'success');
    }

    setIsModalOpen(false);
  };

  const totalMarks = (exam.questions || []).reduce((sum, q) => sum + (q.marks || 1), 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateBack}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Exam Question Bank Builder</span>
            </div>
            <h1 className="text-xl font-bold text-white">{exam.title}</h1>
            <p className="text-slate-400 text-xs mt-0.5 font-mono">Exam ID: {exam.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4 px-4 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total MCQs</span>
              <span className="text-amber-400 font-bold text-base">{exam.questions?.length || 0}</span>
            </div>
            <div className="h-6 w-px bg-slate-800"></div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Marks</span>
              <span className="text-emerald-400 font-bold text-base">{totalMarks}</span>
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add MCQ Question</span>
          </button>
        </div>
      </div>

      {/* Questions Bank Directory */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
          <span className="font-bold text-white">Questions List ({exam.questions?.length || 0})</span>
          <span className="text-slate-400 font-mono text-[10px]">Passing Score: {exam.passingPercentage}%</span>
        </div>

        {(!exam.questions || exam.questions.length === 0) ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <HelpCircle className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="font-bold text-sm text-slate-300">No questions added to this examination yet.</p>
            <p className="text-xs text-slate-500">Add MCQs manually or use sample templates to build your question bank.</p>
            <button
              onClick={openAddModal}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              + Add First Question
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {exam.questions.map((q, idx) => {
              const optionsList = getOptionList(q);
              const correctLetter = getCorrectAnswerLetter(q);

              return (
                <div
                  key={q.id}
                  className="p-5 bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold text-[10px] uppercase">
                            Topic: {q.topic || 'General AI'}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                            {q.marks || 1} Mark{(q.marks || 1) > 1 ? 's' : ''}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            q.difficulty === 'Easy' ? 'bg-emerald-950 text-emerald-400' : q.difficulty === 'Hard' ? 'bg-rose-950 text-rose-400' : 'bg-blue-950 text-blue-400'
                          }`}>
                            {q.difficulty || 'Medium'}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                          {q.question}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => openEditModal(q)}
                        title="Edit Question"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onDuplicateQuestion(exam.id, q.id);
                          onShowToast('Question Duplicated', 'Copied question statement and options', 'info');
                        }}
                        title="Duplicate Question"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this question?')) {
                            onDeleteQuestion(exam.id, q.id);
                            onShowToast('Question Deleted', 'Removed from question bank', 'info');
                          }
                        }}
                        title="Delete Question"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                    {optionsList.map((opt) => {
                      const isCorrect = opt.letter === correctLetter;
                      return (
                        <div
                          key={opt.letter}
                          className={`p-3 rounded-xl border flex items-center justify-between font-medium ${
                            isCorrect
                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                              : 'bg-slate-900 border-slate-800/80 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`w-5 h-5 rounded-full font-mono text-[10px] font-bold flex items-center justify-center shrink-0 ${
                              isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {opt.letter}
                            </span>
                            <span>{opt.text}</span>
                          </div>
                          {isCorrect && (
                            <span className="text-[10px] font-extrabold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              ✓ Correct Choice
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Preview */}
                  {q.explanation && (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400">
                      <strong className="text-amber-400 block mb-0.5">Explanation / Why:</strong>
                      <span>{q.explanation}</span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Add / Edit Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {editingQ ? 'Edit Question' : 'Add MCQ Question'}
                  </h3>
                  <p className="text-xs text-slate-400">Specify question statement, options, and explanation.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              
              {/* Question Statement */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold block">
                  Question Statement <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Enter clear, concise question statement..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Options Inputs */}
              <div className="space-y-3 pt-2">
                <label className="text-slate-300 font-bold block">
                  Answer Options & Correct Key <span className="text-rose-400">*</span>
                </label>

                {[
                  { letter: 'A' as const, val: optA, setVal: setOptA },
                  { letter: 'B' as const, val: optB, setVal: setOptB },
                  { letter: 'C' as const, val: optC, setVal: setOptC },
                  { letter: 'D' as const, val: optD, setVal: setOptD }
                ].map(({ letter, val, setVal }) => {
                  const isSelectedKey = correctAnswerLetter === letter;

                  return (
                    <div
                      key={letter}
                      className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                        isSelectedKey ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <label className="flex items-center gap-2 cursor-pointer shrink-0">
                        <input
                          type="radio"
                          name="correctKeyRadio"
                          checked={isSelectedKey}
                          onChange={() => setCorrectAnswerLetter(letter)}
                          className="w-4 h-4 accent-emerald-500"
                        />
                        <span className={`w-6 h-6 rounded-full font-mono text-xs font-extrabold flex items-center justify-center ${
                          isSelectedKey ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {letter}
                        </span>
                      </label>

                      <input
                        type="text"
                        required
                        placeholder={`Option ${letter} statement...`}
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500"
                      />

                      {isSelectedKey && (
                        <span className="text-[10px] font-bold text-emerald-400 uppercase shrink-0">
                          ✓ Correct
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Topic, Difficulty & Marks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold block">Topic / Module</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="AI Fundamentals">AI Fundamentals</option>
                    <option value="Generative AI">Generative AI</option>
                    <option value="Prompt Engineering">Prompt Engineering</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="AI Automation">AI Automation & Agents</option>
                    <option value="General AI">General AI</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold block">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold block">Marks Weightage</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={marks}
                    onChange={(e) => setMarks(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono font-bold"
                  />
                </div>
              </div>

              {/* Explanation */}
              <div className="space-y-1 pt-2">
                <label className="text-slate-300 font-bold block">Answer Explanation (&quot;Why?&quot;)</label>
                <textarea
                  rows={2}
                  placeholder="Explain why this option is correct for student answer review..."
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow-lg"
                >
                  {editingQ ? 'Update Question' : 'Save Question'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
