import Link from 'next/link';
import {
  Activity,
  ArrowRight,
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
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: Activity,
    title: 'Clinical & Telehealth',
    description:
      'Comprehensive therapy notes, treatment plans, telehealth integration, scheduling, and outcome tracking — all in one HIPAA-compliant system.',
    color: 'text-brand-600 bg-brand-50',
    href: '/ehr',
  },
  {
    icon: Building2,
    title: 'Practice Banking',
    description:
      'Dedicated business banking accounts, ACH transfers, real-time transaction monitoring, and automated reconciliation built for healthcare.',
    color: 'text-teal-600 bg-teal-50',
    href: '/banking',
  },
  {
    icon: CreditCard,
    title: 'Payroll Management',
    description:
      'Automate bi-weekly payroll runs, handle multi-state tax filings, manage benefits deductions, and generate W-2s for your entire practice.',
    color: 'text-purple-600 bg-purple-50',
    href: '/payroll',
  },
  {
    icon: FileText,
    title: 'Insurance Clearinghouse',
    description:
      'Submit claims in batches, track ERAs, manage rejections automatically, and get paid faster — seamlessly integrated with clinical notes.',
    color: 'text-amber-600 bg-amber-50',
    href: '/claims',
  },
];

const stats = [
  { value: '2,400+', label: 'Mental health practices' },
  { value: '$4.2B', label: 'Processed annually' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '< 2 min', label: 'Avg support response' },
];

const testimonials = [
  {
    quote: "Theraflow cut our administrative overhead by 40%. Having clinical notes and payroll in one platform is a game-changer.",
    author: 'Elena Rodriguez, LCSW',
    role: 'Clinical Supervisor, San Diego',
  },
  {
    quote: "Finally, a system that understands therapy practices. The insurance clearinghouse module reduced our claim rejections by 90%.",
    author: 'Marcus Webb, LMFT',
    role: 'Group Practice Owner, Austin TX',
  },
  {
    quote: "HIPAA compliance is baked in everywhere. Our compliance officer loves the audit trail feature.",
    author: 'Priya Nair',
    role: 'Practice Administrator, Chicago',
  },
];

