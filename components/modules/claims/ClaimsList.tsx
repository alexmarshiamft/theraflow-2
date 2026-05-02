'use client';

import { useState } from 'react';
import { Search, Plus, Filter, AlertCircle, CheckCircle2, Clock, Upload, XCircle, Sparkles, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useStore, Claim } from '@/lib/store';
import { useToast } from '@/lib/toast';

const statusConfig = {
  submitted: { variant: 'info' as const, label: 'Submitted', icon: Clock },
  paid: { variant: 'success' as const, label: 'Paid', icon: CheckCircle2 },
  rejected: { variant: 'danger' as const, label: 'Rejected', icon: AlertCircle },
  denied: { variant: 'danger' as const, label: 'Denied', icon: XCircle },
};

export function ClaimsList() {
  const { claims, addClaim, deleteClaim } = useStore();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [newClient, setNewClient] = useState('');
  const [newCpt, setNewCpt] = useState('90837');
  const [newPayer, setNewPayer] = useState('');
  
  const [analyzingClaim, setAnalyzingClaim] = useState<string | null>(null);
  const [analysisModalOpen, setAnalysisModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<{ reason: string, suggestedCpt: string } | null>(null);

  const { updateClaim } = useStore(); // Import updateClaim from store

  const handleSyncERAs = () => {
    setIsSyncing(true);
    showToast('Fetching latest ERAs from clearinghouse...', 'info');
    setTimeout(() => {
      let count = 0;
      claims.forEach(c => {
        if (c.status === 'submitted') {
          updateClaim(c.id, { status: 'paid' });
          count++;
        }
      });
      showToast(`Successfully processed ${count} ERAs`, 'success');
      setIsSyncing(false);
    }, 1500);
  };

  const handleAnalyzeClaim = async (claim: Claim) => {
    setAnalyzingClaim(claim.id);
    setSelectedClaim(claim);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          responseFormat: 'json',
          prompt: `Analyze a ${claim.status} insurance claim for CPT ${claim.cptCode} from payer ${claim.payer} (Amount: $${claim.amount}). Provide a 1-sentence potential reason for the rejection, and suggest a valid alternative CPT code (like 90834 or 90847). Return EXACTLY this JSON structure: {"reason": "the reason", "suggestedCpt": "90834"}` 
        })
      });
      const data = await res.json();
      if (res.ok) {
        // Strip out any markdown wrapper (```json ... ```)
        const jsonStr = data.text.replace(/```json\n?|\n?```/g, '').trim();
        const parsed = JSON.parse(jsonStr);
        setAiAnalysis(parsed);
        setAnalysisModalOpen(true);
      } else {
        showToast('AI Error: ' + data.error, 'error');
      }
    } catch (err) {
      showToast('AI failed to analyze claim', 'error');
    } finally {
      setAnalyzingClaim(null);
    }
  };

  const handleApplyFix = () => {
    if (!selectedClaim || !aiAnalysis) return;
    
    // Agentic Action: Update the global state directly
    updateClaim(selectedClaim.id, {
      cptCode: aiAnalysis.suggestedCpt,
      status: 'submitted',
      amount: aiAnalysis.suggestedCpt === '90834' ? 120 : 150 // simple mock logic
    });
    
    showToast(`Claim ${selectedClaim.id} updated to CPT ${aiAnalysis.suggestedCpt} and resubmitted!`, 'success');
    setAnalysisModalOpen(false);
    setSelectedClaim(null);
    setAiAnalysis(null);
  };

  const handleAddClaim = () => {
    if (!newClient || !newPayer) return;
    addClaim({
      id: `CLM-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      client: newClient,
      serviceDate: new Date().toISOString().split('T')[0],
      cptCode: newCpt,
      amount: newCpt === '90837' ? 150 : 200,
      payer: newPayer,
      status: 'submitted',
      submittedDate: new Date().toISOString().split('T')[0],
    });
    setNewClient('');
    setNewPayer('');
    setIsModalOpen(false);
    showToast('Claim submitted to clearinghouse.', 'success');
  };

  const filtered = claims.filter(
    (c) =>
      c.client.toLowerCase().includes(search.toLowerCase()) ||
      c.payer.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="section-card overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Recent Claims</h3>
          <p className="text-sm text-gray-500">{claims.length} total claims</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search claims…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm focus:border-brand-400 focus:bg-white focus:outline-none sm:w-60"
            />
          </div>
          <Button variant="outline" size="sm" onClick={handleSyncERAs} disabled={isSyncing}>
            {isSyncing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            {isSyncing ? 'Syncing...' : 'Sync ERAs'}
          </Button>
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-3.5 w-3.5" /> Submit Claim
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Claim ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Client & DOS</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Payer</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Amount</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((claim) => {
              const StatusIcon = statusConfig[claim.status].icon;
              return (
                <tr key={claim.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-gray-600 font-mono text-xs font-medium">
                    {claim.id}
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-gray-900">{claim.client}</p>
                    <p className="text-xs text-gray-500">DOS: {formatDate(claim.serviceDate)} | CPT {claim.cptCode}</p>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600">{claim.payer}</td>
                  <td className="px-4 py-3.5 text-right font-medium text-gray-900">
                    {formatCurrency(claim.amount)}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <Badge variant={statusConfig[claim.status].variant}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {statusConfig[claim.status].label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {(claim.status === 'rejected' || claim.status === 'denied') && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-brand-200 text-brand-700 hover:bg-brand-50"
                          onClick={() => handleAnalyzeClaim(claim)}
                          disabled={analyzingClaim === claim.id}
                        >
                          {analyzingClaim === claim.id ? (
                            <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                          ) : (
                            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                          )}
                          Analyze
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => showToast('Opening ERA details...', 'info')}>
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit New Claim (CMS-1500)</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Client Name</label>
                <input 
                  type="text" 
                  value={newClient} 
                  onChange={e => setNewClient(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none" 
                  placeholder="e.g. John Doe" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">CPT Code</label>
                <select 
                  value={newCpt} 
                  onChange={e => setNewCpt(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none"
                >
                  <option value="90837">90837 - Psychotherapy (60 min)</option>
                  <option value="90834">90834 - Psychotherapy (45 min)</option>
                  <option value="90791">90791 - Psychiatric Diagnostic Evaluation</option>
                  <option value="90847">90847 - Family/Couples Psychotherapy</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Insurance Payer</label>
                <input 
                  type="text" 
                  value={newPayer} 
                  onChange={e => setNewPayer(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none" 
                  placeholder="e.g. Aetna" 
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleAddClaim}>Submit to Clearinghouse</Button>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Modal */}
      {analysisModalOpen && selectedClaim && aiAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-brand-700">
              <Sparkles className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-gray-900">AI Claim Diagnosis</h3>
            </div>
            
            <div className="mb-4 text-sm text-gray-500 border-b border-gray-100 pb-3">
              <p><strong>Claim ID:</strong> {selectedClaim.id}</p>
              <p><strong>Original CPT:</strong> {selectedClaim.cptCode}</p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-red-50 text-red-800 p-3 rounded-lg border border-red-100">
                <span className="font-semibold block mb-1">Likely Reason for Denial:</span>
                {aiAnalysis.reason}
              </div>

              <div className="bg-brand-50 text-brand-800 p-3 rounded-lg border border-brand-100">
                <span className="font-semibold block mb-1">Recommended Action:</span>
                Update CPT code to <strong>{aiAnalysis.suggestedCpt}</strong> and resubmit.
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button variant="outline" onClick={() => setAnalysisModalOpen(false)}>Discard</Button>
              <Button onClick={handleApplyFix} className="bg-brand-600 hover:bg-brand-700">
                Apply Fix & Resubmit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
