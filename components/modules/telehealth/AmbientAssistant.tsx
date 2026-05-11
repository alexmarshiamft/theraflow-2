'use client';

import { Activity, Brain, Users, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AmbientAssistant() {
  const [talkRatio, setTalkRatio] = useState({ therapist: 30, client: 70 });
  const [sentiment, setSentiment] = useState(65); // 0-100, 100 is positive
  const [interventions, setInterventions] = useState<string[]>([
    "Client expressing elevated anxiety regarding work.",
    "Consider validating their feelings of overwhelm."
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTalkRatio(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        const newTherapist = Math.max(10, Math.min(90, prev.therapist + change));
        return { therapist: newTherapist, client: 100 - newTherapist };
      });
      
      setSentiment(prev => {
        const change = Math.floor(Math.random() * 7) - 3;
        return Math.max(20, Math.min(90, prev + change));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col h-full bg-slate-900/50">
      <div className="text-center mb-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 mb-3 border border-indigo-500/30">
          <Brain className="w-6 h-6 animate-pulse" />
        </div>
        <h3 className="text-xl font-bold text-white">Ambient Intelligence</h3>
        <p className="text-xs text-slate-400 mt-1">Real-time session analytics</p>
      </div>

      {/* Talk Ratio */}
      <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            Talk-Time Ratio
          </h4>
          <span className="text-xs font-medium text-emerald-400">Optimal</span>
        </div>
        <div className="h-4 w-full flex rounded-full overflow-hidden bg-slate-900">
          <div 
            className="bg-brand-500 transition-all duration-1000 ease-in-out" 
            style={{ width: `${talkRatio.therapist}%` }}
          />
          <div 
            className="bg-fuchsia-500 transition-all duration-1000 ease-in-out" 
            style={{ width: `${talkRatio.client}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs font-medium">
          <span className="text-brand-400">Therapist ({talkRatio.therapist}%)</span>
          <span className="text-fuchsia-400">Client ({talkRatio.client}%)</span>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-center justify-between mb-4 relative z-10">
          <h4 className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            Vocal Sentiment
          </h4>
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${sentiment > 50 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
            {sentiment > 50 ? 'Stabilizing' : 'Distressed'}
          </span>
        </div>
        <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden mb-2">
          <div 
            className={`absolute top-0 left-0 bottom-0 transition-all duration-1000 ease-in-out ${sentiment > 50 ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' : 'bg-gradient-to-r from-rose-600 to-rose-400'}`}
            style={{ width: `${sentiment}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 relative z-10">Continuous analysis of tone, pitch, and cadence.</p>
      </div>

      {/* Live AI Interventions */}
      <div className="flex-1 bg-indigo-950/20 p-5 rounded-2xl border border-indigo-500/20 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500" />
        <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          Suggested Interventions
        </h4>
        <div className="space-y-3 flex-1 overflow-y-auto pr-2">
          {interventions.map((intervention, idx) => (
            <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-indigo-500/10 text-sm text-slate-300 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{intervention}</p>
            </div>
          ))}
          {/* Animated typing indicator for new suggestions */}
          <div className="flex gap-1 items-center p-2 opacity-50">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
