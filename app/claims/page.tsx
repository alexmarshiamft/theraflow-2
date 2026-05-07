'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { useStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { FileText, CheckCircle, AlertTriangle, Clock, Layers, Sparkles, CheckCircle2, Building, DollarSign, X } from 'lucide-react';
import { ClaimsList } from '@/components/modules/claims/ClaimsList';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

type ScrubStep = {
  id: string;
  label: string;
  status: 'pending' | 'scanning' | 'passed';
};

export default function ClaimsPage() {
  const { claims, clinicalNotes, batchSubmitClaims } = useStore();
  
  // State for the Batch Submit Workflow
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [workflowStage, setWorkflowStage] = useState<'review' | 'scrubbing' | 'ready' | 'submitted' | 'dispatching' | 'dispatched'>('review');
  const [scrubSteps, setScrubSteps] = useState<ScrubStep[]>([
    { id: 'cpt', label: 'CPT Code Match & Verification', status: 'pending' },
    { id: 'modifier', label: 'Modifier Validation', status: 'pending' },
    { id: 'dx', label: 'Diagnosis Coding Alignment', status: 'pending' },
    { id: 'sig', label: 'Supervisor Signatures Verified', status: 'pending' },
    { id: 'npi', label: 'NPI & Taxonomy Verification', status: 'pending' }
  ]);

  // Derived data
  const signedNotes = clinicalNotes.filter(n => n.status === 'signed');
  const totalClaims = claims.length;
  const pendingCount = claims.filter(c => c.status === 'submitted').length;
  const rejectedCount = claims.filter(c => c.status === 'rejected' || c.status === 'denied').length;
  const totalPaid = claims
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + c.amount, 0);

  // Workflow Handlers
  const handleStartScrub = () => {
    setWorkflowStage('scrubbing');
    
    // Animate steps sequentially
    scrubSteps.forEach((step, index) => {
      // Set to scanning slightly before
      setTimeout(() => {
        setScrubSteps(prev => prev.map(s => s.id === step.id ? { ...s, status: 'scanning' } : s));
      }, index * 800);
      
      // Set to passed
      setTimeout(() => {
        setScrubSteps(prev => prev.map(s => s.id === step.id ? { ...s, status: 'passed' } : s));
        
        // If last step, set ready
        if (index === scrubSteps.length - 1) {
          setTimeout(() => setWorkflowStage('ready'), 500);
        }
      }, (index * 800) + 700);
    });
  };

  const handleSubmitBatch = () => {
    // Actually submit them in store
    batchSubmitClaims(signedNotes.map(n => n.id));
    setWorkflowStage('submitted');
  };

  const handleCloseBatchModal = () => {
    setIsBatchModalOpen(false);
    // Reset state after transition
    setTimeout(() => {
      setWorkflowStage('review');
      setScrubSteps(steps => steps.map(s => ({ ...s, status: 'pending' })));
    }, 300);
  };

  const handleDispatchPayouts = () => {
    setWorkflowStage('dispatching');
    setTimeout(() => {
      setWorkflowStage('dispatched');
    }, 2500);
  };

  // ROI Math
  const rate = 86.95;
  const estimatedAmount = signedNotes.length * rate; // $86.95 per note for 90834
  const practiceNet = estimatedAmount * 0.5;
  const associateNet = estimatedAmount * 0.5;
  const payoutAmount = estimatedAmount; // 100% of the contracted rate
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7); // 5 business days ~ 7 calendar days

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Insurance Clearinghouse</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage electronic claims (837), ERAs (835), and rejections.
          </p>
        </div>
        
        {signedNotes.length > 0 && (
          <Button 
            onClick={() => setIsBatchModalOpen(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/20"
          >
            <Layers className="h-4 w-4 mr-2" />
            Batch Process Signed Notes ({signedNotes.length})
          </Button>
        )}
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Claims"
          value={totalClaims.toString()}
          icon={FileText}
          change="+12 this week"
          changeType="up"
        />
        <StatCard
          title="Pending Adjudication"
          value={pendingCount.toString()}
          icon={Clock}
          change="Awaiting ERAs"
          changeType="neutral"
        />
        <StatCard
          title="Rejections & Denials"
          value={rejectedCount.toString()}
          icon={AlertTriangle}
          change="2 new"
          changeType="down"
        />
        <StatCard
          title="Total Paid (YTD)"
          value={formatCurrency(totalPaid)}
          icon={CheckCircle}
          change="+8% vs last month"
          changeType="up"
        />
      </div>

      <div className="grid gap-6">
        <ClaimsList />
      </div>

      {/* Batch Submission Overlay Modal */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 sm:p-6">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-brand-600" />
                  AI Claim Audit Engine
                </h2>
                <p className="text-sm text-slate-500 mt-1">Verifying {signedNotes.length} signed clinical notes before clearinghouse transmission.</p>
              </div>
              {workflowStage !== 'scrubbing' && (
                <Button variant="ghost" size="icon" onClick={handleCloseBatchModal} className="text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Body */}
            <div className="p-8 flex-1 overflow-y-auto bg-white">
              
              {workflowStage === 'review' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Ready for Scrubbing</h4>
                      <p className="text-sm text-blue-800 mt-1">You have {signedNotes.length} notes that have been electronically signed by supervisors. Our AI will now scrub these for common clearinghouse rejection triggers (NPI mismatch, missing modifiers, Dx code alignment) before batching them into 837 files.</p>
                    </div>
                  </div>
                  
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium text-slate-500">Client</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-500">Date</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-500">Associate</th>
                          <th className="px-4 py-3 text-right font-medium text-slate-500">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {signedNotes.map(note => (
                          <tr key={note.id}>
                            <td className="px-4 py-3 font-medium text-slate-900">{note.clientName}</td>
                            <td className="px-4 py-3 text-slate-500">{note.date}</td>
                            <td className="px-4 py-3 text-slate-500">{note.associateName}</td>
                            <td className="px-4 py-3 text-right">
                              <Badge variant="success" className="bg-emerald-100 text-emerald-700">Signed & Locked</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleStartScrub} size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Review & Run AI Scrub
                    </Button>
                  </div>
                </div>
              )}

              {(workflowStage === 'scrubbing' || workflowStage === 'ready') && (
                <div className="max-w-md mx-auto space-y-8 py-8 animate-in fade-in zoom-in-95">
                  <div className="text-center space-y-2">
                    <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                      {workflowStage === 'ready' ? (
                         <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                      ) : (
                         <Sparkles className="h-8 w-8 text-indigo-600 animate-pulse" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {workflowStage === 'ready' ? 'All Systems Go' : 'Scrubbing Claims...'}
                    </h3>
                    <p className="text-slate-500">
                      {workflowStage === 'ready' ? '100% of claims passed pre-submission validation.' : 'Analyzing against 50+ common rejection rules.'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {scrubSteps.map((step) => (
                      <div key={step.id} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          step.status === 'passed' ? 'bg-emerald-100 text-emerald-600' :
                          step.status === 'scanning' ? 'bg-indigo-100 text-indigo-600' :
                          'bg-slate-100 text-slate-400'
                        }`}>
                          {step.status === 'passed' ? <CheckCircle2 className="h-5 w-5" /> : 
                           step.status === 'scanning' ? <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /> :
                           <div className="w-2 h-2 rounded-full bg-slate-300" />}
                        </div>
                        <div className={`font-medium transition-colors duration-300 ${
                          step.status === 'passed' ? 'text-slate-900' :
                          step.status === 'scanning' ? 'text-indigo-900' :
                          'text-slate-400'
                        }`}>
                          {step.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {workflowStage === 'ready' && (
                    <div className="flex justify-center pt-8 animate-in slide-in-from-bottom-4 fade-in">
                      <Button onClick={handleSubmitBatch} size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-200 h-14 text-lg">
                        Submit {signedNotes.length} Claims to Clearinghouse
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {(workflowStage === 'submitted' || workflowStage === 'dispatching' || workflowStage === 'dispatched') && (
                <div className="max-w-xl mx-auto py-8 space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-500 text-center">
                  <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Successfully Delivered</h2>
                    <p className="text-lg text-slate-600 mt-2">
                      {signedNotes.length} claims have been securely transmitted via 837 EDI.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-2">
                      <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-emerald-500" />
                        Total Expected
                      </h4>
                      <p className="text-sm text-slate-600">
                        {signedNotes.length} claims × {formatCurrency(rate)} (90834)
                      </p>
                      <div className="text-2xl font-bold text-emerald-600">{formatCurrency(payoutAmount)}</div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-2">
                      <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                        <Building className="h-5 w-5 text-brand-500" />
                        50/50 Revenue Split
                      </h4>
                      <div className="text-sm text-slate-600 flex justify-between">
                        <span>Practice Net:</span>
                        <span className="font-semibold text-slate-900">{formatCurrency(practiceNet)}</span>
                      </div>
                      <div className="text-sm text-slate-600 flex justify-between">
                        <span>Associate Net:</span>
                        <span className="font-semibold text-slate-900">{formatCurrency(associateNet)}</span>
                      </div>
                    </div>
                  </div>

                  {workflowStage === 'submitted' && (
                    <div className="pt-4 animate-in fade-in">
                      <Button onClick={handleDispatchPayouts} size="lg" className="w-full bg-brand-600 hover:bg-brand-700 text-white shadow-xl shadow-brand-200 h-14 text-lg">
                        <Sparkles className="h-5 w-5 mr-2" />
                        Authorize Associate Payouts & Dispatch Messages
                      </Button>
                    </div>
                  )}

                  {workflowStage === 'dispatching' && (
                    <div className="pt-4 pb-8 space-y-4 animate-in fade-in">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                      <p className="text-brand-600 font-medium">Orchestrating payouts and dispatching automated SMS to 6 associates...</p>
                    </div>
                  )}

                  {workflowStage === 'dispatched' && (
                    <div className="pt-4 space-y-6 animate-in slide-in-from-bottom-4 fade-in">
                      <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 text-left">
                        <h4 className="font-semibold text-brand-900 mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-brand-600" />
                          Messages Dispatched Successfully
                        </h4>
                        <div className="bg-white rounded-lg p-3 border border-brand-100 text-sm shadow-sm space-y-2 relative">
                          <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-t border-l border-brand-100 transform rotate-45" />
                          <p className="text-slate-700 relative z-10">
                            <strong>Message sent to 6 Associates:</strong><br/>
                            "Incredible work today! 🎉 You completed <strong>10 sessions</strong>, logging <strong>7.5 direct clinical hours (3.5 CFC)</strong> and <strong>0.5 non-clinical hours</strong> toward your licensure. Your daily earnings of <strong>{formatCurrency(associateNet / 6)}</strong> have been approved and are headed to your bank account."
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <Link href="/banking" className="w-full">
                          <Button size="lg" className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg">
                            View Bank Account Projection
                          </Button>
                        </Link>
                        <Button onClick={handleCloseBatchModal} variant="outline" className="w-full">
                          Return to Dashboard
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
