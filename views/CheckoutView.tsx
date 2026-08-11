'use client';

import React, { useState } from 'react';
import { Course, Order } from '../lib/types';
import { ShieldCheck, Lock, CreditCard, Smartphone, Building, CheckCircle2, ArrowRight } from 'lucide-react';

interface CheckoutViewProps {
  course: Course;
  onProcessPayment: (courseId: string, method: 'UPI' | 'Card' | 'Net Banking') => Order;
  onNavigate: (view: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  course,
  onProcessPayment,
  onNavigate
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Net Banking'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const taxAmount = Math.round(course.price * 0.18);
  const totalAmount = course.price + taxAmount;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = onProcessPayment(course.id, paymentMethod);
      setCompletedOrder(order);
      setIsProcessing(false);
    }, 1200);
  };

  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-xs font-bold uppercase">
            Payment Successful
          </span>
          <h2 className="text-3xl font-extrabold text-white">Enrollment Confirmed!</h2>
          <p className="text-slate-300 text-sm">
            Welcome to Zenfotech AI Academy. Your course access is activated.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-left text-xs space-y-3 font-mono">
          <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
            <span>Order ID:</span>
            <span className="text-amber-400 font-bold">{completedOrder.id}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
            <span>Transaction ID:</span>
            <span className="text-white">{completedOrder.transactionId}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
            <span>Enrollment ID:</span>
            <span className="text-emerald-400 font-bold">{completedOrder.enrollmentId}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
            <span>Course Title:</span>
            <span className="text-white font-sans font-bold">{completedOrder.courseTitle}</span>
          </div>
          <div className="flex justify-between py-1 text-slate-400">
            <span>Amount Paid:</span>
            <span className="text-white text-sm font-bold">₹{completedOrder.amount.toLocaleString('en-IN')} (Demo)</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('student-dashboard')}
          className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span>Go to Student LMS Dashboard</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/30 text-xs font-bold uppercase">
          E-Commerce Checkout
        </span>
        <h1 className="text-3xl font-extrabold text-white">Enrollment & Order Summary</h1>
        <p className="text-slate-400 text-xs">
          Demo payment simulation — no real currency or credit card will be charged.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left: Payment Method Selection */}
        <div className="md:col-span-7 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Select Payment Method (Demo)</span>
          </h3>

          <div className="grid grid-cols-3 gap-3 text-xs font-semibold">
            <button
              onClick={() => setPaymentMethod('UPI')}
              className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                paymentMethod === 'UPI'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span>UPI / QR</span>
            </button>

            <button
              onClick={() => setPaymentMethod('Card')}
              className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                paymentMethod === 'Card'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Card</span>
            </button>

            <button
              onClick={() => setPaymentMethod('Net Banking')}
              className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                paymentMethod === 'Net Banking'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Building className="w-5 h-5" />
              <span>NetBanking</span>
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <p className="font-semibold text-amber-400">Demo Transaction Details:</p>
            <p>Selected Method: <strong className="text-white">{paymentMethod}</strong></p>
            <p className="text-slate-400">Clicking the demo pay button below will simulate instant bank approval and issue your enrollment credentials.</p>
          </div>

          <button
            disabled={isProcessing}
            onClick={handlePay}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                Processing Demo Payment...
              </span>
            ) : (
              <span>Pay ₹{course.price.toLocaleString('en-IN')} — Demo Payment</span>
            )}
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="md:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Order Breakdown
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <p className="font-bold text-white text-sm">{course.title}</p>
              <p className="text-slate-400 mt-0.5">{course.badge} | Lifetime Access</p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-800 text-slate-300">
              <div className="flex justify-between">
                <span>Original Course Fee:</span>
                <span className="line-through text-slate-500">₹{course.originalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Special Program Fee:</span>
                <span className="text-white">₹{course.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GST / Taxes (18%):</span>
                <span>₹{taxAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-3 border-y border-slate-800 text-sm font-bold">
              <span className="text-white">Total Payable Amount:</span>
              <span className="text-amber-400 text-base">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/50 text-[11px] text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span>Encrypted Demo Gateway — 100% Secure Access</span>
          </div>
        </div>

      </div>
    </div>
  );
};
