'use client';

import { useState } from 'react';
import { CreditCard, Plus, Shield, Calendar, DollarSign, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

type VirtualCard = {
  id: string;
  merchant: string;
  last4: string;
  limit: number;
  expires: string;
  spent: number;
  isTrialMode?: boolean;
};

export function VirtualCardsManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form State
  const [merchant, setMerchant] = useState('');
  const [limit, setLimit] = useState('');
  const [expires, setExpires] = useState('');

  const [cards, setCards] = useState<VirtualCard[]>([
    {
      id: '1',
      merchant: 'Google Workspace',
      last4: '4092',
      limit: 120,
      expires: '2028-12',
      spent: 84
    },
    {
      id: '2',
      merchant: 'AWS Free Trial',
      last4: '8812',
      limit: 1,
      expires: '2026-06',
      spent: 0,
      isTrialMode: true
    }
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setCards(prev => [{
        id: Math.random().toString(),
        merchant: merchant || 'Any Merchant',
        last4: Math.floor(1000 + Math.random() * 9000).toString(),
        limit: parseInt(limit) || 0,
        expires: expires || '2029-12',
        spent: 0,
        isTrialMode: parseInt(limit) === 1
      }, ...prev]);
      
      setIsGenerating(false);
      setIsCreating(false);
      setMerchant('');
      setLimit('');
      setExpires('');
    }, 1500);
  };

  return (
    <div className="section-card border-border/50 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-border/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Merchant-Locked Cards</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Protect operating capital from free trials</p>
          </div>
        </div>
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            New Card
          </button>
        )}
      </div>

      <div className="p-6 flex-1 bg-slate-50/50 dark:bg-slate-900/20">
        {isCreating ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="p-4 rounded-xl border border-border bg-background shadow-sm space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Lock className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-500" />
                  Configure Virtual Card
                </h4>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Locked Merchant Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Zoom Video"
                      value={merchant}
                      onChange={(e) => setMerchant(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Monthly Limit ($)</label>
                    <input 
                      type="number" 
                      placeholder="e.g., 50 (or 1 for trials)"
                      value={limit}
                      onChange={(e) => setLimit(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Burn Date (Expiration)</label>
                    <input 
                      type="month" 
                      value={expires}
                      onChange={(e) => setExpires(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                    <p className="text-[10px] text-muted-foreground pt-1">Set to cancel right before a free trial converts to paid.</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-6">
                  <button 
                    onClick={() => setIsCreating(false)}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !merchant || !limit}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating PAN...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Generate Virtual Card
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 animate-in fade-in duration-500">
            {cards.map((card) => (
              <div key={card.id} className="relative p-4 rounded-xl border border-border/50 bg-background shadow-sm overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm font-semibold flex items-center gap-1.5">
                      {card.merchant}
                      {card.isTrialMode && (
                        <span className="text-[9px] uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Shield className="w-2.5 h-2.5" /> Burner
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground mt-1">
                      •••• •••• •••• {card.last4}
                    </div>
                  </div>
                  <div className="w-8 h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-slate-700 dark:to-slate-600 rounded opacity-80" />
                </div>
                
                <div className="relative z-10 space-y-2 mt-4 pt-4 border-t border-border/40">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground flex items-center gap-1"><DollarSign className="w-3 h-3" /> Monthly Limit</span>
                    <span className="font-medium">{card.limit > 0 ? `$${card.limit}` : 'Unlimited'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> Expires</span>
                    <span className="font-medium font-mono text-[11px]">{card.expires}</span>
                  </div>
                </div>
                
                {/* Progress Bar for limit */}
                {card.limit > 0 && !card.isTrialMode && (
                  <div className="relative z-10 mt-3">
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-muted-foreground">Spent</span>
                      <span className="font-medium">${card.spent} / ${card.limit}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full" 
                        style={{ width: `${Math.min(100, (card.spent / card.limit) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
