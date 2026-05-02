'use client';

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
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useState } from 'react';

const alerts = [
  { type: 'warning' as const, message: '3 clients missing intake assessments', module: 'Clinical', href: '/ehr' },
  { type: 'info' as const, message: 'Triadic supervision hour needed for David Foster, ASW', module: 'Payroll', href: '/payroll' },
  { type: 'warning' as const, message: '12 claims rejected by Aetna — action required', module: 'Claims', href: '/claims' },
  { type: 'success' as const, message: 'Optum batch payment of $4,250 received', module: 'Banking', href: '/banking' },
];

const recentActivity = [
  { icon: Activity, label: 'Telehealth session with Test Client Two completed', time: '12 min ago', color: 'text-brand-600 bg-brand-50' },
  { icon: DollarSign, label: 'ACH payment processed — $18,200 payroll', time: '2 hr ago', color: 'text-purple-600 bg-purple-50' },
  { icon: FileText, label: 'Batch of 15 claims submitted to clearinghouse', time: '1 day ago', color: 'text-amber-600 bg-amber-50' },
  { icon: Users, label: 'David Foster, ASW added to payroll', time: '2 days ago', color: 'text-teal-600 bg-teal-50' },
  { icon: Building2, label: 'Account reconciliation completed — May', time: '3 days ago', color: 'text-amber-600 bg-amber-50' },
];

export default function DashboardPage() {
  const { clients, appointments, employees, claims } = useStore();

  const totalPayroll = employees.reduce((acc, emp) => {
    return acc + (emp.payType === 'salary' ? emp.salary / 24 : emp.salary * 80);
  }, 0);

  const pendingClaims = claims.filter(c => c.status === 'submitted').length;
  const activeClients = clients.filter((c) => c.status === 'active').length;

  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const handleGenerateInsight = async () => {
    setLoadingInsight(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Based on the following stats: 
          - Active Clients: ${activeClients}
          - Pending Claims: ${pendingClaims}
          - Practice Balance: $239,751
          - Next Payroll: $${totalPayroll.toLocaleString()}
          Provide a 2-sentence executive summary of the practice's health and one actionable recommendation.`
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

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Good morning, Dr. Sarah Jenkins 👋</h1>
            <p className="page-subtitle">Friday, May 24, 2024 · Here&apos;s your practice overview</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hipaa-badge">
              <Shield className="h-3 w-3" /> HIPAA Secure
            </span>
            <Button 
              onClick={handleGenerateInsight} 
              disabled={loadingInsight}
              className="bg-brand-100 text-brand-700 hover:bg-brand-200 border border-brand-200"
            >
              {loadingInsight ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
              AI Executive Summary
            </Button>
          </div>
        </div>
      </div>

      {/* AI Insight Card */}
      {insight && (
        <div className="mb-6 rounded-xl border border-brand-200 bg-brand-50 p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-brand-100 p-2 text-brand-700">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-brand-900 mb-1">AI Executive Summary</h3>
              <p className="text-sm text-brand-800 leading-relaxed whitespace-pre-wrap">{insight}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Clients Today"
          value={clients.length.toString()}
          change={`${activeClients} active`}
          changeType="neutral"
          icon={Activity}
          iconColor="text-brand-600"
          iconBg="bg-brand-50"
        />
        <StatCard
          title="Practice Balance"
          value="$239,751"
          change="+8.4% vs last month"
          changeType="up"
          icon={Building2}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatCard
          title="Next Payroll"
          value={`$${totalPayroll.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
          change="Due Jun 1, 2024"
          changeType="neutral"
          icon={CreditCard}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <StatCard
          title="Pending Claims"
          value={pendingClaims.toString()}
          change="3 rejected claims"
          changeType="down"
          icon={FileText}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
      </div>

      {/* AMFT Licensure Progress */}
      <div className="mb-6">
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 overflow-hidden relative shadow-lg">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-white flex items-center justify-between">
              <span>BBS Licensure Progress</span>
              <Badge variant="info" className="bg-white/20 text-white hover:bg-white/30 border-0">AMFT Track</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-3xl font-bold">1,840 <span className="text-sm font-medium text-purple-200">/ 3,000 hrs</span></p>
                <p className="text-sm text-purple-100 mt-1">1,160 hours remaining to LMFT</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-purple-100">61% Complete</p>
              </div>
            </div>
            <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden mt-3 backdrop-blur-sm">
              <div className="h-full bg-white rounded-full relative" style={{ width: '61%' }}>
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-white/50 animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Action Required</CardTitle>
            <span className="text-xs text-gray-400">{alerts.length} items</span>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.map((alert, i) => (
                <Link
                  key={i}
                  href={alert.href}
                  className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 transition-colors"
                >
                  {alert.type === 'warning' && <AlertCircle className="h-4 w-4 flex-shrink-0 text-amber-500" />}
                  {alert.type === 'info' && <AlertCircle className="h-4 w-4 flex-shrink-0 text-brand-500" />}
                  {alert.type === 'success' && <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />}
                  <span className="flex-1 text-sm text-gray-700">{alert.message}</span>
                  <Badge variant={alert.type === 'warning' ? 'warning' : alert.type === 'success' ? 'success' : 'info'}>
                    {alert.module}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lower grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Module shortcuts */}
        <Card>
          <CardHeader>
            <CardTitle>Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: '/ehr', icon: Activity, label: 'Clinical', sub: `${appointments.length} appts today`, color: 'bg-brand-50 text-brand-600' },
                { href: '/banking', icon: Building2, label: 'Banking', sub: '$239,751 balance', color: 'bg-teal-50 text-teal-600' },
                { href: '/payroll', icon: Users, label: 'Payroll', sub: `${employees.length} staff`, color: 'bg-purple-50 text-purple-600' },
                { href: '/claims', icon: FileText, label: 'Claims', sub: `${pendingClaims} pending`, color: 'bg-amber-50 text-amber-600' },
              ].map(({ href, icon: Icon, label, sub, color }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 hover:border-gray-200 hover:bg-gray-50 transition-all group"
                >
                  <div className={`rounded-xl p-2.5 ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-brand-700">{label}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-0.5 rounded-lg p-1.5 ${item.color}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* HIPAA footer note */}
      <div className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
        <Shield className="h-4 w-4 text-emerald-600 flex-shrink-0" />
        <p className="text-xs text-emerald-700">
          All client data and financial information is encrypted with AES-256 and transmitted over TLS 1.3.
          Access is logged and monitored per HIPAA audit requirements.
        </p>
      </div>
    </DashboardLayout>
  );
}
