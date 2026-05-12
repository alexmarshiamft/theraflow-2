'use client';

import { useState } from 'react';
import { BarChart3, Building2, Users, ArrowUpRight, Sparkles, RefreshCw, Briefcase, FileText } from 'lucide-react';

export function PracticeValuation() {
  const [activeClients, setActiveClients] = useState(25);
  const [avgFee, setAvgFee] = useState(150);
  const [retentionMonths, setRetentionMonths] = useState(9);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  // --- Accurate Mathematical Models ---
  // A standard active year is 48 weeks (assuming 4 weeks vacation/sick time)
  const workingWeeksPerYear = 48;
  const sessionsPerWeek = activeClients; // Assuming 1 session per week per active client
  const annualRevenue = sessionsPerWeek * avgFee * workingWeeksPerYear;
  
  // Customer Lifetime Value (CLTV): avgFee * (4 sessions/month * retentionMonths)
  const cltv = avgFee * (4 * retentionMonths);
  
  // SDE (Seller's Discretionary Earnings) - Assuming 80% operating margin for a lean telehealth practice
  const operatingMargin = 0.80;
  const sde = annualRevenue * operatingMargin;

  // Dynamic Enterprise Multiplier based on M&A attractiveness
  let dynamicMultiple = 1.2; // Base multiple for solo practice
  if (retentionMonths >= 12) dynamicMultiple += 0.3; // High retention is highly valued
  if (activeClients >= 30) dynamicMultiple += 0.2; // Scale
  if (avgFee >= 175) dynamicMultiple += 0.2; // Premium private pay margin
  
  const enterpriseValue = sde * dynamicMultiple;

  const generateAIReport = async () => {
    setIsGenerating(true);
    setAiReport(null);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate an M&A (Mergers & Acquisitions) Valuation Pitch Deck summary for a private clinical practice.
Metrics:
- Annual Revenue: $${annualRevenue.toLocaleString()}
- Active Caseload: ${activeClients}
- Average Session Fee: $${avgFee}
- Average Client Retention: ${retentionMonths} months
- Customer Lifetime Value (LTV): $${cltv.toLocaleString()}
- Seller's Discretionary Earnings (SDE): $${sde.toLocaleString()}
- Enterprise Value: $${enterpriseValue.toLocaleString()} (${dynamicMultiple.toFixed(1)}x multiple)

Format as a professional, concise 3-paragraph summary covering: 1. Financial Health, 2. Growth Potential & Risk, 3. Acquisition Attractiveness. Keep it under 150 words total. Do not use Markdown headings.`,
          responseFormat: 'text'
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setAiReport(data.text);
      }
    } catch (error) {
      console.error("AI Report generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-900/40 border border-white/10 rounded-[2rem] p-8 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden group">
      
      {/* Background glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] group-hover:bg-brand-500/20 transition-colors duration-1000 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-brand-500/20 border border-white/10 flex items-center justify-center shadow-inner">
              <Building2 className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white tracking-wide">Enterprise Equity Builder</h3>
              <p className="text-xs text-indigo-200/60 uppercase tracking-[0.2em] font-bold mt-1">Real-Time M&A Valuation</p>
            </div>
          </div>
          <button 
            onClick={generateAIReport}
            disabled={isGenerating}
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-brand-500/25 border border-white/10 transition-all hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-brand-200" />}
            Generate AI Pitch Deck
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Interactive Inputs */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-4 bg-black/20 p-5 rounded-2xl border border-white/5 shadow-inner">
              <label className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><Users className="w-4 h-4 text-slate-500" /> Active Caseload</span>
                <span className="text-lg font-bold text-white font-mono bg-white/5 px-3 py-1 rounded-lg border border-white/10">{activeClients}</span>
              </label>
              <input 
                type="range" min="5" max="60" 
                value={activeClients} onChange={(e) => setActiveClients(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
              />
            </div>

            <div className="space-y-4 bg-black/20 p-5 rounded-2xl border border-white/5 shadow-inner">
              <label className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><Briefcase className="w-4 h-4 text-slate-500" /> Avg Session Fee</span>
                <span className="text-lg font-bold text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">${avgFee}</span>
              </label>
              <input 
                type="range" min="80" max="300" step="5"
                value={avgFee} onChange={(e) => setAvgFee(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
              />
            </div>

            <div className="space-y-4 bg-black/20 p-5 rounded-2xl border border-white/5 shadow-inner">
              <label className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><RefreshCw className="w-4 h-4 text-slate-500" /> Client Retention</span>
                <span className="text-lg font-bold text-brand-400 font-mono bg-brand-500/10 px-3 py-1 rounded-lg border border-brand-500/20">{retentionMonths} mo</span>
              </label>
              <input 
                type="range" min="1" max="36" 
                value={retentionMonths} onChange={(e) => setRetentionMonths(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-brand-500 hover:accent-brand-400 transition-all"
              />
            </div>

            {/* Mobile Generate Button */}
            <button 
              onClick={generateAIReport}
              disabled={isGenerating}
              className="w-full md:hidden flex justify-center items-center gap-2 bg-gradient-to-r from-brand-600 to-indigo-600 text-white px-5 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-brand-500/25 border border-white/10"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate AI Pitch Deck
            </button>
          </div>

          {/* Outputs & AI Report */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Enterprise Value Banner */}
            <div className="p-8 bg-gradient-to-br from-indigo-500/10 to-brand-500/5 border border-white/10 rounded-3xl relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="absolute -right-8 -bottom-12 opacity-10 pointer-events-none">
                <BarChart3 className="w-48 h-48 text-brand-400" />
              </div>
              <div className="relative z-10">
                <h4 className="text-[11px] font-bold text-indigo-300/80 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  Estimated Enterprise Value
                </h4>
                <div className="flex items-end gap-4 mt-2">
                  <span className="text-5xl lg:text-6xl font-bold font-mono text-white tracking-tight drop-shadow-lg">
                    ${enterpriseValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  <div className="pb-2">
                    <span className="bg-brand-500/20 text-brand-300 text-sm font-bold px-3 py-1.5 rounded-lg border border-brand-500/30">
                      {dynamicMultiple.toFixed(1)}x SDE Multiple
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Metrics Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-black/40 border border-white/5 rounded-2xl shadow-inner backdrop-blur-md hover:bg-black/60 transition-colors">
                <div className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-2">Annual Revenue</div>
                <div className="text-2xl font-bold font-mono text-emerald-400">${annualRevenue.toLocaleString()}</div>
                <div className="text-[10px] text-emerald-500/70 mt-1 font-medium">Based on 48 working weeks</div>
              </div>
              <div className="p-5 bg-black/40 border border-white/5 rounded-2xl shadow-inner backdrop-blur-md hover:bg-black/60 transition-colors">
                <div className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-2">Client Lifetime Value</div>
                <div className="text-2xl font-bold font-mono text-indigo-400">${cltv.toLocaleString()}</div>
                <div className="text-[10px] text-indigo-500/70 mt-1 font-medium">LTV / CAC Optimization</div>
              </div>
            </div>

            {/* AI Pitch Deck Report */}
            {aiReport && (
              <div className="p-6 bg-gradient-to-br from-slate-800 to-black border border-white/10 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-indigo-500" />
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-brand-400" />
                  <h4 className="font-bold text-sm text-white uppercase tracking-wider">AI Executive Summary</h4>
                </div>
                <div className="text-slate-300 text-sm leading-relaxed space-y-4 font-medium">
                  {aiReport.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
