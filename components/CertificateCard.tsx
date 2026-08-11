'use client';

import React from 'react';
import { Certificate } from '../lib/types';
import { ShieldCheck, Printer, Download, CheckCircle, Lock, ExternalLink } from 'lucide-react';

interface CertificateCardProps {
  certificate: Certificate | null;
  onVerifyClick?: (id: string) => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onVerifyClick
}) => {
  if (!certificate || certificate.status === 'locked') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center max-w-2xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 text-amber-500 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">Certificate Locked</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          You must score at least <span className="text-amber-400 font-semibold">60%</span> on the Final Online Examination to unlock your official Zenfotech Digital Certificate.
        </p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800 no-print">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>Certificate Status: <strong className="text-emerald-400 uppercase font-bold">{certificate.status}</strong></span>
        </div>
        <div className="flex items-center gap-3">
          {onVerifyClick && (
            <button
              onClick={() => onVerifyClick(certificate.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Verify Link
            </button>
          )}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            Print / Download Certificate
          </button>
        </div>
      </div>

      {/* Printable Certificate Frame */}
      <div 
        id="printable-certificate"
        className="relative bg-white text-slate-900 p-8 sm:p-14 rounded-2xl shadow-2xl border-8 border-slate-200 overflow-hidden font-serif max-w-4xl mx-auto"
        style={{ minHeight: '580px' }}
      >
        {/* Decorative Inner Border */}
        <div className="absolute inset-3 border-2 border-amber-600/40 pointer-events-none"></div>
        <div className="absolute inset-5 border border-slate-300 pointer-events-none"></div>

        {/* Subtle Watermark Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <div className="text-9xl font-extrabold tracking-tighter">ZENFOTECH</div>
        </div>

        {/* Certificate Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-amber-500 font-sans font-bold text-xl border border-amber-500/40">
              Z
            </div>
          </div>
          <p className="font-sans font-extrabold tracking-widest text-slate-900 text-sm uppercase">
            ZENFOTECH AI ACADEMY
          </p>
          <p className="font-sans text-[10px] tracking-widest text-amber-600 uppercase font-semibold">
            ZENFOTECH PRIVATE LIMITED
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-wide pt-4 font-serif border-b border-amber-600/30 pb-4 inline-block px-8">
            CERTIFICATE OF COMPLETION
          </h1>
        </div>

        {/* Body Text */}
        <div className="text-center space-y-4 my-8 relative z-10 font-sans">
          <p className="text-slate-600 italic text-sm">This certificate is proudly presented to</p>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-950 underline decoration-amber-500 decoration-2 underline-offset-8">
            {certificate.studentName}
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed pt-2">
            for successfully completing the comprehensive examination and meeting all performance criteria for the
          </p>
          <p className="text-xl font-bold text-slate-900 tracking-tight">
            {certificate.courseTitle}
          </p>
          <p className="text-xs text-slate-500">
            Exam Final Score: <strong className="text-slate-900">{certificate.scorePercentage}%</strong> | Up to 500 Learning Hours Program
          </p>
        </div>

        {/* Certificate Footer / Signatures */}
        <div className="grid grid-cols-3 items-end pt-8 border-t border-slate-200 mt-8 relative z-10 font-sans text-xs">
          
          {/* Left: Issue info */}
          <div className="space-y-1">
            <p className="text-slate-500 text-[11px]">Certificate ID:</p>
            <p className="font-mono font-bold text-slate-900 text-xs">{certificate.id}</p>
            <p className="text-slate-500 text-[11px] pt-1">Issue Date: <span className="font-semibold text-slate-800">{certificate.issueDate}</span></p>
          </div>

          {/* Center: Gold Official Seal */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-1 shadow-lg flex items-center justify-center text-slate-950 text-center">
              <div className="w-full h-full rounded-full border-2 border-dashed border-amber-950 flex flex-col items-center justify-center p-1 bg-amber-500/20">
                <ShieldCheck className="w-6 h-6 text-slate-950" />
                <span className="text-[8px] font-extrabold uppercase tracking-tighter leading-none mt-0.5">VERIFIED</span>
                <span className="text-[7px] font-bold">OFFICIAL</span>
              </div>
            </div>
          </div>

          {/* Right: Signature */}
          <div className="text-right space-y-1">
            <div className="h-8 flex items-end justify-end">
              <span className="font-serif italic font-bold text-lg text-slate-900 border-b border-slate-900 px-4">
                Zenfotech Board
              </span>
            </div>
            <p className="font-bold text-slate-900">Authorized Signatory</p>
            <p className="text-[10px] text-slate-500">Zenfotech AI Academy</p>
          </div>

        </div>

        {/* Security QR / Verification footer */}
        <div className="mt-6 text-center text-[10px] text-slate-400 font-sans font-mono border-t border-dashed border-slate-200 pt-3">
          Verifiable online at: <span className="text-amber-700 font-semibold">{certificate.verificationUrl}</span>
        </div>
      </div>
    </div>
  );
};
