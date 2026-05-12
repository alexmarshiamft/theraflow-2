'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Webhook, Plus, Terminal, RefreshCw, Key, ShieldCheck, Link2, CheckCircle2, XCircle, ChevronDown, Braces } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function WebhooksPage() {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'logs' | 'secrets'>('endpoints');

  const webhooks = [
    { id: 'wh_1', url: 'https://hooks.zapier.com/hooks/catch/12345/abcde/', status: 'active', events: ['client.created', 'appointment.scheduled'] },
    { id: 'wh_2', url: 'https://api.acme-corp.com/theraflow-ingest', status: 'active', events: ['claim.denied', 'payroll.processed'] },
    { id: 'wh_3', url: 'https://quickbooks.api.intuit.com/v3/company/theraflow', status: 'failing', events: ['invoice.paid'] },
  ];

  const storeLogs = useStore((s) => s.webhookLogs);

  const mockLogs = [
    { id: 'log_992', event: 'claim.denied', endpoint: 'api.acme-corp.com', status: 200, time: 'Just now', payload: '{\n  "event": "claim.denied",\n  "claim_id": "clm_88492",\n  "reason": "Missing modifier 95",\n  "amount": 150.00\n}' },
    { id: 'log_991', event: 'client.created', endpoint: 'hooks.zapier.com', status: 200, time: '2 mins ago', payload: '{\n  "event": "client.created",\n  "client_id": "c_5592",\n  "name": "Alex M."\n}' },
    { id: 'log_990', event: 'invoice.paid', endpoint: 'quickbooks.api.intuit.com', status: 500, time: '15 mins ago', payload: '{\n  "error": "Authentication failed",\n  "code": "AUTH_001"\n}' },
    { id: 'log_989', event: 'appointment.scheduled', endpoint: 'hooks.zapier.com', status: 200, time: '1 hour ago', payload: '{\n  "event": "appointment.scheduled",\n  "appointment_id": "apt_1102",\n  "datetime": "2026-05-12T14:00:00Z"\n}' },
  ];

  const logs = (storeLogs && storeLogs.length > 0) ? storeLogs : mockLogs;

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#050505] font-sans">
        
        {/* Header */}
        <div className="px-8 py-8 border-b border-white/5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30">
                  <Webhook className="w-6 h-6 text-indigo-400" />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">API & Webhooks</h1>
              </div>
              <p className="text-slate-400 max-w-2xl text-lg">
                Connect Theraflow securely to external enterprise systems. Trigger automated workflows in Zapier, custom CRMs, or accounting software.
              </p>
            </div>
            <div className="hidden md:flex gap-3">
              <Button variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900">
                <Key className="w-4 h-4 mr-2" /> API Keys
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                <Plus className="w-4 h-4 mr-2" /> Add Endpoint
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-px">
              <button 
                onClick={() => setActiveTab('endpoints')}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'endpoints' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                Endpoints
              </button>
              <button 
                onClick={() => setActiveTab('logs')}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'logs' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                Delivery Logs
              </button>
            </div>

            {/* Endpoints Tab */}
            {activeTab === 'endpoints' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                {webhooks.map((wh) => (
                  <Card key={wh.id} className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Link2 className="w-5 h-5 text-slate-500" />
                          <h3 className="font-mono text-sm text-slate-200">{wh.url}</h3>
                          {wh.status === 'active' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20">
                              Failing
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2 pl-8">
                          {wh.events.map(ev => (
                            <span key={ev} className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
                              {ev}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-slate-400">
                        Edit <ChevronDown className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Logs Tab */}
            {activeTab === 'logs' && (
              <div className="bg-black border border-slate-800 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Terminal className="w-4 h-4" /> Live Terminal
                  </div>
                  <RefreshCw className="w-4 h-4 text-slate-500" />
                </div>
                <div className="p-0 divide-y divide-slate-800/50">
                  {logs.map((log) => (
                    <div key={log.id} className="p-4 hover:bg-slate-900/30 transition-colors group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {log.status === 200 ? (
                            <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> 200 OK
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-mono font-bold flex items-center gap-1">
                              <XCircle className="w-3 h-3" /> {log.status} ERR
                            </span>
                          )}
                          <span className="text-sm font-mono text-indigo-400">{log.event}</span>
                          <span className="text-xs text-slate-500 font-mono">→ {log.endpoint}</span>
                        </div>
                        <span className="text-xs text-slate-600 font-mono">{log.time}</span>
                      </div>
                      <div className="bg-[#0a0a0a] rounded-lg border border-slate-800/50 p-3">
                        <pre className="text-xs font-mono text-slate-400 whitespace-pre-wrap group-hover:text-slate-300 transition-colors">
                          {log.payload}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar: Security & Subscriptions */}
          <div className="space-y-6">
            
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest text-slate-400">
                  <ShieldCheck className="w-4 h-4" /> Endpoint Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Signing Secret</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="password" 
                      value="whsec_8f92j3f0923jf0923jf0923j" 
                      readOnly 
                      className="w-full bg-black border border-slate-700 rounded-lg py-2 px-3 text-sm font-mono text-slate-300 focus:outline-none"
                    />
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                      Reveal
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Use this secret to verify that webhooks are sent by Theraflow via the <code className="bg-black px-1 rounded text-slate-400 border border-slate-800">X-Theraflow-Signature</code> header.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest text-slate-400">
                  <Braces className="w-4 h-4" /> Available Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['client.created', 'client.updated', 'appointment.scheduled', 'appointment.canceled', 'claim.submitted', 'claim.denied', 'payroll.processed'].map(ev => (
                    <div key={ev} className="flex items-center justify-between">
                      <span className="text-sm font-mono text-slate-300">{ev}</span>
                      <div className="w-8 h-4 bg-indigo-500/20 rounded-full border border-indigo-500/30 relative cursor-pointer">
                        <div className="absolute right-1 top-0.5 w-3 h-3 bg-indigo-400 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
