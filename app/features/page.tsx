import { Sparkles, BrainCircuit, Video, Wallet, Shield, Calendar, Users, FileText, Zap, Lock, BarChart3, Clock, Database, Globe, Layers, Command } from 'lucide-react';

const UNIQUE_FEATURES = [
  "Autonomous Clinical Scribe",
  "BBS Hours Simulator & Projection",
  "Predictive Churn Radar",
  "Supervision Copilot",
  "Flash Audit Defender",
  "VisionOS-Style Floating Controls",
  "In-Session Ambient Lighting",
  "Eye-Contact Correction AI",
  "Live CPT Auto-Recoding AI",
  "Multi-Tier Staff Commission Splitting",
  "Financial Forecasting Models",
  "Biometric Zero-Trust Auto-Lock",
  "Immutable Audit Ledger"
];

const FEATURE_CATEGORIES = [
  {
    id: 'ai-clinical',
    title: 'Clinical Intelligence (AI)',
    icon: <BrainCircuit className="h-6 w-6 text-indigo-400" />,
    color: 'border-indigo-500/30 bg-indigo-500/5',
    features: [
      { name: "Autonomous Clinical Scribe", desc: "Passively transcribes sessions and formulates clinical notes in real-time." },
      { name: "Real-time Sentiment Analysis", desc: "Monitors acoustic and facial micro-expressions for immediate therapeutic insights." },
      { name: "BBS Hours Simulator & Projection", desc: "Physics-based engine projecting associate licensure trajectories and graduation dates." },
      { name: "DAP / SOAP Note Generation", desc: "Instantly converts raw session transcripts into structured, audit-ready clinical notes." },
      { name: "Treatment Plan Synthesizer", desc: "Automatically drafts comprehensive, measurable treatment goals based on intake data." },
      { name: "Risk Assessment Flagging", desc: "Real-time AI scanning for self-harm or SI terminology in session dialogue." },
      { name: "Clinical Modality Suggester (CBT, DBT)", desc: "Recommends evidence-based interventions mapped to client symptom clusters." },
      { name: "Diagnostic Code (ICD-10) Recommendations", desc: "Suggests the most accurate billable diagnostic codes based on clinical narratives." },
      { name: "Client Progress Trajectory Mapping", desc: "Visualizes client improvement over time across standardized assessment metrics." },
      { name: "Therapeutic Alliance Scoring", desc: "Measures the strength of the therapeutic bond based on language mirroring and tone." },
      { name: "Automated Session Summaries", desc: "Generates concise, patient-facing summaries of what was discussed in the session." },
      { name: "Supervision Copilot", desc: "Pre-compiles agendas for clinical supervisors by flagging high-acuity cases automatically." },
      { name: "Intervention Effectiveness Tracking", desc: "Measures which therapeutic techniques correlate with the highest client retention." },
      { name: "Predictive Churn Radar", desc: "Flags clients at high risk of dropping out before they actually cancel." },
      { name: "Burnout Detection Analytics", desc: "Monitors staff caseloads and acuity to predict and prevent associate burnout." },
      { name: "Flash Audit Defender", desc: "Simulates an insurance audit in 10 seconds, proving 100% compliance cryptographically." },
      { name: "Automated Psychoeducation Handouts", desc: "Generates custom PDF handouts for clients based on the specific session topic." },
      { name: "Client Homework Generation", desc: "Creates actionable between-session homework assignments tailored to the client." },
      { name: "Crisis Protocol Activation", desc: "One-click deployment of emergency resources, safety plans, and local hotline numbers." },
      { name: "Multi-lingual Translation Models", desc: "Real-time, HIPAA-compliant translation of clinical notes and client secure messages." }
    ]
  },
  {
    id: 'telehealth',
    title: 'Cinematic Telehealth',
    icon: <Video className="h-6 w-6 text-cyan-400" />,
    color: 'border-cyan-500/30 bg-cyan-500/5',
    features: [
      { name: "VisionOS-Style Floating Controls", desc: "A gorgeous, frosted-glass UI that floats above the video feed for zero distraction." },
      { name: "Dynamic Audio Waveforms", desc: "Visualizes client and therapist speech patterns beautifully in real-time." },
      { name: "4K Ultra-Low Latency Video", desc: "Crystal clear, stutter-free WebRTC connections powered by decentralized edge nodes." },
      { name: "End-to-End Encryption (E2EE)", desc: "Military-grade encryption ensuring absolute privacy for sensitive clinical sessions." },
      { name: "Picture-in-Picture Mode", desc: "Keep an eye on the client while simultaneously viewing their chart in another tab." },
      { name: "One-Click Secure Guest Links", desc: "Frictionless entry for couples or family members without requiring app downloads." },
      { name: "In-Session Ambient Lighting", desc: "The UI dynamically adjusts its color grading to match the client's lighting environment." },
      { name: "Live Captions & Subtitles", desc: "Accessibility-first real-time transcription displayed directly on the video feed." },
      { name: "Interactive Virtual Whiteboard", desc: "Collaborate visually on concepts like the Cognitive Triangle or genograms live." },
      { name: "Secure File Drop during calls", desc: "Drag and drop homework or worksheets directly into the video call interface." },
      { name: "Bandwidth Degradation Smoothing", desc: "AI instantly upscales degraded video feeds during poor internet connections." },
      { name: "Screen Sharing with Privacy Mask", desc: "Automatically hides sensitive PHI notifications when sharing your screen." },
      { name: "Multi-Participant Group Therapy", desc: "Host up to 50 concurrent participants in a beautifully tiled gallery view." },
      { name: "Waiting Room Management", desc: "See exactly who is waiting, how long they've been there, and send them custom messages." },
      { name: "Custom Waiting Room Media", desc: "Play calming, brand-specific videos or music while clients wait for their session." },
      { name: "Post-Session Client Ratings", desc: "Automatically prompt clients to rate connection quality and session satisfaction." },
      { name: "Hardware Acceleration Support", desc: "Offloads processing to the GPU to save battery life during back-to-back sessions." },
      { name: "Background Blur & Replacement", desc: "Maintain professional boundaries by obscuring your home office environment." },
      { name: "Eye-Contact Correction AI", desc: "Subtly aligns your gaze to the camera lens, creating deeper therapeutic presence." },
      { name: "Session Recording (Consented & Vaulted)", desc: "Securely record sessions with explicit digital consent for supervision purposes." }
    ]
  },
  {
    id: 'revenue',
    title: 'Revenue Cycle & Payroll',
    icon: <Wallet className="h-6 w-6 text-emerald-400" />,
    color: 'border-emerald-500/30 bg-emerald-500/5',
    features: [
      { name: "Live CPT Auto-Recoding AI", desc: "Automatically downgrades CPT codes based on actual session length to prevent audit fraud." },
      { name: "Clearinghouse Integration (EDI 837/835)", desc: "Direct, seamless connections to major insurers for instant claim submission." },
      { name: "Real-Time Eligibility Verification", desc: "Checks client insurance benefits instantly before the first session begins." },
      { name: "Dynamic W-2 / 1099 Payroll Routing", desc: "Automatically splits revenue and calculates payroll for mixed staff classifications." },
      { name: "Associate Profitability Tracking", desc: "Measures the exact ROI and net revenue generated by each pre-licensed clinician." },
      { name: "Automated Superbill Generation", desc: "Sends pixel-perfect superbills to out-of-network clients automatically on the 1st of the month." },
      { name: "Stripe Premium Integration", desc: "Accept all major credit cards, Apple Pay, and Google Pay with vaulted security." },
      { name: "Failed Payment Smart-Retries", desc: "Machine learning algorithms retry failed cards at optimal times to recover revenue." },
      { name: "Denial Management & Auto-Appeals", desc: "AI drafts and submits appeal letters the moment a claim is denied by an insurer." },
      { name: "Sliding Scale Automation", desc: "Manage custom fee schedules for equitable access without administrative headaches." },
      { name: "Credit Card Vaulting (PCI-DSS)", desc: "Securely store payment methods for frictionless post-session charging." },
      { name: "Tax Deduction Tracking", desc: "Categorize business expenses directly within the platform for tax season readiness." },
      { name: "Multi-Tier Staff Commission Splitting", desc: "Handle complex compensation models (e.g., 60/40 splits that bump to 70/30 after 20 hours)." },
      { name: "Expense Categorization Engine", desc: "Connects to your bank account to auto-categorize practice expenses using AI." },
      { name: "Financial Forecasting Models", desc: "Projects future revenue based on current caseloads, churn rates, and historical data." },
      { name: "Accounts Receivable Aging AI", desc: "Prioritizes collection efforts on the accounts most likely to be successfully recovered." },
      { name: "Copay & Deductible Calculators", desc: "Calculates exactly what a client owes at the time of service based on live eligibility." },
      { name: "Automated Invoice Reminders", desc: "Polite, customizable email and SMS reminders sent for unpaid balances." },
      { name: "End-of-Year Tax Summaries", desc: "One-click generation of 1099s and revenue reports for your CPA." },
      { name: "Instant Payout Capabilities", desc: "Bypass the 3-day holding period and route funds to your bank account instantly." }
    ]
  },
  {
    id: 'practice',
    title: 'Practice Management',
    icon: <Command className="h-6 w-6 text-purple-400" />,
    color: 'border-purple-500/30 bg-purple-500/5',
    features: [
      { name: "Global Command Palette (Cmd+K)", desc: "Navigate anywhere, create notes, or charge clients instantly without using your mouse." },
      { name: "Smart-Grid Calendar System", desc: "A fluid, color-coded scheduling interface that visually prevents double-booking." },
      { name: "Two-Way Outlook/Google Sync", desc: "Seamlessly mirrors your private events without exposing PHI to external calendars." },
      { name: "Automated Waitlist Management", desc: "Automatically messages the next client in line when a prime slot opens up." },
      { name: "Secure Client Portal", desc: "A beautiful, dedicated space for clients to view appointments, bills, and documents." },
      { name: "Digital Intake & E-Signatures", desc: "Send Good Faith Estimates and consent forms for legally binding digital signature." },
      { name: "Automated SMS/Email Reminders", desc: "Drastically reduce no-shows with customizable, multi-channel appointment alerts." },
      { name: "Multi-Location Management", desc: "Manage separate physical offices, tele-health instances, and unique tax IDs in one dashboard." },
      { name: "Associate Caseload Balancing", desc: "Distribute incoming referrals evenly across your staff based on current capacity." },
      { name: "Custom Forms Builder", desc: "Drag-and-drop builder to create unique intake questionnaires and assessments." },
      { name: "Document Vault & Sharing", desc: "Securely store and share large files, IDs, and external medical records." },
      { name: "Internal Team Messaging", desc: "A secure, HIPAA-compliant chat system for staff to collaborate on cases." },
      { name: "Task & Workflow Automation", desc: "Create 'If This Then That' rules (e.g., If intake complete, then schedule evaluation)." },
      { name: "Referral Tracking & ROI", desc: "Track which psychiatrists or marketing channels send you the highest-value clients." },
      { name: "Client Demographics Analytics", desc: "Visualize the makeup of your practice to ensure equitable and diverse care." },
      { name: "Customizable Treatment Templates", desc: "Save your most frequently used interventions as rapid-insert text snippets." },
      { name: "Insurance Roster Management", desc: "Keep track of which clinicians are credentialed with which specific insurance panels." },
      { name: "Marketing Source Tracking", desc: "Embed tracking pixels to determine the exact ROI of your Psychology Today profile." },
      { name: "Inventory Management (Assessments)", desc: "Track physical inventory of specialized testing kits or workbooks in your clinic." },
      { name: "Practice KPI Dashboard", desc: "A singular, beautiful dashboard showing the absolute health of your entire business." }
    ]
  },
  {
    id: 'security',
    title: 'Security & Platform OS',
    icon: <Shield className="h-6 w-6 text-rose-400" />,
    color: 'border-rose-500/30 bg-rose-500/5',
    features: [
      { name: "HIPAA/HITECH Certified Enclave", desc: "Built from the ground up to exceed all federal privacy and security regulations." },
      { name: "SOC 2 Type II Architecture", desc: "Enterprise-grade security controls verified by independent, third-party auditors." },
      { name: "Immutable Audit Ledger", desc: "Every action, view, and edit is permanently recorded and cryptographically sealed." },
      { name: "Biometric Zero-Trust Auto-Lock", desc: "The platform locks instantly when you walk away, requiring FaceID or fingerprint to resume." },
      { name: "Global PHI Privacy Toggle", desc: "A single panic button that obfuscates all names and sensitive data when sharing a screen." },
      { name: "Role-Based Access Control (RBAC)", desc: "Granular permissions ensuring billing staff can't read therapy notes, and associates can't see payroll." },
      { name: "Data Export & Portability", desc: "You own your data. Export your entire practice history in standardized formats at any time." },
      { name: "99.99% Uptime SLA", desc: "High-availability architecture ensuring you are never locked out of your charts." },
      { name: "Multi-Factor Authentication (MFA)", desc: "Enforce SMS or Authenticator App requirements for all staff members." },
      { name: "Device Trust Fingerprinting", desc: "Alerts the admin if a login is attempted from an unrecognized laptop or location." },
      { name: "Automated Cloud Backups (Hourly)", desc: "Continuous replication across multiple geographic zones to prevent catastrophic data loss." },
      { name: "Disaster Recovery Protocols", desc: "Guaranteed recovery time objectives in the event of widespread infrastructural failures." },
      { name: "BBS/State Board Attestation Logs", desc: "Maintains specific retention policies for state board auditing purposes." },
      { name: "Sub-Millisecond UI Responses", desc: "Built with Next.js and React Server Components for an incredibly fast, native-feeling experience." },
      { name: "Glassmorphic Design System", desc: "A stunning, modern interface that makes working in the software a genuine pleasure." },
      { name: "Offline Mode Synchronization", desc: "Continue taking session notes even if your internet drops; syncs automatically when reconnected." },
      { name: "API Webhook Access", desc: "Connect Theraflow securely to external enterprise systems via structured webhooks." },
      { name: "Custom Domain Masking", desc: "Host your client portal on your own clinic's URL (e.g., portal.yourclinic.com)." },
      { name: "Dark/Light/System Theme Modes", desc: "Beautifully crafted themes that respect your operating system's color preferences." },
      { name: "Dedicated Account Management", desc: "White-glove, US-based support team dedicated to your practice's success." }
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
            A masterclass in software engineering. We didn't just build an EHR; we built an Enterprise-Grade OS to completely automate the modern mental health practice.
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
                {category.features.map((featureObj, idx) => {
                  const isUnique = UNIQUE_FEATURES.includes(featureObj.name);
                  
                  return (
                    <div 
                      key={idx} 
                      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 p-5 flex flex-col justify-between ${
                        isUnique 
                          ? 'border-brand-500/50 bg-gradient-to-br from-brand-900/20 to-slate-900 shadow-[0_0_15px_rgba(14,165,233,0.15)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]' 
                          : 'border-slate-800 bg-slate-900/50 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800/80 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]'
                      }`}
                    >
                      {/* Shimmer Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                      
                      {isUnique && (
                        <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-brand-500/20 blur-xl pointer-events-none" />
                      )}

                      <div className="flex items-start gap-3 relative z-10 mb-3">
                        <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-mono transition-colors ${
                          isUnique 
                            ? 'bg-brand-500/20 border-brand-400/50 text-brand-300 group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500' 
                            : 'bg-slate-800 border-slate-700 text-slate-400 group-hover:text-white'
                        }`}>
                          {isUnique ? <Sparkles className="h-3 w-3" /> : (idx + 1).toString().padStart(2, '0')}
                        </div>
                        <div>
                          <p className={`text-sm font-bold transition-colors leading-tight ${isUnique ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                            {featureObj.name}
                          </p>
                          {isUnique && (
                            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-400 mt-1">Exclusive</p>
                          )}
                        </div>
                      </div>
                      
                      <p className={`text-xs leading-relaxed relative z-10 ${isUnique ? 'text-slate-300' : 'text-slate-400'}`}>
                        {featureObj.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mx-auto max-w-4xl px-4 pb-24 text-center mt-12">
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
