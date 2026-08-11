'use client';

import React, { useState } from 'react';
import { Certificate, StudentProgress, User } from '../../lib/types';
import { generateCertificatePDF } from '../../lib/certificatePdfGenerator';
import {
  ShieldCheck,
  Search,
  Download,
  ExternalLink,
  Ban,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Award,
  Users,
  FileCheck
} from 'lucide-react';

interface AdminCertificatesViewProps {
  progress: StudentProgress;
  students: User[];
  onRevokeCert: () => void;
  onNavigate: (view: string, param?: string) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const AdminCertificatesView: React.FC<AdminCertificatesViewProps> = ({
  progress,
  students,
  onRevokeCert,
  onNavigate,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'valid' | 'revoked'>('all');

  // Initial Demo Certificate list
  const initialCertList: Certificate[] = [
    {
      id: 'ZAA-2026-000001',
      studentId: 'usr_student_01',
      studentName: 'Rahul Verma',
      studentEmail: 'student@zenfotech.com',
      courseTitle: 'AI Industry Certification Program',
      issueDate: '11 August 2026',
      status: progress.certificate?.status || 'valid',
      scorePercentage: progress.certificate?.scorePercentage || 82,
      verificationUrl: 'https://zenfotech.com/verify'
    },
    {
      id: 'ZAA-2026-000084',
      studentId: 'usr_student_02',
      studentName: 'Ananya Sharma',
      studentEmail: 'ananya@gmail.com',
      courseTitle: 'Advanced Multimodal Generative AI',
      issueDate: '02 August 2026',
      status: 'valid',
      scorePercentage: 94,
      verificationUrl: 'https://zenfotech.com/verify'
    },
    {
      id: 'ZAA-2026-000119',
      studentId: 'usr_student_03',
      studentName: 'Vikramaditya Rao',
      studentEmail: 'vikram@tech.in',
      courseTitle: 'Full-Stack Agentic AI Engineering',
      issueDate: '18 July 2026',
      status: 'revoked',
      scorePercentage: 62,
      verificationUrl: 'https://zenfotech.com/verify'
    }
  ];

  const [certList, setCertList] = useState<Certificate[]>(initialCertList);

  const handleToggleRevoke = (certId: string) => {
    const updated = certList.map(c => {
      if (c.id === certId) {
        const nextStatus = c.status === 'valid' ? 'revoked' : 'valid';
        return { ...c, status: nextStatus as 'valid' | 'revoked' };
      }
      return c;
    });
    setCertList(updated);

    if (certId === 'ZAA-2026-000001') {
      onRevokeCert();
    }

    onShowToast('Certificate Status Updated', `Certificate ${certId} updated successfully.`, 'info');
  };

  const handleDownloadPDF = (cert: Certificate) => {
    if (cert.status === 'revoked') {
      onShowToast('Cannot Download', 'This certificate has been revoked.', 'error');
      return;
    }
    generateCertificatePDF(cert);
    onShowToast('PDF Downloaded', `Certificate ${cert.id} saved to your downloads.`, 'success');
  };

  const filteredCerts = certList.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-xs text-slate-200">
      
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Certificate Verification & Management</span>
          </div>
          <h1 className="text-xl font-extrabold text-white">Issued Credentials & Credentials Registry</h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Audit, generate PDFs, verify cryptographically, and manage revocation statuses for student certificates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Valid Issued</span>
            <strong className="text-emerald-400 text-sm font-black">
              {certList.filter(c => c.status === 'valid').length}
            </strong>
          </div>
          <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Revoked</span>
            <strong className="text-red-400 text-sm font-black">
              {certList.filter(c => c.status === 'revoked').length}
            </strong>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search certificate ID, student or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-colors ${
              statusFilter === 'all' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Credentials
          </button>
          <button
            onClick={() => setStatusFilter('valid')}
            className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-colors ${
              statusFilter === 'valid' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Valid
          </button>
          <button
            onClick={() => setStatusFilter('revoked')}
            className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-colors ${
              statusFilter === 'revoked' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Revoked
          </button>
        </div>
      </div>

      {/* Credentials Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4 font-extrabold">Certificate ID</th>
                <th className="py-3 px-4 font-extrabold">Student Name</th>
                <th className="py-3 px-4 font-extrabold">Course Program</th>
                <th className="py-3 px-4 font-extrabold">Exam Score</th>
                <th className="py-3 px-4 font-extrabold">Issue Date</th>
                <th className="py-3 px-4 font-extrabold">Status</th>
                <th className="py-3 px-4 font-extrabold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredCerts.map((cert) => {
                const isValid = cert.status === 'valid';

                return (
                  <tr key={cert.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-amber-400">
                      {cert.id}
                    </td>
                    <td className="py-3 px-4 font-bold text-white">
                      {cert.studentName}
                      {cert.studentEmail && (
                        <span className="block text-[10px] text-slate-500 font-normal">{cert.studentEmail}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-200">
                      {cert.courseTitle}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                      {cert.scorePercentage}%
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">
                      {cert.issueDate}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isValid
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {isValid ? <CheckCircle className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                        <span>{cert.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDownloadPDF(cert)}
                          disabled={!isValid}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-950 font-bold flex items-center gap-1 transition-colors"
                          title="Download Certificate PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>

                        <button
                          onClick={() => onNavigate('verify', cert.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                          title="Verify Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleToggleRevoke(cert.id)}
                          className={`p-1.5 rounded-lg font-bold border transition-colors ${
                            isValid
                              ? 'bg-red-950/40 hover:bg-red-900/60 text-red-400 border-red-800/50'
                              : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border-emerald-800/50'
                          }`}
                          title={isValid ? 'Revoke Certificate' : 'Validate / Re-issue'}
                        >
                          {isValid ? <Ban className="w-3.5 h-3.5" /> : <RotateCcw className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
