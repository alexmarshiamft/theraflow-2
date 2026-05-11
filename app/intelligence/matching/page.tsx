'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Network, Sparkles, User, Brain, Heart, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

// Mock data
const incomingClient = {
  name: "Anonymous Client",
  needs: ["Trauma-Informed", "CBT", "Anxiety", "LGBTQ+ Affirming"],
  acuity: "High",
  preferredTime: "Evenings"
};

const associates = [
  { id: 1, name: "Dr. Sarah Jenkins", specialty: ["Trauma", "EMDR"], load: 92, match: 98, color: "from-fuchsia-500 to-purple-600" },
  { id: 2, name: "Michael Chang, LMFT", specialty: ["Anxiety", "CBT"], load: 68, match: 85, color: "from-blue-500 to-indigo-600" },
  { id: 3, name: "Emily Thorne, LCSW", specialty: ["LGBTQ+", "Couples"], load: 24, match: 72, color: "from-emerald-400 to-teal-500" },
];

export default function MatchingEnginePage() {
  const [analyzing, setAnalyzing] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalyzing(false);
      setSelectedMatch(1); // Auto-select best match
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-fuchsia-500/20 rounded-xl border border-fuchsia-500/30">
                <Network className="w-6 h-6 text-fuchsia-400" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Alchemy Match Engine</h1>
            </div>
            <p className="text-slate-400">AI-driven predictive client-associate pairing.</p>
          </div>
          {analyzing && (
            <div className="flex items-center gap-2 text-fuchsia-400 animate-pulse bg-fuchsia-500/10 px-4 py-2 rounded-full border border-fuchsia-500/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Synthesizing vectors...</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
          {/* Incoming Client Profile */}
          <div className="col-span-1 section-card p-6 flex flex-col">
            <h2 className="text-lg font-medium text-white border-b border-slate-800 pb-4 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-slate-400" />
              Incoming Intake
            </h2>
            <div className="flex-1 space-y-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Generated Alias</p>
                <p className="text-xl font-medium text-slate-200">{incomingClient.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-2">Clinical Needs Vectors</p>
                <div className="flex flex-wrap gap-2">
                  {incomingClient.needs.map(need => (
                    <span key={need} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300">
                      {need}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-xs text-slate-500 mb-1">Acuity Level</p>
                  <p className="text-rose-400 font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {incomingClient.acuity}
                  </p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-xs text-slate-500 mb-1">Availability</p>
                  <p className="text-slate-300 font-medium">{incomingClient.preferredTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Neural Match Visualization */}
          <div className="col-span-1 lg:col-span-2 relative section-card overflow-hidden flex items-center justify-center">
            {/* Ambient background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-900/20 via-slate-900/10 to-transparent"></div>
            
            {analyzing ? (
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="w-32 h-32 relative">
                  <div className="absolute inset-0 border-4 border-fuchsia-500/30 rounded-full animate-[spin_3s_linear_infinite]" />
                  <div className="absolute inset-2 border-4 border-b-transparent border-l-transparent border-blue-500/50 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-10 h-10 text-fuchsia-400 animate-pulse" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative z-10 w-full h-full p-8 flex flex-col justify-center">
                <h3 className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-widest text-center">Calculated Neural Pairings</h3>
                <div className="space-y-4">
                  {associates.map((associate) => (
                    <button 
                      key={associate.id}
                      onClick={() => setSelectedMatch(associate.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                        selectedMatch === associate.id 
                          ? 'bg-slate-800/80 border-fuchsia-500/50 shadow-[0_0_30px_rgba(217,70,239,0.1)]' 
                          : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      {/* Selection Glow */}
                      {selectedMatch === associate.id && (
                         <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${associate.color}`} />
                      )}

                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${associate.color} flex items-center justify-center shadow-lg`}>
                            <span className="text-white font-bold text-lg">{associate.match}%</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium text-lg">{associate.name}</h4>
                            <div className="flex gap-2 mt-1">
                              {associate.specialty.map(s => (
                                <span key={s} className="text-xs text-slate-400 bg-slate-900/50 px-2 py-0.5 rounded-md">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500 mb-1">Current Load</p>
                          <p className={`text-sm font-medium ${associate.load > 80 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {associate.load}% Capacity
                          </p>
                        </div>
                      </div>

                      {/* Expanded Analysis */}
                      {selectedMatch === associate.id && (
                        <div className="mt-4 pt-4 border-t border-slate-700/50 relative z-10 animate-in fade-in slide-in-from-top-4 duration-500">
                           <p className="text-sm text-slate-300 leading-relaxed mb-4">
                             <strong className="text-fuchsia-400 font-medium">Synergy Found:</strong> {associate.name}'s extensive experience in trauma-informed CBT aligns perfectly with the intake's primary vectors. Note: Her capacity is currently high (92%).
                           </p>
                           <button className="w-full flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 py-3 rounded-xl font-medium transition-colors">
                             Assign Client
                             <ArrowRight className="w-4 h-4" />
                           </button>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

function AlertTriangle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <path d="M12 9v4"/>
      <path d="M12 17h.01"/>
    </svg>
  );
}
