'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useStore } from '@/lib/store';
import { ClientList } from '@/components/modules/ehr/ClientList';
import { AppointmentCalendar } from '@/components/modules/ehr/AppointmentCalendar';
import { StatCard } from '@/components/ui/StatCard';
import {
  Activity,
  Calendar,
  ClipboardList,
  Shield,
  Users,
} from 'lucide-react';

export default function EHRPage() {
  const { clients, appointments } = useStore();

  const totalClients = clients.length;
  const activeCases = clients.filter(c => c.status === 'active' || c.status === 'critical').length;
  const criticalCases = clients.filter(c => c.status === 'critical').length;
  
  const todayAppointments = appointments.filter(a => {
    // Basic date check for demo purposes (assuming today is the date of the first appointment)
    if (appointments.length === 0) return false;
    const today = appointments[0].time.split('T')[0];
    return a.time.startsWith(today);
  });
  
  const telehealthCount = todayAppointments.filter(a => a.type === 'telehealth').length;
  const inPersonCount = todayAppointments.filter(a => a.type === 'in-person').length;

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="page-title">Electronic Health Records</h1>
            <p className="page-subtitle">Manage client records, appointments, and clinical documentation</p>
          </div>
          <span className="hipaa-badge">
            <Shield className="h-3 w-3" /> PHI Protected
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clients"
          value={totalClients.toString()}
          change="Updated dynamically"
          changeType="neutral"
          icon={Users}
          iconColor="text-brand-600"
          iconBg="bg-brand-50"
        />
        <StatCard
          title="Appointments Today"
          value={todayAppointments.length.toString()}
          change={`${telehealthCount} telehealth, ${inPersonCount} in-person`}
          changeType="neutral"
          icon={Calendar}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatCard
          title="Pending Notes"
          value="4"
          change="Complete by end of day"
          changeType="neutral"
          icon={ClipboardList}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <StatCard
          title="Active Cases"
          value={activeCases.toString()}
          change={`${criticalCases} critical — review required`}
          changeType={criticalCases > 0 ? "down" : "up"}
          icon={Activity}
          iconColor="text-red-500"
          iconBg="bg-red-50"
        />
      </div>

      {/* Main content */}
      <div className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <ClientList />
        </div>
        <div className="xl:col-span-2">
          <AppointmentCalendar />
        </div>
      </div>
    </DashboardLayout>
  );
}
