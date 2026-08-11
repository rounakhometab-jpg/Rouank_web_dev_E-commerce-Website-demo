'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, ShoppingBag, Sparkles, Image as ImageIcon } from 'lucide-react';

interface SafeImageProps {
  src?: string | null;
  alt: string;
  type?: 'course' | 'product' | 'general';
  aspectRatio?: '16:9' | '1:1' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill';
  className?: string;
  containerClassName?: string;
  fallbackTitle?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  type = 'general',
  aspectRatio = type === 'course' ? '16:9' : type === 'product' ? '1:1' : 'auto',
  objectFit = type === 'product' ? 'contain' : 'cover',
  className = '',
  containerClassName = '',
  fallbackTitle
}) => {
  const [hasError, setHasError] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(src || null);

  useEffect(() => {
    setHasError(false);
    setLoadedSrc(src || null);
  }, [src]);

  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-[16/9]'
      : aspectRatio === '1:1'
      ? 'aspect-square'
      : '';

  const fitClass =
    objectFit === 'contain'
      ? 'object-contain'
      : objectFit === 'fill'
      ? 'object-fill'
      : 'object-cover';

  // Render Placeholder if src is missing or image failed to load
  if (!loadedSrc || hasError) {
    return (
      <div
        className={`w-full ${aspectClass} bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 rounded-2xl flex flex-col items-center justify-center p-4 text-center overflow-hidden relative select-none group ${containerClassName}`}
      >
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:1rem_1rem]" />
        
        {/* Glow backdrop */}
        <div className="absolute w-24 h-24 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-2 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg">
            {type === 'product' ? (
              <ShoppingBag className="w-5 h-5 text-amber-400" />
            ) : type === 'course' ? (
              <BookOpen className="w-5 h-5 text-amber-400" />
            ) : (
              <Sparkles className="w-5 h-5 text-amber-400" />
            )}
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
              ZENFOTECH AI ACADEMY
            </span>
            <p className="text-[11px] font-bold text-slate-300 line-clamp-1 max-w-[180px]">
              {fallbackTitle || alt || (type === 'product' ? 'Product Image' : 'Course Thumbnail')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${aspectClass} overflow-hidden relative bg-slate-950 flex items-center justify-center ${containerClassName}`}>
      <img
        src={loadedSrc}
        alt={alt}
        onError={() => setHasError(true)}
        className={`w-full h-full ${fitClass} object-center transition-all duration-300 ${className}`}
      />
    </div>
  );
};
