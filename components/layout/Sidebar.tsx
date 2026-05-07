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
  Rocket,
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

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
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-teal-500">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Theraflow</span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 lg:hidden"
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
                pathname.startsWith('/ehr') && 'active'
              )}
            >
              <Activity className="h-4 w-4" />
              Clinical & Telehealth
            </Link>
          </div>

          {/* Financial */}
          <div className="mb-6">
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Financial
            </p>
            <div className="flex flex-col gap-0.5">
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
              <Link
                href="/payroll"
                className={cn(
                  'sidebar-link',
                  pathname.startsWith('/payroll') && 'active'
                )}
              >
                <CreditCard className="h-4 w-4" />
                Payroll
              </Link>
              <Link
                href="/tax"
                className={cn(
                  'sidebar-link',
                  pathname.startsWith('/tax') && 'active'
                )}
              >
                <FileText className="h-4 w-4" />
                Tax
              </Link>
            </div>
          </div>

          {/* Settings */}
          <div>
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              System
            </p>
            <div className="flex flex-col gap-0.5">
              <Link
                href="#"
                className="sidebar-link"
              >
                <Users className="h-4 w-4" />
                Users & Roles
              </Link>
              <Link href="/compliance" className={cn("sidebar-link", pathname.startsWith('/compliance') && 'active')}>
                <Lock className="h-4 w-4" />
                Compliance
              </Link>
              <Link href="#" className="sidebar-link">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 space-y-3">
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
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-200 p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
