'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useStore } from '@/lib/store';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Users, 
  Download,
  Filter,
  AlertTriangle,
  Activity,
  Flame,
  BrainCircuit,
  ArrowDownRight,
  TrendingDown,
  Trophy
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';
import { FractionalCashflow } from '@/components/modules/intelligence/FractionalCashflow';

type DateRange = 'current_pay_period' | 'last_pay_period' | 'last_30_days' | 'ytd';

// Mock Data
const dataMap = {
  current_pay_period: {
    label: 'Apr 28 - May 9, 2026',
    gross: 4158,
    splits: 2079,
    net: 2079,
    hours: 70.5,
    sessions: 43,
    notes: 43,
    trend: '+8.4%',
    chartData: [
      { date: 'Apr 28', gross: 800, splits: 400, net: 400 },
      { date: 'May 1', gross: 1200, splits: 600, net: 600 },
      { date: 'May 4', gross: 500, splits: 250, net: 250 },
      { date: 'May 6', gross: 750, splits: 375, net: 375 },
      { date: 'May 8', gross: 908, splits: 454, net: 454 },
    ]
  },
  last_pay_period: {
    label: 'Apr 14 - Apr 27, 2026',
    gross: 3850,
    splits: 1925,
    net: 1925,
    trend: '+2.1%',
    chartData: [
      { date: 'Apr 14', gross: 800, splits: 400, net: 400 },
      { date: 'Apr 17', gross: 1000, splits: 500, net: 500 },
      { date: 'Apr 21', gross: 850, splits: 425, net: 425 },
      { date: 'Apr 24', gross: 1200, splits: 600, net: 600 },
    ]
  },
  last_30_days: {
    label: 'Apr 9 - May 9, 2026',
    gross: 8008,
    splits: 4004,
    net: 4004,
    trend: '+5.3%',
    chartData: [
      { date: 'Wk 1', gross: 1500, splits: 750, net: 750 },
      { date: 'Wk 2', gross: 2350, splits: 1175, net: 1175 },
      { date: 'Wk 3', gross: 2000, splits: 1000, net: 1000 },
      { date: 'Wk 4', gross: 2158, splits: 1079, net: 1079 },
    ]
  },
  ytd: {
    label: 'Jan 1 - May 9, 2026',
    gross: 13003,
    splits: 6501,
    net: 6502,
    trend: '+12.4%',
    chartData: [
      { date: 'Jan', gross: 0, splits: 0, net: 0 },
      { date: 'Feb', gross: 1500, splits: 750, net: 750 },
      { date: 'Mar', gross: 4000, splits: 2000, net: 2000 },
      { date: 'Apr', gross: 4500, splits: 2250, net: 2250 },
      { date: 'May (MTD)', gross: 3003, splits: 1501, net: 1502 },
    ]
  }
};

const topAssociates = [
  { name: 'Alexander Marshi, AMFT', gross: 13003, split: 6501, sessions: 86 },
  { name: 'Sarah Jenkins, ASW', gross: 12850, split: 6425, sessions: 85 },
  { name: 'David Foster, APCC', gross: 12400, split: 6200, sessions: 82 },
  { name: 'Emily Chen, AMFT', gross: 13150, split: 6575, sessions: 87 },
  { name: 'Michael Rodriguez, ASW', gross: 12900, split: 6450, sessions: 86 },
  { name: 'Jessica Taylor, APCC', gross: 12700, split: 6350, sessions: 84 },
];

