'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MoreHorizontal, Shield, Sparkles, UserPlus, Clock, CheckCircle2, Activity, AlertTriangle, CalendarCheck, FileText, TrendingUp, Gift, GraduationCap, Briefcase, HeartPulse, Umbrella, Wallet } from 'lucide-react';
import { SupervisionCopilot } from '@/components/modules/intelligence/SupervisionCopilot';
import { AiTimesheetLog } from '@/components/modules/intelligence/AiTimesheetLog';

const mockStaff = [
  {
    id: '1',
    name: 'Alexander Marshi',
    role: 'Associate Therapist',
    credentials: 'AMFT',
    status: 'Active',
    totalCompleted: 92,
    totalMissed: 5,
    totalScheduled: 97,
    retention: '94.85%',
    attrition: '5.15%',
    email: 'alexander.m@marshi.therapy',
    phone: '(555) 234-5678',
    avatar: 'AM',
  },
  {
    id: '2',
    name: 'Benjamin Raskin',
    role: 'Associate Therapist',
    credentials: 'AMFT',
    status: 'Active',
    totalCompleted: 54,
    totalMissed: 5,
    totalScheduled: 59,
    retention: '91.53%',
    attrition: '8.47%',
    email: 'benjamin.r@marshi.therapy',
    phone: '(555) 123-4567',
    avatar: 'BR',
  },
  {
    id: '3',
    name: 'Aaron Kuyper',
    role: 'Associate Therapist',
    credentials: 'AMFT',
    status: 'Active',
    totalCompleted: 40,
    totalMissed: 9,
    totalScheduled: 49,
    retention: '81.63%',
    attrition: '18.37%',
    email: 'aaron.k@marshi.therapy',
    phone: '(555) 345-6789',
    avatar: 'AK',
  },
  {
    id: '4',
    name: 'Lisa Garratt',
    role: 'Associate Therapist',
    credentials: 'AMFT',
    status: 'Active',
    totalCompleted: 35,
    totalMissed: 9,
    totalScheduled: 44,
    retention: '79.55%',
    attrition: '20.45%',
    email: 'lisa.g@marshi.therapy',
    phone: '(555) 456-7890',
    avatar: 'LG',
  },
  {
    id: '5',
    name: 'Kiran Dave',
    role: 'Associate Therapist',
    credentials: 'AMFT',
    status: 'Active',
    totalCompleted: 70,
    totalMissed: 21,
    totalScheduled: 91,
    retention: '76.92%',
    attrition: '23.08%',
    email: 'kiran.d@marshi.therapy',
    phone: '(555) 567-8901',
    avatar: 'KD',
  },
  {
    id: '6',
    name: 'Eliana Nivon',
    role: 'Associate Therapist',
    credentials: 'AMFT',
    status: 'Active',
    totalCompleted: 69,
    totalMissed: 21,
    totalScheduled: 90,
    retention: '76.67%',
    attrition: '23.33%',
    email: 'eliana.n@marshi.therapy',
    phone: '(555) 678-9012',
    avatar: 'EN',
  },
  {
    id: '7',
    name: 'Juen Marc',
    role: 'Associate Therapist',
    credentials: 'AMFT',
    status: 'Active',
    totalCompleted: 50,
    totalMissed: 17,
    totalScheduled: 67,
    retention: '74.63%',
    attrition: '25.37%',
    email: 'juen.m@marshi.therapy',
    phone: '(555) 789-0123',
    avatar: 'JM',
  },
  {
    id: '8',
    name: 'Iliana Canez',
    role: 'Associate Therapist',
    credentials: 'AMFT',
    status: 'Active',
    totalCompleted: 15,
    totalMissed: 6,
    totalScheduled: 21,
    retention: '71.43%',
    attrition: '28.57%',
    email: 'iliana.c@marshi.therapy',
    phone: '(555) 890-1234',
    avatar: 'IC',
  },
  {
    id: '9',
    name: 'Kalaya Irby',
    role: 'Associate Therapist',
    credentials: 'AMFT',
    status: 'Active',
    totalCompleted: 70,
    totalMissed: 33,
    totalScheduled: 103,
    retention: '67.96%',
    attrition: '32.04%',
    email: 'kalaya.i@marshi.therapy',
    phone: '(555) 901-2345',
    avatar: 'KI',
  },
  {
    id: '10',
    name: 'Ashley Beer',
    role: 'Associate Therapist',
    credentials: 'AMFT',
    status: 'Active',
    totalCompleted: 21,
    totalMissed: 18,
    totalScheduled: 39,
    retention: '53.85%',
    attrition: '46.15%',
    email: 'ashley.b@marshi.therapy',
    phone: '(555) 012-3456',
    avatar: 'AB',
  }
];

