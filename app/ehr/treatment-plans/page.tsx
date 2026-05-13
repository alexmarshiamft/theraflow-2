'use client';

import { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Mic, 
  Square, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  ShieldCheck,
  FileText,
  Clock,
  Target,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function TreatmentPlansPage() {
  const [phase, setPhase] = useState<'idle' | 'recording' | 'processing' | 'generating' | 'done'>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [processingStep, setProcessingStep] = useState(0);
  const [typedText, setTypedText] = useState('');

  const rawTranscript = "Client presents with severe PTSD symptoms following an MVA three months ago. Experiencing hyperarousal, intrusive flashbacks, and avoidance behaviors. Reports sleep disturbances and panic attacks while driving. Client expresses readiness to process the trauma. Recommending a 90-day trauma-focused EMDR protocol starting with stabilization and resourcing, moving into target desensitization, and finishing with future templating to restore functional driving ability.";

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phase === 'recording') {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === 'processing') {
      const steps = [
        "Analyzing clinical narrative...",
        "Identifying DSM-5-TR diagnostic criteria (F43.10)...",
        "Cross-referencing Wiley Treatment Planner objectives...",
        "Structuring 3-phase EMDR protocol...",
        "Ensuring insurance compliance & Golden Thread continuity..."
      ];
      
      let stepIdx = 0;
      const stepInterval = setInterval(() => {
        setProcessingStep(stepIdx);
        stepIdx++;
        if (stepIdx > steps.length) {
          clearInterval(stepInterval);
          setPhase('generating');
        }
      }, 1800);
      return () => clearInterval(stepInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'generating') {
      let i = 0;
      const typeInterval = setInterval(() => {
        setTypedText(rawTranscript.slice(0, i));
        i += 3;
        if (i > rawTranscript.length) {
          clearInterval(typeInterval);
          setTimeout(() => setPhase('done'), 1000);
        }
      }, 20);
      return () => clearInterval(typeInterval);
    }
  }, [phase]);

  const handleStart = () => {
    setPhase('recording');
    setRecordingTime(0);
  };

  const handleStop = () => {
    setPhase('processing');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-indigo-400" />
            AI Treatment Architect
          </h2>
          <p className="text-slate-400 mt-1">
            Dictate your clinical conceptualization and watch Theraflow generate an audit-proof 90-day plan.
          </p>
        </div>
      </div>

      {phase === 'idle' || phase === 'recording' ? (
        <div className="max-w-3xl mx-auto mt-20 text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="relative inline-flex items-center justify-center">
            {/* Pulsing background when recording */}
            {phase === 'recording' && (
              <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping scale-150 duration-1000" />
            )}
            
            <div className={cn(
              "w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500 relative z-10",
              phase === 'recording' ? 'bg-red-500 shadow-[0_0_50px_rgba(239,68,68,0.4)]' : 'bg-slate-800 border border-slate-700'
            )}>
              {phase === 'idle' ? (
                <Mic className="h-16 w-16 text-slate-400" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <div 
                      key={bar}
                      className="w-2 bg-white rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 40 + 20}%`,
                        animationDelay: `${bar * 0.1}s`,
                        animationDuration: '0.5s'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">
              {phase === 'idle' ? 'Ready for Dictation' : 'Listening...'}
            </h3>
            {phase === 'recording' && (
              <p className="text-4xl font-mono text-red-400 tracking-wider">
                {formatTime(recordingTime)}
              </p>
            )}
            <p className="text-slate-400 max-w-lg mx-auto">
              {phase === 'idle' 
                ? "Describe the client's presentation, symptoms, and your general approach. We'll handle the DSM-5-TR criteria and Wiley objectives."
                : "Speak naturally. Theraflow is capturing your clinical narrative and extracting key psychological metrics."}
            </p>
          </div>

          <div className="pt-8">
            {phase === 'idle' ? (
              <Button size="lg" onClick={handleStart} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-full h-14 text-lg shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                <Mic className="mr-2 h-5 w-5" />
                Start Dictation
              </Button>
            ) : (
              <Button size="lg" onClick={handleStop} variant="danger" className="px-8 rounded-full h-14 text-lg animate-pulse">
                <Square className="mr-2 h-5 w-5" />
                End & Generate Plan
              </Button>
            )}
          </div>
        </div>
      ) : null}

      {(phase === 'processing' || phase === 'generating') && (
        <div className="max-w-4xl mx-auto mt-12 space-y-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
              <div className="h-full bg-indigo-500 transition-all duration-1000 ease-in-out" style={{ width: phase === 'generating' ? '100%' : `${(processingStep / 5) * 100}%` }} />
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center animate-spin-slow">
                <BrainCircuit className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Theraflow AI is architecting the plan...</h3>
                <p className="text-slate-400">Synthesizing clinical narrative into actionable objectives.</p>
              </div>
            </div>

            {phase === 'processing' && (
              <div className="space-y-4 font-mono text-sm">
                {[
                  "Analyzing clinical narrative...",
                  "Identifying DSM-5-TR diagnostic criteria (F43.10)...",
                  "Cross-referencing Wiley Treatment Planner objectives...",
                  "Structuring 3-phase EMDR protocol...",
                  "Ensuring insurance compliance & Golden Thread continuity..."
                ].map((step, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "flex items-center gap-3 transition-opacity duration-500",
                      idx < processingStep ? "text-emerald-400" : idx === processingStep ? "text-indigo-400 animate-pulse" : "text-slate-600 opacity-50"
                    )}
                  >
                    {idx < processingStep ? <CheckCircle2 className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                    {step}
                  </div>
                ))}
              </div>
            )}

            {phase === 'generating' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="bg-slate-950 rounded-lg p-6 font-mono text-sm text-indigo-200/80 leading-relaxed min-h-[120px]">
                  {typedText}
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div className="max-w-5xl mx-auto space-y-6 animate-in slide-in-from-bottom-10 fade-in duration-700">
          
          <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 px-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
              <div>
                <h3 className="text-emerald-400 font-semibold">Golden Thread Verified</h3>
                <p className="text-emerald-400/70 text-sm">This treatment plan exceeds Optum, Aetna, and Cigna audit standards.</p>
              </div>
            </div>
            <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
              Export to EHR
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Phase 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">Phase 1</span>
                <span className="text-slate-500 text-sm flex items-center gap-1"><Clock className="h-3 w-3" /> Days 1-30</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 relative z-10">Stabilization & Resourcing</h3>
              <p className="text-slate-400 text-sm mb-6 relative z-10">Establish safety, emotional regulation skills, and prepare the client for trauma processing.</p>
              
              <div className="space-y-3 relative z-10">
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-300">Client will verbalize 3 grounding techniques (e.g., 5-4-3-2-1 method, safe state visualization) to manage physiological hyperarousal when triggered by driving.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-300">Client will report a 50% reduction in sleep disturbances by implementing a structured sleep hygiene protocol.</p>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full">Phase 2</span>
                <span className="text-slate-500 text-sm flex items-center gap-1"><Clock className="h-3 w-3" /> Days 31-60</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 relative z-10">Target Desensitization</h3>
              <p className="text-slate-400 text-sm mb-6 relative z-10">Apply standard EMDR protocol to process the target memory of the motor vehicle accident.</p>
              
              <div className="space-y-3 relative z-10">
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-300">Client will process the "MVA target memory" utilizing bilateral stimulation to reduce Subjective Units of Disturbance (SUDs) from an 8/10 to a 0/10.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-300">Client will increase Validity of Cognition (VOC) for the positive core belief "I am safe now" from a 2/7 to a 7/7.</p>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">Phase 3</span>
                <span className="text-slate-500 text-sm flex items-center gap-1"><Clock className="h-3 w-3" /> Days 61-90</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 relative z-10">Integration & Future Templating</h3>
              <p className="text-slate-400 text-sm mb-6 relative z-10">Install future templates to prepare the client for functional driving recovery and discharge.</p>
              
              <div className="space-y-3 relative z-10">
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-300">Client will successfully run a future template of "driving on the freeway" without experiencing physiological panic responses.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-300">Client will resume driving at least 3 times per week, maintaining a SUDs level of 2/10 or lower during functional exposure.</p>
                </div>
              </div>
            </div>

          </div>
          
          <div className="flex justify-center mt-8">
             <Button variant="ghost" onClick={() => setPhase('idle')} className="text-slate-400 hover:text-white">
                Generate Another Plan
             </Button>
          </div>
        </div>
      )}

    </div>
  );
}
