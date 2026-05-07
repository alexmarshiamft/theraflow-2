'use client';

import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  ChevronRight, 
  FileSignature, 
  FileText, 
  Lock, 
  ShieldCheck, 
  ArrowRight,
  Loader2,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

type PortalStep = 'verification' | 'inbox' | 'signing' | 'success';

export default function ClientPortal() {
  const [step, setStep] = useState<PortalStep>('verification');
  const [accessCode, setAccessCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  
  const [signatureName, setSignatureName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [signing, setSigning] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setStep('inbox');
    }, 1500);
  };

  const handleSign = () => {
    setSigning(true);
    setTimeout(() => {
      setSigning(false);
      setStep('success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Secure Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-teal-500 shadow-sm">
            <Activity className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">Theraflow</span>
          <span className="text-sm font-medium text-gray-400 ml-2 hidden sm:inline-block">| Secure Client Portal</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <Lock className="w-3.5 h-3.5" />
          <span>256-bit Encrypted</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="w-full max-w-2xl relative z-10">
          
          {/* STEP 1: VERIFICATION */}
          {step === 'verification' && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
              <div className="p-8 md:p-12 text-center">
                <div className="mx-auto w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Verify Your Identity</h1>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  To protect your sensitive health information, please enter the 6-digit access code sent to your mobile device.
                </p>
                
                <form onSubmit={handleVerify} className="max-w-xs mx-auto">
                  <div className="mb-6">
                    <input 
                      type="text" 
                      placeholder="Enter Access Code"
                      className="w-full text-center text-2xl tracking-[0.5em] font-mono font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                      maxLength={6}
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={verifying || accessCode.length < 6}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3.5 px-4 rounded-xl transition-all active:scale-[0.98]"
                  >
                    {verifying ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Secure Login
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
              <div className="bg-slate-50 border-t border-gray-100 p-6 flex items-center justify-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> HIPAA Compliant</div>
                <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> SOC2 Certified</div>
              </div>
            </div>
          )}

          {/* STEP 2: INBOX */}
          {step === 'inbox' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Action Required</h1>
                <p className="text-gray-500">Please review and sign the following documents prior to your appointment.</p>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: "Informed Consent for Psychotherapy", date: "Requires Signature", urgent: true },
                  { title: "HIPAA Notice of Privacy Practices", date: "Requires Signature", urgent: true },
                  { title: "Telehealth Consent Form", date: "Requires Signature", urgent: true }
                ].map((doc, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setStep('signing')}
                    className="w-full text-left bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-brand-300 transition-all group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FileSignature className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{doc.title}</h3>
                        <div className="flex items-center gap-2 text-xs font-medium text-red-600">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                          {doc.date}
                        </div>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: SIGNING */}
          {step === 'signing' && (
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[80vh] max-h-[800px] animate-in fade-in slide-in-from-bottom-8 duration-700">
              
              {/* Document Header */}
              <div className="px-8 py-6 border-b border-gray-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Informed Consent for Psychotherapy</h2>
                  <p className="text-sm text-gray-500">Dr. Sarah Jenkins, Ph.D. • Theraflow Health</p>
                </div>
                <button onClick={() => setStep('inbox')} className="text-sm font-medium text-gray-500 hover:text-gray-900">
                  Cancel
                </button>
              </div>

              {/* Simulated Document Body */}
              <div className="flex-1 overflow-y-auto p-8 bg-white prose prose-sm max-w-none text-gray-600">
                <p><strong>1. PURPOSE OF TREATMENT:</strong> The purpose of psychotherapy is to understand and resolve psychological issues, improve emotional well-being, and enhance personal growth.</p>
                <p><strong>2. CONFIDENTIALITY:</strong> All interactions, including scheduling, attendance, and content of sessions, are strictly confidential as mandated by state law and HIPAA regulations. Exceptions include suspected child/elder abuse or immediate danger to self/others.</p>
                <p><strong>3. FINANCIAL POLICY:</strong> Payment is due at the time of service. Missed appointments or cancellations with less than 24 hours notice will be charged the full session fee.</p>
                <p><strong>4. TELEHEALTH:</strong> If utilizing telehealth, you agree to secure a private, distraction-free environment and understand the technological risks inherent in virtual care.</p>
                <p><em>By signing below, I acknowledge that I have read, understood, and agree to the terms outlined in this Informed Consent document.</em></p>
              </div>

              {/* E-Signature Footer */}
              <div className="border-t border-gray-200 bg-white p-8">
                <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <FileSignature className="w-4 h-4 text-brand-600" />
                  Apply E-Signature
                </h4>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Full Legal Name</label>
                    <input 
                      type="text" 
                      placeholder="Type your name to sign"
                      className="w-full text-lg font-medium text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      value={signatureName}
                      onChange={(e) => setSignatureName(e.target.value)}
                    />
                  </div>
                  
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center mt-0.5">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                      />
                      <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:bg-brand-600 peer-checked:border-brand-600 transition-colors flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      I agree to use electronic records and signatures, and I consent to the terms outlined in this document. I understand this is a legally binding equivalent of my handwritten signature.
                    </span>
                  </label>
                </div>

                <button 
                  onClick={handleSign}
                  disabled={signing || !agreed || signatureName.length < 2}
                  className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3.5 px-4 rounded-xl transition-all active:scale-[0.98]"
                >
                  {signing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Cryptographically Signing...
                    </>
                  ) : (
                    <>
                      Sign & Submit Document
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'success' && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden text-center animate-in zoom-in-95 duration-500">
              <div className="p-12">
                <div className="relative mx-auto w-24 h-24 mb-8">
                  <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-75"></div>
                  <div className="relative w-full h-full bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Documents Secured</h1>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
                  Your signatures have been cryptographically vaulted and successfully transmitted to your provider. 
                </p>
                
                <div className="bg-slate-50 rounded-2xl p-6 border border-gray-100 text-left mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-500">Document ID</span>
                    <span className="text-sm font-mono font-bold text-gray-900">#TRX-882-94A</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-500">Timestamp</span>
                    <span className="text-sm font-mono font-bold text-gray-900">Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Encryption</span>
                    <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-bold">
                      <Lock className="w-3 h-3" /> SHA-256
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setStep('inbox')}
                  className="text-brand-600 font-semibold hover:text-brand-700 transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
