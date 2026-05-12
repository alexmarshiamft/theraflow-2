'use client';

import { useState, useEffect } from 'react';
import { Search, Calendar, FileText, Settings, User, Bot, Command, ArrowRight } from 'lucide-react';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Toggle with Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Blurred Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Palette Window */}
      <div className="relative z-10 w-full max-w-2xl bg-slate-900 border border-slate-700 shadow-2xl shadow-indigo-500/10 rounded-2xl overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-indigo-400 mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search... (e.g. 'Book John Smith')"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-slate-500 font-medium"
          />
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800 px-2 py-1 rounded">
            <Command className="w-3 h-3" /> ESC to close
          </div>
        </div>

        {/* Action List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          
          <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            AI Quick Actions
          </div>
          <div className="px-2 py-3 mx-2 my-1 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl cursor-pointer flex items-center justify-between group transition-colors border border-indigo-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Bot className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Ask AI Assistant</h4>
                <p className="text-xs text-indigo-200/70">"What is Alexander's retention rate this month?"</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="px-3 py-2 mt-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            Common Commands
          </div>
          
          <div className="px-2 py-3 mx-2 my-1 hover:bg-slate-800 rounded-xl cursor-pointer flex items-center justify-between group transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700">
                <Calendar className="w-4 h-4 text-slate-300" />
              </div>
              <span className="text-sm font-medium text-slate-200">Schedule New Appointment</span>
            </div>
          </div>
          
          <div className="px-2 py-3 mx-2 my-1 hover:bg-slate-800 rounded-xl cursor-pointer flex items-center justify-between group transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700">
                <FileText className="w-4 h-4 text-slate-300" />
              </div>
              <span className="text-sm font-medium text-slate-200">Create Clinical Note</span>
            </div>
          </div>

          <div className="px-2 py-3 mx-2 my-1 hover:bg-slate-800 rounded-xl cursor-pointer flex items-center justify-between group transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700">
                <User className="w-4 h-4 text-slate-300" />
              </div>
              <span className="text-sm font-medium text-slate-200">Add New Client</span>
            </div>
          </div>

          <div className="px-2 py-3 mx-2 my-1 hover:bg-slate-800 rounded-xl cursor-pointer flex items-center justify-between group transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700">
                <Settings className="w-4 h-4 text-slate-300" />
              </div>
              <span className="text-sm font-medium text-slate-200">Practice Settings</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
