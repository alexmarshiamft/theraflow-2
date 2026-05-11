'use client';

import { useParams, useRouter } from 'next/navigation';
import { 
  PhoneOff, Mic, Video, Settings, User, MoreHorizontal, Maximize,
  MessageSquare, PenTool, Activity, ShieldCheck, Heart, Wind, MicOff, Lock, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { AmbientScribe } from '@/components/ui/AmbientScribe';
import { AmbientAssistant } from '@/components/modules/telehealth/AmbientAssistant';
import { useStore } from '@/lib/store';
import ChimeRoomWrapper from '@/components/modules/telehealth/ChimeRoomWrapper';
import { validateVASessionRequirements } from '@/lib/compliance';
import GroundingSandbox from '@/components/modules/telehealth/GroundingSandbox';

type SidebarTab = 'notes' | 'vitals' | 'whiteboard' | 'chat' | 'ambient';

export default function TelehealthRoom() {
  const params = useParams();
  const router = useRouter();
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeTab, setActiveTab] = useState<SidebarTab>('notes');
  const [isSandboxActive, setIsSandboxActive] = useState(false);
  
  // Pre-session validation
  const [isValidating, setIsValidating] = useState(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { clients, vaAuthorizations } = useStore();

  useEffect(() => {
    // Simulate fetching session and authorization
    const validateSession = async () => {
      setIsValidating(true);
      await new Promise(res => setTimeout(res, 1500)); // Simulating API check
      
      // We assume this is a VA client for demonstration if params.id includes 'VA'
      // Or we just mock a check. Let's say if the ID starts with 'VA', we enforce it.
      // Or we just use a mock client P001 which has a VA auth.
      const client = clients.find(c => c.id === 'P001');
      const auth = vaAuthorizations.find(a => a.clientId === 'P001' && a.status === 'ACTIVE');
      
      // Re-integrated validateVASessionRequirements
      // In a real implementation we would validate against our own internal rules
      const errors = validateVASessionRequirements(client, auth);
      
      setValidationErrors(errors);
      
      setIsValidating(false);
    };

    validateSession();
  }, [clients, vaAuthorizations]);
  
  // Vitals simulation
  const [heartRate, setHeartRate] = useState(72);
  const [hrv, setHrv] = useState(45);
  
  useEffect(() => {
    if (isSessionActive && activeTab === 'vitals') {
      const interval = setInterval(() => {
        setHeartRate(prev => {
          const change = Math.floor(Math.random() * 5) - 2;
          return Math.max(60, Math.min(100, prev + change));
        });
        setHrv(prev => {
          const change = Math.floor(Math.random() * 3) - 1;
          return Math.max(20, Math.min(80, prev + change));
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isSessionActive, activeTab]);

  const handleEndSession = () => {
    setIsSessionActive(false);
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  const handleScribeComplete = () => {
    // Trigger Autonomous Billing Pipeline
    router.push('/ehr/notes');
  };

  return (
    <div className="flex h-screen flex-col bg-black text-white overflow-hidden relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-7000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-10000"></div>
      </div>

      {/* Pre-session blocking modal */}
      {isValidating && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl max-w-md w-full shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8 text-brand-400 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Verifying VA Compliance</h2>
            <p className="text-sm text-slate-400 mb-6">Checking authorizations, CPT approvals, and 1-to-1 session limits...</p>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-brand-500 h-full w-full animate-progress origin-left"></div>
            </div>
          </div>
        </div>
      )}

      {validationErrors.length > 0 && !isValidating && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-slate-900 border border-red-500/50 p-8 rounded-3xl max-w-md w-full shadow-[0_0_50px_rgba(239,68,68,0.2)] flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
              <Lock className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Session Blocked</h2>
            <p className="text-sm text-slate-400 mb-6">This session cannot be initiated due to failed VA/TriWest compliance checks.</p>
            <div className="w-full space-y-2 mb-8">
              {validationErrors.map((err, i) => (
                <div key={i} className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-2 px-3 rounded-lg text-left flex items-start gap-2">
                  <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
                  {err}
                </div>
              ))}
            </div>
            <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white" onClick={() => router.push('/dashboard')}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      )}

      {/* Header - Glassmorphic */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-3 hover:bg-slate-900/80 transition-colors cursor-pointer">
             <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center shadow-inner">
               <User className="h-5 w-5 text-white" />
             </div>
             <div>
                <h1 className="text-sm font-bold tracking-wide text-slate-100">Client Session: {params.id as string}</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className={`h-1.5 w-1.5 rounded-full ${isSessionActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <p className="text-xs text-emerald-400 font-mono font-medium">00:42:15</p>
                </div>
             </div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl shadow-inner flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">E2E Encrypted</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsSandboxActive(!isSandboxActive)}
            className={`gap-2 ${isSandboxActive ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/50' : 'bg-slate-900/60 hover:bg-slate-800 text-indigo-400 border border-indigo-500/30'}`}
          >
            <Wind className="w-4 h-4" />
            {isSandboxActive ? 'End Grounding' : 'Start Grounding Sandbox'}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden z-10 pt-20 pb-28 px-6 gap-6 relative">
        
        {/* Main Video Area mapped to AWS Chime */}
        <ChimeRoomWrapper 
          appointmentId={params.id as string} 
        />
        
        {isSandboxActive && (
          <div className="absolute inset-0 z-30 pt-20 pb-28 px-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-500">
            <GroundingSandbox onClose={() => setIsSandboxActive(false)} />
          </div>
        )}

        {/* Cinematic Side Panel */}
        <div className="w-[400px] shrink-0 z-20 hidden xl:flex flex-col animate-in slide-in-from-right-8 duration-700 fade-in gap-4">
          
          {/* Tab Navigation */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-1.5 flex gap-1 shadow-xl">
            <button 
              onClick={() => setActiveTab('ambient')}
              className={`flex-1 flex items-center justify-center py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'ambient' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
              title="Ambient Intelligence"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveTab('notes')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'notes' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <Mic className="w-4 h-4" /> Notes
            </button>
            <button 
              onClick={() => setActiveTab('vitals')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'vitals' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <Activity className="w-4 h-4" /> Vitals
            </button>
            <button 
              onClick={() => setActiveTab('whiteboard')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'whiteboard' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <PenTool className="w-4 h-4" /> Board
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex items-center justify-center py-2.5 px-3 rounded-xl transition-all ${activeTab === 'chat' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col relative">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
            
            {activeTab === 'ambient' && (
              <AmbientAssistant />
            )}
            
            {activeTab === 'notes' && (
              <div className="h-full">
                <AmbientScribe isSessionActive={isSessionActive} onComplete={handleScribeComplete} />
              </div>
            )}

            {activeTab === 'vitals' && (
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 mb-3 border border-brand-500/30">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Live Patient Vitals</h3>
                  <p className="text-xs text-slate-400 mt-1">Derived from vocal biomarker analysis</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-5 text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><Heart className="w-8 h-8 text-rose-500" /></div>
                    <p className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">Est. Heart Rate</p>
                    <div className="text-4xl font-black text-white font-mono">{heartRate}</div>
                    <p className="text-xs text-slate-500 mt-1 font-mono">BPM</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-5 text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><Wind className="w-8 h-8 text-indigo-500" /></div>
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">HRV Score</p>
                    <div className="text-4xl font-black text-white font-mono">{hrv}</div>
                    <p className="text-xs text-slate-500 mt-1 font-mono">ms</p>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Arousal / Stress Index</p>
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Elevated</span>
                  </div>
                  <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-500 w-[30%]"></div>
                    <div className="h-full bg-amber-500 w-[45%]"></div>
                    <div className="h-full bg-slate-700 flex-1"></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    Vocal tremor and speech rate indicate heightened physiological arousal over the last 3 minutes.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'whiteboard' && (
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">Collaborative Canvas</h3>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-md bg-blue-500 cursor-pointer border-2 border-white/50"></div>
                    <div className="w-6 h-6 rounded-md bg-rose-500 cursor-pointer"></div>
                    <div className="w-6 h-6 rounded-md bg-emerald-500 cursor-pointer"></div>
                    <div className="w-6 h-6 rounded-md bg-white cursor-pointer"></div>
                  </div>
                </div>
                <div className="flex-1 bg-slate-800/30 p-6 flex flex-col items-center justify-center text-center">
                  <PenTool className="w-16 h-16 text-slate-600 mb-4 opacity-50" />
                  <p className="text-slate-400 font-medium">Draw diagrams or CBT charts here.</p>
                  <p className="text-xs text-slate-500 mt-2">Visible to client in real-time.</p>
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-slate-700/50 bg-slate-800/30">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Lock className="w-3 h-3 text-emerald-500" /> Secure Chat
                  </h3>
                </div>
                <div className="flex-1 p-4 overflow-y-auto flex flex-col justify-end gap-3">
                  <div className="bg-slate-800 rounded-2xl rounded-tl-sm p-3 text-sm text-slate-300 self-start max-w-[80%] border border-slate-700/50">
                    Hello, I'm ready for the session.
                  </div>
                  <div className="bg-brand-600 rounded-2xl rounded-tr-sm p-3 text-sm text-white self-end max-w-[80%] shadow-md">
                    Great, I'm admitting you now.
                  </div>
                </div>
                <div className="p-4 bg-slate-800/50 border-t border-slate-700/50">
                  <input type="text" placeholder="Type a message..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