export default function AnalyticsPage() {
  const { userRole } = useStore();
  const [dateRange, setDateRange] = useState<DateRange>('current_pay_period');

  const isOwner = userRole === 'owner';

  // For the associate view, use the gross revenue as THEIR generated revenue,
  // and split it 50/50 for their take-home earnings vs the practice's cut.
  const displayDataMap = isOwner ? Object.fromEntries(
    Object.entries(dataMap).map(([key, data]) => [
      key,
      {
        ...data,
        gross: data.gross * 6, // Scale up for 6 associates (Alexander + 5 more)
        splits: data.gross * 3,
        net: data.gross * 3,
        sessions: (data as any).sessions ? (data as any).sessions * 6 : undefined,
        notes: (data as any).notes ? (data as any).notes * 6 : undefined,
        chartData: data.chartData.map(d => ({
          date: d.date,
          gross: d.gross * 6,
          splits: d.gross * 3,
          net: d.gross * 3,
        }))
      }
    ])
  ) : Object.fromEntries(
    Object.entries(dataMap).map(([key, data]) => {
      const associateGross = data.gross;
      const associateEarnings = Math.round(associateGross * 0.5); 
      const practiceCut = associateGross - associateEarnings;

      return [
        key,
        {
          ...data,
          gross: associateGross,
          splits: practiceCut, // What they give to the practice
          net: associateEarnings, // What they keep
          chartData: data.chartData.map(d => {
            const ag = d.gross;
            const ae = Math.round(ag * 0.5);
            return {
              date: d.date,
              gross: ag,
              splits: ag - ae,
              net: ae,
            };
          })
        }
      ]
    })
  ) as typeof dataMap;

  const currentData = displayDataMap[dateRange];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-xl">
          <p className="font-semibold text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-sm">
              <span style={{ color: entry.color }} className="font-medium">
                {entry.name === 'gross' 
                  ? (isOwner ? 'Practice Gross Revenue' : 'Gross Generated')
                  : entry.name === 'splits' 
                    ? (isOwner ? 'Associate Splits' : 'Practice Split (50%)') 
                    : (isOwner ? 'Net Practice Income' : 'Your Earnings')}
              </span>
              <span className="font-bold text-foreground">{formatCurrency(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-xl z-50">
          <div className="flex items-center gap-2 text-sm">
            <span style={{ color: payload[0].payload.color }} className="font-medium">
              {payload[0].name}
            </span>
            <span className="font-bold text-foreground">{payload[0].value}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Phase 6: True-Data Attendance & Retention (SimplePractice Aligned)
  const caseloadData = isOwner 
    ? { total: 266, practice: 200, independent: 66, other: 0 } 
    : { total: 36, practice: 33, independent: 3, other: 0 };

  const appointmentsData = isOwner
    ? [
        { name: 'Completed', value: 200, color: '#10b981' }, // 75.2%
        { name: 'Canceled / No-Show', value: 66, color: '#f43f5e' }, // 24.8%
      ]
    : [
        { name: 'Completed', value: 156, color: '#10b981' }, // 95% Show
        { name: 'Canceled / No-Show', value: 8, color: '#f43f5e' }, // 5% Canceled
      ];

  const totalAppointments = appointmentsData.reduce((acc, curr) => acc + curr.value, 0);
  const showRate = Math.round((appointmentsData[0].value / totalAppointments) * 100 * 10) / 10; // 75.2

  // Associate Retention Leaderboard Data
  const retentionLeaderboard = [
    { name: 'Alexander Marshi', comp: 33, canc: 2, ns: 1, missed: 3, total: 36, rate: 91.67, gross: 33 * 110 },
    { name: 'Juen/Juan Marc', comp: 21, canc: 2, ns: 0, missed: 2, total: 23, rate: 91.30, gross: 21 * 110 },
    { name: 'Benjamin Raskin', comp: 20, canc: 1, ns: 2, missed: 3, total: 23, rate: 86.96, gross: 20 * 110 },
    { name: 'Kiran Dave', comp: 26, canc: 0, ns: 4, missed: 4, total: 30, rate: 86.67, gross: 26 * 110 },
    { name: 'Eliana Nivon', comp: 28, canc: 1, ns: 4, missed: 5, total: 33, rate: 84.85, gross: 28 * 110 },
    { name: 'Aaron Kuyper', comp: 16, canc: 0, ns: 3, missed: 3, total: 19, rate: 84.21, gross: 16 * 110 },
    { name: 'Iliana Canez-Gomez', comp: 14, canc: 1, ns: 2, missed: 3, total: 17, rate: 82.35, gross: 14 * 110 },
    { name: 'Lisa Garratt', comp: 9, canc: 1, ns: 2, missed: 3, total: 12, rate: 75.00, gross: 9 * 110 },
    { name: 'Kalaya Irby', comp: 22, canc: 6, ns: 4, missed: 10, total: 32, rate: 68.75, gross: 22 * 110 },
    { name: 'Ashley Beer', comp: 11, canc: 8, ns: 5, missed: 13, total: 24, rate: 45.83, gross: 11 * 110 },
    { name: 'Jeremy Larson', comp: 0, canc: 14, ns: 0, missed: 14, total: 14, rate: 0.00, gross: 0 },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="page-header">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="page-title flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-emerald-500" />
              {isOwner ? 'Practice Analytics' : 'My Analytics'}
            </h1>
            <p className="page-subtitle text-muted-foreground">
              {isOwner 
                ? 'Pre-split income, associate performance, and financial trends.' 
                : 'Your generated revenue, splits, and personal earnings trends.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hidden sm:flex border-border text-foreground">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Filter className="h-4 w-4 mr-2" />
              Custom Report
            </Button>
          </div>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="px-8 pb-6">
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-muted/50 rounded-xl w-fit border border-border/50 backdrop-blur-sm">
          {[
            { id: 'current_pay_period', label: 'Current Pay Period' },
            { id: 'last_pay_period', label: 'Last Pay Period' },
            { id: 'last_30_days', label: 'Last 30 Days' },
            { id: 'ytd', label: 'Year to Date' }
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setDateRange(range.id as DateRange)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                dateRange === range.id 
                  ? "bg-card text-foreground shadow-sm ring-1 ring-border" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {range.label}
            </button>
          ))}
          <div className="pl-4 ml-2 border-l border-border text-sm text-muted-foreground font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {currentData.label}
          </div>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="px-8 mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={isOwner ? "Gross Revenue" : "Generated Revenue"}
          value={formatCurrency(currentData.gross)}
          change={`${currentData.trend} vs previous`}
          changeType="up"
          icon={TrendingUp}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-500/10"
        />
        <StatCard
          title={isOwner ? "Practice Cancellation Rate" : "My Cancellation Rate"}
          value={isOwner ? "24.8%" : "5.0%"}
          change={isOwner ? "Action required" : "95% Show Rate"}
          changeType={isOwner ? "down" : "up"}
          icon={Activity}
          iconColor="text-rose-600 dark:text-rose-400"
          iconBg="bg-rose-50 dark:bg-rose-500/10"
        />
        <StatCard
          title="Outstanding Balances"
          value="$10,100"
          change="$9,425 Ins. | $675 Client"
          changeType="neutral"
          icon={DollarSign}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBg="bg-amber-50 dark:bg-amber-500/10"
        />

        <StatCard
          title="Note Completion Speed"
          value={isOwner ? "0.6 days" : "30 mins"}
          change={isOwner ? "82% locked within 24h" : "Fastest in practice! (0.02 days)"}
          changeType="up"
          icon={Calendar}
          iconColor="text-indigo-600 dark:text-indigo-400"
          iconBg="bg-indigo-50 dark:bg-indigo-500/10"
        />
      </div>

      {/* Fractional CFO */}
      {isOwner && (
        <div className="px-8 mb-6">
          <FractionalCashflow />
        </div>
      )}

      {/* Operational Metrics */}
      <div className="px-8 grid gap-6 md:grid-cols-2 mb-6">
        
        {/* Practice Attendance Overview */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Practice Attendance Overview</CardTitle>
            <CardDescription>May 1 – May 10, 2026 (SimplePractice Aligned)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                <span className="text-3xl font-bold text-emerald-500">{appointmentsData[0].value}</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block mt-1 uppercase tracking-wider">Completed</span>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-center">
                <span className="text-3xl font-bold text-rose-500">{appointmentsData[1].value}</span>
                <span className="text-xs text-rose-600 dark:text-rose-400 font-bold block mt-1 uppercase tracking-wider">Canceled / No-Show</span>
              </div>
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-center">
                <span className="text-3xl font-bold text-indigo-500">{totalAppointments}</span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold block mt-1 uppercase tracking-wider">Total Outcomes</span>
              </div>
              <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4 text-center">
                <span className="text-3xl font-bold text-brand-500">{showRate}%</span>
                <span className="text-xs text-brand-600 dark:text-brand-400 font-bold block mt-1 uppercase tracking-wider">Retention Rate</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performer Spotlight */}
        <Card className="border-brand-500/30 bg-brand-500/5 shadow-sm shadow-brand-500/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brand-500">
              <Trophy className="w-5 h-5" /> Top Performer Spotlight
            </CardTitle>
            <CardDescription>Highest volume and highest retention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mt-4 bg-brand-500/10 border border-brand-500/20 p-5 rounded-2xl">
              <div className="w-16 h-16 shrink-0 rounded-full bg-brand-500 text-white flex items-center justify-center text-2xl font-bold border-4 border-brand-500/30 shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                AM
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Alexander Marshi</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  <strong className="text-emerald-500">33 completed sessions</strong> with a <strong className="text-brand-500">91.67% retention rate</strong>.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] font-bold text-brand-400 bg-brand-500/20 px-2 py-0.5 rounded-full border border-brand-500/30 uppercase tracking-wider">#1 Volume</span>
                  <span className="text-[10px] font-bold text-brand-400 bg-brand-500/20 px-2 py-0.5 rounded-full border border-brand-500/30 uppercase tracking-wider">#1 Retention</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="px-8 grid gap-6 lg:grid-cols-3 mb-8">
        {/* Main Revenue Chart */}
        <Card className={cn("border-border shadow-sm", isOwner ? "lg:col-span-2" : "lg:col-span-3")}>
          <CardHeader>
            <CardTitle>{isOwner ? 'Revenue Trends' : 'Your Earnings Trends'}</CardTitle>
            <CardDescription>{isOwner ? 'Gross revenue vs. Associate splits over time' : 'Your gross revenue vs. your net earnings over time'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickFormatter={(val) => `$${val / 1000}k`}
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area 
                    type="monotone" 
                    dataKey="gross" 
                    name="gross"
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorGross)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="net" 
                    name="net"
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorNet)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Associate Retention Leaderboard */}
        {isOwner && (
          <Card className="border-border shadow-sm flex flex-col lg:col-span-3 mb-8">
            <CardHeader>
              <CardTitle>Associate Retention Leaderboard</CardTitle>
              <CardDescription>Comprehensive breakdown by clinician (May 1 - May 10)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto mt-4 rounded-xl border border-border/50">
                <table className="w-full text-sm text-left">
                  <thead className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider bg-muted/50 border-b border-border/50">
                    <tr>
                      <th className="px-5 py-4">Clinician</th>
                      <th className="px-5 py-4 text-center">Completed</th>
                      <th className="px-5 py-4 text-center">Canceled</th>
                      <th className="px-5 py-4 text-center">No-Show</th>
                      <th className="px-5 py-4 text-center border-l border-border/50">Total Outcomes</th>
                      <th className="px-5 py-4 text-right">Retention Rate</th>
                      <th className="px-5 py-4 text-right">Generated Rev</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {retentionLeaderboard.map((assoc, idx) => {
                      const isDanger = assoc.rate < 50;
                      const isWarning = assoc.rate >= 50 && assoc.rate < 75;
                      
                      const rateColor = isDanger ? 'text-rose-500' : isWarning ? 'text-amber-500' : 'text-emerald-500';
                      
                      return (
                        <tr key={assoc.name} className={`hover:bg-muted/30 transition-colors ${idx === 0 ? 'bg-brand-500/5' : ''}`}>
                          <td className="px-5 py-3 font-medium text-foreground flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-[10px] flex items-center justify-center text-slate-400 font-bold">{idx + 1}</span>
                            {assoc.name}
                            {idx === 0 && <Trophy className="w-3 h-3 text-brand-500 ml-1" />}
                          </td>
                          <td className="px-5 py-3 text-center text-emerald-400 font-bold bg-emerald-500/5">{assoc.comp}</td>
                          <td className="px-5 py-3 text-center text-amber-400 font-medium">{assoc.canc}</td>
                          <td className="px-5 py-3 text-center text-rose-400 font-medium">{assoc.ns}</td>
                          <td className="px-5 py-3 text-center text-brand-400 font-bold bg-brand-500/5 border-l border-border/50">{assoc.total}</td>
                          <td className="px-5 py-3 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <div className="w-24 h-2 bg-slate-900 border border-slate-800 rounded-full overflow-hidden relative">
                                <div className={`absolute left-0 top-0 bottom-0 ${isDanger ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'} transition-all`} style={{ width: `${assoc.rate}%` }}></div>
                              </div>
                              <span className={`font-bold w-12 ${rateColor}`}>{assoc.rate.toFixed(0)}%</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-right text-emerald-400 font-mono font-bold">
                            {formatCurrency(assoc.gross)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-slate-900/80 font-bold border-t border-slate-700 text-white shadow-inner">
                    <tr>
                      <td className="px-5 py-4 uppercase tracking-widest text-xs text-slate-400">Total / Avg</td>
                      <td className="px-5 py-4 text-center text-emerald-400 bg-emerald-500/10 text-lg">200</td>
                      <td className="px-5 py-4 text-center text-amber-400">36</td>
                      <td className="px-5 py-4 text-center text-rose-400">27</td>
                      <td className="px-5 py-4 text-center text-brand-400 bg-brand-500/10 text-lg border-l border-border/50">266</td>
                      <td className="px-5 py-4 text-right text-emerald-400 text-lg">75.19%</td>
                      <td className="px-5 py-4 text-right text-emerald-400 text-lg font-mono">${(200 * 110).toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Phase 4: Predictive AI Intelligence (Enterprise-Grade SaaS Features) */}
      <div className="px-8 mb-12">
        <div className="mb-6 flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-foreground">Predictive Intelligence Engine</h2>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* Predictive Client Churn Radar */}
          <Card className="border-rose-500/20 shadow-lg shadow-rose-500/5 relative overflow-hidden bg-gradient-to-br from-slate-900 to-black group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-colors"></div>
            
            <CardHeader className="relative z-10 border-b border-border/50 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Activity className="h-5 w-5 text-rose-400" />
                    Client Churn Radar
                  </CardTitle>
                  <CardDescription className="text-slate-400 mt-1">AI probability of imminent clinical drop-out</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-1">MRR At Risk</p>
                  <p className="text-2xl font-mono font-bold text-white">$1,850</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 pt-6">
              <div className="space-y-4">
                
                {/* High Risk Item */}
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 transition-colors hover:bg-rose-500/15">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                        <span className="text-sm font-bold text-slate-300">JS</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">John Smith</h4>
                        <p className="text-xs text-slate-400">Therapist: Ashley Beer</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-rose-500/20 px-2.5 py-1 rounded-full border border-rose-500/30">
                      <TrendingDown className="w-3 h-3 text-rose-400" />
                      <span className="text-xs font-bold text-rose-400">82% Churn Risk</span>
                    </div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3 text-xs text-slate-300 border border-white/5 space-y-1">
                    <p><strong className="text-slate-500">Trigger:</strong> Dropped from weekly to bi-weekly.</p>
                    <p><strong className="text-slate-500">Velocity:</strong> Arrived 12 mins late to last 2 sessions.</p>
                    <p><strong className="text-slate-500">AI Action:</strong> Automated "Check-in" email drafted for Ashley.</p>
                  </div>
                </div>

                {/* Medium Risk Item */}
                <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 transition-colors hover:bg-amber-500/10">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                        <span className="text-sm font-bold text-slate-300">MR</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Maria Rodriguez</h4>
                        <p className="text-xs text-slate-400">Therapist: Kalaya Irby</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      <span className="text-xs font-bold text-amber-400">64% Churn Risk</span>
                    </div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3 text-xs text-slate-300 border border-white/5">
                    <p><strong className="text-slate-500">Trigger:</strong> Credit card declined + canceled last session.</p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Clinical Burnout Prediction Index (BPI) */}
          <Card className="border-indigo-500/20 shadow-lg shadow-indigo-500/5 relative overflow-hidden bg-gradient-to-br from-slate-900 to-black group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors"></div>
            
            <CardHeader className="relative z-10 border-b border-border/50 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Flame className="h-5 w-5 text-indigo-400" />
                    Clinical Burnout Index
                  </CardTitle>
                  <CardDescription className="text-slate-400 mt-1">Predictive staff retention monitoring</CardDescription>
                </div>
                {isOwner && (
                  <div className="text-right">
                    <p className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-1">Critical Alerts</p>
                    <p className="text-2xl font-mono font-bold text-white">1 Staff</p>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="relative z-10 pt-6">
              <div className="space-y-6">
                
                {isOwner ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="font-bold text-white text-sm">Jeremy Larson</h4>
                          <p className="text-xs text-rose-400 font-medium">85% Burnout Probability</p>
                        </div>
                        <span className="text-xs font-mono text-slate-400">22 hrs / week</span>
                      </div>
                      
                      {/* Burnout Bar */}
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 w-[85%] relative">
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 text-xs text-rose-200 mt-3">
                        <strong className="block text-rose-400 mb-1">Intervention Required:</strong>
                        Jeremy has 14 cancellations this week and 0 completed sessions. This 100% cancellation rate indicates severe burnout or a critical scheduling failure. Immediate clinical intervention and caseload review recommended.
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-border/50">
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="font-bold text-white text-sm">Ashley Beer</h4>
                          <p className="text-xs text-amber-400 font-medium">68% Burnout Probability</p>
                        </div>
                        <span className="text-xs font-mono text-slate-400">18 hrs / week</span>
                      </div>
                      
                      {/* Burnout Bar */}
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 w-[68%]"></div>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">13 missed sessions (8 canceled, 5 no-shows) indicates high caseload instability.</p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                      <Flame className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">You are thriving!</h3>
                    <p className="text-sm text-slate-400 max-w-[250px]">
                      Your AI Burnout Probability is currently at <strong>12%</strong>. You've maintained a healthy 18-hour clinical schedule with steady note completion rates.
                    </p>
                  </div>
                )}

              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Autonomous Management Directives (Reward / Punish) */}
        {isOwner && (
          <Card className="border-brand-500/30 bg-black shadow-xl shadow-brand-500/5 mt-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
            <CardHeader className="relative z-10 border-b border-border/50 bg-brand-500/5">
              <CardTitle className="flex items-center gap-2 text-white">
                <BrainCircuit className="h-5 w-5 text-brand-400" />
                AI Practice Manager: Autonomous Directives
              </CardTitle>
              <CardDescription className="text-slate-400">Algorithmic recommendations for staff compensation and corrective actions based on real-time P&L impact.</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Reward Section */}
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5 relative overflow-hidden group hover:bg-emerald-500/10 transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-emerald-400 uppercase tracking-widest text-sm">Action: Reward & Retain</h3>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-bold text-lg">
                      AM
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Alexander Marshi</h4>
                      <p className="text-sm text-emerald-400 font-mono">Generated: $3,630 | Retention: 91.67%</p>
                    </div>
                  </div>
                  <div className="bg-black/60 rounded-lg p-3 text-sm text-slate-300 border border-emerald-500/20">
                    <p><strong className="text-emerald-500">AI Analysis:</strong> Operating at peak efficiency. High retention is driving maximum LTV (Life-Time Value) per client.</p>
                    <p className="mt-2"><strong className="text-emerald-500">Autonomous Execution:</strong> Auto-drafted a <strong className="text-white">Q2 Performance Bonus of $250</strong> via Payroll integration and generated a congratulatory Slack message for your approval.</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">Approve Bonus</Button>
                  </div>
                </div>

                {/* Punish Section */}
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5 relative overflow-hidden group hover:bg-rose-500/10 transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    <h3 className="font-bold text-rose-400 uppercase tracking-widest text-sm">Action: Corrective PIP</h3>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300 font-bold text-lg">
                      AB
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Ashley Beer</h4>
                      <p className="text-sm text-rose-400 font-mono">Generated: $1,210 | Retention: 45.83%</p>
                    </div>
                  </div>
                  <div className="bg-black/60 rounded-lg p-3 text-sm text-slate-300 border border-rose-500/20">
                    <p><strong className="text-rose-500">AI Analysis:</strong> 45% retention rate and 13 missed sessions (8 canceled, 5 no-shows) is causing severe caseload instability and wasting marketing acquisition spend.</p>
                    <p className="mt-2"><strong className="text-rose-500">Autonomous Execution:</strong> Auto-drafted a <strong className="text-white">30-Day Performance Improvement Plan (PIP)</strong>, temporarily locked her SimplePractice intake calendar, and restricted her active caseload to 15 clients until retention improves above 75%.</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="danger" className="w-full">Execute PIP & Lock Calendar</Button>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
    </DashboardLayout>
  );
}

