"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    toast.success("Signed in successfully!");
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 hero-pattern relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/6 rounded-full blur-[100px] animate-float-slow-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tertiary/4 rounded-full blur-[150px] animate-pulse-glow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black italic tracking-tighter text-primary font-headline">
            ParBase
          </Link>
          <h1 className="text-3xl font-headline font-bold mt-6 mb-2">Welcome Back</h1>
          <p className="text-on-surface-variant">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface-container/80 backdrop-blur-xl rounded-lg p-6 sm:p-8 ghost-border space-y-5 shadow-xl">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-error/10 border border-error/30 text-error px-4 py-3 rounded-md text-sm font-medium flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </motion.div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body ml-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-md px-4 py-3 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all placeholder:text-outline/60"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-md px-4 py-3 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all placeholder:text-outline/60"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-bold text-lg py-3 rounded-md ambient-shadow hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-on-surface-variant mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-primary font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
