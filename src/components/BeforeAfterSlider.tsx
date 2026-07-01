"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt?: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage, alt = "" }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const onPointerUp = () => setIsDragging(false);
    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) handleMove(e.clientX);
    };

    if (isDragging) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full cursor-ew-resize select-none overflow-hidden"
      onPointerDown={onPointerDown}
    >
      {/* After Image (Background) */}
      <Image 
        src={afterImage} 
        alt={`Après - ${alt}`} 
        fill 
        className="object-cover pointer-events-none" 
      />

      {/* Before Image (Foreground, clipped) */}
      <Image 
        src={beforeImage} 
        alt={`Avant - ${alt}`} 
        fill 
        className="object-cover pointer-events-none" 
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none transition-transform"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-white bg-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
          </svg>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-10 left-10 bg-white/10 backdrop-blur-md border border-white/40 px-5 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase pointer-events-none shadow-lg">Avant</div>
      <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md border border-white/40 px-5 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase pointer-events-none shadow-lg">Après</div>
    </div>
  );
}
