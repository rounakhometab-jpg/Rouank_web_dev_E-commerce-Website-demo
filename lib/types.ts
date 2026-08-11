export type UserRole = 'student' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  mobile?: string;
  avatar?: string;
  enrolledAt?: string;
  status: 'active' | 'suspended';
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  durationMinutes: number;
  learningHours: number;
  type: 'video' | 'reading' | 'interactive';
  videoUrl?: string;
  summary: string;
  contentMarkdown: string;
  resources?: { name: string; url: string }[];
  isCompleted?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Module {
  id: string;
  courseId: string;
  order: number;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz?: {
    id: string;
    title: string;
    questions: QuizQuestion[];
    passingScore: number;
  };
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Industry Ready';
  lessonCount: number;
  learningHours: number;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  enrolledCount: number;
  modules: Module[];
  features: string[];
  requirements: string[];
  targetAudience: string[];
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

export interface Exam {
  id: string;
  title: string;
  courseId: string;
  durationMinutes: number;
  totalQuestions: number;
  passingPercentage: number;
  questions: ExamQuestion[];
}

export interface ExamAttempt {
  id: string;
  studentId: string;
  studentName: string;
  examId: string;
  startedAt: string;
  completedAt: string;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  percentage: number;
  passed: boolean;
  topicScores: Record<string, number>; // topic -> percentage
}

export interface Certificate {
  id: string; // e.g. ZAA-2026-000001
  studentId: string;
  studentName: string;
  courseTitle: string;
  issueDate: string;
  status: 'valid' | 'revoked' | 'locked';
  scorePercentage: number;
  verificationUrl: string;
}

export interface Order {
  id: string;
  transactionId: string;
  enrollmentId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  originalAmount: number;
  taxAmount: number;
  paymentMethod: 'UPI' | 'Card' | 'Net Banking';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'exam' | 'certificate';
  targetRole?: 'all' | 'student' | 'admin';
}

export interface StudentProgress {
  courseId: string;
  completedLessonIds: string[];
  completedQuizIds: Record<string, number>; // quizId -> score percentage
  examAttempt?: ExamAttempt;
  certificate?: Certificate;
}
