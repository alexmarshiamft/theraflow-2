import { useState } from 'react';
import { X, FileText, Download, Code, CheckCircle, FileOutput, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Claim, useStore } from '@/lib/store';
import { generateCMS1500PDF, generateEDI837P } from '@/lib/billing';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useToast } from '@/lib/toast';

interface ClaimReviewModalProps {
  claim: Claim;
  onClose: () => void;
}

export function ClaimReviewModal({ claim, onClose }: ClaimReviewModalProps) {
  const { updateClaim, clinicalNotes } = useStore();
  const { showToast } = useToast();
  
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingEDI, setIsExportingEDI] = useState(false);

  // Attempt to find the associated note based on the client name and date
  // This is a naive match for the mock environment.
  const associatedNote = clinicalNotes.find(n => n.clientName === claim.client && n.date === claim.serviceDate);

  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      const mockPdfDataUri = await generateCMS1500PDF(claim, associatedNote);
      // In a real app, we would trigger a download.
      // For this mock, we just show a toast and log it.
      console.log('CMS-1500 Generated:', mockPdfDataUri.substring(0, 50) + '...');
      showToast(`CMS-1500 generated for ${claim.id}`, 'success');
    } catch (err) {
      showToast('Failed to generate CMS-1500', 'error');
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleExportEDI = () => {
    setIsExportingEDI(true);
    try {
      const ediString = generateEDI837P(claim, associatedNote);
      
      // Create a blob and trigger download for the EDI string
      const blob = new Blob([ediString], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `837P_${claim.id}_${claim.serviceDate}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showToast(`EDI 837P generated for ${claim.id}`, 'success');
      
      // Update claim status if it's draft or rejected, mark it submitted
      if (claim.status !== 'paid') {
         updateClaim(claim.id, { status: 'submitted', submittedDate: new Date().toISOString().split('T')[0] });
      }
    } catch (err) {
      showToast('Failed to generate EDI 837P', 'error');
    } finally {
      setIsExportingEDI(false);
    }
  };

  const handleMarkPaid = () => {
    updateClaim(claim.id, { status: 'paid' });
    showToast(`Claim ${claim.id} marked as Paid manually.`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full">
        {/* Header */}
        <div className="p-6 border-b border-border/50 flex justify-between items-center bg-muted/50">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-brand-600" />
              Claim Review: {claim.id}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Review claim details and generate billing artifacts.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground/80 hover:text-muted-foreground">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Client</p>
              <p className="font-semibold text-foreground">{claim.client}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Date of Service</p>
              <p className="font-semibold text-foreground">{formatDate(claim.serviceDate)}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Payer</p>
              <p className="font-semibold text-foreground">{claim.payer}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Amount / CPT</p>
              <p className="font-semibold text-foreground">{formatCurrency(claim.amount)} <span className="text-muted-foreground font-normal">({claim.cptCode})</span></p>
            </div>
          </div>

          <div className="border border-border/50 rounded-xl overflow-hidden">
             <div className="bg-muted/50 px-4 py-3 border-b border-border/50">
               <h3 className="font-medium text-foreground">Status Information</h3>
             </div>
             <div className="p-4 space-y-3">
               <div className="flex justify-between items-center">
                 <span className="text-sm text-muted-foreground">Current Status:</span>
                 <Badge variant={
                    claim.status === 'paid' ? 'success' : 
                    claim.status === 'submitted' ? 'info' : 'danger'
                 } className="uppercase">
                   {claim.status}
                 </Badge>
               </div>
               {claim.submittedDate && (
                 <div className="flex justify-between items-center">
                   <span className="text-sm text-muted-foreground">Submitted Date:</span>
                   <span className="text-sm font-medium">{formatDate(claim.submittedDate)}</span>
                 </div>
               )}
               <div className="flex justify-between items-center">
                 <span className="text-sm text-muted-foreground">Associated Clinical Note:</span>
                 <span className="text-sm font-medium">
                   {associatedNote ? (
                     <span className="text-emerald-500 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Found (Signed)</span>
                   ) : (
                     <span className="text-amber-500">Not Found</span>
                   )}
                 </span>
               </div>
             </div>
          </div>

          {/* AI Claim Interceptor Section */}
          <div className="bg-slate-900 border border-brand-500/30 rounded-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-2xl rounded-full" />
            <div className="p-4 border-b border-slate-800 flex items-center gap-2">
               <div className="p-1.5 bg-brand-500/20 text-brand-400 rounded-md">
                 <Code className="w-4 h-4" />
               </div>
               <h3 className="font-bold text-white text-sm">AI Claim Interceptor</h3>
            </div>
            <div className="p-4 space-y-4">
              {/* Mock AI Check 1 */}
              <div className="flex gap-3 items-start">
                 <div className="mt-0.5"><CheckCircle className="w-4 h-4 text-emerald-500" /></div>
                 <div>
                   <p className="text-sm font-medium text-white">ICD-10 to CPT Crosswalk</p>
                   <p className="text-xs text-slate-400 mt-0.5">Diagnosis F41.1 supports CPT {claim.cptCode}. No mismatch detected.</p>
                 </div>
              </div>
              
              {/* Mock AI Check 2 (Warning) */}
              <div className="flex gap-3 items-start p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                 <div className="mt-0.5"><AlertTriangle className="w-4 h-4 text-amber-500" /></div>
                 <div className="flex-1">
                   <p className="text-sm font-medium text-amber-500">Missing Modifier Detected</p>
                   <p className="text-xs text-slate-300 mt-1 leading-relaxed">Telehealth place of service (02) detected without GT or 95 modifier. This will trigger an automatic denial from {claim.payer}.</p>
                   <button className="mt-3 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-semibold rounded transition-colors border border-amber-500/30">
                     Auto-Fix: Add Modifier 95
                   </button>
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium text-foreground mb-2">Export Options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={handleExportPDF} 
                disabled={isExportingPDF}
                className="h-12 border-brand-200 hover:bg-brand-50 hover:text-brand-700 justify-start"
              >
                <FileOutput className="w-4 h-4 mr-2 text-brand-500" />
                {isExportingPDF ? 'Generating...' : 'View CMS-1500 (PDF)'}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleExportEDI}
                disabled={isExportingEDI}
                className="h-12 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 justify-start"
              >
                <Code className="w-4 h-4 mr-2 text-indigo-500" />
                {isExportingEDI ? 'Generating...' : 'Download EDI 837P'}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/50 bg-muted/20 flex justify-between items-center">
          <div>
            {claim.status !== 'paid' && (
              <Button variant="ghost" size="sm" onClick={handleMarkPaid} className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Paid
              </Button>
            )}
          </div>
          <Button onClick={onClose}>Close Review</Button>
        </div>
      </div>
    </div>
  );
}
