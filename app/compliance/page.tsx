'use client';

import { useState } from 'react';
import { Shield, BookOpen, AlertTriangle, FileCheck, ExternalLink, Lock, Database, Terminal, ChevronRight, Loader2, Server, Globe, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatDate, formatTime } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export default function CompliancePage() {
  const { auditLogs } = useStore();
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);
  const [isTerminalLoading, setIsTerminalLoading] = useState(false);

  const handleTerminalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim() || isTerminalLoading) return;

    setIsTerminalLoading(true);
    setTerminalOutput(null);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: terminalInput,
          context: {
            systemInstruction: "You are the Compliance AI Terminal for Theraflow. Analyze the provided audit logs to answer the user's query. Reply in a concise, authoritative, and technical 'command-line' tone. Do not use markdown styling like **bold**; write in plain text suitable for a monospace terminal output.",
            auditLogs: auditLogs.slice(0, 50)
          }
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setTerminalOutput(data.text);
      } else {
        setTerminalOutput(`Error: ${data.error}`);
      }
    } catch (error) {
      setTerminalOutput("Error: Connection to Compliance AI failed.");
    } finally {
      setIsTerminalLoading(false);
      setTerminalInput('');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 pt-4">
      
      {/* SOC Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <Shield className="h-7 w-7 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Security Operations Center (SOC)</h1>
            <p className="text-sm text-gray-500 font-medium">Global Compliance Posture & Immutable Audit Ledger</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 shadow-lg">
           <div className="flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-xs font-mono text-emerald-400 font-medium">SYSTEM SECURE</span>
           </div>
           <div className="w-px h-6 bg-slate-700"></div>
           <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
             <Server className="h-3 w-3" /> US-WEST-1
           </div>
        </div>
      </div>

      {/* Compliance Gauges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'HIPAA', desc: 'Health Data', score: 100 },
          { label: 'SOC 2 Type II', desc: 'Security Controls', score: 100 },
          { label: 'PCI-DSS', desc: 'Payment Processing', score: 100 },
          { label: 'GDPR / CCPA', desc: 'Data Privacy', score: 100 },
        ].map((cert) => (
          <div key={cert.label} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Shield className="h-16 w-16" />
            </div>
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mb-2 relative z-10" />
            <h3 className="font-bold text-gray-900 text-lg relative z-10">{cert.label}</h3>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider relative z-10">{cert.desc}</p>
            <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${cert.score}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Immutable Audit Log Ledger */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 shadow-xl overflow-hidden mb-8">
        <div className="flex items-center justify-between bg-gray-950 px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-white tracking-wide">Immutable System Audit Log</h2>
          </div>
          <Badge className="border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
            <Database className="h-3 w-3 mr-1" /> Append-Only Ledger Active
          </Badge>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400 font-mono">
            <thead className="bg-gray-900/50 text-xs uppercase text-gray-500 border-b border-gray-800">
              <tr>
                <th className="px-6 py-3 font-medium">Timestamp (UTC)</th>
                <th className="px-6 py-3 font-medium">Event ID</th>
                <th className="px-6 py-3 font-medium">Action</th>
                <th className="px-6 py-3 font-medium">User/System</th>
                <th className="px-6 py-3 font-medium">Target Entity</th>
                <th className="px-6 py-3 font-medium">Cryptographic Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {auditLogs.slice(0, 10).map((log) => (
                <tr key={log.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                    {log.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      log.action === 'CREATE' ? 'bg-emerald-500/10 text-emerald-400' :
                      log.action === 'UPDATE' ? 'bg-blue-500/10 text-blue-400' :
                      log.action === 'DELETE' ? 'bg-red-500/10 text-red-400' :
                      log.action === 'SYSTEM' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-purple-500/10 text-purple-400'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {log.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {log.entityType} ({log.entityId})
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs font-mono">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-300">{log.details}</span>
                      {log.hash && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-emerald-500 font-bold">SHA-256:</span>
                          <span className="truncate w-48 block opacity-70" title={log.hash}>{log.hash}</span>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {auditLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No audit logs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Compliance AI Terminal */}
        <div className="border-t border-gray-800 bg-black p-4">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 font-mono">
            <Terminal className="h-4 w-4 text-brand-500" />
            <span>THERAFLOW_OS // COMPLIANCE_AI_TERMINAL // v2.1.0</span>
          </div>

          {terminalOutput && (
            <div className="mb-4 p-4 rounded bg-gray-900 border border-gray-800 font-mono text-sm text-emerald-400 whitespace-pre-wrap">
              {terminalOutput}
            </div>
          )}

          <form onSubmit={handleTerminalSubmit} className="relative flex items-center">
            <div className="absolute left-3 text-brand-500 font-mono font-bold">
              <ChevronRight className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Query the system ledger... (e.g., 'Summarize recent access to Client P001')"
              className="w-full bg-gray-950 border border-gray-800 rounded-md py-3 pl-10 pr-4 text-gray-300 font-mono text-sm placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              disabled={isTerminalLoading}
            />
            {isTerminalLoading && (
              <div className="absolute right-3">
                <Loader2 className="h-5 w-5 text-brand-500 animate-spin" />
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BBS Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-blue-50 p-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">California BBS Guidelines</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900 block mb-1">Telehealth Consent</strong>
              <p>Prior to the delivery of health care via telehealth, the provider initiating the use of telehealth shall inform the patient about the use of telehealth and obtain verbal or written consent.</p>
            </div>
            <div>
              <strong className="text-gray-900 block mb-1">Record Retention</strong>
              <p>Patient records shall be retained for a minimum of 7 years from the date therapy is terminated. If the client is a minor, records must be retained for at least 7 years past the age of majority (25 years old).</p>
            </div>
            <div>
              <strong className="text-gray-900 block mb-1">Supervision Requirements</strong>
              <p>Associates must receive 1 unit of supervision for the first 10 clients, and an additional unit for any clients over 10 in a given week. Video supervision requires explicit consent.</p>
            </div>
            <a href="https://www.bbs.ca.gov/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium mt-2">
              Visit BBS Website <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* HIPAA Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-emerald-50 p-2">
              <Shield className="h-5 w-5 text-emerald-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">HIPAA Privacy & Security</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900 block mb-1">Minimum Necessary Rule</strong>
              <p>Covered entities must make reasonable efforts to limit protected health information (PHI) to the minimum necessary to accomplish the intended purpose.</p>
            </div>
            <div>
              <strong className="text-gray-900 block mb-1">Breach Notification Rule</strong>
              <p>Breaches affecting 500 or more individuals must be reported to the HHS Secretary without unreasonable delay and in no case later than 60 days following the discovery of the breach.</p>
            </div>
            <div>
              <strong className="text-gray-900 block mb-1">Psychotherapy Notes</strong>
              <p>Requires specific written authorization by the patient for any use or disclosure of psychotherapy notes, except for treatment, payment, or health care operations.</p>
            </div>
            <a href="https://www.hhs.gov/hipaa/index.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium mt-2">
              View HHS Guidelines <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* No Surprises Act Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-amber-50 p-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">No Surprises Act</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900 block mb-1">Good Faith Estimate (GFE)</strong>
              <p>Providers must give uninsured and self-pay clients a "Good Faith Estimate" of expected charges. This applies to both current and prospective patients.</p>
            </div>
            <div>
              <strong className="text-gray-900 block mb-1">Timeline</strong>
              <p>GFE must be provided within 1 business day if scheduling at least 3 business days ahead, or within 3 business days if scheduling at least 10 days ahead.</p>
            </div>
          </div>
        </div>

        {/* 42 CFR Part 2 Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-purple-50 p-2">
              <FileCheck className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">42 CFR Part 2 (SUD)</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900 block mb-1">Substance Use Disorder Privacy</strong>
              <p>Stricter than HIPAA. Requires explicit, specific written consent to disclose patient identifying information related to substance use disorder treatment.</p>
            </div>
            <div>
              <strong className="text-gray-900 block mb-1">Prohibition on Redisclosure</strong>
              <p>Any disclosure made with patient consent must be accompanied by a written statement prohibiting further disclosure unless expressly permitted by the written consent.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Attestation */}
      <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-brand-100 p-2">
            <Shield className="h-6 w-6 text-brand-700" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Theraflow Technical Compliance Attestation</h2>
        </div>
        <div className="space-y-4 text-sm text-gray-700">
          <p>
            Theraflow has been architected to align with core Health Insurance Portability and Accountability Act (HIPAA) technical safeguards. 
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Data Encryption:</strong> All electronic Protected Health Information (ePHI) is encrypted at rest and in transit using industry-standard AES-256 encryption.</li>
            <li><strong>Access Control & Multi-Tenancy:</strong> Strict Firestore security rules enforce tenant-level isolation, ensuring that users can only access data explicitly associated with their authenticated Unique Identifier (UID).</li>
            <li><strong>Audit Logging:</strong> System changes, authentications, and data modifications are logged for accountability and security review.</li>
            <li><strong>Secure Transmission:</strong> All telehealth and AI data transfers occur over encrypted TLS connections.</li>
          </ul>
          <div className="mt-4 rounded border border-brand-300 bg-white p-4 text-xs text-gray-500">
            <strong>Disclaimer:</strong> This attestation reflects the technical architecture of the Theraflow platform. It does not constitute legal advice or a legally binding indemnification agreement. Healthcare providers remain solely responsible for ensuring their organizational policies and usage of the platform comply with all applicable local, state, and federal laws.
          </div>
        </div>
      </div>
    </div>
  );
}
