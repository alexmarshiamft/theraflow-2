import EmpathyWaveform from "@/components/modules/intelligence/EmpathyWaveform";
import { Brain, HeartPulse, Activity, Zap, Mic, ShieldAlert } from "lucide-react";

export default function EmpathyEnginePage() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex-1 flex flex-col relative z-10">
        <main className="flex-1 overflow-y-auto p-4 relative">
          
          {/* Ambient Background Effects */}
          <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-brand-600/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-[1600px] mx-auto space-y-8 relative z-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wide mb-2">
                  <Mic className="h-3 w-3" />
                  Live Session Analysis
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  Empathy Engine <span className="text-white/30">v2</span>
                </h1>
                <p className="text-white/50 text-lg max-w-2xl">
                  Real-time voice biomarker and sentiment analysis. Hover over the frequency spectrum to pinpoint moments of elevated cognitive load and somatic anxiety.
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="flex gap-4">
                <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-white/50 text-sm font-medium mb-1">
                    <Activity className="h-4 w-4" />
                    Overall Baseline
                  </div>
                  <div className="text-2xl font-bold text-white">Elevated</div>
                </div>
                <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-white/50 text-sm font-medium mb-1">
                    <ShieldAlert className="h-4 w-4 text-red-400" />
                    Risk Factors
                  </div>
                  <div className="text-2xl font-bold text-red-400">2 Detected</div>
                </div>
              </div>
            </div>

            {/* The Main Stage: The Waveform Player */}
            <div className="w-full">
              <EmpathyWaveform />
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Insight 1 */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 group hover:border-brand-500/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="h-6 w-6 text-brand-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Cognitive Load</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Patient exhibited a 42% increase in micro-pauses and speech hesitation during the discussion of familial relationships at minute 14:20.
                </p>
              </div>

              {/* Insight 2 */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 group hover:border-red-500/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HeartPulse className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Somatic Markers</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Voice pitch elevated by 1.2 octaves above baseline indicating acute physiological stress response linked to the primary trauma narrative.
                </p>
              </div>

              {/* Insight 3 */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 group hover:border-amber-500/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Emotional Volatility</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Rapid shifting between negative and neutral sentiment indicates high emotional lability. Recommended for continued monitoring in next session.
                </p>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
