'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Activity, FileText, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './Button';

export function AmbientScribe({ isSessionActive, onComplete }: { isSessionActive: boolean, onComplete: () => void }) {
  const [phase, setPhase] = useState<'listening' | 'processing' | 'completed'>('listening');
  const [transcript, setTranscript] = useState<string[]>([]);
  const [reviewStartTime, setReviewStartTime] = useState<number | null>(null);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [soapNote, setSoapNote] = useState({
    subjective: "Client, a 34-year-old female, presented for her weekly psychotherapy session reporting significantly elevated stress levels primarily related to an upcoming corporate merger at her workplace. She described experiencing persistent muscle tension, particularly in her cervical and trapezius regions, resulting in tension-type headaches occurring 3-4 days per week. She also noted onset of initial insomnia, taking 1-2 hours to fall asleep due to racing thoughts (\"I can't shut my brain off\"). She denies SI/HI, anhedonia, or significant changes in appetite.",
    objective: "Client appeared neatly groomed and oriented x4. Affect was visibly anxious but congruent with reported mood. Speech was spontaneous with normal rate, rhythm, and volume. Thought processes were logical and goal-directed. Motor activity was slightly restless (frequent shifting in chair, hand-wringing). Client engaged cooperatively with a guided diaphragmatic breathing exercise (4-7-8 method) during the session, with visible reduction in autonomic arousal noted post-exercise.",
    assessment: "Client continues to meet criteria for Generalized Anxiety Disorder (F41.1). Current symptom exacerbation is directly correlated with acute occupational psychosocial stressors. While she is developing improved insight into her somatic symptom profile, she continues to demonstrate maladaptive cognitive fusion with worry-related thoughts. Her positive response to in-session somatic regulation techniques indicates a good prognosis for continued skill-building.",
    plan: "1. Psychoeducation provided on the physiological mechanisms of the stress response and the rationale for down-regulation techniques.\n2. Client agreed to practice diaphragmatic breathing (4-7-8 method) twice daily, prioritizing the pre-sleep window to target sleep-onset latency.\n3. Assigned cognitive defusion worksheet (identifying \"worry stories\") to be completed prior to next session.\n4. Reassess sleep quality and frequency of tension headaches at next scheduled appointment. Continue weekly CBT interventions."
  });

  useEffect(() => {
    if (!isSessionActive && phase === 'listening') {
      setPhase('processing');
      setTimeout(() => {
        setPhase('completed');
        setReviewStartTime(Date.now());
      }, 3000);
    }
  }, [isSessionActive, phase]);

  useEffect(() => {
    if (phase === 'listening') {
      const phrases = [
        "Client reports feeling overwhelmed with work recently.",
        "Experiencing tension headaches and poor sleep.",
        "We discussed deep breathing exercises to manage acute stress.",
        "Client agreed to try the exercises twice daily this week."
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < phrases.length) {
          setTranscript(prev => [...prev, phrases[i]]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleSubmit = () => {
    if (reviewStartTime && Date.now() - reviewStartTime < 10000) {
      setErrorMsg("Nobody can read that fast! Make sure to review everything carefully before signing, you may want to make changes.");
      return;
    }
    if (!hasConfirmed) {
      setErrorMsg("Please confirm that you have reviewed the note.");
      return;
    }
    setErrorMsg(null);
    onComplete();
  };

  return (
    <div className="flex h-full flex-col bg-slate-900 border-l border-slate-800 text-white w-full">
      <div className="flex items-center gap-3 border-b border-slate-800 p-4 shrink-0">
        <div className={`p-2 rounded-lg ${phase === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-brand-500/20 text-brand-400'}`}>
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold text-slate-100">Ambient AI Scribe</h2>
          <p className="text-xs text-slate-400">
            {phase === 'listening' && 'Listening & analyzing in real-time...'}
            {phase === 'processing' && 'Synthesizing clinical note...'}
            {phase === 'completed' && 'SOAP Note Generated'}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {phase === 'listening' && (
          <>
            <div className="flex items-center gap-2 text-xs font-medium text-brand-400 mb-2">
              <Activity className="h-4 w-4 animate-pulse" />
              LIVE TRANSCRIPT
            </div>
            <div className="space-y-3">
              {transcript.map((text, i) => (
                <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-500 text-sm text-slate-300 leading-relaxed border-l-2 border-slate-700 pl-3">
                  {text}
                </div>
              ))}
              <div className="flex items-center gap-1 mt-4">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </>
        )}

        {phase === 'processing' && (
          <div className="flex h-full flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-500">
            <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
            <p className="text-sm font-medium text-slate-300">Structuring clinical concepts...</p>
            <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 animate-[progress_3s_ease-in-out_forwards]" />
            </div>
          </div>
        )}

        {phase === 'completed' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-amber-400 mb-1">Draft Note - Clinician Review Required</h3>
                  <p className="text-xs text-amber-500/80">This note was AI-generated. You must use your clinical judgment to review, edit, and sign off before submission.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="space-y-1">
                <h4 className="font-semibold text-slate-100">Subjective</h4>
                <textarea 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-slate-300 min-h-[120px] focus:ring-1 focus:ring-brand-500 focus:border-brand-500 resize-y"
                  value={soapNote.subjective}
                  onChange={(e) => setSoapNote({...soapNote, subjective: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-slate-100">Objective</h4>
                <textarea 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-slate-300 min-h-[120px] focus:ring-1 focus:ring-brand-500 focus:border-brand-500 resize-y"
                  value={soapNote.objective}
                  onChange={(e) => setSoapNote({...soapNote, objective: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-slate-100">Assessment</h4>
                <textarea 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-slate-300 min-h-[120px] focus:ring-1 focus:ring-brand-500 focus:border-brand-500 resize-y"
                  value={soapNote.assessment}
                  onChange={(e) => setSoapNote({...soapNote, assessment: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-slate-100">Plan</h4>
                <textarea 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-slate-300 min-h-[120px] focus:ring-1 focus:ring-brand-500 focus:border-brand-500 resize-y"
                  value={soapNote.plan}
                  onChange={(e) => setSoapNote({...soapNote, plan: e.target.value})}
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-700 bg-slate-800/50 cursor-pointer hover:bg-slate-800 transition-colors">
                <div className="flex items-center h-5 mt-0.5">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-brand-500 focus:ring-brand-500 focus:ring-offset-slate-900"
                    checked={hasConfirmed}
                    onChange={(e) => {
                      setHasConfirmed(e.target.checked);
                      if (e.target.checked && errorMsg === "Please confirm that you have reviewed the note.") {
                        setErrorMsg(null);
                      }
                    }}
                  />
                </div>
                <div className="text-sm text-slate-300">
                  <span className="font-medium text-slate-200 block mb-0.5">I confirm clinical review</span>
                  I have reviewed this clinical note, made necessary edits, and accept responsibility for its contents and accuracy.
                </div>
              </label>
            </div>
            
            {errorMsg && (
              <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 p-3 rounded-lg animate-in shake">
                {errorMsg}
              </div>
            )}
          </div>
        )}
      </div>

      {phase === 'completed' && (
        <div className="p-4 border-t border-slate-800 bg-slate-900 shrink-0">
          <Button 
            className="w-full bg-brand-600 hover:bg-brand-700 text-white border-none"
            onClick={handleSubmit}
          >
            <FileText className="h-4 w-4 mr-2" />
            Sign & Submit Claim
          </Button>
        </div>
      )}
    </div>
  );
}
