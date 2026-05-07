'use client';

import React from 'react';
import { 
  Activity, 
  BrainCircuit, 
  Calculator, 
  CheckCircle2, 
  CircleDollarSign, 
  ClipboardList, 
  CreditCard, 
  Globe, 
  Lock, 
  Rocket, 
  ShieldCheck, 
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

export default function PlatformShowcase() {
  return (
    <div className="flex-1 bg-gray-50 min-h-screen overflow-y-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white border-b border-gray-200">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-white to-teal-50/50"></div>
        <div className="relative px-8 py-24 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Rocket className="w-4 h-4" />
            <span>Ready to Deploy</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            The Complete Practice <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-500">Operating System</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Theraflow is the first unified, high-fidelity platform that combines clinical EHR, intelligent billing, banking, and an AI CPA. Everything you need to scale your mental health practice—ready to go on day one.
          </p>
          <div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              HIPAA Compliant
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-brand-500" />
              SOC2 Certified
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <Lock className="w-4 h-4 text-indigo-500" />
              End-to-End Encrypted
            </div>
          </div>
        </div>
      </div>

      {/* Bento Box Grid */}
      <div className="px-8 py-16 max-w-7xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* EHR Core */}
          <div className="col-span-1 md:col-span-2 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
              <Activity className="w-48 h-48" />
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <ClipboardList className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Next-Gen EHR & Vault</h3>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-lg">
              A physical-feeling clinical workspace that tracks BBS hours in real-time. Features biometric-style note unlocking, secure document storage, and effortless telehealth integration.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Real-time associate hour tracking</li>
              <li className="flex items-center gap-3 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> 256-bit encrypted clinical vault</li>
              <li className="flex items-center gap-3 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Frictionless progress note entry</li>
            </ul>
          </div>

          {/* Billing Engine */}
          <div className="col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl relative overflow-hidden text-white group">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Zap className="w-32 h-32 text-amber-400" />
            </div>
            <div className="w-12 h-12 bg-slate-800/50 text-amber-400 rounded-2xl flex items-center justify-center mb-6 border border-slate-700">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">AI Claim Audit</h3>
            <p className="text-slate-300 leading-relaxed mb-6 text-sm">
              Never face a rejection again. Our AI scrubs every claim against 40+ payer rules before batch submitting them in a single click.
            </p>
            <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400">Processing Accuracy</span>
                <span className="text-xs font-bold text-emerald-400">99.9%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[99.9%] rounded-full"></div>
              </div>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Payroll Orchestration */}
          <div className="col-span-1 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Split-Fee Payroll</h3>
            <p className="text-gray-600 leading-relaxed text-sm mb-6">
              Automate complex 50/50 associate splits. Orchestrate paystubs, email confirmations, and ACH direct deposits simultaneously.
            </p>
            <div className="flex items-center gap-2 bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
              <span className="text-xs font-medium text-indigo-700">Orchestrating 6 Associates...</span>
            </div>
          </div>

          {/* AI CPA */}
          <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-brand-600 to-teal-500 rounded-3xl p-8 border border-transparent shadow-lg relative overflow-hidden text-white group">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute -right-8 -top-8 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <Globe className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm text-white rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI CPA S-Corp Engine</h3>
              <p className="text-teal-50 leading-relaxed mb-8 max-w-lg">
                Theraflow analyzes your monthly net profit and automatically recommends the most tax-advantaged distribution strategy across W-2 salary, K-1 distributions, and high-yield treasury retention.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-xs text-teal-100 mb-1">W-2 Salary</div>
                  <div className="font-mono font-bold">$10,000</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-xs text-teal-100 mb-1">K-1 Draw</div>
                  <div className="font-mono font-bold">$15,000</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-xs text-teal-100 mb-1">Treasury (5.1%)</div>
                  <div className="font-mono font-bold">$5,000</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Theraflow Impact */}
        <div className="bg-slate-900 rounded-3xl p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-4">The Theraflow Impact</h3>
              <p className="text-slate-400 leading-relaxed max-w-md">
                By replacing fragmented tools and part-time CPAs with an integrated OS, practice owners instantly reclaim non-billable hours, driving massive revenue growth.
              </p>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-6 w-full">
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <p className="text-xs text-brand-400 font-medium mb-2 uppercase tracking-wider">Admin Time Saved</p>
                <div className="text-4xl font-bold font-mono text-white">144<span className="text-lg text-slate-500 ml-1">hrs</span></div>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <p className="text-xs text-indigo-400 font-medium mb-2 uppercase tracking-wider">Extra Rev. Earned</p>
                <div className="text-4xl font-bold font-mono text-white">$16k+</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
