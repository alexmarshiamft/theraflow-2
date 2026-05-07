'use client';

import { useState } from 'react';
import { useStore, ClinicalNote } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  ClipboardCheck, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Sparkles,
  ShieldAlert,
  Fingerprint,
  MessageSquare,
  Send,
  X
} from 'lucide-react';

type ChatState = 'idle' | 'delivered' | 'read' | 'typing' | 'responded';

export default function SupervisionPage() {
  const { clinicalNotes, updateClinicalNote } = useStore();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  
  const [showChat, setShowChat] = useState(false);
  const [chatState, setChatState] = useState<ChatState>('idle');
  
  const pendingNotes = clinicalNotes.filter(n => n.status === 'pending_review');
  const signedNotes = clinicalNotes.filter(n => n.status === 'signed');
  
  const selectedNote = clinicalNotes.find(n => n.id === selectedNoteId);

  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    
    // Simulate AI scan delay
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2500);
  };

  const handleSign = () => {
    if (!selectedNote) return;
    updateClinicalNote(selectedNote.id, { status: 'signed' });
    setSelectedNoteId(null);
    setScanComplete(false);
    setShowChat(false);
  };

  const handleRequestRevisions = () => {
    setShowChat(true);
    setChatState('idle');
  };

  const handleSendRevisionMessage = () => {
    setChatState('delivered');
    setTimeout(() => setChatState('read'), 1500);
    setTimeout(() => setChatState('typing'), 3000);
    setTimeout(() => {
      setChatState('responded');
      // Simulate moving out of queue after 2 seconds
      setTimeout(() => {
        if (selectedNote) {
           updateClinicalNote(selectedNote.id, { status: 'rejected' });
           setSelectedNoteId(null);
           setShowChat(false);
           setScanComplete(false);
        }
      }, 3000);
    }, 6000);
  };

  const renderHighlightedText = (text: string, location: 'subjective' | 'objective' | 'assessment' | 'plan') => {
    if (!scanComplete || !selectedNote?.aiFlags) return text;
    
    const flag = selectedNote.aiFlags.find(f => f.location === location);
    if (!flag) return text;

    return (
      <div className={`relative rounded-md transition-all duration-500 ${flag.type === 'error' ? 'bg-red-500/10 border-l-4 border-red-500 p-3' : 'bg-amber-500/10 border-l-4 border-amber-500 p-3'}`}>
        <div className="text-sm font-medium mb-1 flex items-center gap-1.5">
          {flag.type === 'error' ? <ShieldAlert className="h-4 w-4 text-red-500" /> : <AlertCircle className="h-4 w-4 text-amber-500" />}
          <span className={flag.type === 'error' ? 'text-red-400' : 'text-amber-400'}>AI Flag: {flag.text}</span>
        </div>
        <p className="text-slate-300 mt-2">{text}</p>
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-slate-200 shadow-2xl relative">
      {/* Left Sidebar: Note Queue */}
      <div className="w-80 border-r border-slate-800 bg-slate-950 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-brand-500" />
            Supervision Queue
          </h2>
          <div className="flex gap-2 mt-3">
            <Badge className="bg-brand-500/20 text-brand-400 border border-brand-500/30">
              {pendingNotes.length} Pending
            </Badge>
            <Badge className="bg-slate-800 text-slate-400 border border-slate-700">
              {signedNotes.length} Signed Today
            </Badge>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {pendingNotes.length === 0 ? (
            <div className="text-center p-6 text-slate-500">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-emerald-500/50" />
              <p className="text-sm">Queue is empty. Great job!</p>
            </div>
          ) : (
            pendingNotes.map(note => (
              <button
                key={note.id}
                onClick={() => {
                  setSelectedNoteId(note.id);
                  setScanComplete(false);
                  setIsScanning(false);
                  setShowChat(false);
                }}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                  selectedNoteId === note.id 
                    ? 'bg-slate-800 border-brand-500/50 shadow-[0_0_15px_rgba(14,165,233,0.1)]' 
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-slate-200 text-sm">{note.clientName}</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {note.date}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mb-2">Associate: {note.associateName}</div>
                <div className="flex gap-1">
                  <Badge variant="warning" className="text-[10px] py-0">Needs Review</Badge>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col bg-slate-900 relative transition-all duration-300 ${showChat ? 'mr-[400px]' : ''}`}>
        {selectedNote ? (
          <>
            {/* Note Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
              <div>
                <h1 className="text-2xl font-bold text-slate-100">{selectedNote.clientName} - SOAP Note</h1>
                <p className="text-sm text-slate-400 mt-1">Submitted by {selectedNote.associateName} on {selectedNote.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  onClick={handleScan}
                  disabled={isScanning || scanComplete}
                  className={`border-none shadow-lg transition-all ${
                    scanComplete 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/50'
                  }`}
                >
                  {isScanning ? (
                    <><Search className="h-4 w-4 mr-2 animate-spin" /> Scanning Note...</>
                  ) : scanComplete ? (
                    <><CheckCircle2 className="h-4 w-4 mr-2" /> Scan Complete</>
                  ) : (
                    <><Sparkles className="h-4 w-4 mr-2" /> AI Clinical Scan</>
                  )}
                </Button>
                
                {scanComplete && selectedNote.aiFlags && selectedNote.aiFlags.length > 0 && (
                  <Button 
                    onClick={handleRequestRevisions}
                    className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/50 shadow-lg"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" /> Request Revisions
                  </Button>
                )}

                <Button 
                  onClick={handleSign}
                  className="bg-brand-600 hover:bg-brand-500 text-white border-none shadow-lg shadow-brand-900/50"
                >
                  <Fingerprint className="h-4 w-4 mr-2" /> Sign & Approve
                </Button>
              </div>
            </div>

            {/* Note Body */}
            <div className="flex-1 overflow-y-auto p-8 relative">
              {/* Scanline Animation Overlay */}
              {isScanning && (
                <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden rounded-lg">
                  <div className="w-full h-8 bg-gradient-to-b from-transparent via-indigo-500/20 to-indigo-500/40 border-b border-indigo-400 blur-[2px] animate-[scanVertical_2s_ease-in-out_infinite]" />
                </div>
              )}

              <div className="max-w-4xl mx-auto space-y-8 relative z-10 pb-20">
                {/* AI Summary Card (Appears after scan) */}
                {scanComplete && selectedNote.aiFlags && (
                  <div className="animate-in slide-in-from-top-4 fade-in duration-500">
                    <Card className="border-indigo-500/30 bg-indigo-500/5 shadow-xl shadow-indigo-900/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-indigo-400 flex items-center gap-2 text-lg">
                          <Sparkles className="h-5 w-5" /> AI Review Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedNote.aiFlags.map((flag, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              {flag.type === 'error' ? (
                                <ShieldAlert className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                              )}
                              <span className={flag.type === 'error' ? 'text-red-200' : 'text-amber-200'}>
                                <strong>[{flag.location.toUpperCase()}]:</strong> {flag.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* SOAP Sections */}
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2 border-b border-slate-800 pb-2">Subjective</h3>
                    <div className="text-slate-400 leading-relaxed">
                      {scanComplete ? renderHighlightedText(selectedNote.subjective, 'subjective') : <p>{selectedNote.subjective}</p>}
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2 border-b border-slate-800 pb-2">Objective</h3>
                    <div className="text-slate-400 leading-relaxed">
                      {scanComplete ? renderHighlightedText(selectedNote.objective, 'objective') : <p>{selectedNote.objective}</p>}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2 border-b border-slate-800 pb-2">Assessment</h3>
                    <div className="text-slate-400 leading-relaxed">
                      {scanComplete ? renderHighlightedText(selectedNote.assessment, 'assessment') : <p>{selectedNote.assessment}</p>}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2 border-b border-slate-800 pb-2">Plan</h3>
                    <div className="text-slate-400 leading-relaxed whitespace-pre-wrap">
                      {scanComplete ? renderHighlightedText(selectedNote.plan, 'plan') : <p>{selectedNote.plan}</p>}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <FileText className="h-16 w-16 mb-4 opacity-20" />
            <h3 className="text-xl font-medium text-slate-400">No Note Selected</h3>
            <p className="text-sm mt-2">Select a pending note from the queue to review and sign.</p>
          </div>
        )}
      </div>

      {/* Chat Side Panel */}
      <div 
        className={`absolute top-0 right-0 bottom-0 w-[400px] bg-slate-950 border-l border-slate-800 shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col z-50 ${
          showChat ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400 font-bold">
              {selectedNote?.associateName.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-slate-200">{selectedNote?.associateName}</h3>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowChat(false)} className="text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center text-xs text-slate-500 my-4">Today, 2:45 PM</div>
          
          {/* Supervisor AI Drafted Message */}
          <div className="flex flex-col items-end animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-brand-600 text-white p-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-lg">
              <p className="text-sm leading-relaxed">
                Hi {selectedNote?.associateName.split(',')[0]}, I'm reviewing {selectedNote?.clientName}'s note. The AI scan flagged a couple things:
                <br/><br/>
                1. <strong>Safety Plan missing</strong>: Please explicitly document the formal safety plan in the 'Plan' section given the passive SI.
                <br/>
                2. <strong>Assessment vague</strong>: Please specify which treatment plan objectives are stalled.
                <br/><br/>
                Could you update this and resubmit?
              </p>
            </div>
            {chatState !== 'idle' && (
              <div className="text-xs mt-1 flex items-center gap-1 text-slate-400">
                {chatState === 'delivered' && 'Delivered'}
                {chatState !== 'idle' && chatState !== 'delivered' && (
                  <span className="text-brand-400 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Read</span>
                )}
              </div>
            )}
          </div>

          {/* Typing Indicator */}
          {chatState === 'typing' && (
            <div className="flex items-start gap-2 animate-in fade-in">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400">
                {selectedNote?.associateName.charAt(0)}
              </div>
              <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-sm shadow-md flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
              </div>
            </div>
          )}

          {/* Associate Response */}
          {chatState === 'responded' && (
            <div className="flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 shrink-0 border border-slate-700">
                {selectedNote?.associateName.charAt(0)}
              </div>
              <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-sm max-w-[85%] shadow-md border border-slate-700">
                <p className="text-sm text-slate-200">
                  Got it, thanks for catching that! I'm updating the safety plan and objectives right now. Will resubmit in 5 mins.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
          {chatState === 'idle' ? (
            <Button 
              onClick={handleSendRevisionMessage}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" /> Send Revision Request
            </Button>
          ) : (
            <div className="relative">
              <input 
                type="text" 
                placeholder="Type a message..." 
                disabled 
                className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 px-4 text-sm text-slate-300 opacity-50 cursor-not-allowed"
              />
              <Button disabled size="icon" className="absolute right-1 top-1 h-7 w-7 rounded-full bg-slate-700">
                <Send className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
