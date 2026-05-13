'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  Building2,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  Lock,
  Settings,
  Users,
  X,
  MessageSquare,
  Rocket,
  Clock,
  Mail,
  BarChart3,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'EHR',
    href: '/ehr',
    icon: Activity,
    group: 'Clinical',
  },
  {
    label: 'Supervision',
    href: '/supervision',
    icon: ClipboardList,
    group: 'Clinical',
  },
  {
    label: 'Hours',
    href: '/hours',
    icon: Clock,
    group: 'Clinical',
  },
  {
    label: 'Banking',
    href: '/banking',
    icon: Building2,
    group: 'Financial',
  },
  {
    label: 'Payroll',
    href: '/payroll',
    icon: Users,
    group: 'Financial',
  },
  {
    label: 'Tax',
    href: '/tax',
    icon: FileText,
    group: 'Financial',
  },
  {
    label: 'Intelligence',
    href: '/intelligence',
    icon: Activity,
    group: 'Clinical',
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: MessageSquare,
    group: 'Clinical',
  },
  {
    label: 'Email',
    href: '/mail',
    icon: Mail,
    group: 'Communications',
  },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const userRole = useStore(state => state.userRole);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-300 lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-teal-500 shrink-0">
              <Activity className="h-4 w-4 text-white" />
            </div>
            {userRole === 'associate' ? (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground leading-tight truncate w-40">Marshi Family Therapy</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Theraflow</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-foreground">Theraflow</span>
            )}
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {/* Main */}
          <div className="mb-6">
            <Link
              href="/dashboard"
              className={cn(
                'sidebar-link',
                pathname === '/dashboard' && 'active'
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            
            <Link
              href="/features"
              className={cn(
                'sidebar-link mt-1 text-brand-600',
                pathname === '/features' && 'active'
              )}
            >
              <Rocket className="h-4 w-4" />
              100+ Features
            </Link>
            
            <Link
              href="/platform/future-founders"
              className={cn(
                'sidebar-link mt-1',
                pathname === '/platform/future-founders' && 'active'
              )}
            >
              <div className="h-4 w-4 rounded bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <span className="text-[10px] text-white font-bold leading-none">F</span>
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 font-medium">Future Founders</span>
            </Link>
          </div>

          {/* Clinical */}
          <div className="mb-6">
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Clinical
            </p>
            <Link
              href="/ehr"
              className={cn(
                'sidebar-link',
                pathname === '/ehr' && 'active'
              )}
            >
              <Activity className="h-4 w-4" />
              Overview
            </Link>
            <Link
              href="/ehr/notes"
              className={cn(
                'sidebar-link',
                pathname === '/ehr/notes' && 'active'
              )}
            >
              <FileText className="h-4 w-4" />
              AI Clinical Notes
            </Link>
            <Link
              href="/ehr/roadmap"
              className={cn(
                'sidebar-link',
                pathname === '/ehr/roadmap' && 'active'
              )}
            >
              <ClipboardList className="h-4 w-4" />
              Treatment Roadmap
            </Link>
            <Link
              href="/intelligence/churn"
              className={cn(
                'sidebar-link mt-2 text-amber-500 hover:text-amber-400',
                pathname === '/intelligence/churn' && 'active'
              )}
            >
              <Activity className="h-4 w-4" />
              Predictive Churn
            </Link>
          </div>

          {/* Financial */}
          <div className="mb-6">
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Financial
            </p>
            <div className="flex flex-col gap-0.5">
              {userRole !== 'associate' && (
                <Link
                  href="/claims"
                  className={cn(
                    'sidebar-link',
                    pathname.startsWith('/claims') && 'active'
                  )}
                >
                  <ClipboardList className="h-4 w-4" />
                  Claims & Clearinghouse
                </Link>
              )}
              <Link
                href="/banking"
                className={cn(
                  'sidebar-link',
                  pathname.startsWith('/banking') && 'active'
                )}
              >
                <Building2 className="h-4 w-4" />
                Banking
              </Link>
              {userRole !== 'associate' && (
                <>
                  <Link
                    href="/payroll"
                    className={cn(
                      'sidebar-link',
                      pathname === '/payroll' && 'active'
                    )}
                  >
                    <CreditCard className="h-4 w-4" />
                    Payroll
                  </Link>
                  <Link
                    href="/payroll/liquid"
                    className={cn(
                      'sidebar-link',
                      pathname === '/payroll/liquid' && 'active'
                    )}
                  >
                    <Zap className="h-4 w-4 text-brand-400" />
                    Liquid Treasury
                  </Link>
                  <Link
                    href="/financial/credentialing"
                    className={cn(
                      'sidebar-link',
                      pathname === '/financial/credentialing' && 'active'
                    )}
                  >
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Credentialing
                  </Link>
                </>
              )}
              <Link
                href="/analytics"
                className={cn(
                  'sidebar-link',
                  pathname.startsWith('/analytics') && 'active'
                )}
              >
                <BarChart3 className="h-4 w-4 text-emerald-400" />
                Analytics
              </Link>
              {userRole === 'associate' && (
                <Link
                  href="/earnings"
                  className={cn(
                    'sidebar-link',
                    pathname.startsWith('/earnings') && 'active'
                  )}
                >
                  <CreditCard className="h-4 w-4" />
                  Earnings & Paystubs
                </Link>
              )}
              <Link
                href="/tax"
                className={cn(
                  'sidebar-link',
                  pathname.startsWith('/tax') && 'active'
                )}
              >
                <FileText className="h-4 w-4" />
                {userRole === 'associate' ? 'Tax Documents' : 'Tax'}
              </Link>
            </div>
          </div>

          {/* Communications */}
          <div className="mb-6">
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Communications
            </p>
            <div className="flex flex-col gap-0.5">
              <Link
                href="/messages"
                className={cn(
                  'sidebar-link',
                  pathname.startsWith('/messages') && 'active'
                )}
              >
                <MessageSquare className="h-4 w-4" />
                Messages
              </Link>
              <Link
                href="/mail"
                className={cn(
                  'sidebar-link',
                  pathname.startsWith('/mail') && 'active'
                )}
              >
                <Mail className="h-4 w-4" />
                Email
              </Link>
            </div>
          </div>

          {/* Settings */}
          <div>
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              System
            </p>
            <div className="flex flex-col gap-0.5">
              {userRole !== 'associate' && (
                <>
                  <Link
                    href="/staff"
                    className={cn(
                      "sidebar-link",
                      pathname.startsWith('/staff') && 'active'
                    )}
                  >
                    <Users className="h-4 w-4" />
                    Staff
                  </Link>
                  <Link href="/compliance" className={cn("sidebar-link", pathname.startsWith('/compliance') && 'active')}>
                    <Lock className="h-4 w-4" />
                    Compliance
                  </Link>
                </>
              )}
              <Link href="#" className="sidebar-link">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4 space-y-3">
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
            <div className="flex items-center gap-2 mb-1">
              <Lock className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-800">HIPAA Compliant</span>
            </div>
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              All data encrypted at rest & in transit. Audit logs enabled.
            </p>
          </div>
          <button 
            onClick={() => {
              import('@/lib/firebase').then(({ auth }) => {
                import('firebase/auth').then(({ signOut }) => signOut(auth));
              });
            }}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-border p-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
