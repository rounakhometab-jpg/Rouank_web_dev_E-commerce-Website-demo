'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, Course, Exam, ExamAttempt, Certificate, Order, AppNotification, StudentProgress, Module, Lesson } from './types';
import { DEMO_STUDENT, DEMO_ADMIN, INITIAL_COURSES, INITIAL_EXAM, INITIAL_CERTIFICATE, INITIAL_ORDERS, INITIAL_NOTIFICATIONS } from './initialData';

const STORAGE_KEYS = {
  USER: 'zenfotech_user',
  COURSES: 'zenfotech_courses',
  PROGRESS: 'zenfotech_progress',
  ORDERS: 'zenfotech_orders',
  NOTIFICATIONS: 'zenfotech_notifications',
  EXAM: 'zenfotech_exam',
  STUDENTS: 'zenfotech_students',
};

// Default initial completed lessons (68% of demo lessons = les_01, les_02, les_03, les_04, les_05, les_06, les_07, les_09, les_11)
const DEFAULT_PROGRESS: StudentProgress = {
  courseId: 'ai-industry-certification',
  completedLessonIds: ['les_01', 'les_02', 'les_03', 'les_04', 'les_05', 'les_06', 'les_07', 'les_09', 'les_11', 'les_13', 'les_15'],
  completedQuizIds: {
    'quiz_mod_01': 100
  },
  examAttempt: {
    id: 'att_2026_01',
    studentId: DEMO_STUDENT.id,
    studentName: DEMO_STUDENT.name,
    examId: INITIAL_EXAM.id,
    startedAt: '2026-08-11T03:30:00Z',
    completedAt: '2026-08-11T03:52:00Z',
    answers: {},
    score: 16,
    totalQuestions: 20,
    correctCount: 16,
    wrongCount: 4,
    skippedCount: 0,
    percentage: 82,
    passed: true,
    topicScores: {
      'AI Fundamentals': 90,
      'Generative AI & Multimodal': 80,
      'Prompt Engineering': 85,
      'Machine Learning & RAG': 75,
      'AI Automation & Agents': 80
    }
  },
  certificate: INITIAL_CERTIFICATE
};

