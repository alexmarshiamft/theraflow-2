'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Scale, Loader2, Send, MessageSquare, Shield, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

export function AILegalCounsel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessageId = Date.now().toString();
    
    setMessages(prev => [...prev, { id: newMessageId, role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          context: {
            systemInstruction: "You are the AI Legal Counsel for Theraflow. You specialize in California mental health law, Board of Behavioral Sciences (BBS) regulations, HIPAA, No Surprises Act, and standard psychotherapy practice compliance. Provide authoritative, concise, and highly professional legal/compliance guidance. Always include a disclaimer that you are an AI and this is not formal legal advice.",
          }
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: data.text }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: `Error: ${data.error}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: "Error connecting to AI Legal Counsel. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-amber-500/20 bg-gradient-to-b from-slate-900 to-black shadow-2xl relative overflow-hidden backdrop-blur-xl mb-8">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
      
      <CardHeader className="border-b border-amber-500/10 pb-4 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
            <Scale className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-white tracking-tight">AI Legal Counsel</CardTitle>
            <p className="text-sm text-slate-400 mt-1 font-medium flex items-center gap-2">
              <Shield className="w-3 h-3 text-amber-500" />
              Specialized in BBS, HIPAA & California Law
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 relative z-10 p-0">
        <div className="h-[400px] overflow-y-auto px-6 pb-6 flex flex-col gap-4">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700/50 mb-4">
                <MessageSquare className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">Ask Legal Counsel</h3>
              <p className="text-sm text-slate-500 max-w-md">
                Query our specialized AI on BBS compliance, HIPAA regulations, mandated reporting, or practice liability.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col max-w-[85%] rounded-2xl px-5 py-4",
                  msg.role === 'user' 
                    ? "bg-brand-600 text-white self-end rounded-tr-sm shadow-md"
                    : "bg-slate-800/80 text-slate-200 self-start rounded-tl-sm border border-slate-700"
                )}
              >
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-700/50">
                    <Scale className="w-3 h-3 text-amber-500" />
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Legal Counsel</span>
                  </div>
                )}
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex flex-col max-w-[85%] rounded-2xl px-5 py-4 bg-slate-800/80 text-slate-200 self-start rounded-tl-sm border border-slate-700">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-700/50">
                <Scale className="w-3 h-3 text-amber-500" />
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Legal Counsel</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs animate-pulse">Researching statutes...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., What are the BBS requirements for retaining records of a minor?"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-4 pr-14 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="absolute right-2 p-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-3 text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Not intended as formal legal advice
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
