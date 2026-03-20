"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [charity, setCharity] = useState("");
  const [contribution, setContribution] = useState(10);
  const [plan, setPlan] = useState("monthly");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!charity) {
      setError("Please select a charity to support.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          charity,
          contribution_pct: contribution,
          plan,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    toast.success("Account created successfully! Please sign in.");
    router.push("/auth/login?registered=true");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 hero-pattern relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/8 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/6 rounded-full blur-[100px] animate-float-slow-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-tertiary/4 rounded-full blur-[150px] animate-pulse-glow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black italic tracking-tighter text-primary font-headline">
            ParBase
          </Link>
          <h1 className="text-3xl font-headline font-bold mt-6 mb-2">
            Join the <span className="text-secondary">Movement</span>
          </h1>
          <p className="text-on-surface-variant">Create your account and start making an impact</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-md px-4 py-2.5 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all placeholder:text-outline/60"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-md px-4 py-2.5 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all placeholder:text-outline/60"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-md px-4 py-2.5 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all placeholder:text-outline/60"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-md px-4 py-2.5 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all placeholder:text-outline/60"
            />
          </div>

          {/* Charity Selection at Signup per spec */}
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">
              Choose Your Charity
            </label>
            <select
              value={charity}
              onChange={(e) => setCharity(e.target.value)}
              required
              className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-md px-4 py-2.5 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all"
            >
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
              Charity Contribution: <span className="text-primary">{contribution}%</span> (minimum 10%)
            </label>
            <input
              type="range"
              min="10"
              max="50"
              value={contribution}
              onChange={(e) => setContribution(parseInt(e.target.value))}
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
                <input
                  type="radio"
                  name="plan"
                  value="monthly"
                  checked={plan === "monthly"}
                  onChange={(e) => setPlan(e.target.value)}
                  className="peer sr-only"
                />
                <div className="bg-surface-container-low rounded-md p-4 text-center ghost-border peer-checked:ring-2 peer-checked:ring-primary peer-checked:bg-surface-container-high transition-all">
                  <div className="font-headline font-bold">Monthly</div>
                  <div className="text-primary font-black text-lg">£9.99</div>
                </div>
              </label>
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="plan"
                  value="yearly"
                  checked={plan === "yearly"}
                  onChange={(e) => setPlan(e.target.value)}
                  className="peer sr-only"
                />
                <div className="bg-surface-container-low rounded-md p-4 text-center ghost-border peer-checked:ring-2 peer-checked:ring-primary peer-checked:bg-surface-container-high transition-all">
                  <div className="font-headline font-bold">Yearly</div>
                  <div className="text-primary font-black text-lg">£89.99</div>
                  <div className="text-[10px] text-secondary font-bold">SAVE 25%</div>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-bold text-lg py-3 rounded-md ambient-shadow hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                Creating Account...
              </>
            ) : (
              "Create Account & Subscribe"
            )}
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
