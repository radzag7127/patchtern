'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const MAX_ATTEMPTS = 3;
const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes
const STORAGE_KEY = 'admin_login_attempts';

interface LoginAttempt {
  count: number;
  lockedUntil: number | null;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState<LoginAttempt>({ count: 0, lockedUntil: null });
  const [remainingTime, setRemainingTime] = useState(0);

  // Load attempts from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: LoginAttempt = JSON.parse(stored);

      // Check if cooldown expired
      if (data.lockedUntil && data.lockedUntil < Date.now()) {
        // Reset attempts after cooldown
        const reset = { count: 0, lockedUntil: null };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
        setAttempts(reset);
      } else {
        setAttempts(data);
      }
    }
  }, []);

  // Update remaining time countdown
  useEffect(() => {
    if (attempts.lockedUntil && attempts.lockedUntil > Date.now()) {
      const interval = setInterval(() => {
        const remaining = attempts.lockedUntil! - Date.now();
        if (remaining <= 0) {
          // Cooldown expired
          const reset = { count: 0, lockedUntil: null };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
          setAttempts(reset);
          setRemainingTime(0);
        } else {
          setRemainingTime(remaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [attempts.lockedUntil]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setWarning('');

    // Check if account is locked
    if (attempts.lockedUntil && attempts.lockedUntil > Date.now()) {
      const minutes = Math.ceil((attempts.lockedUntil - Date.now()) / 60000);
      setError(`Too many failed attempts. Please try again in ${minutes} minute${minutes > 1 ? 's' : ''}.`);
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Failed login - increment attempts
      const newCount = attempts.count + 1;
      const remainingAttempts = MAX_ATTEMPTS - newCount;

      if (newCount >= MAX_ATTEMPTS) {
        // Lock account
        const lockedUntil = Date.now() + COOLDOWN_MS;
        const newAttempts = { count: newCount, lockedUntil };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newAttempts));
        setAttempts(newAttempts);
        setError(`Too many failed attempts. Your account has been locked for 5 minutes.`);
      } else {
        // Show warning
        const newAttempts = { count: newCount, lockedUntil: null };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newAttempts));
        setAttempts(newAttempts);
        setError(error.message);

        if (remainingAttempts === 1) {
          setWarning(`⚠️ Warning: Only 1 attempt remaining before 5-minute suspension!`);
        } else if (remainingAttempts === 2) {
          setWarning(`⚠️ Warning: ${remainingAttempts} attempts remaining before suspension.`);
        }
      }
      setLoading(false);
    } else {
      // Success - reset attempts
      localStorage.removeItem(STORAGE_KEY);
      setAttempts({ count: 0, lockedUntil: null });
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-subtle-light">Patchtern Dashboard</p>
        </div>

        <div className="bg-white rounded-lg border border-border-light p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="admin@patchtern.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>

            {/* Warning Message */}
            {warning && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm font-medium">
                {warning}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                {error}
              </div>
            )}

            {/* Countdown Timer */}
            {remainingTime > 0 && (
              <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-900 text-sm text-center font-bold">
                Account locked. Try again in: {Math.floor(remainingTime / 60000)}:{String(Math.floor((remainingTime % 60000) / 1000)).padStart(2, '0')}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || (attempts.lockedUntil !== null && attempts.lockedUntil > Date.now())}
              className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : remainingTime > 0 ? 'Account Locked' : 'Login'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-subtle-light mt-6">
          No registration available. Contact admin to create account.
        </p>
      </div>
    </div>
  );
}
