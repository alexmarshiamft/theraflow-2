'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Command, FileText, Sparkles, CreditCard, 
  Calendar, Shield, Users, Activity, LogOut, Briefcase
} from 'lucide-react';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Handle Cmd+K to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const actions = [
    { icon: <Sparkles className="w-4 h-4 text-brand-400" />, label: "Run Daily Scribe Summaries", route: "/ehr", category: "AI Actions" },
    { icon: <CreditCard className="w-4 h-4 text-emerald-400" />, label: "Audit Pending Claims", route: "/claims", category: "AI Actions" },
    { icon: <Activity className="w-4 h-4 text-rose-400" />, label: "View Burnout Radar", route: "/intelligence", category: "Analytics" },
    { icon: <FileText className="w-4 h-4 text-blue-400" />, label: "Go to EHR Dashboard", route: "/ehr", category: "Navigation" },
    { icon: <Briefcase className="w-4 h-4 text-amber-400" />, label: "Execute Payroll Settlement", route: "/payroll", category: "Financials" },
    { icon: <Shield className="w-4 h-4 text-purple-400" />, label: "Check Compliance Ledger", route: "/compliance", category: "Security" },
    { icon: <Calendar className="w-4 h-4 text-sky-400" />, label: "View Schedule", route: "/dashboard", category: "Navigation" },
    { icon: <Users className="w-4 h-4 text-orange-400" />, label: "Client Portal (Preview)", route: "/portal", category: "Navigation" },
  ];

  const filteredActions = actions.filter(action => 
    action.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    action.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (route: string) => {
    setIsOpen(false);
    setSearchQuery('');
    router.push(route);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/60 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-slate-800 bg-slate-900/50">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            autoFocus
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-500 text-lg"
            placeholder="Type a command or search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 text-slate-400 text-xs font-medium border border-slate-700">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {filteredActions.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p>No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAction(action.route)}
                  className="w-full flex items-center px-4 py-3 rounded-xl hover:bg-brand-500/10 hover:text-white text-slate-300 transition-colors group text-left"
                >
                  <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-slate-900/50 mr-4 transition-colors">
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{action.label}</div>
                    <div className="text-xs text-slate-500 group-hover:text-brand-300/70">{action.category}</div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-slate-400">Jump to →</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">↑↓ to navigate</span>
            <span className="flex items-center gap-1">↵ to select</span>
            <span className="flex items-center gap-1">esc to close</span>
          </div>
          <div>Theraflow OS v2.0</div>
        </div>
      </div>
    </div>
  );
}
