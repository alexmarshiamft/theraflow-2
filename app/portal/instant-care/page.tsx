'use client';

import { useState, useEffect } from 'react';
import { 
  HeartHandshake, 
  Search, 
  MapPin, 
  Clock, 
  Video, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight,
  User,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const concerns = [
  "Anxiety & Panic",
  "Depression",
  "Relationship Issues",
  "Trauma & PTSD",
  "Life Transitions",
  "Stress Management"
];

export default function InstantCarePortal() {
  const [phase, setPhase] = useState<'screening' | 'searching' | 'found'>('screening');
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);

  const handleMatch = () => {
    if (!selectedConcern) return;
    setPhase('searching');
    setTimeout(() => {
      setPhase('found');
    }, 4500); // Cinematic 4.5 second radar search
  };

  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 bg-slate-950 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/10 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full opacity-30" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 mb-6 shadow-lg shadow-brand-500/20">
            <HeartHandshake className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            Instant Care Match
          </h1>
          <p className="text-lg text-slate-400 max-w-lg mx-auto">
            Get connected with an available, specialized therapist for a live video session right now.
          </p>
        </div>

        {/* Phase 1: Screening */}
        {phase === 'screening' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">What brings you here today?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {concerns.map((concern) => (
                <button
                  key={concern}
                  onClick={() => setSelectedConcern(concern)}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group",
                    selectedConcern === concern 
                      ? "bg-brand-500/10 border-brand-500 text-brand-400" 
                      : "bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                  )}
                >
                  <span className="font-medium">{concern}</span>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                    selectedConcern === concern ? "border-brand-500 bg-brand-500" : "border-slate-700 group-hover:border-slate-600"
                  )}>
                    {selectedConcern === concern && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                </button>
              ))}
            </div>

            <Button 
              size="lg" 
              className="w-full h-14 text-lg rounded-2xl bg-white text-slate-950 hover:bg-slate-100 transition-colors"
              disabled={!selectedConcern}
              onClick={handleMatch}
            >
              Find Available Therapist
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Phase 2: Searching */}
        {phase === 'searching' && (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-500">
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
              <div className="absolute inset-0 bg-brand-500/20 rounded-full animate-ping duration-1000" />
              <div className="absolute inset-4 bg-brand-500/20 rounded-full animate-ping duration-1000 delay-150" />
              <div className="absolute inset-8 bg-brand-500/20 rounded-full animate-ping duration-1000 delay-300" />
              <div className="relative z-10 w-24 h-24 bg-brand-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(14,165,233,0.5)]">
                <Search className="h-10 w-10 text-white animate-pulse" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Scanning Network...</h3>
            <p className="text-slate-400 text-center max-w-xs h-6 overflow-hidden relative">
              <span className="absolute inset-0 flex items-center justify-center animate-[slide-up_4s_ease-in-out_infinite]">
                <span className="block h-full">Matching specialization: {selectedConcern}...</span>
                <span className="block h-full">Checking current availability...</span>
                <span className="block h-full">Reviewing state licensure...</span>
              </span>
            </p>
          </div>
        )}

        {/* Phase 3: Found */}
        {phase === 'found' && (
          <div className="bg-slate-900/80 border border-brand-500/30 rounded-3xl p-1 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-12 duration-700 shadow-[0_0_100px_rgba(14,165,233,0.15)] relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-500" />
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Match Found & Available Now
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                  <Clock className="h-4 w-4" />
                  Waits less than 2m
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-8">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shrink-0">
                  <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                     <User className="h-10 w-10 text-indigo-400" />
                  </div>
                </div>
                
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">Alexander Marshi, AMFT</h3>
                  <p className="text-brand-400 font-medium mb-4">Therapist • Spec: {selectedConcern}</p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-sm">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      Verified License
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-sm">
                      <Activity className="h-3.5 w-3.5 text-blue-400" />
                      Accepts Insurance
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-sm">
                      <MapPin className="h-3.5 w-3.5 text-rose-400" />
                      California
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800 mb-8">
                <p className="text-slate-300 leading-relaxed text-sm">
                  "Hi there! I have an opening right now and I specialize in working with {selectedConcern?.toLowerCase()}. We can jump into a secure video room immediately to discuss what you're going through and see if we're a good fit."
                </p>
              </div>

              <Button size="lg" className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-500/25 border-0">
                <Video className="mr-2 h-5 w-5" />
                Enter Secure Waiting Room
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
