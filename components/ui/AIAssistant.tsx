'use client';

import { useState, useRef } from 'react';
import { Bot, X, Send, Sparkles, Loader2, Paperclip, FileText } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{name: string, content: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const store = useStore();

  const handleSend = async () => {
    if (!input.trim() && !attachedFile) return;

    const userMessage = input.trim() || 'Please analyze the attached file.';
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Provide high-level store context
      const context: any = {
        clients: store.clients.length,
        appointments: store.appointments.length,
        employees: store.employees.length,
        claims: store.claims.length,
      };

      if (attachedFile) {
        context.uploadedFile = attachedFile;
      }

      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage, context }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch AI response');
      }

      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I encountered an error. Please check your API key and try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setAttachedFile({ name: file.name, content: text });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 p-4 rounded-full bg-brand-600 text-white shadow-lg hover:bg-brand-700 transition-transform hover:scale-105 z-50",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <Sparkles className="h-6 w-6" />
      </button>

      <div
        className={cn(
          "fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl flex flex-col transition-all origin-bottom-right z-50 border border-gray-200 overflow-hidden",
          isOpen ? "scale-100 opacity-100 h-[32rem]" : "scale-0 opacity-0 h-0 pointer-events-none"
        )}
      >
        <div className="bg-gradient-to-r from-brand-600 to-teal-500 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <h3 className="font-semibold text-sm">Theraflow AI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm space-y-3">
              <Sparkles className="h-8 w-8 text-brand-300" />
              <p className="text-center px-4 mb-2">I&apos;m your Theraflow Assistant powered by Gemini. Ask me about your practice!</p>
              <div className="flex flex-col gap-2 w-full px-4">
                <button onClick={() => setInput("Draft a letter of accommodation for a client with anxiety")} className="text-xs bg-white border border-brand-100 text-brand-700 rounded-lg py-2 px-3 hover:bg-brand-50 text-left transition-colors font-medium">"Draft an accommodation letter..."</button>
                <button onClick={() => setInput("Suggest 3 objective treatment goals for Major Depressive Disorder")} className="text-xs bg-white border border-brand-100 text-brand-700 rounded-lg py-2 px-3 hover:bg-brand-50 text-left transition-colors font-medium">"Suggest treatment goals..."</button>
                <button onClick={() => setInput("Summarize BBS requirements for telehealth supervision")} className="text-xs bg-white border border-brand-100 text-brand-700 rounded-lg py-2 px-3 hover:bg-brand-50 text-left transition-colors font-medium">"Summarize BBS telehealth rules..."</button>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                  msg.role === 'user' 
                    ? "bg-brand-600 text-white rounded-br-none" 
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm whitespace-pre-wrap"
                )}>
                  {msg.text}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin text-brand-500" /> Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="p-3 bg-white border-t border-gray-100 flex flex-col gap-2">
          {attachedFile && (
            <div className="flex items-center justify-between bg-brand-50 border border-brand-100 rounded-lg p-2 text-sm text-brand-700">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileText className="h-4 w-4 shrink-0 text-brand-500" />
                <span className="truncate max-w-[200px] text-xs font-medium">{attachedFile.name}</span>
              </div>
              <button 
                onClick={() => setAttachedFile(null)}
                className="hover:bg-brand-100 p-1 rounded-md text-brand-600 transition-colors"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <form 
            onSubmit={e => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2 relative"
          >
            <input
              type="file"
              accept=".csv,.txt,.json"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors shrink-0"
              disabled={isLoading}
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 border border-gray-200 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 min-w-0"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="sm" 
              className="absolute right-1 top-1 bottom-1 rounded-full px-3 bg-brand-600 hover:bg-brand-700"
              disabled={(!input.trim() && !attachedFile) || isLoading}
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