export default function StaffPage() {
  const { userRole } = useStore();

  if (userRole === 'associate') {
    return (
      <DashboardLayout>
        <div className="flex h-[80vh] items-center justify-center flex-col gap-4">
          <Shield className="h-16 w-16 text-rose-500/50" />
          <h1 className="text-2xl font-bold text-foreground">Access Restricted</h1>
          <p className="text-muted-foreground">Only practice owners can access the staff directory.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-header mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">Team Management</h1>
            <p className="page-subtitle text-slate-300">Manage your clinical staff, session compliance, and retention metrics.</p>
            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
              <CalendarCheck className="h-3 w-3 text-brand-400" />
              <span className="text-xs font-medium text-brand-300">Date Range: 4/12/26 - 5/9/26</span>
            </div>
          </div>
          <Button className="bg-brand-600 hover:bg-brand-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Staff
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card className="bg-slate-800/80 backdrop-blur-xl border-white/10 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-300 flex items-center justify-between">
              Total Scheduled
              <Activity className="h-4 w-4 text-brand-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{mockStaff.reduce((sum, s) => sum + s.totalScheduled, 0)}</div>
            <p className="text-xs text-brand-300 mt-1 font-medium">
              Sessions booked this period
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/80 backdrop-blur-xl border-white/10 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-300 flex items-center justify-between">
              Total Completed
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{mockStaff.reduce((sum, s) => sum + s.totalCompleted, 0)}</div>
            <p className="text-xs text-emerald-300 mt-1 font-medium">
              {(mockStaff.reduce((sum, s) => sum + s.totalCompleted, 0) / mockStaff.reduce((sum, s) => sum + s.totalScheduled, 0) * 100).toFixed(2)}% Overall Retention
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/80 backdrop-blur-xl border-white/10 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-300 flex items-center justify-between">
              Total Missed
              <AlertTriangle className="h-4 w-4 text-rose-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-400">{mockStaff.reduce((sum, s) => sum + s.totalMissed, 0)}</div>
            <p className="text-xs text-rose-300/80 mt-1 font-medium">
              Cancellations / No-shows
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/80 backdrop-blur-xl border-white/10 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-300 flex items-center justify-between">
              Avg Attrition Rate
              <TrendingUp className="h-4 w-4 text-amber-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-400">
              {(mockStaff.reduce((sum, s) => sum + s.totalMissed, 0) / mockStaff.reduce((sum, s) => sum + s.totalScheduled, 0) * 100).toFixed(2)}%
            </div>
            <p className="text-xs text-amber-300/80 mt-1 font-medium">
              System-wide attrition
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
            <Sparkles className="h-5 w-5 text-indigo-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">AI Insight: Performance Bonus Recommendation</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              <strong className="text-indigo-300">Alexander Marshi</strong> has completed 92 sessions this period with an exceptional 94.85% retention rate, consistently placing in the highest 50% compensation tier.
            </p>
            <div className="bg-slate-900/60 rounded-xl p-4 border border-white/5">
              <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Smart Tax-Advantaged Reward Strategies
              </h4>
              <ul className="text-sm text-slate-400 space-y-2 list-disc pl-5">
                <li><strong className="text-slate-300">HSA Contribution:</strong> Make an employer contribution to their Health Savings Account (tax-free for both employer and employee).</li>
                <li><strong className="text-slate-300">Educational Assistance:</strong> Provide up to $5,250/yr in tax-free reimbursement for student loans or coursework.</li>
                <li><strong className="text-slate-300">Working Condition Fringe:</strong> Reward with an advanced clinical training certification or conference ticket (avoids all payroll taxes).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {userRole === 'owner' && (
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <SupervisionCopilot />
          <div className="-mt-6">
            <AiTimesheetLog />
          </div>
        </div>
      )}

      <div className="mb-8 p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-500"></div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-400" />
              Tiered Compensation Model
            </h2>
            <p className="text-sm text-slate-400 mt-1">Integrated Therapy and Recovery Employment Agreement (Sharing Percentage Table)</p>
          </div>
          <Badge variant="default" className="bg-brand-500/10 text-brand-400 border-brand-500/20">Active Policy</Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-5 rounded-xl bg-slate-800/50 border border-emerald-500/20 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:bg-slate-800/80 transition-all">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-3xl font-bold text-emerald-400 mb-1">50%</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">40+ Sessions</span>
          </div>
          <div className="p-5 rounded-xl bg-slate-800/50 border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:bg-slate-800/80 transition-all">
            <span className="text-3xl font-bold text-white mb-1">40%</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">30 to 39 Sessions</span>
          </div>
          <div className="p-5 rounded-xl bg-slate-800/50 border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:bg-slate-800/80 transition-all">
            <span className="text-3xl font-bold text-white mb-1">30%</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">20 to 29 Sessions</span>
          </div>
          <div className="p-5 rounded-xl bg-slate-800/50 border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:bg-slate-800/80 transition-all">
            <span className="text-3xl font-bold text-white mb-1">20%</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">10 to 19 Sessions</span>
          </div>
          <div className="p-5 rounded-xl bg-slate-800/50 border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:bg-slate-800/80 transition-all">
            <span className="text-3xl font-bold text-white mb-1">10%</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">1 to 9 Sessions</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {mockStaff.map((staff) => (
          <Card key={staff.id} className="bg-slate-800/80 backdrop-blur-2xl border-white/10 shadow-2xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-1000 ease-in-out ${staff.role.includes('Supervisor') ? 'bg-amber-500/10' : 'bg-brand-500/10'}`} />
            
            <CardHeader className="relative z-10 pb-4 border-b border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold shadow-lg ${staff.role.includes('Supervisor') ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white' : 'bg-gradient-to-br from-brand-400 to-indigo-600 text-white'}`}>
                    {staff.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
                      {staff.name}
                      {staff.role.includes('Supervisor') && (
                        <Shield className="h-4 w-4 text-amber-400" />
                      )}
                    </h3>
                    <p className="text-sm text-slate-300">{staff.role}</p>
                  </div>
                </div>
                <Badge variant="default" className={
                  staff.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-medium' : 
                  'bg-amber-500/10 text-amber-400 border-amber-500/20 font-medium'
                }>
                  {staff.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10 pt-5 space-y-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Completed</p>
                  <p className="text-xl font-bold text-white">{staff.totalCompleted}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Missed</p>
                  <p className={`text-xl font-bold ${staff.totalMissed > 10 ? 'text-rose-400' : 'text-amber-400'}`}>
                    {staff.totalMissed}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Retention</p>
                  <p className={`text-xl font-bold ${parseFloat(staff.retention) >= 90 ? 'text-emerald-400' : parseFloat(staff.retention) >= 75 ? 'text-brand-400' : 'text-rose-400'}`}>
                    {staff.retention}
                  </p>
                </div>
              </div>

              <div className="space-y-3 bg-slate-900/40 p-3 rounded-xl border border-white/5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-medium flex items-center gap-2"><CalendarCheck className="h-4 w-4" /> Total Scheduled</span>
                  <span className="font-bold text-white">{staff.totalScheduled}</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-white/5">
                  <span className="text-slate-400 font-medium flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-rose-500/70" /> Attrition Rate</span>
                  <span className="text-rose-400 font-mono bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 font-semibold">{staff.attrition}</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-white/5">
                  <span className="text-slate-400 font-medium flex items-center gap-2"><Mail className="h-4 w-4" /> Email</span>
                  <span className="text-slate-300 truncate ml-4 font-medium">{staff.email}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-brand-600/10 hover:bg-brand-600/20 text-brand-300 border border-brand-500/20 font-semibold" variant="outline">
                  View Auth Details
                </Button>
                <Button className="px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10" variant="outline">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 mb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Gift className="h-6 w-6 text-pink-400" />
              Tax-Advantaged Benefits Marketplace
            </h2>
            <p className="text-sm text-slate-400 mt-1">Reward high performers while optimizing payroll taxes and maintaining practice margins.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-slate-800/40 border-white/10 relative overflow-hidden group hover:bg-slate-800/60 transition-all cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <HeartPulse className="h-6 w-6 text-emerald-400" />
                </div>
                <Badge variant="default" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">0% Payroll Tax</Badge>
              </div>
              <CardTitle className="text-lg font-bold text-white mt-4">HSA Contributions</CardTitle>
              <p className="text-sm text-slate-300 mt-1">Employer contributions to a Health Savings Account.</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 pt-2 border-t border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Max Annual limit</span>
                  <span className="text-white font-mono">$4,150 (Ind)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Employer FICA Savings</span>
                  <span className="text-emerald-400 font-medium">7.65%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/40 border-white/10 relative overflow-hidden group hover:bg-slate-800/60 transition-all cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <GraduationCap className="h-6 w-6 text-indigo-400" />
                </div>
                <Badge variant="default" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Tax-Free to Staff</Badge>
              </div>
              <CardTitle className="text-lg font-bold text-white mt-4">Educational Assistance</CardTitle>
              <p className="text-sm text-slate-300 mt-1">Section 127 reimbursement for tuition or student loans.</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 pt-2 border-t border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Max Annual limit</span>
                  <span className="text-white font-mono">$5,250</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Employer FICA Savings</span>
                  <span className="text-emerald-400 font-medium">7.65%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/40 border-white/10 relative overflow-hidden group hover:bg-slate-800/60 transition-all cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 rounded-xl bg-brand-500/20 flex items-center justify-center border border-brand-500/30">
                  <Briefcase className="h-6 w-6 text-brand-400" />
                </div>
                <Badge variant="default" className="bg-brand-500/10 text-brand-400 border-brand-500/20">Fully Deductible</Badge>
              </div>
              <CardTitle className="text-lg font-bold text-white mt-4">Working Condition Fringe</CardTitle>
              <p className="text-sm text-slate-300 mt-1">Advanced clinical certifications, EMDR, or Gottman training.</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 pt-2 border-t border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Max Annual limit</span>
                  <span className="text-white font-mono">No Limit</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Employer FICA Savings</span>
                  <span className="text-emerald-400 font-medium">7.65%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/40 border-white/10 relative overflow-hidden group hover:bg-slate-800/60 transition-all cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                  <Umbrella className="h-6 w-6 text-rose-400" />
                </div>
                <Badge variant="default" className="bg-rose-500/10 text-rose-400 border-rose-500/20">Emergency Only</Badge>
              </div>
              <CardTitle className="text-lg font-bold text-white mt-4">Section 139 Disaster Relief</CardTitle>
              <p className="text-sm text-slate-300 mt-1">Tax-free payments during federally declared disasters.</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 pt-2 border-t border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Max Annual limit</span>
                  <span className="text-white font-mono">Varies</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Employer FICA Savings</span>
                  <span className="text-emerald-400 font-medium">7.65%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/40 border-white/10 relative overflow-hidden group hover:bg-slate-800/60 transition-all cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                  <Wallet className="h-6 w-6 text-amber-400" />
                </div>
                <Badge variant="default" className="bg-amber-500/10 text-amber-400 border-amber-500/20">Tax-Deferred</Badge>
              </div>
              <CardTitle className="text-lg font-bold text-white mt-4">401(k) Safe Harbor Match</CardTitle>
              <p className="text-sm text-slate-300 mt-1">Employer matching contributions avoid FICA taxes completely.</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 pt-2 border-t border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Max Annual Match</span>
                  <span className="text-white font-mono">Typically 3-4%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Employer FICA Savings</span>
                  <span className="text-emerald-400 font-medium">7.65%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
