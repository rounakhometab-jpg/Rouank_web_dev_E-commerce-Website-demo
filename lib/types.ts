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

export interface LessonAttachment {
  id: string;
  name: string;
  type: string; // PDF, PPT, DOC, ZIP, Image, External Link
  size?: string;
  url: string;
}

export interface LessonResource {
  name: string;
  type?: string;
  url: string;
  size?: string;
}

export interface LessonSettings {
  isFreePreview?: boolean;
  allowComments?: boolean;
  isRequired?: boolean;
  sequentialLearning?: boolean;
  downloadResources?: boolean;
  certificateRequirement?: boolean;
}

export interface Lesson {
  id: string;
  courseId?: string;
  moduleId: string;
  lessonNumber?: number;
  title: string;
  shortDescription?: string;
  durationMinutes: number;
  learningHours?: number;
  duration?: string;
  type: 'video' | 'reading' | 'interactive' | 'article' | 'pdf' | 'quiz' | 'assignment' | 'live_class';
  videoUrl?: string;
  videoFileName?: string;
  videoFileSize?: string;
  summary?: string;
  contentMarkdown?: string;
  content?: string;
  resources?: LessonResource[];
  attachments?: LessonAttachment[];
  images?: string[];
  quiz?: {
    id: string;
    title: string;
    passingScore: number;
    questions: QuizQuestion[];
  };
  settings?: LessonSettings;
  status?: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
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
  moduleNumber?: number;
  title: string;
  description: string;
  estimatedHours?: number;
  status?: 'draft' | 'published';
  lessons: Lesson[];
  quiz?: {
    id: string;
    title: string;
    questions: QuizQuestion[];
    passingScore: number;
  };
}

export interface CourseInstructor {
  name: string;
  bio?: string;
  photo?: string;
}

export interface CourseSEO {
  title?: string;
  description?: string;
  keywords?: string;
  slug?: string;
}

export interface Course {
  id: string;
  title: string;
  shortDescription?: string;
  tagline: string;
  badge: string;
  description: string;
  category?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Industry Ready' | 'All Levels';
  language?: string;
  thumbnail?: string;
  lessonCount: number;
  learningHours: number;
  duration?: string;
  price: number;
  originalPrice: number;
  discountPrice?: number;
  discountPercentage: number;
  rating: number;
  enrolledCount: number;
  accessType?: 'lifetime' | 'limited';
  accessDuration?: string;
  objectives?: string[];
  modules: Module[];
  features: string[];
  requirements: string[];
  targetAudience?: string[];
  instructor?: CourseInstructor;
  seo?: CourseSEO;
  status?: 'draft' | 'published' | 'archived';
  createdAt?: string;
  updatedAt?: string;
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
