"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 hero-pattern">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black italic tracking-tighter text-primary font-headline">
            Impact Golf
          </Link>
          <h1 className="text-3xl font-headline font-bold mt-6 mb-2">
            Join the <span className="text-secondary">Movement</span>
          </h1>
          <p className="text-on-surface-variant">Create your account and start making an impact</p>
        </div>

        <form className="bg-surface-container rounded-3xl p-8 ghost-border space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-5 py-3 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all placeholder:text-outline/60"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-5 py-3 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all placeholder:text-outline/60"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-5 py-3 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all placeholder:text-outline/60"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-5 py-3 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all placeholder:text-outline/60"
            />
          </div>

          {/* Charity Selection at Signup per spec */}
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">
              Choose Your Charity
            </label>
            <select className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-5 py-3 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all">
              <option value="">Select a charity...</option>
              <option value="save-the-oceans">Save the Oceans</option>
              <option value="junior-golf-fund">Junior Golf Fund</option>
              <option value="green-links">Green Links Reforestation</option>
              <option value="heart-health">Heart Health Foundation</option>
              <option value="literacy-for-all">Literacy for All</option>
              <option value="tech-for-good">Tech for Good</option>
            </select>
          </div>

          {/* Contribution % per spec: min 10% */}
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">
              Charity Contribution: <span className="text-primary">10%</span> (minimum)
            </label>
            <input
              type="range"
              min="10"
              max="50"
              defaultValue="10"
              className="w-full accent-primary"
            />
            <p className="text-xs text-on-surface-variant">
              A minimum of 10% of your subscription goes to your chosen charity. You can increase this anytime.
            </p>
          </div>

          {/* Plan Selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">
              Subscription Plan
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="relative cursor-pointer">
                <input type="radio" name="plan" value="monthly" className="peer sr-only" defaultChecked />
                <div className="bg-surface-container-low rounded-xl p-4 text-center ghost-border peer-checked:ring-2 peer-checked:ring-primary peer-checked:bg-surface-container-high transition-all">
                  <div className="font-headline font-bold">Monthly</div>
                  <div className="text-primary font-black text-lg">£9.99</div>
                </div>
              </label>
              <label className="relative cursor-pointer">
                <input type="radio" name="plan" value="yearly" className="peer sr-only" />
                <div className="bg-surface-container-low rounded-xl p-4 text-center ghost-border peer-checked:ring-2 peer-checked:ring-primary peer-checked:bg-surface-container-high transition-all">
                  <div className="font-headline font-bold">Yearly</div>
                  <div className="text-primary font-black text-lg">£89.99</div>
                  <div className="text-[10px] text-secondary font-bold">SAVE 25%</div>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-headline font-bold text-lg py-4 rounded-xl ambient-shadow hover:scale-[1.02] active:scale-95 transition-all"
          >
            Create Account & Subscribe
          </button>
        </form>

        <p className="text-center text-on-surface-variant mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
