'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ShieldAlert, ShieldCheck, AlertTriangle, FileText, Activity, Server, FileSearch, ArrowRight, User, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type NoteRisk = {
  id: string;
  clinician: string;
  client: string;
  date: string;
  payer: string;
  score: number;
  status: 'Pass' | 'Warning' | 'Critical';
  reason?: string;
  guideline?: string;
};

export default function AuditDefensePage() {
  const [selectedNote, setSelectedNote] = useState<NoteRisk | null>(null);

  const scannedNotes: NoteRisk[] = [
    { id: '1', clinician: 'Kiran Dave', client: 'T.H.', date: 'May 11, 2026', payer: 'Optum / UBH', score: 98, status: 'Pass' },
    { id: '2', clinician: 'Ashley Beer', client: 'M.B.', date: 'May 11, 2026', payer: 'Aetna', score: 42, status: 'Critical', 
      reason: 'Missing measurable baseline for PHQ-9; intervention does not match treatment plan goals.',
      guideline: 'Aetna Medical Necessity Criteria: Section 4.2 (Measurable Outcomes)'
    },
    { id: '3', clinician: 'Eliana Nivon', client: 'J.S.', date: 'May 10, 2026', payer: 'Cigna', score: 95, status: 'Pass' },
    { id: '4', clinician: 'Jeremy Larson', client: 'R.L.', date: 'May 10, 2026', payer: 'Blue Cross', score: 65, status: 'Warning',
      reason: 'Session duration billed as 60 minutes (90837) but note content lacks sufficient clinical depth to justify high-acuity code.',
      guideline: 'BCBS Coding Guidelines: 90834 vs 90837 Justification'
    },
    { id: '5', clinician: 'Benjamin Raskin', client: 'A.P.', date: 'May 09, 2026', payer: 'Optum / UBH', score: 99, status: 'Pass' },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-slate-950 font-sans">
        
        {/* Header */}
        <div className="px-8 py-8 border-b border-white/5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-rose-500/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-rose-500/20 p-2 rounded-lg border border-rose-500/40">
                <ShieldAlert className="w-6 h-6 text-rose-400" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Insurance Audit Defense Shield</h1>
            </div>
            <p className="text-slate-300 max-w-2xl text-lg font-medium">
              AI automatically cross-references every signed clinical note against specific payer medical necessity guidelines to prevent clawbacks before they happen.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Dashboard Area */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Threat Level */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Server className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scanned 24h</span>
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-1">124</h3>
                  <p className="text-sm text-slate-400 font-medium">Notes Processed</p>
                </CardContent>
              </Card>
              <Card className="bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Pass Rate</span>
                  </div>
                  <h3 className="text-4xl font-bold text-emerald-500 mb-1">98.4%</h3>
                  <p className="text-sm text-emerald-400/80 font-medium">Audit-Ready</p>
                </CardContent>
              </Card>
              <Card className="bg-rose-500/10 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)] relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-16 h-16 bg-rose-500/20 blur-2xl group-hover:bg-rose-500/30 transition-colors" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <AlertTriangle className="w-5 h-5 text-rose-500" />
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Critical Risk</span>
                  </div>
                  <h3 className="text-4xl font-bold text-rose-500 mb-1">2</h3>
                  <p className="text-sm text-rose-400/80 font-medium">Require Amendment</p>
                </CardContent>
              </Card>
            </div>

            {/* Note Stream */}
            <Card className="border-slate-800 bg-black shadow-xl">
              <CardHeader className="border-b border-slate-800/50 bg-slate-900/50 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Live Note Stream</CardTitle>
                  <CardDescription>AI scoring engine actively running...</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                  </span>
                  <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Active</span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-800/50">
                  {scannedNotes.map((note) => (
                    <div 
                      key={note.id} 
                      onClick={() => note.status !== 'Pass' && setSelectedNote(note)}
                      className={`p-4 flex items-center justify-between transition-colors ${
                        note.status === 'Critical' 
                          ? 'bg-rose-500/5 hover:bg-rose-500/10 cursor-pointer' 
                          : note.status === 'Warning'
                            ? 'bg-amber-500/5 hover:bg-amber-500/10 cursor-pointer'
                            : 'hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="flex items-center gap-4 w-1/3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                          note.status === 'Critical' ? 'bg-rose-500/20 border-rose-500/30' : 
                          note.status === 'Warning' ? 'bg-amber-500/20 border-amber-500/30' : 
                          'bg-slate-800 border-slate-700'
                        }`}>
                          <FileText className={`w-5 h-5 ${
                            note.status === 'Critical' ? 'text-rose-400' : 
                            note.status === 'Warning' ? 'text-amber-400' : 
                            'text-slate-400'
                          }`} />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{note.clinician}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Client: {note.client} • {note.date}</p>
                        </div>
                      </div>
                      
                      <div className="w-1/4 text-sm font-medium text-slate-300">
                        {note.payer}
                      </div>

                      <div className="w-1/4 flex items-center gap-3">
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              note.status === 'Critical' ? 'bg-rose-500' : 
                              note.status === 'Warning' ? 'bg-amber-400' : 
                              'bg-emerald-500'
                            }`} 
                            style={{ width: `${note.score}%` }} 
                          />
                        </div>
                        <span className={`font-mono text-sm font-bold ${
                          note.status === 'Critical' ? 'text-rose-400' : 
                          note.status === 'Warning' ? 'text-amber-400' : 
                          'text-emerald-400'
                        }`}>{note.score}</span>
                      </div>
                      
                      <div className="w-24 text-right">
                        {note.status !== 'Pass' && (
                          <Button variant="ghost" size="sm" className={`h-8 w-8 p-0 ${note.status === 'Critical' ? 'text-rose-400' : 'text-amber-400'}`}>
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Sidebar: Deep Analysis */}
          <div className="space-y-6">
            
            {selectedNote ? (
              <Card className="border-rose-500/30 bg-rose-500/5 shadow-2xl shadow-rose-500/10 animate-in fade-in slide-in-from-right-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />
                <CardHeader className="pb-4">
                  <CardTitle className="text-rose-500 flex items-center gap-2">
                    <Fingerprint className="w-5 h-5" /> Audit Failure Risk
                  </CardTitle>
                  <CardDescription className="text-rose-200/70">AI detected a critical compliance failure.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div className="bg-slate-900/80 border border-rose-500/30 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clinician</span>
                      <span className="text-sm font-bold text-white">{selectedNote.clinician}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payer</span>
                      <span className="text-sm font-bold text-white">{selectedNote.payer}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Necessity Score</span>
                      <span className="text-sm font-bold text-rose-400 font-mono">{selectedNote.score} / 100</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <FileSearch className="w-4 h-4" /> Payer Guideline Violation
                    </h4>
                    <p className="text-sm font-medium text-white bg-rose-500/20 p-4 rounded-xl border border-rose-500/30 leading-relaxed shadow-inner">
                      {selectedNote.guideline}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Activity className="w-4 h-4 text-brand-400" /> AI Analysis
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-inner">
                      {selectedNote.reason}
                    </p>
                  </div>

                  <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-900/50">
                    Require Amendment from Clinician
                  </Button>
                  <Button onClick={() => setSelectedNote(null)} variant="ghost" className="w-full text-slate-400 hover:text-white">
                    Dismiss Warning
                  </Button>

                </CardContent>
              </Card>
            ) : (
              <Card className="border-slate-800 bg-slate-900/50 h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border-dashed">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Select a Flagged Note</h3>
                <p className="text-sm text-slate-400">
                  Click on any warning or critical note in the stream to view the exact payer guideline violation and AI analysis.
                </p>
              </Card>
            )}

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
