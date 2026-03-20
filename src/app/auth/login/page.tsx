"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 hero-pattern">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black italic tracking-tighter text-primary font-headline">
            Impact Golf
          </Link>
          <h1 className="text-3xl font-headline font-bold mt-6 mb-2">Welcome Back</h1>
          <p className="text-on-surface-variant">Sign in to access your dashboard</p>
        </div>

        <form className="bg-surface-container rounded-3xl p-8 ghost-border space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-6 py-4 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all placeholder:text-outline/60"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-6 py-4 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all placeholder:text-outline/60"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-headline font-bold text-lg py-4 rounded-xl ambient-shadow hover:scale-[1.02] active:scale-95 transition-all"
          >
            Sign In
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
