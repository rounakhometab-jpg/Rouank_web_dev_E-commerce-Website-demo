'use client';

import React, { useState } from 'react';
import { useAppStore } from '../lib/store';
import { 
  ShieldCheck, 
  Check, 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  ShoppingBag,
  Download,
  Printer
} from 'lucide-react';

import { Course } from '../lib/types';

interface CheckoutViewProps {
  course?: Course;
  onProcessPayment?: (courseId: string, method: 'UPI' | 'Card' | 'Net Banking') => any;
  checkoutData?: {
    subtotal: number;
    discountAmount: number;
    shippingFee: number;
    total: number;
    couponCode?: string | null;
  };
  onNavigate: (view: string, params?: any) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ course, onProcessPayment, checkoutData, onNavigate }) => {
  const { cart, placeShopOrder, user } = useAppStore();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerMobile, setCustomerMobile] = useState(user?.mobile || '');
  
  // Shipping Address
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [state, setState] = useState('Telangana');
  const [pincode, setPincode] = useState('500081');

  // Payment Method
  const [paymentGateway, setPaymentGateway] = useState<'razorpay' | 'cashfree' | 'card'>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  const subtotal = checkoutData?.subtotal || (course ? course.price : cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0));
  const discountAmount = checkoutData?.discountAmount || 0;
  const shippingFee = checkoutData?.shippingFee ?? (subtotal > 999 || course ? 0 : 99);
  const totalAmount = checkoutData?.total || Math.max(0, subtotal - discountAmount + shippingFee);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerMobile) {
      alert('Please fill in your contact information.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      if (course && onProcessPayment) {
        const order = onProcessPayment(course.id, paymentGateway === 'card' ? 'Card' : 'UPI');
        setIsProcessing(false);
        setCompletedOrder({
          orderNumber: order.id || `ORD-${Date.now().toString().slice(-6)}`,
          customerEmail: user?.email || customerEmail,
          createdAt: new Date().toISOString(),
          paymentStatus: 'paid',
          items: [{
            productName: course.title,
            quantity: 1,
            type: 'Course Enrollment',
            totalPrice: course.price
          }],
          totalAmount: course.price
        });
        return;
      }

      const order = placeShopOrder({
        customerName,
        customerEmail,
        customerMobile,
        shippingAddress: {
          fullName: customerName,
          email: customerEmail,
          mobile: customerMobile,
          address: street || 'Plot 42, Tech Park Enclave',
          city,
          state,
          pincode,
          country: 'India'
        },
        items: cart.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          productImage: item.product.images[0],
          price: item.product.price,
          mrp: item.product.mrp,
          quantity: item.quantity,
          type: item.product.type,
          relatedCourseId: item.selectedCourseId
        })),
        subtotal,
        discountAmount,
        couponCode: checkoutData?.couponCode || undefined,
        shippingFee,
        taxAmount: 0,
        totalAmount,
        paymentMethod: 'DEMO PAYMENT',
        paymentStatus: 'paid',
        orderStatus: 'Confirmed'
      });

      setIsProcessing(false);
      setCompletedOrder(order);
    }, 1500);
  };

  // ORDER SUCCESS SCREEN
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <Check className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-black uppercase text-amber-400 tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Demo Order Placed Successfully!
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-3">Order #{completedOrder.orderNumber}</h1>
            <p className="text-xs text-slate-400 mt-1">
              A confirmation invoice has been sent to <span className="text-amber-300 font-bold">{completedOrder.customerEmail}</span>
            </p>
          </div>

          {/* Order Details Summary */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left text-xs space-y-3">
            <div className="flex justify-between border-b border-slate-800 pb-2 font-bold text-slate-300">
              <span>Date: {new Date(completedOrder.createdAt).toLocaleDateString()}</span>
              <span className="text-emerald-400 uppercase">{completedOrder.paymentStatus}</span>
            </div>

            <div className="space-y-2">
              {completedOrder.items.map((i: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center text-white">
                  <div>
                    <p className="font-bold">{i.productName} x {i.quantity}</p>
                    <p className="text-[10px] text-slate-400">{i.type}</p>
                  </div>
                  <span className="font-mono font-bold">₹{((i.price || i.totalPrice || 0) * (i.quantity || 1)).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-black text-white">
              <span>Total Paid</span>
              <span className="text-amber-400">₹{completedOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="py-3 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => onNavigate('student-dashboard')}
              className="py-3 rounded-2xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 border border-slate-700"
            >
              Go to My Student Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      
      {/* Top Header */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('cart')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </button>

          <h1 className="text-base font-extrabold text-white">Express Checkout</h1>

          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Shipping & Customer Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Contact Info */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-amber-400" />
                <span>Customer & Student Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="learner@zenfotech.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Number (For Courier SMS Updates) *</label>
                  <input
                    type="tel"
                    required
                    value={customerMobile}
                    onChange={(e) => setCustomerMobile(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Delivery Address (Physical Books & Kits)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">Flat / Building / Street Address *</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Plot No. 42, Silicon Valley Colony, Madhapur"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* DEMO Payment Mode Selector */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>Select Payment Gateway Mode</span>
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded border border-amber-500/30">
                  DEMO SIMULATION
                </span>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-300 font-semibold">
                ℹ️ Demo Payment Mode is active. No actual bank or card charges will be placed. Architecture is pre-configured for Cashfree / Razorpay integration.
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentGateway('razorpay')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentGateway === 'razorpay'
                      ? 'bg-amber-400 text-slate-950 font-black border-amber-400 shadow'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <p className="text-xs font-bold">Razorpay Demo</p>
                  <p className="text-[10px] opacity-80">UPI / Cards / NetBanking</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentGateway('cashfree')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentGateway === 'cashfree'
                      ? 'bg-amber-400 text-slate-950 font-black border-amber-400 shadow'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <p className="text-xs font-bold">Cashfree Demo</p>
                  <p className="text-[10px] opacity-80">Auto Checkout</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentGateway('card')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentGateway === 'card'
                      ? 'bg-amber-400 text-slate-950 font-black border-amber-400 shadow'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <p className="text-xs font-bold">Direct Card</p>
                  <p className="text-[10px] opacity-80">Instant Auth</p>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary & Complete Button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 sticky top-28">
              <h3 className="text-base font-black text-white border-b border-slate-800 pb-3">Items in Order ({cart.length})</h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 text-xs">
                    <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover bg-slate-950 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white truncate">{item.product.name}</p>
                      <p className="text-slate-400">Qty: {item.quantity} × ₹{item.product.price.toLocaleString('en-IN')}</p>
                    </div>
                    <span className="font-black text-white">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Discount</span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-emerald-400">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-sm font-black text-white">Total Amount Payable</span>
                  <span className="text-2xl font-black text-amber-400">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Authorizing Demo Payment...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ₹{totalAmount.toLocaleString('en-IN')} (Demo Payment)</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-slate-400 text-center">
                By clicking pay, you agree to Zenfotech AI Academy&apos;s Terms of Sale.
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
