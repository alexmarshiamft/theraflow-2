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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 mb-4">
            <UserPlus className="h-6 w-6 text-brand-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Start Free Trial</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your secure HIPAA-compliant practice account
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="text-sm font-medium text-gray-700">Practice Email</label>
              <input
                type="email"
                required
                className="mt-1 w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="doctor@theraflow.health"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                className="mt-1 w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  Terms & Privacy Policy
                </label>
                <p className="text-gray-500">I agree to the <Link href="/legal/terms" className="text-brand-600 hover:underline">Terms of Service</Link> and Privacy Policy.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="baa"
                  name="baa"
                  type="checkbox"
                  required
                  checked={agreeBaa}
                  onChange={(e) => setAgreeBaa(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="baa" className="font-medium text-gray-700">
                  Business Associate Agreement (BAA)
                </label>
                <p className="text-gray-500">I agree to the <Link href="/legal/baa" className="text-brand-600 hover:underline">BAA</Link> for handling Protected Health Information (PHI) and assume liability for data uploaded to this platform.</p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-11" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold text-brand-600 hover:text-brand-500">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
