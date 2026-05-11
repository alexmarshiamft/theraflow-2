'use client';

import React, { useState } from 'react';
import { Activity, Brain, TrendingUp, Sparkles, Filter, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function MoodTopography() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Mock data representing a client's mood over time (e.g., last 6 months)
  const dataPoints = [
    { month: 'Jan', value: 40, label: 'Baseline Anxiety' },
    { month: 'Feb', value: 65, label: 'Breakthrough: Boundaries' },
    { month: 'Mar', value: 30, label: 'Depressive Episode' },
    { month: 'Apr', value: 55, label: 'Recovery & Grounding' },
    { month: 'May', value: 85, label: 'Peak: Career Milestone' },
    { month: 'Jun', value: 75, label: 'Stable Affect' },
  ];

  // SVG dimensions
  const width = 800;
  const height = 400;
  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Path generation
  const generatePath = (points: {value: number}[], offset: number = 0, smoothing: number = 0.2) => {
    if (points.length === 0) return '';
    
    const pointWidth = chartWidth / (points.length - 1);
    
    // Start at bottom left
    let path = `M ${padding} ${height - padding + offset}`;
    
    // Draw to first point
    const startY = height - padding - (points[0].value / 100) * chartHeight + offset;
    path += ` L ${padding} ${startY}`;

    // Curve through points
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      
      const x1 = padding + i * pointWidth;
      const y1 = height - padding - (p1.value / 100) * chartHeight + offset;
      
      const x2 = padding + (i + 1) * pointWidth;
      const y2 = height - padding - (p2.value / 100) * chartHeight + offset;
      
      const cp1x = x1 + pointWidth * smoothing;
      const cp2x = x2 - pointWidth * smoothing;
      
      path += ` C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`;
    }

    // Draw to bottom right and close
    path += ` L ${width - padding} ${height - padding + offset} Z`;
    return path;
  };

  return (
    <div className="bg-card/40 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative group">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-500/20 transition-colors duration-1000"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-fuchsia-500/20 transition-colors duration-1000"></div>

      <div className="p-8 relative z-10 border-b border-white/5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-fuchsia-600 p-[1px] shadow-lg">
              <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-brand-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Neural Topography</h2>
          </div>
          <p className="text-slate-400">Longitudinal sentiment & emotional affect analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl">
            <Filter className="w-4 h-4 mr-2 text-brand-400" />
            Filter
          </Button>
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl">
            <CalendarDays className="w-4 h-4 mr-2 text-brand-400" />
            6 Months
          </Button>
        </div>
      </div>

      <div className="p-8 relative z-10">
        <div className="relative w-full h-[400px] flex items-center justify-center overflow-visible">
          {/* SVG Map */}
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible drop-shadow-2xl">
            <defs>
              <linearGradient id="layer1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
              </linearGradient>
              <linearGradient id="layer2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(217, 70, 239, 0.5)" />
                <stop offset="100%" stopColor="rgba(217, 70, 239, 0)" />
              </linearGradient>
              <linearGradient id="layer3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(14, 165, 233, 0.6)" />
                <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
              </linearGradient>
            </defs>

            {/* Back Layer (Shadows/Depth) */}
            <path 
              d={generatePath(dataPoints, 40)} 
              fill="url(#layer1)" 
              className="animate-pulse" 
              style={{ animationDuration: '4s' }} 
            />
            
            {/* Middle Layer */}
            <path 
              d={generatePath(dataPoints, 20)} 
              fill="url(#layer2)" 
              className="animate-pulse" 
              style={{ animationDuration: '3s' }} 
            />
            
            {/* Front Layer (Main Data) */}
            <path 
              d={generatePath(dataPoints, 0)} 
              fill="url(#layer3)" 
              stroke="rgba(14, 165, 233, 0.8)" 
              strokeWidth="4"
              className="drop-shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all duration-1000"
            />

            {/* Nodes and Interactions */}
            {dataPoints.map((point, i) => {
              const x = padding + i * (chartWidth / (dataPoints.length - 1));
              const y = height - padding - (point.value / 100) * chartHeight;
              
              return (
                <g key={i} className="cursor-pointer outline-none" onMouseEnter={() => setHoveredNode(i)} onMouseLeave={() => setHoveredNode(null)}>
                  {/* Glowing halo when hovered */}
                  {hoveredNode === i && (
                    <circle 
                      cx={x} 
                      cy={y} 
                      r={24} 
                      fill="rgba(14, 165, 233, 0.2)" 
                      className="animate-ping" 
                    />
                  )}
                  
                  {/* Point */}
                  <circle 
                    cx={x} 
                    cy={y} 
                    r={hoveredNode === i ? 8 : 6} 
                    fill="#0ea5e9" 
                    stroke="#fff" 
                    strokeWidth="3"
                    className="transition-all duration-300 drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]"
                  />

                  {/* Vertical Guideline when hovered */}
                  {hoveredNode === i && (
                    <line 
                      x1={x} 
                      y1={y + 12} 
                      x2={x} 
                      y2={height - padding} 
                      stroke="rgba(255,255,255,0.2)" 
                      strokeWidth="1" 
                      strokeDasharray="4 4" 
                    />
                  )}

                  {/* X-axis labels */}
                  <text 
                    x={x} 
                    y={height - padding + 30} 
                    fill="rgba(255,255,255,0.5)" 
                    fontSize="12" 
                    textAnchor="middle"
                    className="font-semibold tracking-wider"
                  >
                    {point.month}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Tooltip */}
          {hoveredNode !== null && (
            <div 
              className="absolute pointer-events-none z-50 bg-slate-900/90 backdrop-blur-md border border-brand-500/50 shadow-[0_0_30px_rgba(14,165,233,0.3)] p-4 rounded-xl text-white transform -translate-x-1/2 -translate-y-full transition-all duration-200"
              style={{
                left: `calc(${(padding + hoveredNode * (chartWidth / (dataPoints.length - 1))) / width * 100}% )`,
                top: `calc(${(height - padding - (dataPoints[hoveredNode].value / 100) * chartHeight) / height * 100}% - 20px)`
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span className="font-bold text-brand-400">Score: {dataPoints[hoveredNode].value}</span>
              </div>
              <p className="text-sm font-medium">{dataPoints[hoveredNode].label}</p>
            </div>
          )}
        </div>

        {/* Legend / Metrics */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Current Trend</p>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
              <TrendingUp className="w-5 h-5" />
              +15% Improving
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Acuity Volatility</p>
            <div className="flex items-center gap-2 text-yellow-400 font-bold text-lg">
              <Activity className="w-5 h-5" />
              Moderate
            </div>
          </div>
          <div className="bg-brand-500/10 border border-brand-500/20 rounded-2xl p-4 cursor-pointer hover:bg-brand-500/20 transition-colors">
            <p className="text-xs text-brand-400 font-bold uppercase tracking-wider mb-1">AI Recommendation</p>
            <div className="font-bold text-white text-sm">
              Explore recent 'Career Milestone' in next session.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
