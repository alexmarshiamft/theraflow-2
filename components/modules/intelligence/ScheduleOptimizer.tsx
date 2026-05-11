'use client';

import { useState, useEffect } from 'react';
import { Calendar, Battery, Zap, AlertCircle, TrendingUp, RefreshCw, Layers } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Types for schedule optimizer
interface AppointmentBlock {
  id: string;
  time: string;
  duration: number; // in minutes
  clientName: string;
  acuityLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  predictedDrain: number; // 1-10
  type: 'Intake' | 'Follow-up' | 'Crisis' | 'Admin' | 'Break';
}

export function ScheduleOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentBlock[]>([
    { id: '1', time: '09:00 AM', duration: 50, clientName: 'Sarah Jenkins', acuityLevel: 'Moderate', predictedDrain: 5, type: 'Follow-up' },
    { id: '2', time: '10:00 AM', duration: 50, clientName: 'Alexander Marshi', acuityLevel: 'High', predictedDrain: 8, type: 'Intake' },
    { id: '3', time: '11:00 AM', duration: 50, clientName: 'David Ross', acuityLevel: 'Severe', predictedDrain: 10, type: 'Crisis' },
    { id: '4', time: '12:00 PM', duration: 60, clientName: 'Lunch & Notes', acuityLevel: 'Low', predictedDrain: 2, type: 'Admin' },
    { id: '5', time: '01:00 PM', duration: 50, clientName: 'Emma Watson', acuityLevel: 'Moderate', predictedDrain: 4, type: 'Follow-up' },
    { id: '6', time: '02:00 PM', duration: 50, clientName: 'James Wilson', acuityLevel: 'High', predictedDrain: 7, type: 'Follow-up' },
  ]);

  const [energyLevels, setEnergyLevels] = useState<number[]>([95, 85, 70, 50, 75, 60, 45]);

  const getAcuityColor = (acuity: string) => {
    switch (acuity) {
      case 'Severe': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'High': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Moderate': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    
    // Simulate AI Optimization calculation
    setTimeout(() => {
      // Create a more optimal schedule (spreading out high acuity)
      const optimized: AppointmentBlock[] = [
        { id: '2', time: '09:00 AM', duration: 50, clientName: 'Alexander Marshi', acuityLevel: 'High', predictedDrain: 8, type: 'Intake' },
        { id: '1', time: '10:00 AM', duration: 50, clientName: 'Sarah Jenkins', acuityLevel: 'Moderate', predictedDrain: 5, type: 'Follow-up' },
        { id: '4', time: '11:00 AM', duration: 30, clientName: 'Break & Regulation', acuityLevel: 'Low', predictedDrain: 1, type: 'Break' },
        { id: '3', time: '11:30 AM', duration: 50, clientName: 'David Ross', acuityLevel: 'Severe', predictedDrain: 10, type: 'Crisis' },
        { id: '7', time: '12:30 PM', duration: 45, clientName: 'Lunch & Notes', acuityLevel: 'Low', predictedDrain: 2, type: 'Admin' },
        { id: '5', time: '01:15 PM', duration: 50, clientName: 'Emma Watson', acuityLevel: 'Moderate', predictedDrain: 4, type: 'Follow-up' },
        { id: '6', time: '02:15 PM', duration: 50, clientName: 'James Wilson', acuityLevel: 'High', predictedDrain: 7, type: 'Follow-up' },
      ];
      setAppointments(optimized);
      // Better energy curve
      setEnergyLevels([95, 80, 75, 85, 65, 75, 60, 45]);
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <div className="section-card p-6 h-full flex flex-col relative overflow-hidden group">
      {/* Background Effects */}
      <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-fuchsia-500/10 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
      <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-fuchsia-400" />
            Flow State Schedule Optimizer
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30">Beta</span>
          </h3>
          <p className="text-slate-400 text-sm mt-1">Predictive acuity balancing to prevent clinical burnout.</p>
        </div>
        <Button 
          onClick={handleOptimize}
          disabled={isOptimizing}
          className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white border-none shadow-[0_0_15px_rgba(192,38,211,0.3)] transition-all duration-300"
        >
          {isOptimizing ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Zap className="h-4 w-4 mr-2" />
          )}
          {isOptimizing ? 'Optimizing...' : 'Run AI Optimizer'}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 relative z-10">
        
        {/* Left Side: Schedule Timeline */}
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Today's Timeline</span>
            <span className="text-xs text-slate-400">Total Drain Index: <strong className="text-rose-400">{isOptimizing ? '--' : appointments.reduce((acc, curr) => acc + curr.predictedDrain, 0)}</strong>/50</span>
          </div>
          
          <div className="space-y-2 relative">
            {/* Connection Line */}
            <div className="absolute left-3 top-4 bottom-4 w-px bg-slate-800"></div>
            
            {appointments.map((apt, idx) => (
              <div 
                key={apt.id} 
                className={`relative flex items-center gap-4 p-3 rounded-xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-sm transition-all duration-500 ${isOptimizing ? 'opacity-50 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'} hover:bg-slate-800/80 hover:border-slate-700`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {/* Timeline Dot */}
                <div className="w-6 h-6 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center shrink-0 z-10">
                  <div className={`w-2 h-2 rounded-full ${apt.type === 'Break' || apt.type === 'Admin' ? 'bg-slate-500' : 'bg-brand-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]'}`} />
                </div>
                
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-200">{apt.time}</span>
                      <span className="text-xs text-slate-500">{apt.duration}m</span>
                    </div>
                    <div className="text-sm text-slate-300 font-medium">{apt.clientName}</div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${getAcuityColor(apt.acuityLevel)}`}>
                      {apt.acuityLevel}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-400 w-12 justify-end">
                      <Battery className={`h-3 w-3 ${apt.predictedDrain > 7 ? 'text-rose-400' : apt.predictedDrain > 4 ? 'text-amber-400' : 'text-emerald-400'}`} />
                      -{apt.predictedDrain}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Energy Chart & Insights */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
          <div className="p-4 rounded-xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              Predicted Energy Arc
            </h4>
            
            <div className="h-32 flex items-end gap-1 mb-2 relative">
              {/* Reference line */}
              <div className="absolute left-0 right-0 bottom-[30%] h-px border-t border-dashed border-rose-500/30"></div>
              
              {energyLevels.map((level, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                  <div className="w-full relative flex justify-center group-hover:opacity-100 h-full items-end">
                    <div 
                      className={`w-full rounded-t-sm transition-all duration-1000 ${level < 30 ? 'bg-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : level < 60 ? 'bg-amber-500/80' : 'bg-emerald-500/80'}`}
                      style={{ height: `${isOptimizing ? 10 : level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-wider mt-2">
              <span>9AM</span>
              <span>12PM</span>
              <span>3PM</span>
            </div>
          </div>

          <div className="flex-1 p-4 rounded-xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-sm flex flex-col justify-center">
            {isOptimizing ? (
              <div className="animate-pulse space-y-2">
                <div className="h-3 bg-slate-800 rounded w-3/4"></div>
                <div className="h-3 bg-slate-800 rounded w-full"></div>
                <div className="h-3 bg-slate-800 rounded w-5/6"></div>
              </div>
            ) : energyLevels.some(l => l < 30) ? (
              <div className="flex gap-3 text-sm">
                <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
                <p className="text-slate-300 leading-relaxed">
                  <span className="text-rose-400 font-semibold">Burnout Risk Detected.</span> Consecutive high-acuity sessions scheduled between 10am-12pm. We recommend running the AI Optimizer to inject a regulatory break.
                </p>
              </div>
            ) : (
              <div className="flex gap-3 text-sm">
                <Zap className="h-5 w-5 text-emerald-400 shrink-0" />
                <p className="text-slate-300 leading-relaxed">
                  <span className="text-emerald-400 font-semibold">Schedule is Optimized.</span> Acuity is balanced evenly throughout the day. Estimated end-of-day energy reserve is stable at 45%.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
