'use client';

import { useState } from 'react';
import { User, ShieldCheck, HeartPulse, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SmartIntakeFlow() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push('/portal');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/10 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-10000 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fuchsia-500/10 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-7000 -translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-8 py-6 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center border border-brand-500/30">
            <Sparkles className="w-5 h-5 text-brand-400" />
          </div>
          <span className="text-xl font-bold text-white tracking-wide">Theraflow <span className="font-light text-slate-400">Intake</span></span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">HIPAA Secure</span>
        </div>
      </header>

      {/* Main Content Split */}
      <div className="flex-1 flex relative z-10 max-w-7xl w-full mx-auto p-8 gap-12">
        
        {/* Left: Form Flow */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-2 rounded-full bg-slate-900 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-700 ease-out ${
                    step >= i ? 'bg-gradient-to-r from-brand-500 to-indigo-500' : 'w-0'
                  }`}
                  style={{ width: step >= i ? '100%' : '0%' }}
                />
              </div>
            ))}
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Let's get to know you.</h1>
                  <p className="text-slate-400 text-lg">We use this information to match you with the therapist best equipped to support your unique journey.</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Legal First Name</label>
                    <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600" placeholder="e.g. Jane" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Name (Optional)</label>
                    <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600" placeholder="What should we call you?" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-white tracking-tight mb-4">What brings you here?</h1>
                  <p className="text-slate-400 text-lg">Select all that apply. This helps our Alchemy Engine find your perfect match.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {["Anxiety & Stress", "Depression", "Trauma / PTSD", "Relationship Issues", "Life Transitions", "Grief & Loss"].map((issue) => (
                    <button key={issue} className="flex items-center gap-3 bg-slate-900/50 border border-slate-700 p-4 rounded-2xl hover:border-brand-500 hover:bg-brand-500/10 transition-all text-left group">
                      <div className="w-5 h-5 rounded-md border border-slate-600 flex items-center justify-center group-hover:border-brand-500">
                         {/* Toggle logic omitted for visual prototype */}
                      </div>
                      <span className="text-slate-300 font-medium">{issue}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 text-center flex flex-col items-center justify-center py-12">
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center border-2 border-emerald-500/50 mb-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                </div>
                <h1 className="text-4xl font-bold text-white tracking-tight">You're all set!</h1>
                <p className="text-slate-400 text-lg max-w-md">Our Alchemy Engine is currently analyzing your profile to match you with the ideal therapist. You'll receive an email shortly.</p>
              </div>
            )}

            <div className="mt-12 flex items-center justify-between">
              <button 
                onClick={() => setStep(Math.max(1, step - 1))}
                className={`text-slate-400 font-medium hover:text-white transition-colors ${step === 1 || step === 3 ? 'opacity-0 pointer-events-none' : ''}`}
              >
                Back
              </button>
              <button 
                onClick={handleNext}
                className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                {step === 3 ? "Go to Dashboard" : "Continue"}
                {step !== 3 && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right: AI Copilot Assistant */}
        <div className="hidden lg:flex flex-col w-[400px] border-l border-white/5 pl-12 justify-center">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-indigo-600 p-[2px]">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-brand-400" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white">Intake Assistant</h3>
                <p className="text-xs text-brand-400 font-medium">Online & Secure</p>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="bg-slate-800/80 border border-slate-700/50 p-4 rounded-2xl rounded-tl-sm text-sm text-slate-200 shadow-lg">
                {step === 1 && "Hi there! I'm here to guide you through a quick intake. We ask for your legal name for insurance purposes, but we respect your preferred name at all times."}
                {step === 2 && "Take your time here. The more you share, the better our Alchemy Engine can pair you with a therapist who specializes in exactly what you're looking for."}
                {step === 3 && "Perfect! All your data is encrypted and HIPAA-secured. Your therapist will review this before your first session."}
              </div>
              
              {/* Typing indicator */}
              <div className="flex gap-1 items-center p-2 opacity-50 ml-2">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="mt-8 flex items-start gap-3 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
            <HeartPulse className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-100/70 leading-relaxed">
              Your mental health journey is deeply personal. We utilize military-grade encryption to ensure your data never leaves the secure boundaries of our platform.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
