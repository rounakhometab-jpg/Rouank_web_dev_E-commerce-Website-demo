'use client';

import React, { useState } from 'react';
import { useAppStore } from '../lib/store';
import { SafeImage } from '../components/ui/SafeImage';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  Check, 
  ShieldCheck, 
  Truck,
  BookOpen
} from 'lucide-react';

interface CartViewProps {
  onNavigate: (view: string, params?: any) => void;
}

export const CartView: React.FC<CartViewProps> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, applyCoupon, user } = useAppStore();

  const [couponInput, setCouponInput] = useState<string>('');
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [couponStatus, setCouponStatus] = useState<{ success: boolean; message: string } | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 999 || cart.length === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const result = applyCoupon(couponInput, subtotal);
    setCouponStatus(result);

    if (result.success && result.discountAmount) {
      setDiscountAmount(result.discountAmount);
      setAppliedCouponCode(couponInput.trim().toUpperCase());
    } else {
      setDiscountAmount(0);
      setAppliedCouponCode(null);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center max-w-md w-full shadow-2xl">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400 mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-white">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-slate-400 mt-2">Browse our store for official course books, study materials and kits.</p>
          <button
            onClick={() => onNavigate('shop')}
            className="mt-6 w-full py-3 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition-all shadow-lg"
          >
            Explore Shop Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      
      {/* Top Navigation */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>

          <h1 className="text-base font-extrabold text-white">Shopping Cart ({cart.length} Items)</h1>

          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-400 hover:underline"
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <SafeImage
                    src={item.product.images[0]}
                    alt={item.product.name}
                    type="product"
                    aspectRatio="1:1"
                    objectFit="contain"
                    containerClassName="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-slate-800 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      {item.product.categoryName}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base text-white mt-1">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">₹{item.product.price.toLocaleString('en-IN')} each</p>

                    {item.product.type === 'Digital' && (
                      <span className="inline-block mt-1 text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">
                        Instant Digital Download
                      </span>
                    )}
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  {/* Quantity Counter */}
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-slate-800 text-white font-bold text-xs flex items-center justify-center hover:bg-slate-700"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-black text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-slate-800 text-white font-bold text-xs flex items-center justify-center hover:bg-slate-700"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="font-black text-white text-base">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Order Summary & Coupon Box */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Coupon Code Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-400" />
                <span>Apply Coupon Code</span>
              </h3>

              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Try ZEN10 or EARLYBIRD"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300"
                >
                  Apply
                </button>
              </form>

              {couponStatus && (
                <p className={`text-xs font-bold ${couponStatus.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {couponStatus.message}
                </p>
              )}
            </div>

            {/* Order Summary Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-black text-white border-b border-slate-800 pb-3">Order Summary</h3>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Coupon Discount ({appliedCouponCode})</span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-white">
                    {shippingFee === 0 ? <span className="text-emerald-400">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-sm font-black text-white">Total Amount</span>
                  <span className="text-2xl font-black text-amber-400">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('checkout', { subtotal, discountAmount, shippingFee, total, couponCode: appliedCouponCode })}
                className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 mt-4"
              >
                <span>Proceed to Express Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-[11px] text-slate-400 text-center space-y-1">
                <p className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Safe Demo Payment Simulation</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
