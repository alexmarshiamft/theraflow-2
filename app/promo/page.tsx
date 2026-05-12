'use client';

import { useState, useEffect } from 'react';

const sequence = [
  // Intro
  { type: 'title', title: 'THERAFLOW', subtitle: 'The Enterprise-Grade Practice OS', duration: 4000 },
  
  // Scene 1: Claim Scrubber
  { type: 'title', title: 'Automated Revenue Cycle', subtitle: 'AI Claim Scrubbing & Correction', duration: 2500 },
  { type: 'iframe', src: '/claims/scrubber', duration: 6000 },
  
  // Scene 2: Liability AI
  { type: 'title', title: 'Real-Time Liability Protection', subtitle: 'Active Bias Detection & Reframing', duration: 2500 },
  { type: 'iframe', src: '/ehr/notes', duration: 6000 },

  // Scene 3: Analytics / CFO
  { type: 'title', title: 'Predictive Intelligence', subtitle: 'Fractional CFO & Attendance Analytics', duration: 2500 },
  { type: 'iframe', src: '/analytics', duration: 6000 },

  // Scene 4: Calendar
  { type: 'title', title: 'Smart Grid Calendar', subtitle: 'AI Safe-Slot Overlays', duration: 2500 },
  { type: 'iframe', src: '/calendar', duration: 6000 },

  // Scene 5: Telehealth
  { type: 'title', title: 'Cinematic Telehealth', subtitle: 'Real-Time Transcription & Tools', duration: 2500 },
  { type: 'iframe', src: '/telehealth', duration: 6000 },

  // Scene 6: Credential Scanner
  { type: 'title', title: 'Federal Compliance', subtitle: 'Live NPI & Breach Database Scanning', duration: 2500 },
  { type: 'iframe', src: '/intelligence/credentials', duration: 6000 },

  // Scene 7: Commissions
  { type: 'title', title: 'Staff Payroll', subtitle: 'Multi-Tier Commission Simulator', duration: 2500 },
  { type: 'iframe', src: '/payroll/commission', duration: 6000 },

  // Scene 8: Client Roadmap
  { type: 'title', title: 'Interactive Client Portal', subtitle: 'Gamified Visual Treatment Roadmaps', duration: 2500 },
  { type: 'iframe', src: '/portal/roadmap', duration: 6000 },

  // Scene 9: Supervision
  { type: 'title', title: 'Clinical Directors', subtitle: 'AI-Generated Supervision Copilot', duration: 2500 },
  { type: 'iframe', src: '/supervision', duration: 6000 },

  // Outro
  { type: 'title', title: 'Ready for the Future?', subtitle: 'Theraflow Operating System', duration: 5000 },
];

export default function PromoReelPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true); // true = visible, false = black

  useEffect(() => {
    if (currentIndex >= sequence.length) return;

    const currentStep = sequence[currentIndex];
    
    // Fade in
    setFade(true);

    // Wait duration, then start fade out
    const timeout = setTimeout(() => {
      setFade(false);
      
      // Wait for fade out transition (1s), then go to next step
      setTimeout(() => {
        setCurrentIndex(i => i + 1);
      }, 1000);
      
    }, currentStep.duration);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  if (currentIndex >= sequence.length) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white tracking-widest uppercase">FIN</h1>
    </div>;
  }

  const currentStep = sequence[currentIndex];

  return (
    <div className="fixed inset-0 bg-black z-[9999] overflow-hidden">
      
      {/* Dynamic Render based on type */}
      <div className={`w-full h-full transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        
        {currentStep.type === 'title' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 text-center px-4 animate-in slide-in-from-bottom-8 duration-1000 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
              {currentStep.title}
            </h1>
            <p className="text-xl md:text-3xl font-medium text-brand-400 tracking-widest uppercase animate-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-backwards">
              {currentStep.subtitle}
            </p>
          </div>
        )}

        {currentStep.type === 'iframe' && (
          <iframe 
            src={currentStep.src} 
            className="w-full h-full border-none pointer-events-none" // Pointer events none so it acts purely as a visual reel
          />
        )}
      </div>

    </div>
  );
}
