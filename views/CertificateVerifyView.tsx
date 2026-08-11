'use client';

import React, { useState } from 'react';
import { Certificate } from '../lib/types';
import { ShieldCheck, Search, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

interface CertificateVerifyViewProps {
  onVerify: (certId: string) => Certificate | null;
  initialCertId?: string;
  onNavigate: (view: string) => void;
}

export const CertificateVerifyView: React.FC<CertificateVerifyViewProps> = ({
  onVerify,
  initialCertId = 'ZAA-2026-000001',
  onNavigate
}) => {
  const [certId, setCertId] = useState(initialCertId);
  const [searchResult, setSearchResult] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;
    const res = onVerify(certId);
    setSearchResult(res);
    setSearched(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Official Certificate Verification Portal
        </h1>
        <p className="text-slate-400 text-xs max-w-md mx-auto">
          Verify authentic digital certificates issued by Zenfotech AI Academy (Zenfotech Private Limited).
        </p>
      </div>

      {/* Input Search Form */}
      <form onSubmit={handleSearch} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center gap-3 shadow-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            placeholder="Enter Certificate ID (e.g. ZAA-2026-000001)"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md shrink-0 transition-all"
        >
          Verify Certificate
        </button>
      </form>

      {/* Result Card */}
      {searched && (
        <div className="space-y-4">
          {searchResult ? (
            <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-500/50 space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>✓ CERTIFICATE VERIFIED & VALID</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[10px]">Student Name:</span>
                  <span className="text-white font-sans font-bold text-sm">{searchResult.studentName}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px]">Certificate ID:</span>
                  <span className="text-amber-400 font-bold text-sm">{searchResult.id}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px]">Course Program:</span>
                  <span className="text-slate-200 font-sans font-semibold">{searchResult.courseTitle}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px]">Issue Date:</span>
                  <span className="text-slate-200">{searchResult.issueDate}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px]">Verification Status:</span>
                  <span className="text-emerald-400 font-bold uppercase">{searchResult.status}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px]">Issuing Authority:</span>
                  <span className="text-slate-200 font-sans">Zenfotech AI Academy</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => onNavigate('student-certificate')}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold border border-slate-700"
                >
                  View Full Print Certificate &rarr;
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 p-6 rounded-2xl border border-rose-500/50 text-center space-y-2 text-rose-300">
              <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
              <h4 className="font-bold text-base text-white">Certificate Not Found</h4>
              <p className="text-xs text-slate-400">
                The Certificate ID &quot;{certId}&quot; could not be found in the Zenfotech official verification ledger. Please verify the spelling and try again.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
