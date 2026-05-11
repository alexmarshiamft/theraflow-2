'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ClinicalNotesGenerator } from '@/components/modules/ehr/ClinicalNotesGenerator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotesPage() {
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-2rem)] flex flex-col pt-6 px-8 pb-8 gap-4">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/ehr">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-800 text-slate-400">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Clinical Documentation</h1>
            <p className="text-slate-400 text-sm">Session notes for Alexander Marshi, ASW</p>
          </div>
        </div>
        
        {/* Main Generator View */}
        <div className="flex-1 min-h-[600px]">
          <ClinicalNotesGenerator />
        </div>
      </div>
    </DashboardLayout>
  );
}
