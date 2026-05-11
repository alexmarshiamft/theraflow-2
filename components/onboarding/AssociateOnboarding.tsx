'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, CreditCard, CheckCircle2, Loader2, Building, ShieldCheck, Sparkles, ArrowRight, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AssociateOnboardingProps {
  onComplete: () => void;
  associateName?: string;
}

export function AssociateOnboarding({ onComplete, associateName = "Alexander" }: AssociateOnboardingProps) {
  const [step, setStep] = useState(0); 
  // 0: Welcome, 1: Provisioning Email, 2: Provisioning Phone, 3: Provisioning Bank, 4: Done
  const [isProvisioning, setIsProvisioning] = useState(false);

  const handleStart = () => {
    setStep(1);
    setIsProvisioning(true);
  };

  useEffect(() => {
    if (step > 0 && step <= 3) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    } else if (step === 4) {
      setIsProvisioning(false);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl transition-all">
      <div className="max-w-3xl w-full mx-4 rounded-[2rem] bg-slate-900/50 border border-slate-700/50 shadow-2xl shadow-brand-500/10 overflow-hidden animate-in fade-in zoom-in-95 duration-700 relative">
        
        {/* Animated background glows */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative p-10 md:p-14">
          
          {step === 0 && (
            <div className="text-center animate-in slide-in-from-bottom-4 fade-in duration-700">
              <div className="mx-auto w-20 h-20 bg-brand-500/10 rounded-2xl flex items-center justify-center mb-8 border border-brand-500/20">
                <Building className="h-10 w-10 text-brand-400" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Welcome to the Team, {associateName}</h2>
              <p className="text-lg text-slate-400 mb-10 max-w-lg mx-auto">
                Before you access your clinical dashboard, let's provision your secure workspace, communication lines, and expense accounts.
              </p>
              <Button 
                onClick={handleStart}
                className="bg-brand-600 hover:bg-brand-500 text-white rounded-full px-8 py-6 text-lg font-medium shadow-lg shadow-brand-500/20 transition-all hover:scale-105 active:scale-95"
              >
                Start Provisioning
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}

          {step > 0 && (
            <div className="space-y-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {step === 4 ? "Provisioning Complete" : "Setting up your workspace..."}
                </h2>
                <p className="text-slate-400">
                  {step === 4 ? "All systems are green and ready for use." : "Generating secure credentials and authenticating services."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Email Provisioning */}
                <div className={`relative p-6 rounded-2xl border transition-all duration-500 ${step >= 1 ? 'bg-slate-800/80 border-slate-700 shadow-xl' : 'bg-slate-900/30 border-slate-800/50 opacity-50'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${step > 1 ? 'bg-green-500/10 text-green-400' : step === 1 ? 'bg-brand-500/10 text-brand-400' : 'bg-slate-800 text-slate-500'}`}>
                      <Mail className="w-6 h-6" />
                    </div>
                    {step === 1 && <Loader2 className="w-5 h-5 text-brand-400 animate-spin" />}
                    {step > 1 && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                  </div>
                  <h3 className="text-white font-semibold mb-1">Company Email</h3>
                  <p className="text-sm text-slate-400 mb-4">Secure clinical communications</p>
                  
                  <div className={`text-sm font-mono p-2 rounded-lg bg-slate-950 border border-slate-800 transition-all ${step > 1 ? 'text-brand-300 border-brand-500/30' : 'text-slate-600'}`}>
                    {step > 1 ? 'alexander.m@marshifamilytherapy.com' : 'Allocating address...'}
                  </div>
                </div>

                {/* VOIP Provisioning */}
                <div className={`relative p-6 rounded-2xl border transition-all duration-500 ${step >= 2 ? 'bg-slate-800/80 border-slate-700 shadow-xl' : 'bg-slate-900/30 border-slate-800/50 opacity-50'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${step > 2 ? 'bg-green-500/10 text-green-400' : step === 2 ? 'bg-brand-500/10 text-brand-400' : 'bg-slate-800 text-slate-500'}`}>
                      <Phone className="w-6 h-6" />
                    </div>
                    {step === 2 && <Loader2 className="w-5 h-5 text-brand-400 animate-spin" />}
                    {step > 2 && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                  </div>
                  <h3 className="text-white font-semibold mb-1">VOIP Business Line</h3>
                  <p className="text-sm text-slate-400 mb-4">Twilio HIPAA-compliant line</p>
                  
                  <div className={`text-sm font-mono p-2 rounded-lg bg-slate-950 border border-slate-800 transition-all ${step > 2 ? 'text-brand-300 border-brand-500/30' : 'text-slate-600'}`}>
                    {step > 2 ? '+1 (555) 438-9921' : 'Registering SIP...'}
                  </div>
                </div>

                {/* Bank Provisioning */}
                <div className={`relative p-6 rounded-2xl border transition-all duration-500 ${step >= 3 ? 'bg-slate-800/80 border-slate-700 shadow-xl' : 'bg-slate-900/30 border-slate-800/50 opacity-50'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${step > 3 ? 'bg-green-500/10 text-green-400' : step === 3 ? 'bg-brand-500/10 text-brand-400' : 'bg-slate-800 text-slate-500'}`}>
                      <Wallet className="w-6 h-6" />
                    </div>
                    {step === 3 && <Loader2 className="w-5 h-5 text-brand-400 animate-spin" />}
                    {step > 3 && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                  </div>
                  <h3 className="text-white font-semibold mb-1">Business Bank & Card</h3>
                  <p className="text-sm text-slate-400 mb-4">For CEUs and clinical expenses</p>
                  
                  <div className={`text-sm font-mono p-2 rounded-lg bg-slate-950 border border-slate-800 transition-all ${step > 3 ? 'text-brand-300 border-brand-500/30' : 'text-slate-600'}`}>
                    {step > 3 ? 'Account & Card Issued' : 'Generating virtual card...'}
                  </div>
                </div>

              </div>

              {/* Digital Debit Card Reveal */}
              <div className={`overflow-hidden transition-all duration-1000 ease-in-out flex justify-center ${step > 3 ? 'max-h-64 opacity-100 mt-12' : 'max-h-0 opacity-0'}`}>
                {step > 3 && (
                  <div className="relative w-96 h-56 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-slate-700 shadow-2xl overflow-hidden p-6 animate-in slide-in-from-bottom-8 fade-in zoom-in duration-700 flex flex-col justify-between">
                    {/* Card background styling */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-600/30 to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-500/20 to-transparent rounded-full blur-2xl" />
                    
                    <div className="relative flex justify-between items-start z-10">
                      <div>
                        <ShieldCheck className="w-8 h-8 text-slate-300 opacity-80" />
                        <div className="text-xs font-medium tracking-widest text-slate-400 mt-2 uppercase">Corporate Expense</div>
                      </div>
                      <div className="font-bold text-xl italic text-slate-200">Visa</div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="font-mono text-xl tracking-[0.2em] text-slate-200 mb-2">
                        4147 8922 1034 5092
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex gap-4">
                          <div>
                            <div className="text-[10px] text-slate-500 uppercase">Valid Thru</div>
                            <div className="font-mono text-sm text-slate-300">12/29</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-500 uppercase">CVV</div>
                            <div className="font-mono text-sm text-slate-300">•••</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium tracking-wide text-slate-300 uppercase">
                          Alexander Marshi
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Final Action */}
              <div className={`flex justify-center transition-all duration-700 ${step === 4 ? 'opacity-100 translate-y-0 mt-12' : 'opacity-0 translate-y-4 pointer-events-none hidden'}`}>
                <Button 
                  onClick={onComplete}
                  className="bg-brand-600 hover:bg-brand-500 text-white rounded-full px-10 py-6 text-lg font-medium shadow-[0_0_40px_rgba(var(--brand-500),0.3)] hover:shadow-[0_0_60px_rgba(var(--brand-500),0.5)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Enter Workspace
                </Button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
