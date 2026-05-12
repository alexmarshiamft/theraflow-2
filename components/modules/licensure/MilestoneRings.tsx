'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { ArrowUpRight, Award, Flame, Star } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';

interface MilestoneRingsProps {
  totalBBSHours: number;
  totalHoursRequired: number;
}

export function MilestoneRings({ totalBBSHours, totalHoursRequired }: MilestoneRingsProps) {
  const percentComplete = Math.min(100, Math.max(0, (totalBBSHours / totalHoursRequired) * 100));
  const hoursRemaining = Math.max(0, totalHoursRequired - totalBBSHours);

  // SVG parameters
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentComplete / 100) * circumference;

  return (
    <Link href="/licensure" className="block group">
      <Card className="bg-slate-900/80 backdrop-blur-2xl border-white/10 overflow-hidden relative shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent z-0" />
        
        {/* Animated ambient orbs */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-purple-500/20 blur-[60px] animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-indigo-500/20 blur-[60px] animate-pulse" style={{ animationDelay: '1s' }} />

        <CardContent className="p-8 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="h-6 w-6 text-purple-400" />
              Licensure Progression
              <ArrowUpRight className="h-4 w-4 text-purple-400 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
            </h2>
            <Badge variant="info" className="bg-purple-500/20 text-purple-300 border border-purple-500/30">AMFT Track</Badge>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* The Ring */}
            <div className="relative flex items-center justify-center">
              <svg width="160" height="160" className="transform -rotate-90 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                {/* Background Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-slate-800"
                  strokeWidth="14"
                  fill="none"
                />
                {/* Progress Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-purple-500 transition-all duration-1000 ease-out"
                  strokeWidth="14"
                  fill="none"
                  strokeLinecap="round"
                  style={{ strokeDasharray: circumference, strokeDashoffset }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{Math.round(percentComplete)}%</span>
                <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest mt-1">Complete</span>
              </div>
            </div>

            {/* Badges & Stats */}
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                  <span className="block text-sm text-slate-400 mb-1">Total Verified</span>
                  <span className="text-2xl font-bold text-white">{totalBBSHours.toLocaleString()} <span className="text-sm font-normal text-slate-500">/ 3000</span></span>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                  <span className="block text-sm text-slate-400 mb-1">Hours Remaining</span>
                  <span className="text-2xl font-bold text-purple-400">{hoursRemaining.toLocaleString()}</span>
                </div>
              </div>

              {/* 3D Unlocked Badges */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Unlocked Milestones</h3>
                <div className="flex gap-4">
                  {totalBBSHours >= 1000 ? (
                    <div className="group/badge relative cursor-pointer">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 p-[2px] shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-transform hover:scale-110">
                        <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                          <Flame className="h-6 w-6 text-amber-400" />
                        </div>
                      </div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/badge:opacity-100 transition-opacity whitespace-nowrap bg-slate-800 text-xs text-white px-2 py-1 rounded shadow-lg z-20">
                        1,000 Hours
                      </div>
                    </div>
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-slate-800 border-2 border-slate-700 border-dashed flex items-center justify-center opacity-50">
                      <Flame className="h-6 w-6 text-slate-600" />
                    </div>
                  )}

                  {totalBBSHours >= 2000 ? (
                    <div className="group/badge relative cursor-pointer">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 p-[2px] shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-transform hover:scale-110">
                        <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                          <Star className="h-6 w-6 text-cyan-400" />
                        </div>
                      </div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/badge:opacity-100 transition-opacity whitespace-nowrap bg-slate-800 text-xs text-white px-2 py-1 rounded shadow-lg z-20">
                        2,000 Hours
                      </div>
                    </div>
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-slate-800 border-2 border-slate-700 border-dashed flex items-center justify-center opacity-50">
                      <Star className="h-6 w-6 text-slate-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
