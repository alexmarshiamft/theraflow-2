'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Map, CheckCircle2, Circle, ArrowDown, Lock, Unlock, Zap, BrainCircuit, HeartHandshake, Shield, Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';

interface Phase {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'locked';
  icon: any;
  color: string;
  bg: string;
  border: string;
  progress?: number;
}

export default function ClientRoadmapPage() {
  const { clients } = useStore();
  
  // Pick the first active client for the demo, or default to a mock
  const activeClient = clients.find(c => c.status === 'active') || clients[0];
  const diagnosis = activeClient?.alerts[0] || 'Generalized Anxiety'; // using alerts as mock diagnosis
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [modality, setModality] = useState('Standard Protocol');

  const defaultPhases: Phase[] = [
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
      title: 'Phase 2: Core Processing',
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

  const [phases, setPhases] = useState<Phase[]>(defaultPhases);

  const generateRoadmap = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Generate a 4-phase clinical treatment roadmap for a patient presenting with "${diagnosis}". Return ONLY a raw JSON array (no markdown block, no backticks) with exactly 4 objects. Each object must have these exactly named keys: "title" (string, name of the phase), "description" (string, 1-2 sentence clinical description), "modality" (string, the overall treatment modality e.g., CBT, DBT).`;
      
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Strip out markdown if Gemini wrapped it
        const cleanJsonStr = data.text.replace(/```json|```/g, '').trim();
        const generatedData = JSON.parse(cleanJsonStr);
        
        if (generatedData && generatedData.length > 0) {
          setModality(generatedData[0].modality || 'Custom Protocol');
          
          const newPhases: Phase[] = generatedData.map((item: any, index: number) => {
            const isFirst = index === 0;
            const isSecond = index === 1;
            
            return {
              id: index + 1,
              title: item.title,
              description: item.description,
              status: isFirst ? 'completed' : isSecond ? 'active' : 'locked',
              icon: isFirst ? Shield : isSecond ? Zap : index === 2 ? BrainCircuit : HeartHandshake,
              color: isFirst ? 'text-emerald-500' : isSecond ? 'text-brand-500' : 'text-slate-500',
              bg: isFirst ? 'bg-emerald-500/20' : isSecond ? 'bg-brand-500/20' : 'bg-slate-800',
              border: isFirst ? 'border-emerald-500' : isSecond ? 'border-brand-500' : 'border-slate-700',
              progress: isSecond ? 15 : undefined
            };
          });
          
          setPhases(newPhases);
        }
      }
    } catch (err) {
      console.error('Failed to generate roadmap', err);
    } finally {
      setIsGenerating(false);
    }
  };

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
                <h1 className="text-3xl font-bold text-white tracking-tight">Interactive Roadmap</h1>
              </div>
              <p className="text-slate-400 max-w-2xl text-lg">
                AI-Generated Clinical Pathway for <span className="text-white font-semibold">{activeClient?.name}</span> ({diagnosis})
              </p>
            </div>
            
            <div className="text-right hidden md:flex flex-col items-end gap-3">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Current Modality</p>
                <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-brand-400 font-bold shadow-lg shadow-brand-500/10">
                  {modality}
                </div>
              </div>
              <Button 
                onClick={generateRoadmap}
                disabled={isGenerating}
                className="bg-white hover:bg-slate-200 text-black font-bold border border-white/20 transition-all duration-300 w-full"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2 text-brand-600" />
                )}
                {isGenerating ? "Synthesizing Plan..." : "Auto-Generate Plan"}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto py-8">
            
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-8 top-10 bottom-10 w-1 bg-slate-800 rounded-full" />
              
              {/* Active Progress Line */}
              <div className="absolute left-8 top-10 w-1 bg-gradient-to-b from-emerald-500 to-brand-500 rounded-full transition-all duration-1000" style={{ height: '40%' }} />

              <div className="space-y-12 relative z-10">
                {phases.map((phase) => {
                  const Icon = phase.icon;
                  return (
                    <div key={phase.id} className="relative flex gap-8 items-start group">
                      
                      {/* Timeline Node */}
                      <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 shrink-0 bg-black transition-colors duration-700 ${phase.border}`}>
                        {phase.status === 'completed' ? (
                          <CheckCircle2 className={`w-8 h-8 ${phase.color} animate-in zoom-in duration-500`} />
                        ) : phase.status === 'active' ? (
                          <div className={`w-8 h-8 rounded-full ${phase.bg} flex items-center justify-center animate-pulse`}>
                            <Icon className={`w-4 h-4 ${phase.color}`} />
                          </div>
                        ) : (
                          <Lock className="w-6 h-6 text-slate-600" />
                        )}
                      </div>

                      {/* Content Card */}
                      <Card className={`flex-1 border-slate-800 transition-all duration-700 ${phase.status === 'active' ? 'bg-slate-900/80 shadow-2xl shadow-brand-500/10 border-brand-500/30 translate-x-2' : phase.status === 'completed' ? 'bg-slate-900/40 opacity-80' : 'bg-black opacity-50 grayscale'}`}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={`text-xl font-bold transition-colors duration-700 ${phase.status === 'active' ? 'text-brand-400' : 'text-white'}`}>
                              {phase.title}
                            </h3>
                            {phase.status === 'active' && (
                              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400 bg-brand-500/20 px-3 py-1 rounded-full border border-brand-500/30 animate-pulse">
                                In Progress
                              </span>
                            )}
                            {phase.status === 'completed' && (
                              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                                Completed
                              </span>
                            )}
                          </div>
                          
                          <p className="text-slate-400 leading-relaxed transition-all duration-700">
                            {phase.description}
                          </p>

                          {phase.status === 'active' && phase.progress !== undefined && (
                            <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-700">
                              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                <span>Phase Progress</span>
                                <span className="text-brand-400">{phase.progress}%</span>
                              </div>
                              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-500 rounded-full relative transition-all duration-1000 ease-out" style={{ width: `${phase.progress}%` }}>
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
