import { Sparkles, BrainCircuit, Video, Wallet, Shield, Calendar, Users, FileText, Zap, Lock, BarChart3, Clock, Database, Globe, Layers, Command } from 'lucide-react';

const FEATURE_CATEGORIES = [
  {
    id: 'ai-clinical',
    title: 'Clinical Intelligence (AI)',
    icon: <BrainCircuit className="h-6 w-6 text-indigo-400" />,
    color: 'border-indigo-500/30 bg-indigo-500/5',
    features: [
      "Autonomous Clinical Scribe",
      "Real-time Sentiment Analysis",
      "BBS Hours Simulator & Projection",
      "DAP / SOAP Note Generation",
      "Treatment Plan Synthesizer",
      "Risk Assessment Flagging",
      "Clinical Modality Suggester (CBT, DBT)",
      "Diagnostic Code (ICD-10) Recommendations",
      "Client Progress Trajectory Mapping",
      "Therapeutic Alliance Scoring",
      "Automated Session Summaries",
      "Supervision Prep & Prompting",
      "Intervention Effectiveness Tracking",
      "No-Show Probability Forecasting",
      "Burnout Detection Analytics",
      "Clinical Documentation Auditing",
      "Automated Psychoeducation Handouts",
      "Client Homework Generation",
      "Crisis Protocol Activation",
      "Multi-lingual Translation Models"
    ]
  },
  {
    id: 'telehealth',
    title: 'Cinematic Telehealth',
    icon: <Video className="h-6 w-6 text-cyan-400" />,
    color: 'border-cyan-500/30 bg-cyan-500/5',
    features: [
      "VisionOS-Style Floating Controls",
      "Dynamic Audio Waveforms",
      "4K Ultra-Low Latency Video",
      "End-to-End Encryption (E2EE)",
      "Picture-in-Picture Mode",
      "One-Click Secure Guest Links",
      "In-Session Ambient Lighting",
      "Live Captions & Subtitles",
      "Interactive Virtual Whiteboard",
      "Secure File Drop during calls",
      "Bandwidth Degradation Smoothing",
      "Screen Sharing with Privacy Mask",
      "Multi-Participant Group Therapy",
      "Waiting Room Management",
      "Custom Waiting Room Media",
      "Post-Session Client Ratings",
      "Hardware Acceleration Support",
      "Background Blur & Replacement",
      "Eye-Contact Correction AI",
      "Session Recording (Consented & Vaulted)"
    ]
  },
  {
    id: 'revenue',
    title: 'Revenue Cycle & Payroll',
    icon: <Wallet className="h-6 w-6 text-emerald-400" />,
    color: 'border-emerald-500/30 bg-emerald-500/5',
    features: [
      "Zero-Touch Auto-Billing",
      "Clearinghouse Integration (EDI 837/835)",
      "Real-Time Eligibility Verification",
      "Dynamic W-2 / 1099 Payroll Routing",
      "Associate Profitability Tracking",
      "Automated Superbill Generation",
      "Stripe Premium Integration",
      "Failed Payment Smart-Retries",
      "Denial Management & Auto-Appeals",
      "Sliding Scale Automation",
      "Credit Card Vaulting (PCI-DSS)",
      "Tax Deduction Tracking",
      "Multi-Tier Staff Commission Splitting",
      "Expense Categorization Engine",
      "Financial Forecasting Models",
      "Accounts Receivable Aging AI",
      "Copay & Deductible Calculators",
      "Automated Invoice Reminders",
      "End-of-Year Tax Summaries",
      "Instant Payout Capabilities"
    ]
  },
  {
    id: 'practice',
    title: 'Practice Management',
    icon: <Command className="h-6 w-6 text-purple-400" />,
    color: 'border-purple-500/30 bg-purple-500/5',
    features: [
      "Global Command Palette (Cmd+K)",
      "Smart-Grid Calendar System",
      "Two-Way Outlook/Google Sync",
      "Automated Waitlist Management",
      "Secure Client Portal",
      "Digital Intake & E-Signatures",
      "Automated SMS/Email Reminders",
      "Multi-Location Management",
      "Associate Caseload Balancing",
      "Custom Forms Builder",
      "Document Vault & Sharing",
      "Internal Team Messaging",
      "Task & Workflow Automation",
      "Referral Tracking & ROI",
      "Client Demographics Analytics",
      "Customizable Treatment Templates",
      "Insurance Roster Management",
      "Marketing Source Tracking",
      "Inventory Management (Assessments)",
      "Practice KPI Dashboard"
    ]
  },
  {
    id: 'security',
    title: 'Security & Platform OS',
    icon: <Shield className="h-6 w-6 text-rose-400" />,
    color: 'border-rose-500/30 bg-rose-500/5',
    features: [
      "HIPAA/HITECH Certified Enclave",
      "SOC 2 Type II Architecture",
      "Immutable Audit Ledger",
      "Biometric Zero-Trust Auto-Lock",
      "Global PHI Privacy Toggle",
      "Role-Based Access Control (RBAC)",
      "Data Export & Portability",
      "99.99% Uptime SLA",
      "Multi-Factor Authentication (MFA)",
      "Device Trust Fingerprinting",
      "Automated Cloud Backups (Hourly)",
      "Disaster Recovery Protocols",
      "BBS/State Board Attestation Logs",
      "Sub-Millisecond UI Responses",
      "Glassmorphic Design System",
      "Offline Mode Synchronization",
      "API Webhook Access",
      "Custom Domain Masking",
      "Dark/Light/System Theme Modes",
      "Dedicated Account Management"
    ]
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 selection:bg-brand-500/30 text-slate-50">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-slate-800/50 bg-slate-950 pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300 backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            <span>The Ultimate Practice Operating System</span>
          </div>
          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
            100 Reasons to Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Theraflow</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            A masterclass in software engineering. We didn't just build an EHR; we built a God-Tier OS to completely automate the modern mental health practice.
          </p>
        </div>
      </div>

      {/* Bento Grid Features */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {FEATURE_CATEGORIES.map((category) => (
            <div key={category.id} className="relative">
              
              {/* Category Header */}
              <div className="mb-8 flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${category.color} backdrop-blur-md`}>
                  {category.icon}
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white">{category.title}</h2>
                <div className="ml-4 h-px flex-1 bg-gradient-to-r from-slate-800 to-transparent"></div>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {category.features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800/80 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]"
                  >
                    {/* Shimmer Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                    
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                        {(idx + 1).toString().padStart(2, '0')}
                      </div>
                      <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                        {feature}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mx-auto max-w-4xl px-4 pb-24 text-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-12 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent"></div>
          <h2 className="relative z-10 text-3xl font-bold text-white mb-4">Ready to upgrade your practice?</h2>
          <p className="relative z-10 text-slate-400 mb-8 max-w-xl mx-auto">
            Experience the only software an agency needs to run with absolute precision, zero admin waste, and a flawless clinical experience.
          </p>
          <button className="relative z-10 rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-950 transition-transform hover:scale-105 hover:bg-slate-100 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Deploy Theraflow Today
          </button>
        </div>
      </div>
      
    </div>
  );
}
