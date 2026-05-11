'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, ShieldAlert, FileSignature, AlertCircle, Save } from 'lucide-react';
import { useStore, ClinicalNote } from '@/lib/store';

interface VANoteTemplateProps {
  noteId: string;
  onClose: () => void;
}

export function VANoteTemplate({ noteId, onClose }: VANoteTemplateProps) {
  const { clinicalNotes, updateClinicalNote, vaAuthorizations } = useStore();
  const note = clinicalNotes.find(n => n.id === noteId);
  
  const [formData, setFormData] = useState({
    subjective: note?.subjective || '',
    objective: note?.objective || '',
    assessment: note?.assessment || '',
    plan: note?.plan || '',
    sessionMinutes: note?.sessionMinutes || 53,
    riskAssessment: note?.riskAssessment || '',
    interventionTechniques: note?.interventionTechniques?.join(', ') || '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  if (!note) return null;

  const isSigned = note.status === 'signed';
  const auth = vaAuthorizations.find(a => a.authorizationNumber === note.authorizationNumber);

  const validate = () => {
    const newErrors: string[] = [];
    if (!formData.subjective.trim()) newErrors.push('Subjective section is required.');
    if (!formData.objective.trim()) newErrors.push('Objective section is required.');
    if (!formData.assessment.trim()) newErrors.push('Assessment section is required.');
    if (!formData.plan.trim()) newErrors.push('Plan section is required.');
    if (!formData.sessionMinutes || formData.sessionMinutes < 1) newErrors.push('Valid Session Minutes is required.');
    if (!formData.riskAssessment.trim()) newErrors.push('Risk Assessment is mandatory for VA/CCN compliance.');
    if (!formData.interventionTechniques.trim()) newErrors.push('At least one intervention technique must be documented.');
    return newErrors;
  };

  const handleSign = () => {
    const newErrors = validate();
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    updateClinicalNote(note.id, {
      ...formData,
      interventionTechniques: formData.interventionTechniques.split(',').map(s => s.trim()).filter(Boolean),
      status: 'signed',
      vaCompliant: true,
    });
    onClose();
  };

  const handleSaveDraft = () => {
    updateClinicalNote(note.id, {
      ...formData,
      interventionTechniques: formData.interventionTechniques.split(',').map(s => s.trim()).filter(Boolean),
      vaCompliant: true,
    });
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
      <CardHeader className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10 flex flex-row items-center justify-between py-4">
        <div>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            TriWest/CCN Clinical Note
            {isSigned && <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Signed & Locked</Badge>}
            {!isSigned && <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Draft</Badge>}
          </CardTitle>
          <div className="text-sm text-slate-400 mt-1 flex items-center gap-4">
            <span>Client: <span className="text-slate-200 font-medium">{note.clientName}</span></span>
            <span>Date: <span className="text-slate-200 font-medium">{note.date}</span></span>
            {auth && (
              <span className="flex items-center gap-1 text-brand-400">
                <ShieldAlert className="w-3 h-3" /> Auth: {auth.authorizationNumber}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
        {errors.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <h4 className="text-red-400 font-medium flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4" /> Compliance Validation Failed
            </h4>
            <ul className="list-disc list-inside text-sm text-red-300/80 space-y-1">
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Session Minutes (CPT 90837 Requires 53+)</label>
            <input 
              type="number" 
              value={formData.sessionMinutes}
              onChange={e => setFormData({ ...formData, sessionMinutes: parseInt(e.target.value) || 0 })}
              disabled={isSigned}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-brand-500 outline-none disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Intervention Techniques (Comma separated)</label>
            <input 
              type="text" 
              placeholder="e.g. CBT, MI, EMDR"
              value={formData.interventionTechniques}
              onChange={e => setFormData({ ...formData, interventionTechniques: e.target.value })}
              disabled={isSigned}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-brand-500 outline-none disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex justify-between">
            <span>Risk Assessment & Safety</span>
            <span className="text-xs text-brand-400">Mandatory for VA/CCN</span>
          </label>
          <textarea 
            value={formData.riskAssessment}
            onChange={e => setFormData({ ...formData, riskAssessment: e.target.value })}
            disabled={isSigned}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-brand-500 outline-none disabled:opacity-50 h-24 resize-none"
            placeholder="Document any SI/HI, substance use risks, or safety plan updates..."
          />
        </div>

        {['subjective', 'objective', 'assessment', 'plan'].map((section) => (
          <div key={section} className="space-y-2">
            <label className="text-sm font-medium text-slate-300 capitalize">{section}</label>
            <textarea 
              value={(formData as any)[section]}
              onChange={e => setFormData({ ...formData, [section]: e.target.value })}
              disabled={isSigned}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-brand-500 outline-none disabled:opacity-50 min-h-[100px] resize-y"
            />
          </div>
        ))}
      </CardContent>

      <div className="border-t border-slate-800 bg-slate-900/50 p-4 flex justify-between">
        <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white">
          Cancel
        </Button>
        {!isSigned && (
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSaveDraft} className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Save className="w-4 h-4 mr-2" /> Save Draft
            </Button>
            <Button onClick={handleSign} className="bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-lg shadow-emerald-900/50">
              <FileSignature className="w-4 h-4 mr-2" /> Sign & Lock Note
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
