'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { AlertCircle, CheckCircle2, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type IssueStatus = 'idle' | 'resolving' | 'fixed';

interface Issue {
  id: string;
  message: string;
  module: string;
  status: IssueStatus;
}

export function AIFixIssues() {
  const [issues, setIssues] = useState<Issue[]>([
    { id: '1', message: '12 claims rejected by Aetna: Missing CPT modifier 95', module: 'Claims', status: 'idle' },
    { id: '2', message: '3 clients missing annual intake assessment updates', module: 'Clinical', status: 'idle' },
    { id: '3', message: 'Payroll discrepancy: David Foster, ASW missing triadic supervision hour', module: 'Payroll', status: 'idle' },
  ]);

  const [isFixingAll, setIsFixingAll] = useState(false);

  const handleFixAll = () => {
    setIsFixingAll(true);
    
    // Simulate fixing sequentially
    issues.forEach((issue, index) => {
      // Set to resolving
      setTimeout(() => {
        setIssues(prev => prev.map(p => p.id === issue.id ? { ...p, status: 'resolving' } : p));
      }, index * 1500);

      // Set to fixed
      setTimeout(() => {
        setIssues(prev => prev.map(p => p.id === issue.id ? { ...p, status: 'fixed' } : p));
        if (index === issues.length - 1) {
          setIsFixingAll(false);
        }
      }, (index * 1500) + 1500);
    });
  };

  const allFixed = issues.every(i => i.status === 'fixed');

  return (
    <Card className="border-brand-200/50 shadow-lg relative overflow-hidden bg-slate-900 text-white">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-brand-500 opacity-10 blur-3xl pointer-events-none"></div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Action Required
          </CardTitle>
          <span className="text-xs text-slate-400 mt-1 block">
            {issues.filter(i => i.status !== 'fixed').length} unresolved items detected
          </span>
        </div>
        {!allFixed && (
          <Button 
            onClick={handleFixAll}
            disabled={isFixingAll}
            className="bg-brand-600 hover:bg-brand-500 text-white border-none shadow-lg shadow-brand-900/50 transition-all hover:scale-105"
          >
            {isFixingAll ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                AI Agent Working...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Auto-Fix with AI
              </>
            )}
          </Button>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {issues.map((issue) => (
            <div 
              key={issue.id}
              className={`relative flex items-center gap-3 rounded-lg border p-3 transition-all duration-500 overflow-hidden ${
                issue.status === 'fixed' 
                  ? 'border-emerald-500/30 bg-emerald-500/10' 
                  : issue.status === 'resolving'
                  ? 'border-brand-500/50 bg-brand-500/10'
                  : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
              }`}
            >
              {/* Resolving scanline animation */}
              {issue.status === 'resolving' && (
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <div className="w-[10px] h-full bg-brand-400/30 blur-sm animate-[scan_1.5s_ease-in-out_infinite]" />
                </div>
              )}

              {issue.status === 'fixed' ? (
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400 z-10" />
              ) : issue.status === 'resolving' ? (
                <Sparkles className="h-5 w-5 flex-shrink-0 text-brand-400 animate-pulse z-10" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-500 z-10" />
              )}
              
              <div className="flex-1 min-w-0 z-10">
                <span className={`text-sm block truncate transition-all duration-500 ${issue.status === 'fixed' ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                  {issue.message}
                </span>
                {issue.status === 'resolving' && (
                  <span className="text-xs text-brand-400 font-medium animate-pulse mt-0.5 block">
                    Executing runbook: appending modifier 95, verifying signature...
                  </span>
                )}
                {issue.status === 'fixed' && (
                  <span className="text-xs text-emerald-400 font-medium mt-0.5 block">
                    Resolved autonomously by AI
                  </span>
                )}
              </div>
              
              <div className={`text-xs px-2 py-1 rounded-md z-10 font-medium ${
                issue.status === 'fixed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'
              }`}>
                {issue.module}
              </div>
            </div>
          ))}

          {allFixed && (
            <div className="mt-4 p-4 rounded-xl border border-brand-500/30 bg-brand-500/10 flex items-center justify-center animate-in zoom-in duration-500">
              <div className="text-center">
                <CheckCircle2 className="h-8 w-8 text-brand-400 mx-auto mb-2" />
                <h3 className="text-brand-300 font-medium">All Issues Resolved</h3>
                <p className="text-sm text-slate-400 mt-1">Theraflow AI successfully remediated 3 items across your practice.</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
