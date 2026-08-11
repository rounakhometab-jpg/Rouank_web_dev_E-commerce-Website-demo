'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Crop,
  RotateCcw,
  Check,
  X,
  Upload,
  Trash2,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles
} from 'lucide-react';

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  aspectRatio: '16:9' | '1:1';
  title?: string;
  recommendedResolution?: string;
  onCropSave: (croppedDataUrl: string) => void;
  onReplaceImage?: () => void;
  onRemoveImage?: () => void;
  onClose: () => void;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  imageSrc,
  aspectRatio,
  title = aspectRatio === '16:9' ? 'Crop Course Thumbnail' : 'Crop Product Image',
  recommendedResolution = aspectRatio === '16:9' ? '1920 × 1080 px (16:9)' : '1200 × 1200 px (1:1)',
  onCropSave,
  onReplaceImage,
  onRemoveImage,
  onClose
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
    setImgLoaded(false);
  }, [imageSrc]);

  if (!isOpen || !imageSrc) return null;

  const isSquare = aspectRatio === '1:1';
  const targetWidth = isSquare ? 1200 : 1920;
  const targetHeight = isSquare ? 1200 : 1080;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanX(e.clientX - dragStart.x);
    setPanY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const handleCrop = () => {
    if (!imgRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const img = imgRef.current;
    
    // Draw background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, targetWidth, targetHeight);

    // Calculate crop drawing parameters
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = targetWidth / targetHeight;

    let drawWidth = targetWidth;
    let drawHeight = targetHeight;

    if (imgAspect > canvasAspect) {
      drawWidth = targetHeight * imgAspect;
    } else {
      drawHeight = targetWidth / imgAspect;
    }

    // Apply Zoom & Pan
    drawWidth *= zoom;
    drawHeight *= zoom;

    const x = (targetWidth - drawWidth) / 2 + (panX * (targetWidth / 400));
    const y = (targetHeight - drawHeight) / 2 + (panY * (targetHeight / 300));

    ctx.drawImage(img, x, y, drawWidth, drawHeight);

    const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
    onCropSave(croppedDataUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl space-y-5 p-6 text-xs text-slate-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Crop className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">{title}</h2>
              <p className="text-[11px] text-amber-400 font-bold">
                Target Aspect Ratio: {aspectRatio} • Recommended: {recommendedResolution}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cropper Viewport Canvas Frame */}
        <div className="space-y-3">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Drag image to pan • Adjust zoom slider to scale</span>
            <button
              type="button"
              onClick={handleReset}
              className="text-amber-400 font-bold hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset Position
            </button>
          </div>

          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`w-full ${
              isSquare ? 'aspect-square max-w-[360px] mx-auto' : 'aspect-[16/9]'
            } bg-slate-950 border-2 border-dashed border-amber-500/50 rounded-2xl overflow-hidden relative cursor-grab active:cursor-grabbing flex items-center justify-center select-none shadow-inner`}
          >
            {/* Dark Mask Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 border-4 border-amber-500/40 rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]">
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-amber-400 font-mono font-bold text-[10px] border border-amber-500/30">
                {aspectRatio} Crop Mask
              </div>
            </div>

            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop Source"
              onLoad={() => setImgLoaded(true)}
              style={{
                transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }}
              className="max-w-none max-h-none pointer-events-none object-cover"
            />
          </div>
        </div>

        {/* Sliders / Controls */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <ZoomOut className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min="0.8"
              max="2.5"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <ZoomIn className="w-4 h-4 text-slate-400" />
            <span className="text-[11px] font-mono text-amber-400 font-bold w-12 text-right">
              {Math.round(zoom * 100)}%
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <div className="flex items-center gap-2">
            {onReplaceImage && (
              <button
                type="button"
                onClick={onReplaceImage}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 border border-slate-700"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replace Image</span>
              </button>
            )}
            {onRemoveImage && (
              <button
                type="button"
                onClick={onRemoveImage}
                className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 font-bold flex items-center gap-1.5 border border-red-800/50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Image</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-750"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCrop}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-lg flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Crop & Save</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
