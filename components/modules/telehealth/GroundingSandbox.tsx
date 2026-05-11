'use client';

import React, { useState, useEffect } from 'react';
import { Wind, X, Heart, ShieldCheck } from 'lucide-react';

export default function GroundingSandbox({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'intro' | 'inhale' | 'hold' | 'exhale'>('intro');
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (phase === 'intro') {
      const timer = setTimeout(() => {
        setPhase('inhale');
        setTimeLeft(4);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (timeLeft === 0) {
      if (phase === 'inhale') {
        setPhase('hold');
        setTimeLeft(7);
      } else if (phase === 'hold') {
        setPhase('exhale');
        setTimeLeft(8);
      } else if (phase === 'exhale') {
        setCycles((c) => c + 1);
        setPhase('inhale');
        setTimeLeft(4);
      }
    }
  }, [phase, timeLeft]);

  // Derive styles based on phase
  const getOrbSize = () => {
    switch (phase) {
      case 'intro': return 'scale-50';
      case 'inhale': return 'scale-150';
      case 'hold': return 'scale-150';
      case 'exhale': return 'scale-50';
      default: return 'scale-100';
    }
  };

  const getTransitionDuration = () => {
    switch (phase) {
      case 'inhale': return 'duration-[4000ms]';
      case 'hold': return 'duration-1000'; // stays same size
      case 'exhale': return 'duration-[8000ms]';
      default: return 'duration-1000';
    }
  };

  const getMessage = () => {
    switch (phase) {
      case 'intro': return 'Preparing for grounding...';
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black/90 backdrop-blur-2xl animate-in fade-in duration-1000">
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 z-50"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header Info */}
      <div className="absolute top-8 left-8 flex items-center gap-4 z-50 opacity-50">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-white font-medium text-sm">
          <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
          Client HR: 98 BPM (Stabilizing)
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-emerald-400 font-bold text-sm">
          <ShieldCheck className="w-4 h-4" />
          Synced to Client Device
        </div>
      </div>

      {/* Ambient Ripples */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`absolute w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[100px] mix-blend-screen transition-all ${getTransitionDuration()} ${getOrbSize()}`} />
        <div className={`absolute w-[400px] h-[400px] bg-teal-400/20 rounded-full blur-[80px] mix-blend-screen transition-all ${getTransitionDuration()} ${getOrbSize()}`} />
        <div className={`absolute w-[200px] h-[200px] bg-white/20 rounded-full blur-[40px] mix-blend-screen transition-all ${getTransitionDuration()} ${getOrbSize()}`} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Core Orb */}
        <div className="relative w-64 h-64 mb-16 flex items-center justify-center">
          <div className={`absolute inset-0 bg-gradient-to-br from-brand-400 to-teal-400 rounded-full shadow-[0_0_80px_rgba(45,212,191,0.4)] transition-all ease-in-out ${getTransitionDuration()} ${getOrbSize()}`} />
          
          <div className="relative z-10 flex flex-col items-center justify-center text-white mix-blend-overlay">
             <Wind className="w-16 h-16 mb-4" />
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center">
          <h2 className={`text-6xl font-black text-white tracking-tight mb-4 transition-all duration-500 ${phase === 'intro' ? 'opacity-50' : 'opacity-100'}`}>
            {getMessage()}
          </h2>
          {phase !== 'intro' && (
            <div className="text-4xl font-mono font-bold text-brand-400 bg-brand-500/10 px-8 py-2 rounded-full border border-brand-500/30 inline-block shadow-[0_0_30px_rgba(14,165,233,0.3)]">
              {timeLeft}
            </div>
          )}
        </div>
        
        {/* Progress Metrics */}
        <div className="absolute bottom-16 text-center">
          <p className="text-slate-400 font-medium tracking-widest uppercase text-sm mb-2">Cycles Completed</p>
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full transition-all duration-500 ${i < cycles ? 'bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.8)] scale-125' : 'bg-slate-800'}`} 
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
