import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'dark',
  showTagline = false,
  className = ''
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const subtextSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';

  const textColor = variant === 'light' ? 'text-white' : 'text-slate-900';
  const subtextColor = variant === 'light' ? 'text-amber-400' : 'text-amber-600';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Geometric Z Monogram SVG */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-2 shadow-md border border-slate-700/50"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full"
        >
          {/* Outer hexagonal geometry */}
          <polygon points="50,5 90,27 90,73 50,95 10,73 10,27" stroke="#D97706" strokeWidth="6" strokeLinejoin="round" />
          {/* Sharp Z Monogram */}
          <path 
            d="M 28,32 L 72,32 L 32,68 L 72,68" 
            stroke="#2563EB" 
            strokeWidth="10" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Gold accent points */}
          <circle cx="72" cy="32" r="5" fill="#F59E0B" />
          <circle cx="32" cy="68" r="5" fill="#F59E0B" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className={`font-extrabold tracking-tight leading-none ${textSize} ${textColor}`}>
          ZENFOTECH
        </div>
        <div className={`font-bold tracking-widest uppercase ${subtextSize} ${subtextColor} mt-0.5`}>
          AI ACADEMY
        </div>
        {showTagline && (
          <div className="text-[9px] font-medium tracking-wide text-slate-500 mt-0.5 uppercase">
            EMPOWERING BUSINESS WITH AI
          </div>
        )}
      </div>
    </div>
  );
};
