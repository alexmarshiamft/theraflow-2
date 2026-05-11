'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Map, Flag, CheckCircle, Circle, Target, Plus, ShieldCheck, ArrowRight } from 'lucide-react';
import { useState } from 'react';

// Mock Data
const clientName = "Alex M.";
const currentPhase = 2;

const milestones = [
  {
    id: 1,
    phase: "Phase 1: Assessment & Stabilization",
    status: "completed",
    goals: ["Intake Assessment", "Safety Planning", "Rapport Building"],
    date: "Mar 2026"
  },
  {
    id: 2,
    phase: "Phase 2: Core Processing",
    status: "active",
    goals: ["Identify triggers", "CBT cognitive restructuring", "EMDR targeting"],
    date: "May 2026"
  },
  {
    id: 3,
    phase: "Phase 3: Integration & Future",
    status: "pending",
    goals: ["Generalization of skills", "Relapse prevention", "Termination planning"],
    date: "Aug 2026"
  }
];

export default function TreatmentRoadmapPage() {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(2);

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-brand-500/20 rounded-xl border border-brand-500/30">
                <Map className="w-6 h-6 text-brand-400" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Clinical Roadmap</h1>
            </div>
            <p className="text-slate-400">Interactive 3D treatment trajectory for {clientName}.</p>
          </div>
          <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Add Milestone
          </button>
        </div>

        {/* 3D Timeline Visualizer */}
        <div className="relative w-full py-16 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-emerald-500 to-brand-500 -translate-y-1/2 z-0 transition-all duration-1000"
            style={{ width: '50%' }} // Simulating progress to Phase 2
          >
            <div className="absolute right-0 top-1/2 w-4 h-4 bg-brand-400 rounded-full blur-md -translate-y-1/2 animate-pulse"></div>
          </div>

          <div className="relative z-10 flex items-center justify-between min-w-[800px] px-12">
            {milestones.map((m) => (
              <div 
                key={m.id} 
                className="snap-center flex flex-col items-center group cursor-pointer"
                onClick={() => setSelectedMilestone(m.id)}
              >
                {/* Status Icon */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-500 relative ${
                  m.status === 'completed' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' :
                  m.status === 'active' ? 'bg-brand-500/20 border-brand-500 text-brand-400 shadow-[0_0_30px_rgba(56,189,248,0.3)] scale-110' :
                  'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'
                }`}>
                  {m.status === 'completed' && <CheckCircle className="w-6 h-6" />}
                  {m.status === 'active' && <Target className="w-6 h-6 animate-pulse" />}
                  {m.status === 'pending' && <Circle className="w-6 h-6" />}

                  {/* Selection Indicator */}
                  {selectedMilestone === m.id && (
                     <div className="absolute -bottom-6 w-1 h-1 bg-white rounded-full"></div>
                  )}
                </div>

                {/* Node Label */}
                <div className="mt-8 text-center w-48">
                  <span className={`text-xs font-bold uppercase tracking-widest ${
                    m.status === 'active' ? 'text-brand-400' : 'text-slate-500'
                  }`}>
                    {m.date}
                  </span>
                  <h3 className={`mt-1 font-medium transition-colors ${
                    selectedMilestone === m.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                  }`}>
                    {m.phase}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Inspector */}
        {selectedMilestone && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {milestones.find(m => m.id === selectedMilestone)?.phase}
                </h2>
                <div className="flex items-center gap-2 mb-8">
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-slate-300">
                    Est. Duration: 12 Sessions
                  </span>
                  {milestones.find(m => m.id === selectedMilestone)?.status === 'completed' && (
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Mastered
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Clinical Objectives</h4>
                  {milestones.find(m => m.id === selectedMilestone)?.goals.map((goal, i) => (
                    <div key={i} className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-grab active:cursor-grabbing">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        milestones.find(m => m.id === selectedMilestone)?.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'
                      }`}>
                         {milestones.find(m => m.id === selectedMilestone)?.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                      </div>
                      <span className="text-slate-200 font-medium">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Analysis Panel */}
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 h-full flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-brand-400 flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4" /> Progress Analysis
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {selectedMilestone === 1 ? "Client successfully stabilized. GAD-7 scores dropped by 4 points during this phase." :
                     selectedMilestone === 2 ? "Currently targeting core traumatic memories. Expected temporary increase in reported distress between sessions. Recommend teaching grounding techniques." :
                     "Focus on reinforcing positive coping mechanisms. Transitioning to bi-weekly sessions recommended."}
                  </p>
                </div>
                
                <button className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-medium transition-colors">
                  Generate Summary Note
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  )
}
