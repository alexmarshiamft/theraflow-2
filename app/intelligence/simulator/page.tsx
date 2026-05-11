'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Activity, ArrowLeft, Bot, BrainCircuit, HeartPulse, Send, 
  ShieldAlert, User, Zap, Sparkles 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

interface Message {
  id: string;
  role: 'therapist' | 'patient' | 'system';
  content: string;
  dysregulationImpact?: number;
}

interface Choice {
  id: string;
  text: string;
  impact: number;
}

const SIMULATION_SCENARIOS = [
  {
    initialMessage: "I don't even know why I'm here. My partner forced me to come. Nothing you say is going to fix my life anyway.",
    choices: [
      { id: 'c1', text: "It sounds like you're feeling really frustrated and hopeless about being here today.", impact: -15 },
      { id: 'c2', text: "Well, since you're here, we might as well try to figure out what's wrong.", impact: 25 },
      { id: 'c3', text: "If you don't want to be here, you can always leave. It's your choice.", impact: 35 },
    ]
  },
  {
    initialMessage: "They just don't understand the pressure I'm under! Everything is falling apart, and if I don't fix it right now, I'm going to lose my job!",
    choices: [
      { id: 'c4', text: "You have to calm down. Getting worked up isn't going to help you keep your job.", impact: 30 },
      { id: 'c5', text: "Take a deep breath. Let's look at the facts of the situation rationally.", impact: 10 },
      { id: 'c6', text: "That sounds incredibly overwhelming. It makes sense you're feeling panicked right now.", impact: -20 },
    ]
  },
  {
    initialMessage: "Whatever. You're just like every other therapist I've seen. You sit there, nod, and pretend to care.",
    choices: [
      { id: 'c7', text: "I actually do care. Why would you assume I don't?", impact: 15 },
      { id: 'c8', text: "It makes sense you'd feel guarded if that's been your experience in the past. I want this to be different for you.", impact: -25 },
      { id: 'c9', text: "Let's focus on your treatment plan instead of my intentions.", impact: 20 },
    ]
  }
];

