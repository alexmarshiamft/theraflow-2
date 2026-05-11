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
  Filter
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

  // Operational Metrics Data
  const caseloadData = isOwner 
    ? { total: 198, practice: 162, independent: 30, other: 6 } // 6x Alexander's numbers
    : { total: 33, practice: 27, independent: 5, other: 1 };

  const appointmentsData = isOwner
    ? [
        { name: 'Show', value: 882, color: '#3b82f6' }, // 147 * 6
        { name: 'Canceled', value: 30, color: '#f59e0b' }, // 5 * 6
        { name: 'No show', value: 18, color: '#ef4444' }, // 3 * 6
      ]
    : [
        { name: 'Show', value: 147, color: '#3b82f6' },
        { name: 'Canceled', value: 5, color: '#f59e0b' },
        { name: 'No show', value: 3, color: '#ef4444' },
      ];

  const totalAppointments = appointmentsData.reduce((acc, curr) => acc + curr.value, 0);
  const showRate = Math.round((appointmentsData[0].value / totalAppointments) * 100);

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
          title={isOwner ? "Associate Splits" : "Practice Share"}
          value={formatCurrency(currentData.splits)}
          change={`${((currentData.splits / currentData.gross) * 100).toFixed(1)}% of gross`}
          changeType="neutral"
          icon={Users}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBg="bg-amber-50 dark:bg-amber-500/10"
        />
        <StatCard
          title={isOwner ? "Net Practice Income" : "Your Net Earnings"}
          value={formatCurrency(currentData.net)}
          change={isOwner ? "After splits & adjustments" : "After practice split"}
          changeType="up"
          icon={DollarSign}
          iconColor="text-brand-600 dark:text-brand-400"
          iconBg="bg-brand-50 dark:bg-brand-500/10"
        />
        <StatCard
          title="Avg Revenue / Session"
          value={formatCurrency(currentData.gross / ((currentData as any).sessions || 1))}
          change={`${(currentData as any).sessions || 0} sessions total`}
          changeType="neutral"
          icon={BarChart3}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-purple-50 dark:bg-purple-500/10"
        />
      </div>

      {/* Operational Metrics */}
      <div className="px-8 grid gap-6 md:grid-cols-2 mb-6">
        {/* Caseload Breakdown */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Client Caseload</CardTitle>
            <CardDescription>Total active clients and referral sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-2 space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-3xl font-bold text-foreground">{caseloadData.total}</span>
                  <span className="text-sm text-muted-foreground">Active Clients</span>
                </div>
                {/* Horizontal Stacked Bar */}
                <div className="w-full h-3 flex rounded-full overflow-hidden border border-border/50">
                  <div style={{ width: `${(caseloadData.practice/caseloadData.total)*100}%` }} className="bg-emerald-500 hover:brightness-110 transition-all" title={`Practice Referred: ${caseloadData.practice}`}></div>
                  <div style={{ width: `${(caseloadData.independent/caseloadData.total)*100}%` }} className="bg-violet-500 hover:brightness-110 transition-all" title={`Independently Referred: ${caseloadData.independent}`}></div>
                  <div style={{ width: `${(caseloadData.other/caseloadData.total)*100}%` }} className="bg-slate-500 hover:brightness-110 transition-all" title={`Other/Transfer: ${caseloadData.other}`}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-muted-foreground">Practice Referred</span>
                  </div>
                  <span className="font-medium text-foreground">{caseloadData.practice}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                    <span className="text-muted-foreground">Independently Referred</span>
                  </div>
                  <span className="font-medium text-foreground">{caseloadData.independent}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                    <span className="text-muted-foreground">Other / Transfer</span>
                  </div>
                  <span className="font-medium text-foreground">{caseloadData.other}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments & Retention */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Appointments & Retention</CardTitle>
            <CardDescription>Session show rates and cancellations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-8 mt-2">
              <div className="relative h-[160px] w-[160px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={appointmentsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {appointmentsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-foreground">{showRate}%</span>
                  <span className="text-xs text-muted-foreground font-medium text-center leading-tight mt-0.5">
                    {appointmentsData[0].value} <br/>Show
                  </span>
                </div>
              </div>
              <div className="flex-1 w-full space-y-3">
                {appointmentsData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-border flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Total Appointments</span>
                  <span className="font-bold text-foreground">{totalAppointments}</span>
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

        {/* Associate Performance Breakdown */}
        {isOwner && (
          <Card className="border-border shadow-sm flex flex-col">
            <CardHeader>
              <CardTitle>Top Producers</CardTitle>
              <CardDescription>By gross revenue generated</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-6 mt-2">
                {topAssociates.map((associate, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-foreground">{associate.name}</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(associate.gross)}
                      </span>
                    </div>
                    <div className="relative h-2.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(associate.gross / topAssociates[0].gross) * 100}%` }}
                      />
                      <div 
                        className="absolute top-0 left-0 h-full bg-amber-500/50 rounded-r-full"
                        style={{ width: `${(associate.split / topAssociates[0].gross) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{associate.sessions} sessions</span>
                      <span>Split: {formatCurrency(associate.split)}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full mt-6 text-brand-600 hover:text-brand-700 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-500/10">
                View All Associates
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

    </DashboardLayout>
  );
}

