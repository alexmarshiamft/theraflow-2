'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Map, CheckCircle2, Circle, ArrowDown, Lock, Unlock, Zap, BrainCircuit, HeartHandshake, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function ClientRoadmapPage() {
  const phases = [
    {
      id: 1,
      title: 'Phase 1: Stabilization & Assessment',
      description: 'Building therapeutic rapport and identifying core triggers. Establishing safe coping mechanisms.',
      status: 'completed',
      icon: Shield,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-500',
    },
    {
      id: 2,
      title: 'Phase 2: Core Processing (EMDR)',
      description: 'Active desensitization of targeted traumatic memories using bilateral stimulation.',
      status: 'active',
      icon: Zap,
      color: 'text-brand-500',
      bg: 'bg-brand-500/20',
      border: 'border-brand-500',
      progress: 65,
    },
    {
      id: 3,
      title: 'Phase 3: Cognitive Integration',
      description: 'Reframing negative cognitions into positive, adaptive core beliefs.',
      status: 'locked',
      icon: BrainCircuit,
      color: 'text-slate-500',
      bg: 'bg-slate-800',
      border: 'border-slate-700',
    },
    {
      id: 4,
      title: 'Phase 4: Future Template & Closure',
      description: 'Applying new adaptive beliefs to future imagined scenarios. Termination planning.',
      status: 'locked',
      icon: HeartHandshake,
      color: 'text-slate-500',
      bg: 'bg-slate-800',
      border: 'border-slate-700',
    }
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#0a0a0a] font-sans">
        
        {/* Header */}
        <div className="px-8 py-8 border-b border-white/5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-black to-black relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-brand-500/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-brand-500/20 p-2 rounded-lg border border-brand-500/30">
                  <Map className="w-6 h-6 text-brand-400" />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Your Treatment Roadmap</h1>
              </div>
              <p className="text-slate-400 max-w-2xl text-lg">
                Interactive clinical pathway. Track your therapeutic progress visually.
              </p>
            </div>
            
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Current Modality</p>
              <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-brand-400 font-bold">
                EMDR Protocol
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto py-8">
            
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-8 top-10 bottom-10 w-1 bg-slate-800 rounded-full" />
              
              {/* Active Progress Line */}
              <div className="absolute left-8 top-10 w-1 bg-gradient-to-b from-emerald-500 to-brand-500 rounded-full" style={{ height: '40%' }} />

              <div className="space-y-12">
                {phases.map((phase, index) => {
                  const Icon = phase.icon;
                  return (
                    <div key={phase.id} className="relative flex gap-8 items-start group">
                      
                      {/* Timeline Node */}
                      <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 shrink-0 bg-black ${phase.border}`}>
                        {phase.status === 'completed' ? (
                          <CheckCircle2 className={`w-8 h-8 ${phase.color}`} />
                        ) : phase.status === 'active' ? (
                          <div className={`w-8 h-8 rounded-full ${phase.bg} flex items-center justify-center animate-pulse`}>
                            <Icon className={`w-4 h-4 ${phase.color}`} />
                          </div>
                        ) : (
                          <Lock className="w-6 h-6 text-slate-600" />
                        )}
                      </div>

                      {/* Content Card */}
                      <Card className={`flex-1 border-slate-800 transition-all duration-300 ${phase.status === 'active' ? 'bg-slate-900/80 shadow-2xl shadow-brand-500/10 border-brand-500/30 translate-x-2' : phase.status === 'completed' ? 'bg-slate-900/40 opacity-80' : 'bg-black opacity-50 grayscale'}`}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={`text-xl font-bold ${phase.status === 'active' ? 'text-brand-400' : 'text-white'}`}>
                              {phase.title}
                            </h3>
                            {phase.status === 'active' && (
                              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400 bg-brand-500/20 px-3 py-1 rounded-full border border-brand-500/30">
                                In Progress
                              </span>
                            )}
                            {phase.status === 'completed' && (
                              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                                Completed
                              </span>
                            )}
                          </div>
                          
                          <p className="text-slate-400 leading-relaxed">
                            {phase.description}
                          </p>

                          {phase.status === 'active' && phase.progress && (
                            <div className="mt-6">
                              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                <span>Phase Progress</span>
                                <span className="text-brand-400">{phase.progress}%</span>
                              </div>
                              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-500 rounded-full relative">
                                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/50 blur-[2px]" />
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
