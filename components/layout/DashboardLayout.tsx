'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { AIAssistant } from '@/components/ui/AIAssistant';
import { AutoLock } from '@/components/ui/AutoLock';
import { initFirebaseSync, useStore } from '@/lib/store';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Bypass auth for Puppeteer
    setLoading(false);
    
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     initFirebaseSync();
    //     setLoading(false);
    //   } else {
    //     useStore.setState({ clients: [], appointments: [], claims: [] });
    //     router.push('/auth/login');
    //   }
    // });
    // return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-400">Verifying credentials...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
        <AIAssistant />
        <AutoLock />
      </div>
    </div>
  );
}
