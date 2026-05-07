'use client';

import { useState, useEffect } from 'react';
import { Database, FileCode2, ArrowRight, ServerCrash, CheckCircle2, Building2 } from 'lucide-react';

export function AutonomousPipeline() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s < 4 ? s + 1 : 4));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const Node = ({ icon: Icon, title, desc, active, completed }: any) => (
    <div className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-500 z-10 bg-slate-900 ${
      active ? 'border-brand-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 
      completed ? 'border-emerald-500/50 text-emerald-400' : 'border-slate-800 text-slate-500'
    }`}>
      <div className={`p-3 rounded-full mb-3 ${
        active ? 'bg-brand-500/20 text-brand-400' : 
        completed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-600'
      }`}>
        <Icon className="h-6 w-6" />
      </div>
      <h4 className={`font-semibold text-sm mb-1 ${active ? 'text-white' : ''}`}>{title}</h4>
      <p className="text-xs text-center max-w-[120px]">{desc}</p>
      
      {/* Processing indicator */}
      {active && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-8 bg-brand-500 rounded-full animate-pulse" />
      )}
    </div>
  );

  return (
    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8 w-full max-w-4xl mx-auto overflow-hidden relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="text-center mb-12 relative z-10">
        <h3 className="text-xl font-semibold text-white mb-2 flex items-center justify-center gap-2">
          <SparklesIcon className="text-brand-400 h-5 w-5" />
          Zero-Touch Autonomous Billing
        </h3>
        <p className="text-slate-400 text-sm">Processing session ID: #TH-8924-RX</p>
      </div>

      <div className="relative flex items-start justify-between">
        {/* Animated Connection Lines */}
        <div className="absolute top-12 left-12 right-12 h-1 bg-slate-800 rounded-full z-0">
          <div 
            className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 transition-all duration-[1500ms] ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Nodes */}
        <Node 
          icon={FileCode2} 
          title="SOAP Note Parsing" 
          desc="Extracting clinical sentiment & diagnosis"
          active={step === 0}
          completed={step > 0}
        />
        <Node 
          icon={Database} 
          title="Code Mapping" 
          desc="Assigning CPT: 90834 & ICD-10: F41.1"
          active={step === 1}
          completed={step > 1}
        />
        <Node 
          icon={Building2} 
          title="Clearinghouse" 
          desc="Validating rules engine & formatting 837P"
          active={step === 2}
          completed={step > 2}
        />
        <Node 
          icon={CheckCircle2} 
          title="Claim Accepted" 
          desc="Awaiting payer adjudication"
          active={step === 3}
          completed={step > 3}
        />
      </div>

      {step >= 4 && (
        <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium text-sm">
            <CheckCircle2 className="h-4 w-4" />
            Claim submitted successfully. 0 human clicks required.
          </div>
        </div>
      )}
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  )
}
