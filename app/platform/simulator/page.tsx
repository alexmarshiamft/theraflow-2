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
  Zap,
  ShieldCheck,
  Smile
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type GameState = 'setup' | 'playing' | 'event' | 'resolution' | 'gameover' | 'victory';

export default function PracticeSimulator() {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [gameOverReason, setGameOverReason] = useState('');
  
  // Paper Practice Metrics
  const [month, setMonth] = useState(1);
  const [cash, setCash] = useState(15000);
  const [caseload, setCaseload] = useState(0);
  const [health, setHealth] = useState(100);
  const [revenue, setRevenue] = useState(0);
  const [compliance, setCompliance] = useState(100);
  const [morale, setMorale] = useState(100);

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
        { label: 'Use AI Audit Defense (Cost: $0)', effect: { cash: 0, health: 10, compliance: 5, msg: 'Audit passed cleanly thanks to AI!' } },
        { label: 'Hire external consultant (Cost: $2,500)', effect: { cash: -2500, health: 5, compliance: 15, msg: 'Passed, but it cost you.' } },
        { label: 'Ignore it (Risk: Severe)', effect: { cash: -10000, health: -40, compliance: -50, msg: 'You were fined $10,000 and suspended.' } }
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
        { label: 'Hire an Associate (Cost: 40% Split)', effect: { cash: -1000, caseload: 15, revenue: 5000, morale: -5, msg: 'Associate hired! Revenue is up.' } },
        { label: 'Turn them away', effect: { health: -5, morale: -5, msg: 'Lost potential revenue.' } },
        { label: 'Raise your rates', effect: { cash: 2000, caseload: -2, health: 5, morale: 10, msg: 'Lost 2 clients, but margins improved.' } }
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
        { label: 'Take the hit from cash reserves', effect: { cash: -4000, health: -10, morale: -10, msg: 'Cash reserves took a major hit.' } }
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
        { label: 'Open 501c3 (PSLF safety, High setup)', effect: { cash: -2500, health: -10, compliance: 20, msg: 'PSLF clock ticking down! High setup stress, but long-term safety.' } },
        { label: 'Prof. Corp with S-Corp (Best taxes, High cost)', effect: { cash: -3500, revenue: 2000, compliance: 10, msg: 'Tax arbitrage secured. High upfront cost, but optimal for growth.' } },
        { label: 'Sole Proprietor (Fast setup, Worst taxes)', effect: { cash: -200, revenue: 1000, health: -5, compliance: -10, msg: 'Immediate credentialing, but personal liability and self-employment taxes hurt.' } }
      ]
    },
    {
      id: 'rogue_associate',
      type: 'compliance',
      title: 'The Rogue Associate',
      description: 'An audit reveals an associate has been copy-pasting the exact same note for 20 different sessions.',
      impact: 'Severe Compliance Risk',
      icon: ShieldAlert,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      options: [
        { label: 'Fire them immediately', effect: { caseload: -15, revenue: -4000, morale: -15, compliance: 20, msg: 'You fired them. Revenue took a hit and morale dipped, but compliance is secure.' } },
        { label: 'Put them on probation & retrain', effect: { cash: -500, health: -15, compliance: -10, msg: 'You kept them on, but it took hours of your time and increased risk.' } },
        { label: 'Ignore it', effect: { compliance: -40, morale: -5, msg: 'You ignored it. Your compliance rating plummeted.' } }
      ]
    },
    {
      id: 'data_breach',
      type: 'compliance',
      title: 'EHR Data Breach',
      description: 'Your 3rd party scheduling software was hacked. 500 patient records were exposed.',
      impact: 'Catastrophic',
      icon: AlertCircle,
      color: 'text-rose-600',
      bg: 'bg-rose-600/10',
      border: 'border-rose-600/30',
      options: [
        { label: 'Activate Cyber Liability Insurance', effect: { cash: -1000, compliance: -10, health: -20, msg: 'Insurance covered the fines, but your premium skyrocketed.' } },
        { label: 'Pay the HIPAA fines out of pocket', effect: { cash: -15000, compliance: -30, health: -40, msg: 'Devastating financial blow.' } }
      ]
    },
    {
      id: 'viral_marketing',
      type: 'growth',
      title: 'Viral TikTok',
      description: 'A video you posted about ADHD coping mechanisms got 2 million views overnight.',
      impact: 'Massive Growth',
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      options: [
        { label: 'Capitalize: Hire 3 Associates', effect: { cash: -3000, caseload: 45, revenue: 15000, morale: -10, msg: 'Massive growth, but onboarding 3 associates drained your energy.' } },
        { label: 'Launch a passive income course', effect: { cash: 5000, revenue: 2000, msg: 'Course launched! Immediate cash injection.' } },
        { label: 'Ignore it', effect: { health: 10, msg: 'You preserved your peace, but left money on the table.' } }
      ]
    },
    {
      id: 'network_cut',
      type: 'finance',
      title: 'Major Payer Cuts Rates',
      description: 'Optum just announced a 15% rate cut for 90837 across the board.',
      impact: 'Margin Compression',
      icon: DollarSign,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      options: [
        { label: 'Drop Optum and go out-of-network', effect: { caseload: -20, revenue: -3000, morale: 20, health: 15, msg: 'Lost clients, but morale improved significantly without insurance headaches.' } },
        { label: 'Absorb the hit', effect: { revenue: -2000, morale: -10, msg: 'You absorbed the hit. Margins are tighter.' } },
        { label: 'Pass the cut to associates', effect: { morale: -40, msg: 'You protected your margin, but associates are furious.' } }
      ]
    },
    {
      id: 'mutiny',
      type: 'business',
      title: 'Associate Mutiny',
      description: 'Your associates are unhappy with the split and are threatening to leave and take their caseloads.',
      impact: 'Existential Threat',
      icon: Users,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      options: [
        { label: 'Increase their split to 60/40', effect: { revenue: -3000, morale: 40, msg: 'They stayed, but your margins are much slimmer.' } },
        { label: 'Let them leave', effect: { caseload: -30, revenue: -10000, health: -20, msg: 'They left. Huge revenue hit, but you retained control.' } },
        { label: 'Offer them Theraflow Liquid Payroll', effect: { cash: -500, morale: 30, msg: 'Instant access to funds pacified them without changing the split!' } }
      ]
    }
  ];

  useEffect(() => {
    if (gameState !== 'playing' && gameState !== 'resolution') return;

    if (cash < 0) {
      setGameOverReason('Your cash reserves dropped below $0. The practice is bankrupt and you can no longer meet payroll.');
      setGameState('gameover');
    } else if (health <= 0) {
      setGameOverReason('Your health and sanity dropped to 0. You suffered severe burnout and had to close the practice to recover.');
      setGameState('gameover');
    } else if (caseload >= 100 && revenue >= 30000) {
      setGameState('victory');
    }
  }, [cash, health, caseload, revenue, gameState]);

  const handleStart = () => {
    setGameState('playing');
  };

  const advanceMonth = () => {
    setMonth(prev => prev + 1);
    
    // Simulate baseline growth based on setup
    let monthlyRev = revenue;
    if (model === 'cash') monthlyRev += 500;
    if (model === 'insurance') monthlyRev += 1500;
    
    // Passive cash calculation
    setCash(prev => prev + monthlyRev - marketing);

    // Passive mechanics simulation
    if (morale < 40 && caseload > 10) {
      // Risk of losing an associate due to poor morale
      if (Math.random() > 0.6) {
        setCaseload(prev => Math.max(0, prev - 10));
        setRevenue(prev => Math.max(0, prev - 3000));
        setMorale(prev => Math.min(100, prev + 10)); // remaining staff feel slightly better after the tension breaks
      }
    }
    
    // Calculate Random Event Probability
    let eventChance = 0.3; // Base 30%
    if (morale < 50) eventChance += 0.15;
    if (compliance < 50) eventChance += 0.2;

    if (Math.random() < eventChance) {
      let randomEvent;
      
      // Weight certain events based on metrics
      if (morale <= 30 && Math.random() > 0.4) {
        randomEvent = SCENARIOS.find(s => s.id === 'mutiny');
      } else if (compliance <= 30 && Math.random() > 0.4) {
        randomEvent = SCENARIOS.find(s => s.id === 'audit');
      } else {
        randomEvent = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
      }
      
      if (randomEvent) {
        setActiveEvent(randomEvent);
        setGameState('event');
      }
    }
  };

  const handleEventChoice = (option: any) => {
    if (option.effect.cash) setCash(prev => prev + option.effect.cash);
    if (option.effect.health) setHealth(prev => Math.min(100, Math.max(0, prev + option.effect.health)));
    if (option.effect.caseload) setCaseload(prev => Math.max(0, prev + option.effect.caseload));
    if (option.effect.revenue) setRevenue(prev => Math.max(0, prev + option.effect.revenue));
    if (option.effect.compliance) setCompliance(prev => Math.min(100, Math.max(0, prev + option.effect.compliance)));
    if (option.effect.morale) setMorale(prev => Math.min(100, Math.max(0, prev + option.effect.morale)));
    
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
          <div className="flex gap-4 lg:gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Month</span>
              <span className="text-xl font-bold text-white">{month}</span>
            </div>
            <div className="w-px bg-slate-800" />
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Cash</span>
              <span className={cn("text-xl font-bold", cash < 5000 ? "text-rose-400" : "text-emerald-400")}>
                ${cash.toLocaleString()}
              </span>
            </div>
             <div className="w-px bg-slate-800" />
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Health</span>
              <div className="flex items-center gap-2">
                <HeartPulse className={cn("h-4 w-4", health > 70 ? "text-brand-400" : "text-rose-400")} />
                <span className="text-xl font-bold text-white">{health}%</span>
              </div>
            </div>
            <div className="w-px bg-slate-800" />
            <div className="flex flex-col items-end hidden md:flex">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Morale</span>
              <div className="flex items-center gap-2">
                <Smile className={cn("h-4 w-4", morale > 70 ? "text-amber-400" : "text-rose-400")} />
                <span className="text-xl font-bold text-white">{morale}%</span>
              </div>
            </div>
            <div className="w-px bg-slate-800 hidden md:block" />
            <div className="flex flex-col items-end hidden md:flex">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Compliance</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className={cn("h-4 w-4", compliance > 70 ? "text-indigo-400" : "text-rose-400")} />
                <span className="text-xl font-bold text-white">{compliance}%</span>
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
                <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Growth driven by {model}</div>
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
              <h2 className="text-2xl font-bold text-white mb-2">Business is active.</h2>
              <p className="text-slate-400 max-w-md mb-8">
                Your practice is running smoothly. Use the controls below to advance time and see how your metrics hold up over the long term. Watch out for random events!
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

        {/* GAMEOVER PHASE */}
        {gameState === 'gameover' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="max-w-md w-full bg-slate-950 border border-rose-500/30 rounded-3xl p-8 shadow-2xl text-center">
              <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-10 w-10 text-rose-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Practice Closed</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                {gameOverReason}
              </p>
              <div className="space-y-3">
                <div className="text-left bg-slate-900 rounded-xl p-4 text-sm text-slate-400 mb-6 space-y-2">
                  <div className="flex justify-between"><span>Months Survived:</span> <span className="text-white font-bold">{month}</span></div>
                  <div className="flex justify-between"><span>Peak Caseload:</span> <span className="text-white font-bold">{caseload}</span></div>
                </div>
                <Button 
                  size="lg" 
                  onClick={() => window.location.reload()} 
                  className="w-full h-14 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold"
                >
                  Restart Simulation
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* VICTORY PHASE */}
        {gameState === 'victory' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="max-w-md w-full bg-slate-950 border border-emerald-500/30 rounded-3xl p-8 shadow-2xl text-center">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-10 w-10 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Enterprise Scale Achieved!</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Congratulations! You scaled your practice to over 100 active clients with a massive revenue run rate. You are a true God-tier clinic owner.
              </p>
              <div className="text-left bg-slate-900 rounded-xl p-4 text-sm text-slate-400 mb-6 space-y-2">
                <div className="flex justify-between"><span>Time to Scale:</span> <span className="text-white font-bold">{month} Months</span></div>
                <div className="flex justify-between"><span>Final Cash:</span> <span className="text-emerald-400 font-bold">${cash.toLocaleString()}</span></div>
              </div>
              <Button 
                size="lg" 
                onClick={() => window.location.reload()} 
                className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold"
              >
                Play Again
              </Button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
