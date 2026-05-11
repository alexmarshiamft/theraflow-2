'use client';

import Link from 'next/link';
import { Shield, Bell, Search, ChevronDown, Menu, Eye, EyeOff, Lock, User, Phone } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { VoipDialer } from '@/components/voip/VoipDialer';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { privacyMode, setPrivacyMode, setIsLocked, userRole, setUserRole, activeCall } = useStore();
  const [showVoip, setShowVoip] = useState(false);

  useEffect(() => {
    if (privacyMode) {
      document.body.classList.add('privacy-enabled');
    } else {
      document.body.classList.remove('privacy-enabled');
    }
  }, [privacyMode]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 dark:backdrop-blur-md px-4 lg:px-6 transition-all duration-300">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative hidden flex-1 max-w-md md:flex">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search clients, records, transactions…"
          className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm text-foreground placeholder-muted-foreground focus:border-brand-400 focus:bg-background focus:outline-none focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-500/50 transition-colors"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Quick Lock Button */}
        <button 
          onClick={() => setIsLocked(true)}
          title="Lock Screen (HIPAA Auto-Lock)"
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors"
        >
          <Lock className="h-5 w-5" />
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* VOIP Toggle */}
        <button 
          onClick={() => setShowVoip(!showVoip)}
          title="Open Business Line"
          className={cn(
            "rounded-lg p-1.5 transition-colors relative",
            showVoip || activeCall ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : "text-muted-foreground hover:bg-muted"
          )}
        >
          <Phone className="h-5 w-5" />
          {activeCall && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />}
        </button>

        {/* Privacy Mode Toggle */}
        <button 
          onClick={() => setPrivacyMode(!privacyMode)}
          title={privacyMode ? "Disable Privacy Mode" : "Enable Privacy Mode"}
          className={`rounded-lg p-1.5 transition-colors ${privacyMode ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' : 'text-muted-foreground hover:bg-muted'}`}
        >
          {privacyMode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>

        {/* Role Toggle (Demo) */}
        <button 
          onClick={() => setUserRole(userRole === 'owner' ? 'associate' : 'owner')}
          title="Toggle User Role View"
          className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
        >
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">{userRole === 'owner' ? 'Owner View' : 'Associate View'}</span>
        </button>

        {/* HIPAA badge */}
        <span className={`hipaa-badge hidden sm:inline-flex transition-colors ${privacyMode ? 'border-amber-500/30 text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' : ''}`}>
          <Shield className="h-3 w-3" />
          HIPAA Secure
        </span>

        {/* Notifications */}
        <button className="relative rounded-lg p-1.5 text-muted-foreground hover:bg-muted">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand-500" />
        </button>

        {/* User menu */}
        <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
            {userRole === 'owner' ? 'SJ' : 'MC'}
          </span>
          <span className="hidden sm:block">{userRole === 'owner' ? 'Sarah Jenkins, LMFT' : 'Alexander Marshi, AMFT'}</span>
          <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
        </button>
      </div>

      {showVoip && <VoipDialer onClose={() => setShowVoip(false)} />}
    </header>
  );
}
