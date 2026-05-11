'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/lib/toast';
import { Button } from '@/components/ui/Button';
import { Sparkles, Loader2, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeBaa, setAgreeBaa] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showToast('Account created successfully!', 'success');
      router.push('/dashboard');
    } catch (err: any) {
      showToast(err.message || 'Failed to create account', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-700 relative overflow-hidden">
      {/* Cinematic Background Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-500/10 rounded-full blur-[160px] pointer-events-none animate-pulse duration-10000"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-500/10 rounded-full blur-[160px] pointer-events-none animate-pulse duration-7000"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      <div className="w-full max-w-md space-y-8 bg-card/60 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/5 animate-in fade-in zoom-in-95 duration-700 relative z-10">
        <div className="text-center relative">
          <div className="absolute top-[-40px] inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50 blur-[2px]"></div>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 border border-brand-500/20 shadow-inner mb-6 relative">
             <div className="absolute inset-0 bg-brand-500/20 rounded-2xl animate-ping opacity-20"></div>
            <UserPlus className="h-8 w-8 text-brand-500 relative z-10" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Start Free Trial</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Create your secure HIPAA-compliant practice account
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Practice Email</label>
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
                minLength={6}
              />
            </div>
          </div>

          <div className="space-y-4 bg-background/30 p-5 rounded-2xl border border-border">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center mt-0.5 shrink-0">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 rounded border-2 border-muted-foreground peer-checked:bg-brand-500 peer-checked:border-brand-500 transition-colors flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
              </div>
              <div className="text-sm">
                <span className="font-bold text-foreground block mb-1">
                  Terms & Privacy Policy
                </span>
                <p className="text-muted-foreground text-xs leading-relaxed group-hover:text-foreground/80 transition-colors">I agree to the <Link href="/legal/terms" className="text-brand-500 hover:underline">Terms of Service</Link> and Privacy Policy.</p>
              </div>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer group pt-4 border-t border-white/5">
              <div className="relative flex items-center mt-0.5 shrink-0">
                <input
                  id="baa"
                  type="checkbox"
                  required
                  checked={agreeBaa}
                  onChange={(e) => setAgreeBaa(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 rounded border-2 border-muted-foreground peer-checked:bg-brand-500 peer-checked:border-brand-500 transition-colors flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
              </div>
              <div className="text-sm">
                <span className="font-bold text-foreground block mb-1">
                  Business Associate Agreement
                </span>
                <p className="text-muted-foreground text-xs leading-relaxed group-hover:text-foreground/80 transition-colors">I agree to the <Link href="/legal/baa" className="text-brand-500 hover:underline">BAA</Link> for handling Protected Health Information (PHI).</p>
              </div>
            </label>
          </div>

          <Button type="submit" className="w-full h-14 text-lg font-bold shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all rounded-xl" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
            {loading ? 'Cryptographic Key Generation...' : 'Create Secure Account'}
          </Button>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-bold text-brand-500 hover:text-brand-400 transition-colors">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
