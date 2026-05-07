'use client';

import Link from 'next/link';
import { Shield, Bell, Search, ChevronDown, Menu, Eye, EyeOff, Lock } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { privacyMode, setPrivacyMode, setIsLocked } = useStore();

  useEffect(() => {
    if (privacyMode) {
      document.body.classList.add('privacy-enabled');
    } else {
      document.body.classList.remove('privacy-enabled');
    }
  }, [privacyMode]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 lg:px-6 transition-all duration-300">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative hidden flex-1 max-w-md md:flex">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search clients, records, transactions…"
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 transition-colors"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Quick Lock Button */}
        <button 
          onClick={() => setIsLocked(true)}
          title="Lock Screen (HIPAA Auto-Lock)"
          className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <Lock className="h-5 w-5" />
        </button>

        {/* Privacy Mode Toggle */}
        <button 
          onClick={() => setPrivacyMode(!privacyMode)}
          title={privacyMode ? "Disable Privacy Mode" : "Enable Privacy Mode"}
          className={`rounded-lg p-1.5 transition-colors ${privacyMode ? 'bg-amber-100 text-amber-700' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          {privacyMode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>

        {/* HIPAA badge */}
        <span className={`hipaa-badge hidden sm:inline-flex transition-colors ${privacyMode ? 'border-amber-500/30 text-amber-600 bg-amber-50' : ''}`}>
          <Shield className="h-3 w-3" />
          HIPAA Secure
        </span>

        {/* Notifications */}
        <button className="relative rounded-lg p-1.5 text-gray-500 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand-500" />
        </button>

        {/* User menu */}
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
            SJ
          </span>
          <span className="hidden sm:block">Sarah Jenkins, LMFT</span>
          <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
        </button>
      </div>
    </header>
  );
}
