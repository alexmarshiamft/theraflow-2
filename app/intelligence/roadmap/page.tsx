'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Map, Compass, TrendingUp, CheckCircle2, CircleDashed, BrainCircuit, Lightbulb, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Milestone {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'projected';
  date: string;
  description: string;
  interventions: string[];
}

const ROADMAP_DATA: Milestone[] = [
  {
    id: 'm1',
    title: 'Therapeutic Alliance & Stabilization',
    status: 'completed',
    date: 'Month 1-2',
    description: 'Established rapport, safety planning, and introduced basic distress tolerance skills.',
    interventions: ['Motivational Interviewing', 'DBT Distress Tolerance', 'Safety Planning']
  },
  {
    id: 'm2',
    title: 'Cognitive Restructuring Core',
    status: 'completed',
    date: 'Month 3-5',
    description: 'Identifying and challenging core negative beliefs. Significant reduction in PHQ-9 scores observed.',
    interventions: ['CBT Thought Records', 'Behavioral Activation', 'Socratic Questioning']
  },
  {
    id: 'm3',
    title: 'Trauma Processing Phase',
    status: 'current',
    date: 'Month 6-8',
    description: 'Gradual exposure and processing of target memories. Currently navigating mild temporary symptom exacerbation.',
    interventions: ['EMDR Resourcing', 'Prolonged Exposure Protocol', 'Somatic Tracking']
  },
  {
    id: 'm4',
    title: 'Integration & Meaning Making',
    status: 'projected',
    date: 'Month 9-10',
    description: 'Consolidating gains, rebuilding identity post-processing, and developing forward-looking goals.',
    interventions: ['Narrative Therapy', 'Values Clarification (ACT)', 'Relapse Prevention Planning']
  },
  {
    id: 'm5',
    title: 'Maintenance & Termination',
    status: 'projected',
    date: 'Month 11-12',
    description: 'Tapering session frequency. Fostering independence and celebrating therapeutic achievements.',
    interventions: ['Booster Sessions', 'Community Integration', 'Termination Rituals']
  }
];

