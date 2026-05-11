'use client';

import React, { useState } from 'react';
import { Wand2, Save, Copy, Check, FileText, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

type FormatType = 'SOAP' | 'DAP' | 'BIRP';

interface FormattedNote {
  format: FormatType;
  sections: { title: string; content: string }[];
}

interface ClinicalNotesGeneratorProps {
  clientId?: string;
  onClose?: () => void;
}

export function ClinicalNotesGenerator({ clientId, onClose }: ClinicalNotesGeneratorProps) {
  const [format, setFormat] = useState<FormatType>('SOAP');
  const [rawText, setRawText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [formattedNote, setFormattedNote] = useState<FormattedNote | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const { addClinicalNote, userRole } = useStore();
  const router = useRouter();

  // Mock AI Generation logic
  const handleGenerate = () => {
    if (!rawText.trim()) return;
    
    setIsGenerating(true);
    setFormattedNote(null);

    setTimeout(() => {
      let sections: { title: string; content: string }[] = [];
      
      // Simulate intelligent parsing based on chosen format
      if (format === 'SOAP') {
        sections = [
          { title: 'Subjective', content: 'Client reports feeling "overwhelmed" with current workload. Mentions difficulty sleeping over the past week and increased irritability.' },
          { title: 'Objective', content: 'Client appeared fatigued. Speech was normal in rate and tone. Affect was slightly constricted. No overt signs of distress observed.' },
          { title: 'Assessment', content: 'Client is experiencing a situational exacerbation of generalized anxiety, primarily driven by occupational stressors. Risk assessment: Low.' },
          { title: 'Plan', content: '1. Introduce sleep hygiene protocols.\n2. Practice CBT-based cognitive restructuring for work-related thoughts.\n3. Schedule follow-up in one week.' }
        ];
      } else if (format === 'DAP') {
        sections = [
          { title: 'Data', content: 'Client reports feeling "overwhelmed" and having poor sleep. Appeared fatigued with a slightly constricted affect.' },
          { title: 'Assessment', content: 'Situational exacerbation of anxiety due to occupational stress. Low risk of harm.' },
          { title: 'Plan', content: 'Introduce sleep hygiene. CBT cognitive restructuring. Follow-up next week.' }
        ];
      } else if (format === 'BIRP') {
        sections = [
          { title: 'Behavior', content: 'Client presented with fatigue, constricted affect, and reported subjective feelings of being "overwhelmed" and having sleep difficulties.' },
          { title: 'Intervention', content: 'Therapist explored current occupational stressors. Introduced cognitive restructuring techniques.' },
          { title: 'Response', content: 'Client was receptive to interventions and agreed to implement sleep hygiene protocols.' },
          { title: 'Plan', content: 'Monitor sleep patterns. Continue CBT interventions. Follow up in 7 days.' }
        ];
      }

      setFormattedNote({ format, sections });
      setIsGenerating(false);
    }, 2500); // 2.5s cinematic delay
  };

  const handleCopy = () => {
    if (!formattedNote) return;
    const textToCopy = formattedNote.sections.map(s => `${s.title}:\n${s.content}`).join('\n\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToEHR = () => {
    if (!formattedNote) return;
    setIsSaving(true);
    
    // Create new note
    const newNote = {
      id: `NOTE-${Math.floor(Math.random() * 10000)}`,
      associateId: 'E004', // Fallback
      associateName: userRole === 'owner' ? 'Sarah Jenkins, LMFT' : 'Alexander Marshi, AMFT',
      clientId: clientId || 'P001',
      clientName: 'Test Client One',
      date: new Date().toISOString().split('T')[0],
      subjective: formattedNote.sections.find(s => s.title.toLowerCase() === 'subjective' || s.title.toLowerCase() === 'data' || s.title.toLowerCase() === 'behavior')?.content || '',
      objective: formattedNote.sections.find(s => s.title.toLowerCase() === 'objective')?.content || '',
      assessment: formattedNote.sections.find(s => s.title.toLowerCase() === 'assessment' || s.title.toLowerCase() === 'intervention')?.content || '',
      plan: formattedNote.sections.find(s => s.title.toLowerCase() === 'plan')?.content || '',
      status: 'pending_review' as const,
    };
    
    setTimeout(() => {
      addClinicalNote(newNote);
      setIsSaving(false);
      
      if (onClose) {
        onClose();
      } else {
        router.push('/ehr');
      }
    }, 1200); // Simulate network delay
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-slate-900 border-b border-slate-800 relative z-10">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-brand-400" />
            AI Clinical Note Generator
          </h2>
          <p className="text-slate-400 text-sm mt-1">Transform rough transcripts into compliant documentation.</p>
        </div>
        <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
          {(['SOAP', 'DAP', 'BIRP'] as FormatType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                format === f 
                  ? 'bg-brand-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden relative z-10">
        {/* Left Pane: Input */}
        <div className="flex flex-col border-r border-slate-800 bg-slate-900/50">
          <div className="p-4 border-b border-slate-800/50 bg-slate-900/30">
            <h3 className="font-medium text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Raw Input or Transcript
            </h3>
          </div>
          <div className="flex-1 p-6 flex flex-col relative">
            <textarea
              className="flex-1 w-full bg-transparent border-0 focus:ring-0 resize-none text-slate-300 placeholder:text-slate-600 outline-none"
              placeholder="Paste raw session notes, dictation transcripts, or random thoughts here..."
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
            />
            
            {/* Generate Button Container */}
            <div className="absolute bottom-6 left-6 right-6">
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating || !rawText.trim()}
                className={`w-full py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(var(--brand-500),0.15)] transition-all ${
                  isGenerating ? 'bg-slate-800 text-brand-400 border border-brand-500/30' : 'bg-brand-600 hover:bg-brand-500 text-white'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                    Analyzing clinical entities...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-3" />
                    Generate {format} Note
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Pane: Output */}
        <div className="flex flex-col bg-slate-950 relative overflow-hidden">
          {/* Ambient Background Glow when generated */}
          {formattedNote && (
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-900/20 to-transparent pointer-events-none animate-in fade-in duration-1000" />
          )}

          <div className="p-4 border-b border-slate-800/50 bg-slate-900/30 flex justify-between items-center relative z-10">
            <h3 className="font-medium text-slate-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" /> Formatted Output
            </h3>
            {formattedNote && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy} className="bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800">
                  {copied ? <Check className="w-4 h-4 mr-2 text-green-400" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
                <Button 
                  size="sm" 
                  className="bg-brand-600 hover:bg-brand-500 text-white transition-all"
                  onClick={handleSaveToEHR}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {isSaving ? 'Saving...' : 'Save to EHR'}
                </Button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-8 relative z-10">
            {isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center text-brand-400/80 animate-pulse">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 border-4 border-brand-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
                  <Wand2 className="absolute inset-0 m-auto w-8 h-8 text-brand-500 animate-pulse" />
                </div>
                <p className="text-lg font-medium">Synthesizing clinical data...</p>
              </div>
            ) : formattedNote ? (
              <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-700">
                {formattedNote.sections.map((section, idx) => (
                  <div key={idx} className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 shadow-sm relative group hover:border-brand-500/30 transition-colors">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2">{section.title}</h4>
                    <p className="text-slate-200 leading-relaxed text-sm md:text-base">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600">
                <FileText className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg">Your generated note will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
