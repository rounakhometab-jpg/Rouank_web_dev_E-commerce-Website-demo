import { ExamQuestion, Exam, ExamAttempt, AnswerDetail } from './types';

export function getOptionList(q: ExamQuestion): { letter: 'A' | 'B' | 'C' | 'D'; text: string; index: number }[] {
  if (Array.isArray(q.options)) {
    return q.options.map((text, idx) => {
      const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
      return {
        letter: letters[idx] || 'A',
        text: text || '',
        index: idx
      };
    });
  } else if (q.options && typeof q.options === 'object') {
    const opts = q.options as { A: string; B: string; C: string; D: string };
    return [
      { letter: 'A', text: opts.A || '', index: 0 },
      { letter: 'B', text: opts.B || '', index: 1 },
      { letter: 'C', text: opts.C || '', index: 2 },
      { letter: 'D', text: opts.D || '', index: 3 }
    ];
  }
  return [
    { letter: 'A', text: '', index: 0 },
    { letter: 'B', text: '', index: 1 },
    { letter: 'C', text: '', index: 2 },
    { letter: 'D', text: '', index: 3 }
  ];
}

export function getCorrectAnswerLetter(q: ExamQuestion): 'A' | 'B' | 'C' | 'D' {
  if (typeof q.correctAnswer === 'number') {
    const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
    return letters[q.correctAnswer] || 'A';
  }
  if (typeof q.correctAnswer === 'string') {
    const upper = q.correctAnswer.trim().toUpperCase();
    if (['A', 'B', 'C', 'D'].includes(upper)) {
      return upper as 'A' | 'B' | 'C' | 'D';
    }
  }
  return 'A';
}

export function getOptionText(q: ExamQuestion, choice: string | number | undefined): string {
  if (choice === undefined || choice === null) return 'Not Answered';
  
  const options = getOptionList(q);
  if (typeof choice === 'number') {
    return options[choice]?.text || `Option ${String.fromCharCode(65 + choice)}`;
  }
  if (typeof choice === 'string') {
    const clean = choice.trim().toUpperCase();
    if (['A', 'B', 'C', 'D'].includes(clean)) {
      const found = options.find(o => o.letter === clean);
      return found?.text || `Option ${clean}`;
    }
    // Might be number as string like "0"
    const num = parseInt(clean, 10);
    if (!isNaN(num) && options[num]) {
      return options[num].text;
    }
  }
  return 'Not Answered';
}

export function normalizeChoiceToLetter(choice: string | number | undefined): string {
  if (choice === undefined || choice === null || choice === '') return 'Not Answered';
  if (typeof choice === 'number') {
    const letters = ['A', 'B', 'C', 'D'];
    return letters[choice] || 'Not Answered';
  }
  const clean = choice.toString().trim().toUpperCase();
  if (['A', 'B', 'C', 'D'].includes(clean)) return clean;
  const num = parseInt(clean, 10);
  if (!isNaN(num) && num >= 0 && num <= 3) {
    return ['A', 'B', 'C', 'D'][num];
  }
  return 'Not Answered';
}

export function evaluateExamSubmission(params: {
  exam: Exam;
  answers: Record<string, string | number>;
  studentId: string;
  studentName: string;
  studentEmail?: string;
  courseTitle?: string;
  startedAt?: string;
  attemptNumber?: number;
}): ExamAttempt {
  const { exam, answers, studentId, studentName, studentEmail, courseTitle, startedAt, attemptNumber = 1 } = params;

  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  let totalMaxMarks = 0;
  let obtainedMarks = 0;

  const detailedAnswers: AnswerDetail[] = [];
  const topicCorrect: Record<string, number> = {};
  const topicTotal: Record<string, number> = {};

  const questions = exam.questions || [];

  questions.forEach(q => {
    const questionMarks = q.marks && q.marks > 0 ? q.marks : 1;
    totalMaxMarks += questionMarks;

    const topic = q.topic || 'General AI';
    topicTotal[topic] = (topicTotal[topic] || 0) + 1;

    const studentRaw = answers[q.id];
    const studentLetter = normalizeChoiceToLetter(studentRaw);
    const correctLetter = getCorrectAnswerLetter(q);

    const isSkipped = studentLetter === 'Not Answered';
    const isCorrect = !isSkipped && studentLetter === correctLetter;

    let marksForThisQuestion = 0;

    if (isSkipped) {
      skippedCount++;
    } else if (isCorrect) {
      correctCount++;
      marksForThisQuestion = questionMarks;
      obtainedMarks += questionMarks;
      topicCorrect[topic] = (topicCorrect[topic] || 0) + 1;
    } else {
      wrongCount++;
      if (exam.negativeMarking && exam.negativeMarksPerWrong) {
        const deduction = exam.negativeMarksPerWrong;
        obtainedMarks -= deduction;
        marksForThisQuestion = -deduction;
      }
    }

    detailedAnswers.push({
      questionId: q.id,
      questionText: q.question,
      selectedAnswer: studentLetter,
      selectedAnswerText: getOptionText(q, studentRaw),
      correctAnswer: correctLetter,
      correctAnswerText: getOptionText(q, correctLetter),
      isCorrect,
      isSkipped,
      marksObtained: marksForThisQuestion,
      maxMarks: questionMarks,
      explanation: q.explanation || 'Explanation not provided for this question.',
      topic: q.topic
    });
  });

  // Ensure obtainedMarks is not negative
  obtainedMarks = Math.max(0, Math.round(obtainedMarks * 100) / 100);
  if (totalMaxMarks === 0) totalMaxMarks = questions.length || 1;

  const percentage = Math.min(100, Math.max(0, Math.round((obtainedMarks / totalMaxMarks) * 100)));
  const passingScore = exam.passingPercentage || 60;
  const passed = percentage >= passingScore;

  const topicScores: Record<string, number> = {};
  Object.keys(topicTotal).forEach(t => {
    const correct = topicCorrect[t] || 0;
    const total = topicTotal[t] || 1;
    topicScores[t] = Math.round((correct / total) * 100);
  });

  const nowStr = new Date().toISOString();

  return {
    id: `att_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    studentId,
    studentName,
    studentEmail: studentEmail || 'student@zenfotech.com',
    examId: exam.id,
    examTitle: exam.title,
    courseTitle: courseTitle || 'AI Industry Certification Program',
    startedAt: startedAt || new Date(Date.now() - (exam.durationMinutes || 30) * 60 * 1000).toISOString(),
    submittedAt: nowStr,
    completedAt: nowStr,
    answers,
    detailedAnswers,
    score: obtainedMarks,
    totalMarks: totalMaxMarks,
    totalQuestions: questions.length,
    attempted: correctCount + wrongCount,
    correctCount,
    wrongCount,
    skippedCount,
    percentage,
    passingScore,
    passed,
    status: passed ? 'PASSED' : 'FAILED',
    topicScores,
    attemptNumber
  };
}
