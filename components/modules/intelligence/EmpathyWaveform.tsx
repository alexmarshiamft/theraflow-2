'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, FastForward, Rewind, Activity, HeartPulse, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock transcripts mapped to sentiment thresholds
const TRANSCRIPTS = [
  { sentiment: 0.9, text: "I've been feeling completely overwhelmed and unable to sleep.", insight: "High Cognitive Load / Elevated Stress", color: "bg-red-500", glow: "shadow-[0_0_15px_rgba(239,68,68,0.7)]" },
  { sentiment: 0.7, text: "Whenever he talks to me like that, my chest tightens up.", insight: "Somatic Anxiety Response", color: "bg-rose-500", glow: "shadow-[0_0_15px_rgba(244,63,94,0.7)]" },
  { sentiment: 0.4, text: "I guess I just need to figure out my next steps.", insight: "Moderate Uncertainty", color: "bg-amber-400", glow: "shadow-[0_0_15px_rgba(251,191,36,0.7)]" },
  { sentiment: 0.1, text: "Yeah, work was okay this week. Nothing crazy.", insight: "Baseline / Neutral", color: "bg-teal-400", glow: "shadow-[0_0_15px_rgba(45,212,191,0.7)]" },
  { sentiment: -0.5, text: "I actually used the breathing technique we talked about.", insight: "Positive Coping Mechanism", color: "bg-brand-400", glow: "shadow-[0_0_15px_rgba(56,189,248,0.7)]" },
  { sentiment: -0.9, text: "I'm really proud of how I handled the situation.", insight: "High Emotional Regulation", color: "bg-indigo-400", glow: "shadow-[0_0_15px_rgba(129,140,248,0.7)]" },
];

export default function EmpathyWaveform() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate the waveform data once
  const [bars] = useState(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      // Create a nice looking wave using sin functions
      const baseHeight = Math.sin(i * 0.2) * 30 + 50; 
      const noise = Math.random() * 20 - 10;
      
      // Create some dramatic spikes for "high stress" moments
      const isSpike = Math.random() > 0.85;
      const height = isSpike ? baseHeight + 40 + Math.random() * 20 : baseHeight + noise;
      
      // Determine sentiment based on height (taller = more stress/cognitive load)
      const normalizedHeight = Math.min(Math.max(height / 120, 0), 1);
      
      // Map to a transcript
      let transcriptObj = TRANSCRIPTS[3]; // default neutral
      if (normalizedHeight > 0.8) transcriptObj = TRANSCRIPTS[0];
      else if (normalizedHeight > 0.65) transcriptObj = TRANSCRIPTS[1];
      else if (normalizedHeight > 0.5) transcriptObj = TRANSCRIPTS[2];
      else if (normalizedHeight < 0.3) transcriptObj = TRANSCRIPTS[5];
      else if (normalizedHeight < 0.45) transcriptObj = TRANSCRIPTS[4];

      return {
        id: i,
        height: Math.max(10, Math.min(100, height)), // 10% to 100%
        ...transcriptObj
      };
    });
  });

  // Playback simulation
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 0.5;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-full min-h-[600px] flex flex-col bg-[#030303] rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(14,165,233,0.1)] overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Activity className="h-6 w-6 text-brand-400" />
            Empathy Engine
          </h2>
          <p className="text-sm text-white/50 mt-1">Live Voice Biomarker & Sentiment Analysis</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
            <HeartPulse className="h-4 w-4 text-red-400" />
            <span className="text-xs font-semibold text-red-400">High Risk Detected</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20">
            <Brain className="h-4 w-4 text-brand-400" />
            <span className="text-xs font-semibold text-brand-400">Analysis Active</span>
          </div>
        </div>
      </div>

      {/* Waveform Canvas */}
      <div className="flex-1 relative flex items-center justify-center p-12 overflow-visible z-10" ref={containerRef}>
        
        {/* The Bars */}
        <div className="w-full h-64 flex items-end justify-between gap-[2px] sm:gap-1 relative">
          
          {/* Playhead Overlay */}
          <div 
            className="absolute top-0 bottom-0 left-0 bg-white/5 backdrop-blur-[1px] border-r border-brand-400 shadow-[2px_0_15px_rgba(56,189,248,0.5)] z-20 pointer-events-none transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />

          {bars.map((bar, i) => {
            const isHovered = hoveredIndex === i;
            const isPast = (i / bars.length) * 100 < progress;
            
            return (
              <div 
                key={bar.id}
                className="relative flex-1 group h-full flex flex-col justify-end"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl z-50 pointer-events-none">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn("w-2 h-2 rounded-full", bar.color, bar.glow)} />
                      <span className="text-xs font-bold text-white/90 uppercase tracking-wider">{bar.insight}</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed font-serif italic">
                      "{bar.text}"
                    </p>
                    {/* Timestamp mock */}
                    <div className="mt-3 text-[10px] text-white/40 font-mono">
                      {Math.floor((i / bars.length) * 45)}:{String(Math.floor(((i / bars.length) * 45 * 60) % 60)).padStart(2, '0')}
                    </div>
                  </div>
                )}

                {/* The Bar */}
                <div 
                  className={cn(
                    "w-full rounded-t-sm transition-all duration-300 ease-out cursor-pointer",
                    bar.color,
                    isHovered ? bar.glow : "",
                    isHovered ? "opacity-100" : isPast ? "opacity-100" : "opacity-40 hover:opacity-80"
                  )}
                  style={{ 
                    height: `${bar.height}%`,
                    transform: isHovered ? 'scaleY(1.1) scaleX(1.5)' : 'scale(1)',
                    transformOrigin: 'bottom'
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Player Controls */}
      <div className="p-8 border-t border-white/5 bg-black/20 backdrop-blur-md relative z-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <span className="text-sm font-mono text-white/50">
            {Math.floor((progress / 100) * 45)}:{String(Math.floor(((progress / 100) * 45 * 60) % 60)).padStart(2, '0')}
          </span>
          
          <div className="flex items-center gap-6">
            <button 
              className="p-3 rounded-full hover:bg-white/5 text-white/70 hover:text-white transition-colors"
              onClick={() => setProgress(prev => Math.max(0, prev - 5))}
            >
              <Rewind className="h-5 w-5" />
            </button>
            
            <button 
              className="p-5 rounded-full bg-white text-black hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
            </button>
            
            <button 
              className="p-3 rounded-full hover:bg-white/5 text-white/70 hover:text-white transition-colors"
              onClick={() => setProgress(prev => Math.min(100, prev + 5))}
            >
              <FastForward className="h-5 w-5" />
            </button>
          </div>

          <span className="text-sm font-mono text-white/50">45:00</span>
        </div>
      </div>
    </div>
  );
}
