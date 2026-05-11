'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { 
  BrainCircuit, 
  TrendingDown, 
  Activity, 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

type RiskLevel = 'High' | 'Medium' | 'Low';

interface ChurnPatient {
  id: string;
  name: string;
  risk: RiskLevel;
  probability: number;
  lastSession: string;
  missedAppointments: number;
  sentiment: string;
  keyDriver: string;
}

const mockPatients: ChurnPatient[] = [
  { id: 'P-104', name: 'Eleanor Vance', risk: 'High', probability: 87, lastSession: '14 days ago', missedAppointments: 2, sentiment: 'Negative/Withdrawn', keyDriver: 'Consecutive cancellations & low portal engagement' },
  { id: 'P-082', name: 'Marcus Sterling', risk: 'High', probability: 76, lastSession: '21 days ago', missedAppointments: 1, sentiment: 'Anxious', keyDriver: 'Expressed financial concerns in last session' },
  { id: 'P-115', name: 'Sophia Chen', risk: 'Medium', probability: 45, lastSession: '7 days ago', missedAppointments: 0, sentiment: 'Neutral', keyDriver: 'Irregular scheduling cadence' },
  { id: 'P-044', name: 'James Wilson', risk: 'Low', probability: 12, lastSession: '2 days ago', missedAppointments: 0, sentiment: 'Positive', keyDriver: 'High homework completion' },
];

export default function ChurnDashboard() {
  const [analyzing, setAnalyzing] = useState(true);
  const [patients, setPatients] = useState<ChurnPatient[]>([]);

  useEffect(() => {
    // Simulate AI loading state
    const timer = setTimeout(() => {
      setPatients(mockPatients);
      setAnalyzing(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-brand-500" />
            Predictive Churn Radar
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-driven analysis of cancellation patterns and portal engagement to predict patient dropout risk.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl shadow-lg border border-slate-800">
           <div className="flex items-center gap-2">
             <div className={`h-2 w-2 rounded-full ${analyzing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></div>
             <span className="text-xs font-mono text-slate-300 font-medium">
               {analyzing ? 'ANALYZING 12,042 DATA POINTS...' : 'MODELS SYNCHRONIZED'}
             </span>
           </div>
        </div>
      </div>

      {/* Hero Analytics (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Main Risk Score */}
        <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-black rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.2)] p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[80px] rounded-full"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0 relative">
              <div className="w-32 h-32 rounded-full border-8 border-slate-800 flex items-center justify-center">
                {analyzing ? (
                  <div className="w-full h-full border-8 border-brand-500 border-t-transparent rounded-full animate-spin absolute inset-[-8px]"></div>
                ) : (
                  <svg className="absolute inset-[-8px] w-32 h-32 transform -rotate-90">
                    <circle cx="60" cy="60" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-emerald-500" strokeDasharray="351" strokeDashoffset={351 - (351 * 92) / 100} />
                  </svg>
                )}
                <div className="text-center">
                  <div className="text-3xl font-black text-white">{analyzing ? '--' : '92%'}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Retention</div>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold text-white mb-2">Practice Retention Health</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Your 90-day patient retention rate is <span className="text-emerald-400 font-bold">14% higher</span> than the national clinical average. The AI has identified <strong>2 patients</strong> currently at high risk of early termination.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium text-slate-300">Cancellations down 5%</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-brand-400" />
                  <span className="text-xs font-medium text-slate-300">Portal usage up 12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Small Risk Card */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><AlertOctagon className="w-16 h-16 text-rose-500" /></div>
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">High Risk Cohort</h3>
          <div className="text-5xl font-black text-foreground mb-2 flex items-baseline gap-2">
            {analyzing ? '-' : '2'}
            <span className="text-lg font-medium text-muted-foreground">patients</span>
          </div>
          <p className="text-xs text-rose-500 font-bold bg-rose-500/10 px-2 py-1 rounded w-fit border border-rose-500/20">Requires Immediate Action</p>
        </div>
      </div>

      {/* Patient Risk List */}
      <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-muted/30 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-500" />
            At-Risk Patient Registry
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          {analyzing ? (
            <div className="p-12 flex flex-col items-center justify-center space-y-4">
              <BrainCircuit className="w-12 h-12 text-brand-500 animate-pulse" />
              <p className="text-muted-foreground font-medium">Running semantic analysis on 5,000+ clinical data points...</p>
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-xs uppercase font-semibold text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Risk Probability</th>
                  <th className="px-6 py-4">Key Driver</th>
                  <th className="px-6 py-4">Last Session</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {patients.map((patient, i) => (
                  <tr key={patient.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-bold text-foreground">{patient.name}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">{patient.id}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-sm ${
                          patient.risk === 'High' ? 'border-rose-500/30 text-rose-500' :
                          patient.risk === 'Medium' ? 'border-amber-500/30 text-amber-500' :
                          'border-emerald-500/30 text-emerald-500'
                        }`}>
                          {patient.probability}%
                        </div>
                        <div>
                          <div className={`text-xs font-bold uppercase tracking-wider ${
                            patient.risk === 'High' ? 'text-rose-500' :
                            patient.risk === 'Medium' ? 'text-amber-500' :
                            'text-emerald-500'
                          }`}>{patient.risk} Risk</div>
                          <div className="text-xs text-muted-foreground">Sentiment: {patient.sentiment}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-muted-foreground font-medium max-w-[250px]">
                      {patient.keyDriver}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-foreground font-medium">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {patient.lastSession}
                      </div>
                      {patient.missedAppointments > 0 && (
                        <div className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-bold">
                          <AlertTriangle className="w-3 h-3" /> {patient.missedAppointments} missed
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Button variant="outline" size="sm" className="bg-background group-hover:border-brand-500 transition-colors">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Check-in
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
