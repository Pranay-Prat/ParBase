"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AdminDashboard() {
  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
      <motion.header variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-headline font-black tracking-tight text-on-surface">
            System <span className="text-primary italic">Overview</span>
          </h1>
          <p className="text-on-surface-variant font-medium mt-1">Platform analytics and high-level metrics.</p>
        </div>
      </motion.header>

      {/* Top KBIs (Key Business Indicators) */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Active Users", value: "12,450", icon: "group", change: "+4.2%", positive: true },
          { label: "Active Subscriptions", value: "11,200", icon: "workspace_premium", change: "+2.1%", positive: true },
          { label: "MRR", value: "$134,400", icon: "payments", change: "+5.4%", positive: true },
          { label: "30-Day Churn", value: "1.2%", icon: "trending_down", change: "-0.4%", positive: true },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-container p-6 rounded-2xl ghost-border">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-on-surface-variant bg-surface p-2 rounded-xl">{stat.icon}</span>
              <span className={`text-xs font-bold ${stat.positive ? "text-primary" : "text-error"}`}>{stat.change}</span>
            </div>
            <div className="text-3xl font-headline font-black mb-1">{stat.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Draw Insights */}
        <motion.div variants={fadeInUp} className="bg-gradient-to-br from-surface-container-high to-surface-container rounded-2xl p-8 ghost-border">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-headline font-bold">Current Draw Cycle (Oct)</h3>
            <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest rounded-full">Live</span>
          </div>
          <div className="grid grid-cols-2 gap-6 relative z-10">
             <div>
               <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">Total Pool</div>
               <div className="text-3xl font-headline font-black text-primary">$45,000</div>
             </div>
             <div>
               <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">Scores Logged</div>
               <div className="text-3xl font-headline font-black text-on-surface">34,210</div>
             </div>
             <div>
               <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">Charity Share (Min)</div>
               <div className="text-3xl font-headline font-black text-secondary">$5,000</div>
             </div>
             <div>
               <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">Avg Score</div>
               <div className="text-3xl font-headline font-black text-on-surface">31.4</div>
             </div>
          </div>
        </motion.div>

        {/* Charity Distribution */}
        <motion.div variants={fadeInUp} className="bg-surface-container rounded-2xl p-8 ghost-border">
          <h3 className="text-xl font-headline font-bold mb-6">Top Supported Charities</h3>
          <div className="space-y-6">
            {[
              { name: "Save the Oceans", pct: 45, color: "bg-primary glow-primary" },
              { name: "Junior Golf Fund", pct: 30, color: "bg-secondary" },
              { name: "Green Links", pct: 15, color: "bg-tertiary" },
              { name: "Others", pct: 10, color: "bg-outline-variant" },
            ].map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span>{c.name}</span>
                  <span>{c.pct}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
