'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, CheckCircle2, Shield, Zap, Brain, 
  CreditCard, FileText, Activity, Users, Lock,
  LineChart, Wallet, Calendar, FileSignature, Cloud,
  Building, Globe, Briefcase, Heart, Stethoscope
} from 'lucide-react';

const categories = [
  {
    name: "AI & Intelligence",
    icon: <Brain className="h-6 w-6 text-indigo-400" />,
    features: [
      "40-Point AI Claim Audit Engine",
      "Real-time ICD-10 Semantic Matching",
      "Automated CPT Code Validation",
      "AI CPA S-Corp Strategy Simulator",
      "Predictive Tax Liability Forecasting",
      "Automated Audit Risk Scoring",
      "Natural Language Note Generation",
      "AI-Assisted Treatment Plan Authoring",
      "Session Sentiment Analysis",
      "Automated Prior Authorization Prediction"
    ]
  },
  {
    name: "Financial Orchestration",
    icon: <LineChart className="h-6 w-6 text-emerald-400" />,
    features: [
      "Zero-Touch Monthly Payroll Settlement",
      "Automated 50/50 Fee Splitting",
      "Real-time Supervisor Overhead Calculation",
      "Instant ACH Direct Deposit Dispatch",
      "Automated W-2 Salary Generation",
      "K-1 Shareholder Distribution Engine",
      "Treasury APY Yield Maximization",
      "Dynamic Profit Margin Analysis",
      "Automated Charitable Giving Integration",
      "Real-time Expense Categorization"
    ]
  },
  {
    name: "Billing & Claims",
    icon: <CreditCard className="h-6 w-6 text-cyan-400" />,
    features: [
      "Batch 837P EDI Claim Submission",
      "Real-time 277CA Claim Status Tracking",
      "Automated 835 ERA Reconciliation",
      "Instant Denial Code Translation (CARC/RARC)",
      "One-Click Claim Appeal Generation",
      "Multi-Payer Contract Management",
      "Real-time Patient Eligibility Verification",
      "Co-pay and Co-insurance Auto-Calculation",
      "Automated Superbill Generation",
      "Stripe Integration for Patient Payments"
    ]
  },
  {
    name: "EHR & Clinical Core",
    icon: <FileText className="h-6 w-6 text-blue-400" />,
    features: [
      "Wiley Treatment Planner Integration",
      "Drag-and-Drop Progress Note Templates",
      "Automated Wiley-to-Note Translation",
      "DSM-5 Diagnostic Crosswalking",
      "Multi-Signer Supervisor Approval Workflows",
      "Built-in PHQ-9 & GAD-7 Assessments",
      "Longitudinal Patient Progress Tracking",
      "Customizable Intake Questionnaires",
      "Secure Clinical Document Vault",
      "Automated Session Timer Tracking"
    ]
  },
  {
    name: "Secure Client Portal",
    icon: <Lock className="h-6 w-6 text-violet-400" />,
    features: [
      "Distraction-Free Patient Interface",
      "6-Digit Cryptographic Access Codes",
      "Legally-Binding E-Signature Workflows",
      "SHA-256 Vaulted Document Storage",
      "Real-time Document Completion Status",
      "Automated Intake Packet Dispatch",
      "Secure Patient Messaging (HIPAA-Compliant)",
      "Self-Service Appointment Cancellation",
      "Patient Balance & Invoice Viewing",
      "Upload Portal for External Records"
    ]
  },
  {
    name: "Compliance & Security",
    icon: <Shield className="h-6 w-6 text-rose-400" />,
    features: [
      "256-bit AES Data Encryption",
      "Immutable Audit Ledger Logging",
      "BAA Generation for 3rd Party Apps",
      "Automated HIPAA Compliance Checks",
      "Granular Role-Based Access Control (RBAC)",
      "Multi-Factor Authentication (MFA)",
      "Automated Session Timeout Locks",
      "PHI Redaction in AI Prompts",
      "Daily Encrypted Off-Site Backups",
      "Disaster Recovery & Business Continuity"
    ]
  },
  {
    name: "Practice Operations",
    icon: <Building className="h-6 w-6 text-amber-400" />,
    features: [
      "Multi-Location Practice Management",
      "Associate Productivity Tracking",
      "Client Retention Analytics",
      "Referral Source ROI Tracking",
      "Automated Credentialing Alerts",
      "State Licensure Expiration Tracking",
      "CEU (Continuing Education) Logging",
      "Integrated Task & Todo Workflows",
      "Custom Practice Branding Options",
      "Real-time Practice Vitality Dashboard"
    ]
  },
  {
    name: "Scheduling & Telehealth",
    icon: <Calendar className="h-6 w-6 text-sky-400" />,
    features: [
      "Smart-Grid Appointment Calendar",
      "Automated SMS/Email Reminders",
      "Two-Way Google/Outlook Sync",
      "Integrated 4K Telehealth Video",
      "Virtual Waiting Room Management",
      "Telehealth Screen Sharing",
      "Automated No-Show Fee Enforcement",
      "Recurring Appointment Rules",
      "Color-Coded Service Type Tags",
      "Waitlist Auto-Fill Management"
    ]
  },
  {
    name: "Banking & Treasury",
    icon: <Wallet className="h-6 w-6 text-emerald-500" />,
    features: [
      "FDIC-Insured Practice Checking",
      "High-Yield Treasury Accounts (Up to 5%)",
      "Instant Virtual Card Issuance",
      "Real-time Transaction Notifications",
      "Multi-Card Expense Limits",
      "Automated Receipt Matching",
      "Cash Flow Run-way Projection",
      "Integrated Vendor ACH Payments",
      "Tax Withholding Segregation",
      "Seamless Plaid Account Linking"
    ]
  },
  {
    name: "Developer & Integration",
    icon: <Cloud className="h-6 w-6 text-slate-400" />,
    features: [
      "GraphQL API for Custom Workflows",
      "Webhooks for Real-time Events",
      "Zapier & Make.com Integrations",
      "QuickBooks Online Two-Way Sync",
      "Gusto Payroll Integration",
      "Slack/Teams Notification Routing",
      "Custom Data Export (CSV/JSON)",
      "OpenAPI 3.0 Documentation",
      "Rate-Limit Protection",
      "SSO (Single Sign-On) via Okta/Google"
    ]
  }
];

