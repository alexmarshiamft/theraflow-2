import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  CreditCard,
  FileText,
  Heart,
  Lock,
  Shield,
  Star,
  TrendingUp,
  Users,
  Video,
  Zap,
  Layers,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { value: '2,400+', label: 'Mental health practices' },
  { value: '$4.2B', label: 'Processed annually' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '< 2 min', label: 'Avg support response' },
];

const complianceBadges = [
  { icon: Shield, label: 'HIPAA Compliant' },
  { icon: Lock, label: 'SOC 2 Type II' },
  { icon: CheckCircle2, label: 'HITECH Certified' },
  { icon: Zap, label: '256-bit Encryption' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-brand-500/30">
      {/* Cinematic Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] h-[400px] w-[400px] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-teal-400 shadow-lg shadow-brand-500/20">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Theraflow</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-white/60 transition-colors hover:text-white">Intelligence</a>
            <a href="#platform" className="text-sm font-medium text-white/60 transition-colors hover:text-white">Platform</a>
            <a href="#compliance" className="text-sm font-medium text-white/60 transition-colors hover:text-white">Security</a>
            <a href="#pricing" className="text-sm font-medium text-white/60 transition-colors hover:text-white">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="hidden text-sm font-medium text-white/70 transition-colors hover:text-white sm:block"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-all hover:scale-105 hover:bg-white/90"
            >
              Get Started
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Pill */}
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500"></span>
                </span>
                Introducing Theraflow Intelligence
              </div>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              The Next Generation of <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-brand-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                Clinical Operations
              </span>
            </h1>
            
            <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60 leading-relaxed sm:text-xl">
              Theraflow unifies AI-driven clinical notes, cinematic telehealth, predictive patient churn tracking, and automated practice banking into one beautiful, HIPAA-compliant platform.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/auth/signup"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(14,165,233,0.3)] transition-all hover:scale-105 hover:bg-brand-500 sm:w-auto"
              >
                Start Free Trial <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/ehr/notes"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 sm:w-auto"
              >
                View Live Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* God-Tier Bento Box */}
      <section id="features" className="relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Intelligence built into every interaction
            </h2>
            <p className="mt-4 text-white/60">Experience the world's most advanced clinical workspace.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Bento Item 1: AI Scribe (Span 2) */}
            <Link href="/ehr/notes" className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card/40 p-8 backdrop-blur-xl transition-colors hover:bg-card/60 md:col-span-2">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/20 blur-[80px] transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-400 ring-1 ring-brand-500/30">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Autonomous Clinical Scribe</h3>
                <p className="mt-3 max-w-md text-white/60 leading-relaxed">
                  Upload audio or speak directly. Our AI instantly transcribes and synthesizes HIPAA-compliant SOAP, DAP, and BIRP notes in seconds.
                </p>
                <div className="mt-auto pt-8 flex items-center gap-2 text-sm font-semibold text-brand-400 opacity-0 transition-opacity group-hover:opacity-100">
                  Try the Demo <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>

            {/* Bento Item 2: Flash Audit Simulator (Span 1) */}
            <Link href="/compliance" className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card/40 p-8 backdrop-blur-xl transition-colors hover:bg-card/60">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px]" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Flash Audit Defender</h3>
                <p className="mt-3 text-white/60 leading-relaxed">
                  Instantly compile cryptographically verified proof of 1:10 supervision ratios and CPT compliance to instantly defeat insurance audits.
                </p>
                <div className="mt-auto pt-8 flex items-center gap-2 text-sm font-semibold text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
                  Run Simulator <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>

            {/* Bento Item 3: Predictive Churn (Span 1) */}
            <Link href="/intelligence/churn" className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card/40 p-8 backdrop-blur-xl transition-colors hover:bg-card/60">
              <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-amber-500/10 blur-[80px]" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Predictive Churn Radar</h3>
                <p className="mt-3 text-white/60 leading-relaxed">
                  Identify at-risk patients before they drop out using advanced behavioral modeling and session cadence tracking.
                </p>
                <div className="mt-auto pt-8 flex items-center gap-2 text-sm font-semibold text-amber-400 opacity-0 transition-opacity group-hover:opacity-100">
                  View Analytics <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
            
            {/* Bento Item 4: AI Timesheet Automator (Span 1) */}
            <Link href="/staff" className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card/40 p-8 backdrop-blur-xl transition-colors hover:bg-card/60">
              <div className="absolute inset-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-[80px] m-auto" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-500/30">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Live CPT Auto-Recoding</h3>
                <p className="mt-3 text-white/60 leading-relaxed">
                  Manual timesheets are dead. The AI tracks session length down to the minute and automatically downgrades a 90837 to a 90834 to prevent clawbacks.
                </p>
                <div className="mt-auto pt-8 flex items-center gap-2 text-sm font-semibold text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
                  View Logs <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>

            {/* Bento Item 5: Telehealth (Span 1) */}
            <Link href="/telehealth/demo" className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card/40 p-8 backdrop-blur-xl transition-colors hover:bg-card/60">
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-teal-500/20 blur-[80px]" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-400 ring-1 ring-teal-500/30">
                  <Video className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Cinematic Telehealth Cockpit</h3>
                <p className="mt-3 text-white/60 leading-relaxed">
                  A high-fidelity video experience complete with live vitals tracking and collaborative CBT whiteboarding.
                </p>
                <div className="mt-auto pt-8 flex items-center gap-2 text-sm font-semibold text-teal-400 opacity-0 transition-opacity group-hover:opacity-100">
                  Enter Session <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Legacy Platform Pillars */}
      <section id="platform" className="py-24 border-y border-white/5 bg-black/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The complete operational stack
            </h2>
            <p className="mt-4 text-white/60">Everything else you need to run a profitable practice.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
             <div className="rounded-2xl border border-white/5 bg-white/5 p-8 transition-colors hover:bg-white/10">
              <Building2 className="mb-5 h-8 w-8 text-white" />
              <h3 className="mb-3 text-xl font-semibold text-white">Practice Banking</h3>
              <p className="text-white/60 leading-relaxed">Dedicated business accounts, ACH transfers, and automated reconciliation built purely for behavioral health.</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-8 transition-colors hover:bg-white/10">
              <CreditCard className="mb-5 h-8 w-8 text-white" />
              <h3 className="mb-3 text-xl font-semibold text-white">Payroll Management</h3>
              <p className="text-white/60 leading-relaxed">Automate bi-weekly payroll runs, handle multi-state taxes, and seamlessly generate W-2s for your staff.</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-8 transition-colors hover:bg-white/10">
              <FileText className="mb-5 h-8 w-8 text-white" />
              <h3 className="mb-3 text-xl font-semibold text-white">Insurance Clearinghouse</h3>
              <p className="text-white/60 leading-relaxed">Submit claims, track ERAs, and automatically appeal rejections. Get paid faster with zero context switching.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-b border-white/5 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 divide-x divide-white/5 lg:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center px-4">
                <p className="text-4xl font-extrabold tracking-tight text-white">{value}</p>
                <p className="mt-2 text-sm font-medium text-white/50 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance section */}
      <section id="compliance" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-950/20 to-black/40" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-400">
                <Shield className="h-4 w-4" /> Security & Compliance
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Military-grade security. <br/> Zero compromises.
              </h2>
              <p className="mt-6 text-lg text-white/60 leading-relaxed">
                Every line of code in Theraflow was designed around HIPAA, HITECH, and SOC-2 Type II requirements.
              </p>
              <ul className="mt-10 space-y-4">
                {[
                  'End-to-end AES-256 encryption for all PHI',
                  'Comprehensive audit logs with user attribution',
                  'Role-based access control (RBAC)',
                  'Business Associate Agreement (BAA) provided',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 text-white/80">
                    <div className="rounded-full bg-teal-500/20 p-1">
                       <CheckCircle2 className="h-4 w-4 text-teal-400" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {complianceBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="rounded-3xl border border-white/5 bg-white/5 p-8 text-center backdrop-blur-xl transition-transform hover:-translate-y-1"
                >
                  <Icon className="mx-auto mb-4 h-10 w-10 text-teal-400 opacity-80" />
                  <p className="font-semibold text-white">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 relative z-10 border-t border-white/5 bg-black/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Transparent pricing. <span className="text-white/40">Infinite scale.</span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 max-w-5xl mx-auto">
            {/* Solo Tier */}
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 flex flex-col backdrop-blur-md">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white">Solo Practice</h3>
                <p className="mt-2 text-white/60">For independent therapists and solo practitioners.</p>
              </div>
              <div className="mb-8 flex items-baseline text-6xl font-extrabold tracking-tight text-white">
                $89
                <span className="ml-2 text-xl font-medium text-white/40">/mo</span>
              </div>
              <ul className="space-y-5 mb-10 flex-1">
                {[
                  '1 Licensed Provider',
                  'Unlimited active clients',
                  'Full EHR & Treatment Planning',
                  'Integrated Telehealth Cockpit',
                  'Basic AI Scribe Features',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-white/40 flex-shrink-0" />
                    <span className="text-white/80 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className="w-full inline-flex justify-center rounded-2xl bg-white/10 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-white/20"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Group Tier */}
            <div className="rounded-[2.5rem] border border-brand-500/50 bg-gradient-to-b from-brand-900/20 to-black/50 p-10 relative flex flex-col backdrop-blur-md shadow-[0_0_80px_rgba(14,165,233,0.15)]">
              <div className="absolute top-0 right-10 -translate-y-1/2">
                <span className="inline-flex rounded-full bg-brand-500 px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-brand-500/30">
                  God-Tier
                </span>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white">Enterprise Clinic</h3>
                <p className="mt-2 text-brand-200/60">Full operational supremacy for growing groups.</p>
              </div>
              <div className="mb-8 flex items-baseline text-6xl font-extrabold tracking-tight text-white">
                $199
                <span className="ml-2 text-xl font-medium text-white/40">/mo</span>
              </div>
              <ul className="space-y-5 mb-10 flex-1">
                {[
                  'Everything in Solo, plus:',
                  'Supervision Copilot & Dashboards',
                  'Flash Audit Defender Module',
                  'Live CPT Auto-Recoding AI',
                  'Predictive Churn Radar',
                  'Benefits Marketplace',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className={`h-5 w-5 flex-shrink-0 ${i === 0 ? 'text-brand-400' : 'text-brand-500'}`} />
                    <span className={i === 0 ? "font-bold text-white" : "text-white/80 font-medium"}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className="w-full inline-flex justify-center rounded-2xl bg-brand-600 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-500 shadow-lg shadow-brand-500/20"
              >
                Start Enterprise Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#030303] py-12 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-teal-500">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold tracking-tight text-white">Theraflow</span>
            </div>
            <p className="text-sm font-medium text-white/40">
              © 2026 Theraflow, Inc. · The God-Tier Platform.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-teal-500/70">
              <Shield className="h-4 w-4" /> Military-Grade HIPAA Secure
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
