'use client';

import React, { useState } from 'react';
import { useAppStore } from '../lib/store';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { Toast, ToastMessage } from '../components/Toast';

// Views
import { HomeView } from '../views/HomeView';
import { CoursesView } from '../views/CoursesView';
import { CourseDetailsView } from '../views/CourseDetailsView';
import { CheckoutView } from '../views/CheckoutView';
import { AuthView } from '../views/AuthView';
import { StudentDashboardView } from '../views/StudentDashboardView';
import { CoursePlayerView } from '../views/CoursePlayerView';
import { ExamInstructionsView } from '../views/ExamInstructionsView';
import { LiveExamView } from '../views/LiveExamView';
import { ExamResultView } from '../views/ExamResultView';
import { CertificateVerifyView } from '../views/CertificateVerifyView';
import { AdminDashboardView } from '../views/AdminDashboardView';
import { AboutView } from '../views/AboutView';
import { ContactView } from '../views/ContactView';
import { FAQView } from '../views/FAQView';
import { HowItWorksView } from '../views/HowItWorksView';
import { ExamAttempt } from '../lib/types';

export default function Page() {
  const {
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
    submitExam,
    processDemoPayment,
    verifyCertificate,
    markNotificationRead,
    addQuestion,
    deleteQuestion,
    broadcastNotification,
    toggleStudentStatus,
    revokeCertificate,
    resetDemo
  } = useAppStore();

  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('ai-industry-certification');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [currentExamAttempt, setCurrentExamAttempt] = useState<ExamAttempt | null>(null);
  const [verifyCertIdParam, setVerifyCertIdParam] = useState<string>('ZAA-2026-000001');

  // Helper for showing Toast
  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({
      id: `toast_${Date.now()}`,
      title,
      message,
      type
    });
  };

  const handleCloseToast = () => setToast(null);

  // Central Router Handler
  const handleNavigate = (view: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (param && (view === 'course-details' || view === 'checkout' || view === 'course-player')) {
      setSelectedCourseId(param);
    }

    if (view === 'verify' && param) {
      setVerifyCertIdParam(param);
    }

    if (view === 'login') {
      setAuthMode('login');
      setCurrentView('auth');
      return;
    }

    if (view === 'register') {
      setAuthMode('register');
      setCurrentView('auth');
      return;
    }

    if (view === 'certification') {
      setSelectedCourseId('ai-industry-certification');
      setCurrentView('course-details');
      return;
    }

    if (view === 'student-certificate') {
      if (!user) {
        showToast('Authentication Required', 'Please sign in to access your student certificates.', 'info');
        setAuthMode('login');
        setCurrentView('auth');
        return;
      }
      setCurrentView('student-dashboard');
      return;
    }

    if (view === 'student-exam') {
      setCurrentView('student-exam-instructions');
      return;
    }

    if (view === 'student-profile') {
      if (!user) {
        setAuthMode('login');
        setCurrentView('auth');
        return;
      }
      setCurrentView('student-dashboard');
      return;
    }

    // Protected Routes Check
    if ((view === 'student-dashboard' || view === 'course-player' || view === 'student-exam-instructions' || view === 'student-live-exam') && !user) {
      showToast('Authentication Required', 'Please sign in to access student LMS features.', 'info');
      setAuthMode('login');
      setCurrentView('auth');
      return;
    }

    if (view === 'admin-dashboard' && (!user || user.role !== 'admin')) {
      showToast('Admin Permission Required', 'Use admin credentials (admin@zenfotech.com) to access Admin Control Panel.', 'error');
      setAuthMode('login');
      setCurrentView('auth');
      return;
    }

    setCurrentView(view);
  };

  // Auth Handlers
  const handleLoginSubmit = (email: string, password: string) => {
    const res = login(email, password);
    if (res.success) {
      showToast('Welcome!', res.message, 'success');
      if (res.role === 'admin') {
        setCurrentView('admin-dashboard');
      } else {
        setCurrentView('student-dashboard');
      }
    } else {
      showToast('Login Failed', res.message, 'error');
    }
    return res;
  };

  const handleRegisterSubmit = (name: string, email: string, mobile: string) => {
    const res = register(name, email, mobile);
    if (res.success) {
      showToast('Registration Successful', 'Your account has been created. Welcome to Zenfotech AI Academy!', 'success');
      setCurrentView('student-dashboard');
    } else {
      showToast('Registration Failed', res.message, 'error');
    }
    return res;
  };

  const handleLogout = () => {
    logout();
    showToast('Signed Out', 'You have been logged out successfully.', 'info');
    setCurrentView('home');
  };

  // Active course
  const activeCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 p-4">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-semibold tracking-wide text-slate-300">Loading Zenfotech AI Academy...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 box-border">
      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
        unreadCount={unreadNotifsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden pb-20 md:pb-12 z-[1] box-border">
        {currentView === 'home' && (
          <HomeView courses={courses} onNavigate={handleNavigate} />
        )}

        {currentView === 'courses' && (
          <CoursesView courses={courses} onNavigate={handleNavigate} />
        )}

        {currentView === 'course-details' && (
          <CourseDetailsView course={activeCourse} onNavigate={handleNavigate} />
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            course={activeCourse}
            onProcessPayment={(courseId, method) => {
              const order = processDemoPayment(courseId, method);
              showToast('Payment Completed', `Order #${order.id} generated successfully!`, 'success');
              return order;
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'auth' && (
          <AuthView
            initialMode={authMode}
            onLogin={handleLoginSubmit}
            onRegister={handleRegisterSubmit}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'student-dashboard' && user && (
          <StudentDashboardView
            user={user}
            course={activeCourse}
            progress={progress}
            orders={orders}
            notifications={notifications}
            onNavigate={handleNavigate}
            onMarkNotifRead={markNotificationRead}
          />
        )}

        {currentView === 'course-player' && (
          <CoursePlayerView
            course={activeCourse}
            completedLessonIds={progress.completedLessonIds}
            onMarkComplete={(lessonId) => {
              markLessonComplete(lessonId);
              showToast('Lesson Completed!', 'Your progress has been recorded.', 'success');
            }}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentView === 'student-exam-instructions' && (
          <ExamInstructionsView
            exam={exam}
            onStartExam={() => handleNavigate('student-live-exam')}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'student-live-exam' && (
          <LiveExamView
            exam={exam}
            onSubmitExam={submitExam}
            onFinishExam={(attempt) => {
              setCurrentExamAttempt(attempt);
              handleNavigate('student-exam-result');
            }}
          />
        )}

        {currentView === 'student-exam-result' && (
          <ExamResultView
            attempt={currentExamAttempt || progress.examAttempt || null}
            certificate={progress.certificate || null}
            onNavigate={handleNavigate}
            onRetakeExam={() => handleNavigate('student-live-exam')}
          />
        )}

        {currentView === 'verify' && (
          <CertificateVerifyView
            onVerify={verifyCertificate}
            initialCertId={verifyCertIdParam}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'admin-dashboard' && user && user.role === 'admin' && (
          <AdminDashboardView
            user={user}
            students={students}
            courses={courses}
            exam={exam}
            orders={orders}
            notifications={notifications}
            onAddQuestion={addQuestion}
            onDeleteQuestion={deleteQuestion}
            onBroadcastNotif={(title, msg) => {
              broadcastNotification(title, msg);
              showToast('Broadcast Sent', 'Notification sent to all platform users.', 'success');
            }}
            onToggleStudentStatus={(sId) => {
              toggleStudentStatus(sId);
              showToast('Status Updated', 'Student account status updated.', 'info');
            }}
            onRevokeCert={() => {
              revokeCertificate();
              showToast('Certificate Revoked', 'Demo student certificate status set to Revoked.', 'error');
            }}
            onResetDemo={() => {
              resetDemo();
              showToast('Demo Reset', 'Platform state has been reset to default initial state.', 'info');
            }}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentView === 'about' && <AboutView />}

        {currentView === 'contact' && <ContactView />}

        {currentView === 'faq' && <FAQView />}

        {currentView === 'how-it-works' && (
          <HowItWorksView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Mobile Bottom Bar navigation */}
      <MobileBottomNav
        currentView={currentView}
        onNavigate={handleNavigate}
        userRole={user?.role}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={handleCloseToast} />
    </div>
  );
}
