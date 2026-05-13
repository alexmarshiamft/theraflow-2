'use client';

import { useState, useEffect } from 'react';
import { 
  Radio, 
  Activity, 
  Video, 
  Clock, 
  ShieldAlert, 
  MapPin, 
  CheckCircle2,
  XCircle,
  Stethoscope,
  ChevronRight,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function LiveQueueDispatch() {
  const [status, setStatus] = useState<'standby' | 'incoming' | 'accepted'>('standby');
  const [matchTimer, setMatchTimer] = useState(30);

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

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Radio className={cn("h-8 w-8", status === 'standby' ? "text-slate-400" : "text-brand-400 animate-pulse")} />
            Live Dispatch Queue
          </h1>
          <p className="text-slate-400 mt-1">Accept immediate telehealth sessions to fill your schedule.</p>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
          <div className="px-4 py-2 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              {status !== 'accepted' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
              <span className={cn("relative inline-flex rounded-full h-3 w-3", status === 'accepted' ? "bg-slate-500" : "bg-emerald-500")}></span>
            </span>
            <span className="text-sm font-medium text-slate-300">Accepting Matches</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <Button 
            variant="ghost" 
            className="text-slate-400 hover:text-white"
            onClick={() => {
              setStatus('standby');
              setMatchTimer(30);
            }}
          >
            Reset Demo
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Matches Today", value: "4", icon: Activity, trend: "+2 from yesterday" },
          { label: "Avg Acceptance", value: "12s", icon: Clock, trend: "Top 10% of practice" },
          { label: "Est. Daily Rev", value: "$520", icon: DollarSign, trend: "+$260 from matches" },
          { label: "Patient Rating", value: "4.9", icon: TrendingUp, trend: "Based on 42 sessions" }
        ].map((metric, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <metric.icon className="h-5 w-5 text-brand-400" />
              <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">{metric.trend}</span>
            </div>
            <div className="text-2xl font-bold text-white">{metric.value}</div>
            <div className="text-sm text-slate-400 mt-1">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative min-h-[500px] rounded-3xl border border-slate-800 bg-slate-900/30 overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background Radar Effect for Standby */}
        {status === 'standby' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-[800px] h-[800px] border border-brand-500/30 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute w-[600px] h-[600px] border border-brand-500/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] animation-delay-1000" />
            <div className="absolute w-[400px] h-[400px] border border-brand-500/10 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] animation-delay-2000" />
          </div>
        )}

        {status === 'standby' && (
          <div className="text-center z-10 animate-in fade-in zoom-in-95">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 border border-slate-800 mb-6 shadow-xl">
              <Radio className="h-10 w-10 text-slate-500" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Standing By</h2>
            <p className="text-slate-400 max-w-sm mx-auto">
              You are currently at the top of the queue. We will notify you the moment a patient requests an immediate session.
            </p>
          </div>
        )}

        {status === 'incoming' && (
          <div className="absolute inset-0 bg-brand-950/20 backdrop-blur-sm z-10 flex items-center justify-center p-6 animate-in fade-in duration-300">
            {/* Pulsing Border Effect */}
            <div className="absolute inset-4 rounded-3xl border-2 border-brand-500/50 animate-pulse pointer-events-none shadow-[0_0_50px_rgba(14,165,233,0.2)]" />
            
            <div className="bg-slate-900 border-2 border-brand-500 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-brand-500/20 animate-in zoom-in-95 duration-500">
              
              {/* Card Header */}
              <div className="bg-gradient-to-r from-brand-600 to-indigo-600 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Activity className="h-6 w-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Incoming Match Request</h3>
                    <p className="text-brand-100 text-sm font-medium">Instant Care Portal • High Priority</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn("text-3xl font-mono font-bold tracking-tighter", matchTimer <= 10 ? "text-rose-300" : "text-white")}>
                    00:{matchTimer.toString().padStart(2, '0')}
                  </div>
                  <p className="text-brand-100 text-xs">to accept</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Patient Profile</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Stethoscope className="h-5 w-5 text-brand-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-slate-300 text-sm">Primary Concern</div>
                          <div className="text-white font-medium text-lg">Severe Anxiety & Panic</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <ShieldAlert className="h-5 w-5 text-rose-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-slate-300 text-sm">Acuity Level</div>
                          <div className="text-white font-medium">Moderate (Non-Crisis)</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-slate-300 text-sm">Location</div>
                          <div className="text-white font-medium">San Francisco, CA</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Financial & Coverage</h4>
                    <div className="space-y-4">
                      <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-400 text-sm">Payer</span>
                          <span className="text-white font-medium">Aetna PPO</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-400 text-sm">Copay</span>
                          <span className="text-emerald-400 font-medium">$20.00 (Verified)</span>
                        </div>
                        <div className="h-px w-full bg-slate-800 my-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 text-sm">Est. Payout</span>
                          <span className="text-white font-bold">$130.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="flex-1 h-14 border-slate-700 hover:bg-slate-800 text-slate-300"
                    onClick={() => {
                      setStatus('standby');
                      setMatchTimer(30);
                    }}
                  >
                    <XCircle className="mr-2 h-5 w-5" />
                    Decline Match
                  </Button>
                  <Button 
                    size="lg" 
                    className="flex-[2] h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white border-0 shadow-lg shadow-emerald-500/20 text-lg"
                    onClick={() => setStatus('accepted')}
                  >
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Accept & Enter Room
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {status === 'accepted' && (
          <div className="text-center z-10 animate-in fade-in zoom-in-95">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500 mb-6 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
              <Video className="h-10 w-10 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Match Accepted</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
              The patient has been notified and is joining the secure waiting room. Your session is ready to begin.
            </p>
            <Button size="lg" className="h-14 px-8 bg-white text-slate-950 hover:bg-slate-100 rounded-xl text-lg font-medium">
              Join Telehealth Room
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
