'use client';

import React, { useState, useEffect } from 'react';

import {
  GraduationCap,
  Copy,
  CheckCircle,
  Users,
  Trophy,
  MapPin,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function FutureFoundersPage() {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const referralLink = 'theraflow.com/join/mft-pepperdine-2027';
  const invitesSent = 12;
  const invitesConverted = 4;
  const nextRewardTier = 5;
  const progressPercent = (invitesConverted / nextRewardTier) * 100;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const universities = [
    { name: 'Pepperdine University', students: 342, rank: 1, trend: '+12%' },
    { name: 'USC', students: 289, rank: 2, trend: '+8%' },
    { name: 'Northwestern University', students: 156, rank: 3, trend: '+15%' },
    { name: 'San Diego State', students: 112, rank: 4, trend: '+5%' },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-indigo-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Future Founders
            </span>
          </h1>
          <p className="text-slate-400 mt-2">
            MFT Ambassador Program &middot; Class of 2027
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                Graduation Countdown
              </span>
              <span className="text-xl font-bold font-mono text-white">
                342 Days
              </span>
            </div>
            <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Affiliate Engine & Rewards */}
        <div className="lg:col-span-2 space-y-8">
          {/* Affiliate Engine */}
          <div
            className="glass-panel p-8 relative overflow-hidden rounded-2xl border border-indigo-500/20 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">Invite Your Cohort</h2>
                  <p className="text-slate-400">Give your classmates free access. Earn epic rewards.</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-2 flex items-center gap-2">
                <div className="px-4 py-2 flex-1 font-mono text-sm text-slate-300 overflow-x-auto whitespace-nowrap">
                  {referralLink}
                </div>
                <Button
                  onClick={handleCopy}
                  className={cn(
                    "min-w-[120px] transition-all duration-300",
                    copied ? "bg-emerald-500 hover:bg-emerald-600" : "bg-indigo-500 hover:bg-indigo-600"
                  )}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700/50">
                  <div className="text-2xl font-bold text-white mb-1">{invitesSent}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Links Clicked</div>
                </div>
                <div className="bg-indigo-500/10 rounded-lg p-4 text-center border border-indigo-500/20">
                  <div className="text-2xl font-bold text-indigo-400 mb-1">{invitesConverted}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Joined</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700/50">
                  <div className="text-2xl font-bold text-white mb-1">Top 5%</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Campus Rank</div>
                </div>
              </div>
            </div>
          </div>

          {/* Rewards Track */}
          <div
            className="glass-panel p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Rewards Track
                </h2>
                <p className="text-slate-400 text-sm mt-1">Unlock premium perks for your future practice</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{invitesConverted} / {nextRewardTier}</div>
                <div className="text-sm text-indigo-400">Next unlock in {nextRewardTier - invitesConverted} invites</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden mb-12">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Reward Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { invites: 1, title: 'Theraflow Swag Box', desc: 'Premium hoodie & insulated mug', unlocked: true },
                { invites: 5, title: 'Year 1 Premium Free', desc: '$1,200 value when you open your practice', unlocked: false },
                { invites: 15, title: 'Concierge Credentialing', desc: 'We handle your insurance panels for free', unlocked: false },
              ].map((tier, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "relative p-6 rounded-xl border transition-all",
                    tier.unlocked 
                      ? "bg-slate-800/80 border-indigo-500/50" 
                      : "bg-slate-900/50 border-slate-800 opacity-60"
                  )}
                >
                  {tier.unlocked && (
                    <div className="absolute -top-3 -right-3 h-6 w-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-lg">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <div className="text-sm font-semibold text-indigo-400 mb-2">Tier {idx + 1}: {tier.invites} Invites</div>
                  <h3 className="text-white font-medium mb-1">{tier.title}</h3>
                  <p className="text-slate-400 text-sm">{tier.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: University Leaderboard */}
        <div
          className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500 delay-200 fill-mode-both"
        >
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-400" />
              University Network
            </h3>
            
            <div className="space-y-4">
              {universities.map((uni, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "p-4 rounded-xl border flex items-center justify-between",
                    idx === 0 ? "bg-indigo-500/10 border-indigo-500/30" : "bg-slate-800/30 border-slate-700/30"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm",
                      idx === 0 ? "bg-indigo-500 text-white" : "bg-slate-700 text-slate-300"
                    )}>
                      #{uni.rank}
                    </div>
                    <div>
                      <div className="text-white font-medium">{uni.name}</div>
                      <div className="text-xs text-slate-400">{uni.students} Active Students</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                    <TrendingUp className="h-3 w-3" />
                    {uni.trend}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-6 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
              View Full Leaderboard
            </Button>
          </div>
          
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">HIPAA Certification Active</h4>
                <p className="text-sm text-slate-400">
                  Your student account is fully BAA compliant. Ready for practicum clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
