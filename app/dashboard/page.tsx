'use client';

import { useState } from 'react';
import Link from 'next/link';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useStore } from '@/lib/store';
import { StatCard } from '@/components/ui/StatCard';
import {
  Activity,
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  CreditCard,
  DollarSign,
  FileText,
  Shield,
  TrendingUp,
  Users,
  Sparkles,
  Loader2,
  ArrowUpRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AutonomousPipeline } from '@/components/ui/AutonomousPipeline';

import { AssociateOnboarding } from '@/components/onboarding/AssociateOnboarding';
import { Clock, CheckSquare } from 'lucide-react';

const alerts = [
  { type: 'warning' as const, message: '3 clients missing intake assessments', module: 'Clinical', href: '/ehr' },
  { type: 'info' as const, message: 'Triadic supervision hour needed for David Foster, ASW', module: 'Payroll', href: '/payroll' },
  { type: 'info' as const, message: '12 claims successfully processed by Aetna', module: 'Claims', href: '/claims' },
  { type: 'success' as const, message: 'Optum batch payment of $4,250 received', module: 'Banking', href: '/banking' },
];

const recentActivity = [
  { icon: Activity, label: 'Telehealth session with Test Client Two completed', time: '12 min ago', color: 'text-brand-600 bg-brand-50 dark:bg-brand-500/10 dark:text-brand-400' },
  { icon: DollarSign, label: 'ACH payment processed — $18,200 payroll', time: '2 hr ago', color: 'text-purple-600 bg-purple-50 dark:bg-purple-500/10 dark:text-purple-400' },
  { icon: FileText, label: 'Batch of 15 claims submitted to clearinghouse', time: '1 day ago', color: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400' },
  { icon: Users, label: 'David Foster, ASW added to payroll', time: '2 days ago', color: 'text-teal-600 bg-teal-50 dark:bg-teal-500/10 dark:text-teal-400' },
  { icon: Building2, label: `Account reconciliation completed — ${new Date().toLocaleDateString('en-US', { month: 'long' })}`, time: '3 days ago', color: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400' },
];


import { AIFixIssues } from '@/components/ui/AIFixIssues';
import { TriWestChecklist } from '@/components/modules/compliance/TriWestChecklist';
import { WhatIfSimulator } from '@/components/modules/intelligence/WhatIfSimulator';
import { MilestoneRings } from '@/components/modules/licensure/MilestoneRings';
import { CancellationImpactSimulator } from '@/components/modules/intelligence/CancellationImpactSimulator';
import { AuditDefender } from '@/components/modules/intelligence/AuditDefender';
import { ClientChurnRadar } from '@/components/modules/intelligence/ClientChurnRadar';

export default function DashboardPage() {
  const { clients, appointments, employees, claims, userRole, clinicalNotes, isOnboarded, setIsOnboarded, trackedHours } = useStore();

  const totalBBSHours = trackedHours ? trackedHours.reduce((sum, h) => sum + (h.durationMinutes / 60), 0) : 0;
  const totalHoursRequired = 3000;
  const hoursRemaining = Math.max(0, totalHoursRequired - totalBBSHours);
  const percentComplete = Math.min(100, Math.round((totalBBSHours / totalHoursRequired) * 100));

  const totalPayroll = employees.reduce((acc, emp) => {
    return acc + (emp.payType === 'salary' ? emp.salary / 24 : emp.salary * 80);
  }, 0);

  const totalMonthlySessions = 927; // Normalized to 1 month (1,285 / 6 weeks * 4.33)
  const avgSessionRate = 114.34;
  const grossVolume = totalMonthlySessions * avgSessionRate;

  const pendingClaims = claims.filter(c => c.status === 'submitted').length;

  // Mock current associate data
  const associateName = "Alexander Marshi, AMFT";
  const myClients = clients.filter(c => c.provider === associateName && c.status === 'active').length;
  const myAppointments = appointments.filter(a => a.provider === associateName).length;
  const myPendingNotes = clinicalNotes.filter(n => n.associateName === associateName && n.status === 'pending_review').length;

  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const handleGenerateInsight = async () => {
    setLoadingInsight(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userRole === 'owner' 
            ? `Based on the following stats: 
                - Monthly Sessions: 927
                - Monthly Gross Revenue: $105,993
                - Insurance Breakdown: 84% TriWest, 16% Commercial
                - Team Size: ${employees.length} clinicians
                Provide a 2-sentence executive summary of the practice's health and one actionable recommendation.`
            : `Based on the following stats for associate therapist ${associateName}:
                - Active Caseload: ${myClients}
                - Today's Appointments: ${myAppointments}
                - Pending Clinical Notes: ${myPendingNotes}
                Provide a 2-sentence encouraging professional summary and one actionable recommendation on time management or documentation.`
        })
      });
      const data = await res.json();
      if (res.ok) setInsight(data.text);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInsight(false);
    }
  };

  if (userRole === 'associate' && !isOnboarded) {
    return (
      <DashboardLayout>
        <AssociateOnboarding onComplete={() => setIsOnboarded(true)} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">
              {userRole === 'owner' ? "Good morning, Dr. Sarah Jenkins 👋" : "Good morning, Alexander Marshi 👋"}
            </h1>
            <p className="page-subtitle text-muted-foreground" suppressHydrationWarning>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
               · {userRole === 'owner' ? "Here's your practice overview" : "Here's your daily schedule"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hipaa-badge">
              <Shield className="h-3 w-3" /> HIPAA Secure
            </span>
            <Button 
              onClick={handleGenerateInsight} 
              disabled={loadingInsight}
              className="bg-brand-100 text-brand-700 hover:bg-brand-200 border border-brand-200 dark:bg-brand-500/20 dark:border-brand-500/30 dark:text-brand-300 dark:hover:bg-brand-500/30"
            >
              {loadingInsight ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
              {userRole === 'owner' ? "AI Executive Summary" : "AI Daily Briefing"}
            </Button>
          </div>
        </div>
      </div>

      {userRole === 'owner' && (
        <div className="px-8 pb-6">
          <AutonomousPipeline />
        </div>
      )}

      {/* AI Insight Card */}
      {insight && (
        <div className="mb-6 rounded-xl border border-brand-200 bg-brand-50 p-5 shadow-sm dark:bg-brand-500/5 dark:border-brand-500/20">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-brand-100 p-2 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-brand-900 mb-1 dark:text-brand-300">AI Executive Summary</h3>
              <p className="text-sm text-brand-800 leading-relaxed whitespace-pre-wrap dark:text-brand-100/70">{insight}</p>
            </div>
          </div>
        </div>
      )}

      {/* Global Audit Defender Alert */}
      <AuditDefender role={userRole} />

      {/* Google Workspace Integration */}
      {userRole === 'owner' && (
        <div className="mb-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="currentColor" className="text-blue-500/50"/>
                <path d="M14 2L20 8H14V2Z" fill="currentColor" className="text-blue-500/70"/>
                <rect x="8" y="10" width="8" height="2" rx="1" fill="currentColor" className="text-blue-600"/>
                <rect x="8" y="14" width="8" height="2" rx="1" fill="currentColor" className="text-blue-600"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-foreground">Google Workspace Sync</h3>
              <p className="text-sm text-muted-foreground">Connect Google Calendar for automated Telehealth appointment generation.</p>
            </div>
          </div>
          <Button variant="outline" className="border-brand-200 text-brand-700 hover:bg-brand-50 shadow-sm dark:border-brand-500/30 dark:text-brand-400 dark:hover:bg-brand-500/10 dark:bg-transparent">
            <Calendar className="w-4 h-4 mr-2" />
            Connect Calendar
          </Button>
        </div>
      )}

      {/* Stats grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {userRole === 'owner' ? (
          <>
            <StatCard
              title="Monthly Sessions"
              value="1,285"
              change={`$${grossVolume.toLocaleString('en-US', { maximumFractionDigits: 0 })} gross volume`}
              changeType="up"
              icon={Activity}
              iconColor="text-brand-600 dark:text-brand-400"
              iconBg="bg-brand-50 dark:bg-brand-500/10"
            />
            <StatCard
              title="YTD Revenue"
              value={`$${(grossVolume * 5).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
              change="Projected: $1.76M Annual"
              changeType="up"
              icon={Building2}
              iconColor="text-teal-600 dark:text-teal-400"
              iconBg="bg-teal-50 dark:bg-teal-500/10"
            />
            <StatCard
              title="Next Payroll"
              value={`$${totalPayroll.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
              change={`For ${employees.length} team members`}
              changeType="neutral"
              icon={CreditCard}
              iconColor="text-purple-600 dark:text-purple-400"
              iconBg="bg-purple-50 dark:bg-purple-500/10"
            />
            <StatCard
              title="Monthly Claims"
              value="1,191"
              change="84% TriWest VA CCN"
              changeType="neutral"
              icon={FileText}
              iconColor="text-amber-600 dark:text-amber-400"
              iconBg="bg-amber-50 dark:bg-amber-500/10"
            />
          </>
        ) : (
          <>
            <StatCard
              title="My Caseload"
              value={myClients.toString()}
              change="Active clients"
              changeType="neutral"
              icon={Users}
              iconColor="text-brand-600 dark:text-brand-400"
              iconBg="bg-brand-50 dark:bg-brand-500/10"
            />
            <StatCard
              title="Today's Appts"
              value={myAppointments.toString()}
              change="2 Telehealth, 1 In-Person"
              changeType="neutral"
              icon={Calendar}
              iconColor="text-teal-600 dark:text-teal-400"
              iconBg="bg-teal-50 dark:bg-teal-500/10"
            />
            <Link href="/ehr/notes" className="block transition-transform hover:-translate-y-1 hover:shadow-md rounded-xl">
              <StatCard
                title="Pending Notes"
                value={myPendingNotes.toString()}
                change="Require signature"
                changeType={myPendingNotes > 0 ? "down" : "neutral"}
                icon={CheckSquare}
                iconColor="text-amber-600 dark:text-amber-400"
                iconBg="bg-amber-50 dark:bg-amber-500/10"
              />
            </Link>
            <StatCard
              title="Next Supervision"
              value="Today 3PM"
              change="Triadic with Dr. Jenkins"
              changeType="up"
              icon={Clock}
              iconColor="text-purple-600 dark:text-purple-400"
              iconBg="bg-purple-50 dark:bg-purple-500/10"
            />
          </>
        )}
      </div>

      {/* Associate Power Features */}
      {userRole === 'associate' && (
        <div className="mb-6 space-y-6">
          <MilestoneRings totalBBSHours={totalBBSHours} totalHoursRequired={totalHoursRequired} />
          
          <div className="grid lg:grid-cols-2 gap-6">
            <WhatIfSimulator />
            <ClientChurnRadar />
          </div>
        </div>
      )}

      {/* Compliance & Alerts */}
      {userRole === 'owner' && (
        <div className="mb-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AIFixIssues />
            </div>
            <div>
              <TriWestChecklist />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <CancellationImpactSimulator 
              monthlyScheduledSessions={totalMonthlySessions} 
              avgSessionRate={avgSessionRate} 
              currentCancellationRate={19.6}
            />
            {/* You can add another widget here, or let the simulator take full width if we remove grid cols */}
          </div>
        </div>
      )}

      {/* Lower grid */}
      <div className={`grid gap-6 ${userRole === 'owner' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
        {/* Module shortcuts */}
        <Card>
          <CardHeader>
            <CardTitle>Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {(userRole === 'owner' ? [
                { href: '/ehr', icon: Activity, label: 'Clinical', sub: `${appointments.length} appts today`, color: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400' },
                { href: '/banking', icon: Building2, label: 'Banking', sub: '$239,751 balance', color: 'bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400' },
                { href: '/payroll', icon: Users, label: 'Payroll', sub: `${employees.length} staff`, color: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400' },
                { href: '/claims', icon: FileText, label: 'Claims', sub: `${pendingClaims} pending`, color: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' },
              ] : [
                { href: '/ehr', icon: Activity, label: 'EHR & Telehealth', sub: `${myAppointments} appts today`, color: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400' },
                { href: '/messages', icon: CheckSquare, label: 'Messages', sub: `2 unread`, color: 'bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400' },
                { href: '/supervision', icon: Users, label: 'Supervision', sub: `1 upcoming`, color: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400' },
                { href: '/compliance', icon: FileText, label: 'Forms & CEUs', sub: `All current`, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' },
              ]).map(({ href, icon: Icon, label, sub, color }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 rounded-xl border border-border p-4 hover:border-muted-foreground/30 hover:bg-muted/50 transition-all group"
                >
                  <div className={`rounded-xl p-2.5 ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-brand-500">{label}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {userRole === 'owner' && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity
                  .map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 rounded-lg p-1.5 ${item.color}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* HIPAA footer note */}
      <div className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-500/20 dark:bg-emerald-500/5">
        <Shield className="h-4 w-4 text-emerald-600 flex-shrink-0 dark:text-emerald-400" />
        <p className="text-xs text-emerald-700 dark:text-emerald-400">
          All client data and financial information is encrypted with AES-256 and transmitted over TLS 1.3.
          Access is logged and monitored per HIPAA audit requirements.
        </p>
      </div>
    </DashboardLayout>
  );
}
