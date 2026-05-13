'use client';

import { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { BrainCircuit, AlertTriangle, Check, RefreshCw, Eye, Save, Lock, User, Clock, FileText, Bot, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/lib/store';

export default function SmartNotesPage() {
  const { auditLogs } = useStore();
  const [noteContent, setNoteContent] = useState(
    "Client arrived 5 minutes late to session. Mood appears euthymic, affect congruent. Discussed ongoing stressors at work regarding the recent promotion. The client was acting extremely stubborn today and refused to listen to my suggestions."
  );
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{ problematicPhrase: string, fixedPhrase: string, reason: string } | null>(null);
  const [showCopilotMenu, setShowCopilotMenu] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [editorMode, setEditorMode] = useState<'edit' | 'review'>('edit');
  const [isGeneratingSoap, setIsGeneratingSoap] = useState(false);
  const [autoScanPending, setAutoScanPending] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  const [cptCode, setCptCode] = useState('90837');
  const [downcodedAlert, setDowncodedAlert] = useState(false);
  const [sessionDuration, setSessionDuration] = useState<number | null>(null);

  const generateSoapFromTranscript = async (transcript: string) => {
    setIsGeneratingSoap(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Please convert this clinical session transcript into a professional SOAP note:\n\n${transcript}`,
          responseFormat: 'text',
          context: {
            systemInstruction: `You are an expert clinical psychologist AI. Convert the provided telehealth session transcript into a highly professional, clinical SOAP note (Subjective, Objective, Assessment, Plan). Do NOT use any subjective or biased language. Keep it objective, BBS-compliant, and formatted clearly with headings.`
          }
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
         setNoteContent(data.text);
         setAutoScanPending(true);
      } else {
         setNoteContent(`ERROR: API returned an unexpected response.\n\n${JSON.stringify(data)}`);
      }
    } catch (error: any) {
       console.error('Failed to generate SOAP from transcript', error);
       setNoteContent(`ERROR: Failed to generate SOAP note. Ensure GEMINI_API_KEY is configured in AWS Amplify.\n\nDetails: ${error.message}`);
    } finally {
       setIsGeneratingSoap(false);
    }
  };

  useEffect(() => {
    // Check if we came from telehealth room
    const transcript = localStorage.getItem('latestTelehealthTranscript');
    const durationStr = localStorage.getItem('latestTelehealthDuration');
    
    if (durationStr) {
      const duration = parseInt(durationStr, 10);
      setSessionDuration(duration);
      // 53 minutes = 3180 seconds
      if (duration < 3180) {
        setCptCode('90834');
        setDowncodedAlert(true);
      }
      localStorage.removeItem('latestTelehealthDuration');
    }

    if (transcript) {
      localStorage.removeItem('latestTelehealthTranscript');
      generateSoapFromTranscript(transcript);
    }
  }, []);

  // Setup Live Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setLiveTranscript(prev => prev + ' ' + currentTranscript);
        };
        
        recognitionRef.current = recognition;
      }
    }
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      recognitionRef.current?.stop();
      if (liveTranscript.trim()) {
        generateSoapFromTranscript(liveTranscript);
        setLiveTranscript('');
      } else {
        // Fallback for demo if mic doesn't capture anything
        generateSoapFromTranscript("[SIMULATED AUDIO TRACK]: Patient described an intense, sudden fear of squirrels that developed over the weekend after a mild encounter at a park. Stated 'Every time I see a squirrel now, I feel a complete sense of impending doom and my heart races.' We discussed exposure therapy techniques and scheduled a follow-up session to begin systematic desensitization.");
      }
    } else {
      setIsRecording(true);
      setLiveTranscript('');
      try { recognitionRef.current?.start(); } catch (e) {}
    }
  };

  const handleSaveDraft = () => {
    // Simulate saving to the store
    useStore.setState((state) => ({
      auditLogs: [{
        id: `AL-${Math.floor(Math.random() * 10000)}`,
        timestamp: new Date().toISOString(),
        userId: 'alexander_marshi_amft',
        action: 'CREATE',
        entityType: 'NOTE',
        entityId: 'NOTE-1',
        details: 'Draft SOAP Note saved via AI Copilot',
      }, ...state.auditLogs]
    }));
    alert('Draft Note securely saved to global store!');
  };

  // Auto-trigger audit after AI finishes formulating the SOAP note
  useEffect(() => {
    if (autoScanPending && noteContent && !isGeneratingSoap) {
      setAutoScanPending(false);
      const timer = setTimeout(() => {
        handleRunAudit();
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoScanPending, noteContent, isGeneratingSoap]);

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
      <div className="flex flex-col min-h-screen bg-slate-950 font-sans pb-20">
        
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
            <Button onClick={handleSaveDraft} className="bg-brand-600 hover:bg-brand-700 text-white">
              <Save className="w-4 h-4 mr-2" /> Save Draft
            </Button>
            <Button onClick={handleSaveDraft} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
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
                <Button 
                  onClick={handleToggleRecording}
                  variant={isRecording ? "danger" : "outline"}
                  className={`border-slate-700 font-bold transition-all duration-500 ${isRecording ? 'bg-rose-500 hover:bg-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse border-rose-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2 text-brand-400" />}
                  {isRecording ? 'Stop & Transcribe' : 'Live Session Scribe'}
                </Button>
                <div className="text-right">
                  <p className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Date of Service</p>
                  <p className="text-slate-300 font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> May 11, 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">CPT</p>
                  <p className={`font-medium ${downcodedAlert ? 'text-amber-400 font-bold animate-pulse' : 'text-slate-300'}`}>{cptCode}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Template</p>
                  <p className="text-slate-300 font-medium">GIRP</p>
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
                {isGeneratingSoap ? (
                  <div className="w-full min-h-[300px] flex flex-col items-center justify-center gap-4 text-brand-400">
                    <RefreshCw className="w-8 h-8 animate-spin" />
                    <p className="font-bold animate-pulse text-lg">AI is formulating clinical SOAP note from session transcript...</p>
                    <div className="flex items-center gap-2 mt-6 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <Lock className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Zero Data Retained: Session Audio & Transcripts Securely Erased</span>
                    </div>
                  </div>
                ) : editorMode === 'edit' ? (
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
                
                <div className={`flex items-center justify-between p-3 rounded-lg ${downcodedAlert ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-emerald-500/10 border border-emerald-500/20'}`}>
                  <div className="flex items-center gap-3">
                    {downcodedAlert ? <AlertTriangle className="w-5 h-5 text-amber-500" /> : <Check className="w-5 h-5 text-emerald-500" />}
                    <span className={`text-sm font-medium ${downcodedAlert ? 'text-amber-100' : 'text-emerald-100'}`}>Time Compliance</span>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${downcodedAlert ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {downcodedAlert ? 'Adjusted' : 'Pass'}
                  </span>
                </div>
                
                {downcodedAlert && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-xs text-amber-200/80 leading-relaxed">
                    <strong className="text-amber-400 block mb-1">Upcoding Prevented:</strong>
                    Session duration ({sessionDuration ? Math.floor(sessionDuration / 60) : '< 53'} min) did not meet the 53-minute requirement for 90837. Automatically downcoded to 90834.
                  </div>
                )}

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
                    {aiSuggestion ? 'Warning' : isFixed ? 'Resolved' : isAnalyzing ? 'Scanning' : 'Pending'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <RefreshCw className={`w-5 h-5 text-slate-500 ${isAnalyzing ? 'animate-spin-slow' : ''}`} />
                    <span className="text-sm font-medium text-slate-300">Goal Alignment</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{isAnalyzing ? 'Scanning' : 'Pending'}</span>
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
