'use client';

import { useState, useEffect } from 'react';
import { 
  Headset, 
  Activity, 
  Video, 
  ShieldAlert, 
  MapPin, 
  CheckCircle2,
  XCircle,
  Stethoscope,
  ChevronRight,
  BrainCircuit,
  PhoneForwarded,
  AlertTriangle,
  User,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const MOCK_ONLINE_CLINICIANS = [
  { id: 1, name: "Alexander Marshi, AMFT", spec: "Anxiety & Panic", status: "online", matchScore: 98 },
  { id: 2, name: "Dr. Sarah Chen", spec: "Trauma & PTSD", status: "online", matchScore: 85 },
  { id: 3, name: "Michael Ross, LCSW", spec: "Depression", status: "in-session", matchScore: 45 },
];

export default function IntakeDispatch() {
  const [status, setStatus] = useState<'standby' | 'incoming' | 'assessment' | 'routing'>('standby');
  const [matchTimer, setMatchTimer] = useState(30);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState(false);

  // Simulate an incoming match after 5 seconds on standby
  useEffect(() => {
    if (status === 'standby') {
      const timer = setTimeout(() => setStatus('incoming'), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Countdown timer for incoming match
  useEffect(() => {
    if (status === 'incoming' && matchTimer > 0) {
      const timer = setInterval(() => setMatchTimer(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (matchTimer === 0 && status === 'incoming') {
      setStatus('standby'); // Missed it
      setMatchTimer(30);
    }
  }, [status, matchTimer]);

  // Simulate active transcript when in assessment mode
  useEffect(() => {
    if (status === 'assessment') {
      const lines = [
        "Patient: I've just been feeling incredibly overwhelmed lately, like my chest is tight all the time.",
        "Intake: I hear you. How long have you been experiencing this tightness?",
        "Patient: It started about two weeks ago, but today it was so bad I couldn't go to work. I feel like I'm having a panic attack.",
        "Intake: I understand. That sounds very difficult. Are you in a safe place right now?",
        "Patient: Yes, I'm at home in my bedroom.",
        "Intake: Okay. We have some excellent clinicians available right now who specialize in anxiety and panic responses. I'm going to connect you."
      ];
      
      let currentLine = 0;
      const interval = setInterval(() => {
        if (currentLine < lines.length) {
          setTranscript(prev => [...prev, lines[currentLine]]);
          if (currentLine === 2) setAiSuggestions(true); // Trigger AI after key symptom
          currentLine++;
        } else {
          clearInterval(interval);
        }
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Headset className={cn("h-8 w-8", status === 'standby' ? "text-slate-400" : "text-brand-400 animate-pulse")} />
            Intake Coordinator Dashboard
          </h1>
          <p className="text-slate-400 mt-1">Live clinical triage and AI-assisted patient routing.</p>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
          <div className="px-4 py-2 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              {status !== 'routing' && status !== 'assessment' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
              <span className={cn("relative inline-flex rounded-full h-3 w-3", (status === 'routing' || status === 'assessment') ? "bg-amber-500" : "bg-emerald-500")}></span>
            </span>
            <span className="text-sm font-medium text-slate-300">
              {status === 'assessment' ? 'In Assessment' : 'Accepting Calls'}
            </span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <Button 
            variant="ghost" 
            className="text-slate-400 hover:text-white"
            onClick={() => {
              setStatus('standby');
              setMatchTimer(30);
              setTranscript([]);
              setAiSuggestions(false);
            }}
          >
            Reset Demo
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[700px]">
        
        {/* Left/Main Column - Video/Status */}
        <div className="lg:col-span-2 relative rounded-3xl border border-slate-800 bg-slate-900/50 overflow-hidden flex flex-col">
          
          {status === 'standby' && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-[600px] h-[600px] border border-brand-500/30 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <div className="absolute w-[400px] h-[400px] border border-brand-500/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] animation-delay-1000" />
              </div>
              <div className="text-center z-10 animate-in fade-in zoom-in-95">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 border border-slate-800 mb-6 shadow-xl">
                  <Headset className="h-10 w-10 text-slate-500" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">Standing By</h2>
                <p className="text-slate-400 max-w-sm mx-auto">
                  Waiting for incoming triage requests from the Instant Care portal.
                </p>
              </div>
            </div>
          )}

          {status === 'incoming' && (
            <div className="absolute inset-0 bg-brand-950/40 backdrop-blur-md z-10 flex items-center justify-center p-6 animate-in fade-in duration-300">
              <div className="absolute inset-4 rounded-3xl border-2 border-brand-500/50 animate-pulse pointer-events-none shadow-[0_0_50px_rgba(14,165,233,0.2)]" />
              
              <div className="bg-slate-900 border-2 border-brand-500 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl shadow-brand-500/20 animate-in zoom-in-95 duration-500">
                <div className="bg-gradient-to-r from-brand-600 to-indigo-600 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <PhoneForwarded className="h-6 w-6 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Incoming Triage Call</h3>
                      <p className="text-brand-100 text-sm font-medium">Instant Care Portal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-3xl font-mono font-bold tracking-tighter", matchTimer <= 10 ? "text-rose-300" : "text-white")}>
                      00:{matchTimer.toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>

                <div className="p-8 text-center space-y-6">
                  <p className="text-slate-300 text-lg">A patient is waiting for an initial assessment before being routed to a clinician.</p>
                  
                  <Button 
                    size="lg" 
                    className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white text-xl rounded-2xl shadow-lg shadow-emerald-900/50"
                    onClick={() => setStatus('assessment')}
                  >
                    <Video className="mr-3 h-6 w-6" />
                    Accept & Begin Assessment
                  </Button>
                </div>
              </div>
            </div>
          )}

          {(status === 'assessment' || status === 'routing') && (
            <div className="flex-1 flex flex-col p-6 animate-in fade-in duration-500">
              {/* Video Placeholder Area */}
              <div className="flex-1 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden mb-6 flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950" />
                <User className="h-24 w-24 text-slate-700 relative z-10 mb-4" />
                <p className="text-slate-500 text-lg relative z-10">Patient Video Feed Active</p>
                
                {/* Coordinator PIP */}
                <div className="absolute bottom-6 right-6 w-48 h-32 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center overflow-hidden shadow-2xl">
                   <div className="absolute inset-0 bg-brand-900/20" />
                   <User className="h-10 w-10 text-slate-500" />
                   <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-0.5 rounded text-[10px] text-white">You</div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex gap-4">
                 <Button 
                    size="lg" 
                    variant="outline"
                    className="flex-1 h-14 border-rose-500/50 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                    onClick={() => setStatus('routing')}
                  >
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Route to Emergency Services
                  </Button>
                  <Button 
                    size="lg" 
                    className="flex-1 h-14 bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/50"
                    onClick={() => setStatus('routing')}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Select Clinician to Route
                  </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - AI Copilot & Routing */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 overflow-hidden flex flex-col relative">
          {status === 'standby' || status === 'incoming' ? (
             <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
               <BrainCircuit className="h-12 w-12 mb-4 opacity-50" />
               <p>AI Copilot will activate once an assessment begins.</p>
             </div>
          ) : (
            <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 duration-500">
              <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center gap-2 sticky top-0 z-10">
                <BrainCircuit className="h-5 w-5 text-indigo-400" />
                <h3 className="font-semibold text-white">AI Copilot</h3>
                <span className="ml-auto flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                
                {/* Live Transcript Analysis */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Live Transcript</h4>
                  <div className="space-y-3">
                    {transcript.map((line, i) => (
                      <div key={i} className={cn("text-sm p-3 rounded-xl", line.startsWith("Patient:") ? "bg-slate-800 text-slate-300" : "bg-brand-950/30 text-brand-200 border border-brand-900/50")}>
                        {line}
                      </div>
                    ))}
                    {transcript.length === 0 && <p className="text-sm text-slate-500 italic">Listening...</p>}
                  </div>
                </div>

                {/* AI Routing Suggestions */}
                {aiSuggestions && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                      <Activity className="h-3.5 w-3.5 text-emerald-400" />
                      Suggested Routing
                    </h4>
                    <div className="space-y-3">
                       {MOCK_ONLINE_CLINICIANS.map((clinician) => (
                         <div key={clinician.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                           <div className="flex justify-between items-start mb-2">
                             <div>
                               <div className="font-medium text-white">{clinician.name}</div>
                               <div className="text-xs text-brand-400 mt-0.5">{clinician.spec}</div>
                             </div>
                             <div className="text-right">
                               <div className="text-emerald-400 font-bold text-sm">{clinician.matchScore}% Match</div>
                               <div className={cn("text-xs flex items-center gap-1 mt-1 justify-end", clinician.status === 'online' ? "text-emerald-500" : "text-amber-500")}>
                                 <div className={cn("h-1.5 w-1.5 rounded-full", clinician.status === 'online' ? "bg-emerald-500" : "bg-amber-500")} />
                                 {clinician.status === 'online' ? 'Online Now' : 'In Session'}
                               </div>
                             </div>
                           </div>
                           <Button 
                             className={cn("w-full h-8 mt-2 text-xs", clinician.status === 'online' ? "bg-indigo-600 hover:bg-indigo-500 text-white" : "bg-slate-800 text-slate-400")}
                             disabled={clinician.status !== 'online'}
                             onClick={() => {
                               setStatus('standby');
                               setTranscript([]);
                               setAiSuggestions(false);
                             }}
                           >
                             Route Call
                           </Button>
                         </div>
                       ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