export default function FeaturesPage() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  // Flatten for total count display
  const totalFeatures = categories.reduce((acc, cat) => acc + cat.features.length, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0A0A0A] to-[#0A0A0A]"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] mix-blend-screen opacity-50 animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">
        <div className="flex justify-between items-center mb-24">
          <Link href="/platform" className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium tracking-wide">Back to Platform</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">All Systems Operational</span>
          </div>
        </div>

        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <Zap className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-medium tracking-wide text-slate-300">Unprecedented Scale</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
              {totalFeatures} Reasons to 
            </span>
            <br />
            Choose Theraflow.
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed font-light">
            We didn't just build an EHR. We built a complete operating system for modern mental health practices. From advanced AI diagnostics to cryptographic payroll routing, explore the full depth of our capabilities.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => setHoveredCategory(idx)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`group relative p-8 rounded-3xl border transition-all duration-500 ease-out
                ${hoveredCategory === idx 
                  ? 'bg-white/[0.03] border-white/20 shadow-2xl shadow-indigo-500/10 scale-[1.02]' 
                  : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                }
                backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4`}
              style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
            >
              {/* Card Header */}
              <div className="flex items-center space-x-4 mb-8">
                <div className={`p-3 rounded-2xl transition-colors duration-500
                  ${hoveredCategory === idx ? 'bg-white/10' : 'bg-white/5'}
                `}>
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-100">
                  {category.name}
                </h2>
              </div>

              {/* Feature List */}
              <ul className="space-y-4">
                {category.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start space-x-3 group/item">
                    <CheckCircle2 className={`h-5 w-5 shrink-0 transition-colors duration-300 mt-0.5
                      ${hoveredCategory === idx ? 'text-indigo-400/80' : 'text-slate-600'}
                      group-hover/item:text-indigo-400
                    `} />
                    <span className={`text-sm leading-relaxed transition-colors duration-300
                      ${hoveredCategory === idx ? 'text-slate-300' : 'text-slate-500'}
                      group-hover/item:text-slate-200
                    `}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              {/* Subtle gradient overlay on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none
                ${hoveredCategory === idx ? 'opacity-100' : ''}
              `} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="relative z-10 border-t border-white/10 bg-white/[0.02] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Ready to upgrade your practice?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10">Stop paying for 10 different software subscriptions. Consolidate your EHR, billing, banking, and payroll into one unified platform.</p>
          <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium rounded-full bg-white text-black hover:bg-slate-200 transition-colors">
            Deploy Theraflow Today
          </Link>
        </div>
      </div>
    </div>
  );
}