const complianceBadges = [
  { icon: Shield, label: 'HIPAA Compliant' },
  { icon: Lock, label: 'SOC 2 Type II' },
  { icon: CheckCircle2, label: 'HITECH Certified' },
  { icon: Zap, label: '256-bit Encryption' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-teal-500">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Theraflow</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
            <a href="#compliance" className="text-sm text-gray-600 hover:text-gray-900">Compliance</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#testimonials" className="text-sm text-gray-600 hover:text-gray-900">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="hidden rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:inline-flex"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100/40 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Compliance pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
              <Shield className="h-4 w-4" />
              HIPAA-Compliant Platform
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Run Your Therapy Practice{' '}
              <span className="bg-gradient-to-r from-brand-600 to-teal-500 bg-clip-text text-transparent">
                Completely
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 leading-relaxed">
              Theraflow unifies clinical notes, telehealth, practice banking, payroll, and insurance clearinghouse into one
              seamless, HIPAA-compliant platform — so you spend less time on administration and
              more time on patient care.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-200 hover:bg-brand-700 sm:w-auto"
              >
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 sm:w-auto"
              >
                View Demo
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {complianceBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Icon className="h-4 w-4 text-emerald-500" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-extrabold text-gray-900">{value}</p>
                <p className="mt-1 text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantage Section */}
      <section className="bg-gray-50 py-20 lg:py-28 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Transform overhead into impact
            </h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Theraflow aligns the incentives of everyone in your practice, turning dead administrative hours into high-margin clinical revenue.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Value Prop 1 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Maximize Profit Margins</h3>
              <p className="text-gray-600 leading-relaxed">
                Non-clinical hours cost you money. Direct clinical hours make you money. By cutting your team&apos;s paperwork burden in half, Theraflow unlocks the capacity to bill <strong className="text-gray-900 font-semibold">15-20% more annual revenue</strong> without hiring a single new therapist.
              </p>
            </div>

            {/* Value Prop 2 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 inline-flex rounded-xl bg-brand-50 p-3 text-brand-600">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">The Win-Win-Win</h3>
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-900 font-semibold">Associates</strong> spend less time on admin and get licensed faster. <strong className="text-gray-900 font-semibold">Supervisors</strong> spend zero time chasing notes and focus on mentorship. <strong className="text-gray-900 font-semibold">Owners</strong> maximize their margins.
              </p>
            </div>

            {/* Value Prop 3 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 inline-flex rounded-xl bg-purple-50 p-3 text-purple-600">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Expand Community Care</h3>
              <p className="text-gray-600 leading-relaxed">
                Therapists burn out from paperwork, not trauma. Curing burnout instantly expands your clinic&apos;s capacity, allowing your team to bring <strong className="text-gray-900 font-semibold">nearly 100 more clients</strong> off your waitlist and into active care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything your practice needs
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Four fully integrated modules, one unified platform.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description, color, href }) => (
              <Link
                key={title}
                href={href}
                className="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
              >
                <div className={`mb-4 inline-flex rounded-xl p-3 ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Explore module <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance section */}
      <section id="compliance" className="bg-gradient-to-br from-brand-950 to-teal-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                <Shield className="h-4 w-4" /> Built for Healthcare Compliance
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                HIPAA compliance isn&apos;t an afterthought
              </h2>
              <p className="mt-4 text-lg text-white/70 leading-relaxed">
                Every feature in Theraflow was designed with HIPAA, HITECH, and mental health-specific
                regulations in mind. Protect patient data while keeping your practice
                financially healthy.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  'End-to-end AES-256 encryption for all PHI',
                  'Comprehensive audit logs with user attribution',
                  'Role-based access control (RBAC)',
                  'Automatic session timeouts & MFA',
                  'Business Associate Agreement (BAA) provided',
                  'Annual third-party penetration testing',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/80">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {complianceBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
                >
                  <Icon className="mx-auto mb-3 h-8 w-8 text-emerald-400" />
                  <p className="font-semibold text-white">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-28 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              No hidden fees. Premium features built-in. Start your 30-day free trial today.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12 max-w-5xl mx-auto">
            {/* Solo Tier */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm flex flex-col hover:shadow-md transition-shadow duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Solo Practice</h3>
                <p className="mt-2 text-gray-500">Perfect for independent therapists and solo practitioners.</p>
              </div>
              <div className="mb-6 flex items-baseline text-5xl font-extrabold text-gray-900">
                $89
                <span className="ml-1 text-xl font-medium text-gray-500">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  '1 Licensed Provider',
                  'Unlimited active clients',
                  'Full EHR & Treatment Planning',
                  'Integrated Telehealth',
                  'Basic AI Documentation Assistant',
                  'Business Banking Account',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className="w-full inline-flex justify-center rounded-xl bg-brand-50 px-4 py-3.5 text-base font-bold text-brand-700 hover:bg-brand-100 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Group Tier */}
            <div className="rounded-3xl border-2 border-brand-500 bg-white p-8 shadow-xl relative flex flex-col hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute top-0 right-8 -translate-y-1/2">
                <span className="inline-flex rounded-full bg-brand-500 px-4 py-1 text-sm font-bold tracking-wide text-white uppercase shadow-sm">
                  Most Popular
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Group Practice</h3>
                <p className="mt-2 text-gray-500">For growing teams requiring advanced administration.</p>
              </div>
              <div className="mb-6 flex items-baseline text-5xl font-extrabold text-gray-900">
                $149
                <span className="ml-1 text-xl font-medium text-gray-500">/mo</span>
              </div>
              <p className="text-sm font-medium text-brand-600 mb-6 border-b border-gray-100 pb-6">+ $49/mo per additional clinician</p>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  'Everything in Solo, plus:',
                  'Unlimited administrative staff (Free)',
                  'Automated Payroll & Tax Filing',
                  'Insurance Clearinghouse (Auto-ERAs)',
                  'Advanced AI "Auto-Note" Generation',
                  'Priority 24/7 Phone Support',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className={`h-5 w-5 flex-shrink-0 ${i === 0 ? 'text-brand-300' : 'text-brand-500'}`} />
                    <span className={i === 0 ? "font-bold text-gray-900" : "text-gray-700 font-medium"}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className="w-full inline-flex justify-center rounded-xl bg-brand-600 px-4 py-3.5 text-base font-bold text-white hover:bg-brand-700 shadow-md shadow-brand-200 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Loved by healthcare practices
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
              >
                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-base text-gray-700 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-900">{t.author}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold text-white">Ready to simplify your practice?</h2>
          <p className="mt-4 text-lg text-brand-100">
            Join 2,400+ practices using Theraflow. Start your 30-day free trial — no credit card required.
          </p>
          <Link
            href="/auth/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-brand-700 shadow-lg hover:bg-brand-50"
          >
            Start Free Trial <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-teal-500">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">Theraflow</span>
            </div>
            <p className="text-sm text-gray-400">
              © 2024 Theraflow, Inc. · HIPAA Compliant · All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <Shield className="h-4 w-4" /> HIPAA Secure
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
