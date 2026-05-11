'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UserCog, Send, BrainCircuit, ShieldAlert, Sparkles, BookOpen, AlertTriangle } from 'lucide-react';

interface Insight {
  category: string;
  content: string;
  icon: any;
  color: string;
}

export default function AISupervisor() {
  const router = useRouter();
  const [caseInput, setCaseInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<Insight[] | null>(null);

  const handleAnalyze = () => {
    if (!caseInput.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setInsights([
        {
          category: 'Differential Diagnosis',
          content: 'While the presentation aligns with MDD, the rapid shifts in self-worth and intense relational reactivity suggest assessing for Borderline Personality traits or Complex PTSD (ICD-11).',
          icon: BookOpen,
          color: 'text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/10'
        },
        {
          category: 'Intervention Strategy',
          content: 'Consider temporarily suspending trauma processing. The client appears to lack sufficient grounding resources. Recommend 2-3 sessions focused entirely on DBT distress tolerance (e.g., TIPP skills).',
          icon: BrainCircuit,
          color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
        },
        {
          category: 'Countertransference Risk',
          content: 'The client\'s frequent crises may induce "rescuer" dynamics. Maintain strict boundaries around between-session communication to prevent burnout and foster client self-efficacy.',
          icon: AlertTriangle,
          color: 'text-amber-400 border-amber-500/20 bg-amber-500/10'
        },
        {
          category: 'Risk Assessment',
          content: 'Current language indicates passive ideation. Ensure the safety plan is updated and accessible. Document the lack of intent or plan explicitly in your next progress note.',
          icon: ShieldAlert,
          color: 'text-rose-400 border-rose-500/20 bg-rose-500/10'
        }
      ]);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-white overflow-hidden relative font-sans">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
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
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <UserCog className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                AI Case Supervisor
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">Early Access</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">Peer consultation & conceptualization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto z-10 p-8 flex justify-center">
        <div className="w-full max-w-4xl space-y-8">
          
          {/* Input Section */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/60 p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Submit Case Conceptualization</h3>
                <p className="text-slate-400 text-sm">
                  Paste anonymized clinical presentation, session notes, or diagnostic dilemmas. The AI will provide evidence-based supervision insights. Do not include PHI.
                </p>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={caseInput}
                onChange={(e) => setCaseInput(e.target.value)}
                placeholder="Client is a 34yo presenting with sudden exacerbation of depressive symptoms following..."
                className="w-full h-48 bg-slate-950/50 border border-slate-700/50 rounded-2xl p-6 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 resize-none transition-all leading-relaxed"
                disabled={isAnalyzing}
              />
              
              <button 
                onClick={handleAnalyze}
                disabled={!caseInput.trim() || isAnalyzing}
                className="absolute bottom-6 right-6 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Synthesizing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Request Consult
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Analysis Results Section */}
          {isAnalyzing && (
            <div className="p-12 flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-500">
              <div className="relative">
                <div className="w-20 h-20 border-2 border-amber-500/20 rounded-full animate-ping absolute inset-0"></div>
                <div className="w-20 h-20 bg-slate-900 border border-amber-500/50 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                  <UserCog className="w-8 h-8 text-amber-400 animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-lg font-bold text-white">Cross-referencing DSM-5-TR...</h4>
                <p className="text-slate-400 text-sm">Evaluating intervention efficacy and risk factors.</p>
              </div>
            </div>
          )}

          {insights && !isAnalyzing && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h3 className="text-xl font-bold text-white px-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> Clinical Supervision Report
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insights.map((insight, idx) => (
                  <div 
                    key={idx} 
                    className={`p-6 rounded-3xl border backdrop-blur-md bg-slate-900/40 relative overflow-hidden group hover:border-slate-600 transition-colors ${insight.color.split(' ')[1]}`}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 opacity-20 ${insight.color.split(' ')[2]}`}></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-xl border ${insight.color}`}>
                          <insight.icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-slate-200">{insight.category}</h4>
                      </div>
                      
                      <p className="text-slate-400 leading-relaxed text-sm">
                        {insight.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 text-center flex flex-col items-center gap-4 mt-8">
                <p className="text-sm text-slate-400">
                  This analysis is AI-generated for peer consultation purposes only and does not substitute for licensed clinical supervision or crisis protocols.
                </p>
                <button className="text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors border-b border-amber-400/30 pb-0.5">
                  Export Supervision Notes
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
