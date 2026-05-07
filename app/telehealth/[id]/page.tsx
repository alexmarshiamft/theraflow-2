'use client';

import { useParams, useRouter } from 'next/navigation';
import { PhoneOff, Mic, Video, Settings, User, MoreHorizontal, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { AmbientScribe } from '@/components/ui/AmbientScribe';

export default function TelehealthRoom() {
  const params = useParams();
  const router = useRouter();
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const handleEndSession = () => {
    setIsSessionActive(false);
  };

  const handleScribeComplete = () => {
    // Trigger Autonomous Billing Pipeline
    router.push('/dashboard');
  };

  return (
    <div className="flex h-screen flex-col bg-black text-white overflow-hidden relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      {/* Header - Glassmorphic */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 px-4 py-2 rounded-xl shadow-lg flex items-center gap-3">
             <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center shadow-inner">
               <User className="h-4 w-4 text-white" />
             </div>
             <div>
                <h1 className="text-sm font-semibold tracking-wide">Client Session</h1>
                <p className="text-xs text-slate-400 font-mono opacity-80">{params.id}</p>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 px-4 py-2 rounded-xl shadow-lg">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isSessionActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className={`text-xs font-medium tracking-wide uppercase ${isSessionActive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isSessionActive ? 'E2E Encrypted' : 'Session Ended'}
            </span>
          </div>
          <div className="w-px h-4 bg-slate-700 mx-2"></div>
          <span className="text-xs text-slate-400 font-mono">00:42:15</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden z-10 pt-20 pb-28 px-6 gap-6">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col gap-4 relative">
          
          {/* Remote Video (Client) */}
          <div className={`flex-1 bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 flex items-center justify-center relative overflow-hidden shadow-2xl transition-all duration-700 ${!isSessionActive && 'opacity-30 grayscale blur-sm'}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent z-10 pointer-events-none"></div>
            
            {/* Simulated Avatar / Video Feed */}
            <div className="flex flex-col items-center z-10">
              <div className="relative">
                <div className="absolute -inset-4 bg-brand-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="h-32 w-32 rounded-full bg-slate-800 flex items-center justify-center mb-6 border border-slate-600 shadow-2xl relative z-10 overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-700"></div>
                   <User className="h-12 w-12 text-slate-400 relative z-10" />
                </div>
              </div>
              
              {/* Audio Waveform when active */}
              {isSessionActive && !isMuted && (
                <div className="flex items-end justify-center gap-1 h-8 mt-2">
                  <div className="w-1.5 bg-brand-400 rounded-full animate-wave"></div>
                  <div className="w-1.5 bg-brand-400 rounded-full animate-wave-delayed-1"></div>
                  <div className="w-1.5 bg-brand-400 rounded-full animate-wave"></div>
                  <div className="w-1.5 bg-brand-400 rounded-full animate-wave-delayed-2"></div>
                  <div className="w-1.5 bg-brand-400 rounded-full animate-wave-delayed-1"></div>
                </div>
              )}
              
              <p className="text-lg font-medium text-slate-300 mt-4 tracking-wide">
                {isSessionActive ? 'Client is speaking...' : 'Disconnected'}
              </p>
            </div>
          </div>

          {/* Local Video (Provider) - Floating Picture-in-Picture */}
          <div className="absolute bottom-6 right-6 w-48 h-64 bg-slate-800 rounded-2xl border border-slate-600 flex items-center justify-center shadow-2xl z-20 overflow-hidden hover:scale-105 transition-transform cursor-pointer group">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-800"></div>
            <User className="h-12 w-12 text-slate-500 relative z-10" />
            <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[10px] font-medium z-20 flex items-center gap-2">
              You
              {isMuted && <Mic className="h-3 w-3 text-red-400" />}
            </div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
               <Maximize className="h-4 w-4 text-white drop-shadow-md" />
            </div>
          </div>
        </div>

        {/* Ambient Scribe Sidebar */}
        <div className="w-96 shrink-0 z-20 hidden xl:block animate-in slide-in-from-right-8 duration-700 fade-in">
          <div className="h-full rounded-3xl overflow-hidden glass-panel border border-slate-700/50 shadow-2xl">
            <AmbientScribe isSessionActive={isSessionActive} onComplete={handleScribeComplete} />
          </div>
        </div>
      </div>

      {/* Floating Control Bar - VisionOS Style */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
        <div className="glass-panel rounded-full px-4 py-3 flex items-center gap-3 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full h-12 w-12 hover:bg-white/10 transition-colors ${isMuted ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'text-white'}`}
            onClick={() => setIsMuted(!isMuted)}
            disabled={!isSessionActive}
          >
            <Mic className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full h-12 w-12 hover:bg-white/10 transition-colors ${isVideoOff ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'text-white'}`}
            onClick={() => setIsVideoOff(!isVideoOff)}
            disabled={!isSessionActive}
          >
            <Video className="h-5 w-5" />
          </Button>
          
          <div className="w-px h-8 bg-slate-700/50 mx-1"></div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-12 w-12 hover:bg-white/10 text-white transition-colors hidden sm:flex" 
            disabled={!isSessionActive}
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-12 w-12 hover:bg-white/10 text-white transition-colors" 
            disabled={!isSessionActive}
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>

          <div className="w-px h-8 bg-slate-700/50 mx-1"></div>
          
          <Button 
            size="default" 
            className="rounded-full px-6 h-12 bg-red-600/90 hover:bg-red-500 text-white border border-red-500/50 shadow-lg shadow-red-900/20 ml-2 transition-all font-medium"
            onClick={handleEndSession}
            disabled={!isSessionActive}
          >
            <PhoneOff className="h-4 w-4 mr-2" />
            {isSessionActive ? 'End' : 'Ended'}
          </Button>
        </div>
      </div>
    </div>
  );
}
