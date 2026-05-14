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
  Calendar,
  CreditCard,
  MessageSquare,
  Video,
  Clock,
  Bell,
  HeartPulse,
  Send,
  BrainCircuit,
  ActivitySquare,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type PortalStep = 'verification' | 'inbox' | 'signing' | 'success' | 'dashboard';

export default function ClientPortal() {
  const [step, setStep] = useState<PortalStep>('verification');
  const [accessCode, setAccessCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  
  const [signatureName, setSignatureName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [signing, setSigning] = useState(false);

  const [activeTab, setActiveTab] = useState('appointments');
  
  // AI Chat State
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: 'Hi there. I am your 24/7 AI Support Companion. How are you feeling today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Wellness Check-in State
  const [mood, setMood] = useState(50);
  const [stress, setStress] = useState(50);
  const [wellnessInsight, setWellnessInsight] = useState('');
  const [generatingInsight, setGeneratingInsight] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    
    const userMsg = chatInput;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: `You are the Theraflow AI Clinical Companion, a supportive 24/7 mental health bot for a client portal. Respond empathetically and concisely to the client. Client says: "${userMsg}"` 
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  const handleGenerateInsight = async () => {
    setGeneratingInsight(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: `A therapy client just logged their daily wellness check-in. Mood level: ${mood}/100. Stress level: ${stress}/100. Provide a 2-3 sentence personalized, supportive clinical insight or short coping tip based on these numbers.` 
        })
      });
      const data = await res.json();
      if (res.ok) {
        setWellnessInsight(data.text);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingInsight(false);
    }
  };

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

  if (step === 'dashboard') {
    return (
      <div className="min-h-screen bg-background flex flex-col font-sans animate-in fade-in duration-1000 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <header className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-teal-500 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Theraflow Portal</div>
                <div className="text-xs text-muted-foreground font-medium">Dr. Sarah Jenkins</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
              </button>
              <div className="h-8 w-8 rounded-full bg-brand-900/30 text-brand-400 border border-brand-500/20 flex items-center justify-center font-bold text-sm shadow-inner shadow-brand-500/20">
                AJ
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8 relative z-10">
          <div className="w-64 hidden md:block shrink-0">
            <nav className="space-y-1 sticky top-24">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === 'appointments' ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20 shadow-[0_0_15px_rgba(var(--brand-500-rgb),0.1)]' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <Calendar className="w-5 h-5" />
                Appointments
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === 'billing' ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20 shadow-[0_0_15px_rgba(var(--brand-500-rgb),0.1)]' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5" />
                  Billing
                </div>
                <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full text-xs font-bold">$120</span>
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === 'documents' ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20 shadow-[0_0_15px_rgba(var(--brand-500-rgb),0.1)]' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <FileText className="w-5 h-5" />
                Documents
              </button>
              <button
                onClick={() => setActiveTab('wellness')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === 'wellness' ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20 shadow-[0_0_15px_rgba(var(--brand-500-rgb),0.1)]' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <HeartPulse className="w-5 h-5" />
                Wellness
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === 'messages' ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20 shadow-[0_0_15px_rgba(var(--brand-500-rgb),0.1)]' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" />
                  AI Companion
                </div>
              </button>
              
              <div className="pt-8">
                <Button 
                  onClick={() => window.location.href = '/portal/instant-care'}
                  className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 transition-all font-bold group"
                >
                  <ActivitySquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Instant Care
                </Button>
              </div>
            </nav>
          </div>

          <div className="flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-foreground">Upcoming Appointments</h1>
                <div className="bg-card/60 backdrop-blur-2xl rounded-3xl border border-white/5 shadow-2xl p-6 relative overflow-hidden group hover:border-brand-500/30 transition-all duration-500">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <Video className="w-32 h-32 text-foreground" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex flex-col items-center justify-center text-brand-500 border border-brand-500/20 shadow-inner">
                        <span className="text-xs font-bold uppercase">MAY</span>
                        <span className="text-xl font-black leading-none text-foreground">12</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">Telehealth Therapy Session</h3>
                        <p className="text-muted-foreground flex items-center gap-2 mt-1 text-sm">
                          <Clock className="w-4 h-4" />
                          10:00 AM - 10:50 AM PDT
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Confirmed
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-brand-600 hover:bg-brand-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all">
                      <Video className="w-4 h-4 mr-2" />
                      Join Session
                    </Button>
                  </div>
                </div>

                <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-white/5 shadow-xl overflow-hidden">
                  <div className="p-6 border-b border-white/5">
                     <h3 className="font-bold text-foreground">Past Appointments</h3>
                  </div>
                  <div className="divide-y divide-white/5">
                    <div className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
                      <div>
                        <p className="font-medium text-foreground">Telehealth Therapy Session</p>
                        <p className="text-sm text-muted-foreground">April 28, 2026 • 10:00 AM</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div onClick={() => window.location.href = '/portal/intake'} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-foreground group-hover:text-brand-400 transition-colors">Start Initial Intake Assessment</p>
                          <span className="bg-brand-500/10 text-brand-500 border border-brand-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Required</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Complete this before your first session to find your Alchemy Match.</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-foreground">Billing & Insurance</h1>
                <div className="bg-gradient-to-br from-slate-900 to-black rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] p-8 text-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 blur-[80px] rounded-full group-hover:bg-brand-500/30 transition-colors duration-700"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 font-medium mb-1">Total Outstanding Balance</p>
                      <div className="text-5xl font-black drop-shadow-lg">$120.00</div>
                    </div>
                    <Button className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-xl px-8 py-6 rounded-xl font-bold text-lg transition-all hover:scale-105">
                      Pay Now
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-white/5 shadow-xl p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-brand-500/10 text-brand-500 border border-brand-500/20 rounded-xl flex items-center justify-center shadow-inner">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">Payment Methods</h3>
                        <p className="text-xs text-muted-foreground">Manage cards</p>
                      </div>
                    </div>
                    <div className="bg-muted/30 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-white/10 border border-white/10 rounded flex items-center justify-center text-[10px] font-bold text-foreground">VISA</div>
                        <span className="text-sm font-medium text-foreground">•••• 4242</span>
                      </div>
                      <span className="text-xs text-muted-foreground border border-white/10 px-2 py-0.5 rounded-full">Default</span>
                    </div>
                  </div>

                  <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-white/5 shadow-xl p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl flex items-center justify-center shadow-inner">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">Insurance</h3>
                        <p className="text-xs text-muted-foreground">Aetna PPO</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent border-white/10 hover:bg-white/5">Update Insurance</Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-foreground">Signed Documents</h1>
                <div className="bg-card/60 backdrop-blur-xl rounded-3xl border border-white/5 shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center justify-between p-4 bg-muted/30 border border-white/5 rounded-xl mb-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-500/10 text-brand-500 border border-brand-500/20 rounded-xl flex items-center justify-center shadow-inner">
                        <FileSignature className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Informed Consent for Psychotherapy</h3>
                        <p className="text-sm text-muted-foreground">Signed May 7, 2026</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent border-white/10 hover:bg-white/5">Download PDF</Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'messages' && (
              <div className="h-[600px] flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                    <BrainCircuit className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">AI Support Companion</h1>
                    <p className="text-sm text-brand-500 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                      Online & Secure
                    </p>
                  </div>
                </div>

                <div className="flex-1 bg-card/60 backdrop-blur-xl rounded-3xl border border-white/5 shadow-xl flex flex-col overflow-hidden">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'ai' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shrink-0">
                            <BrainCircuit className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm ${
                          msg.role === 'user' 
                            ? 'bg-brand-600 text-white rounded-br-sm' 
                            : 'bg-muted/50 border border-white/5 text-foreground rounded-bl-sm'
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex items-end gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shrink-0">
                          <BrainCircuit className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-muted/50 border border-white/5 rounded-2xl rounded-bl-sm px-5 py-4">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 bg-background/50 backdrop-blur-xl border-t border-white/5">
                    <form onSubmit={handleSendMessage} className="relative flex items-center">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full bg-muted/30 border border-white/10 rounded-2xl pl-5 pr-14 py-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all placeholder:text-muted-foreground"
                      />
                      <button 
                        type="submit"
                        disabled={!chatInput.trim() || chatLoading}
                        className="absolute right-2 w-10 h-10 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:bg-muted disabled:text-muted-foreground text-white flex items-center justify-center transition-colors shadow-md"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wellness' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20">
                    <HeartPulse className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Daily Wellness Check-in</h1>
                    <p className="text-sm text-muted-foreground">Track your mood and stress levels.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mood Slider */}
                  <div className="bg-card/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-xl">
                    <h3 className="font-bold text-foreground mb-6 flex items-center justify-between">
                      Current Mood
                      <span className="text-2xl">{mood > 70 ? '😄' : mood > 40 ? '😐' : '😔'}</span>
                    </h3>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={mood} 
                      onChange={(e) => setMood(Number(e.target.value))}
                      className="w-full accent-rose-500 h-2 bg-muted rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground font-medium mt-3">
                      <span>Struggling</span>
                      <span>Thriving</span>
                    </div>
                  </div>

                  {/* Stress Slider */}
                  <div className="bg-card/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-xl">
                    <h3 className="font-bold text-foreground mb-6 flex items-center justify-between">
                      Stress Level
                      <span className="text-2xl">{stress > 70 ? '😫' : stress > 40 ? '🤔' : '😌'}</span>
                    </h3>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={stress} 
                      onChange={(e) => setStress(Number(e.target.value))}
                      className="w-full accent-indigo-500 h-2 bg-muted rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground font-medium mt-3">
                      <span>Very Relaxed</span>
                      <span>Overwhelmed</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleGenerateInsight} 
                    disabled={generatingInsight}
                    className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-6 rounded-2xl text-lg shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all"
                  >
                    {generatingInsight ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing Patterns...</>
                    ) : (
                      <><BrainCircuit className="w-5 h-5 mr-2" /> Log Check-in & Get AI Insight</>
                    )}
                  </Button>
                </div>

                {wellnessInsight && (
                  <div className="mt-8 bg-gradient-to-br from-brand-900/40 to-indigo-900/40 border border-brand-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                    <div className="flex gap-4 relative z-10">
                      <div className="w-12 h-12 bg-brand-500/20 rounded-full flex items-center justify-center shrink-0 border border-brand-500/30">
                        <Sparkles className="w-6 h-6 text-brand-400" />
                      </div>
                      <div>
                        <h4 className="text-brand-400 font-bold mb-2 uppercase tracking-widest text-sm">Theraflow Insight</h4>
                        <p className="text-foreground text-lg leading-relaxed font-medium">
                          {wellnessInsight}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans relative overflow-hidden transition-colors duration-700">
      {/* Cinematic Background Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-500/20 rounded-full blur-[160px] pointer-events-none animate-pulse duration-10000"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-500/15 rounded-full blur-[160px] pointer-events-none animate-pulse duration-7000"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      <header className="bg-card/40 backdrop-blur-2xl border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-teal-500 shadow-[0_0_15px_rgba(14,165,233,0.5)]">
            <Activity className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight">Theraflow</span>
          <span className="text-sm font-medium text-muted-foreground ml-2 hidden sm:inline-block border-l border-border pl-2">Secure Client Portal</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
          <Lock className="w-3.5 h-3.5" />
          <span>256-bit Encrypted</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-2xl">
          {step === 'verification' && (
            <div className="bg-card/70 backdrop-blur-3xl rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden animate-in fade-in zoom-in-95 duration-700 hover:border-white/20 transition-colors">
              <div className="p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50"></div>
                
                <div className="mx-auto w-20 h-20 bg-brand-500/10 text-brand-500 rounded-full flex items-center justify-center mb-8 border border-brand-500/20 shadow-[0_0_30px_rgba(14,165,233,0.15)] relative">
                  <div className="absolute inset-0 bg-brand-500/20 rounded-full animate-ping opacity-20"></div>
                  <ShieldCheck className="w-10 h-10 relative z-10" />
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">Verify Identity</h1>
                <p className="text-muted-foreground mb-10 max-w-md mx-auto text-lg">
                  To protect your sensitive health data, enter the secure access code sent to your device.
                </p>
                <form onSubmit={handleVerify} className="max-w-sm mx-auto">
                  <div className="mb-8">
                    <input 
                      type="text" 
                      placeholder="••••••"
                      className="w-full text-center text-3xl tracking-[0.5em] font-mono font-bold text-foreground bg-background/50 border-2 border-border rounded-2xl px-4 py-5 focus:outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-inner backdrop-blur-sm placeholder:text-muted-foreground/30"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                      maxLength={6}
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={verifying || accessCode.length < 6}
                    className="w-full flex items-center justify-center gap-2 bg-foreground hover:bg-foreground/90 disabled:bg-muted disabled:text-muted-foreground text-background font-bold text-lg py-4 px-4 rounded-2xl transition-all active:scale-[0.98] shadow-xl hover:shadow-2xl"
                  >
                    {verifying ? (
                      <><Loader2 className="w-6 h-6 animate-spin" /> Cryptographic Verification...</>
                    ) : (
                      <>Secure Login <ArrowRight className="w-6 h-6" /></>
                    )}
                  </button>
                </form>
              </div>
              <div className="bg-muted/30 border-t border-white/5 p-6 flex items-center justify-center gap-8 text-xs text-muted-foreground font-medium uppercase tracking-widest">
                <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-500" /> HIPAA Compliant</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-500" /> SOC2 Certified</div>
              </div>
            </div>
          )}

          {step === 'inbox' && (
            <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 mb-6 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                  <FileSignature className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Action Required</h1>
                <p className="text-muted-foreground text-lg">Cryptographically sign the following documents prior to your appointment.</p>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Informed Consent for Psychotherapy", date: "Signature Required", urgent: true },
                  { title: "HIPAA Notice of Privacy Practices", date: "Signature Required", urgent: true },
                  { title: "Telehealth Consent Form", date: "Signature Required", urgent: true }
                ].map((doc, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setStep('signing')}
                    className="w-full text-left bg-card/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] hover:border-brand-500/50 transition-all duration-300 group flex items-center justify-between hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                        <FileSignature className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1 text-lg group-hover:text-brand-400 transition-colors">{doc.title}</h3>
                        <div className="flex items-center gap-2 text-sm font-bold text-red-500 bg-red-500/10 px-2.5 py-0.5 rounded-full w-fit border border-red-500/20">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                          {doc.date}
                        </div>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-all duration-300 shadow-sm">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'signing' && (
            <div className="bg-card/80 backdrop-blur-3xl rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col h-[85vh] max-h-[850px] animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <div className="px-8 py-6 border-b border-white/10 bg-muted/20 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50"></div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Informed Consent for Psychotherapy</h2>
                  <p className="text-sm text-muted-foreground mt-1">Dr. Sarah Jenkins, Ph.D. • Theraflow Health</p>
                </div>
                <button onClick={() => setStep('inbox')} className="text-sm font-bold text-muted-foreground hover:text-foreground bg-background border border-border px-4 py-2 rounded-full transition-colors hover:bg-muted">
                  Cancel
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 bg-card/40 prose prose-slate dark:prose-invert max-w-none text-foreground leading-loose">
                <p><strong>1. PURPOSE OF TREATMENT:</strong> The purpose of psychotherapy is to understand and resolve psychological issues, improve emotional well-being, and enhance personal growth.</p>
                <p><strong>2. CONFIDENTIALITY:</strong> All interactions, including scheduling, attendance, and content of sessions, are strictly confidential as mandated by state law and HIPAA regulations. Exceptions include suspected child/elder abuse or immediate danger to self/others.</p>
                <p><strong>3. FINANCIAL POLICY:</strong> Payment is due at the time of service. Missed appointments or cancellations with less than 24 hours notice will be charged the full session fee.</p>
                <p><strong>4. TELEHEALTH:</strong> If utilizing telehealth, you agree to secure a private, distraction-free environment and understand the technological risks inherent in virtual care.</p>
                <p className="italic opacity-80 border-l-4 border-brand-500 pl-4 bg-brand-500/5 p-4 rounded-r-xl">By signing below, I acknowledge that I have read, understood, and agree to the terms outlined in this Informed Consent document.</p>
              </div>
              <div className="border-t border-white/10 bg-muted/20 p-8 backdrop-blur-xl">
                <h4 className="text-sm font-black text-foreground mb-5 uppercase tracking-widest flex items-center gap-2">
                  <FileSignature className="w-5 h-5 text-brand-500" /> Apply Cryptographic Signature
                </h4>
                <div className="space-y-5 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">Full Legal Name</label>
                    <input 
                      type="text" 
                      placeholder="Type your name to sign"
                      className="w-full text-xl font-medium text-foreground bg-background border border-border rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all shadow-inner"
                      value={signatureName}
                      onChange={(e) => setSignatureName(e.target.value)}
                    />
                  </div>
                  <label className="flex items-start gap-4 cursor-pointer group bg-background/50 p-4 rounded-xl border border-border hover:border-brand-500/30 transition-colors">
                    <div className="relative flex items-center mt-1 shrink-0">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                      />
                      <div className="w-6 h-6 rounded border-2 border-muted-foreground peer-checked:bg-brand-500 peer-checked:border-brand-500 transition-colors flex items-center justify-center shadow-[0_0_10px_rgba(14,165,233,0.0)] peer-checked:shadow-[0_0_10px_rgba(14,165,233,0.5)]">
                        <CheckCircle2 className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                      I agree to use electronic records and signatures, and I consent to the terms outlined in this document. I understand this is a legally binding equivalent of my handwritten signature.
                    </span>
                  </label>
                </div>
                <button 
                  onClick={handleSign}
                  disabled={signing || !agreed || signatureName.length < 2}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 disabled:from-muted disabled:to-muted disabled:text-muted-foreground text-white font-bold text-lg py-4 px-4 rounded-xl transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] disabled:shadow-none"
                >
                  {signing ? (
                    <><Loader2 className="w-6 h-6 animate-spin" /> Generating Blockchain Hash...</>
                  ) : (
                    <>Sign & Submit Vault Document <ArrowRight className="w-6 h-6" /></>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="bg-card/80 backdrop-blur-3xl rounded-[2rem] shadow-2xl border border-emerald-500/30 overflow-hidden text-center animate-in zoom-in-95 duration-1000">
              <div className="p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                
                <div className="relative mx-auto w-28 h-28 mb-8 z-10">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-[ping_2s_ease-in-out_infinite] opacity-75"></div>
                  <div className="absolute inset-2 bg-emerald-500/30 rounded-full animate-pulse opacity-75"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.5)] border border-emerald-300">
                    <CheckCircle2 className="w-14 h-14" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight relative z-10">Documents Vaulted</h1>
                <p className="text-muted-foreground mb-10 max-w-sm mx-auto text-lg relative z-10">
                  Your signatures have been cryptographically secured and transmitted to your provider. 
                </p>
                <div className="bg-background/80 backdrop-blur-xl rounded-2xl p-6 border border-border text-left mb-10 relative z-10 shadow-inner">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Document ID</span>
                    <span className="text-base font-mono font-bold text-brand-400">#TRX-882-94A</span>
                  </div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Timestamp</span>
                    <span className="text-base font-mono font-bold text-foreground">Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Encryption Protocol</span>
                    <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg text-sm font-bold border border-emerald-500/20">
                      <Lock className="w-4 h-4" /> SHA-256 AES
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => setStep('dashboard')}
                  className="w-full bg-foreground hover:bg-foreground/90 text-background text-lg font-bold py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 relative z-10"
                >
                  Enter Secured Portal
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
