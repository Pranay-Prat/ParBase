"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function DashboardHome() {
  const [profile, setProfile] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [charity, setCharity] = useState<any>(null);
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profRes, scoresRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/scores"),
        ]);
        if (profRes.ok) {
          const pData = await profRes.json();
          setProfile(pData.profile);
          setSubscription(pData.profile.subscription);
          setCharity(pData.profile.charity);
        }
        if (scoresRes.ok) {
          const sData = await scoresRes.json();
          setScores(sData.scores);
        }
      } catch (e) {
        console.error("Dashboard error", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined animate-spin">progress_activity</span> Loading dashboard...</div>;
  }

  const isSubscribed = subscription?.status === "ACTIVE";
  const planName = subscription?.plan === "YEARLY" ? "Yearly" : "Monthly";
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b.score, 0) / scores.length) : 0;

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
      {/* Header */}
      <motion.header variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black tracking-tight text-on-surface">
            Welcome back, <span className="text-primary italic">{profile?.fullName?.split(" ")[0] || "Golfer"}</span>
          </h1>
          <p className="text-on-surface-variant font-medium mt-1">
            Let&apos;s make an impact on the course today.
          </p>
        </div>
      </motion.header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Subscription & Impact (Left Col) */}
        <motion.div variants={fadeInUp} className="xl:col-span-1 space-y-6">
          {/* Subscription Card */}
          <div className="bg-surface-container rounded-2xl p-6 ghost-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 text-primary opacity-20 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-6xl">workspace_premium</span>
            </div>
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest mb-2 block">Current Plan</span>
              <h2 className="text-3xl font-headline font-bold mb-1">{isSubscribed ? `ParBase Pro` : "Free Tier"}</h2>
              <p className={`text-sm font-body font-bold mb-6 ${isSubscribed ? "text-primary" : "text-on-surface-variant"}`}>
                {isSubscribed ? `${planName} Subscription Active` : "No active subscription"}
              </p>
              <div className="flex gap-2">
                {!isSubscribed ? (
                  <Link href="/subscribe" className="flex-1 bg-primary hover:bg-primary-dim text-on-primary text-center py-2 rounded-xl text-sm font-bold transition-colors">
                    Subscribe Now
                  </Link>
                ) : (
                  <Link href="/dashboard/settings" className="flex-1 bg-surface-container-high hover:bg-surface-bright text-on-surface text-center py-2 rounded-xl text-sm font-bold transition-colors">
                    Manage
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Impact Card */}
          <div className="bg-surface-container-highest rounded-2xl p-6 ghost-border relative overflow-hidden text-on-surface">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-black uppercase text-secondary tracking-widest mb-1 block">My ParBase Total</span>
                <div className="text-4xl font-headline font-black">$450</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-sm">water_drop</span>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant mb-4">Supporting: <strong className="text-on-surface">{charity?.name || "None Selected"}</strong></p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase">
                <span>Contribution Level</span>
                <span className="text-secondary">{profile?.charityContributionPct || 10}%</span>
              </div>
              <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full shadow-[0_0_8px_var(--color-secondary)]" style={{ width: `${profile?.charityContributionPct || 10}%` }} />
              </div>
            </div>
            <Link href="/dashboard/charity" className="block text-center mt-6 text-xs font-bold uppercase tracking-widest hover:text-secondary transition-colors">
              Manage Giving
            </Link>
          </div>
        </motion.div>

        {/* Mega Draw & Recent Scores (Middle/Right Cols) */}
        <motion.div variants={fadeInUp} className="xl:col-span-2 space-y-6">
          {/* Active Draw Panel */}
          <div className="bg-gradient-to-br from-surface-container-high to-surface-container rounded-2xl p-8 ghost-border relative overflow-hidden group ring-1 ring-primary/20">
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[80px]" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Live Draw
                </div>
                <h3 className="text-2xl font-headline font-bold mb-1">Monthly Mega Draw</h3>
                <p className="text-on-surface-variant text-sm">Prize Pool: <strong className="text-primary text-xl">$12,500</strong></p>
              </div>
              <div className="flex gap-6 items-center">
                <div className="text-right">
                  <div className="text-xs font-bold uppercase text-on-surface-variant tracking-widest mb-1">Closes In</div>
                  <div className="text-2xl font-headline font-black font-variant-numeric text-on-surface">14h 22m</div>
                </div>
                <div className="h-12 w-px bg-outline-variant/30 hidden md:block" />
                <div className="text-center">
                  <div className="flex justify-center -space-x-2 mb-1">
                    {[1, 2, 3].map((t) => (
                      <div key={t} className="w-6 h-6 rounded-full bg-surface-bright flex items-center justify-center border border-surface shadow-sm text-[8px] font-bold text-primary">
                        <span className="material-symbols-outlined text-[10px]">confirmation_number</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest">3 active tickets</div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-outline-variant/20 flex gap-4">
              <Link href="/dashboard/scores" className="bg-surface-bright text-on-surface px-6 py-3 rounded-xl font-bold text-sm hover:bg-surface-container-highest transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">edit_note</span>
                Log Score
              </Link>
              <Link href="/dashboard/draws" className="text-primary hover:text-primary-dim font-bold text-sm uppercase tracking-widest flex items-center gap-2 transition-colors">
                View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Avg Score", value: avgScore.toString(), icon: "sports_score", color: "text-on-surface" },
              { label: "Total Scores", value: scores.length.toString(), icon: "tag", color: "text-on-surface" },
              { label: "Active Subs", value: isSubscribed ? "Yes" : "No", icon: "workspace_premium", color: isSubscribed ? "text-primary" : "text-outline" },
              { label: "Contribution", value: `${profile?.charityContributionPct || 10}%`, icon: "volunteer_activism", color: "text-secondary" },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-container rounded-2xl p-5 text-center ghost-border flex flex-col items-center justify-center">
                <span className={`material-symbols-outlined ${stat.color} mb-3 text-2xl`}>{stat.icon}</span>
                <div className={`text-2xl font-headline font-black mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-[9px] font-black uppercase text-on-surface-variant tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Scores List */}
      <motion.div variants={fadeInUp} className="bg-surface-container-low rounded-2xl p-6 ghost-border mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-headline font-bold">Recent Pulse</h3>
          <Link href="/dashboard/scores" className="text-xs text-primary font-bold uppercase tracking-widest hover:underline">View All</Link>
        </div>
        <div className="space-y-2">
          {scores.length === 0 ? (
            <div className="text-on-surface-variant text-sm py-4">No scores recorded yet. Time to hit the course!</div>
          ) : (
            scores.map((sc: any) => (
              <div key={sc.id} className="flex justify-between items-center bg-surface-container p-4 rounded-xl ghost-border hover:bg-surface-bright transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center font-headline font-black text-xl text-primary">
                    {sc.score}
                  </div>
                  <div>
                    <div className="font-bold text-sm">Round Recorded</div>
                    <div className="text-xs text-on-surface-variant">{new Date(sc.playedAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest hidden md:block group-hover:text-primary transition-colors">
                  Valid
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>

    </motion.div>
  );
}