export function useAppStore() {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return DEMO_STUDENT;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : DEMO_STUDENT;
    } catch {
      return DEMO_STUDENT;
    }
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    if (typeof window === 'undefined') return INITIAL_COURSES;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      return saved ? JSON.parse(saved) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [progress, setProgress] = useState<StudentProgress>(() => {
    if (typeof window === 'undefined') return DEFAULT_PROGRESS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === 'undefined') return INITIAL_ORDERS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    if (typeof window === 'undefined') return INITIAL_NOTIFICATIONS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [exam, setExam] = useState<Exam>(() => {
    if (typeof window === 'undefined') return INITIAL_EXAM;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXAM);
      return saved ? JSON.parse(saved) : INITIAL_EXAM;
    } catch {
      return INITIAL_EXAM;
    }
  });

  const [students, setStudents] = useState<User[]>(() => {
    if (typeof window === 'undefined') return [DEMO_STUDENT];
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return saved ? JSON.parse(saved) : [DEMO_STUDENT];
    } catch {
      return [DEMO_STUDENT];
    }
  });

  const [isInitialized] = useState(true);

  // Save changes to localStorage
  const saveUser = useCallback((newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, []);

  const saveProgress = useCallback((newProgress: StudentProgress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(newProgress));
  }, []);

  const saveOrders = useCallback((newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(newOrders));
  }, []);

  const saveNotifications = useCallback((newNotifs: AppNotification[]) => {
    setNotifications(newNotifs);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(newNotifs));
  }, []);

  const saveCourses = useCallback((newCourses: Course[]) => {
    setCourses(newCourses);
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(newCourses));
  }, []);

  const saveExam = useCallback((newExam: Exam) => {
    setExam(newExam);
    localStorage.setItem(STORAGE_KEYS.EXAM, JSON.stringify(newExam));
  }, []);

  const saveStudents = useCallback((newStudents: User[]) => {
    setStudents(newStudents);
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(newStudents));
  }, []);

  // Auth methods
  const login = (email: string, password: string): { success: boolean; message: string; role?: 'student' | 'admin' } => {
    const cleanEmail = email.trim().toLowerCase();
    
    if (cleanEmail === 'admin@zenfotech.com') {
      if (password === 'Admin@123' || password === 'admin') {
        saveUser(DEMO_ADMIN);
        return { success: true, message: 'Welcome back Admin!', role: 'admin' };
      }
      return { success: false, message: 'Invalid admin password. Use: Admin@123' };
    }

    if (cleanEmail === 'student@zenfotech.com') {
      if (password === 'Demo@123' || password === 'demo' || password === 'student') {
        saveUser(DEMO_STUDENT);
        return { success: true, message: 'Welcome back, Rahul!', role: 'student' };
      }
      return { success: false, message: 'Invalid student password. Use: Demo@123' };
    }

    // Dynamic registered student search
    const foundStudent = students.find(s => s.email.toLowerCase() === cleanEmail);
    if (foundStudent) {
      if (foundStudent.status === 'suspended') {
        return { success: false, message: 'Your student account has been suspended by Admin.' };
      }
      saveUser(foundStudent);
      return { success: true, message: `Welcome back, ${foundStudent.name}!`, role: 'student' };
    }

    return { success: false, message: 'Invalid credentials. Please use demo options on the login screen.' };
  };

  const register = (name: string, email: string, mobile: string): { success: boolean; message: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = students.find(s => s.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email: cleanEmail,
      mobile,
      role: 'student',
      enrolledAt: new Date().toISOString(),
      status: 'active'
    };

    const updatedStudents = [...students, newUser];
    saveStudents(updatedStudents);
    saveUser(newUser);

    return { success: true, message: 'Account registered successfully!' };
  };

  const logout = () => {
    saveUser(null);
  };

  // Lesson & Progress methods
  const markLessonComplete = (lessonId: string) => {
    const currentCompleted = progress.completedLessonIds || [];
    if (!currentCompleted.includes(lessonId)) {
      const updated = [...currentCompleted, lessonId];
      saveProgress({
        ...progress,
        completedLessonIds: updated
      });

      // Add notification
      const newNotif: AppNotification = {
        id: `notif_${Date.now()}`,
        title: 'Lesson Completed',
        message: 'Progress updated successfully.',
        createdAt: new Date().toISOString(),
        read: false,
        type: 'info'
      };
      saveNotifications([newNotif, ...notifications]);
    }
  };

  const submitQuiz = (quizId: string, scorePercentage: number) => {
    const updatedQuizzes = {
      ...(progress.completedQuizIds || {}),
      [quizId]: scorePercentage
    };
    saveProgress({
      ...progress,
      completedQuizIds: updatedQuizzes
    });
  };

  // Exam Submission & Automated Evaluation Engine
  const submitExam = (answers: Record<string, number>): ExamAttempt => {
    const questions = exam.questions;
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    const topicCorrect: Record<string, number> = {};
    const topicTotal: Record<string, number> = {};

    questions.forEach(q => {
      const topic = q.topic || 'General AI';
      topicTotal[topic] = (topicTotal[topic] || 0) + 1;

      const selectedOpt = answers[q.id];
      if (selectedOpt === undefined || selectedOpt === null) {
        skippedCount++;
      } else if (selectedOpt === q.correctAnswer) {
        correctCount++;
        topicCorrect[topic] = (topicCorrect[topic] || 0) + 1;
      } else {
        wrongCount++;
      }
    });

    const totalQuestions = questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= exam.passingPercentage;

    const topicScores: Record<string, number> = {};
    Object.keys(topicTotal).forEach(t => {
      const correct = topicCorrect[t] || 0;
      const total = topicTotal[t] || 1;
      topicScores[t] = Math.round((correct / total) * 100);
    });

    const attempt: ExamAttempt = {
      id: `att_${Date.now()}`,
      studentId: user?.id || DEMO_STUDENT.id,
      studentName: user?.name || DEMO_STUDENT.name,
      examId: exam.id,
      startedAt: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
      completedAt: new Date().toISOString(),
      answers,
      score: correctCount,
      totalQuestions,
      correctCount,
      wrongCount,
      skippedCount,
      percentage,
      passed,
      topicScores
    };

    // If passed, unlock/generate certificate
    let cert: Certificate | undefined = progress.certificate;

    if (passed) {
      cert = {
        id: `ZAA-2026-${String(Math.floor(Math.random() * 900000) + 100000)}`,
        studentId: user?.id || DEMO_STUDENT.id,
        studentName: user?.name || DEMO_STUDENT.name,
        courseTitle: 'AI Industry Certification Program',
        issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'valid',
        scorePercentage: percentage,
        verificationUrl: `https://zenfotech.com/verify`
      };
    } else {
      // Locked state if failed
      cert = cert ? { ...cert, status: 'locked' } : undefined;
    }

    saveProgress({
      ...progress,
      examAttempt: attempt,
      certificate: cert
    });

    // Notify
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title: passed ? 'Examination Passed!' : 'Examination Attempted',
      message: passed
        ? `Congratulations! You scored ${percentage}% and passed the final examination. Certificate generated.`
        : `You scored ${percentage}%. Passing criteria is ${exam.passingPercentage}%. You can retake the exam.`,
      createdAt: new Date().toISOString(),
      read: false,
      type: passed ? 'certificate' : 'warning'
    };
    saveNotifications([newNotif, ...notifications]);

    return attempt;
  };

  // Payment Demo Flow
  const processDemoPayment = (courseId: string, paymentMethod: 'UPI' | 'Card' | 'Net Banking'): Order => {
    const course = courses.find(c => c.id === courseId) || courses[0];
    const taxAmount = Math.round(course.price * 0.18);

    const newOrder: Order = {
      id: `ORD-ZAA-${Math.floor(Math.random() * 9000) + 1000}`,
      transactionId: `TXN-${Math.floor(Math.random() * 90000000) + 10000000}`,
      enrollmentId: `ZAA-ENR-2026-${Math.floor(Math.random() * 9000) + 1000}`,
      studentId: user?.id || DEMO_STUDENT.id,
      studentName: user?.name || DEMO_STUDENT.name,
      studentEmail: user?.email || DEMO_STUDENT.email,
      courseId: course.id,
      courseTitle: course.title,
      amount: course.price,
      originalAmount: course.originalPrice,
      taxAmount,
      paymentMethod,
      paymentStatus: 'paid',
      createdAt: new Date().toISOString()
    };

    saveOrders([newOrder, ...orders]);

    // Add Notification
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title: 'Demo Payment Successful',
      message: `Payment of ₹${course.price.toLocaleString('en-IN')} confirmed for ${course.title}. Order ID: ${newOrder.id}`,
      createdAt: new Date().toISOString(),
      read: false,
      type: 'success'
    };
    saveNotifications([newNotif, ...notifications]);

    return newOrder;
  };

  // Certificate Verification
  const verifyCertificate = (certId: string): Certificate | null => {
    const cleanId = certId.trim().toUpperCase();
    if (progress.certificate && progress.certificate.id.toUpperCase() === cleanId) {
      return progress.certificate;
    }
    if (cleanId === 'ZAA-2026-000001') {
      return INITIAL_CERTIFICATE;
    }
    return null;
  };

  // Notification methods
  const markNotificationRead = (notifId: string) => {
    const updated = notifications.map(n => n.id === notifId ? { ...n, read: true } : n);
    saveNotifications(updated);
  };

  const clearAllNotifications = () => {
    saveNotifications([]);
  };

  // Admin methods
  const addQuestion = (newQuestion: Omit<Exam['questions'][0], 'id'>) => {
    const question = {
      ...newQuestion,
      id: `eq_${Date.now()}`
    };
    const updatedExam = {
      ...exam,
      totalQuestions: exam.questions.length + 1,
      questions: [...exam.questions, question]
    };
    saveExam(updatedExam);
  };

  const deleteQuestion = (qId: string) => {
    const updatedQuestions = exam.questions.filter(q => q.id !== qId);
    saveExam({
      ...exam,
      totalQuestions: updatedQuestions.length,
      questions: updatedQuestions
    });
  };

  const broadcastNotification = (title: string, message: string) => {
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title,
      message,
      createdAt: new Date().toISOString(),
      read: false,
      type: 'info',
      targetRole: 'all'
    };
    saveNotifications([newNotif, ...notifications]);
  };

  const toggleStudentStatus = (studentId: string) => {
    const updated = students.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          status: (s.status === 'active' ? 'suspended' : 'active') as 'active' | 'suspended'
        };
      }
      return s;
    });
    saveStudents(updated);
  };

  const revokeCertificate = () => {
    if (progress.certificate) {
      saveProgress({
        ...progress,
        certificate: {
          ...progress.certificate,
          status: 'revoked'
        }
      });
    }
  };

  // Course, Module & Lesson Management CRUD
  const upsertCourse = (courseData: Course) => {
    const existingIndex = courses.findIndex(c => c.id === courseData.id);
    const updatedCourse: Course = {
      ...courseData,
      status: courseData.status || 'published',
      updatedAt: new Date().toISOString(),
      createdAt: courseData.createdAt || new Date().toISOString(),
      modules: courseData.modules || []
    };

    let updatedList: Course[];
    if (existingIndex >= 0) {
      updatedList = [...courses];
      updatedList[existingIndex] = updatedCourse;
    } else {
      updatedList = [updatedCourse, ...courses];
    }

    saveCourses(updatedList);
    return updatedCourse;
  };

  const deleteCourse = (courseId: string) => {
    const updated = courses.filter(c => c.id !== courseId);
    saveCourses(updated);
  };

  const duplicateCourse = (courseId: string): Course | null => {
    const original = courses.find(c => c.id === courseId);
    if (!original) return null;

    const newCourseId = `course_${Date.now()}`;
    const duplicated: Course = {
      ...JSON.parse(JSON.stringify(original)),
      id: newCourseId,
      title: `${original.title} Copy`,
      badge: 'Duplicated Program',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seo: {
        ...(original.seo || {}),
        slug: `${original.seo?.slug || 'course'}-copy-${Date.now().toString().slice(-4)}`
      }
    };

    // re-id modules and lessons
    duplicated.modules = (duplicated.modules || []).map((m, mIdx) => ({
      ...m,
      id: `mod_${Date.now()}_${mIdx}`,
      courseId: newCourseId,
      lessons: (m.lessons || []).map((l, lIdx) => ({
        ...l,
        id: `les_${Date.now()}_${mIdx}_${lIdx}`,
        courseId: newCourseId,
        moduleId: `mod_${Date.now()}_${mIdx}`
      }))
    }));

    saveCourses([duplicated, ...courses]);
    return duplicated;
  };

  const toggleCourseStatus = (courseId: string) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const nextStatus = c.status === 'published' ? 'draft' : 'published';
        return { ...c, status: nextStatus as 'draft' | 'published', updatedAt: new Date().toISOString() };
      }
      return c;
    });
    saveCourses(updated);
  };

  const addOrUpdateModule = (courseId: string, moduleData: Partial<Module> & { title: string }) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const modules = [...(c.modules || [])];
        if (moduleData.id) {
          const modIndex = modules.findIndex(m => m.id === moduleData.id);
          if (modIndex >= 0) {
            modules[modIndex] = {
              ...modules[modIndex],
              ...moduleData,
              title: moduleData.title
            };
          }
        } else {
          const newMod: Module = {
            id: `mod_${Date.now()}`,
            courseId,
            order: modules.length + 1,
            moduleNumber: modules.length + 1,
            title: moduleData.title,
            description: moduleData.description || '',
            estimatedHours: moduleData.estimatedHours || 2,
            status: moduleData.status || 'published',
            lessons: []
          };
          modules.push(newMod);
        }
        return { ...c, modules, updatedAt: new Date().toISOString() };
      }
      return c;
    });
    saveCourses(updated);
  };

  const deleteModule = (courseId: string, moduleId: string) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const modules = (c.modules || []).filter(m => m.id !== moduleId);
        return { ...c, modules, updatedAt: new Date().toISOString() };
      }
      return c;
    });
    saveCourses(updated);
  };

  const reorderModules = (courseId: string, moduleIds: string[]) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const currentMods = c.modules || [];
        const reordered: Module[] = [];
        moduleIds.forEach((id, index) => {
          const found = currentMods.find(m => m.id === id);
          if (found) {
            reordered.push({ ...found, order: index + 1, moduleNumber: index + 1 });
          }
        });
        return { ...c, modules: reordered, updatedAt: new Date().toISOString() };
      }
      return c;
    });
    saveCourses(updated);
  };

  const addOrUpdateLesson = (courseId: string, moduleId: string, lessonData: Partial<Lesson> & { title: string }) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const modules = (c.modules || []).map(m => {
          if (m.id === moduleId) {
            const lessons = [...(m.lessons || [])];
            if (lessonData.id) {
              const lesIdx = lessons.findIndex(l => l.id === lessonData.id);
              if (lesIdx >= 0) {
                lessons[lesIdx] = {
                  ...lessons[lesIdx],
                  ...lessonData,
                  title: lessonData.title,
                  updatedAt: new Date().toISOString()
                };
              }
            } else {
              const newLesson: Lesson = {
                id: `les_${Date.now()}`,
                courseId,
                moduleId,
                lessonNumber: lessons.length + 1,
                title: lessonData.title,
                shortDescription: lessonData.shortDescription || '',
                summary: lessonData.shortDescription || lessonData.summary || '',
                contentMarkdown: lessonData.contentMarkdown || lessonData.content || '',
                content: lessonData.content || lessonData.contentMarkdown || '',
                durationMinutes: lessonData.durationMinutes || 15,
                learningHours: lessonData.learningHours || 0.25,
                type: lessonData.type || 'video',
                videoUrl: lessonData.videoUrl,
                videoFileName: lessonData.videoFileName,
                videoFileSize: lessonData.videoFileSize,
                resources: lessonData.resources || [],
                attachments: lessonData.attachments || [],
                images: lessonData.images || [],
                quiz: lessonData.quiz,
                settings: lessonData.settings || {
                  isFreePreview: false,
                  allowComments: true,
                  isRequired: true,
                  sequentialLearning: true,
                  downloadResources: true,
                  certificateRequirement: true
                },
                status: lessonData.status || 'published',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              };
              lessons.push(newLesson);
            }
            return { ...m, lessons };
          }
          return m;
        });

        // Recalculate lesson count and learning hours
        const allLessons = modules.flatMap(m => m.lessons || []);
        const totalMin = allLessons.reduce((acc, l) => acc + (l.durationMinutes || 15), 0);
        const totalHours = Math.ceil(totalMin / 60) || 1;

        return {
          ...c,
          modules,
          lessonCount: allLessons.length,
          learningHours: totalHours,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    });
    saveCourses(updated);
  };

  const deleteLesson = (courseId: string, moduleId: string, lessonId: string) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const modules = (c.modules || []).map(m => {
          if (m.id === moduleId) {
            const lessons = (m.lessons || []).filter(l => l.id !== lessonId);
            return { ...m, lessons };
          }
          return m;
        });

        const allLessons = modules.flatMap(m => m.lessons || []);
        const totalMin = allLessons.reduce((acc, l) => acc + (l.durationMinutes || 15), 0);

        return {
          ...c,
          modules,
          lessonCount: allLessons.length,
          learningHours: Math.ceil(totalMin / 60) || 1,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    });
    saveCourses(updated);
  };

  const duplicateLesson = (courseId: string, moduleId: string, lessonId: string) => {
    let sourceLesson: Lesson | null = null;
    courses.forEach(c => {
      if (c.id === courseId) {
        c.modules.forEach(m => {
          if (m.id === moduleId) {
            const found = m.lessons.find(l => l.id === lessonId);
            if (found) sourceLesson = found;
          }
        });
      }
    });

    if (!sourceLesson) return;

    const dup: Lesson = {
      ...JSON.parse(JSON.stringify(sourceLesson)),
      id: `les_${Date.now()}`,
      title: `${(sourceLesson as Lesson).title} Copy`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addOrUpdateLesson(courseId, moduleId, dup);
  };

  const toggleLessonStatus = (courseId: string, moduleId: string, lessonId: string) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const modules = (c.modules || []).map(m => {
          if (m.id === moduleId) {
            const lessons = (m.lessons || []).map(l => {
              if (l.id === lessonId) {
                const nextStatus = l.status === 'published' ? 'draft' : 'published';
                return { ...l, status: nextStatus as 'draft' | 'published', updatedAt: new Date().toISOString() };
              }
              return l;
            });
            return { ...m, lessons };
          }
          return m;
        });
        return { ...c, modules, updatedAt: new Date().toISOString() };
      }
      return c;
    });
    saveCourses(updated);
  };

  const importCoursesAndLessons = (importedData: Course[]) => {
    if (!Array.isArray(importedData)) return false;
    saveCourses(importedData);
    return true;
  };

  const exportCoursesAndLessons = () => {
    return JSON.stringify(courses, null, 2);
  };

  // Reset Demo
  const resetDemo = () => {
    localStorage.clear();
    setUser(DEMO_STUDENT);
    setCourses(INITIAL_COURSES);
    setProgress(DEFAULT_PROGRESS);
    setOrders(INITIAL_ORDERS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setExam(INITIAL_EXAM);
    setStudents([DEMO_STUDENT]);
  };

  return {
    isInitialized,
    user,
    courses,
    progress,
    orders,
    notifications,
    exam,
    students,
    login,
    register,
    logout,
    markLessonComplete,
    submitQuiz,
    submitExam,
    processDemoPayment,
    verifyCertificate,
    markNotificationRead,
    clearAllNotifications,
    addQuestion,
    deleteQuestion,
    broadcastNotification,
    toggleStudentStatus,
    revokeCertificate,
    resetDemo,
    upsertCourse,
    deleteCourse,
    duplicateCourse,
    toggleCourseStatus,
    addOrUpdateModule,
    deleteModule,
    reorderModules,
    addOrUpdateLesson,
    deleteLesson,
    duplicateLesson,
    toggleLessonStatus,
    importCoursesAndLessons,
    exportCoursesAndLessons
  };
}