export default function TreatmentRoadmap() {
  const router = useRouter();
  const [activeMilestone, setActiveMilestone] = useState<string>('m3');

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-white overflow-hidden relative font-sans">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[0%] right-[20%] w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        
        {/* Hexagon Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"24\\" height=\\"40\\" viewBox=\\"0 0 24 40\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cpath d=\\"M0 10l12-10 12 10v20l-12 10L0 30V10zm12-7.694L2.004 10.639v18.722L12 37.694l9.996-8.333V10.639L12 2.306z\\" fill=\\"%23ffffff\\" fill-rule=\\"evenodd\\"%3E%3C/path%3E%3C/svg%3E")', backgroundSize: '40px 40px' }}></div>
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
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Interactive Treatment Roadmap
              </h1>
              <p className="text-xs text-slate-400 font-medium">Predictive Clinical Trajectory Engine</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-sm flex items-center gap-2">
            <span className="text-slate-400">Client:</span>
            <span className="font-semibold text-emerald-400">Eleanor V. (ID: 492)</span>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] border-none">
            Export PDF for Client
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto z-10 p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Timeline Visualization (Left) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/60 p-6 shadow-xl sticky top-0">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-8 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" /> Journey Milestones
              </h3>
              
              <div className="relative space-y-0 pl-4">
                {/* Connecting Line */}
                <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-500/50 to-slate-800"></div>
                
                {ROADMAP_DATA.map((milestone, idx) => (
                  <div 
                    key={milestone.id}
                    className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 ml-4 border ${
                      activeMilestone === milestone.id 
                        ? 'bg-slate-800/80 border-emerald-500/50 shadow-lg translate-x-2' 
                        : 'bg-transparent border-transparent hover:bg-slate-800/30'
                    }`}
                    onClick={() => setActiveMilestone(milestone.id)}
                  >
                    {/* Node Icon */}
                    <div className="absolute -left-11 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center z-10">
                      {milestone.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {milestone.status === 'current' && (
                        <div className="relative flex h-5 w-5 items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </div>
                      )}
                      {milestone.status === 'projected' && <CircleDashed className="w-5 h-5 text-slate-600" />}
                    </div>
                    
                    <div className="flex flex-col">
                      <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                        milestone.status === 'completed' ? 'text-emerald-500' : 
                        milestone.status === 'current' ? 'text-emerald-400' : 'text-slate-500'
                      }`}>
                        {milestone.date}
                      </span>
                      <h4 className={`font-semibold ${activeMilestone === milestone.id ? 'text-white' : 'text-slate-300'}`}>
                        {milestone.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expanded Details (Right) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {ROADMAP_DATA.map((milestone) => (
              activeMilestone === milestone.id && (
                <div key={milestone.id} className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6">
                  
                  {/* Hero Card */}
                  <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/60 p-8 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 transition-opacity group-hover:opacity-100 opacity-50" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border ${
                            milestone.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                            milestone.status === 'current' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 
                            'bg-slate-800 text-slate-400 border-slate-700'
                          }`}>
                            {milestone.status === 'completed' ? 'Achieved Milestone' : milestone.status === 'current' ? 'Active Phase' : 'Projected Phase'}
                          </div>
                          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{milestone.title}</h2>
                          <p className="text-slate-400 text-lg">{milestone.description}</p>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-slate-800/50">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Workflow className="w-4 h-4 text-cyan-400" /> Active Interventions
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {milestone.interventions.map((intervention, i) => (
                            <div key={i} className="px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm flex items-center gap-2">
                              <BrainCircuit className="w-4 h-4 text-slate-500" />
                              {intervention}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Prognostic Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/60 p-6 shadow-xl">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-amber-400" /> Clinical Trajectory Forecast
                      </h4>
                      <div className="h-48 relative flex items-end justify-between px-2">
                        {/* Fake chart data representing progress */}
                        {[30, 45, 40, 60, 65, 80, 85].map((val, i) => (
                          <div key={i} className="w-8 relative group flex justify-center h-full items-end">
                            <div 
                              className={`w-full rounded-t-md transition-all duration-1000 ${
                                i <= 3 ? 'bg-emerald-500/80' : 
                                i === 4 ? 'bg-cyan-500/80 shadow-[0_0_10px_rgba(6,182,212,0.5)] animate-pulse' : 
                                'bg-slate-700/50'
                              }`}
                              style={{ height: `${val}%` }}
                            ></div>
                            <div className="absolute -bottom-6 text-[10px] text-slate-500 font-mono">M{i+1}</div>
                          </div>
                        ))}
                        {/* Trend Line Overlay (simulated with SVG) */}
                        <svg className="absolute inset-0 h-full w-full pointer-events-none" preserveAspectRatio="none">
                          <path d="M 16 112 Q 80 80, 140 96 T 260 48 T 380 32" fill="none" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="3" strokeDasharray="5,5" />
                        </svg>
                      </div>
                      <p className="text-xs text-slate-400 mt-8 leading-relaxed">
                        AI model predicts an 85% probability of reaching termination criteria by Month 12, assuming continued engagement in EMDR resourcing.
                      </p>
                    </div>

                    <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/60 p-6 shadow-xl flex flex-col">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-400" /> AI Strategic Recommendations
                      </h4>
                      <div className="flex-1 space-y-4">
                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                          <h5 className="text-amber-400 text-sm font-bold mb-1">Adjust Pacing</h5>
                          <p className="text-slate-300 text-xs leading-relaxed">
                            Client linguistic markers indicate high cognitive load. Consider increasing resourcing by 15% before progressing to the next trauma target.
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                          <h5 className="text-slate-300 text-sm font-bold mb-1">Homework Adherence</h5>
                          <p className="text-slate-400 text-xs leading-relaxed">
                            Consistent completion of thought records. Recommend introducing somatic tracking logs in the client portal.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
