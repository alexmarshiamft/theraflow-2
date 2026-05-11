'use client';

import { useState } from 'react';
import { Radar, Check, X, CreditCard, Tag, Sparkles } from 'lucide-react';

// Mock transactions that the AI "found"
const MOCK_TRANSACTIONS = [
  { id: 1, merchant: "Psychology Today", amount: 29.95, category: "Marketing", probability: 99 },
  { id: 2, merchant: "SimplePractice", amount: 99.00, category: "Software", probability: 98 },
  { id: 3, merchant: "Starbucks", amount: 14.50, category: "Meals", probability: 45, note: "Possible client meeting?" },
  { id: 4, merchant: "PESI Continuing Ed", amount: 199.99, category: "Education", probability: 95 },
  { id: 5, merchant: "Dr. Jane Smith (Therapy)", amount: 150.00, category: "Healthcare", probability: 85, note: "Personal therapy is often deductible for therapists as professional maintenance." },
];

export function WriteOffRadar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedDeductions, setSavedDeductions] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  const currentTx = MOCK_TRANSACTIONS[currentIndex];
  const isComplete = currentIndex >= MOCK_TRANSACTIONS.length;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setSavedDeductions(prev => prev + currentTx.amount);
      setAnimationClass('translate-x-full opacity-0 rotate-12');
    } else {
      setAnimationClass('-translate-x-full opacity-0 -rotate-12');
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setAnimationClass(''); // reset for next card
    }, 300); // match transition duration
  };

  return (
    <div className="section-card p-6 border-border/50 bg-slate-900 relative overflow-hidden flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-4 z-10">
        <div className="flex items-center gap-2">
          <Radar className="w-5 h-5 text-brand-400 animate-pulse" />
          <h3 className="font-bold text-foreground">Write-off Radar</h3>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Found Deductions</div>
          <div className="font-mono font-bold text-emerald-400">${savedDeductions.toFixed(2)}</div>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        {/* Background radar sweep effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-64 h-64 border rounded-full border-brand-500/50 absolute" />
          <div className="w-48 h-48 border rounded-full border-brand-500/40 absolute" />
          <div className="w-32 h-32 border rounded-full border-brand-500/30 absolute" />
          <div className="w-1/2 h-full absolute origin-left bg-gradient-to-r from-transparent to-brand-500/20 animate-[spin_4s_linear_infinite]" style={{ right: '50%' }} />
        </div>

        {isComplete ? (
          <div className="text-center z-10 animate-in fade-in zoom-in duration-500">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Inbox Zero</h4>
            <p className="text-sm text-slate-400">All potential deductions categorized.</p>
            <button 
              onClick={() => { setCurrentIndex(0); setSavedDeductions(0); }}
              className="mt-6 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-white transition-colors"
            >
              Rescan Bank Feed
            </button>
          </div>
        ) : (
          <div className={`w-full max-w-sm bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl z-10 transition-all duration-300 ${animationClass}`}>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-slate-900 rounded-xl">
                <CreditCard className="w-6 h-6 text-slate-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold font-mono text-white">${currentTx.amount.toFixed(2)}</div>
                <div className="text-xs text-slate-400">{currentTx.category}</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-lg text-white mb-1">{currentTx.merchant}</h4>
              <div className="flex items-center gap-2 text-xs">
                <Sparkles className="w-3 h-3 text-brand-400" />
                <span className="text-brand-400 font-medium">{currentTx.probability}% deduction match</span>
              </div>
              {currentTx.note && (
                <div className="mt-4 p-3 bg-brand-500/10 border border-brand-500/20 rounded-lg text-xs text-slate-300 leading-relaxed">
                  {currentTx.note}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => handleSwipe('left')}
                className="flex-1 py-3 flex justify-center items-center rounded-xl bg-slate-900 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors border border-transparent hover:border-red-500/30"
              >
                <X className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSwipe('right')}
                className="flex-1 py-3 flex justify-center items-center rounded-xl bg-brand-500 text-white hover:bg-brand-600 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                <Tag className="w-5 h-5 mr-2" />
                Deduct
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
