'use client';

import { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { BrainCircuit, AlertTriangle, Check, RefreshCw, Eye, Save, Lock, User, Clock, FileText, Bot } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SmartNotesPage() {
  const [noteContent, setNoteContent] = useState(
    "Client arrived 5 minutes late to session. Mood appears euthymic, affect congruent. Discussed ongoing stressors at work regarding the recent promotion. The client was acting extremely stubborn today and refused to listen to my suggestions."
  );
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{ problematicPhrase: string, fixedPhrase: string, reason: string } | null>(null);
  const [showCopilotMenu, setShowCopilotMenu] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [editorMode, setEditorMode] = useState<'edit' | 'review'>('edit');

  const handleRunAudit = async () => {
    if (!noteContent.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setIsFixed(false);
    setAiSuggestion(null);
    setShowCopilotMenu(false);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: noteContent,
          responseFormat: 'json',
          context: {
            systemInstruction: `Analyze the following clinical progress note for subjective language, clinical bias, or liability risks (e.g., emotionally charged language, countertransference). 
If you find a problematic phrase, return a JSON object with:
"problematicPhrase": the exact verbatim substring from the text that is problematic.
"fixedPhrase": an objective, BBS-compliant reframe.
"reason": a short 1-sentence explanation of the liability risk.
If no issues are found, return {"problematicPhrase": null}.`
          }
        }),
      });

      const data = await response.json();
      if (response.ok && data.text) {
        // Sometimes the model returns markdown JSON block, so strip it
        const cleanedText = data.text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedText);
        
        if (parsed.problematicPhrase && noteContent.includes(parsed.problematicPhrase)) {
          setAiSuggestion(parsed);
          setEditorMode('review');
        } else {
          setIsFixed(true); // No issues found
        }
      }
    } catch (error) {
      console.error("AI Audit failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAcceptFix = () => {
    if (!aiSuggestion) return;
    const newContent = noteContent.replace(aiSuggestion.problematicPhrase, aiSuggestion.fixedPhrase);
    setNoteContent(newContent);
    setAiSuggestion(null);
    setShowCopilotMenu(false);
    setIsFixed(true);
    setEditorMode('edit');
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-slate-950 font-sans">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-brand-400" />
              Smart Clinical Notes
            </h1>
            <p className="text-slate-400 text-sm mt-1">AI-powered active liability protection and objective reframing.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 font-bold">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              AI Copilot Active
            </div>
            <Button className="bg-brand-600 hover:bg-brand-700 text-white">
              <Save className="w-4 h-4 mr-2" /> Save Draft
            </Button>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Lock className="w-4 h-4 mr-2" /> Sign & Lock
            </Button>
          </div>
        </div>

        <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Editor Area */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Client Context Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Michael Chang</h3>
                  <p className="text-xs text-slate-400">DOB: 11/04/1988 • Dx: F41.1 (GAD)</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-right">
                  <p className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Date of Service</p>
                  <p className="text-slate-300 font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> May 11, 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Template</p>
                  <p className="text-slate-300 font-medium">GIRP (Goal, Interv, Resp, Plan)</p>
                </div>
              </div>
            </div>

            {/* The Editor */}
            <Card className="flex-1 border-slate-800 bg-black shadow-2xl relative overflow-visible">
              <CardHeader className="border-b border-slate-800/50 bg-slate-900/30">
                <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                  <span>Objective / Response</span>
                  {!isFixed && editorMode === 'edit' && (
                    <button 
                      onClick={handleRunAudit}
                      disabled={isAnalyzing}
                      className="text-brand-400 hover:text-brand-300 flex items-center gap-2 text-xs normal-case tracking-normal transition-colors bg-brand-500/10 px-3 py-1.5 rounded-md border border-brand-500/20 disabled:opacity-50"
                    >
                      {isAnalyzing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Bot className="w-3 h-3" />}
                      {isAnalyzing ? 'Analyzing Note...' : 'Run AI Compliance Audit'}
                    </button>
                  )}
                  {editorMode === 'review' && (
                     <button onClick={() => setEditorMode('edit')} className="text-slate-400 hover:text-white text-xs normal-case">Back to Edit</button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 relative">
                
                {/* Editor Area */}
                {editorMode === 'edit' ? (
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="w-full min-h-[300px] bg-transparent text-lg leading-relaxed text-slate-300 font-medium resize-none focus:outline-none border-none p-0"
                    placeholder="Type clinical progress note here..."
                  />
                ) : (
                  <div className="text-lg leading-relaxed text-slate-300 font-medium min-h-[300px]">
                    {aiSuggestion ? (
                      noteContent.split(aiSuggestion.problematicPhrase).map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="relative inline-block">
                              <span 
                                onClick={() => setShowCopilotMenu(true)}
                                className="transition-all duration-500 bg-amber-500/20 text-amber-200 border-b-2 border-amber-500 border-dashed cursor-pointer hover:bg-amber-500/30"
                              >
                                {aiSuggestion.problematicPhrase}
                              </span>
                              
                              {/* Floating AI Copilot Menu */}
                              {showCopilotMenu && (
                                <div className="absolute top-full left-0 mt-4 w-[450px] bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl z-50 animate-in fade-in slide-in-from-top-4 overflow-hidden">
                                  <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-3 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                                    <span className="font-bold text-amber-500 text-sm">Potential Clinical Bias Detected</span>
                                  </div>
                                  <div className="p-4 space-y-4">
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                      {aiSuggestion.reason}
                                    </p>
                                    
                                    <div className="bg-black/50 border border-slate-800 rounded-xl p-3">
                                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                                        <BrainCircuit className="w-3 h-3 text-brand-400" /> AI Suggested Reframing
                                      </p>
                                      <p className="text-sm text-emerald-400 font-medium">"{aiSuggestion.fixedPhrase}"</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 pt-2">
                                      <Button onClick={handleAcceptFix} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/50">
                                        <Check className="w-4 h-4 mr-2" /> Apply Objective Reframe
                                      </Button>
                                      <Button onClick={() => setShowCopilotMenu(false)} variant="outline" className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800">
                                        Dismiss
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </span>
                          )}
                        </span>
                      ))
                    ) : (
                      <span>{noteContent}</span>
                    )}
                  </div>
                )}

              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar: AI Analysis */}
          <div className="space-y-6">
            <Card className="border-border shadow-sm bg-slate-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-indigo-400" />
                  Real-Time Audit
                </CardTitle>
                <CardDescription>AI is passively scanning for compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-100">Medical Necessity</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Pass</span>
                </div>

                <div className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-500 ${aiSuggestion ? 'bg-amber-500/10 border border-amber-500/20' : isFixed ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-slate-800 border border-slate-700'}`}>
                  <div className="flex items-center gap-3">
                    {aiSuggestion ? <AlertTriangle className="w-5 h-5 text-amber-500" /> : isFixed ? <Check className="w-5 h-5 text-emerald-500" /> : <RefreshCw className={`w-5 h-5 text-slate-500 ${isAnalyzing ? 'animate-spin' : ''}`} />}
                    <span className={`text-sm font-medium ${aiSuggestion ? 'text-amber-100' : isFixed ? 'text-emerald-100' : 'text-slate-300'}`}>Objective Language</span>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${aiSuggestion ? 'text-amber-500' : isFixed ? 'text-emerald-500' : 'text-slate-500'}`}>
                    {aiSuggestion ? 'Warning' : isFixed ? 'Resolved' : 'Scanning'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-slate-500 animate-spin-slow" />
                    <span className="text-sm font-medium text-slate-300">Goal Alignment</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scanning</span>
                </div>

              </CardContent>
            </Card>

            <Card className="border-indigo-500/20 bg-indigo-500/5 shadow-lg shadow-indigo-500/5">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4 border border-indigo-500/30">
                  <BrainCircuit className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Why this matters.</h3>
                <p className="text-sm text-indigo-200/70 leading-relaxed">
                  Subjective language in clinical notes is the #1 reason insurance companies claw back revenue during audits, and it poses immense legal liability. The AI Copilot enforces clinical objectivity across your entire practice, automatically.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
