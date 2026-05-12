'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Users, FileSearch, AlertTriangle, CheckCircle2, ChevronRight, User, BrainCircuit, Activity, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SupervisionPage() {
  const associates = [
    {
      id: '1',
      name: 'Ashley Beer, AMFT',
      status: 'Critical Attention',
      statusColor: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      agendaItems: [
        { type: 'Audit Risk', icon: FileSearch, text: 'Aetna Medical Necessity failure on client M.B. (Missing PHQ-9 baseline).', color: 'text-rose-400', bg: 'bg-rose-500/20' },
        { type: 'Burnout Risk', icon: Activity, text: 'AI Churn Radar detects 8 clients at risk due to high cancellation rates.', color: 'text-amber-400', bg: 'bg-amber-500/20' },
      ]
    },
    {
      id: '2',
      name: 'Jeremy Larson, ASW',
      status: 'Warning',
      statusColor: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      agendaItems: [
        { type: 'Coding Error', icon: AlertTriangle, text: 'Frequent upcoding to 90837 for low-acuity sessions. Flagged by Audit Defense.', color: 'text-amber-400', bg: 'bg-amber-500/20' },
        { type: 'Countertransference', icon: BrainCircuit, text: 'Bias detector flagged subjective language in 2 notes this week.', color: 'text-indigo-400', bg: 'bg-indigo-500/20' },
      ]
    },
    {
      id: '3',
      name: 'Alexander Marshi, AMFT',
      status: 'Healthy',
      statusColor: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      agendaItems: [
        { type: 'Milestone', icon: CheckCircle2, text: 'Hit 33 completed sessions. Highest volume and retention (91.67%) in practice.', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
        { type: 'Supervision', icon: HeartHandshake, text: 'Standard case consultation. No AI flags detected.', color: 'text-slate-400', bg: 'bg-slate-800' },
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-slate-950 font-sans">
        
        {/* Header */}
        <div className="px-8 py-8 border-b border-white/5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Clinical Supervision Copilot</h1>
            </div>
            <p className="text-slate-400 max-w-2xl text-lg">
              AI aggregates data across the entire practice to automatically generate high-priority 1-on-1 supervision agendas for your Clinical Directors.
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {associates.map((assoc) => (
              <Card key={assoc.id} className={`bg-slate-900 border ${assoc.borderColor} shadow-xl relative overflow-hidden group`}>
                <div className={`absolute top-0 left-0 w-full h-1 ${assoc.bgColor.replace('/10', '')}`} />
                
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-black border border-slate-800 flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{assoc.name}</CardTitle>
                        <CardDescription className={`font-bold uppercase tracking-wider text-[10px] mt-1 ${assoc.statusColor}`}>
                          {assoc.status}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Auto-Generated Agenda</h4>
                  
                  <div className="space-y-4">
                    {assoc.agendaItems.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div key={i} className="flex gap-3">
                          <div className={`p-2 rounded-lg h-fit shrink-0 ${item.bg}`}>
                            <Icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div>
                            <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${item.color}`}>{item.type}</p>
                            <p className="text-sm text-slate-300 leading-relaxed">{item.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Button className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 group-hover:border-indigo-500/50 transition-colors">
                    Start Supervision Note <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
