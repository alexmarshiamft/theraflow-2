'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Sparkles, Loader2, BrainCircuit, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIAnalyticsDeepDiveProps {
  leaderboardData: any[];
  practiceCancellationRate: number;
}

export function AIAnalyticsDeepDive({ leaderboardData, practiceCancellationRate }: AIAnalyticsDeepDiveProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateDeepDive = async () => {
    setLoading(true);
    try {
      const topPerformers = leaderboardData.slice(0, 3).map(d => `${d.name} (${d.rate}% retention)`).join(', ');
      const bottomPerformers = leaderboardData.slice(-3).map(d => `${d.name} (${d.rate}% retention)`).join(', ');
      
      const prompt = `You are a clinical operations analyst and financial strategist for a therapy practice. 
The practice currently has an overall cancellation/no-show rate of ${practiceCancellationRate}%.
Here is the current associate retention leaderboard:
${leaderboardData.map(d => `- ${d.name}: ${d.rate}% retention, ${d.comp} completed, ${d.missed} missed`).join('\n')}

Provide a strategic deep dive analysis in exactly 3 concise, hard-hitting sections:
**1. The Primary Financial Leak:** Identify exactly who is bleeding the most revenue from the practice and why.
**2. The ROI Multiplier:** Identify the top performer(s) and highlight the financial upside if the bottom performers mirrored their retention rate.
**3. Immediate Action Plan:** Give a bold, specific recommendation on how the owner should route new incoming referrals and who to put on a PIP (Performance Improvement Plan).

Format your response cleanly in markdown. Do not include a greeting or conclusion, just the 3 sections. Use bold text to emphasize financial numbers and names.`;

      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }
      
      const data = await res.json();
      setInsight(data.text);
    } catch (error: any) {
      console.error("Deep Dive Generation Error:", error);
      setInsight(`**Analysis Failed**\n\nWe encountered an error while generating the operational deep dive: *${error.message}*\n\nPlease check your network connection, verify your Gemini API key is configured correctly in \`.env.local\`, and try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-slate-900/80 border-indigo-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -mr-40 -mt-40" />
      
      <CardHeader className="border-b border-white/5 pb-4 relative z-10 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-indigo-400" />
            AI Operational Deep Dive
          </CardTitle>
          <p className="text-sm text-slate-400 mt-1">Generate a strategic analysis of your team's retention performance.</p>
        </div>
        
        {!insight && !loading && (
          <button
            onClick={handleGenerateDeepDive}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            Analyze Leaderboard
          </button>
        )}
      </CardHeader>
      
      <CardContent className="pt-6 relative z-10">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-indigo-400">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p className="font-medium animate-pulse">Analyzing clinical retention metrics...</p>
          </div>
        ) : insight ? (
          <div className="prose prose-invert prose-indigo max-w-none text-slate-300">
            {insight.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <h3 key={i} className="text-lg font-bold text-white mt-6 mb-3 flex items-center gap-2">{line.replace(/\*\*/g, '')}</h3>;
              }
              if (line.trim().startsWith('**1.') || line.trim().startsWith('**2.') || line.trim().startsWith('**3.')) {
                return <h3 key={i} className="text-lg font-bold text-white mt-6 mb-3 flex items-center gap-2">{line.replace(/\*\*/g, '')}</h3>;
              }
              // Basic bolding logic
              const parts = line.split(/(\*\*.*?\*\*)/g);
              return (
                <p key={i} className="leading-relaxed mb-4">
                  {parts.map((part, j) => 
                    part.startsWith('**') && part.endsWith('**') ? 
                    <strong key={j} className="text-indigo-300 font-bold">{part.replace(/\*\*/g, '')}</strong> : 
                    part
                  )}
                </p>
              );
            })}
            
            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={handleGenerateDeepDive}
                className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Regenerate Deep Dive
              </button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center border-2 border-dashed border-white/10 rounded-xl bg-white/5">
            <Target className="w-12 h-12 text-slate-500 mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-medium text-slate-300 mb-1">Ready for Analysis</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Click the button above to let Gemini analyze your 24.6% churn rate and your team's exact completion metrics to surface hidden financial leaks.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
