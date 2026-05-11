'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/lib/toast';
import { Button } from '@/components/ui/Button';
import { Sparkles, Loader2, Lock } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast('Successfully logged in!', 'success');
      router.push('/dashboard');
    } catch (err: any) {
      showToast(err.message || 'Failed to login', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-700 relative overflow-hidden">
       {/* Cinematic Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-500/10 rounded-full blur-[160px] pointer-events-none animate-pulse duration-10000"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-teal-500/10 rounded-full blur-[160px] pointer-events-none animate-pulse duration-7000"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      <div className="w-full max-w-md space-y-8 bg-card/60 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/5 animate-in fade-in zoom-in-95 duration-700 relative z-10">
        <div className="text-center relative">
           <div className="absolute top-[-40px] inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50 blur-[2px]"></div>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 border border-brand-500/20 shadow-inner mb-6 relative">
            <div className="absolute inset-0 bg-brand-500/20 rounded-2xl animate-ping opacity-20"></div>
            <Sparkles className="h-8 w-8 text-brand-500 relative z-10" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Theraflow</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Sign in to access your secure clinical dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Email Address</label>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-border bg-background/50 backdrop-blur-sm p-4 text-foreground focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all shadow-inner placeholder:text-muted-foreground/30"
                placeholder="doctor@theraflow.health"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Password</label>
              <input
                type="password"
                required
                className="w-full rounded-xl border border-border bg-background/50 backdrop-blur-sm p-4 text-foreground focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all shadow-inner placeholder:text-muted-foreground/30"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-14 text-lg font-bold shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all rounded-xl" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
            {loading ? 'Authenticating...' : 'Sign In'}
          </Button>
          
          <div className="flex flex-col items-center gap-4 mt-6">
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="font-bold text-brand-500 hover:text-brand-400 transition-colors">
                Start Free Trial
              </Link>
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-500/80 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 w-fit">
              <Lock className="w-3.5 h-3.5" />
              <span>HIPAA-COMPLIANT CONNECTION</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