export default function ClinicalSimulator() {
  const router = useRouter();
  const [dysregulationLevel, setDysregulationLevel] = useState(65); // 0-100 scale
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm0', role: 'system', content: 'Simulation Initiated: High-Acuity Client (Borderline Traits). Goal: De-escalate and build rapport.' },
    { id: 'm1', role: 'patient', content: SIMULATION_SCENARIOS[0].initialMessage }
  ]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleChoiceSelect = (choice: Choice) => {
    // Add therapist message
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'therapist', content: choice.text, dysregulationImpact: choice.impact }]);
    
    // Adjust dysregulation
    const newLevel = Math.max(0, Math.min(100, dysregulationLevel + choice.impact));
    setDysregulationLevel(newLevel);
    
    // Simulate patient response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let nextResponse = "";
      
      if (newLevel > 80) {
        nextResponse = "See?! You're not even listening to me! This is exactly what I'm talking about. I'm done with this!";
      } else if (newLevel > 50) {
        nextResponse = "I mean... maybe. But it's still so hard. I just don't know what to do.";
      } else {
        nextResponse = "Yeah... exactly. It's just really hard. I appreciate you actually hearing me out.";
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'patient', content: nextResponse }]);

      // Move to next scenario if available and not maxed out
      if (newLevel <= 80 && currentScenarioIndex < SIMULATION_SCENARIOS.length - 1) {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setCurrentScenarioIndex(prev => prev + 1);
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'patient', content: SIMULATION_SCENARIOS[currentScenarioIndex + 1].initialMessage }]);
          }, 1500);
        }, 2000);
      }
    }, 1500);
  };

  const getMeterColor = () => {
    if (dysregulationLevel < 40) return 'from-emerald-500 to-emerald-400';
    if (dysregulationLevel < 70) return 'from-amber-500 to-amber-400';
    return 'from-rose-600 to-rose-400';
  };

  const getMeterShadow = () => {
    if (dysregulationLevel < 40) return 'shadow-[0_0_20px_rgba(16,185,129,0.4)]';
    if (dysregulationLevel < 70) return 'shadow-[0_0_20px_rgba(245,158,11,0.4)]';
    return 'shadow-[0_0_30px_rgba(225,29,72,0.6)] animate-pulse';
  };

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-white overflow-hidden relative font-sans">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-fuchsia-600/5 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Header */}
      <div className="relative z-20 px-8 py-5 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/intelligence')}
            className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-fuchsia-500/10 text-fuchsia-400 rounded-lg border border-fuchsia-500/20">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Clinical Roleplay Simulator
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30">Beta</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">De-escalation Training Module</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Activity className="w-4 h-4 text-brand-400" />
            Session ID: SIM-9482
          </div>
          <Button variant="outline" className="border-slate-700 bg-slate-900/50 text-slate-300 hover:text-white" onClick={() => window.location.reload()}>
            Reset Simulation
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden z-10 p-8 gap-8 max-w-7xl mx-auto w-full">
        
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/60 shadow-2xl overflow-hidden relative">
          
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex w-full ${msg.role === 'therapist' ? 'justify-end' : msg.role === 'system' ? 'justify-center' : 'justify-start'}`}
              >
                {msg.role === 'system' && (
                  <div className="bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs px-4 py-2 rounded-full font-medium tracking-wide flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    {msg.content}
                  </div>
                )}
                
                {msg.role === 'patient' && (
                  <div className="flex gap-4 max-w-[80%] animate-in slide-in-from-left-4 fade-in duration-500">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 shadow-lg">
                      <Bot className="w-5 h-5 text-slate-300" />
                    </div>
                    <div className="bg-slate-800/80 border border-slate-700/50 p-4 rounded-2xl rounded-tl-sm shadow-md">
                      <p className="text-slate-200 leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                )}
                
                {msg.role === 'therapist' && (
                  <div className="flex gap-4 max-w-[80%] animate-in slide-in-from-right-4 fade-in duration-300">
                    <div className="flex flex-col items-end gap-1">
                      <div className="bg-brand-600/90 border border-brand-500/50 p-4 rounded-2xl rounded-tr-sm shadow-lg shadow-brand-900/20">
                        <p className="text-white leading-relaxed">{msg.content}</p>
                      </div>
                      {msg.dysregulationImpact !== undefined && (
                        <span className={`text-[10px] font-bold tracking-wider ${msg.dysregulationImpact < 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {msg.dysregulationImpact < 0 ? 'REGULATION IMPROVED' : 'ACUITY ESCALATED'}
                        </span>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand-900 border border-brand-500/30 flex items-center justify-center shrink-0 shadow-lg">
                      <User className="w-5 h-5 text-brand-300" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-4 max-w-[80%] animate-in fade-in duration-300">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-slate-400" />
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input / Choice Area */}
          <div className="p-6 bg-slate-900/80 border-t border-slate-800/60 backdrop-blur-xl">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Zap className="w-3 h-3 text-amber-400" /> Select Clinical Response
            </p>
            <div className="flex flex-col gap-3">
              {SIMULATION_SCENARIOS[currentScenarioIndex]?.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceSelect(choice)}
                  disabled={isTyping || dysregulationLevel > 80}
                  className="w-full text-left p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-brand-500/50 transition-all duration-200 text-sm text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed group flex justify-between items-center"
                >
                  <span className="leading-relaxed pr-4">{choice.text}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Send className="w-3 h-3 text-brand-400 ml-0.5" />
                  </div>
                </button>
              ))}
              {dysregulationLevel > 80 && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center flex items-center justify-center gap-2">
                  <ShieldAlert className="w-4 h-4" /> Simulation Terminated: Client Disengaged. Reset to try again.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dysregulation Meter Sidebar */}
        <div className="w-[320px] shrink-0 flex flex-col gap-6">
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/60 p-6 shadow-xl flex flex-col items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
            
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-8 flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-rose-400" /> Dysregulation Meter
            </h3>
            
            {/* The Meter */}
            <div className="relative w-16 h-64 bg-slate-800/80 rounded-full border border-slate-700/50 overflow-hidden shadow-inner flex flex-col justify-end">
              {/* Markers */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between py-4 pointer-events-none">
                <div className="w-full h-px bg-slate-600/30"></div>
                <div className="w-full h-px bg-slate-600/30"></div>
                <div className="w-full h-px bg-slate-600/30"></div>
                <div className="w-full h-px bg-slate-600/30"></div>
              </div>
              
              <div 
                className={`w-full rounded-full bg-gradient-to-t ${getMeterColor()} transition-all duration-1000 ease-out relative ${getMeterShadow()}`}
                style={{ height: `${dysregulationLevel}%` }}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-white/30 rounded-t-full"></div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="text-4xl font-black font-mono tracking-tighter text-white mb-1">
                {dysregulationLevel}
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Acuity Index</p>
            </div>
            
            <div className="mt-6 w-full p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs text-slate-400 leading-relaxed text-center">
              {dysregulationLevel < 40 ? 
                "Client is demonstrating emotional regulation and receptivity to cognitive restructuring." : 
                dysregulationLevel < 70 ? 
                "Client is experiencing moderate distress. Empathic validation recommended." : 
                "CRITICAL: Amygdala hijack detected. High risk of treatment dropout or escalation."}
            </div>
          </div>
          
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/60 p-6 shadow-xl relative overflow-hidden">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">Live Biomarkers</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Vocal Tremor</span>
                  <span className="text-rose-400 font-mono">{(dysregulationLevel * 0.8).toFixed(1)}Hz</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 transition-all duration-500" style={{ width: `${dysregulationLevel}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Speech Rate</span>
                  <span className="text-amber-400 font-mono">{100 + dysregulationLevel * 1.5} wpm</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${Math.min(100, (100 + dysregulationLevel * 1.5) / 2.5)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
