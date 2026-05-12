'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  Filter, 
  BrainCircuit,
  Clock,
  Video,
  MapPin,
  AlertTriangle,
  User,
  CheckCircle2
} from 'lucide-react';

type Appointment = {
  id: string;
  day: number; // 0 (Mon) to 4 (Fri)
  startHour: number; // 9.0 = 9:00 AM, 10.5 = 10:30 AM
  duration: number; // hours
  clientName: string;
  type: 'telehealth' | 'in-person';
  status: 'confirmed' | 'unconfirmed' | 'high-risk';
  color: string;
};

export default function CalendarPage() {
  const [isAiMode, setIsAiMode] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hours = Array.from({ length: 10 }, (_, i) => i + 8); // 8 AM to 5 PM

  const mockAppointments: Appointment[] = [
    { id: '1', day: 0, startHour: 9, duration: 1, clientName: 'Sarah Jenkins', type: 'telehealth', status: 'confirmed', color: 'bg-emerald-500' },
    { id: '2', day: 0, startHour: 10.25, duration: 1, clientName: 'Michael Chang', type: 'telehealth', status: 'confirmed', color: 'bg-emerald-500' }, // 15 min break!
    { id: '3', day: 0, startHour: 13, duration: 1, clientName: 'David & Emma (Couples)', type: 'in-person', status: 'high-risk', color: 'bg-rose-500' }, // High risk of no-show
    { id: '4', day: 1, startHour: 11, duration: 1, clientName: 'Jessica Taylor', type: 'telehealth', status: 'confirmed', color: 'bg-indigo-500' },
    { id: '5', day: 2, startHour: 9, duration: 1, clientName: 'Robert Wilson', type: 'in-person', status: 'confirmed', color: 'bg-emerald-500' },
    { id: '6', day: 2, startHour: 10, duration: 1, clientName: 'Maria Rodriguez', type: 'telehealth', status: 'unconfirmed', color: 'bg-amber-500' }, // Back to back!
  ];

  // AI Safe-Slot Logic
  const safeSlots = [
    { day: 1, startHour: 9.5, duration: 1 }, // Tuesday 9:30 AM
    { day: 2, startHour: 14.5, duration: 1 }, // Wed 2:30 PM
    { day: 3, startHour: 10, duration: 1 }, // Thu 10:00 AM
    { day: 4, startHour: 11, duration: 1 }, // Fri 11:00 AM
  ];

  const formatTime = (decimalHour: number) => {
    const hours = Math.floor(decimalHour);
    const mins = Math.round((decimalHour - hours) * 60);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours > 12 ? hours - 12 : hours;
    return `${displayHour}:${mins.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen overflow-hidden bg-slate-950 font-sans">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-indigo-400" />
              Smart-Grid Calendar
            </h1>
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
              <button className="p-1.5 hover:bg-slate-700 rounded-md text-slate-400 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold text-slate-200 px-2">May 11 - May 15, 2026</span>
              <button className="p-1.5 hover:bg-slate-700 rounded-md text-slate-400 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAiMode(!isAiMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                isAiMode 
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)] animate-pulse' 
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              AI Safe-Slot Overlay
            </button>
            
            <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
              <Plus className="w-4 h-4" /> Schedule
            </button>
          </div>
        </div>

        {/* Main Grid Area */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Timeline Grid */}
          <div className="flex-1 overflow-auto custom-scrollbar relative bg-slate-950">
            <div className="min-w-[800px] pb-12">
              
              {/* Day Headers */}
              <div className="sticky top-0 z-30 flex bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
                <div className="w-20 shrink-0 border-r border-slate-800/50"></div>
                {days.map((day, i) => (
                  <div key={day} className="flex-1 py-3 text-center border-r border-slate-800/50">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{day}</span>
                    <span className="text-lg font-bold text-white">{11 + i}</span>
                  </div>
                ))}
              </div>

              {/* Grid Body */}
              <div className="relative">
                {/* Horizontal Hour Lines */}
                {hours.map((hour) => (
                  <div key={hour} className="flex group">
                    <div className="w-20 shrink-0 border-r border-slate-800/50 relative">
                      <span className="absolute -top-2.5 right-4 text-xs font-medium text-slate-500 bg-slate-950 pr-1">
                        {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
                      </span>
                    </div>
                    <div className="flex-1 h-20 border-b border-slate-800/30 group-hover:bg-slate-800/10 transition-colors" />
                    <div className="flex-1 h-20 border-b border-l border-slate-800/30 group-hover:bg-slate-800/10 transition-colors" />
                    <div className="flex-1 h-20 border-b border-l border-slate-800/30 group-hover:bg-slate-800/10 transition-colors" />
                    <div className="flex-1 h-20 border-b border-l border-slate-800/30 group-hover:bg-slate-800/10 transition-colors" />
                    <div className="flex-1 h-20 border-b border-l border-slate-800/30 group-hover:bg-slate-800/10 transition-colors" />
                  </div>
                ))}

                {/* Appointments Container */}
                <div className="absolute inset-0 top-0 bottom-0 left-20 right-0 flex pointer-events-none">
                  {days.map((_, dayIndex) => (
                    <div key={dayIndex} className="flex-1 relative border-r border-transparent pointer-events-auto">
                      
                      {/* Render Appointments */}
                      {mockAppointments.filter(a => a.day === dayIndex).map(appt => {
                        const top = (appt.startHour - 8) * 80; // 80px per hour
                        const height = appt.duration * 80;
                        
                        return (
                          <div 
                            key={appt.id}
                            onClick={() => setSelectedAppt(appt)}
                            className={`absolute left-1 right-2 rounded-xl p-2.5 border backdrop-blur-md cursor-pointer transition-all hover:z-10 hover:shadow-xl group ${appt.color}/20 border-${appt.color.replace('bg-', '')}/30 hover:border-${appt.color.replace('bg-', '')}/60`}
                            style={{ top: `${top}px`, height: `${height}px` }}
                          >
                            <div className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-md ${appt.color}`} />
                            <h4 className="text-sm font-bold text-white leading-tight">{appt.clientName}</h4>
                            <p className="text-xs text-slate-300 font-medium mt-1">
                              {formatTime(appt.startHour)} - {formatTime(appt.startHour + appt.duration)}
                            </p>
                            
                            <div className="flex items-center gap-2 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                              {appt.type === 'telehealth' ? <Video className="w-3 h-3 text-slate-300" /> : <MapPin className="w-3 h-3 text-slate-300" />}
                              {appt.status === 'high-risk' && <AlertTriangle className="w-3 h-3 text-rose-400 animate-pulse" />}
                            </div>
                          </div>
                        );
                      })}

                      {/* Render AI Safe Slots */}
                      {isAiMode && safeSlots.filter(s => s.day === dayIndex).map((slot, i) => {
                        const top = (slot.startHour - 8) * 80;
                        const height = slot.duration * 80;
                        
                        return (
                          <div 
                            key={`safe-${i}`}
                            className="absolute left-1 right-2 rounded-xl p-2 border-2 border-dashed border-indigo-500/50 bg-indigo-500/5 flex flex-col items-center justify-center animate-pulse cursor-pointer hover:bg-indigo-500/10 transition-colors"
                            style={{ top: `${top}px`, height: `${height}px` }}
                          >
                            <BrainCircuit className="w-6 h-6 text-indigo-400 mb-1 opacity-50" />
                            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest text-center">Optimal Slot<br/>(Enforces Break)</span>
                          </div>
                        );
                      })}

                    </div>
                  ))}
                </div>

                {/* Current Time Indicator (Simulated at 10:15 AM on Monday) */}
                <div className="absolute left-0 right-0 border-t-2 border-brand-500 z-20 pointer-events-none" style={{ top: `${(10.25 - 8) * 80}px` }}>
                  <div className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
                </div>

              </div>
            </div>
          </div>

          {/* Right Sidebar Details Pane */}
          {selectedAppt && (
            <div className="w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col z-30 animate-in slide-in-from-right-10">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl bg-slate-800 border border-slate-700`}>
                  <User className="w-6 h-6 text-slate-300" />
                </div>
                <button onClick={() => setSelectedAppt(null)} className="text-slate-500 hover:text-white transition-colors">
                  ✕
                </button>
              </div>

              <h2 className="text-xl font-bold text-white mb-1">{selectedAppt.clientName}</h2>
              <p className="text-sm text-slate-400 flex items-center gap-2 mb-6">
                <Clock className="w-4 h-4" /> 
                {formatTime(selectedAppt.startHour)} (50 min)
              </p>

              <div className="space-y-4 flex-1">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Session Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Modality</span>
                      <span className="text-white capitalize flex items-center gap-1">
                        {selectedAppt.type === 'telehealth' ? <Video className="w-3 h-3 text-cyan-400" /> : <MapPin className="w-3 h-3 text-brand-400" />}
                        {selectedAppt.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Billing Code</span>
                      <span className="text-white font-mono">90837</span>
                    </div>
                  </div>
                </div>

                {selectedAppt.status === 'high-risk' && (
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> High Churn Risk
                    </h4>
                    <p className="text-xs text-rose-200/90 leading-relaxed">
                      AI predicts an 82% chance of cancellation. Client missed their last session and credit card on file is expiring in 4 days.
                    </p>
                    <button className="mt-3 w-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 py-1.5 rounded-lg text-xs font-bold transition-colors">
                      Send Automated Check-in
                    </button>
                  </div>
                )}
                
                {selectedAppt.status === 'unconfirmed' && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Not Confirmed</h4>
                    <p className="text-xs text-amber-200/90 leading-relaxed">
                      Client has not responded to the automated 48-hour SMS reminder.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2 mt-auto pt-6">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Video className="w-4 h-4 mr-2" /> Join Telehealth Room
                </Button>
                <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                  Reschedule
                </Button>
              </div>

            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
