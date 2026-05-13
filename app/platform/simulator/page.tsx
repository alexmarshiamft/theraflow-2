'use client';

import { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  ShieldAlert, 
  Play, 
  FastForward, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  HeartPulse,
  BrainCircuit,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type GameState = 'setup' | 'playing' | 'event' | 'resolution';

export default function PracticeSimulator() {
  const [gameState, setGameState] = useState<GameState>('setup');
  
  // Paper Practice Metrics
  const [month, setMonth] = useState(1);
  const [cash, setCash] = useState(15000);
  const [caseload, setCaseload] = useState(0);
  const [health, setHealth] = useState(100);
  const [revenue, setRevenue] = useState(0);

  // Setup Options
  const [model, setModel] = useState<'cash' | 'insurance' | 'hybrid'>('hybrid');
  const [marketing, setMarketing] = useState(500);

  // Current Event
  const [activeEvent, setActiveEvent] = useState<any>(null);

  const SCENARIOS = [
    {
      id: 'audit',
      type: 'compliance',
      title: 'Surprise Medicare Audit',
      description: 'You received a records request for 5 patients from Medicare. Your AI notes system is active, but you must submit them by EOD.',
      impact: 'High Risk',
      icon: ShieldAlert,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      options: [
        { label: 'Use AI Audit Defense (Cost: $0)', effect: { cash: 0, health: 10, msg: 'Audit passed cleanly thanks to AI!' } },
        { label: 'Hire external consultant (Cost: $2,500)', effect: { cash: -2500, health: 5, msg: 'Passed, but it cost you.' } },
        { label: 'Ignore it (Risk: Severe)', effect: { cash: -10000, health: -40, msg: 'You were fined $10,000 and suspended.' } }
      ]
    },
    {
      id: 'growth',
      type: 'business',
      title: 'Waitlist Overflow',
      description: 'Your marketing is working too well. You have 15 patients on a waitlist and your caseload is full.',
      impact: 'Opportunity',
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      options: [
        { label: 'Hire an Associate (Cost: 40% Split)', effect: { cash: -1000, caseload: 15, revenue: 5000, msg: 'Associate hired! Revenue is up.' } },
        { label: 'Turn them away', effect: { health: -5, msg: 'Lost potential revenue.' } },
        { label: 'Raise your rates', effect: { cash: 2000, caseload: -2, health: 5, msg: 'Lost 2 clients, but margins improved.' } }
      ]
    },
    {
      id: 'finance',
      type: 'finance',
      title: 'Insurance Clawback',
      description: 'BlueCross claims you were overpaid for 90837 codes last year and is clawing back $4,000 from your next payout.',
      impact: 'Financial Hit',
      icon: DollarSign,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      options: [
        { label: 'Activate Liquid Treasury', effect: { cash: -50, msg: 'Liquid Treasury absorbed the shock for a small fee.' } },
        { label: 'Take the hit from cash reserves', effect: { cash: -4000, health: -10, msg: 'Cash reserves took a major hit.' } }
      ]
    },
    {
      id: 'crossroads',
      type: 'business',
      title: 'The Post-Licensure Crossroads',
      description: 'You hit 3,000 hours! You want to take your clients with you via Triwest credentialing, but how do you structure the new practice?',
      impact: 'Career Defining',
      icon: Briefcase,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/30',
      options: [
        { label: 'Open 501c3 (PSLF safety, High setup)', effect: { cash: -2500, health: -10, msg: 'PSLF clock ticking down! High setup stress, but long-term safety.' } },
        { label: 'Prof. Corp with S-Corp (Best taxes, High cost)', effect: { cash: -3500, revenue: 2000, msg: 'Tax arbitrage secured. High upfront cost, but optimal for growth.' } },
        { label: 'Sole Proprietor (Fast setup, Worst taxes)', effect: { cash: -200, revenue: 1000, health: -5, msg: 'Immediate credentialing, but personal liability and self-employment taxes hurt.' } }
      ]
    }
  ];

  const handleStart = () => {
    setGameState('playing');
  };

  const advanceMonth = () => {
    // Simulate baseline growth based on setup
    setMonth(prev => prev + 1);
    setCash(prev => prev + revenue - marketing);
    
    // 30% chance of a random event each month
    if (Math.random() > 0.6) {
      const randomEvent = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
      setActiveEvent(randomEvent);
      setGameState('event');
    }
  };

  const handleEventChoice = (option: any) => {
    if (option.effect.cash) setCash(prev => prev + option.effect.cash);
    if (option.effect.health) setHealth(prev => Math.min(100, Math.max(0, prev + option.effect.health)));
    if (option.effect.caseload) setCaseload(prev => prev + option.effect.caseload);
    if (option.effect.revenue) setRevenue(prev => prev + option.effect.revenue);
    
    setActiveEvent({ ...activeEvent, resolution: option.effect.msg });
    setGameState('resolution');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Gamepad2 className="h-8 w-8 text-brand-400" />
            Private Practice Simulator
          </h1>
          <p className="text-slate-400 mt-1">Paper trade your business strategy before risking real capital.</p>
        </div>
        
        {/* Status HUD */}
        {gameState !== 'setup' && (
          <div className="flex gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Month</span>
              <span className="text-xl font-bold text-white">{month}</span>
            </div>
            <div className="w-px bg-slate-800" />
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Cash Reserves</span>
              <span className={cn("text-xl font-bold", cash < 5000 ? "text-rose-400" : "text-emerald-400")}>
                ${cash.toLocaleString()}
              </span>
            </div>
             <div className="w-px bg-slate-800" />
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Practice Health</span>
              <div className="flex items-center gap-2">
                <HeartPulse className={cn("h-4 w-4", health > 70 ? "text-brand-400" : "text-rose-400")} />
                <span className="text-xl font-bold text-white">{health}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* State Machine */}
      <div className="relative">
        
        {/* SETUP PHASE */}
        {gameState === 'setup' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Configure Your "Paper" Practice</h2>
              
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Practice Model</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'cash', label: 'Cash Only', desc: 'Lower volume, higher margins' },
                    { id: 'insurance', label: 'Insurance', desc: 'High volume, lower margins' },
                    { id: 'hybrid', label: 'Hybrid', desc: 'Balanced approach' }
                  ].map(m => (
                    <button 
                      key={m.id}
                      onClick={() => setModel(m.id as any)}
                      className={cn(
                        "p-4 rounded-2xl border text-left transition-all",
                        model === m.id 
                          ? "bg-brand-500/10 border-brand-500/50 shadow-[0_0_15px_rgba(14,165,233,0.15)]" 
                          : "bg-slate-900 border-slate-800 hover:border-slate-700"
                      )}
                    >
                      <div className={cn("font-bold mb-1", model === m.id ? "text-brand-400" : "text-white")}>{m.label}</div>
                      <div className="text-xs text-slate-500 leading-tight">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Monthly Ad Spend: ${marketing}</h3>
                <input 
                  type="range" 
                  min="0" 
                  max="2000" 
                  step="100"
                  value={marketing}
                  onChange={(e) => setMarketing(parseInt(e.target.value))}
                  className="w-full accent-brand-500"
                />
              </div>

            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="h-10 w-10 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ready to Launch?</h3>
              <p className="text-slate-400 mb-8 max-w-sm">
                You're starting with $15,000 in simulated capital. Manage your cash flow, handle clinical emergencies, and grow your caseload.
              </p>
              <Button size="lg" onClick={handleStart} className="h-14 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl px-12 text-lg font-bold shadow-lg shadow-brand-900/20">
                <Play className="mr-2 h-5 w-5" />
                Start Simulation
              </Button>
            </div>
          </div>
        )}

        {/* PLAYING PHASE */}
        {gameState === 'playing' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><DollarSign className="w-24 h-24" /></div>
                <h3 className="text-slate-400 text-sm font-bold mb-1">Monthly Run Rate</h3>
                <div className="text-3xl font-bold text-white">${revenue.toLocaleString()}/mo</div>
                <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Projected stable</div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Users className="w-24 h-24" /></div>
                <h3 className="text-slate-400 text-sm font-bold mb-1">Active Caseload</h3>
                <div className="text-3xl font-bold text-white">{caseload} <span className="text-sm text-slate-500">clients</span></div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Activity className="w-24 h-24" /></div>
                <h3 className="text-slate-400 text-sm font-bold mb-1">Burn Rate</h3>
                <div className="text-3xl font-bold text-white">${marketing.toLocaleString()}/mo</div>
                <div className="text-xs text-slate-500 mt-2">Marketing & Overhead</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/20 to-brand-900/20 border border-indigo-500/20 rounded-3xl p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center mb-4">
                <BrainCircuit className="h-8 w-8 text-brand-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Business is stable.</h2>
              <p className="text-slate-400 max-w-md mb-8">
                Your practice is running smoothly. Use the controls below to advance time and see how your metrics hold up over the long term.
              </p>
              
              <Button size="lg" onClick={advanceMonth} className="h-14 bg-white text-slate-950 hover:bg-slate-100 rounded-2xl px-8 font-bold shadow-xl shadow-white/5">
                <FastForward className="mr-2 h-5 w-5" />
                Advance 1 Month
              </Button>
            </div>

          </div>
        )}

        {/* EVENT PHASE */}
        {gameState === 'event' && activeEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className={cn("max-w-2xl w-full bg-slate-950 border rounded-3xl p-8 shadow-2xl relative overflow-hidden", activeEvent.border)}>
              
              <div className={cn("absolute top-0 left-0 w-full h-2", activeEvent.bg)} />
              
              <div className="flex items-start gap-6">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border", activeEvent.bg, activeEvent.border)}>
                  <activeEvent.icon className={cn("h-8 w-8", activeEvent.color)} />
                </div>
                <div className="flex-1 pt-1">
                  <div className={cn("text-xs font-bold uppercase tracking-wider mb-1", activeEvent.color)}>
                    {activeEvent.impact}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">{activeEvent.title}</h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8">
                    {activeEvent.description}
                  </p>

                  <div className="space-y-3">
                    {activeEvent.options.map((opt: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => handleEventChoice(opt)}
                        className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-700 transition-colors group flex items-center justify-between"
                      >
                        <span className="font-medium text-white">{opt.label}</span>
                        <Zap className="h-4 w-4 text-slate-600 group-hover:text-brand-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* RESOLUTION PHASE */}
        {gameState === 'resolution' && activeEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Scenario Resolved</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                {activeEvent.resolution}
              </p>
              <Button 
                size="lg" 
                onClick={() => {
                  setActiveEvent(null);
                  setGameState('playing');
                }} 
                className="w-full h-14 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold"
              >
                Continue Simulation
              </Button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
