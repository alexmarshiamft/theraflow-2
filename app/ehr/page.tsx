'use client';
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useStore } from '@/lib/store';
import { ClientList } from '@/components/modules/ehr/ClientList';
import { AppointmentCalendar } from '@/components/modules/ehr/AppointmentCalendar';
import { AIScribeModal } from '@/components/modules/ehr/AIScribeModal';
import { BurnoutRadar } from '@/components/modules/intelligence/BurnoutRadar';
import { StatCard } from '@/components/ui/StatCard';
import {
  Activity,
  Calendar,
  ClipboardList,
  Shield,
  Users,
  Mic
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function EHRPage() {
  const { clients, appointments } = useStore();
  const [isScribeOpen, setIsScribeOpen] = useState(false);

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
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setIsScribeOpen(true)}
              className="bg-brand-600 hover:bg-brand-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-brand-400/50"
            >
              <Mic className="mr-2 h-4 w-4" />
              Start Ambient Scribe
            </Button>
            <span className="hipaa-badge">
              <Shield className="h-3 w-3" /> PHI Protected
            </span>
          </div>
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
      <div className="grid gap-6 xl:grid-cols-12 mb-6">
        <div className="xl:col-span-8">
          <ClientList />
        </div>
        <div className="xl:col-span-4 flex flex-col gap-6">
          <BurnoutRadar />
          <AppointmentCalendar />
        </div>
      </div>

      <AIScribeModal 
        isOpen={isScribeOpen} 
        onClose={() => setIsScribeOpen(false)} 
        clientName="Select a client..."
      />
    </DashboardLayout>
  );
}
