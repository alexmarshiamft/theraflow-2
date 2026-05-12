'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Sparkles, TrendingUp, Calendar, DollarSign, Award } from 'lucide-react';

export function WhatIfSimulator() {
  const [individuals, setIndividuals] = useState(15);
  const [couples, setCouples] = useState(5);
  const [emdr, setEmdr] = useState(2);

  // Constants
  const INDIVIDUAL_RATE = 150;
  const COUPLES_RATE = 180;
  const EMDR_RATE = 200;
  
  const totalSessions = individuals + couples + emdr;
  
  // Tiered Sharing Percentage Logic
  let splitPercentage = 0.10;
  if (totalSessions >= 40) splitPercentage = 0.50;
  else if (totalSessions >= 30) splitPercentage = 0.40;
  else if (totalSessions >= 20) splitPercentage = 0.30;
  else if (totalSessions >= 10) splitPercentage = 0.20;

  // Calculate Gross Weekly Revenue
  const weeklyGross = 
    (individuals * INDIVIDUAL_RATE) + 
    (couples * COUPLES_RATE) + 
    (emdr * EMDR_RATE);

  const weeklyTakeHome = weeklyGross * splitPercentage;
  const annualTakeHome = weeklyTakeHome * 48; // assuming 4 weeks off

  // Hours Projection (assuming 45 min sessions = 0.75 hours of clinical time, plus admin time)
  // Let's assume each session gives ~1.5 hours total (with notes/prep) towards BBS
  const weeklyBBSHours = totalSessions * 1.5;
  const remainingHours = 1200; // Mock current remaining
  const weeksToComplete = Math.ceil(remainingHours / weeklyBBSHours);
  
  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + (weeksToComplete * 7));

  return (
    <Card className="bg-slate-900/60 border-indigo-500/20 backdrop-blur-xl shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none" />
      <CardHeader className="border-b border-white/5 pb-4">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          "What-If" Income & Hours Simulator
        </CardTitle>
        <p className="text-sm text-slate-400 mt-1">Play with your schedule to see your tiered income potential and licensure date.</p>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sliders Area */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Individual Sessions (Weekly)</label>
                <span className="text-sm font-bold text-brand-400">{individuals}</span>
              </div>
              <input 
                type="range" min="0" max="40" value={individuals} 
                onChange={(e) => setIndividuals(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500" 
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Couples Sessions (Weekly)</label>
                <span className="text-sm font-bold text-purple-400">{couples}</span>
              </div>
              <input 
                type="range" min="0" max="20" value={couples} 
                onChange={(e) => setCouples(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500" 
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">EMDR Sessions (Weekly)</label>
                <span className="text-sm font-bold text-emerald-400">{emdr}</span>
              </div>
              <input 
                type="range" min="0" max="15" value={emdr} 
                onChange={(e) => setEmdr(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
              />
            </div>
          </div>

          {/* Results Area */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5 flex flex-col justify-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                <Award className="h-3 w-3 text-brand-400" /> Active Tier
              </span>
              <span className="text-3xl font-bold text-white">{(splitPercentage * 100)}%</span>
              <span className="text-xs text-slate-500 mt-1">{totalSessions} total sessions</span>
            </div>
            
            <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20 flex flex-col justify-center">
              <span className="text-xs text-emerald-400 uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                <DollarSign className="h-3 w-3" /> Projected Take-Home
              </span>
              <span className="text-3xl font-bold text-emerald-400">${Math.round(annualTakeHome).toLocaleString()}</span>
              <span className="text-xs text-emerald-500 mt-1">/ year</span>
            </div>

            <div className="col-span-2 bg-indigo-500/10 rounded-xl p-4 border border-indigo-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs text-indigo-400 uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> 3,000 BBS Hours Reached
                </span>
                <span className="text-xl font-bold text-indigo-300">
                  {completionDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="text-right">
                <TrendingUp className="h-6 w-6 text-indigo-400 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
