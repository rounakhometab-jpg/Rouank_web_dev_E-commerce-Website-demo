import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Mail, Phone, MapPin, Award, Lock, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => onNavigate('home')} className="focus:outline-none">
              <Logo variant="light" size="lg" showTagline={true} />
            </button>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Zenfotech AI Academy is a premier corporate EdTech platform delivering industry-focused Artificial Intelligence training, automated online assessments, and official verifiable digital certifications.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                Official Certificate Issuer
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300">
                <Lock className="w-4 h-4 text-emerald-400" />
                ISO Compliant Assessment
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-sm uppercase tracking-wider">Programs</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('course-details')} className="hover:text-amber-400 transition-colors">
                  AI Industry Certification
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-amber-400 transition-colors">
                  Prompt Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-amber-400 transition-colors">
                  Machine Learning & RAG
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-amber-400 transition-colors">
                  AI Automation for Business
                </button>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-sm uppercase tracking-wider">Platform</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  About Zenfotech
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-amber-400 transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('verify')} className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>Verify Certificate</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-amber-400 transition-colors">
                  FAQ & Knowledgebase
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('login')} className="hover:text-amber-400 transition-colors">
                  Sign In
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-sm uppercase tracking-wider">Contact Corporate</p>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Zenfotech Private Limited, Tech Park Campus, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>info@zenfotech.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+91 XXXXX XXXXX (Placeholder)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Subfooter */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Zenfotech Private Limited. All Rights Reserved. Zenfotech AI Academy.</p>
          <div className="flex gap-6">
            <button onClick={() => onNavigate('faq')} className="hover:text-slate-300 transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('faq')} className="hover:text-slate-300 transition-colors">Terms & Conditions</button>
            <button onClick={() => onNavigate('verify')} className="hover:text-amber-400 transition-colors">Verification Portal</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
