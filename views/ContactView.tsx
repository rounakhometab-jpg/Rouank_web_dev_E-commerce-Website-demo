'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/30 text-xs font-bold uppercase">
          Corporate Support
        </span>
        <h1 className="text-3xl font-extrabold text-white">Contact Zenfotech AI Academy</h1>
        <p className="text-slate-400 text-xs max-w-md mx-auto">
          Have questions regarding corporate enrollment, certification, or platform features? Reach out to our support team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Info */}
        <div className="md:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 text-xs text-slate-300">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Corporate Details</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-sans">Zenfotech Private Limited</strong>
                <p className="text-slate-400">Tech Park Campus, India</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="text-white block font-sans">Email Support</strong>
                <p className="text-slate-400 font-mono">info@zenfotech.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="text-white block font-sans">Phone Line</strong>
                <p className="text-slate-400 font-mono">+91 XXXXX XXXXX (Placeholder)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-7 bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Message Sent!</h3>
              <p className="text-xs text-slate-300">Thank you for reaching out to Zenfotech AI Academy. Our team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Send Inquiry Message</h3>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Inquire about corporate bulk licenses or course curriculum..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
