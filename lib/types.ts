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
  id?: string;
  name: string;
  description?: string;
  type?: 'PDF' | 'PPT' | 'PPTX' | 'DOC' | 'DOCX' | 'ZIP' | 'Image' | 'Audio' | 'Video' | 'External Link' | string;
  url: string;
  size?: string;
  downloadable?: boolean;
  status?: 'published' | 'hidden';
  courseId?: string;
  moduleId?: string;
  lessonId?: string;
  createdAt?: string;
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
  id: string; // e.g. MODULE-000001 or mod_xxx
  courseId: string;
  order: number;
  moduleNumber?: number;
  title: string;
  description: string;
  thumbnail?: string;
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
  relatedProductIds?: string[];
  status?: 'draft' | 'published' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[] | { A: string; B: string; C: string; D: string };
  correctAnswer: number | string; // index 0..3 or "A" | "B" | "C" | "D"
  explanation: string;
  marks?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  topic: string;
}

export interface Exam {
  id: string; // e.g. EXAM-000001
  title: string;
  courseId: string;
  moduleId?: string;
  description?: string;
  durationMinutes: number;
  totalQuestions: number;
  passingPercentage: number;
  maxAttempts?: number; // 0 or undefined = unlimited
  examType?: 'Module Quiz' | 'Final Examination';
  status: 'draft' | 'published';
  questions: ExamQuestion[];
  randomizeQuestions?: boolean;
  randomizeOptions?: boolean;
  negativeMarking?: boolean;
  negativeMarksPerWrong?: number; // e.g. 0.25
  createdAt?: string;
  updatedAt?: string;
}

export interface AnswerDetail {
  questionId: string;
  questionText: string;
  selectedAnswer: string; // "A" | "B" | "C" | "D" | "Not Answered"
  selectedAnswerText: string;
  correctAnswer: string; // "A" | "B" | "C" | "D"
  correctAnswerText: string;
  isCorrect: boolean;
  isSkipped: boolean;
  marksObtained: number;
  maxMarks: number;
  explanation: string;
  topic?: string;
}

export interface ExamAttempt {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail?: string;
  examId: string;
  examTitle?: string;
  courseTitle?: string;
  startedAt: string;
  submittedAt?: string;
  completedAt: string;
  answers: Record<string, string | number>; // questionId -> selected choice
  detailedAnswers?: AnswerDetail[];
  score: number; // obtained marks
  totalMarks?: number;
  totalQuestions: number;
  attempted?: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  percentage: number;
  passingScore?: number;
  passed: boolean;
  status?: 'PASSED' | 'FAILED' | 'IN_PROGRESS';
  topicScores: Record<string, number>; // topic -> percentage
  attemptNumber?: number;
}

export interface Certificate {
  id: string; // e.g. ZAA-2026-000001
  studentId: string;
  studentName: string;
  studentEmail?: string;
  courseId?: string;
  courseTitle: string;
  issueDate: string;
  status: 'valid' | 'revoked' | 'locked';
  scorePercentage: number;
  verificationUrl: string;
  verificationCode?: string;
  createdAt?: string;
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

export interface BookDetails {
  author?: string;
  publisher?: string;
  isbn?: string;
  edition?: string;
  language?: string;
  pages?: number;
  publicationDate?: string;
  format?: 'Paperback' | 'Hardcover' | 'eBook' | 'PDF';
  summary?: string;
}

export interface AccessoryDetails {
  brand?: string;
  material?: string;
  color?: string;
  size?: string;
  weight?: string;
  dimensions?: string;
  warranty?: string;
}

export interface DigitalFileDetails {
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  fileType?: 'PDF' | 'ZIP' | 'EPUB';
}

export interface ShippingDetails {
  shippingRequired: boolean;
  weightKg?: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  shippingClass?: string;
  freeShipping: boolean;
}

export interface ProductSEO {
  title?: string;
  description?: string;
  keywords?: string;
  slug?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  userEmail?: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
  status: 'approved' | 'hidden' | 'pending';
}

export interface ShopProduct {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categoryId: string; // 'books' | 'study-material' | 'accessories' | 'course-kits' | 'stationery' | 'merchandise' | 'digital-products' | 'other'
  categoryName?: string;
  relatedCourseIds: string[]; // ['all'] or array of course IDs e.g. ['ai-industry-certification']
  type: 'Physical' | 'Digital' | 'Both';
  images: string[];
  price: number; // sale price
  mrp: number; // regular / MRP price
  salePrice?: number;
  discountPercentage?: number;
  sku: string;
  stock: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Preorder';
  lowStockAlert?: number;
  bookDetails?: BookDetails;
  accessoryDetails?: AccessoryDetails;
  digitalFile?: DigitalFileDetails;
  shipping?: ShippingDetails;
  seo?: ProductSEO;
  rating: number;
  reviewCount: number;
  status: 'published' | 'draft' | 'archived';
  isBestseller?: boolean;
  isNewArrival?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShopCartItem {
  product: ShopProduct;
  quantity: number;
  selectedCourseId?: string;
}

export interface ShopOrderAddress {
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface ShopOrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  mrp: number;
  quantity: number;
  type: 'Physical' | 'Digital' | 'Both';
  relatedCourseId?: string;
  relatedCourseTitle?: string;
  digitalFileUrl?: string;
}

export interface ShopOrder {
  id: string; // ZEN-ORD-000001
  orderNumber: string;
  studentId?: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  shippingAddress?: ShopOrderAddress;
  items: ShopOrderItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Card' | 'Net Banking' | 'Cashfree' | 'Razorpay' | 'DEMO PAYMENT';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  orderStatus: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'Refunded';
  trackingNumber?: string;
  shippingPartner?: string;
  trackingUrl?: string;
  isDemo?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShopCoupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  startDate?: string;
  expiryDate?: string;
  usageLimit?: number;
  usedCount: number;
  applicableCourses?: string[];
  applicableProducts?: string[];
  status: 'active' | 'inactive' | 'expired';
}

export interface ShopCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount?: number;
}

export interface ProductBundle {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseTitle: string;
  productIds: string[];
  mrpTotal: number;
  bundlePrice: number;
  savings: number;
  image?: string;
  status: 'active' | 'inactive';
}

export interface StudentProgress {
  courseId: string;
  completedLessonIds: string[];
  completedQuizIds: Record<string, number>; // quizId -> score percentage
  examAttempt?: ExamAttempt;
  certificate?: Certificate;
}
