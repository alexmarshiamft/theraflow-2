'use client';

import React from 'react';

interface EnergyOrbProps {
  riskLevel: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
}

export function EnergyOrb({ riskLevel, size = 'md' }: EnergyOrbProps) {
  // Determine color based on risk level
  let colorClass = 'from-emerald-400 to-emerald-600 shadow-emerald-500/50';
  let glowClass = 'bg-emerald-500/20';
  let pulseSpeed = 'animate-[pulse_4s_ease-in-out_infinite]';

  if (riskLevel >= 80) {
    colorClass = 'from-rose-400 to-rose-600 shadow-rose-500/50';
    glowClass = 'bg-rose-500/20';
    pulseSpeed = 'animate-[pulse_1s_ease-in-out_infinite]';
  } else if (riskLevel >= 50) {
    colorClass = 'from-amber-400 to-amber-600 shadow-amber-500/50';
    glowClass = 'bg-amber-500/20';
    pulseSpeed = 'animate-[pulse_2s_ease-in-out_infinite]';
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const glowSizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-36 h-36'
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer ambient glow */}
      <div 
        className={`absolute rounded-full blur-xl ${glowSizeClasses[size]} ${glowClass} ${pulseSpeed}`} 
      />
      
      {/* Core orb */}
      <div 
        className={`relative rounded-full ${sizeClasses[size]} bg-gradient-to-br ${colorClass} shadow-lg flex items-center justify-center overflow-hidden`}
      >
        {/* Inner highlight for 3D effect */}
        <div className="absolute inset-0 rounded-full border-t border-white/40 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)]"></div>
        <div className="absolute top-1 left-2 w-1/3 h-1/4 bg-white/30 rounded-full blur-[2px] transform -rotate-45"></div>
      </div>
    </div>
  );
}
